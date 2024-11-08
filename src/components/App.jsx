import '../css/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Homepage from './Homepage'

function App() {

//   const Layout = () => {


//   return (
//     <NavBar />
//   )
// }

  return (
    <>
    <BrowserRouter>
    <div>

        <NavBar>

        <Routes>
        <Route path='/' />
        {/* <Route path='/home' element={<HomePage />} /> */}
      </Routes>
      </NavBar>

      </div>
    </BrowserRouter>
    <Homepage />

    </>
  )
}

export default App
