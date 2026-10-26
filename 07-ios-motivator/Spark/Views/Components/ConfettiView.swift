import SwiftUI

/// Короткий салют из конфетти — показывается, когда закрыты все задачи.
struct ConfettiView: View {
    private struct Piece: Identifiable {
        let id = UUID()
        let color: Color
        let x: CGFloat
        let delay: Double
        let rotation: Double
        let size: CGFloat
    }

    @State private var fall = false
    private let pieces: [Piece] = (0..<70).map { _ in
        Piece(
            color: [Theme.violet, Theme.pink, Theme.amber, Theme.mint, Theme.sky, Theme.coral].randomElement()!,
            x: .random(in: 0...1),
            delay: .random(in: 0...0.6),
            rotation: .random(in: 180...720),
            size: .random(in: 6...12)
        )
    }

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(pieces) { piece in
                    RoundedRectangle(cornerRadius: 2)
                        .fill(piece.color)
                        .frame(width: piece.size, height: piece.size * 1.6)
                        .rotationEffect(.degrees(fall ? piece.rotation : 0))
                        .position(x: piece.x * geo.size.width, y: fall ? geo.size.height + 40 : -40)
                        .animation(.easeIn(duration: 2.2).delay(piece.delay), value: fall)
                }
            }
        }
        .allowsHitTesting(false)
        .ignoresSafeArea()
        .onAppear { fall = true }
    }
}
