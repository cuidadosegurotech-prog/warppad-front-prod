
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, FileText, Search } from "lucide-react";
import ServiciosSelector from "./ServiciosSelector";

interface ArchivoSubido {
  id: string;
  nombre: string;
  tamaño: number;
  tipo: string;
}

interface InformacionSolicitudProps {
  tipoSolicitud: string;
  archivos: ArchivoSubido[];
  serviciosSeleccionados: string[];
  onTipoSolicitudChange: (value: string) => void;
  onArchivosChange: (archivos: ArchivoSubido[]) => void;
  onServiciosChange: (servicios: string[]) => void;
}

const tiposSolicitud = [
  "SOLICITUD DE ATENCION DOMICILIARIA",
  "ACCION DE TUTELA",
  "DERECHO DE PETICION",
  "INCIDENTE DESACATO"
];

const tiposArchivosPermitidos = [
  '.doc', '.docx', // Word
  '.xls', '.xlsx', // Excel
  '.ppt', '.pptx', // PowerPoint
  '.pdf', // PDF
  '.jpg', '.jpeg', '.png', '.gif', '.bmp', // Imágenes
  '.mp4', '.avi', '.mov', '.wmv', // Video
  '.mp3', '.wav', '.wma', '.aac' // Audio
];

export default function InformacionSolicitud({
  tipoSolicitud,
  archivos,
  serviciosSeleccionados,
  onTipoSolicitudChange,
  onArchivosChange,
  onServiciosChange
}: InformacionSolicitudProps) {
  const [errorArchivo, setErrorArchivo] = useState<string>("");

  const formatearTamaño = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validarArchivo = (archivo: File): string | null => {
    // Validar tamaño (10MB máximo)
    const tamañoMaximo = 10 * 1024 * 1024; // 10MB en bytes
    if (archivo.size > tamañoMaximo) {
      return "El archivo excede el tamaño máximo de 10MB";
    }

    // Validar tipo de archivo
    const extension = '.' + archivo.name.split('.').pop()?.toLowerCase();
    if (!tiposArchivosPermitidos.includes(extension || '')) {
      return "Tipo de archivo no permitido";
    }

    return null;
  };

  const manejarSeleccionArchivos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivosSeleccionados = Array.from(event.target.files || []);
    setErrorArchivo("");

    // Validar límite de archivos
    if (archivos.length + archivosSeleccionados.length > 5) {
      setErrorArchivo("No puedes subir más de 5 archivos en total");
      return;
    }

    const nuevosArchivos: ArchivoSubido[] = [];

    for (const archivo of archivosSeleccionados) {
      const error = validarArchivo(archivo);
      if (error) {
        setErrorArchivo(error);
        return;
      }

      nuevosArchivos.push({
        id: Math.random().toString(36).substr(2, 9),
        nombre: archivo.name,
        tamaño: archivo.size,
        tipo: archivo.type
      });
    }

    onArchivosChange([...archivos, ...nuevosArchivos]);
    // Limpiar el input
    event.target.value = '';
  };

  const eliminarArchivo = (id: string) => {
    onArchivosChange(archivos.filter(archivo => archivo.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Información de la Solicitud</h3>
      </div>

      {/* Tipo de solicitud */}
      <div className="space-y-2">
        <Label htmlFor="tipoSolicitud" className="text-slate-800 font-medium">
          Tipo de solicitud
        </Label>
        <Select value={tipoSolicitud} onValueChange={onTipoSolicitudChange}>
          <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
            <SelectValue placeholder="Selecciona el tipo de solicitud" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 shadow-lg z-[100]">
            {tiposSolicitud.map((tipo) => (
              <SelectItem key={tipo} value={tipo} className="text-slate-800 hover:bg-slate-50 bg-white">
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Órdenes médicas */}
      <div className="space-y-4">
        <Label className="text-slate-800 font-medium">
          Órdenes médicas
        </Label>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              multiple
              accept={tiposArchivosPermitidos.join(',')}
              onChange={manejarSeleccionArchivos}
              className="hidden"
              id="archivo-input"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('archivo-input')?.click()}
              disabled={archivos.length >= 5}
              className="bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Subir archivos
            </Button>
            <span className="text-sm text-slate-600">
              ({archivos.length}/5 archivos)
            </span>
          </div>

          {errorArchivo && (
            <p className="text-sm text-red-600">{errorArchivo}</p>
          )}

          <p className="text-xs text-slate-500">
            Tipos permitidos: Word, Excel, PPT, PDF, Imagen, Video, Audio. Máximo 10MB por archivo.
          </p>

          {/* Lista de archivos subidos */}
          {archivos.length > 0 && (
            <div className="space-y-2">
              {archivos.map((archivo) => (
                <Card key={archivo.id} className="p-3 bg-slate-50 border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{archivo.nombre}</p>
                        <p className="text-xs text-slate-500">{formatearTamaño(archivo.tamaño)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarArchivo(archivo.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Servicios solicitados */}
      <div className="space-y-4">
        <Label className="text-slate-800 font-medium">
          Servicios solicitados
        </Label>
        <ServiciosSelector 
          serviciosSeleccionados={serviciosSeleccionados}
          onServiciosChange={onServiciosChange}
        />
        {serviciosSeleccionados.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {serviciosSeleccionados.map((servicio) => (
              <Badge key={servicio} variant="secondary" className="bg-blue-100 text-blue-800">
                {servicio}
                <button
                  type="button"
                  onClick={() => onServiciosChange(serviciosSeleccionados.filter(s => s !== servicio))}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
