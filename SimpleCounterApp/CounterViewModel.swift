import Foundation

final class CounterViewModel: ObservableObject {
    @Published private(set) var count: Int
    let title: String

    init(initialCount: Int = 0, title: String = "Daily Steps") {
        self.count = initialCount
        self.title = title
    }

    func increment() {
        count += 1
    }

    func decrement() {
        guard count > 0 else { return }
        count -= 1
    }

    func reset() {
        count = 0
    }
}
