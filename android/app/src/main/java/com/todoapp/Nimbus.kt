package com.todoapp

import androidx.compose.runtime.Composable
import br.com.zup.nimbus.compose.Nimbus
import br.com.zup.nimbus.compose.NimbusMode
import br.com.zup.nimbus.compose.layout.layoutUI
import br.com.zup.nimbus.compose.ui.NimbusComposeUILibrary
import com.todoapp.component.AppButton
import com.todoapp.component.AppIcon
import com.todoapp.component.CircularButton
import com.todoapp.component.DatePicker
import com.todoapp.component.SelectionGroup
import com.todoapp.component.Spinner
import com.todoapp.component.TextInput
import com.todoapp.component.Toast
import com.todoapp.operation.formatDate

const val BASE_URL = "http://192.168.15.35:3000"

private val todoAppUI = NimbusComposeUILibrary("todoapp")
    .addComponent("textInput") @Composable { TextInput(it) }
    .addComponent("icon") @Composable { AppIcon(it) }
    .addComponent("selectionGroup") @Composable { SelectionGroup(it) }
    .addComponent("circularButton") @Composable { CircularButton(it) }
    .addComponent("button") @Composable { AppButton(it) }
    .addComponent("datePicker") @Composable { DatePicker(it) }
    .addComponent("spinner") @Composable { Spinner() }
    .addComponent("toast") @Composable { Toast(it) }
    .addOperation("formatDate") { formatDate(it) }

val nimbus = Nimbus(
    baseUrl = BASE_URL,
    ui = listOf(layoutUI, todoAppUI),
    mode = if (BuildConfig.DEBUG) NimbusMode.Development else NimbusMode.Release,
)
