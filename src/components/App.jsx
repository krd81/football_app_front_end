import '../css/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'

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
    <h1>Football Predictions</h1>
      <h1>2024/2025 Season</h1>
      <h2>Current game week: </h2>

    </>
  )
}

export default App
