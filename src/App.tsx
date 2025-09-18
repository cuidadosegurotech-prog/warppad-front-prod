
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import ConsultarSolicitudes from "./pages/ConsultarSolicitudes";
import Configuracion from "./pages/Configuracion";
import ComponentesUI from "./pages/ComponentesUI";
import PlantillasCorreo from "./pages/PlantillasCorreo";
import NotFound from "./pages/NotFound";
import Keycloak from "keycloak-js"
import { useEffect, useState } from "react";
import { log } from "console";
import { url } from "inspector";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { KeycloakProvider, useKeycloak } from "@/context/KeycloakContext";

function AppContent() {
  const { keycloak, authenticated, logout } = useKeycloak();
  const queryClient = new QueryClient();

  if (!keycloak) {
  return <div>Cargando Keycloak...<button onClick={() => keycloak?.logout({ redirectUri: window.location.origin })}>
  Forzar Logout
</button></div>;
  }

  // ? No muestres nada hasta saber si está autenticado
  if (typeof authenticated === 'undefined') {
  return <div>Verificando autenticación...</div>;
  }

  if (!authenticated) {
  return null; // Keycloak debería redirigir
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark" style={{background : "#4338ca"}}>
            <div className="container-fluid">
              <a className="navbar-brand" onClick={logout}>WarpPAD App</a>
            </div>
          </nav>
          
          {authenticated ? (
            <Routes>
              <Route path="/NuevaSolicitud" element={<MainLayout LogOut={logout}><NuevaSolicitud /></MainLayout>} />
              <Route path="/ConsultarSolicitudes" element={ <MainLayout LogOut={logout}><ConsultarSolicitudes /></MainLayout>} />
              <Route path="/ComponentesUi" element={ <MainLayout LogOut={logout}><ComponentesUI /></MainLayout>} />
              <Route path="/PlantillasCorreo" element={ <MainLayout LogOut={logout}><PlantillasCorreo /></MainLayout>} />
              <Route path="*" element={<MainLayout LogOut={logout}> <NotFound></NotFound></MainLayout>} />
            </Routes>
          ) : (
            <div className="container mt-4">
              <h2>Acceso no autorizado. Redirigiendo al login...</h2>
            </div>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <KeycloakProvider>
      <AppContent />
    </KeycloakProvider>
  );
}

export default App;


/*
const keycloakOptions = {
  url: "http://localhost:8080/",
  realm: "WarpPAD",
  clientId: "warppad"
}
const queryClient = new QueryClient();

function App(){
  const [keycloak,setKeycloak] = useState(null)

  useEffect(() =>{
    const initKeycloak = async() => {
      const keycloakInstance = new Keycloak(keycloakOptions)
      try {
        await keycloakInstance.init({onLoad: 'login-required'})
        if(keycloakInstance.authenticated){
          console.log(keycloakInstance);          
        }
        setKeycloak(keycloakInstance)
      }catch (error){
        console.log(error);
      }
    }
    initKeycloak()
  },[])

  const hasdleLogout = () => {
    if (keycloak) {
      //console.log(keycloak);
      keycloak.logout();
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={hasdleLogout}>WarpPAD App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div >
            <ul className="navbar-nav ms-auto">
              {(keycloak && keycloak.authenticated) ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={hasdleLogout}>Cerrar sesión</button>
                </li>
              ): null}
            </ul>
            <div>
              <h2>{keycloak && keycloak.tokenParsed ? `Hola ${keycloak.tokenParsed.name}` : "Cargando usuario..."}</h2>
            </div>
          </div>
        </div>
      </nav>
          {keycloak && keycloak.authenticated ? (
            <Routes>
              <Route path="/NuevaSolicitud" element={<MainLayout><NuevaSolicitud /></MainLayout>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          ) : (
            <div className="container mt-4">
              <h2>Acceso no autorizado. Redirigiendo al login...</h2>
            </div>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );/*

  /*
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={hasdleLogout}>React App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div >
            <ul className="navbar-nav ms-auto">
              {(keycloak && keycloak.authenticated) ? (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={hasdleLogout}>Cerrar sesión</button>
                </li>
              ): null}
            </ul>
          </div>
        </div>
      </nav>
      
      <div>
        {keycloak && keycloak.authenticated ? (
          <div>
            
           <h2>Bueno</h2>
          </div>
        ) : (
          <div>
            <h2>Malo</h2>
          </div>
        )} 
      </div>
    </div>
   );*/
//}

//export default App;

/*
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/nueva-solicitud" element={<MainLayout><NuevaSolicitud /></MainLayout>} />
          <Route path="/consultar-solicitudes" element={<MainLayout><ConsultarSolicitudes /></MainLayout>} />
          <Route path="/configuracion" element={<MainLayout><Configuracion /></MainLayout>} />
          <Route path="/componentes-ui" element={<MainLayout><ComponentesUI /></MainLayout>} />
          <Route path="/plantillas-correo" element={<MainLayout><PlantillasCorreo /></MainLayout>} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);*/

