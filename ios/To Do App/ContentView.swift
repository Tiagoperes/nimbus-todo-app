import SwiftUI
import NimbusSwiftUI
import NimbusLayoutSwiftUI

let baseUrl = "http://127.0.0.1:3000"

struct ContentView: View {
  var body: some View {
    Nimbus(baseUrl: baseUrl) {
      NimbusNavigator(url: "/")
    }
    .ui([layout])
  }
}
