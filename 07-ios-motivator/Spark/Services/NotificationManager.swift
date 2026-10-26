import Foundation
import UserNotifications

final class NotificationManager {
    static let shared = NotificationManager()

    private let center = UNUserNotificationCenter.current()
    private let dailyPrefix = "spark.daily."
    private let focusID = "spark.focus.end"

    private init() {}

    func requestAuthorization() async -> Bool {
        (try? await center.requestAuthorization(options: [.alert, .sound, .badge])) ?? false
    }

    /// Планирует напоминания на две недели вперёд — каждый день с новой цитатой.
    @MainActor
    func rescheduleDailyReminders(store: AppStore) {
        let data = store.data
        center.getPendingNotificationRequests { [center, dailyPrefix] requests in
            let old = requests.map(\.identifier).filter { $0.hasPrefix(dailyPrefix) }
            center.removePendingNotificationRequests(withIdentifiers: old)

            guard data.reminderEnabled else { return }

            let calendar = Calendar.current
            let name = data.userName.isEmpty ? "" : ", \(data.userName)"
            let titles = [
                "Время для искры\(name) ✨",
                "Новый день — новый шанс\(name)",
                "Не открывай ленту\(name) 🙅",
                "Твоя серия ждёт\(name) 🔥",
                "Пора действовать\(name) 💪",
            ]

            for offset in 0..<14 {
                guard let day = calendar.date(byAdding: .day, value: offset, to: Date()) else { continue }
                var components = calendar.dateComponents([.year, .month, .day], from: day)
                components.hour = data.reminderHour
                components.minute = data.reminderMinute
                guard let fireDate = calendar.date(from: components), fireDate > Date() else { continue }

                let quote = Quotes.ofDay(day)
                let content = UNMutableNotificationContent()
                content.title = titles[offset % titles.count]
                content.body = "«\(quote.text)» — \(quote.author)"
                content.sound = .default

                let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
                let request = UNNotificationRequest(identifier: dailyPrefix + day.dayKey, content: content, trigger: trigger)
                center.add(request)
            }
        }
    }

    func scheduleFocusEnd(after seconds: TimeInterval) {
        let content = UNMutableNotificationContent()
        content.title = "Фокус-сессия завершена 🎉"
        content.body = "Отличная работа! Сделай перерыв на 5 минут — ты его заслужил."
        content.sound = .default
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: max(seconds, 1), repeats: false)
        center.add(UNNotificationRequest(identifier: focusID, content: content, trigger: trigger))
    }

    func cancelFocusEnd() {
        center.removePendingNotificationRequests(withIdentifiers: [focusID])
    }
}
