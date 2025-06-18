
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, FileText } from "lucide-react";
import DatosPaciente from "@/components/DatosPaciente";
import InformacionPrestador from "@/components/InformacionPrestador";

export default function NuevaSolicitud() {
  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    descripcion: "",
    prioridad: "",
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
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Información de la Solicitud</h3>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-slate-800 font-medium">
                Título de la solicitud
              </Label>
              <Input
                id="titulo"
                placeholder="Ej: Automatizar proceso de facturación"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                required
              />
            </div>

            {/* Tipo de solicitud */}
            <div className="space-y-2">
              <Label htmlFor="tipo" className="text-slate-800 font-medium">
                Tipo de automatización
              </Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="workflow" className="text-slate-800 hover:bg-slate-50">Workflow</SelectItem>
                  <SelectItem value="integracion" className="text-slate-800 hover:bg-slate-50">Integración</SelectItem>
                  <SelectItem value="reporte" className="text-slate-800 hover:bg-slate-50">Reporte automático</SelectItem>
                  <SelectItem value="notificacion" className="text-slate-800 hover:bg-slate-50">Sistema de notificaciones</SelectItem>
                  <SelectItem value="otro" className="text-slate-800 hover:bg-slate-50">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prioridad */}
            <div className="space-y-2">
              <Label htmlFor="prioridad" className="text-slate-800 font-medium">
                Prioridad
              </Label>
              <Select value={formData.prioridad} onValueChange={(value) => setFormData({...formData, prioridad: value})}>
                <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="baja" className="text-green-600 hover:bg-slate-50">Baja</SelectItem>
                  <SelectItem value="media" className="text-yellow-600 hover:bg-slate-50">Media</SelectItem>
                  <SelectItem value="alta" className="text-orange-600 hover:bg-slate-50">Alta</SelectItem>
                  <SelectItem value="urgente" className="text-red-600 hover:bg-slate-50">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion" className="text-slate-800 font-medium">
                Descripción detallada
              </Label>
              <Textarea
                id="descripcion"
                placeholder="Describe detalladamente qué necesitas automatizar, qué sistemas están involucrados, etc."
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 min-h-32"
                required
              />
            </div>
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
