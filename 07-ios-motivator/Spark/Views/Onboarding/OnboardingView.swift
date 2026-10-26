import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject private var store: AppStore
    @State private var page = 0
    @State private var name = ""
    @FocusState private var nameFocused: Bool

    private let pages: [(icon: String, title: String, text: String)] = [
        ("sparkles", "Привет, это Искра", "Место, куда стоит заходить каждый день вместо бесконечной ленты. Минута здесь — заряд на весь день."),
        ("quote.opening", "Мотивация каждый день", "Свежая цитата, оценка настроения и идеи, чем занять день, — без рекламы и скролла."),
        ("gauge.with.needle.fill", "Шкала продуктивности", "Выполняй задачи, держи фокус и смотри, как растёт твой показатель и серия дней."),
    ]

    var body: some View {
        ZStack {
            AnimatedBackground()

            VStack(spacing: 24) {
                TabView(selection: $page) {
                    ForEach(pages.indices, id: \.self) { index in
                        infoPage(pages[index]).tag(index)
                    }
                    namePage.tag(pages.count)
                }
                .tabViewStyle(.page(indexDisplayMode: .always))

                Button(page < pages.count ? "Дальше" : "Начать") {
                    if page < pages.count {
                        withAnimation { page += 1 }
                    } else {
                        finish()
                    }
                }
                .buttonStyle(GradientButtonStyle())
                .padding(.horizontal, 24)
                .padding(.bottom, 16)
            }
        }
    }

    private func infoPage(_ item: (icon: String, title: String, text: String)) -> some View {
        VStack(spacing: 22) {
            Spacer()
            ZStack {
                Circle().fill(Theme.accent).frame(width: 130, height: 130)
                    .shadow(color: Theme.pink.opacity(0.6), radius: 30)
                Image(systemName: item.icon)
                    .font(.system(size: 54, weight: .semibold))
                    .foregroundStyle(.white)
            }
            Text(item.title)
                .font(.system(size: 32, weight: .bold, design: .rounded))
                .multilineTextAlignment(.center)
            Text(item.text)
                .font(.body)
                .foregroundStyle(.white.opacity(0.75))
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            Spacer()
            Spacer()
        }
    }

    private var namePage: some View {
        VStack(spacing: 22) {
            Spacer()
            Text("Как тебя зовут?")
                .font(.system(size: 32, weight: .bold, design: .rounded))
            Text("Чтобы приветствовать тебя по имени")
                .foregroundStyle(.white.opacity(0.7))
            TextField("Имя", text: $name)
                .font(.title3)
                .multilineTextAlignment(.center)
                .textInputAutocapitalization(.words)
                .submitLabel(.done)
                .focused($nameFocused)
                .onSubmit(finish)
                .glassCard(padding: 16, cornerRadius: 18)
                .padding(.horizontal, 32)
            Spacer()
            Spacer()
        }
        .onAppear { nameFocused = true }
    }

    private func finish() {
        store.data.userName = name.trimmingCharacters(in: .whitespacesAndNewlines)
        withAnimation(.spring) {
            store.data.onboarded = true
        }
        store.registerVisit()
    }
}
