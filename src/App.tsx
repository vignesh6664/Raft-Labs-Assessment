import { Route,Routes, useNavigate } from "react-router-dom"
import Login from "./Components/Login/Login"
import Navigation from "./Components/Navbar/Navigation"
import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "./firebase-config"
import Feeds from "./Components/Feeds/Feeds"
import CreateFeeds from "./Components/CreateFeeds/CreateFeeds"

const App = () => {
  const [isLoggedIn, setIsLogged]=useState<boolean>(false)
  const [welcomeUser,setWelcomeUser]=useState<string | null>(null)
  const navigate=useNavigate()
  
// Function to handle user logins
  const handleLoginSuccess =(email:string)=>{
    setIsLogged(true)
    setWelcomeUser(email)
    navigate('/feeds')
  }

  const handleLogout =async()=>{
    try{
      await signOut(auth) // by using firebase making logging out the user
      setIsLogged(false)
      navigate('/')
    }catch (err:any){
      console.error("LogoutError",err.message)
    }
  }

  return (
    <>
  {/* Only allows after login */}
    {isLoggedIn && <Navigation onLogout={handleLogout}/>}

<Routes>
  <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
  
  {/* Protected route: Home, only accessible after login */}
  {isLoggedIn && welcomeUser && <Route path="/feeds" element={<Feeds email={welcomeUser} />} />}

  {isLoggedIn && <Route path="/create-feed" element={<CreateFeeds />} />}

</Routes>
    </>
  )
}

export default App