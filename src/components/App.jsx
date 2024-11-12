import '../css/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Homepage from './Homepage'
import Fixtures from './Fixtures'
import Predictions from './Predictions'

function App() {

//   const Layout = () => {


//   return (
//     <NavBar />
//   )
// }

  return (
    <>
    <BrowserRouter>
    <NavBar />
    <div>
          <Routes>

            <Route path='/' element={<Homepage />} />
            <Route path='/fixtures' element={<Fixtures />} />
            <Route path='/predictions' element={<Predictions />} />

          </Routes>
          </div>
    </BrowserRouter>


    </>
  )
}

export default App
