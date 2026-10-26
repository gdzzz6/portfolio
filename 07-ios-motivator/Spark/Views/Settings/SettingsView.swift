import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var store: AppStore
    @Environment(\.dismiss) private var dismiss
    @State private var confirmReset = false

    private var reminderTime: Binding<Date> {
        Binding {
            Calendar.current.date(bySettingHour: store.data.reminderHour, minute: store.data.reminderMinute, second: 0, of: Date()) ?? Date()
        } set: { date in
            let parts = Calendar.current.dateComponents([.hour, .minute], from: date)
            store.data.reminderHour = parts.hour ?? 9
            store.data.reminderMinute = parts.minute ?? 0
            NotificationManager.shared.rescheduleDailyReminders(store: store)
        }
    }

    private var reminderEnabled: Binding<Bool> {
        Binding {
            store.data.reminderEnabled
        } set: { enabled in
            store.data.reminderEnabled = enabled
            Task { @MainActor in
                if enabled {
                    let granted = await NotificationManager.shared.requestAuthorization()
                    if !granted { store.data.reminderEnabled = false }
                }
                NotificationManager.shared.rescheduleDailyReminders(store: store)
            }
        }
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Профиль") {
                    TextField("Твоё имя", text: $store.data.userName)
                }

                Section {
                    Toggle("Ежедневное напоминание", isOn: reminderEnabled)
                    if store.data.reminderEnabled {
                        DatePicker("Время", selection: reminderTime, displayedComponents: .hourAndMinute)
                    }
                } header: {
                    Text("Напоминания")
                } footer: {
                    Text("Каждый день — новая цитата вместо уведомлений из соцсетей.")
                }

                Section {
                    Stepper("Задач в день: \(store.data.dailyTaskGoal)", value: $store.data.dailyTaskGoal, in: 1...10)
                    Stepper("Фокус: \(store.data.dailyFocusGoal) мин", value: $store.data.dailyFocusGoal, in: 15...240, step: 15)
                } header: {
                    Text("Цели на день")
                } footer: {
                    Text("Шкала продуктивности: задачи — 50 очков, фокус — 35, отметка настроения — 15. Главная задача даёт +3, важная +2, лёгкая +1.")
                }

                Section {
                    Button("Сбросить весь прогресс", role: .destructive) { confirmReset = true }
                }

                Section {
                    HStack {
                        Spacer()
                        VStack(spacing: 4) {
                            Text("Искра ✨").font(.headline)
                            Text("Меньше скролла — больше жизни").font(.caption).foregroundStyle(.secondary)
                        }
                        Spacer()
                    }
                }
                .listRowBackground(Color.clear)
            }
            .scrollContentBackground(.hidden)
            .background(Theme.background.ignoresSafeArea())
            .navigationTitle("Настройки")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Готово") { dismiss() }
                }
            }
            .confirmationDialog("Удалить задачи, серию и статистику?", isPresented: $confirmReset, titleVisibility: .visible) {
                Button("Сбросить", role: .destructive) { store.resetAll() }
            }
        }
        .presentationBackground(Theme.background)
    }
}
