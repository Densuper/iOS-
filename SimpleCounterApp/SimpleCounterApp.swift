import SwiftUI

@main
struct SimpleCounterApp: App {
    @StateObject private var viewModel = CounterViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView(viewModel: viewModel)
        }
    }
}
