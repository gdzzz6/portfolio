import SwiftUI

enum Theme {
    static let background = Color(red: 0.04, green: 0.04, blue: 0.10)
    static let violet = Color(red: 0.49, green: 0.42, blue: 0.96)
    static let pink = Color(red: 0.96, green: 0.38, blue: 0.66)
    static let coral = Color(red: 1.00, green: 0.48, blue: 0.40)
    static let sky = Color(red: 0.33, green: 0.70, blue: 1.00)
    static let mint = Color(red: 0.29, green: 0.87, blue: 0.62)
    static let amber = Color(red: 1.00, green: 0.76, blue: 0.29)

    static let accent = LinearGradient(colors: [violet, pink], startPoint: .topLeading, endPoint: .bottomTrailing)
    static let warm = LinearGradient(colors: [amber, coral], startPoint: .topLeading, endPoint: .bottomTrailing)
    static let cool = LinearGradient(colors: [sky, violet], startPoint: .topLeading, endPoint: .bottomTrailing)
}

// MARK: - Стеклянная карточка

struct GlassCard: ViewModifier {
    var padding: CGFloat = 18
    var cornerRadius: CGFloat = 26

    func body(content: Content) -> some View {
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .strokeBorder(.white.opacity(0.08), lineWidth: 1)
            )
    }
}

extension View {
    func glassCard(padding: CGFloat = 18, cornerRadius: CGFloat = 26) -> some View {
        modifier(GlassCard(padding: padding, cornerRadius: cornerRadius))
    }
}

// MARK: - Живой фон

/// Медленно плавающие размытые пятна цвета на тёмном фоне.
struct AnimatedBackground: View {
    @State private var animate = false

    var body: some View {
        ZStack {
            Theme.background
            blob(Theme.violet, size: 380, x: animate ? -120 : 80, y: animate ? -260 : -180)
            blob(Theme.pink, size: 320, x: animate ? 150 : 40, y: animate ? 60 : -40)
            blob(Theme.sky, size: 300, x: animate ? -60 : -160, y: animate ? 340 : 260)
        }
        .ignoresSafeArea()
        .onAppear {
            withAnimation(.easeInOut(duration: 12).repeatForever(autoreverses: true)) {
                animate = true
            }
        }
    }

    private func blob(_ color: Color, size: CGFloat, x: CGFloat, y: CGFloat) -> some View {
        Circle()
            .fill(color.opacity(0.35))
            .frame(width: size, height: size)
            .blur(radius: 90)
            .offset(x: x, y: y)
    }
}

// MARK: - Мелкие элементы

struct SectionHeader: View {
    let title: String
    var icon: String?
    var actionTitle: String?
    var action: (() -> Void)?

    var body: some View {
        HStack {
            if let icon {
                Image(systemName: icon).foregroundStyle(Theme.accent)
            }
            Text(title).font(.headline)
            Spacer()
            if let actionTitle, let action {
                Button(actionTitle, action: action)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(Theme.pink)
            }
        }
    }
}

struct GradientButtonStyle: ButtonStyle {
    var gradient: LinearGradient = Theme.accent

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .padding(.vertical, 15)
            .frame(maxWidth: .infinity)
            .background(gradient, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
            .shadow(color: Theme.violet.opacity(0.45), radius: 16, y: 8)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.spring(response: 0.3, dampingFraction: 0.6), value: configuration.isPressed)
    }
}

struct Chip: View {
    let title: String
    var icon: String?
    var color: Color = Theme.violet
    var selected: Bool

    var body: some View {
        HStack(spacing: 6) {
            if let icon { Image(systemName: icon).font(.caption) }
            Text(title).font(.subheadline.weight(.medium))
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 8)
        .background(
            Capsule().fill(selected ? color.opacity(0.9) : Color.white.opacity(0.07))
        )
        .overlay(Capsule().strokeBorder(.white.opacity(selected ? 0 : 0.1)))
        .foregroundStyle(selected ? .white : .white.opacity(0.8))
    }
}

/// Кольцевой индикатор прогресса с градиентом.
struct RingView: View {
    var progress: Double
    var lineWidth: CGFloat = 16
    var colors: [Color] = [Theme.violet, Theme.pink, Theme.amber]

    var body: some View {
        ZStack {
            Circle().stroke(.white.opacity(0.08), lineWidth: lineWidth)
            Circle()
                .trim(from: 0, to: max(min(progress, 1), 0.001))
                .stroke(
                    AngularGradient(colors: colors + [colors[0]], center: .center),
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .shadow(color: colors.last!.opacity(0.5), radius: 8)
        }
    }
}

/// Горизонтальная полоска прогресса.
struct BarView: View {
    var progress: Double
    var color: Color

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(.white.opacity(0.08))
                Capsule()
                    .fill(color.gradient)
                    .frame(width: geo.size.width * max(min(progress, 1), 0))
            }
        }
        .frame(height: 8)
    }
}
