import SwiftUI

/// Всё, что приложение хранит на устройстве.
struct AppData: Codable {
    var userName = ""
    var onboarded = false
    var tasks: [TaskItem] = []
    /// Минуты фокуса по дням: "yyyy-MM-dd" -> минуты.
    var focusMinutes: [String: Int] = [:]
    /// Настроение по дням: "yyyy-MM-dd" -> Mood.rawValue.
    var moods: [String: Int] = [:]
    /// Дни, в которые пользователь открывал приложение.
    var visits: [String] = []
    var reminderEnabled = false
    var reminderHour = 9
    var reminderMinute = 0
    /// Цель: сколько «обычных» задач в день считается полным выполнением.
    var dailyTaskGoal = 3
    /// Цель по фокусу в минутах.
    var dailyFocusGoal = 60
}

/// Разбивка очков продуктивности за день.
struct ScoreBreakdown {
    var tasks: Double   // 0...1
    var focus: Double   // 0...1
    var mood: Double    // 0...1

    static let tasksWeight = 50.0
    static let focusWeight = 35.0
    static let moodWeight = 15.0

    var total: Int {
        Int((tasks * Self.tasksWeight + focus * Self.focusWeight + mood * Self.moodWeight).rounded())
    }
}

struct DayScore: Identifiable {
    let date: Date
    let score: Int
    var id: String { date.dayKey }
}

struct Achievement: Identifiable {
    let id: String
    let title: String
    let detail: String
    let icon: String
    let unlocked: Bool
}

@MainActor
final class AppStore: ObservableObject {
    @Published var data: AppData {
        didSet { save() }
    }

    private static let fileURL: URL = {
        let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        return dir.appendingPathComponent("spark-data.json")
    }()

    init() {
        if let raw = try? Data(contentsOf: Self.fileURL),
           let decoded = try? JSONDecoder().decode(AppData.self, from: raw) {
            data = decoded
        } else {
            data = AppData()
        }
    }

    private func save() {
        guard let raw = try? JSONEncoder().encode(data) else { return }
        try? raw.write(to: Self.fileURL, options: .atomic)
    }

    // MARK: Визиты и серия

    func registerVisit() {
        let today = Date().dayKey
        if !data.visits.contains(today) {
            data.visits.append(today)
        }
    }

    /// Сколько дней подряд пользователь заходил в приложение.
    var streak: Int {
        let visited = Set(data.visits)
        var day = Date()
        if !visited.contains(day.dayKey) { day = day.adding(days: -1) }
        var count = 0
        while visited.contains(day.dayKey) {
            count += 1
            day = day.adding(days: -1)
        }
        return count
    }

    var bestStreak: Int {
        let days = Set(data.visits).sorted()
        var best = 0
        var current = 0
        var previous: String?
        for key in days {
            if let previous, let date = Self.date(from: previous), date.adding(days: 1).dayKey == key {
                current += 1
            } else {
                current = 1
            }
            best = max(best, current)
            previous = key
        }
        return best
    }

    private static func date(from key: String) -> Date? {
        let f = DateFormatter()
        f.calendar = Calendar(identifier: .gregorian)
        f.locale = Locale(identifier: "en_US_POSIX")
        f.dateFormat = "yyyy-MM-dd"
        return f.date(from: key)
    }

    // MARK: Задачи

    /// Невыполненные задачи (включая перенесённые со вчера) и выполненные сегодня.
    var activeTasks: [TaskItem] {
        data.tasks
            .filter { !$0.isDone }
            .sorted { ($0.priority.rawValue, $1.createdAt) > ($1.priority.rawValue, $0.createdAt) }
    }

    var doneTasks: [TaskItem] {
        data.tasks
            .filter { $0.isDone }
            .sorted { ($0.completedAt ?? .distantPast) > ($1.completedAt ?? .distantPast) }
    }

    func tasksCompleted(on date: Date) -> [TaskItem] {
        let cal = Calendar.current
        return data.tasks.filter { task in
            guard let done = task.completedAt else { return false }
            return cal.isDate(done, inSameDayAs: date)
        }
    }

    func addTask(_ task: TaskItem) {
        data.tasks.append(task)
    }

