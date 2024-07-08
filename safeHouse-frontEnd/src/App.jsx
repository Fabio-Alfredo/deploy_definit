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
import CreateInvitations from "./page/CreateInvitations"
import CreateInvitation from "./page/CreateInvitation"
import HistoryComplete from "./page/HistoryComplete"



function App() {
  const { token, roles } = useContext(AuthContext);


  return (
    <>
      
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Auth />} />

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN']} userRoles={roles} redirectPath="home" />}>
            <Route path="/adminhouse" element={<AdminHouse />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN']} userRoles={roles} redirectPath="home" />}>
            <Route path="/aduser" element={<ListView />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ASAD','RESD', 'VIST']} userRoles={roles} redirectPath="home" />}>
            <Route path="/generateqr" element={<GenerateQR />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN', 'EMPL']} userRoles={roles} redirectPath="home" />}>
            <Route path="/readerqr" element={<ReaderQr />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN', 'EMPL']} userRoles={roles} redirectPath="home" />}>
            <Route path="/registerentry" element={<RegisterEntry />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN', 'RSAD']} userRoles={roles} redirectPath="home" />}>
            <Route path="/invitations" element={<Invitations />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN']} userRoles={roles} redirectPath="home" />}>
            <Route path="/entryrep" element={<EntryRep />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN']} userRoles={roles} redirectPath="home" />}>
            <Route path="/History" element={<HistoryComplete />} /> 
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN', 'RSAD','RESD']} userRoles={roles} redirectPath="home" />}>
            <Route path="/requestvisit" element={<RequestVisit />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} redirectPath="home" />}>
            <Route  path="/assingrole" element={<ResiterPage />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['ADMN']} userRoles={roles} redirectPath="home" />}>
            <Route path="/graphics" element={<Graphics />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['RESD', 'RSAD']} userRoles={roles} redirectPath="home" />}>
            <Route path="/createInvitations" element={<CreateInvitations />} />
          </Route>

          <Route element={<ProtectedRoute canActivate={token} requiredRoles={['RSAD', 'RESD']} userRoles={roles} redirectPath="home" />}>
            <Route path="/createInvitation" element={<CreateInvitation />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

