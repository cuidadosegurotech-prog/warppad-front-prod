
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Clock, CheckCircle, AlertCircle, XCircle, Eye } from "lucide-react";

// Datos de ejemplo
const solicitudesEjemplo = [
  {
    id: "REQ-001",
    titulo: "Automatizar proceso de facturación",
    tipo: "Workflow",
    estado: "En progreso",
    prioridad: "Alta",
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-20",
  },
  {
    id: "REQ-002",
    titulo: "Integración con sistema CRM",
    tipo: "Integración",
    estado: "Completado",
    prioridad: "Media",
    fechaCreacion: "2024-01-10",
    fechaActualizacion: "2024-01-18",
  },
  {
    id: "REQ-003", 
    titulo: "Reportes automáticos de ventas",
    tipo: "Reporte automático",
    estado: "Pendiente",
    prioridad: "Baja",
    fechaCreacion: "2024-01-22",
    fechaActualizacion: "2024-01-22",
  },
  {
    id: "REQ-004",
    titulo: "Sistema de notificaciones push",
    tipo: "Sistema de notificaciones",
    estado: "Cancelado",
    prioridad: "Media",
    fechaCreacion: "2024-01-08",
    fechaActualizacion: "2024-01-12",
  },
];

export default function ConsultarSolicitudes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [solicitudes] = useState(solicitudesEjemplo);

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "Completado":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "En progreso":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "Pendiente":
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case "Cancelado":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "En progreso":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30";
      case "Pendiente":
        return "bg-orange-400/20 text-orange-400 border-orange-400/30";
      case "Cancelado":
        return "bg-red-400/20 text-red-400 border-red-400/30";
      default:
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
    }
  };

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "bg-red-400/20 text-red-400";
      case "Media":
        return "bg-yellow-400/20 text-yellow-400";
      case "Baja":
        return "bg-green-400/20 text-green-400";
      case "Urgente":
        return "bg-purple-400/20 text-purple-400";
      default:
        return "bg-blue-400/20 text-blue-400";
    }
  };

  const filteredSolicitudes = solicitudes.filter(solicitud =>
    solicitud.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solicitud.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent">
          Consultar Solicitudes
        </h1>
        <p className="text-blue-200">
          Revisa el estado de todas tus solicitudes de automatización
        </p>
      </div>

      {/* Search Bar */}
      <Card className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
          <Input
            placeholder="Buscar por título, ID o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 bg-blue-900/20 border-blue-400/30 text-white placeholder:text-blue-300 focus:border-yellow-400 focus:ring-yellow-400/20"
          />
        </div>
      </Card>

      {/* Solicitudes List */}
      <div className="space-y-4">
        {filteredSolicitudes.length === 0 ? (
          <Card className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-8 text-center">
            <p className="text-blue-300">No se encontraron solicitudes que coincidan con tu búsqueda.</p>
          </Card>
        ) : (
          filteredSolicitudes.map((solicitud) => (
            <Card key={solicitud.id} className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-6 hover:bg-blue-700/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(solicitud.estado)}
                      <span className="text-sm font-mono text-blue-300">{solicitud.id}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white">{solicitud.titulo}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(solicitud.estado)}>
                      {solicitud.estado}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(solicitud.prioridad)}>
                      {solicitud.prioridad}
                    </Badge>
                    <Badge variant="outline" className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30">
                      {solicitud.tipo}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 text-sm text-blue-300">
                    <span>Creado: {new Date(solicitud.fechaCreacion).toLocaleDateString()}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Actualizado: {new Date(solicitud.fechaActualizacion).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-800/30 border-blue-400/30 text-blue-300 hover:bg-blue-700/40 hover:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver detalles
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: solicitudes.length, color: "text-blue-400" },
          { label: "Completadas", value: solicitudes.filter(s => s.estado === "Completado").length, color: "text-green-400" },
          { label: "En progreso", value: solicitudes.filter(s => s.estado === "En progreso").length, color: "text-yellow-400" },
          { label: "Pendientes", value: solicitudes.filter(s => s.estado === "Pendiente").length, color: "text-orange-400" },
        ].map((stat) => (
          <Card key={stat.label} className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-blue-300">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
