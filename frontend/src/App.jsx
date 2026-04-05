import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'
import PostForm from './pages/Post/PostCreate/PostForm'


function App() {
  return (
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout/>}>
              <Route path='/home' element={<Home />}/>
              <Route path='/submit' element={<PostForm/>}>+</Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
