
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Prestador {
  nombre: string;
  nit: string;
}

interface InformacionPrestadorProps {
  regional: string;
  prestador: string;
  onRegionalChange: (value: string) => void;
  onPrestadorChange: (value: string) => void;
}

const prestadoresPorRegional: Record<string, Prestador[]> = {
  magdalena: [
    { nombre: "CLINICA MAR CARIBE", nit: "819003210-5" },
    { nombre: "EFISALUD SAS", nit: "804009739-1" },
    { nombre: "ESE ALEJANDRO PROSPERON", nit: "891780009" },
    { nombre: "FUNDACION OFTALMOLOGICA DEL CARIBE", nit: "8001127254" },
    { nombre: "FUNDACION PROMAGDALENA", nit: "9001469274" },
    { nombre: "IMAGENOLOGIA DEL MAGDALENA", nit: "9003028433" },
    { nombre: "IPS SURGIFAST", nit: "819006339-1" },
    { nombre: "IRECA IPS", nit: "901659987" },
    { nombre: "OLARIS RIVAS RIVAS IPS", nit: "9002562279" },
    { nombre: "PROFAMILIA", nit: "8600137795" },
    { nombre: "VIVA 1A IPS", nit: "900219120-2" }
  ]
};

export default function InformacionPrestador({
  regional,
  prestador,
  onRegionalChange,
  onPrestadorChange
}: InformacionPrestadorProps) {
  const prestadoresDisponibles = prestadoresPorRegional[regional] || [];

  const handleRegionalChange = (value: string) => {
    onRegionalChange(value);
    // Limpiar el prestador seleccionado cuando cambia la regional
    onPrestadorChange("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Información del Prestador</h3>
      </div>

      {/* Regional */}
      <div className="space-y-2">
        <Label htmlFor="regional" className="text-slate-800 font-medium">
          Regional
        </Label>
        <Select value={regional} onValueChange={handleRegionalChange}>
          <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
            <SelectValue placeholder="Selecciona la regional" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 z-50">
            <SelectItem value="magdalena" className="text-slate-800 hover:bg-slate-50">Magdalena</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Prestador */}
      <div className="space-y-2">
        <Label htmlFor="prestador" className="text-slate-800 font-medium">
          Prestador
        </Label>
        <Select value={prestador} onValueChange={onPrestadorChange} disabled={!regional}>
          <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20 disabled:opacity-50">
            <SelectValue placeholder={regional ? "Selecciona el prestador" : "Primero selecciona una regional"} />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 z-50">
            {prestadoresDisponibles.map((prestador) => (
              <SelectItem 
                key={prestador.nit} 
                value={`${prestador.nombre} - ${prestador.nit}`}
                className="text-slate-800 hover:bg-slate-50"
              >
                {prestador.nombre} - {prestador.nit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
