import SwiftUI

struct TasksView: View {
    @EnvironmentObject private var store: AppStore

    @State private var showDone = false
    @State private var showAdd = false
    @State private var quickTitle = ""
    @State private var celebrate = false
    @FocusState private var quickFocused: Bool

    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottomTrailing) {
                AnimatedBackground()

                List {
                    Section {
                        summary
                        quickAdd
                        Picker("", selection: $showDone) {
                            Text("Активные (\(store.activeTasks.count))").tag(false)
                            Text("Готово (\(store.doneTasks.count))").tag(true)
                        }
                        .pickerStyle(.segmented)
                    }
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)
                    .listRowInsets(EdgeInsets(top: 6, leading: 18, bottom: 6, trailing: 18))

                    Section {
                        let tasks = showDone ? store.doneTasks : store.activeTasks
                        if tasks.isEmpty {
                            emptyState
                        }
                        ForEach(tasks) { task in
                            TaskRow(task: task, onToggle: { handleToggle(task) })
                                .swipeActions(edge: .trailing) {
                                    Button(role: .destructive) {
                                        withAnimation { store.delete(task) }
                                    } label: {
                                        Label("Удалить", systemImage: "trash")
                                    }
                                }
                        }
                        if showDone && !tasks.isEmpty {
                            Button("Очистить выполненные", role: .destructive) {
                                withAnimation { store.clearDone() }
                            }
                            .frame(maxWidth: .infinity)
                        }
                    }
                    .listRowBackground(Color.clear)
                    .listRowSeparator(.hidden)
                    .listRowInsets(EdgeInsets(top: 5, leading: 18, bottom: 5, trailing: 18))
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                .animation(.default, value: store.data.tasks)

                Button { showAdd = true } label: {
                    Image(systemName: "plus")
                        .font(.title2.weight(.bold))
                        .foregroundStyle(.white)
                        .frame(width: 62, height: 62)
                        .background(Theme.accent, in: Circle())
                        .shadow(color: Theme.pink.opacity(0.5), radius: 14, y: 6)
                }
                .padding(24)

                if celebrate {
                    ConfettiView()
                        .onAppear {
                            DispatchQueue.main.asyncAfter(deadline: .now() + 3) { celebrate = false }
                        }
                }
            }
            .navigationTitle("Задачи")
            .sheet(isPresented: $showAdd) { AddTaskSheet() }
        }
    }

    private var summary: some View {
        let doneToday = store.tasksCompleted(on: Date()).count
        let totalToday = doneToday + store.activeTasks.count
        let progress = totalToday == 0 ? 0 : Double(doneToday) / Double(totalToday)
        return HStack(spacing: 16) {
            RingView(progress: progress, lineWidth: 8, colors: [Theme.mint, Theme.sky])
                .frame(width: 58, height: 58)
                .overlay(Text("\(Int(progress * 100))%").font(.caption.bold()))
            VStack(alignment: .leading, spacing: 4) {
                Text("Сделано \(doneToday) из \(totalToday)")
                    .font(.headline)
                Text(summaryText(done: doneToday, total: totalToday))
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.65))
            }
        }
        .glassCard(padding: 16)
    }

    private func summaryText(done: Int, total: Int) -> String {
        if total == 0 { return "Запиши 3 дела, которые сделают день лучше." }
        if done == total { return "Все задачи закрыты. Ты супер! 🎉" }
        if done == 0 { return "Начни с самой лёгкой — разгонишься." }
        return "Отличный темп, осталось \(total - done)."
    }

    private var quickAdd: some View {
        HStack {
            Image(systemName: "plus.circle.fill").foregroundStyle(Theme.accent)
            TextField("Быстро добавить задачу…", text: $quickTitle)
                .focused($quickFocused)
                .submitLabel(.done)
                .onSubmit {
                    store.addTask(title: quickTitle)
                    quickTitle = ""
                }
        }
        .glassCard(padding: 14, cornerRadius: 18)
    }

    private var emptyState: some View {
        VStack(spacing: 10) {
            Image(systemName: showDone ? "tray" : "sparkles")
                .font(.system(size: 40))
                .foregroundStyle(Theme.accent)
            Text(showDone ? "Здесь появятся выполненные задачи" : "Нет активных задач")
                .font(.headline)
            Text(showDone ? "Отметь задачу — и она переедет сюда." : "Загляни во вкладку «Идеи», если не знаешь, с чего начать.")
                .font(.subheadline)
                .foregroundStyle(.white.opacity(0.6))
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 30)
    }

    private func handleToggle(_ task: TaskItem) {
        let wasLastActive = !task.isDone && store.activeTasks.count == 1
        withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
            store.toggle(task)
        }
        if wasLastActive { celebrate = true }
    }
}

// MARK: - Строка задачи

struct TaskRow: View {
    @EnvironmentObject private var store: AppStore
    let task: TaskItem
    var onToggle: (() -> Void)?

    var body: some View {
        HStack(spacing: 14) {
            Button {
                if let onToggle {
                    onToggle()
                } else {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) { store.toggle(task) }
                }
            } label: {
                ZStack {
                    Circle()
                        .strokeBorder(task.isDone ? Color.clear : task.priority.color, lineWidth: 2)
                        .background(Circle().fill(task.isDone ? AnyShapeStyle(Theme.accent) : AnyShapeStyle(Color.clear)))
                    if task.isDone {
                        Image(systemName: "checkmark")
                            .font(.caption.weight(.heavy))
                            .foregroundStyle(.white)
                            .transition(.scale)
                    }
                }
                .frame(width: 28, height: 28)
            }
            .buttonStyle(.plain)
            .sensoryFeedback(.success, trigger: task.isDone)

            VStack(alignment: .leading, spacing: 4) {
                Text(task.title)
                    .font(.body.weight(.medium))
                    .strikethrough(task.isDone, color: .white.opacity(0.5))
                    .foregroundStyle(.white.opacity(task.isDone ? 0.5 : 1))
                HStack(spacing: 8) {
                    Label(task.category.title, systemImage: task.category.icon)
                    Text("·")
                    Text(task.priority.title).foregroundStyle(task.priority.color)
                    if !task.isDone, !Calendar.current.isDateInToday(task.createdAt) {
                        Text("· перенесено")
                    }
                }
                .font(.caption)
                .foregroundStyle(.white.opacity(0.55))
                if !task.note.isEmpty {
                    Text(task.note)
                        .font(.caption)
                        .foregroundStyle(.white.opacity(0.5))
                        .lineLimit(2)
                }
            }
            Spacer(minLength: 0)
        }
        .padding(14)
        .background(.white.opacity(0.05), in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}
