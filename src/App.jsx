import {Routes,Route} from "react-router-dom"
import SplashScreen from "./components/SplashScreen"
import Login from "./components/Login"
import Home from "./components/Home"



function App(){
return(
<div>

  
<Routes>

<Route path="/" element={<SplashScreen />} />
<Route path="/login" element={<Login />} />
<Route path="/home/:userId/:name"  element={<Home />} />

 </Routes>
</div>

)}
export default App

