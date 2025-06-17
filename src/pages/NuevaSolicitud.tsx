
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, FileText } from "lucide-react";

export default function NuevaSolicitud() {
  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    descripcion: "",
    prioridad: "",
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
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent">
          Nueva Solicitud
        </h1>
        <p className="text-blue-200">
          Crea una nueva solicitud de automatización
        </p>
      </div>

      {/* Form */}
      <Card className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo" className="text-white font-medium">
              Título de la solicitud
            </Label>
            <Input
              id="titulo"
              placeholder="Ej: Automatizar proceso de facturación"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              className="bg-blue-900/20 border-blue-400/30 text-white placeholder:text-blue-300 focus:border-yellow-400 focus:ring-yellow-400/20"
              required
            />
          </div>

          {/* Tipo de solicitud */}
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-white font-medium">
              Tipo de automatización
            </Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger className="bg-blue-900/20 border-blue-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent className="bg-blue-800 border-blue-400/30">
                <SelectItem value="workflow" className="text-white hover:bg-blue-700">Workflow</SelectItem>
                <SelectItem value="integracion" className="text-white hover:bg-blue-700">Integración</SelectItem>
                <SelectItem value="reporte" className="text-white hover:bg-blue-700">Reporte automático</SelectItem>
                <SelectItem value="notificacion" className="text-white hover:bg-blue-700">Sistema de notificaciones</SelectItem>
                <SelectItem value="otro" className="text-white hover:bg-blue-700">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prioridad */}
          <div className="space-y-2">
            <Label htmlFor="prioridad" className="text-white font-medium">
              Prioridad
            </Label>
            <Select value={formData.prioridad} onValueChange={(value) => setFormData({...formData, prioridad: value})}>
              <SelectTrigger className="bg-blue-900/20 border-blue-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20">
                <SelectValue placeholder="Selecciona la prioridad" />
              </SelectTrigger>
              <SelectContent className="bg-blue-800 border-blue-400/30">
                <SelectItem value="baja" className="text-green-400 hover:bg-blue-700">Baja</SelectItem>
                <SelectItem value="media" className="text-yellow-400 hover:bg-blue-700">Media</SelectItem>
                <SelectItem value="alta" className="text-orange-400 hover:bg-blue-700">Alta</SelectItem>
                <SelectItem value="urgente" className="text-red-400 hover:bg-blue-700">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-white font-medium">
              Descripción detallada
            </Label>
            <Textarea
              id="descripcion"
              placeholder="Describe detalladamente qué necesitas automatizar, qué sistemas están involucrados, etc."
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="bg-blue-900/20 border-blue-400/30 text-white placeholder:text-blue-300 focus:border-yellow-400 focus:ring-yellow-400/20 min-h-32"
              required
            />
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 text-blue-900 font-semibold h-12 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 group"
          >
            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Enviar Solicitud
          </Button>
        </form>
      </Card>

      {/* Info Card */}
      <Card className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-cyan-400/20 rounded-lg">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">¿Qué pasa después?</h3>
            <ul className="text-blue-300 text-sm space-y-1">
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
