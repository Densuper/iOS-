# SimpleCounterApp

A lightweight SwiftUI counter app that demonstrates how to build a minimal iOS experience without relying on Xcode templates. The view layer is powered by `ContentView`, while `CounterViewModel` owns the state and business logic.

## Features
- Increment, decrement (non-negative), and reset actions for the counter value
- Automatically persists the counter between launches using `UserDefaults`
- Accessible controls using identifiers for UI testing
- Uses SwiftUI's `NavigationStack` and modern styling

## Project Structure
```
SimpleCounterApp/
├── ContentView.swift         // SwiftUI view hierarchy
├── CounterStorage.swift      // Persistence abstraction & implementations
├── CounterViewModel.swift    // ObservableObject providing counter logic
└── SimpleCounterApp.swift    // Application entry point
```

## Getting Started
1. Open the folder in Xcode as a Swift Playgrounds-based project or integrate the files into an existing iOS target.
2. Ensure the deployment target supports SwiftUI (iOS 15 or later).
3. Build and run on a simulator or device.

You can also create a new SwiftUI app in Xcode and replace the generated files with the ones in this repository.
