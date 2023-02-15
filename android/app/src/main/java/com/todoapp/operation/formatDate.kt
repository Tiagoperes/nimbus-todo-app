package com.todoapp.operation

import br.com.zup.nimbus.annotation.AutoDeserialize
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

const val DATE_FORMAT = "dd/MM/yyyy"

@AutoDeserialize
internal fun formatDate(dateInMilliseconds: Long): String {
    val formatter = SimpleDateFormat(DATE_FORMAT, Locale.ENGLISH)
    formatter.timeZone = TimeZone.getTimeZone("UTC")
    val dateTime = Date(dateInMilliseconds)
    return formatter.format(dateTime)
}
