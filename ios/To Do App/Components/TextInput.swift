import SwiftUI
import NimbusSwiftUI

private let defaultColor = Color(red: 97/255, green: 107/255, blue: 118/255)

struct TextInput: View, Decodable {
  var label: String
  var value: String?
  var color: Color?
  @StatefulEvent var onChange: (String) -> Void

  var body: some View {
    let binding = Binding(
        get: { value ?? "" },
        set: {
          onChange($0)
        }
    )
    VStack(alignment: .leading) {
      if (color == nil) {
        TextField(label, text: binding).foregroundColor(defaultColor)
      } else {
        ZStack(alignment: .leading) {
          if (value?.isEmpty != false) { Text(label).foregroundColor(color) }
          TextField("", text: binding)
            .foregroundColor(color)
            .accentColor(color)
        }
      }
    }.padding(16)
  }
}
