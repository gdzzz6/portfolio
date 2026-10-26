import SwiftUI

/// Большая карточка со шкалой продуктивности за день.
struct ProductivityCard: View {
    let breakdown: ScoreBreakdown
    @State private var shown: Double = 0

    private var score: Int { breakdown.total }
    private var level: ProductivityLevel { .forScore(score) }

    var body: some View {
        HStack(spacing: 20) {
            ZStack {
                RingView(progress: shown / 100, lineWidth: 16)
                VStack(spacing: 0) {
                    Text("\(score)")
                        .font(.system(size: 40, weight: .bold, design: .rounded))
                        .contentTransition(.numericText(value: Double(score)))
                    Text("из 100")
                        .font(.caption)
                        .foregroundStyle(.white.opacity(0.6))
                }
            }
            .frame(width: 130, height: 130)

            VStack(alignment: .leading, spacing: 10) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(level.title)
                        .font(.title3.weight(.bold))
                        .foregroundStyle(level.color)
                    Text(level.subtitle)
                        .font(.footnote)
                        .foregroundStyle(.white.opacity(0.65))
                }
                part("Задачи", value: breakdown.tasks, color: Theme.pink)
                part("Фокус", value: breakdown.focus, color: Theme.sky)
                part("Настрой", value: breakdown.mood, color: Theme.amber)
            }
        }
        .glassCard(padding: 20)
        .onAppear { animate() }
        .onChange(of: score) { _, _ in animate() }
    }

    private func part(_ title: String, value: Double, color: Color) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(title).font(.caption.weight(.medium))
                Spacer()
                Text("\(Int(value * 100))%")
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(.white.opacity(0.6))
            }
            BarView(progress: value, color: color)
        }
    }

    private func animate() {
        withAnimation(.spring(response: 1.0, dampingFraction: 0.8)) {
            shown = Double(score)
        }
    }
}