    func addTask(title: String, category: TaskCategory = .personal, priority: Priority = .medium, note: String = "") {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        addTask(TaskItem(title: trimmed, note: note, priority: priority, category: category))
    }

    func toggle(_ task: TaskItem) {
        guard let index = data.tasks.firstIndex(where: { $0.id == task.id }) else { return }
        data.tasks[index].completedAt = data.tasks[index].isDone ? nil : Date()
    }

    func delete(_ task: TaskItem) {
        data.tasks.removeAll { $0.id == task.id }
    }

    func clearDone() {
        data.tasks.removeAll { $0.isDone }
    }

    func hasTask(titled title: String) -> Bool {
        data.tasks.contains { !$0.isDone && $0.title == title }
    }

    // MARK: Фокус и настроение

    func addFocus(minutes: Int, on date: Date = Date()) {
        guard minutes > 0 else { return }
        data.focusMinutes[date.dayKey, default: 0] += minutes
    }

    func focusMinutes(on date: Date) -> Int {
        data.focusMinutes[date.dayKey] ?? 0
    }

    var totalFocusMinutes: Int {
        data.focusMinutes.values.reduce(0, +)
    }

    func mood(on date: Date) -> Mood? {
        data.moods[date.dayKey].flatMap(Mood.init(rawValue:))
    }

    func setMood(_ mood: Mood) {
        data.moods[Date().dayKey] = mood.rawValue
    }

    // MARK: Продуктивность

    func breakdown(for date: Date) -> ScoreBreakdown {
        let points = tasksCompleted(on: date).reduce(0) { $0 + $1.priority.points }
        let taskTarget = Double(max(data.dailyTaskGoal, 1) * Priority.medium.points)
        let focusTarget = Double(max(data.dailyFocusGoal, 1))
        return ScoreBreakdown(
            tasks: min(Double(points) / taskTarget, 1),
            focus: min(Double(focusMinutes(on: date)) / focusTarget, 1),
            mood: mood(on: date) == nil ? 0 : 1
        )
    }

    func score(for date: Date) -> Int {
        breakdown(for: date).total
    }

    /// Очки за последние `days` дней, от старых к новым.
    func history(days: Int) -> [DayScore] {
        (0..<days).reversed().map { offset in
            let date = Date().adding(days: -offset)
            return DayScore(date: date, score: score(for: date))
        }
    }

    // MARK: Достижения

    var achievements: [Achievement] {
        let done = data.tasks.filter(\.isDone).count
        let bestDay = data.visits.compactMap(Self.date(from:)).map { self.score(for: $0) }.max() ?? 0
        let best = bestStreak
        let focus = totalFocusMinutes
        return [
            Achievement(id: "first", title: "Первый шаг", detail: "Выполни первую задачу", icon: "checkmark.seal.fill", unlocked: done >= 1),
            Achievement(id: "ten", title: "Десятка", detail: "10 выполненных задач", icon: "10.circle.fill", unlocked: done >= 10),
            Achievement(id: "fifty", title: "Машина", detail: "50 выполненных задач", icon: "bolt.fill", unlocked: done >= 50),
            Achievement(id: "streak3", title: "Привычка", detail: "3 дня подряд", icon: "flame.fill", unlocked: best >= 3),
            Achievement(id: "streak7", title: "Неделя силы", detail: "7 дней подряд", icon: "calendar", unlocked: best >= 7),
            Achievement(id: "streak30", title: "Железная воля", detail: "30 дней подряд", icon: "crown.fill", unlocked: best >= 30),
            Achievement(id: "focus60", title: "Глубокий фокус", detail: "60 минут фокуса", icon: "brain.head.profile", unlocked: focus >= 60),
            Achievement(id: "focus600", title: "Мастер фокуса", detail: "10 часов фокуса", icon: "timer", unlocked: focus >= 600),
            Achievement(id: "perfect", title: "Идеальный день", detail: "Набери 100 очков", icon: "star.fill", unlocked: bestDay >= 100),
        ]
    }

    // MARK: Сброс

    func resetAll() {
        let name = data.userName
        data = AppData()
        data.userName = name
        data.onboarded = true
        registerVisit()
    }
}
