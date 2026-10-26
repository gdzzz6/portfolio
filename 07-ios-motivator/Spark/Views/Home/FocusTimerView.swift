import SwiftUI

/// Полноэкранный фокус-таймер (помодоро).
struct FocusTimerView: View {
    @EnvironmentObject private var store: AppStore
    @Environment(\.dismiss) private var dismiss

    @State private var duration = 25
    @State private var startDate: Date?
    @State private var endDate: Date?
    @State private var remaining: TimeInterval = 25 * 60
    @State private var finished = false
    @State private var tipIndex = Int.random(in: 0..<FocusTimerView.tips.count)

    private let ticker = Timer.publish(every: 0.5, on: .main, in: .common).autoconnect()
    private let presets = [15, 25, 45, 60]

    static let tips = [
        "Положи телефон экраном вниз — или вообще в другую комнату.",
        "Выбери одно дело. Только одно.",
        "Закрой лишние вкладки и уведомления.",
        "Налей воды заранее, чтобы не отвлекаться.",
        "Если всплыла мысль — запиши её и вернись к делу.",
        "Не жди идеального момента. Просто начни.",
    ]

    private var isRunning: Bool { endDate != nil }
    private var total: TimeInterval { TimeInterval(duration * 60) }
    private var progress: Double { finished ? 1 : 1 - remaining / total }

    var body: some View {
        ZStack {
            AnimatedBackground()

            VStack(spacing: 28) {
                HStack {
                    Spacer()
                    Button {
                        stop()
                        dismiss()
                    } label: {
                        Image(systemName: "xmark")
                            .font(.headline)
                            .frame(width: 40, height: 40)
                            .background(.ultraThinMaterial, in: Circle())
                    }
                    .foregroundStyle(.white)
                }

                Text(finished ? "Сессия завершена 🎉" : isRunning ? "Ты в фокусе" : "Фокус-сессия")
                    .font(.system(size: 28, weight: .bold, design: .rounded))

                ZStack {
                    RingView(progress: progress, lineWidth: 20, colors: [Theme.sky, Theme.violet, Theme.mint])
                    VStack(spacing: 6) {
                        Text(timeString)
                            .font(.system(size: 60, weight: .bold, design: .rounded).monospacedDigit())
                            .contentTransition(.numericText(countsDown: true))
                        Text(finished ? "+\(duration) мин к продуктивности" : "минут осталось")
                            .font(.subheadline)
                            .foregroundStyle(.white.opacity(0.6))
                    }
                }
                .frame(width: 270, height: 270)
                .animation(.linear(duration: 0.5), value: progress)

                if !isRunning && !finished {
                    HStack(spacing: 10) {
                        ForEach(presets, id: \.self) { minutes in
                            Button {
                                duration = minutes
                                remaining = TimeInterval(minutes * 60)
                            } label: {
                                Chip(title: "\(minutes) мин", color: Theme.violet, selected: duration == minutes)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }

                Text(Self.tips[tipIndex])
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.75))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 24)
                    .frame(minHeight: 44)

                Spacer()

                Group {
                    if finished {
                        Button("Готово") { dismiss() }
                            .buttonStyle(GradientButtonStyle(gradient: Theme.cool))
                    } else if isRunning {
                        Button("Завершить досрочно") { stop() }
                            .buttonStyle(GradientButtonStyle(gradient: Theme.warm))
                    } else {
                        Button("Начать фокус") { start() }
                            .buttonStyle(GradientButtonStyle())
                    }
                }
                .padding(.bottom, 8)
            }
            .padding(24)
        }
        .onReceive(ticker) { _ in tick() }
        .sensoryFeedback(.success, trigger: finished)
    }

    private var timeString: String {
        let seconds = Int(remaining.rounded(.up))
        return String(format: "%02d:%02d", seconds / 60, seconds % 60)
    }

    private func start() {
        let now = Date()
        startDate = now
        endDate = now.addingTimeInterval(total)
        remaining = total
        tipIndex = (tipIndex + 1) % Self.tips.count
        NotificationManager.shared.scheduleFocusEnd(after: total)
    }

    private func tick() {
        guard let endDate else { return }
        remaining = max(0, endDate.timeIntervalSinceNow)
        if remaining <= 0 { complete() }
    }

    private func complete() {
        store.addFocus(minutes: duration)
        endDate = nil
        startDate = nil
        finished = true
    }

    /// Досрочная остановка: засчитываем уже прошедшие полные минуты.
    private func stop() {
        guard let startDate, isRunning else { return }
        let minutes = Int(Date().timeIntervalSince(startDate) / 60)
        store.addFocus(minutes: minutes)
        NotificationManager.shared.cancelFocusEnd()
        self.startDate = nil
        endDate = nil
        remaining = total
    }
}
