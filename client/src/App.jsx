import React from "react"
import Mainroutes from "./Allroutes/Mainroutes"
import Dashboard from "./Page/Dashboard"
import { useLocation } from "react-router"

function App() {

  const location = useLocation();
  const isAuthPage = ["/Signin", "/Signup", "/Addherovillains","/Updatevillains"].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {isAuthPage ? (
        <Mainroutes />
      ) : (
        <Dashboard>
          <Mainroutes />
        </Dashboard>
      )}
    </>
  )
}

export default App;
