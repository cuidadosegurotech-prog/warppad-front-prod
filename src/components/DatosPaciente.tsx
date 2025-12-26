
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Municipio{
  nombre: string,
  departamento: string
}

// const gvMunicipiosPorDepartamento: Record<string, Municipio[]> = {
//   "atlantico" : [
//     {nombre: "Barranquilla",departamento: "2025" },
//     {nombre: "Baranoa",departamento: "2025" },
//     {nombre: "Campo de la Cruz",departamento: "2025" },
//     {nombre: "Candelaria",departamento: "2025" },
//     {nombre: "Galapa",departamento: "2025" },
//     {nombre: "Juan de Acosta",departamento: "2025" },
//     {nombre: "Luruaco",departamento: "2025" },
//     {nombre: "Malambo",departamento: "2025" },
//     {nombre: "Manatí",departamento: "2025" },
//     {nombre: "Palmar de Varela",departamento: "2025" },
//     {nombre: "Piojó",departamento: "2025" },
//     {nombre: "Polonuevo",departamento: "2025" },
//     {nombre: "Ponedera",departamento: "2025" },
//     {nombre: "Puerto Colombia",departamento: "2025" },
//     {nombre: "Repelón",departamento: "2025" },
//     {nombre: "Sabanagrande",departamento: "2025" },
//     {nombre: "Sabanalarga",departamento: "2025" },
//     {nombre: "Santa Lucía",departamento: "2025" },
//     {nombre: "Santo Tomás",departamento: "2025" },
//     {nombre: "Soledad",departamento: "2025" },
//     {nombre: "Suan",departamento: "2025" },
//     {nombre: "Tubará",departamento: "2025" },
//     {nombre: "Usiacurí",departamento: "2025" },
// ],
// "bolivar" : [
//   {nombre: "Achí", departamento: "2024"},
//   {nombre: "Altos del Rosario", departamento: "3"},
//   {nombre: "Arenal", departamento: "2024"},
//   {nombre: "Arjona", departamento: "1"},
//   {nombre: "Arroyohondo", departamento: "2006"},
//   {nombre: "Barranco de Loba", departamento: "3"},
//   {nombre: "Calamar", departamento: "2006"},
//   {nombre: "Cantagallo", departamento: "2006"},
//   {nombre: "Cartagena de Indias", departamento: "1"},
//   {nombre: "Cicuco", departamento: "2024"},
//   {nombre: "Clemencia", departamento: "1"},
//   {nombre: "Córdoba", departamento: "2006"},
//   {nombre: "El Carmen de Bolívar", departamento: "2006"},
//   {nombre: "El Guamo", departamento: "2006"},
//   {nombre: "El Peñón", departamento: "3"},
//   {nombre: "Hatillo de Loba", departamento: "3"},
//   {nombre: "Magangué", departamento: "2024"},
//   {nombre: "Mahates", departamento: "1"},
//   {nombre: "Margarita", departamento: "3"},
//   {nombre: "María La Baja", departamento: "1"},
//   {nombre: "Montecristo", departamento: "2024"},
//   {nombre: "Morales", departamento: "2024"},
//   {nombre: "Norosí", departamento: "3"},
//   {nombre: "Pinillos", departamento: "2024"},
//   {nombre: "Regidor", departamento: "3"},
//   {nombre: "Río Viejo", departamento: "3"},
//   {nombre: "San Cristóbal", departamento: "1"},
//   {nombre: "San Fernando", departamento: "2024"},
//   {nombre: "San Jacinto", departamento: "2006"},
//   {nombre: "San Jacinto del Cauca", departamento: "2024"},
//   {nombre: "San Juan Nepomuceno", departamento: "2006"},
//   {nombre: "San Martín de Loba", departamento: "3"},
//   {nombre: "San Pablo", departamento: "2024"},
//   {nombre: "Santa Catalina", departamento: "1"},
//   {nombre: "Santa Cruz de Mompox", departamento: "2024"},
//   {nombre: "Santa Rosa", departamento: "1"},
//   {nombre: "Santa Rosa del Sur", departamento: "2024"},
//   {nombre: "Simití", departamento: "2024"},
//   {nombre: "Soplaviento", departamento: "1"},
//   {nombre: "Talaigua Nuevo", departamento: "2024"},
//   {nombre: "Puerto Rico", departamento: "2024"},
//   {nombre: "Turbaco", departamento: "1"},
//   {nombre: "Turbaná", departamento: "1"},
//   {nombre: "Villanueva", departamento: "1"},
//   {nombre: "Zambrano", departamento: "2006"}
// ], 
// "cesar" : [
//   {nombre: "Valledupar", departamento: "2027"},
//   {nombre: "Aguachica", departamento: "2027"},
//   {nombre: "Agustín Codazzi", departamento: "2027"},
//   {nombre: "Bosconia", departamento: "2027"},
//   {nombre: "Chimichagua", departamento: "2027"},
//   {nombre: "El Copey", departamento: "2027"},
//   {nombre: "San Alberto", departamento: "2027"},
//   {nombre: "Curumaní", departamento: "2027"},
//   {nombre: "El Paso", departamento: "2027"},
//   {nombre: "La Paz", departamento: "2027"},
//   {nombre: "Pueblo Bello", departamento: "2027"},
//   {nombre: "La Jagua de Ibirico", departamento: "2027"},
//   {nombre: "Chiriguaná", departamento: "2027"},
//   {nombre: "Astrea", departamento: "2027"},
//   {nombre: "San Martín", departamento: "2027"},
//   {nombre: "Pelaya", departamento: "2027"},
//   {nombre: "Pailitas", departamento: "2027"},
//   {nombre: "Gamarra", departamento: "2027"},
//   {nombre: "Manaure", departamento: "2027"},
//   {nombre: "Río de Oro", departamento: "2027"},
//   {nombre: "Tamalameque", departamento: "2027"},
//   {nombre: "Becerril", departamento: "2027"},
//   {nombre: "San Diego", departamento: "2027"},
//   {nombre: "La Gloria", departamento: "2027"},
//   {nombre: "González", departamento: "2027"},
// ],
// "cordoba" : [
//   {nombre:"Ayapel", departamento:"5"},
//   {nombre:"Buenavista", departamento:"5"},
//   {nombre:"Canalete", departamento:"5"},
//   {nombre:"Cereté", departamento:"5"},
//   {nombre:"Chimá", departamento:"5"},
//   {nombre:"Chinú", departamento:"5"},
//   {nombre:"Ciénaga de Oro", departamento:"5"},
//   {nombre:"Cotorra", departamento:"5"},
//   {nombre:"La Apartada", departamento:"5"},
//   {nombre:"Lorica", departamento:"5"},
//   {nombre:"Los Córdobas", departamento:"5"},
//   {nombre:"Momil", departamento:"5"},
//   {nombre:"Montelíbano", departamento:"5"},
//   {nombre:"Montería", departamento:"5"},
//   {nombre:"Moñitos", departamento:"5"},
//   {nombre:"Planeta Rica", departamento:"5"},
//   {nombre:"Pueblo Nuevo", departamento:"5"},
//   {nombre:"Puerto Escondido", departamento:"5"},
//   {nombre:"Puerto Libertador", departamento:"5"},
//   {nombre:"Purísima", departamento:"5"},
//   {nombre:"Sahagún", departamento:"5"},
//   {nombre:"San Andrés de Sotavento", departamento:"5"},
//   {nombre:"San Antero", departamento:"5"},
//   {nombre:"San Bernardo del Viento", departamento:"5"},
//   {nombre:"San Carlos", departamento:"5"},
//   {nombre:"San José de Uré", departamento:"5"},
//   {nombre:"San Pelayo", departamento:"5"},
//   {nombre:"Tierralta", departamento:"5"},
//   {nombre:"Tuchín", departamento:"5"},
//   {nombre:"Valencia", departamento:"5"}
// ], 
// "magdalena" : [
//   {nombre : "Algarrobo", departamento : "3"},
//   {nombre : "Aracataca", departamento : "3"},
//   {nombre : "Ariguaní", departamento : "3"},
//   {nombre : "Cerro de San Antonio", departamento : "3"},
//   {nombre : "Chibolo", departamento : "3"},
//   {nombre : "Ciénaga", departamento : "3"},
//   {nombre : "Concordia", departamento : "3"},
//   {nombre : "El Banco", departamento : "3"},
//   {nombre : "El Piñón", departamento : "3"},
//   {nombre : "El Retén", departamento : "3"},
//   {nombre : "Fundación", departamento : "3"},
//   {nombre : "Guamal", departamento : "3"},
//   {nombre : "Nueva Granada", departamento : "3"},
//   {nombre : "Pedraza", departamento : "3"},
//   {nombre : "Pijiño del Carmen", departamento : "3"},
//   {nombre : "Pivijay", departamento : "3"},
//   {nombre : "Plato", departamento : "3"},
//   {nombre : "Puebloviejo", departamento : "3"},
//   {nombre : "Remolino", departamento : "3"},
//   {nombre : "Sabanas de San Ángel", departamento : "3"},
//   {nombre : "Salamina", departamento : "3"},
//   {nombre : "San Sebastián de Buenavista", departamento : "3"},
//   {nombre : "Santa Ana", departamento : "3"},
//   {nombre : "Santa Bárbara de Pinto", departamento : "3"},
//   {nombre : "Santa Marta", departamento : "3"},
//   {nombre : "San Zenón", departamento : "3"},
//   {nombre : "Sitionuevo", departamento : "3"},
//   {nombre : "Tenerife", departamento : "3"},
//   {nombre : "Zapayán", departamento : "3"},
//   {nombre : "Zona Bananera", departamento : "3"},
// ],
// "sucre" : [
//   {nombre:"Guaranda", departamento:"4"},
//   {nombre:"Majagual", departamento:"4"},
//   {nombre:"Sucre", departamento:"4"},
//   {nombre:"Chalán", departamento:"4"},
//   {nombre:"Colosó", departamento:"4"},
//   {nombre:"Morroa", departamento:"4"},
//   {nombre:"Ovejas", departamento:"4"},
//   {nombre:"Sincelejo", departamento:"4"},
//   {nombre:"Coveñas", departamento:"4"},
//   {nombre:"Palmito", departamento:"4"},
//   {nombre:"San Onofre", departamento:"4"},
//   {nombre:"Santiago de Tolú", departamento:"4"},
//   {nombre:"Toluviejo", departamento:"4"},
//   {nombre:"Buenavista", departamento:"4"},
//   {nombre:"Corozal", departamento:"4"},
//   {nombre:"El Roble", departamento:"4"},
//   {nombre:"Galeras", departamento:"4"},
//   {nombre:"Los Palmitos", departamento:"4"},
//   {nombre:"Sampués", departamento:"4"},
//   {nombre:"San Juan de Betulia", departamento:"4"},
//   {nombre:"San Pedro", departamento:"4"},
//   {nombre:"Sincé", departamento:"4"},
//   {nombre:"Caimito", departamento:"4"},
//   {nombre:"La Unión", departamento:"4"},
//   {nombre:"San Benito Abad", departamento:"4"},
//   {nombre:"San Marcos", departamento:"4"}
// ]
// }

