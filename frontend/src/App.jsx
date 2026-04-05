import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'


function App() {
  return (
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout/>}>
              <Route path='/home' element={<Home />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
