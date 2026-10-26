import SwiftUI

struct IdeasView: View {
    @EnvironmentObject private var store: AppStore

    @State private var energy: Energy = .medium
    @State private var category: IdeaCategory?
    @State private var surprise: Suggestion?
    @State private var plan: [PlanItem] = []
    @State private var addedCount = 0

    private var ideas: [Suggestion] {
        Suggestions.filtered(energy: energy, category: category)
    }

    var body: some View {
        NavigationStack {
            ZStack {
                AnimatedBackground()

                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        energyPicker
                        surpriseCard
                        planCard
                        categoryPicker
                        LazyVStack(spacing: 12) {
                            ForEach(ideas) { idea in
                                IdeaRow(idea: idea, added: store.hasTask(titled: idea.title)) { add(idea) }
                            }
                        }
                    }
                    .padding(.horizontal, 18)
                    .padding(.bottom, 32)
                }
                .scrollIndicators(.hidden)
            }
            .navigationTitle("Чем заняться?")
            .sensoryFeedback(.success, trigger: addedCount)
        }
    }

    // MARK: Энергия

    private var energyPicker: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Сколько у тебя сил?")
                .font(.subheadline)
                .foregroundStyle(.white.opacity(0.7))
            HStack(spacing: 8) {
                ForEach(Energy.allCases) { e in
                    Button {
                        withAnimation(.snappy) { energy = e }
                    } label: {
                        VStack(spacing: 6) {
                            Image(systemName: e.icon).font(.title3)
                            Text(e.title).font(.caption.weight(.semibold))
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .fill(energy == e ? AnyShapeStyle(Theme.accent) : AnyShapeStyle(Color.white.opacity(0.06)))
                        )
                        .foregroundStyle(.white)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    // MARK: Удиви меня

    private var surpriseCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Скучно? Не открывай ленту")
                        .font(.headline)
                    Text("Нажми — и получи дело на ближайшие полчаса")
                        .font(.subheadline)
                        .foregroundStyle(.white.opacity(0.75))
                }
                Spacer()
                Image(systemName: "dice.fill")
                    .font(.system(size: 34))
                    .rotationEffect(.degrees(Double(addedCount + (surprise?.title.count ?? 0)) * 36))
            }

            if let surprise {
                HStack(spacing: 12) {
                    Image(systemName: surprise.icon)
                        .font(.title3)
                        .frame(width: 44, height: 44)
                        .background(.white.opacity(0.2), in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                    VStack(alignment: .leading, spacing: 2) {
                        Text(surprise.title).font(.headline)
                        Text(surprise.detail)
                            .font(.subheadline)
                            .foregroundStyle(.white.opacity(0.85))
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
                .id(surprise.id)
                .transition(.scale(scale: 0.9).combined(with: .opacity))
            }

            HStack(spacing: 10) {
                Button {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.65)) {
                        surprise = Suggestions.filtered(energy: energy, category: nil)
                            .filter { $0 != surprise }
                            .randomElement()
                    }
                } label: {
                    Label(surprise == nil ? "Удиви меня" : "Другое", systemImage: "shuffle")
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(.white.opacity(0.2), in: Capsule())
                }
                if let surprise {
                    let added = store.hasTask(titled: surprise.title)
                    Button { add(surprise) } label: {
                        Label(added ? "В задачах" : "Беру!", systemImage: added ? "checkmark" : "plus")
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(.white, in: Capsule())
                            .foregroundStyle(Theme.pink)
                    }
                    .disabled(added)
                }
            }
            .font(.subheadline.weight(.semibold))
        }
        .foregroundStyle(.white)
        .padding(20)
        .background(Theme.warm, in: RoundedRectangle(cornerRadius: 26, style: .continuous))
        .shadow(color: Theme.coral.opacity(0.35), radius: 18, y: 8)
    }

    // MARK: План дня

    private var planCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            SectionHeader(title: "План дня", icon: "calendar.day.timeline.left",
                          actionTitle: plan.isEmpty ? nil : "Пересобрать") { buildPlan() }

            if plan.isEmpty {
                Text("Соберу для тебя сбалансированный день: что-то для тела, ума и души.")
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.7))
                Button("Собрать план") { buildPlan() }
                    .buttonStyle(GradientButtonStyle())
            } else {
                ForEach(plan) { item in
                    HStack(spacing: 12) {
                        VStack(spacing: 4) {
                            Image(systemName: item.part.icon)
                                .foregroundStyle(Theme.warm)
                            Text(item.part.title)
                                .font(.caption2.weight(.semibold))
                                .foregroundStyle(.white.opacity(0.6))
                        }
                        .frame(width: 50)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(item.idea.title).font(.subheadline.weight(.semibold))
                            Text(item.idea.minutes > 0 ? "\(item.idea.category.title) · ~\(item.idea.minutes) мин" : item.idea.category.title)
                                .font(.caption)
                                .foregroundStyle(.white.opacity(0.55))
                        }
                        Spacer()
                    }
                    .transition(.move(edge: .leading).combined(with: .opacity))
                }
                let allAdded = plan.allSatisfy { store.hasTask(titled: $0.idea.title) }
                Button(allAdded ? "План уже в задачах ✓" : "Добавить весь план в задачи") {
                    plan.forEach { item in
                        if !store.hasTask(titled: item.idea.title) {
                            store.addTask(title: item.idea.title, category: item.idea.category.taskCategory)
                        }
                    }
                    addedCount += 1
                }
                .buttonStyle(GradientButtonStyle(gradient: Theme.cool))
                .disabled(allAdded)
            }
        }
        .glassCard()
    }

    // MARK: Категории

    private var categoryPicker: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Все идеи").font(.title3.weight(.bold))
            ScrollView(.horizontal) {
                HStack(spacing: 8) {
                    Button { withAnimation { category = nil } } label: {
                        Chip(title: "Все", icon: "square.grid.2x2.fill", color: Theme.violet, selected: category == nil)
                    }
                    ForEach(IdeaCategory.allCases) { c in
                        Button { withAnimation { category = c } } label: {
                            Chip(title: c.title, icon: c.icon, color: c.color, selected: category == c)
                        }
                    }
                }
                .buttonStyle(.plain)
            }
            .scrollIndicators(.hidden)
        }
    }

    // MARK: Действия

    private func add(_ idea: Suggestion) {
        guard !store.hasTask(titled: idea.title) else { return }
        store.addTask(title: idea.title, category: idea.category.taskCategory)
        addedCount += 1
    }

    private func buildPlan() {
        withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
            plan = Suggestions.dayPlan(energy: energy)
        }
    }
}

