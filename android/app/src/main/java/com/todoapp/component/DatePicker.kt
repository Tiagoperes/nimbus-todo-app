package com.todoapp.component

import android.widget.CalendarView
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.viewinterop.AndroidView
import br.com.zup.nimbus.annotation.AutoDeserialize
import java.util.GregorianCalendar

@Composable
@AutoDeserialize
fun DatePicker(
    value: Long? = null,
    onChange: (value: Long) -> Unit,
) {
    val (firstRender, setFirstRender) = remember { mutableStateOf(true) }

    AndroidView(
        { CalendarView(it) },
        update = { views ->
            if (firstRender) views.date = value ?: System.currentTimeMillis()
            views.setOnDateChangeListener { _, year, month, day ->
                val date = GregorianCalendar(year, month - 1, day).time
                onChange(date.time)
            }
            setFirstRender(false)
        }
    )
}