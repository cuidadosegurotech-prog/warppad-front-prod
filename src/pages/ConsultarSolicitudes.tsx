
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Clock, CheckCircle, AlertCircle, XCircle, Eye, LayoutGrid, Grid2x2 } from "lucide-react";

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
  {
    id: "REQ-005",
    titulo: "Automatización de emails",
    tipo: "Workflow",
    estado: "En progreso",
    prioridad: "Alta",
    fechaCreacion: "2024-01-25",
    fechaActualizacion: "2024-01-28",
  },
  {
    id: "REQ-006",
    titulo: "Dashboard de métricas",
    tipo: "Reporte automático",
    estado: "Completado",
    prioridad: "Media",
    fechaCreacion: "2024-01-20",
    fechaActualizacion: "2024-01-27",
  },
];

export default function ConsultarSolicitudes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [solicitudes] = useState(solicitudesEjemplo);
  const [viewMode, setViewMode] = useState<"grid" | "cards">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "Completado":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "En progreso":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Pendiente":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case "Cancelado":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "bg-green-100 text-green-700 border-green-200";
      case "En progreso":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Pendiente":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Cancelado":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "bg-red-100 text-red-700";
      case "Media":
        return "bg-yellow-100 text-yellow-700";
      case "Baja":
        return "bg-green-100 text-green-700";
      case "Urgente":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const filteredSolicitudes = solicitudes.filter(solicitud =>
    solicitud.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solicitud.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSolicitudes = filteredSolicitudes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderCardsView = () => (
    <div className="space-y-4">
      {currentSolicitudes.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-8 text-center">
          <p className="text-slate-600">No se encontraron solicitudes que coincidan con tu búsqueda.</p>
        </Card>
      ) : (
        currentSolicitudes.map((solicitud) => (
          <Card key={solicitud.id} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6 hover:bg-white/90 transition-all duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(solicitud.estado)}
                    <span className="text-sm font-mono text-slate-600">{solicitud.id}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800">{solicitud.titulo}</h3>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getStatusColor(solicitud.estado)}>
                    {solicitud.estado}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(solicitud.prioridad)}>
                    {solicitud.prioridad}
                  </Badge>
                  <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-200">
                    {solicitud.tipo}
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 text-sm text-slate-600">
                  <span>Creado: {new Date(solicitud.fechaCreacion).toLocaleDateString()}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Actualizado: {new Date(solicitud.fechaActualizacion).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800"
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
  );

  const renderGridView = () => (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-slate-200">
            <TableHead className="text-slate-700 font-semibold">ID</TableHead>
            <TableHead className="text-slate-700 font-semibold">Título</TableHead>
            <TableHead className="text-slate-700 font-semibold">Estado</TableHead>
            <TableHead className="text-slate-700 font-semibold">Prioridad</TableHead>
            <TableHead className="text-slate-700 font-semibold">Tipo</TableHead>
            <TableHead className="text-slate-700 font-semibold">Fecha</TableHead>
            <TableHead className="text-slate-700 font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSolicitudes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-slate-600">
                No se encontraron solicitudes que coincidan con tu búsqueda.
              </TableCell>
            </TableRow>
          ) : (
            currentSolicitudes.map((solicitud) => (
              <TableRow key={solicitud.id} className="hover:bg-slate-50/50 border-slate-200">
                <TableCell className="font-mono text-slate-600">{solicitud.id}</TableCell>
                <TableCell className="font-semibold text-slate-800 max-w-xs truncate">
                  {solicitud.titulo}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(solicitud.estado)}
                    <Badge variant="outline" className={getStatusColor(solicitud.estado)}>
                      {solicitud.estado}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(solicitud.prioridad)}>
                    {solicitud.prioridad}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-200">
                    {solicitud.tipo}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">
                  {new Date(solicitud.fechaCreacion).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Consultar Solicitudes
        </h1>
        <p className="text-slate-600">
          Revisa el estado de todas tus solicitudes de automatización
        </p>
      </div>

      {/* Search Bar y controles de vista */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Buscar por título, ID o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
        </Card>
        
        {/* Controles de vista */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }
            >
              <Grid2x2 className="w-4 h-4 mr-2" />
              Grilla
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className={viewMode === "cards" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Tarjetas
            </Button>
          </div>
        </Card>
      </div>

      {/* Vista de solicitudes */}
      {viewMode === "grid" ? renderGridView() : renderCardsView()}

      {/* Paginación */}
      {totalPages > 1 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-slate-100"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer hover:bg-slate-100"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-slate-100"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: solicitudes.length, color: "text-blue-600" },
          { label: "Completadas", value: solicitudes.filter(s => s.estado === "Completado").length, color: "text-green-600" },
          { label: "En progreso", value: solicitudes.filter(s => s.estado === "En progreso").length, color: "text-yellow-600" },
          { label: "Pendientes", value: solicitudes.filter(s => s.estado === "Pendiente").length, color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
