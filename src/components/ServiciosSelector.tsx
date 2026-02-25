
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

interface ServiciosSelectorProps {
  serviciosSeleccionados: string[];
  onServiciosChange: (servicios: string[]) => void;
  bBloquear?: boolean
}

const serviciosDisponibles = {
  "ADMINISTRACION DE MEDICAMENTOS": [
    "991800 - INFUSION O ADMINISTRACION DE SOLUCION DE LIQUIDOS Y ELECTROLITOS - (SSN 0.9% LACTATO Y DEXTROSA)",
    "992990	- INYECCION O INFUSION DE OTROS TIPOS DE MEDICAMENTO (ADMINISTRACION DE ANTIBIOTICO - ANALGESICO - INSULINAS - HORMANAS - ANTIESPASMIDICOS - ENTRE OTROS)",
    "992801 -	APLICACION DE MEDICAMENTO BIOLOGICO"
  ],
  "ALQUILER DE EQUIPOS BIOMEDICOS": [
    "AT001 - ALQUILER DE ATRIL",
    "INSDOM01 - AIRVO 2 SISTEMA DE ALTO FLUJO (INCLUYE CANULA)",
    "MA874698 - MASCARA ORONASAL",
    "N869118 - ALQUILER DE BOMBA DE INFUSION DIA",
    "N869119 - ALQUILER DE ASPIRADOR",
    "N869119 - ALQUILER DE ASPIRADOR PORTATIL DIA",
    "N869120 - ALQUILER MES MONITOR DE SIGNOS VITALES INCLUIDO OXIMETRIA DE PULSO P A NO INVASIVA",
    "N869349 - ALQUILER EQUIPO BPAP",
    "INS696 -	COLCHON ANTI ESCARAS",
    "N874682 - ALQUILER MES BALA DE OXIGENO 1.5 LTS",
    "N874682 - RECARGA BALA 1.5 LTS - GAS MEDICINAL",
    "N874683 - ALQUILER MES BALA DE OXIGENO 2.5 LTS",
    "N874683 - RECARGA BALA 2.5 LTS - GAS MEDICINAL",
    "N874684 - ALQUILER MES BALA DE OXIGENO 4.8 LTS",
    "N874684 - RECARGA BALA 4.8 LTS - GAS MEDICINAL",
    "N874688 - CONCENTRADOR DE BAJO FLUJO",
    "N874689 - ALQUILER CONCENTRADOR DE ALTO FLUJO OXIGENO DE 0 A 8 LTS",
    "N874690 - ALQUILER DE CAMA HOSPITALARIA MANUAL 3 NIVELES",
    "N874691 - ALQUILER DE CAMA HOSPITALARIA MANUAL 2 NIVELES",
    "N874692 - ALQUILER DE CAMA HOSPITALARIA ELECTRICA",
    "N874694 - ALQUILER ASISTENTE DE TOS",
    "N874695 - CUNA HOSPITALARIA",
    "N869348 - ALQUILER EQUIPO CPAP",
    "N889096 - ALQUILER MES PULSOXIMETRO DE LECTURA CONTINUA",
    "P874688 - CONCENTRADOR PORTATIL",
    "REGU002 - REGULADOR DE OXIGENO",
    "S12103-002 - VENTILADOR ADULTO",
    "VT55209 - VENTILADOR PEDIATRICO"
  ],
  "CIRUGIA GENERAL": [
    "890102 - ATENCION (VISITA) DOMICILIARIA POR CIRUGIA GENERAL"
  ],
  "CLINICA DE HERIDAS": [
    "862602 - SUSTITUCION DE DISPOSITIVO DE PRESION SUBATMOSFERICA",
    "869501 - CURACION DE HERIDAS DE BAJA COMPLEJIDAD CON TECNOLOGIA",
    "869501 - CURACION DE HERIDAS DE ALTA COMPLEJIDAD CON TECNOLOGIA",
    "869501 - CURACION CONVENCIONAL DE HERIDAS",
    "890105 - CONSULTA DE CONTROL Y SEGUIMIENTO A SISTEMAS DE PRESION NEGATIVA",
    "890105 - CONSULTA DE CONTROL Y SEGUIMIENTO POR ENFERMERIA A PACIENTE CON HERIDAS"
  ],
  "MEDICINA GENERAL": [
    "890101 - ATENCION (VISITA) DOMICILIARIA POR MEDICINA GENERAL PARA CERTIFICADOS DE DEFUNCION",
    "890101 - ATENCION VISITA DOMICILIARIA POR MEDICINA GENERAL",
    "890102 - ATENCION (VISITA) DOMICILIARIA POR MEDICINA INTERNA"
  ],
  "INFECTOLOGIA": [
    "890102 - ATENCION (VISITA) DOMICILIARIA POR ESPECIALISTA EN INFECTOLOGIA"
  ],
  "NEUMOLOGIA": [
    "890102 - ATENCION (VISITA ) DOMICILIARIA POR NEUMOLOGIA",
    "890102 - ATENCION (VISITA) DOMICILIARIA POR ESPECIALISTA EN NEUROLOGIA"
  ],
  "ORTOPEDIA Y/O TRAUMATOLOGIA": [
    "890102 - ATENCION (VISITA) DOMICILIARIA POR ORTOPEDA"
  ],
  "PEDIATRIA": [
    "890102 - ATENCION (VISITA) DOMICILIARIA POR PEDIATRIA"
  ],
  "PSICOLOGIA": [
    "890108 - ATENCION (VISITA) DOMICILIARIA POR PSICOLOGIA"
  ],
  "TERAPIA OCUPACIONAL": [
    "890113 - ATENCION (VISITA) DOMICILIARIA POR TERAPIA OCUPACIONAL"
  ],
  "FONOAUDIOLOGIA": [
    "890110 - ATENCION (VISITA) DOMICILIARIA POR FONIATRIA Y FONOAUDIOLOGIA"
  ],
  "TERAPIA FISICA": [
    "890111 - ATENCION (VISITA) DOMICILIARIA POR FISIOTERAPIA"
  ],
  "TRABAJO SOCIAL": [
    "890109 - ATENCION (VISITA) DOMICILIARIA POR TRABAJO SOCIAL"
  ],
  "TERAPIA RESPIRATORIA" : [
    "890112 - ATENCION (VISITA) DOMICILIARIA POR TERAPIA RESPIRATORIA",
    "890115 - TOMA DE MUESTRA DE CULTIVO DE SECRECION TRAQUEAL POR FISIOTERAPEUTA",
    "933501 - TERAPIA DE REHABILITACION PULMONAR",
    "939402 - NEBULIZACION",
    "939403 - TERAPIA RESPIRATORIA INTEGRAL (PERCUSION VIBRACION DRENAJE POSTURAL SUCCIONMICRONEBULLZACION ACELERADOR DE FLUJO TOS ASISTIDA OEJERCICIOS RESPIRA TORIOS)",
    "965500 - LIMPIEZA Y CUIDADOS DE TRAQUEOSTOMIA SOD"
  ],
  "CUIDADOR NO PBS" : [
    "115-01 - TURNO SERVICIO DE CUIDADOR 6 HORAS FESTIVO DOMINCALES Y DOMINICALES DIURNOS",
    "115-02 - TURNO SERVICIO DE CUIDADOR 6 HORAS DIURNOS",
    "115-03 - TURNO SERVICIO DE CUIDADOR 8 HORAS FESTIVO DOMINCALES Y DOMINICALES DIURNOS",
    "115-04 - TURNO SERVICIO DE CUIDADOR 8 HORAS DIURNOS",
    "115-05 - TURNO SERVICIO DE CUIDADOR 12 HORAS FESTIVOS Y DOMINICAL",
    "115-06 - TURNO SERVICIO DE CUIDADOR 12 HORAS NOCTURNAS FESTIVAS Y DOMINICAL",
    "115-07 - TURNO SERVICIO DE CUIDADOR 12 HORAS DIURNOS",
    "115-08 - TURNO SERVICIO DE CUIDADOR 12 HORAS NOCTURNOS",
    "115-09 - TURNO SERVICIO DE CUIDADOR 24 HORAS"
  ],
  "JUNTAS CLINICAS" : [
    "890501 - PARTICIPACION EN JUNTA MEDICA O EQUIPO INTERDISCIPLINARIO POR MEDICINA GENERAL Y CASO (PACIENTE)",
    "890502 - PARTICIPACION EN JUNTA MEDICA O EQUIPO INTERDISCIPLINARIO POR MEDICINA ESPECIALIZADA Y CASO (PACIENTE)",
    "890503 - PARTICIPACION EN JUNTA MEDICA O EQUIPO INTERDISCIPLINARIO POR OTRO PROFESIONAL DE LA SALUD Y CASO (PACIENTE)"
  ],
  "VERIFICACION DE CONDICIONES SANITARIAS E INFRAESTRUCTURA FISICA" : [
    "890115 - REGISTRO DE VERIFICACION DE CONDICIONES SANITARIAS E INFRAESTRUCTURA FISICA (SERVICIOS DE AGUA POTABLE ASEO ALCANTARILLADO)"
  ],
  "TURNOS AUXILIARES" : [
    "890105 - TURNO AUXILIAR DE ENFERMERIA 12 HORAS DIURNOS",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 12 HORAS FESTIVO Y DOMINICAL DIURNO",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 12 HORAS FESTIVO Y DOMINICAL NOCTURNO",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 12 HORAS NOCTURNOS",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 6 HORAS DIURNOS",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 6 HORAS FESTIVO Y DOMINICAL DIURNO",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 8 HORAS DIURNO",
    "890105 - TURNO AUXILIAR DE ENFERMERIA 8 HORAS FESTIVO Y DOMINICAL DIURNO"
  ],
  "DOLOR Y CUIDADOS PALIATIVOS" : [
    "890101 - ATENCION (VISITA) DOMICILIARIA POR MEDICINA GENERAL EN CUIDADOS PALIATIVOS",
    "890102 - ATENCION (VISITA) DOMICILIARIA POR ESPECIALISTA EN DOLOR Y CUIDADOS PALIATIVOS",
    "890108 - ATENCION (VISITA) DOMICILIARIA POR PSICOLOGIA EN CUIDADOS PALIATIVOS",
    "890109 - ATENCION (VISITA) DOMICILIARIA POR TRABAJO SOCIAL EN CUIDADOS PALIATIVOS",
    "890105 - CONSULTA DE CONTROL Y SEGUIMIENTO POR ENFERMERIA A PACIENTE PALIATIVO",
    "890115 - VISITA POR COUNSELLOR"
  ],
  "ENFERMERIA" : [
    "579401 - INSERCION DE DISPOSITIVO URINARIO (VESICAL)",
    "890105 - ATENCION VISITA DOMICILIARIA POR ENFERMERIA",
    "890115 - TOMA DE MUESTRA DE LABORATORIO CLINICO",
    "895101 - ELECTROCARDIOGRAMA DE RITMO O DE SUPERFICIE - SIN LECTURA",
    "990204 - EDUCACION INDIVIDUAL EN SALUD POR ENFERMERIA"
  ],
  "NUTRICION" : [
    "890106 - ATENCION VISITA DOMICILIARIA POR NUTRICION Y DIETETICA"
  ]
};

export default function ServiciosSelector({ serviciosSeleccionados, onServiciosChange, bBloquear }: ServiciosSelectorProps) {
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
          disabled={bBloquear}
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
                        disabled={bBloquear}
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
