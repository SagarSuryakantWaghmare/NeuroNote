import { Dashboard } from './Pages/dashboard'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { LandingPage } from './Pages/landingPage'
import { Share } from './Pages/Share'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/share/:shareLink" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App