import Foundation

protocol CounterStorage {
    func loadCount() -> Int?
    func save(count: Int)
}

struct UserDefaultsCounterStorage: CounterStorage {
    private let defaults: UserDefaults
    private let key: String

    init(defaults: UserDefaults = .standard, key: String = "counter.count") {
        self.defaults = defaults
        self.key = key
    }

    func loadCount() -> Int? {
        defaults.object(forKey: key) as? Int
    }

    func save(count: Int) {
        defaults.set(count, forKey: key)
    }
}

final class InMemoryCounterStorage: CounterStorage {
    private var storedCount: Int?

    init(initialValue: Int? = nil) {
        storedCount = initialValue
    }

    func loadCount() -> Int? {
        storedCount
    }

    func save(count: Int) {
        storedCount = count
    }
}