const gvMunicipiosPorDepartamento: Record<string, Municipio[]> = {
"bolivar" : [
  {nombre: "Arjona", departamento: "1"},
  {nombre: "Cartagena de Indias", departamento: "1"},
  {nombre: "Clemencia", departamento: "1"},
  {nombre: "Mahates", departamento: "1"},
  {nombre: "María La Baja", departamento: "1"},
  {nombre: "San Cristóbal", departamento: "1"},
  {nombre: "Santa Catalina", departamento: "1"},
  {nombre: "Santa Rosa", departamento: "1"},
  {nombre: "Soplaviento", departamento: "1"},
  {nombre: "Turbaco", departamento: "1"},
  {nombre: "Turbaná", departamento: "1"},
  {nombre: "Villanueva", departamento: "1"},
]
}


interface DatosPacienteProps {
  tipoDocumento: string;
  numeroIdentificacion: string;
  nombrePaciente: string;
  departamento: string;
  ciudadMunicipio: string;
  direccion: string;
  barrio: string;
  puntoReferencia: string;
  telefonos: string;
  onTipoDocumentoChange?: (value: string) => void;
  onNumeroIdentificacionChange?: (value: string) => void;
  onNombrePacienteChange?: (value: string) => void;
  onDepartamentoChange?: (value: string) => void;
  onCiudadMunicipioChange?: (value: string) => void;
  onDireccionChange?: (value: string) => void;
  onBarrioChange?: (value: string) => void;
  onPuntoReferenciaChange?: (value: string) => void;
  onTelefonosChange?: (value: string) => void;
  onDatosMunicipioChange?: (value: Municipio[]) => void;
  bBloquear?: boolean;
}

