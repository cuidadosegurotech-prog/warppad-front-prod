
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, FileText, Import } from "lucide-react";
import DatosPaciente from "@/components/DatosPaciente";
import DescripcionSolicitud from "@/components/DescripcionSolicitud";
import InformacionPrestador from "@/components/InformacionPrestador";
import InformacionSolicitud from "@/components/InformacionSolicitud";
import CorreosDestinatarioSolicitud from '@/components/CorreosDestinatarioSolicitud';
import { useKeycloak } from "@/context/KeycloakContext";
import { Toaster, toast } from 'react-hot-toast';
const API_URL = import.meta.env.VITE_CK_BACKEND_URL;


interface ArchivoSubido {
  id: string;
  file: File,
  nombre: string;
  tamaño: number;
  tipo: string;
}

export default function NuevaSolicitud() {
  const { keycloak, authenticated, token, logout } = useKeycloak();
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
    // Descripcion Solicitud
    descripcionSolicitud: "",
    // Información del prestador
    regional: "",
    prestador: "",
    // Información de la solicitud
    tipoSolicitud: "",
    archivos: [] as ArchivoSubido[],
    correos: [] as string[],
    serviciosSeleccionados: [] as string[],
  });

  interface AgregarSolicitud {
    UsuarioSolicitud: string;
    TipoSolicitud: string;
    DescripcionSolicitud: string;
    DatosSolicitud: {
      solicitud_detalle: {
        //Id: number;
        //IdSolicitud: number;
        TipoIdentificacion: string;
        NumeroIdentificacion: string;
        NombrePaciente: string;
        DepartamentoPaciente: string;
        Regional: string;
        Prestador: string;
        CiudadMunicipioPaciente: string;
        DireccionPaciente: string;
        BarrioPaciente: string;
        PuntoReferenciaPaciente: string;
        TelefonoPaciente: string;
        TipoSolicitud: string;
        OrdenesMedicasPaciente: boolean;
        ServiciosSolicitadosPaciente: string;
        CorreosDestinatarios: string
        DescripcionSolicitud: string;
      };
    };
    TipoIdentificacion: string;
    NumeroIdentificacion: string;
    NombrePaciente: string;
    DepartamentoPaciente: string;
    CiudadMunicipioPaciente: string;
    DireccionPaciente: string;
    BarrioPaciente: string;
    TelefonoPaciente: string;
    DetalleTipoSolicitud: string;
    OrdenesMedicasPaciente: number;
    ServiciosSolicitadosPaciente: string;
    CorreosDestinatarios: string
    DetalleDescripcionSolicitud: string;
    Regional: string;
    Prestador: string;
    PuntoReferenciaPaciente: string;
    EmailUsuarioSolicitud: string;
  }

  const fnValidarCampos = (event: React.FormEvent) => {
    try {
      const vCamposFormulario = document.querySelectorAll("form input[type='text'], form input[type='number'], form textarea, form select");
      const bCamposDiligenciados = Array.from(vCamposFormulario).every(item => item.value.trim() !== "");
      if(!bCamposDiligenciados){
        toast.error('Existen campos por diligenciar, todos los campos con asterisco en rojo son obligatorios.');
        event.target.disabled = false;
      }
      return bCamposDiligenciados;
    } catch (error) {
      toast.error(`ERROR en fnValidarCampos() [${error.name} - ${error.message}]`);
      return false;
    }
  };

  const fnValidarNumeroTelefono = (event: React.FormEvent)=>{
    try{
      const iTelefonos = document.getElementById('telefonos');
      const bTelefonosValidos =  iTelefonos.value.length >= 10 ? true : false;

      if(!bTelefonosValidos){
        toast.error('El numero de telefono debe tener 10 caracteres.');
        event.target.disabled = false;
      }
      return bTelefonosValidos;
    }catch(ex){
      toast.error(`ERROR en fnValidarNumeroTelefono() [ ${ex.name} - ${ex.message} ]`);
      return false;
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.target.disabled = true;
    if(fnValidarCampos(e) && fnValidarNumeroTelefono(e)){
      try {
        const formularioData = new FormData();
        if (!formData.tipoDocumento) {
          toast.error("Por favor seleccione un tipo de documento.");
          return;
        }
        
        if (formData.departamento == "") {
          toast.error("Por favor seleccione el departamento.");
          e.target.disabled = false;
          return;
        }

        if (formData.ciudadMunicipio  == "") {
          toast.error("Por favor seleccione la ciudad/municipio.");
          e.target.disabled = false;
          return;
        }

        if (formData.regional  == "") {
          toast.error("Por favor seleccione la regional.");
          e.target.disabled = false;
          return;
        }

        const agregarSolicitud: AgregarSolicitud = {
          UsuarioSolicitud: authenticated && keycloak?.tokenParsed?.name, // Usuario que realiza el login en Keycloak 
          TipoSolicitud: formData.tipoSolicitud,
          DescripcionSolicitud: formData.descripcionSolicitud,
          DatosSolicitud: {
            solicitud_detalle: {
              //Id: 1, 
              //IdSolicitud: 1,
              TipoIdentificacion: formData.tipoDocumento,
              NumeroIdentificacion: formData.numeroIdentificacion,
              NombrePaciente: formData.nombrePaciente,
              DepartamentoPaciente: formData.departamento,
              CiudadMunicipioPaciente: formData.ciudadMunicipio,
              DireccionPaciente: formData.direccion,
              BarrioPaciente: formData.barrio,
              PuntoReferenciaPaciente: formData.puntoReferencia,
              TelefonoPaciente: formData.telefonos,
              TipoSolicitud: formData.tipoSolicitud,
              OrdenesMedicasPaciente: formData.archivos.length > 0,
              ServiciosSolicitadosPaciente: formData.serviciosSeleccionados.join(", "),
              CorreosDestinatarios: formData.correos.join(", "),
              DescripcionSolicitud: formData.descripcionSolicitud,
              Regional: formData.regional,
              Prestador: formData.prestador,
            },
          },
          TipoIdentificacion: formData.tipoDocumento,
          NumeroIdentificacion: formData.numeroIdentificacion,
          NombrePaciente: formData.nombrePaciente,
          DepartamentoPaciente: formData.departamento,
          CiudadMunicipioPaciente: formData.ciudadMunicipio,
          DireccionPaciente: formData.direccion,
          BarrioPaciente: formData.barrio,
          TelefonoPaciente: formData.telefonos,
          DetalleTipoSolicitud: formData.tipoSolicitud,
          OrdenesMedicasPaciente: formData.archivos.length,
          ServiciosSolicitadosPaciente: formData.serviciosSeleccionados.join(", "),
          CorreosDestinatarios: formData.correos.join(", "),
          DetalleDescripcionSolicitud: formData.descripcionSolicitud,
          Regional: formData.regional,
          Prestador: formData.prestador,
          PuntoReferenciaPaciente: formData.puntoReferencia,
          EmailUsuarioSolicitud: authenticated && keycloak?.tokenParsed?.email,
        };
        console.log("Nueva solicitud:", agregarSolicitud);
        formularioData.set("Data", JSON.stringify(agregarSolicitud));

        formData.archivos.map((file)=>{
          formularioData.append("archivos", file.file);
        });

        //const result = await fetch(`${API_URL}/api/Solicitudes/AgregarSolicitud`, { method: "POST", headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(agregarSolicitud) }).then(response => response.json()).then(data => {(!data.Error) ? toast.success(data.Message) : toast.error(data.Message); return data}).catch(exception => {toast.error(`ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`); return { Error : true, Message : `ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`}});
        const result = await fetch(`${API_URL}/api/Solicitudes/AgregarSolicitud`, { method: "POST", headers: {"Authorization": `Bearer ${token}` }, body: formularioData }).then(response => response.json()).then(data => {(!data.Error) ? toast.success(data.Message) : toast.error(data.Message); return data}).catch(exception => {toast.error(`ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`); e.target.disabled = false; return { Error : true, Message : `ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`}});
        console.log('Resultado al realizar el guardado de la solicitud =>', result)
        if(!result.Error){
          await fetch(`${API_URL}/api/email/EnvioEmailDestinatario`, { method: "POST", headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(result.Result[0]) }).then(response => response.json()).then(data => {(!data.Error) ? toast.success(data.Message) : toast.error(data.Message);}).catch(exception => {toast.error(`ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`); return { Error : true, Message : `ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`}});
  
            setFormData({
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
            //Datos solicitud
            descripcionSolicitud: "",
            // Información del prestador
            regional: "",
            prestador: "",
            // Información de la solicitud
            tipoSolicitud: "",
            archivos: [] as ArchivoSubido[],
            correos: [] as string[],
            serviciosSeleccionados: [] as string[],
          });
          e.target.disabled = false;
        }
      } catch (ex) {
        toast.error(`ERROR en handleSubmit() [ ${ex.name} - ${ex.message} ]`);
        e.target.disabled = false;
      }
    }
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
      <Toaster position="bottom-right" reverseOrder={false} />
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6">
        <form className="space-y-8">
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
            onTipoDocumentoChange={(value) => setFormData({ ...formData, tipoDocumento: value })}
            onNumeroIdentificacionChange={(value) => setFormData({ ...formData, numeroIdentificacion: value })}
            onNombrePacienteChange={(value) => setFormData({ ...formData, nombrePaciente: value })}
            onDepartamentoChange={(value) => setFormData({ ...formData, departamento: value })}
            // onCiudadMunicipioChange={(value) => setFormData({ ...formData, ciudadMunicipio: value })}
            onDireccionChange={(value) => setFormData({ ...formData, direccion: value })}
            onBarrioChange={(value) => setFormData({ ...formData, barrio: value })}
            onPuntoReferenciaChange={(value) => setFormData({ ...formData, puntoReferencia: value })}
            onTelefonosChange={(value) => setFormData({ ...formData, telefonos: value })}
            onDatosMunicipioChange={(value) => setFormData({ ...formData, regional: value[0]["departamento"], ciudadMunicipio : value[0]["nombre"]})}
          />

          {/* Información del Prestador */}
          <div className="pt-6 border-t border-slate-200">
            <InformacionPrestador
              regional={formData.regional}
              prestador={formData.prestador}
              onRegionalChange={(value) => setFormData({ ...formData, regional: value })}
              onPrestadorChange={(value) => setFormData({ ...formData, prestador: value })}
              bBloquear={false}
            />
          </div>

          {/* Información de la Solicitud */}
          <div className="pt-6 border-t border-slate-200">
            <InformacionSolicitud
              tipoSolicitud={formData.tipoSolicitud}
              archivos={formData.archivos}
              serviciosSeleccionados={formData.serviciosSeleccionados}
              onTipoSolicitudChange={(value) => setFormData({ ...formData, tipoSolicitud: value })}
              onArchivosChange={(archivos) => setFormData({ ...formData, archivos })}
              onServiciosChange={(servicios) => setFormData({ ...formData, serviciosSeleccionados: servicios })}
            />
          </div>
          <CorreosDestinatarioSolicitud
            correosDestinatarios={formData.correos}
            onCorreosChange={(Correos) => setFormData({ ...formData, correos: Correos})}
          />
          {/**Informacion Descripción general */}
          <DescripcionSolicitud 
            descripcionSolicitud={formData.descripcionSolicitud}
            onDatosSolicitudChange={(value) => setFormData({...formData, descripcionSolicitud : value})}
          />
          {/* Botón de envío */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold h-12 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 group"
            onClick={handleSubmit}
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
