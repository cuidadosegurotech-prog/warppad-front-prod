import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface CorreosDestinatariosProps {
  correosDestinatarios: string[];
  onCorreosChange?: (servicios: string[]) => void;
  bBloqueado?: boolean;
}

export default function CorreosDestinatarioSolicitud({
  correosDestinatarios,
  onCorreosChange = () => {},
  bBloqueado = false,
}: CorreosDestinatariosProps) {

    useEffect(() => {
      if(correosDestinatarios){
        //console.log("Llego la ciudadMunicipio");
        onCorreosChange([...correosDestinatarios]);
      }
    }, [correosDestinatarios]);

  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const agregarCorreo = () => {
    if (!emailRegex.test(nuevoCorreo)) {
      setErrorCorreo("Correo no válido");
      return;
    }

    if (correosDestinatarios.includes(nuevoCorreo)) {
      setErrorCorreo("Correo ya ingresado");
      return;
    }

    onCorreosChange([...correosDestinatarios, nuevoCorreo]);
    setNuevoCorreo("");
    setErrorCorreo("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      agregarCorreo();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-slate-800 font-medium">
          Correos electrónicos
          <span className="text-red-500"> *</span>
        </Label>

        <div className="flex gap-2">
          <Input
            type="email"
            id="CorreoDestinatario"
            value={nuevoCorreo}
            disabled={bBloqueado}
            placeholder="Ingresa un correo electrónico destinatario"
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            onChange={(e) => setNuevoCorreo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" onClick={agregarCorreo} disabled={bBloqueado}>
            Agregar
          </Button>
        </div>

        {errorCorreo && (
          <p className="text-red-500 text-sm">{errorCorreo}</p>
        )}

        {correosDestinatarios.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {correosDestinatarios.map((correo) => (
              <Badge
                key={correo}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {correo}
                {!bBloqueado && (
                  <button
                    type="button"
                    onClick={() =>
                        onCorreosChange(
                        correosDestinatarios.filter((s) => s !== correo)
                      )
                    }
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
