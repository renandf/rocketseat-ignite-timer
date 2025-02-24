import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { TasksContextProvider } from './contexts/TasksContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      
      <BrowserRouter >
        <TasksContextProvider>
          <Router />
        </TasksContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
