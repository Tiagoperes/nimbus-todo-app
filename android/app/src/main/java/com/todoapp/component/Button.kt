package com.todoapp.component

import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import br.com.zup.nimbus.annotation.AutoDeserialize

@Composable
@AutoDeserialize
fun AppButton(
    text: String,
    primary: Boolean? = null,
    onPress: () -> Unit,
) {
    val primaryColors = ButtonDefaults.buttonColors(
        backgroundColor = Color(red = 95, green = 114, blue = 192),
        contentColor = Color.White,
    )
    val secondaryColors = ButtonDefaults.buttonColors(
        backgroundColor = Color(red = 241, green = 243, blue = 245),
        contentColor = Color.DarkGray,
    )
    Button(
        content = { Text(text) },
        onClick = onPress,
        colors = if (primary == true) primaryColors else secondaryColors,
    )
}