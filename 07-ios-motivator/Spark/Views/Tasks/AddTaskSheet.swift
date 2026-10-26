import SwiftUI

struct AddTaskSheet: View {
    @EnvironmentObject private var store: AppStore
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var note = ""
    @State private var priority: Priority = .medium
    @State private var category: TaskCategory = .personal
    @State private var ideas = Array(Suggestions.all.shuffled().prefix(8))
    @FocusState private var titleFocused: Bool

    private var canSave: Bool {
        !title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 22) {
                    VStack(alignment: .leading, spacing: 10) {
                        TextField("Что нужно сделать?", text: $title, axis: .vertical)
                            .font(.title3.weight(.semibold))
                            .focused($titleFocused)
                        TextField("Заметка (необязательно)", text: $note, axis: .vertical)
                            .font(.subheadline)
                            .foregroundStyle(.white.opacity(0.7))
                    }
                    .glassCard()

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Приоритет").font(.headline)
                        HStack(spacing: 8) {
                            ForEach(Priority.allCases) { p in
                                Button { priority = p } label: {
                                    Chip(title: "\(p.title) · +\(p.points)", color: p.color, selected: priority == p)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Категория").font(.headline)
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: 110), spacing: 8)], alignment: .leading, spacing: 8) {
                            ForEach(TaskCategory.allCases) { c in
                                Button { category = c } label: {
                                    Chip(title: c.title, icon: c.icon, color: Theme.violet, selected: category == c)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Нет идей? Попробуй").font(.headline)
                        ScrollView(.horizontal) {
                            HStack(spacing: 8) {
                                ForEach(ideas) { idea in
                                    Button {
                                        title = idea.title
                                        category = idea.category.taskCategory
                                    } label: {
                                        Chip(title: idea.title, icon: idea.icon, color: idea.category.color, selected: false)
                                    }
                                    .buttonStyle(.plain)
                                }
                            }
                        }
                        .scrollIndicators(.hidden)
                    }
                }
                .padding(20)
            }
            .background(Theme.background.ignoresSafeArea())
            .navigationTitle("Новая задача")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Отмена") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Добавить") {
                        store.addTask(title: title, category: category, priority: priority, note: note)
                        dismiss()
                    }
                    .disabled(!canSave)
                    .fontWeight(.semibold)
                }
            }
            .onAppear { titleFocused = true }
        }
        .presentationDetents([.large])
        .presentationBackground(Theme.background)
    }
}
