package com.todoapp.component

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.material.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import br.com.zup.nimbus.annotation.AutoDeserialize

@Composable
@AutoDeserialize
fun TextInput(
    label: String,
    value: String? = null,
    onChange: (value: String) -> Unit,
    color: Color? = null,
) {
    val textFieldColor = color ?: Color.DarkGray
    TextField(
        value = value ?: "",
        onValueChange = onChange,
        label = { Text(label) },
        modifier = Modifier.fillMaxWidth(),
        colors = TextFieldDefaults.textFieldColors(
            backgroundColor = Color.Transparent,
            textColor = textFieldColor,
            focusedIndicatorColor = Color.Transparent,
            unfocusedIndicatorColor = Color.Transparent,
            focusedLabelColor = textFieldColor,
            unfocusedLabelColor = textFieldColor,
            cursorColor = textFieldColor,
        )
    )
}
