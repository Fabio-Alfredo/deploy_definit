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
import ProtectedRoute from "./service/ProtectedRoute" 
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Graphics from "./page/Graphics"



function App() {
  const { token, removeToken } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/graphics" element={<Graphics/>}/>
          <Route element={<ProtectedRoute canActivate={token} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/adminhouse" element={<AdminHouse />} />
            <Route path="/aduser" element={<ListView />} />
            <Route path="/generateqr" element={<GenerateQR />} />
            <Route path="/readerqr" element={<ReaderQr />} />
            <Route path="/registerentry" element={<RegisterEntry />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/entryrep" element={<EntryRep />} />
            <Route path="/requestvisit" element={<RequestVisit />} />
            <Route path="/assingrole" element={<ResiterPage />} />
            <Route path="/graphics" element={<Graphics />} />
          </Route>
        </Routes>
      </BrowserRouter>


      {/* <AdminHouse/> ya */}
      {/* <GenerateQR/> ya */}
      {/* <Auth/> ya */}
      {/* <ListView/> ya */}
      {/* <ReaderQr/>  ya*/}
      {/* <RegisterEntry/> ya*/}
      {/* <Invitations/> ya */}
      {/*<EntryRep /> ya*/}
      {/* <RequestVisit/> ya*/}
      {/* <ResiterPage/> ya*/}
    </>
  )
}

export default App
