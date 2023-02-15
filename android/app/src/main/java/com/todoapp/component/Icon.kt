package com.todoapp.component

import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material.Icon
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.Delete
import androidx.compose.material.icons.outlined.Search
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import br.com.zup.nimbus.annotation.AutoDeserialize

enum class IconName { Search, Delete, Plus }

@Composable
@AutoDeserialize
fun AppIcon(
    name: IconName,
    color: Color? = null,
    size: Double? = null,
) {
    val tint = color ?: Color.Unspecified
    val iconSize = size ?: 20.0
    val modifier = Modifier.width(iconSize.dp).height(iconSize.dp)
    val icon = when (name) {
        IconName.Search -> Icons.Outlined.Search
        IconName.Delete -> Icons.Outlined.Delete
        IconName.Plus -> Icons.Outlined.Add
    }
    Icon(icon, "", modifier, tint)
}

