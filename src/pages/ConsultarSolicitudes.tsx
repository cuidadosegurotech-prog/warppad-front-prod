
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Clock, CheckCircle, AlertCircle, XCircle, Eye, LayoutGrid, Grid2x2, AlertTriangle, Download, Filter, MessageCircle } from "lucide-react";
import { formatDistanceToNow, differenceInDays, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

// Datos de ejemplo
const solicitudesEjemplo = [
  {
    id: "REQ-001",
    titulo: "Automatizar proceso de facturación",
    tipo: "Workflow",
    estado: "En progreso",
    prioridad: "Alta",
    eps: "EPS Sura",
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-20",
  },
  {
    id: "REQ-002",
    titulo: "Integración con sistema CRM",
    tipo: "Integración",
    estado: "Completado",
    prioridad: "Media",
    eps: "Nueva EPS",
    fechaCreacion: "2024-01-10",
    fechaActualizacion: "2024-01-18",
  },
  {
    id: "REQ-003", 
    titulo: "Reportes automáticos de ventas",
    tipo: "Reporte automático",
    estado: "Pendiente",
    prioridad: "Baja",
    eps: "Compensar",
    fechaCreacion: "2023-12-01",
    fechaActualizacion: "2023-12-01",
  },
  {
    id: "REQ-004",
    titulo: "Sistema de notificaciones push",
    tipo: "Sistema de notificaciones",
    estado: "Cancelado",
    prioridad: "Media",
    eps: "EPS Sanitas",
    fechaCreacion: "2024-01-08",
    fechaActualizacion: "2024-01-12",
  },
  {
    id: "REQ-005",
    titulo: "Automatización de emails",
    tipo: "Workflow",
    estado: "En progreso",
    prioridad: "Alta",
    eps: "EPS Sura",
    fechaCreacion: "2023-11-15",
    fechaActualizacion: "2024-01-28",
  },
  {
    id: "REQ-006",
    titulo: "Dashboard de métricas",
    tipo: "Reporte automático",
    estado: "Completado",
    prioridad: "Media",
    eps: "Nueva EPS",
    fechaCreacion: "2024-01-20",
    fechaActualizacion: "2024-01-27",
  },
];

export default function ConsultarSolicitudes() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [solicitudes] = useState(solicitudesEjemplo);
  const [viewMode, setViewMode] = useState<"grid" | "cards">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEps, setSelectedEps] = useState("all");
  const [selectedEstado, setSelectedEstado] = useState("all");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const itemsPerPage = 4;

  // Obtener valores únicos para los filtros
  const epsOptions = Array.from(new Set(solicitudes.map(s => s.eps))).sort();
  const estadoOptions = Array.from(new Set(solicitudes.map(s => s.estado))).sort();

  // Función para calcular el tiempo transcurrido
  const getTimeElapsed = (fechaCreacion: string) => {
    try {
      const fecha = parseISO(fechaCreacion);
      return formatDistanceToNow(fecha, { addSuffix: true, locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  const isOverdue = (fechaCreacion: string, estado: string) => {
    if (estado === "Completado" || estado === "Cancelado") return false;
    
    try {
      const fecha = parseISO(fechaCreacion);
      const diasTranscurridos = differenceInDays(new Date(), fecha);
      return diasTranscurridos > 30;
    } catch (error) {
      return false;
    }
  };

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

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = solicitud.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEps = selectedEps === "all" || solicitud.eps === selectedEps;
    const matchesEstado = selectedEstado === "all" || solicitud.estado === selectedEstado;
    
    return matchesSearch && matchesEps && matchesEstado;
  });

  const solicitudesVencidas = filteredSolicitudes.filter(solicitud => 
    isOverdue(solicitud.fechaCreacion, solicitud.estado)
  );

  const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSolicitudes = filteredSolicitudes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExportData = () => {
    const csvContent = [
      // Headers
      ["ID", "Título", "EPS", "Estado", "Prioridad", "Tipo", "Fecha Creación", "Fecha Actualización"],
      // Data rows
      ...filteredSolicitudes.map(solicitud => [
        solicitud.id,
        solicitud.titulo,
        solicitud.eps,
        solicitud.estado,
        solicitud.prioridad,
        solicitud.tipo,
        solicitud.fechaCreacion,
        solicitud.fechaActualizacion
      ])
    ];
    
    const csvString = csvContent.map(row => 
      row.map(cell => `"${cell}"`).join(",")
    ).join("\n");
    
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `solicitudes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackForm.message.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu sugerencia o comentario",
        variant: "destructive",
      });
      return;
    }

    // Simulamos el envío de feedback
    toast({
      title: "¡Gracias por tu feedback!",
      description: "Tu sugerencia ha sido enviada correctamente. La revisaremos pronto.",
    });
    
    // Limpiar formulario y cerrar modal
    setFeedbackForm({ name: "", email: "", message: "" });
    setFeedbackOpen(false);
  };

  const renderCardsView = () => (
    <div className="space-y-4">
      {currentSolicitudes.length === 0 ? (
        <div className="p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">No se encontraron solicitudes</h3>
              <p className="text-sm text-slate-600">Intenta con otros términos de búsqueda</p>
            </div>
          </div>
        </div>
      ) : (
        currentSolicitudes.map((solicitud) => (
          <div 
            key={solicitud.id} 
            className={`p-4 transition-colors ${
              isOverdue(solicitud.fechaCreacion, solicitud.estado) 
                ? 'bg-red-50/30' 
                : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(solicitud.estado)}
                  <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded">
                    {solicitud.id}
                  </span>
                  {isOverdue(solicitud.fechaCreacion, solicitud.estado) && (
                    <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-xs font-semibold">VENCIDA</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800 leading-tight">{solicitud.titulo}</h3>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                    {solicitud.eps}
                  </Badge>
                  <Badge variant="outline" className={`${getStatusColor(solicitud.estado)} text-xs`}>
                    {solicitud.estado}
                  </Badge>
                  <Badge variant="outline" className={`${getPriorityColor(solicitud.prioridad)} text-xs`}>
                    {solicitud.prioridad}
                  </Badge>
                  <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">
                    {solicitud.tipo}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500 font-medium text-xs">Creado</span>
                    <div className="text-slate-700">{new Date(solicitud.fechaCreacion).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium text-xs">Actualizado</span>
                    <div className="text-slate-700">{new Date(solicitud.fechaActualizacion).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium text-xs">Tiempo transcurrido</span>
                    <div className="text-blue-600 font-semibold">
                      {getTimeElapsed(solicitud.fechaCreacion)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex lg:flex-col gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Ver detalles
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderGridView = () => (
    <div className="overflow-x-auto">
      <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-200 bg-slate-50">
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">ID</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Título</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">EPS</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Estado</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Prioridad</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Tipo</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Fecha</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Tiempo</TableHead>
              <TableHead className="text-slate-700 font-semibold py-3 text-sm">Acciones</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {currentSolicitudes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-slate-800 mb-1">No se encontraron solicitudes</h3>
                    <p className="text-sm text-slate-600">Intenta con otros términos de búsqueda</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            currentSolicitudes.map((solicitud) => (
              <TableRow 
                key={solicitud.id} 
                className={`hover:bg-slate-50 border-slate-200 transition-colors ${
                  isOverdue(solicitud.fechaCreacion, solicitud.estado) 
                    ? 'bg-red-50/50 hover:bg-red-50' 
                    : ''
                }`}
              >
                <TableCell className="font-mono text-slate-600 py-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-50 px-2 py-1 rounded text-xs">{solicitud.id}</span>
                    {isOverdue(solicitud.fechaCreacion, solicitud.estado) && (
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                    )}
                  </div>
                </TableCell>
                  <TableCell className="font-medium text-slate-800 max-w-xs py-3">
                    <div className="truncate text-sm" title={solicitud.titulo}>
                      {solicitud.titulo}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-slate-700">{solicitud.eps}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(solicitud.estado)}
                      <Badge variant="outline" className={`${getStatusColor(solicitud.estado)} text-xs`}>
                        {solicitud.estado}
                      </Badge>
                    </div>
                  </TableCell>
                <TableCell className="py-3">
                  <Badge variant="outline" className={`${getPriorityColor(solicitud.prioridad)} text-xs`}>
                    {solicitud.prioridad}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">
                    {solicitud.tipo}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-xs py-3">
                  {new Date(solicitud.fechaCreacion).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-slate-600 text-xs py-3">
                  <span className="text-blue-600 font-semibold">
                    {getTimeElapsed(solicitud.fechaCreacion)}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Consultar Solicitudes
          </h1>
          <p className="text-base text-slate-600">
            Revisa el estado de todas tus solicitudes de automatización
          </p>
        </div>

        {/* Estadísticas compactas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Total", value: solicitudes.length, color: "text-blue-600" },
            { label: "Completadas", value: solicitudes.filter(s => s.estado === "Completado").length, color: "text-green-600" },
            { label: "En progreso", value: solicitudes.filter(s => s.estado === "En progreso").length, color: "text-yellow-600" },
            { label: "Pendientes", value: solicitudes.filter(s => s.estado === "Pendiente").length, color: "text-orange-600" },
            { label: "Vencidas", value: solicitudesVencidas.length, color: "text-red-600" },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Alerta para solicitudes vencidas */}
        {solicitudesVencidas.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 text-sm">
              <span className="font-semibold">
                ¡Atención! Tienes {solicitudesVencidas.length} solicitud{solicitudesVencidas.length > 1 ? 'es' : ''} vencida{solicitudesVencidas.length > 1 ? 's' : ''}
              </span>
              {solicitudesVencidas.length <= 3 && (
                <span className="ml-2">({solicitudesVencidas.map(s => s.id).join(', ')})</span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Controles de búsqueda, filtros y vista */}
        <div className="space-y-4">
          {/* Barra de búsqueda y exportar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por título, ID o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-slate-300"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="shrink-0"
            >
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
          </div>

          {/* Filtros y vista */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Filtros:</span>
              </div>
              
              <Select value={selectedEps} onValueChange={setSelectedEps}>
                <SelectTrigger className="w-full sm:w-[180px] h-9">
                  <SelectValue placeholder="Todas las EPS" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                  <SelectItem value="all">Todas las EPS</SelectItem>
                  {epsOptions.map((eps) => (
                    <SelectItem key={eps} value={eps}>
                      {eps}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                <SelectTrigger className="w-full sm:w-[160px] h-9">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                  <SelectItem value="all">Todos los estados</SelectItem>
                  {estadoOptions.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid2x2 className="w-4 h-4 mr-1" />
                Grilla
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                <LayoutGrid className="w-4 h-4 mr-1" />
                Tarjetas
              </Button>
            </div>
          </div>
        </div>

        {/* Vista de solicitudes */}
        <div className="w-full">
          {viewMode === "grid" ? renderGridView() : renderCardsView()}
        </div>

        {/* Paginación sutil */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Floating Feedback Button */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl hover:shadow-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 z-[100]"
            size="icon"
          >
            <MessageCircle className="w-7 h-7" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-800">
              Envíanos tu feedback
            </DialogTitle>
            <p className="text-sm text-slate-600 mt-2">
              Cuéntanos qué mejoras te gustaría ver en la aplicación
            </p>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nombre (opcional)
              </Label>
              <Input
                id="name"
                placeholder="Tu nombre"
                value={feedbackForm.name}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email (opcional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={feedbackForm.email}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Sugerencia o mejora *
              </Label>
              <Textarea
                id="message"
                placeholder="Describe tu sugerencia o comentario..."
                className="min-h-[100px] resize-none"
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setFeedbackOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleFeedbackSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Enviar feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
