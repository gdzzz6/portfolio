import SwiftUI

@main
struct SparkApp: App {
    @StateObject private var store = AppStore()
    @Environment(\.scenePhase) private var scenePhase

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
                .tint(Theme.violet)
        }
        .onChange(of: scenePhase) { _, phase in
            if phase == .active {
                store.registerVisit()
                NotificationManager.shared.rescheduleDailyReminders(store: store)
            }
        }
    }
}
