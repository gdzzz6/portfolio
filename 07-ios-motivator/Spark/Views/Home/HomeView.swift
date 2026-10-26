import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var store: AppStore
    @Binding var tab: AppTab

    @State private var quoteOffset = 0
    @State private var showFocus = false
    @State private var showSettings = false
    @State private var addedIdea = false

    private var today: Date { Date() }

    var body: some View {
        NavigationStack {
            ZStack {
                AnimatedBackground()

                ScrollView {
                    VStack(spacing: 18) {
                        header
                        ProductivityCard(breakdown: store.breakdown(for: today))
                        quoteCard
                        MoodCheckInCard()
                        focusCard
                        tasksPreview
                        ideaOfDay
                    }
                    .padding(.horizontal, 18)
                    .padding(.bottom, 32)
                }
                .scrollIndicators(.hidden)
            }
            .toolbar(.hidden, for: .navigationBar)
            .fullScreenCover(isPresented: $showFocus) { FocusTimerView() }
            .sheet(isPresented: $showSettings) { SettingsView() }
        }
    }

    // MARK: Шапка

    private var greeting: String {
        switch Calendar.current.component(.hour, from: today) {
        case 5..<12: "Доброе утро"
        case 12..<18: "Добрый день"
        case 18..<23: "Добрый вечер"
        default: "Доброй ночи"
        }
    }

    private var header: some View {
        HStack(alignment: .top) {
            VStack(alignment: .leading, spacing: 4) {
                Text(today.formatted(.dateTime.weekday(.wide).day().month(.wide).locale(.ru)).capitalized)
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.6))
                Text(store.data.userName.isEmpty ? greeting : "\(greeting),\n\(store.data.userName)")
                    .font(.system(size: 30, weight: .bold, design: .rounded))
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 10) {
                Button { showSettings = true } label: {
                    Image(systemName: "gearshape.fill")
                        .font(.title3)
                        .foregroundStyle(.white.opacity(0.8))
                        .frame(width: 42, height: 42)
                        .background(.ultraThinMaterial, in: Circle())
                }
                HStack(spacing: 4) {
                    Image(systemName: "flame.fill").foregroundStyle(Theme.warm)
                    Text("\(store.streak)").font(.headline.monospacedDigit())
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(.ultraThinMaterial, in: Capsule())
            }
        }
        .padding(.top, 12)
    }

    // MARK: Цитата дня

    private var quoteCard: some View {
        let quote = Quotes.ofDay(today, offset: quoteOffset)
        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Label("Мысль дня", systemImage: "quote.opening")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.white.opacity(0.85))
                Spacer()
                ShareLink(item: "«\(quote.text)» — \(quote.author)") {
                    Image(systemName: "square.and.arrow.up")
                }
                Button {
                    withAnimation(.spring) { quoteOffset += 1 }
                } label: {
                    Image(systemName: "arrow.triangle.2.circlepath")
                }
                .padding(.leading, 8)
            }
            .foregroundStyle(.white)

            Text(quote.text)
                .font(.system(size: 21, weight: .semibold, design: .serif))
                .fixedSize(horizontal: false, vertical: true)
                .id(quote.id)
                .transition(.asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity),
                                        removal: .opacity))
            Text("— \(quote.author)")
                .font(.subheadline)
                .foregroundStyle(.white.opacity(0.75))
        }
        .padding(22)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(LinearGradient(colors: [Theme.violet, Theme.pink.opacity(0.85)],
                                     startPoint: .topLeading, endPoint: .bottomTrailing))
        )
        .shadow(color: Theme.pink.opacity(0.35), radius: 20, y: 10)
        .sensoryFeedback(.selection, trigger: quoteOffset)
    }

    // MARK: Фокус

    private var focusCard: some View {
        let minutes = store.focusMinutes(on: today)
        return Button { showFocus = true } label: {
            HStack(spacing: 16) {
                ZStack {
                    RingView(progress: Double(minutes) / Double(max(store.data.dailyFocusGoal, 1)),
                             lineWidth: 6, colors: [Theme.sky, Theme.mint])
                        .frame(width: 54, height: 54)
                    Image(systemName: "timer").font(.title3)
                }
                VStack(alignment: .leading, spacing: 4) {
                    Text("Фокус-сессия").font(.headline)
                    Text("Сегодня \(minutes) из \(store.data.dailyFocusGoal) мин · убери телефон и сделай одно дело")
                        .font(.subheadline)
                        .foregroundStyle(.white.opacity(0.65))
                        .multilineTextAlignment(.leading)
                }
                Spacer()
                Image(systemName: "play.circle.fill")
                    .font(.system(size: 34))
                    .foregroundStyle(Theme.cool)
            }
            .foregroundStyle(.white)
            .glassCard()
        }
        .buttonStyle(.plain)
    }

    // MARK: Задачи

    private var tasksPreview: some View {
        let active = store.activeTasks
        let doneToday = store.tasksCompleted(on: today).count
        return VStack(alignment: .leading, spacing: 12) {
            SectionHeader(title: "Задачи на сегодня", icon: "checklist", actionTitle: "Все") { tab = .tasks }

            if active.isEmpty {
                HStack(spacing: 12) {
                    Image(systemName: doneToday > 0 ? "party.popper.fill" : "plus.circle.fill")
                        .font(.title2)
                        .foregroundStyle(Theme.warm)
                    Text(doneToday > 0 ? "Всё сделано! Можно взять что-то из идей." : "Список пуст. Добавь первую задачу дня.")
                        .foregroundStyle(.white.opacity(0.75))
                }
                .padding(.vertical, 6)
            } else {
                ForEach(active.prefix(3)) { task in
                    TaskRow(task: task)
                }
                if active.count > 3 {
                    Text("и ещё \(active.count - 3)…")
                        .font(.footnote)
                        .foregroundStyle(.white.opacity(0.5))
                }
            }
        }
        .glassCard()
    }

    // MARK: Идея дня

    private var ideaOfDay: some View {
        let idea = Suggestions.ofDay(today)
        let added = store.hasTask(titled: idea.title)
        return VStack(alignment: .leading, spacing: 12) {
            SectionHeader(title: "Идея дня", icon: "lightbulb.fill", actionTitle: "Ещё идеи") { tab = .ideas }
            HStack(spacing: 14) {
                Image(systemName: idea.icon)
                    .font(.title2)
                    .foregroundStyle(.white)
                    .frame(width: 52, height: 52)
                    .background(idea.category.color.gradient, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
                VStack(alignment: .leading, spacing: 3) {
                    Text(idea.title).font(.headline)
                    Text(idea.detail)
                        .font(.subheadline)
                        .foregroundStyle(.white.opacity(0.65))
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            Button {
                store.addTask(title: idea.title, category: idea.category.taskCategory)
                addedIdea.toggle()
            } label: {
                Label(added ? "Уже в задачах" : "Добавить в задачи", systemImage: added ? "checkmark" : "plus")
                    .font(.subheadline.weight(.semibold))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 10)
                    .background(.white.opacity(0.08), in: Capsule())
            }
            .disabled(added)
            .foregroundStyle(.white)
            .sensoryFeedback(.success, trigger: addedIdea)
        }
        .glassCard()
    }
}
