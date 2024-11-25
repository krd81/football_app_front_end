import '../css/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Login'
import Homepage from './Homepage'
import GameWeekSelection from '../common/GameWeekSelection'
import Fixtures from './Fixtures'
import Predictions from './Predictions'

function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar />
    <div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/play' element={<GameWeekSelection />} />
            <Route path='/fixtures' element={<Fixtures />} />
            <Route path='/predictions' element={<Predictions />} />

          </Routes>
          </div>
    </BrowserRouter>


    </>
  )
}

export default App