export default function DatosPaciente({
  tipoDocumento,
  numeroIdentificacion,
  nombrePaciente,
  departamento,
  ciudadMunicipio,
  direccion,
  barrio,
  puntoReferencia,
  telefonos,
  onTipoDocumentoChange,
  onNumeroIdentificacionChange,
  onNombrePacienteChange,
  onDepartamentoChange,
  onCiudadMunicipioChange,
  onDireccionChange,
  onBarrioChange,
  onPuntoReferenciaChange,
  onTelefonosChange,
  onDatosMunicipioChange,
  bBloquear
}: DatosPacienteProps) {
  //const [municipio, setMunicipio] = useState([]);
  const [municipiosDepartamento, setmunicipiosDepartamento] = useState([]);
  let municipiosDisponibles = gvMunicipiosPorDepartamento[departamento] || [];
  //setmunicipiosDepartamento(municipiosDisponibles);
    //onDepartamentoChange(departamento);
    //setmunicipiosDepartamento(municipiosDisponibles)
  useEffect(() => {
  if (departamento) {
    const municipiosDisponibles = gvMunicipiosPorDepartamento[departamento] || [];
    setmunicipiosDepartamento(municipiosDisponibles);
    if(ciudadMunicipio){
      console.log("Llego la ciudadMunicipio");
      onDatosMunicipioChange(gvMunicipiosPorDepartamento[departamento].filter(item => item.nombre == ciudadMunicipio));
    }
  } else {
    setmunicipiosDepartamento([]);
  }
}, [departamento]);


  useEffect(() => {
    if(ciudadMunicipio){
      console.log("Llego la ciudadMunicipio");
      setmunicipiosDepartamento(gvMunicipiosPorDepartamento[departamento]);
      onDatosMunicipioChange(gvMunicipiosPorDepartamento[departamento].filter(item => item.nombre == ciudadMunicipio));
    }
  }, [ciudadMunicipio]);

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números, sin puntos, espacios o caracteres especiales
    const value = e.target.value.replace(/[^0-9]/g, '');
    onNumeroIdentificacionChange(value);
  };

  const handleTelefonosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir números, espacios, guiones y paréntesis para teléfonos
    const value = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
    onTelefonosChange(value);
  };


  const handleDepartamentoChange = (value: string) =>{
    console.log("Departamento Seleccionado ",value);
    onDepartamentoChange(value);
    municipiosDisponibles = gvMunicipiosPorDepartamento[value]
    setmunicipiosDepartamento(municipiosDisponibles)
  };

  const handleSearchDepartamento = (value: string)=>{
    console.log(value);
    //console.table(gvMunicipiosPorDepartamento[departamento]);
    const vObjMunicipiosDepartamento = value.length != 0 ?  gvMunicipiosPorDepartamento[departamento].filter(item => item.nombre.toLowerCase().includes(value.toLowerCase())) : gvMunicipiosPorDepartamento[departamento];
    console.log("Los que obtuvo al realizar el filtro", vObjMunicipiosDepartamento);
    setmunicipiosDepartamento(vObjMunicipiosDepartamento);
  };

  const handleMunicipioChange = (value: string) => {
    //console.log("Cambio de prestador a:", value);
    setmunicipiosDepartamento(gvMunicipiosPorDepartamento[departamento]);
    //onCiudadMunicipioChange(value);
    onDatosMunicipioChange(gvMunicipiosPorDepartamento[departamento].filter(item => item.nombre == value));
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
          <Select value={tipoDocumento} onValueChange={onTipoDocumentoChange} required disabled={bBloquear}>
            <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
              <SelectValue placeholder="Selecciona el tipo de documento" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="CC" className="text-slate-800 hover:bg-slate-50">
                Cédula de Ciudadanía
              </SelectItem>
              <SelectItem value="CE" className="text-slate-800 hover:bg-slate-50">
                Cédula de Extranjería
              </SelectItem>
              <SelectItem value="PA" className="text-slate-800 hover:bg-slate-50">
                Pasaporte
              </SelectItem>
              <SelectItem value="TI" className="text-slate-800 hover:bg-slate-50">
                Tarjeta de Identidad
              </SelectItem>
              <SelectItem value="RC" className="text-slate-800 hover:bg-slate-50">
                Registro Civil
              </SelectItem>
              <SelectItem value="PE" className="text-slate-800 hover:bg-slate-50">
                Permiso Especial
              </SelectItem>
              <SelectItem value="PT" className="text-slate-800 hover:bg-slate-50">
                Permiso por Proteccion Temporal
              </SelectItem>
              <SelectItem value="SC" className="text-slate-800 hover:bg-slate-50">
                Salvoconducto
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
            disabled={bBloquear}
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
            disabled={bBloquear}
          />
          <p className="text-xs text-slate-500">
            Debe estar escrito tal cual como aparece en su documento de identidad
          </p>
        </div>

        {/* Departamento del paciente */}
        <div className="space-y-2">
          <Label htmlFor="departamento" className="text-slate-800 font-medium">
            Departamento solicitud <span className="text-red-500">*</span>
          </Label>
          <Select value={departamento} onValueChange={handleDepartamentoChange} disabled={bBloquear}>
            <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20">
              <SelectValue placeholder="Selecciona el departamento" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {/* <SelectItem value="atlantico" className="text-slate-800 hover:bg-slate-50">
                Atlántico
              </SelectItem>
              <SelectItem value="magdalena" className="text-slate-800 hover:bg-slate-50">
                Magdalena
              </SelectItem> */}
              <SelectItem value="bolivar" className="text-slate-800 hover:bg-slate-50">
                Bolívar
              </SelectItem>
              {/* <SelectItem value="cesar" className="text-slate-800 hover:bg-slate-50">
                Cesar
              </SelectItem>
              <SelectItem value="cordoba" className="text-slate-800 hover:bg-slate-50">
                Córdoba
              </SelectItem>
              <SelectItem value="sucre" className="text-slate-800 hover:bg-slate-50">
                Sucre
              </SelectItem> */}
              {/* <SelectItem value="la_guajira" className="text-slate-800 hover:bg-slate-50">
                La Guajira
              </SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        {/* Municipio */}
        <div className="space-y-2">
          <Label htmlFor="Municipio" className="text-slate-800 font-medium">
            Ciudad / Municipio solicitud
            <span className="text-red-500"> *</span>
          </Label>
          <Select value={ciudadMunicipio} onValueChange={handleMunicipioChange} disabled={!departamento} disabled={bBloquear}>
            <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:border-blue-400 focus:ring-blue-400/20 disabled:opacity-50">
              <SelectValue placeholder={departamento ? "Seleccione la Ciudad/Municipio" : "Primero selecciona un departamento"} />
            </SelectTrigger>
            <SelectContent enableSearch={false} onSearchChange={handleSearchDepartamento} className="bg-white border-slate-200 shadow-lg z-[100] max-h-[200px] overflow-y-auto">
              {municipiosDepartamento.map((ciudadMunicipio) => (
                <SelectItem 
                  key={`${ciudadMunicipio.nombre} - ${ciudadMunicipio.departamento}`} 
                  value={`${ciudadMunicipio.nombre}`}
                  className="text-slate-800 hover:bg-slate-50 bg-white cursor-pointer"
                >
                  {ciudadMunicipio.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ciudad / Municipio del paciente */}
        {/* <div className="space-y-2">
          <Label htmlFor="ciudadMunicipio" className="text-slate-800 font-medium">
            Ciudad / Municipio del paciente <span className="text-red-500">*</span>
          </Label>
          <Input
            id="ciudadMunicipio"
            type="text"
            placeholder="Nombre de la ciudad o municipio"
            value={ciudadMunicipio}
            onChange={(e) => onCiudadMunicipioChange(e.target.value)}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            required
            disabled={bBloquear}
          />
        </div> */}

        {/* Dirección del paciente */}
        <div className="space-y-2">
          <Label htmlFor="direccion" className="text-slate-800 font-medium">
            Dirección del paciente <span className="text-red-500">*</span>
          </Label>
          <Input
            id="direccion"
            type="text"
            placeholder="Dirección completa del domicilio"
            value={direccion}
            onChange={(e) => onDireccionChange(e.target.value)}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            required
            disabled={bBloquear}
          />
        </div>

        {/* Barrio del paciente */}
        <div className="space-y-2">
          <Label htmlFor="barrio" className="text-slate-800 font-medium">
            Barrio del paciente <span className="text-red-500">*</span>
          </Label>
          <Input
            id="barrio"
            type="text"
            placeholder="Nombre del barrio o sector"
            value={barrio}
            onChange={(e) => onBarrioChange(e.target.value)}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            required
            disabled={bBloquear}
          />
        </div>

        {/* Punto de referencia del domicilio */}
        <div className="space-y-2">
          <Label htmlFor="puntoReferencia" className="text-slate-800 font-medium">
            Punto de referencia del domicilio
          </Label>
          <Textarea
            id="puntoReferencia"
            placeholder="Lugares cercanos que faciliten encontrar el domicilio (ej: cerca de la cancha, frente a la tienda Don José, al lado de la iglesia San Pedro, etc.)"
            value={puntoReferencia}
            onChange={(e) => onPuntoReferenciaChange(e.target.value)}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 min-h-20"
            disabled={bBloquear}
          />
          <p className="text-xs text-slate-500">
            Menciona lugares conocidos como canchas, tiendas, iglesias, farmacias, parques, etc.
          </p>
        </div>

        {/* Teléfonos */}
        <div className="space-y-2">
          <Label htmlFor="telefonos" className="text-slate-800 font-medium">
            Teléfonos <span className="text-red-500">*</span>
          </Label>
          <Input
            id="telefonos"
            type="text"
            placeholder="Ej: 300 123 4567 - 605 234 5678"
            value={telefonos}
            onChange={handleTelefonosChange}
            className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
            required
            disabled={bBloquear}
          />
          <p className="text-xs text-slate-500">
            Puedes incluir varios números separados por guión medio ( - )
          </p>
        </div>
      </div>
    </div>
  );
}
