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



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/adminhouse" element={<AdminHouse />} />
          <Route path="/aduser" element={<ListView />} />
          <Route path="/generateqr" element={<GenerateQR />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/readerqr" element={<ReaderQr />} />
          <Route path="/registerentry" element={<RegisterEntry />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/entryrep" element={<EntryRep />} />
          <Route path="/requestvisit" element={<RequestVisit />} />
          <Route path="/assingrole" element={<ResiterPage />} />
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