// MARK: - Карточка идеи

struct IdeaRow: View {
    let idea: Suggestion
    let added: Bool
    let onAdd: () -> Void

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: idea.icon)
                .font(.title3)
                .foregroundStyle(.white)
                .frame(width: 48, height: 48)
                .background(idea.category.color.gradient, in: RoundedRectangle(cornerRadius: 15, style: .continuous))

            VStack(alignment: .leading, spacing: 3) {
                Text(idea.title).font(.subheadline.weight(.semibold))
                Text(idea.detail)
                    .font(.caption)
                    .foregroundStyle(.white.opacity(0.6))
                    .fixedSize(horizontal: false, vertical: true)
                if idea.minutes > 0 {
                    Label("~\(idea.minutes) мин", systemImage: "clock")
                        .font(.caption2)
                        .foregroundStyle(idea.category.color)
                }
            }

            Spacer(minLength: 4)

            Button(action: onAdd) {
                Image(systemName: added ? "checkmark.circle.fill" : "plus.circle.fill")
                    .font(.system(size: 28))
                    .foregroundStyle(added ? AnyShapeStyle(Theme.mint) : AnyShapeStyle(Theme.accent))
                    .contentTransition(.symbolEffect(.replace))
            }
            .buttonStyle(.plain)
            .disabled(added)
        }
        .glassCard(padding: 14, cornerRadius: 20)
    }
}
