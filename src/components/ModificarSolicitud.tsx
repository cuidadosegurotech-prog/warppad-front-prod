import {
    Dialog, DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatosPaciente from "@/components/DatosPaciente";
import DescripcionSolicitud from "@/components/DescripcionSolicitud";
import InformacionPrestador from "@/components/InformacionPrestador";
import InformacionSolicitud from "@/components/InformacionSolicitud";
import CorreosDestinatarioSolicitud from '@/components/CorreosDestinatarioSolicitud';
import { Save, Send, User, Mail, Phone, MapPin, Calendar, Star } from "lucide-react";
import { Eye, RefreshCcw } from "lucide-react";
import { useKeycloak } from "@/context/KeycloakContext";

const API_URL = import.meta.env.VITE_CK_BACKEND_URL;


interface ModalUpdate {
    ObjDatosSolicitud: {
        Id: string
    }
}

interface ArchivoSubido {
  id: string;
  file?: File;              // NUEVO: opcional para modo visualización
  nombre: string;
  tamaño?: number;          // NUEVO: opcional para modo visualización
  tipo?: string;
  url?: string;             // NUEVO: para URL de S3
  isExisting: boolean; // ✅ TRUE si viene de S3, FALSE si es nuevo
  toDelete?: boolean;  // ✅ Opcional para marcar eliminados
}

export default function ModalUpdate({ ObjDatosSolicitud }: ModalUpdate) {
    const [solicitud, setSolicitud] = useState(null);
    const [solicitudDetalle, setSolicitudDetalle] = useState(null);
    const [servicios, setServicios] = useState(null)
    const [Adjuntos, setAdjuntos] = useState([]);
    const { token, authenticated, keycloak } = useKeycloak();
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
    IdSolicitud: string;
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

    const fnObtenerDetalleSolicitud = async () => {
        const resultado = await fetch(`${API_URL}/api/Solicitudes/ObtenerSolicitud/${ObjDatosSolicitud["Id"]}`, { method: "POST", headers: { "Content-Type": "Application/json", "Authorization": `Brearer ${token}` }, body: JSON.stringify({ EmailUsuarioSolicitud: authenticated && keycloak?.tokenParsed?.email }) }).then(response => response.json()).then(data => data).catch(ex => console.error(`ERROR en fnObtenerDetalleSolicitud() [ ${ex.name} - ${ex.message} ]`));
        console.log("Resultado de obtener detalle solicitud", resultado);
        const vObjSolicitud = (!resultado.Error) ? resultado.Result : []
        const objDatosSolicitudDetalle = JSON.parse(vObjSolicitud[0]?.DatosSolicitud)
        //console.log(vObjSolicitud[0]);
        setSolicitud(vObjSolicitud[0])
        const sAdjuntos = vObjSolicitud[0].Adjuntos;
        console.log(JSON.parse(sAdjuntos));
        setAdjuntos(sAdjuntos != null ? JSON.parse(sAdjuntos) : []);
        setServicios(objDatosSolicitudDetalle.solicitud_detalle.ServiciosSolicitadosPaciente.split(","));
        await fnCargarDatosFormulario(objDatosSolicitudDetalle.solicitud_detalle, objDatosSolicitudDetalle.solicitud_detalle.ServiciosSolicitadosPaciente.split(","), sAdjuntos != null ? JSON.parse(sAdjuntos) : []);
        setSolicitudDetalle(objDatosSolicitudDetalle.solicitud_detalle);
        //setServicios(solicitud["ServiciosSolicitadosPaciente"].split(","));
        console.log("formdata");
        console.log(formData);
        // console.log(servicios)
    }

    const fnCargarDatosFormulario = async (objSolicitud, servicios, vsAjuntos)=>{
        console.log(objSolicitud);
        setFormData({
                // Datos del paciente
                tipoDocumento: objSolicitud.TipoIdentificacion,
                numeroIdentificacion: objSolicitud.NumeroIdentificacion,
                nombrePaciente: objSolicitud.NombrePaciente,
                departamento: objSolicitud.DepartamentoPaciente,
                ciudadMunicipio: objSolicitud.CiudadMunicipioPaciente,
                direccion: objSolicitud.DireccionPaciente,
                barrio: objSolicitud.BarrioPaciente,
                puntoReferencia: objSolicitud.PuntoReferenciaPaciente,
                telefonos: objSolicitud.TelefonoPaciente,
                //Datos solicitud
                descripcionSolicitud: objSolicitud.DescripcionSolicitud,
                // Información del prestador
                regional: objSolicitud.Regional,
                prestador: objSolicitud.Prestador,
                // Información de la solicitud
                tipoSolicitud: objSolicitud.TipoSolicitud,
                archivos: vsAjuntos,
                correos: objSolicitud.CorreosDestinatarios.split(", "),
                serviciosSeleccionados: servicios,
        });
    }
    // useEffect(()=>{
    //     const fnObtenerDetalleSolicitud = async ()=>{
    //         const resultado = await fetch(`${API_URL}/api/Solicitudes/ObtenerSolicitud/${ObjDatosSolicitud["Id"]}`, { method : "GET" ,headers: { "Content-Type" : "Application/json", "Authorization" : `Brearer ${token}` }}).then(response => response.json()).then(data => data).catch(ex => console.error(`ERROR en fnObtenerDetalleSolicitud() [ ${ex.name} - ${ex.message} ]`));
    //         console.log("Resultado de obtener detalle solicitud",resultado);
    //         const vObjSolicitud = (!resultado.Error) ? resultado.Result : []
    //         const objDatosSolicitudDetalle = JSON.parse(vObjSolicitud[0]?.DatosSolicitud)
    //         console.log(objDatosSolicitudDetalle);
    //         setSolicitud(objDatosSolicitudDetalle.solicitud_detalle);
    //     }
    //     fnObtenerDetalleSolicitud();
    // }, []);

    //console.log(solicitud);

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
        console.log(`Enviando datos bro2...`);
        e.preventDefault();
        e.target.disabled = true;
        if(fnValidarCampos(e) && fnValidarNumeroTelefono(e)){
          try {
            const formularioData = new FormData();
            if (!formData.tipoDocumento) {
              toast.error("Por favor seleccione un tipo de documento.");
              return;
            }
            
            const agregarSolicitud: AgregarSolicitud = {
              IdSolicitud: ObjDatosSolicitud.Id,
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
    
            // --- Archivos NUEVOS (subir al S3) ---
            formData.archivos
            .filter((archivo) => !archivo.isExisting && archivo.file) // ⬅️ Solo los nuevos
            .forEach((archivo) => {
                formularioData.append("archivos", archivo.file!);
            });

            // --- Archivos EXISTENTES (ya en S3, solo IDs) ---
            const idsExistentes = formData.archivos
            .filter((archivo) => archivo.isExisting)
            .map((archivo) => archivo.id);

            // Enviar lista de IDs en un campo JSON
            formularioData.append("idsExistentes", JSON.stringify(idsExistentes));
    
            //const result = await fetch(`${API_URL}/api/Solicitudes/AgregarSolicitud`, { method: "POST", headers: { 'Content-Type': "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(agregarSolicitud) }).then(response => response.json()).then(data => {(!data.Error) ? toast.success(data.Message) : toast.error(data.Message); return data}).catch(exception => {toast.error(`ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`); return { Error : true, Message : `ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`}});
            const result = await fetch(`${API_URL}/api/Solicitudes/ActualizarSolicitud`, { method: "POST", headers: {"Authorization": `Bearer ${token}` }, body: formularioData }).then(response => response.json()).then(data => {(!data.Error) ? toast.success(data.Message) : toast.error(data.Message); return data}).catch(exception => {toast.error(`ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`); e.target.disabled = false; return { Error : true, Message : `ERROR en handleSubmit() [ ${exception.name} - ${exception.message} ]`}});
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
        <Dialog>

            <DialogTrigger className="flex lg:flex-row gap:3 px-3 py-2 bg-white-500 text-gray rounded border-2" onClick={fnObtenerDetalleSolicitud}>
                <RefreshCcw className="w-4 h-4 mr-2 mt-1" />
                Actualizar Solicitud
            </DialogTrigger>


            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detalle de solicitud {ObjDatosSolicitud["Id"]}</DialogTitle>
                    <DialogDescription>
                        Detalles de la solicitud a Actualizar
                    </DialogDescription>
                </DialogHeader>

                {!solicitudDetalle ? (<p>Cargando solicitud...</p>) : solicitudDetalle && (<Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6">
                    <form className="space-y-1">
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
                            bBloquear={true}
                        />

                        {/* Información del Prestador */}
                        <div className="pt-6 border-t border-slate-200">
                            <InformacionPrestador
                                regional={formData.regional}
                                prestador={formData.prestador}
                                onRegionalChange={(value) => setFormData({ ...formData, regional: value })}
                                onPrestadorChange={(value) => setFormData({ ...formData, prestador: value })}
                                bBloquear={true}
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
                                bBloqueado={true}
                                modoVisualizacion={true}
                            />
                        </div>

                       <CorreosDestinatarioSolicitud
                        correosDestinatarios={formData.correos}
                        onCorreosChange={(Correos) => setFormData({ ...formData, correos: Correos})}
                        bBloqueado={true}
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
                </Card>)}

                <DialogFooter>
                    <DialogClose className="px-4 py-2 bg-gray-300 rounded">Cerrar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}