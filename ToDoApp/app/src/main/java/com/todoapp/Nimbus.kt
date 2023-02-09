package com.todoapp

import br.com.zup.nimbus.compose.Nimbus
import br.com.zup.nimbus.compose.NimbusMode
import br.com.zup.nimbus.compose.layout.layoutUI

const val BASE_URL = "http://10.0.2.2:3000"

val nimbus = Nimbus(
    baseUrl = BASE_URL,
    ui = listOf(layoutUI),
    mode = if (BuildConfig.DEBUG) NimbusMode.Development else NimbusMode.Release,
)
