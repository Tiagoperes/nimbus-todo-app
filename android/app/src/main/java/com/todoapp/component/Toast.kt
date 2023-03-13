package com.todoapp.component

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import br.com.zup.nimbus.annotation.AutoDeserialize
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

const val DURATION_MILLIS = 6000L

@Composable
@AutoDeserialize
fun Toast(
    message: String,
    onHide: () -> Unit,
) {
    val scope = rememberCoroutineScope()

    LaunchedEffect(message) {
        if (message.isNotEmpty()) {
            scope.launch {
                delay(DURATION_MILLIS)
                onHide()
            }
        }
    }

    Column(
        Modifier
            .alpha(if (message.isEmpty()) 0F else 1F)
            .clip(RoundedCornerShape(50))
            .background(Color(red = 220, green = 0, blue = 0, alpha = (0.65 * 255).toInt()))
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Text(message, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
    }
}