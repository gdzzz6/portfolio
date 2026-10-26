import SwiftUI

struct MoodCheckInCard: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        let current = store.mood(on: Date())
        VStack(alignment: .leading, spacing: 14) {
            SectionHeader(title: current == nil ? "Как ты сегодня?" : "Настроение отмечено", icon: "face.smiling")

            HStack {
                ForEach(Mood.allCases) { mood in
                    Button {
                        withAnimation(.spring(response: 0.35, dampingFraction: 0.6)) {
                            store.setMood(mood)
                        }
                    } label: {
                        VStack(spacing: 6) {
                            Text(mood.emoji)
                                .font(.system(size: current == mood ? 38 : 30))
                                .scaleEffect(current == mood ? 1.1 : 1)
                                .opacity(current == nil || current == mood ? 1 : 0.45)
                            Text(mood.title)
                                .font(.caption2)
                                .foregroundStyle(.white.opacity(current == mood ? 1 : 0.55))
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.plain)
                }
            }
            .sensoryFeedback(.impact(weight: .light), trigger: current)

            if let current {
                Text(current.reply)
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.8))
                    .fixedSize(horizontal: false, vertical: true)
                    .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .glassCard()
    }
}
