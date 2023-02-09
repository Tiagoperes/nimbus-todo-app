package com.todoapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import br.com.zup.nimbus.compose.NimbusNavigator
import br.com.zup.nimbus.compose.ProvideNimbus
import br.com.zup.nimbus.core.network.ViewRequest
import com.todoapp.ui.theme.ToDoAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ToDoAppTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    // Providing the nimbus configuration to the render tree
                    ProvideNimbus(nimbus) {
                        // your content goes here. Every node from here and on will use the provided nimbus instance
                        NimbusNavigator(ViewRequest("/"))
                    }
                }
            }
        }
    }
}
