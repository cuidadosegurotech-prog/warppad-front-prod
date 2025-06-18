
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface DatosPacienteProps {
  tipoDocumento: string;
  numeroIdentificacion: string;
  nombrePaciente: string;
  onTipoDocumentoChange: (value: string) => void;
  onNumeroIdentificacionChange: (value: string) => void;
  onNombrePacienteChange: (value: string) => void;
}

export default function DatosPaciente({
  tipoDocumento,
  numeroIdentificacion,
  nombrePaciente,
  onTipoDocumentoChange,
  onNumeroIdentificacionChange,
  onNombrePacienteChange
}: DatosPacienteProps) {
  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números, sin puntos, espacios o caracteres especiales
    const value = e.target.value.replace(/[^0-9]/g, '');
    onNumeroIdentificacionChange(value);
  };

  return (
    <div className="space-y-6">
      {/* Header de la sección */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Datos del Paciente</h3>
          <p className="text-sm text-slate-600">Información personal del paciente</p>
        </div>
      </div>

      {/* Campos del formulario */}
      <div className="space-y-4">
        {/* Tipo de documento */}
        <div className="space-y-2">
          <Label htmlFor="tipoDocumento" className="text-slate-800 font-medium">
            Tipo de documento del paciente <span className="text-red-500">*</span>
          </Label>
          <Select value={tipoDocumento} onValueChange={onTipoDocumentoChange}>
            <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
              <SelectValue placeholder="Selecciona el tipo de documento" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="cedula_ciudadania" className="text-slate-800 hover:bg-slate-50">
                Cédula de Ciudadanía
              </SelectItem>
              <SelectItem value="cedula_extranjeria" className="text-slate-800 hover:bg-slate-50">
                Cédula de Extranjería
              </SelectItem>
              <SelectItem value="pasaporte" className="text-slate-800 hover:bg-slate-50">
                Pasaporte
              </SelectItem>
              <SelectItem value="tarjeta_identidad" className="text-slate-800 hover:bg-slate-50">
                Tarjeta de Identidad
              </SelectItem>
              <SelectItem value="registro_civil" className="text-slate-800 hover:bg-slate-50">
                Registro Civil
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Número de identificación */}
        <div className="space-y-2">
          <Label htmlFor="numeroIdentificacion" className="text-slate-800 font-medium">
            Número de identificación del paciente <span className="text-red-500">*</span>
          </Label>
          <Input
            id="numeroIdentificacion"
            type="text"
            placeholder="Ingresa solo números"
            value={numeroIdentificacion}
            onChange={handleNumeroChange}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            required
          />
          <p className="text-xs text-slate-500">
            No debe contener puntos, caracteres especiales ni espacios
          </p>
        </div>

        {/* Nombre del paciente */}
        <div className="space-y-2">
          <Label htmlFor="nombrePaciente" className="text-slate-800 font-medium">
            Nombre del paciente <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombrePaciente"
            type="text"
            placeholder="Nombre completo tal como aparece en el documento"
            value={nombrePaciente}
            onChange={(e) => onNombrePacienteChange(e.target.value)}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            required
          />
          <p className="text-xs text-slate-500">
            Debe estar escrito tal cual como aparece en su documento de identidad
          </p>
        </div>
      </div>
    </div>
  );
}
