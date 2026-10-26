import SwiftUI

enum AppTab: Hashable {
    case today, tasks, ideas, stats
}

struct RootView: View {
    @EnvironmentObject private var store: AppStore
    @State private var tab: AppTab = .today

    var body: some View {
        if store.data.onboarded {
            TabView(selection: $tab) {
                HomeView(tab: $tab)
                    .tabItem { Label("Сегодня", systemImage: "sun.max.fill") }
                    .tag(AppTab.today)
                TasksView()
                    .tabItem { Label("Задачи", systemImage: "checklist") }
                    .tag(AppTab.tasks)
                IdeasView()
                    .tabItem { Label("Идеи", systemImage: "lightbulb.fill") }
                    .tag(AppTab.ideas)
                StatsView()
                    .tabItem { Label("Прогресс", systemImage: "chart.bar.fill") }
                    .tag(AppTab.stats)
            }
            .onAppear { store.registerVisit() }
        } else {
            OnboardingView()
        }
    }
}
