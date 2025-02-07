import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TapeView from "./pages/TapeView";
//import BackupView from "./pages/BackupView";
import Bkview from "./pages/BK_View";
import CloudView from "./pages/CloudView";
import ElementView from "./pages/ElementView";
import InfCopiedView from "./pages/InfCopiedView";
import SupportedServiceView from "./pages/SupportedServiceView";
import RecoveryHistoryView from "./pages/RecoveryHistoryView";
import SendHistView from "./pages/SendHistView";
import BKCloudView from "./pages/BKCloudView";
//import StorageView from "./pages/StorageView";
import TapeTypeView from "./pages/TapeTypeView";
import SendTape from "./pages/Forms/SendTape";
import Medio from "./pages/Forms/Medium";
import TapeType from "./pages/Forms/TapeType";
import InfCopied from "./pages/Forms/InfCopied";
import Frecuency from "./pages/Forms/Frecuency";
import SupportedService from "./pages/Forms/SupportedService";
//import Storage from "./pages/Forms/Storage";
import Element from "./pages/Forms/Element";
import Backup from "./pages/Forms/Backup";
import CloudBackup from "./pages/Forms/CloudBackup";

import DetailedTapeView from "./pages/DetailedViews/DetailedTapeView";
import DetailedBackup from "./pages/DetailedViews/DetailedBackup";
import DetailedFrecuency from "./pages/DetailedViews/DetailedFrecuency";
import DetailedElement from "./pages/DetailedViews/DetailedElement";
import DetailedTapeType from "./pages/DetailedViews/DetailedTapeType";
import DetailedInfCopied from "./pages/DetailedViews/DetailedInfCopied";
import DetailedSupportedS from "./pages/DetailedViews/DetailedSupportedS";
import DetailedCloudView from "./pages/DetailedViews/DetailedCloudView";
import DetailedCloudBackup from "./pages/DetailedViews/DetailedCloudBackup";

import ProtectedRoute from "./components/ProtectedRoute";
import RecoverTape from "./pages/Forms/RecoverTape";
import FrecuenciesView from "./pages/FrecuenciesView";
//import BackupUpdate from "./pages/Forms/Updates/BackupUpdate";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

// function RegisterAndLogout(){
//   localStorage.clear()
//   return <Register/>
// }

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sendTape"
          element={
            <ProtectedRoute>
              <SendTape />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tapeView"
          element={
            <ProtectedRoute>
              <TapeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cloudView"
          element={
            <ProtectedRoute>
              <CloudView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Cloudbackup"
          element={
            <ProtectedRoute>
              <CloudBackup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bkCloudView"
          element={
            <ProtectedRoute>
              <BKCloudView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tapeTypeView"
          element={
            <ProtectedRoute>
              <TapeTypeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/backupView"
          element={
            <ProtectedRoute>
              <Bkview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/elementView"
          element={
            <ProtectedRoute>
              <ElementView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/frecuencyView"
          element={
            <ProtectedRoute>
              <FrecuenciesView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/infView"
          element={
            <ProtectedRoute>
              <InfCopiedView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sspView"
          element={
            <ProtectedRoute>
              <SupportedServiceView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recoveryView"
          element={
            <ProtectedRoute>
              <RecoveryHistoryView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sendHView"
          element={
            <ProtectedRoute>
              <SendHistView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/FormularioMedios"
          element={
            <ProtectedRoute>
              <Medio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tapeType"
          element={
            <ProtectedRoute>
              <TapeType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/infCopied"
          element={
            <ProtectedRoute>
              <InfCopied />
            </ProtectedRoute>
          }
        />
        <Route
          path="/frecuency"
          element={
            <ProtectedRoute>
              <Frecuency />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sspForm"
          element={
            <ProtectedRoute>
              <SupportedService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/element"
          element={
            <ProtectedRoute>
              <Element />
            </ProtectedRoute>
          }
        />
        <Route
          path="/backup"
          element={
            <ProtectedRoute>
              <Backup />
            </ProtectedRoute>
          }
        />

        {/** */}
        <Route
          path="/dTapeView/:id"
          element={
            <ProtectedRoute>
              <DetailedTapeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detailedCloud/:id"
          element={
            <ProtectedRoute>
              <DetailedCloudView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedBackup/:id"
          element={
            <ProtectedRoute>
              <DetailedBackup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedFrecuency/:id"
          element={
            <ProtectedRoute>
              <DetailedFrecuency />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedElement/:id"
          element={
            <ProtectedRoute>
              <DetailedElement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedTapeType/:id"
          element={
            <ProtectedRoute>
              <DetailedTapeType />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedCloudBackup/:id"
          element={
            <ProtectedRoute>
              <DetailedCloudBackup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedInfCopied/:id"
          element={
            <ProtectedRoute>
              <DetailedInfCopied />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detailedSupportedS/:id"
          element={
            <ProtectedRoute>
              <DetailedSupportedS />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recoverTape"
          element={
            <ProtectedRoute>
              <RecoverTape />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}
