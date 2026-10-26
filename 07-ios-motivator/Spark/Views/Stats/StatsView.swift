import SwiftUI
import Charts

struct StatsView: View {
    @EnvironmentObject private var store: AppStore
    @State private var range = 7

    var body: some View {
        let history = store.history(days: range)
        let average = history.isEmpty ? 0 : history.map(\.score).reduce(0, +) / history.count
        let best = history.max { $0.score < $1.score }

        NavigationStack {
            ZStack {
                AnimatedBackground()

                ScrollView {
                    VStack(spacing: 18) {
                        streakCard

                        VStack(alignment: .leading, spacing: 14) {
                            HStack {
                                Text("Продуктивность").font(.headline)
                                Spacer()
                                Picker("", selection: $range) {
                                    Text("7 дней").tag(7)
                                    Text("30 дней").tag(30)
                                }
                                .pickerStyle(.segmented)
                                .frame(width: 170)
                            }

                            Chart {
                                ForEach(history) { day in
                                    BarMark(
                                        x: .value("День", day.date, unit: .day),
                                        y: .value("Очки", day.score)
                                    )
                                    .foregroundStyle(
                                        LinearGradient(colors: [Theme.pink, Theme.violet], startPoint: .top, endPoint: .bottom)
                                    )
                                    .cornerRadius(6)
                                }

                                RuleMark(y: .value("Среднее", average))
                                    .foregroundStyle(.white.opacity(0.35))
                                    .lineStyle(StrokeStyle(lineWidth: 1, dash: [4, 4]))
                            }
                            .chartYScale(domain: 0...100)
                            .chartXAxis {
                                AxisMarks(values: .stride(by: .day, count: range == 7 ? 1 : 5)) { _ in
                                    AxisValueLabel(format: .dateTime.weekday(.abbreviated).locale(.ru))
                                        .foregroundStyle(.white.opacity(0.6))
                                }
                            }
                            .chartYAxis {
                                AxisMarks(values: [0, 50, 100]) { _ in
                                    AxisGridLine().foregroundStyle(.white.opacity(0.08))
                                    AxisValueLabel().foregroundStyle(.white.opacity(0.5))
                                }
                            }
                            .frame(height: 200)

                            HStack {
                                miniStat("Среднее", "\(average)", Theme.sky)
                                miniStat("Лучший день", best.map { "\($0.score)" } ?? "—", Theme.pink)
                                miniStat("Сегодня", "\(store.score(for: Date()))", Theme.amber)
                            }
                        }
                        .glassCard()

                        totals
                        moodWeek
                        achievements
                    }
                    .padding(.horizontal, 18)
                    .padding(.bottom, 32)
                }
                .scrollIndicators(.hidden)
            }
            .navigationTitle("Прогресс")
        }
    }

    // MARK: Серия

    private var streakCard: some View {
        HStack(spacing: 18) {
            Image(systemName: "flame.fill")
                .font(.system(size: 48))
                .foregroundStyle(Theme.warm)
                .symbolEffect(.bounce, value: store.streak)
            VStack(alignment: .leading, spacing: 4) {
                Text("\(store.streak) \(daysWord(store.streak)) подряд")
                    .font(.system(size: 26, weight: .bold, design: .rounded))
                Text(store.streak >= store.bestStreak && store.streak > 1
                     ? "Это твой рекорд! Не прерывай серию."
                     : "Рекорд — \(store.bestStreak) \(daysWord(store.bestStreak)). Заходи каждый день!")
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.7))
            }
            Spacer(minLength: 0)
        }
        .glassCard(padding: 20)
    }

    // MARK: Итоги

    private var totals: some View {
        let done = store.data.tasks.filter(\.isDone).count
        let focus = store.totalFocusMinutes
        return HStack(spacing: 12) {
            totalTile(icon: "checkmark.circle.fill", value: "\(done)", label: "задач выполнено", color: Theme.mint)
            totalTile(icon: "timer", value: focus >= 60 ? String(format: "%.1f ч", Double(focus) / 60) : "\(focus) мин",
                      label: "в фокусе", color: Theme.sky)
            totalTile(icon: "calendar", value: "\(Set(store.data.visits).count)", label: "дней с Искрой", color: Theme.violet)
        }
    }

    private func totalTile(icon: String, value: String, label: String, color: Color) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Image(systemName: icon).foregroundStyle(color)
            Text(value).font(.title3.weight(.bold)).lineLimit(1).minimumScaleFactor(0.7)
            Text(label).font(.caption).foregroundStyle(.white.opacity(0.6))
        }
        .glassCard(padding: 14, cornerRadius: 20)
    }

    private func miniStat(_ title: String, _ value: String, _ color: Color) -> some View {
        VStack(spacing: 2) {
            Text(value).font(.title3.weight(.bold)).foregroundStyle(color)
            Text(title).font(.caption).foregroundStyle(.white.opacity(0.6))
        }
        .frame(maxWidth: .infinity)
    }

    // MARK: Настроение за неделю

    private var moodWeek: some View {
        VStack(alignment: .leading, spacing: 14) {
            SectionHeader(title: "Настроение за неделю", icon: "face.smiling")
            HStack {
                ForEach(Array((0..<7).reversed()), id: \.self) { offset in
                    let date = Date().adding(days: -offset)
                    VStack(spacing: 6) {
                        Text(store.mood(on: date)?.emoji ?? "·")
                            .font(.system(size: 26))
                            .frame(height: 32)
                            .opacity(store.mood(on: date) == nil ? 0.3 : 1)
                        Text(date.formatted(.dateTime.weekday(.abbreviated).locale(.ru)))
                            .font(.caption2)
                            .foregroundStyle(.white.opacity(offset == 0 ? 1 : 0.5))
                    }
                    .frame(maxWidth: .infinity)
                }
            }
        }
        .glassCard()
    }

    // MARK: Достижения

    private var achievements: some View {
        let items = store.achievements
        return VStack(alignment: .leading, spacing: 14) {
            SectionHeader(title: "Достижения · \(items.filter(\.unlocked).count)/\(items.count)", icon: "trophy.fill")
            LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 3), spacing: 16) {
                ForEach(items) { item in
                    VStack(spacing: 8) {
                        Image(systemName: item.icon)
                            .font(.title2)
                            .foregroundStyle(.white)
                            .frame(width: 58, height: 58)
                            .background(
                                Circle().fill(item.unlocked ? AnyShapeStyle(Theme.accent) : AnyShapeStyle(Color.white.opacity(0.06)))
                            )
                            .opacity(item.unlocked ? 1 : 0.4)
                        Text(item.title)
                            .font(.caption.weight(.semibold))
                            .multilineTextAlignment(.center)
                        Text(item.detail)
                            .font(.caption2)
                            .foregroundStyle(.white.opacity(0.5))
                            .multilineTextAlignment(.center)
                    }
                }
            }
        }
        .glassCard()
    }

    private func daysWord(_ n: Int) -> String {
        let mod10 = n % 10, mod100 = n % 100
        if mod10 == 1 && mod100 != 11 { return "день" }
        if (2...4).contains(mod10) && !(12...14).contains(mod100) { return "дня" }
        return "дней"
    }
}
