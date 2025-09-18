import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface DescripcionSolicitud{
    descripcionSolicitud: string;
    onDatosSolicitudChange?: (value: string) => void;
    bBloquear?: boolean;
}

export default function DescripcionSolicitud({
    descripcionSolicitud,
    onDatosSolicitudChange,
    bBloquear
}: DescripcionSolicitud){
  return (
    <div className="space-y-6">
        {/* Punto de referencia del domicilio */}
        <div className="space-y-2">
          <Label htmlFor="descripcionSolicitud" className="text-slate-800 font-medium">
            Descripción solicitud
            <span className="text-red-500"> *</span>
          </Label>
          <Textarea
            id="descripcionSolicitud"
            placeholder="Información de la solicitud"
            value={descripcionSolicitud}
            onChange={(e) => onDatosSolicitudChange(e.target.value)}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 min-h-20"
            required={true}
            disabled={bBloquear}
          />
          <p className="text-xs text-slate-500">
            
          </p>
        </div>
      </div>
  );
}