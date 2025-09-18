
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

interface ServiciosSelectorProps {
  serviciosSeleccionados: string[];
  onServiciosChange: (servicios: string[]) => void;
}

const serviciosDisponibles = {
  "Atención Médica": [
    "Consulta médica general",
    "Consulta médica especializada",
    "Medicina interna",
    "Cardiología",
    "Neurología",
    "Endocrinología",
    "Geriatría",
    "Medicina física y rehabilitación"
  ],
  "Enfermería": [
    "Cuidado de enfermería",
    "Administración de medicamentos",
    "Curaciones",
    "Toma de signos vitales",
    "Control de glicemia",
    "Aplicación de inyecciones",
    "Cuidados paliativos",
    "Educación en salud"
  ],
  "Terapias": [
    "Fisioterapia",
    "Terapia ocupacional",
    "Terapia respiratoria",
    "Fonoaudiología",
    "Terapia nutricional",
    "Psicología",
    "Trabajo social"
  ],
  "Procedimientos": [
    "Laboratorio clínico",
    "Toma de muestras",
    "Electrocardiograma",
    "Nebulizaciones",
    "Oxigenoterapia",
    "Alimentación enteral",
    "Sondaje vesical",
    "Manejo de ostomías"
  ],
  "Suministros": [
    "Medicamentos",
    "Material médico quirúrgico",
    "Dispositivos médicos",
    "Nutrición",
    "Pañales",
    "Elementos de protección",
    "Insumos para curaciones"
  ]
};

export default function ServiciosSelector({ serviciosSeleccionados, onServiciosChange }: ServiciosSelectorProps) {
  const [busqueda, setBusqueda] = useState("");

  const manejarSeleccion = (servicio: string, seleccionado: boolean) => {
    if (seleccionado) {
      onServiciosChange([...serviciosSeleccionados, servicio]);
    } else {
      onServiciosChange(serviciosSeleccionados.filter(s => s !== servicio));
    }
  };

  const filtrarServicios = (servicios: string[]) => {
    if (!busqueda) return servicios;
    return servicios.filter(servicio => 
      servicio.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const contarServiciosEnCategoria = (categoria: string) => {
    const servicios = serviciosDisponibles[categoria as keyof typeof serviciosDisponibles] || [];
    return servicios.filter(servicio => serviciosSeleccionados.includes(servicio)).length;
  };

  const totalServicios = Object.values(serviciosDisponibles).flat().length;
  const serviciosFiltrados = Object.entries(serviciosDisponibles).reduce((acc, [categoria, servicios]) => {
    const serviciosFiltradosEnCategoria = filtrarServicios(servicios);
    if (serviciosFiltradosEnCategoria.length > 0) {
      acc[categoria] = serviciosFiltradosEnCategoria;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Buscar servicios..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
        />
      </div>

      {/* Contador de servicios */}
      <div className="text-sm text-slate-600">
        {serviciosSeleccionados.length} de {totalServicios} servicios seleccionados
      </div>

      {/* Acordeón de servicios */}
      <Accordion type="multiple" className="w-full">
        {Object.entries(serviciosFiltrados).map(([categoria, servicios]) => {
          const serviciosSeleccionadosEnCategoria = contarServiciosEnCategoria(categoria);
          
          return (
            <AccordionItem key={categoria} value={categoria} className="border-slate-200">
              <AccordionTrigger className="text-slate-800 hover:text-blue-600">
                <div className="flex items-center justify-between w-full mr-4">
                  <span>{categoria}</span>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {serviciosSeleccionadosEnCategoria}/{servicios.length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {servicios.map((servicio) => (
                    <div key={servicio} className="flex items-center space-x-2">
                      <Checkbox
                        id={servicio}
                        checked={serviciosSeleccionados.includes(servicio)}
                        onCheckedChange={(checked) => manejarSeleccion(servicio, checked as boolean)}
                        className="border-slate-300"
                      />
                      <label
                        htmlFor={servicio}
                        className="text-sm text-slate-700 cursor-pointer flex-1"
                      >
                        {servicio}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {Object.keys(serviciosFiltrados).length === 0 && busqueda && (
        <div className="text-center py-8 text-slate-500">
          <p>No se encontraron servicios que coincidan con "{busqueda}"</p>
        </div>
      )}
    </div>
  );
}
