import AdminHouse from "./page/AdminHouse"
import Auth from "./page/Auth"
import ListView from "./page/ListView"
import Home from "./page/Home"
import GenerateQR from "./page/GenerateQR"
import ReaderQr from "./page/ReaderQr"
import RegisterEntry from "./page/RegisterEntry"
import Invitations from "./page/Invitations"
import EntryRep from "./page/EntryRep"
import RequestVisit from "./page/RequestVisit"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResiterPage from "./page/ResiterPage"
import ProtectedRoute from "./protected/ProtectedRoute"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Graphics from "./page/Graphics"
import EditResidents from "./page/EditResidents"



function App() {
  const { token, removeToken } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Auth />} />

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/adminhouse" element={<AdminHouse />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/aduser" element={<ListView />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/generateqr" element={<GenerateQR />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/readerqr" element={<ReaderQr />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/registerentry" element={<RegisterEntry />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/invitations" element={<Invitations />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/entryrep" element={<EntryRep />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/requestvisit" element={<RequestVisit />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route  path="/assingrole" element={<ResiterPage />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/graphics" element={<Graphics />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="/home"/>}>
            <Route path="/editResident" element={<EditResidents/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

