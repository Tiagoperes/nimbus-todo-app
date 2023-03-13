import Foundation
import SwiftUI
import NimbusSwiftUI

struct Spinner: View, Decodable {
  var body: some View {
    ProgressView()
      .progressViewStyle(
        CircularProgressViewStyle(
          tint: Color(red: 97/255, green: 107/255, blue: 118/255)
        )
      )
  }
}
