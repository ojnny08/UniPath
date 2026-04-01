import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>

        </Route>
        <Route element={<ProtectedRoute />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
