import { Dashboard } from './Pages/dashboard'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
    
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App