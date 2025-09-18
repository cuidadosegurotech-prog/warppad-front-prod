
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, FileText } from "lucide-react";
import DatosPaciente from "@/components/DatosPaciente";
import InformacionPrestador from "@/components/InformacionPrestador";
import InformacionSolicitud from "@/components/InformacionSolicitud";

interface ArchivoSubido {
  id: string;
  nombre: string;
  tamaño: number;
  tipo: string;
}

export default function NuevaSolicitud() {
  const [formData, setFormData] = useState({
    // Datos del paciente
    tipoDocumento: "",
    numeroIdentificacion: "",
    nombrePaciente: "",
    departamento: "",
    ciudadMunicipio: "",
    direccion: "",
    barrio: "",
    puntoReferencia: "",
    telefonos: "",
    // Información del prestador
    regional: "",
    prestador: "",
    // Información de la solicitud
    tipoSolicitud: "",
    archivos: [] as ArchivoSubido[],
    serviciosSeleccionados: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva solicitud:", formData);
    // Aquí iría la lógica para enviar la solicitud
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Nueva Solicitud
        </h1>
        <p className="text-slate-600">
          Crea una nueva solicitud de automatización
        </p>
      </div>

      {/* Form */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos del Paciente */}
          <DatosPaciente
            tipoDocumento={formData.tipoDocumento}
            numeroIdentificacion={formData.numeroIdentificacion}
            nombrePaciente={formData.nombrePaciente}
            departamento={formData.departamento}
            ciudadMunicipio={formData.ciudadMunicipio}
            direccion={formData.direccion}
            barrio={formData.barrio}
            puntoReferencia={formData.puntoReferencia}
            telefonos={formData.telefonos}
            onTipoDocumentoChange={(value) => setFormData({...formData, tipoDocumento: value})}
            onNumeroIdentificacionChange={(value) => setFormData({...formData, numeroIdentificacion: value})}
            onNombrePacienteChange={(value) => setFormData({...formData, nombrePaciente: value})}
            onDepartamentoChange={(value) => setFormData({...formData, departamento: value})}
            onCiudadMunicipioChange={(value) => setFormData({...formData, ciudadMunicipio: value})}
            onDireccionChange={(value) => setFormData({...formData, direccion: value})}
            onBarrioChange={(value) => setFormData({...formData, barrio: value})}
            onPuntoReferenciaChange={(value) => setFormData({...formData, puntoReferencia: value})}
            onTelefonosChange={(value) => setFormData({...formData, telefonos: value})}
          />

          {/* Información del Prestador */}
          <div className="pt-6 border-t border-slate-200">
            <InformacionPrestador
              regional={formData.regional}
              prestador={formData.prestador}
              onRegionalChange={(value) => setFormData({...formData, regional: value})}
              onPrestadorChange={(value) => setFormData({...formData, prestador: value})}
            />
          </div>

          {/* Información de la Solicitud */}
          <div className="pt-6 border-t border-slate-200">
            <InformacionSolicitud
              tipoSolicitud={formData.tipoSolicitud}
              archivos={formData.archivos}
              serviciosSeleccionados={formData.serviciosSeleccionados}
              onTipoSolicitudChange={(value) => setFormData({...formData, tipoSolicitud: value})}
              onArchivosChange={(archivos) => setFormData({...formData, archivos})}
              onServiciosChange={(servicios) => setFormData({...formData, serviciosSeleccionados: servicios})}
            />
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold h-12 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 group"
          >
            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Enviar Solicitud
          </Button>
        </form>
      </Card>

      {/* Info Card */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-slate-800 font-semibold mb-2">¿Qué pasa después?</h3>
            <ul className="text-slate-600 text-sm space-y-1">
              <li>• Tu solicitud será revisada por nuestro equipo</li>
              <li>• Recibirás una confirmación en las próximas 24 horas</li>
              <li>• Te contactaremos para afinar los detalles</li>
              <li>• Comenzaremos el desarrollo de tu automatización</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
