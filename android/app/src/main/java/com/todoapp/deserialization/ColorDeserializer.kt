package com.todoapp.deserialization

import androidx.compose.ui.graphics.Color
import br.com.zup.nimbus.annotation.Deserializer
import br.com.zup.nimbus.compose.layout.extensions.color
import br.com.zup.nimbus.core.deserialization.AnyServerDrivenData

@Deserializer
fun deserializeColor(data: AnyServerDrivenData): Color? = data.asStringOrNull()?.color
