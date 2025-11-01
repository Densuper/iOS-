# SimpleCounterApp

A lightweight SwiftUI counter app that demonstrates how to build a minimal iOS experience without relying on Xcode templates. The view layer is powered by `ContentView`, while `CounterViewModel` owns the state and business logic.

## Features
- Increment, decrement (non-negative), and reset actions for the counter value
- Automatically persists the counter between launches using `UserDefaults`
- Accessible controls using identifiers for UI testing
- Uses SwiftUI's `NavigationStack` and modern styling

## Project Structure
```
SimpleCounterApp.xcodeproj    // Xcode project file
SimpleCounterApp/             // App sources & resources
├── Assets.xcassets           // Image & color assets
├── ContentView.swift         // SwiftUI view hierarchy
├── CounterStorage.swift      // Persistence abstraction & implementations
├── CounterViewModel.swift    // ObservableObject providing counter logic
├── Preview Content/          // SwiftUI preview assets
└── SimpleCounterApp.swift    // Application entry point
```

## Getting Started
1. Open `SimpleCounterApp.xcodeproj` in Xcode 15 or newer.
2. Update the bundle identifier and signing team in **Targets ▸ SimpleCounterApp ▸ Signing & Capabilities**.
3. Choose an iOS simulator (iOS 16.0 or later) and press **Run**.

The project uses an automatically generated Info.plist and modern SwiftUI app lifecycle, so no additional setup is required.
