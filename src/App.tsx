
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
import NotFound from "./pages/NotFound";

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
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
