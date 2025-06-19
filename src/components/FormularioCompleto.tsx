
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { Save, Send, User, Mail, Phone, MapPin, Calendar, Star } from "lucide-react";

export default function FormularioCompleto() {
  const [formData, setFormData] = useState({
    // Información personal
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    
    // Información profesional
    empresa: "",
    cargo: "",
    experiencia: "",
    salario: "",
    
    // Preferencias
    newsletter: false,
    notificacionesSMS: false,
    notificacionesEmail: true,
    
    // Habilidades
    habilidades: [] as string[],
    nivelExperiencia: "intermedio",
    
    // Comentarios
    comentarios: "",
    
    // Términos
    aceptaTerminos: false,
    aceptaPrivacidad: false,
  });

  const [progreso, setProgreso] = useState(0);

  const habilidadesDisponibles = [
    "JavaScript", "TypeScript", "React", "Vue", "Angular", 
    "Node.js", "Python", "Java", "C#", "PHP", "SQL", "MongoDB"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Calcular progreso
    const campos = Object.keys(formData);
    const camposCompletos = campos.filter(campo => {
      const valor = formData[campo as keyof typeof formData];
      return valor !== "" && valor !== false && (!Array.isArray(valor) || valor.length > 0);
    });
    
    const nuevoProgreso = Math.round((camposCompletos.length / campos.length) * 100);
    setProgreso(nuevoProgreso);
  };

  const toggleHabilidad = (habilidad: string) => {
    const nuevasHabilidades = formData.habilidades.includes(habilidad)
      ? formData.habilidades.filter(h => h !== habilidad)
      : [...formData.habilidades, habilidad];
    
    handleInputChange("habilidades", nuevasHabilidades);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaTerminos) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }
    
    if (!formData.aceptaPrivacidad) {
      toast.error("Debes aceptar la política de privacidad");
      return;
    }
    
    console.log("Datos del formulario:", formData);
    toast.success("Formulario enviado correctamente", {
      description: "Todos los datos han sido guardados exitosamente."
    });
  };

  const guardarBorrador = () => {
    console.log("Guardando borrador:", formData);
    toast.info("Borrador guardado", {
      description: "Tus cambios han sido guardados automáticamente."
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Formulario de Registro Completo
          </CardTitle>
          <CardDescription>
            Complete todos los campos para finalizar su registro
          </CardDescription>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso del formulario</span>
              <span>{progreso}%</span>
            </div>
            <Progress value={progreso} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Información Personal</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange("apellido", e.target.value)}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Dirección</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  placeholder="Calle, número, apartamento"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => handleInputChange("ciudad", e.target.value)}
                    placeholder="Tu ciudad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>

            {/* Información Profesional */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Información Profesional</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange("empresa", e.target.value)}
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => handleInputChange("cargo", e.target.value)}
                    placeholder="Tu cargo actual"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experiencia">Años de Experiencia</Label>
                  <Input
                    id="experiencia"
                    type="number"
                    value={formData.experiencia}
                    onChange={(e) => handleInputChange("experiencia", e.target.value)}
                    placeholder="5"
                    min="0"
                    max="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salario">Salario Esperado (opcional)</Label>
                  <Input
                    id="salario"
                    value={formData.salario}
                    onChange={(e) => handleInputChange("salario", e.target.value)}
                    placeholder="$50,000 - $80,000"
                  />
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Habilidades Técnicas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {habilidadesDisponibles.map((habilidad) => (
                  <div key={habilidad} className="flex items-center space-x-2">
                    <Checkbox
                      id={habilidad}
                      checked={formData.habilidades.includes(habilidad)}
                      onCheckedChange={() => toggleHabilidad(habilidad)}
                    />
                    <Label htmlFor={habilidad} className="text-sm">
                      {habilidad}
                    </Label>
                  </div>
                ))}
              </div>
              
              {formData.habilidades.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.habilidades.map((habilidad) => (
                    <Badge key={habilidad} variant="secondary">
                      {habilidad}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Preferencias */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Preferencias de Comunicación</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange("newsletter", checked)}
                  />
                  <Label htmlFor="newsletter">Suscribirse al newsletter</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notificacionesEmail"
                    checked={formData.notificacionesEmail}
                    onCheckedChange={(checked) => handleInputChange("notificacionesEmail", checked)}
                  />
                  <Label htmlFor="notificacionesEmail">Recibir notificaciones por email</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notificacionesSMS"
                    checked={formData.notificacionesSMS}
                    onCheckedChange={(checked) => handleInputChange("notificacionesSMS", checked)}
                  />
                  <Label htmlFor="notificacionesSMS">Recibir notificaciones por SMS</Label>
                </div>
              </div>
            </div>

            {/* Comentarios */}
            <div className="space-y-2">
              <Label htmlFor="comentarios">Comentarios Adicionales</Label>
              <Textarea
                id="comentarios"
                value={formData.comentarios}
                onChange={(e) => handleInputChange("comentarios", e.target.value)}
                placeholder="Cuéntanos más sobre ti o tus expectativas..."
                rows={4}
              />
            </div>

            {/* Términos y Condiciones */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onCheckedChange={(checked) => handleInputChange("aceptaTerminos", checked === true)}
                  required
                />
                <Label htmlFor="aceptaTerminos" className="text-sm">
                  Acepto los <span className="text-blue-600 underline cursor-pointer">términos y condiciones</span> *
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aceptaPrivacidad"
                  checked={formData.aceptaPrivacidad}
                  onCheckedChange={(checked) => handleInputChange("aceptaPrivacidad", checked === true)}
                  required
                />
                <Label htmlFor="aceptaPrivacidad" className="text-sm">
                  Acepto la <span className="text-blue-600 underline cursor-pointer">política de privacidad</span> *
                </Label>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={guardarBorrador}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar Borrador
              </Button>
              
              <Button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
                Enviar Formulario
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
