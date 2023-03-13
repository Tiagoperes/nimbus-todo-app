import SwiftUI
import NimbusSwiftUI
import NimbusLayoutSwiftUI

let baseUrl = "http://127.0.0.1:3000"

let todoAppUI = NimbusSwiftUILibrary("todoapp")
  .addComponent("textInput", TextInput.self)
  .addComponent("icon", Icon.self)
  .addComponent("selectionGroup", SelectionGroup.self)
  .addComponent("datePicker", AppDatePicker.self)
  .addComponent("circularButton", CircularButton.self)
  .addComponent("button", AppButton.self)
  .addComponent("spinner", Spinner.self)
  .addComponent("toast", Toast.self)
  .addOperation("formatDate", FormatDate.self)

struct ContentView: View {
  var body: some View {
    Nimbus(baseUrl: baseUrl) {
      NimbusNavigator(url: "/")
    }
    .ui([layout, todoAppUI])
  }
}
