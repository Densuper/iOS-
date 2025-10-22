import Foundation

@MainActor
final class CounterViewModel: ObservableObject {
    @Published private(set) var count: Int {
        didSet {
            guard count != oldValue else { return }
            storage.save(count: count)
        }
    }

    let title: String

    private let storage: CounterStorage

    init(initialCount: Int = 0, title: String = "Daily Steps", storage: CounterStorage = UserDefaultsCounterStorage()) {
        self.storage = storage
        self.title = title

        let persistedCount = storage.loadCount() ?? initialCount
        self.count = max(0, persistedCount)

        if count != persistedCount {
            storage.save(count: count)
        }
    }

    func increment() {
        count += 1
    }

    func decrement() {
        guard count > 0 else { return }
        count -= 1
    }

    func reset() {
        guard count != 0 else { return }
        count = 0
    }
}
