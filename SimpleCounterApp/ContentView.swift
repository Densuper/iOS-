import SwiftUI

struct ContentView: View {
    @ObservedObject var viewModel: CounterViewModel

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Text(viewModel.title)
                    .font(.largeTitle)
                    .fontWeight(.semibold)

                Text("\(viewModel.count)")
                    .font(.system(size: 72, weight: .bold, design: .rounded))
                    .monospacedDigit()
                    .accessibilityIdentifier("counterLabel")

                HStack(spacing: 16) {
                    Button(action: viewModel.decrement) {
                        Label("Decrease", systemImage: "minus.circle.fill")
                            .labelStyle(.iconOnly)
                            .font(.system(size: 48))
                            .foregroundColor(.red)
                    }
                    .accessibilityIdentifier("decrementButton")

                    Button(action: viewModel.increment) {
                        Label("Increase", systemImage: "plus.circle.fill")
                            .labelStyle(.iconOnly)
                            .font(.system(size: 48))
                            .foregroundColor(.green)
                    }
                    .accessibilityIdentifier("incrementButton")
                }

                Button(role: .destructive, action: viewModel.reset) {
                    Text("Reset")
                        .font(.headline)
                        .padding(.horizontal, 24)
                        .padding(.vertical, 12)
                        .background(.thinMaterial)
                        .clipShape(Capsule())
                }
                .accessibilityIdentifier("resetButton")

                Spacer()
            }
            .padding()
            .navigationTitle("Counter")
        }
        .tint(.accentColor)
    }
}

#Preview {
    ContentView(viewModel: CounterViewModel())
}
