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
import ResultadoSolicitud from '@/components/ResultadoSolicitud';
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
        estadoSolicitud: "",
        resultadoSolicitud: "",
        descripcionResultadoSolicitud : ""

    });

    const fnObtenerDetalleSolicitud = async () => {
        const resultado = await fetch(`${API_URL}/api/Solicitudes/ObtenerSolicitud/${ObjDatosSolicitud["Id"]}`, { method: "POST", headers: { "Content-Type": "Application/json", "Authorization": `Brearer ${token}` }, body: JSON.stringify({ EmailUsuarioSolicitud: authenticated && keycloak?.tokenParsed?.email }) }).then(response => response.json()).then(data => data).catch(ex => console.error(`ERROR en fnObtenerDetalleSolicitud() [ ${ex.name} - ${ex.message} ]`));
        const vObjSolicitud = (!resultado.Error) ? resultado.Result : []
        const objDatosSolicitudDetalle = JSON.parse(vObjSolicitud[0]?.DatosSolicitud);
        const { solicitud_detalle } = objDatosSolicitudDetalle
        solicitud_detalle.estadoSolicitud = vObjSolicitud[0].EstadoSolicitud
        solicitud_detalle.resultadoSolicitud = vObjSolicitud[0].ResultadoSolicitud
        solicitud_detalle.descripcionResultadoSolicitud = vObjSolicitud[0].DescripcionResultadoSolicitud
        //setSolicitud(vObjSolicitud[0])
        const sAdjuntos = vObjSolicitud[0].Adjuntos;
        setAdjuntos(sAdjuntos != null ? JSON.parse(sAdjuntos) : []);
        setServicios(objDatosSolicitudDetalle.solicitud_detalle.ServiciosSolicitadosPaciente.split(","));
        await fnCargarDatosFormulario(solicitud_detalle, objDatosSolicitudDetalle.solicitud_detalle.ServiciosSolicitadosPaciente.split(","),sAdjuntos != null ? JSON.parse(sAdjuntos) : []);
        setSolicitudDetalle(solicitud_detalle);
    }

    const fnCargarDatosFormulario = async (objSolicitud, servicios, vsAjuntos) => {
        let vsCorreos = objSolicitud.CorreosDestinatarios.split(", ") || [];
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
            correos: vsCorreos,
            serviciosSeleccionados: servicios,
            estadoSolicitud: objSolicitud.estadoSolicitud,
            resultadoSolicitud: objSolicitud.resultadoSolicitud,
            descripcionResultadoSolicitud: objSolicitud.descripcionResultadoSolicitud,
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
    return (
        <Dialog>

            <DialogTrigger className="flex lg:flex-row gap:3 px-3 py-2 bg-white-500 text-gray rounded border-2" onClick={fnObtenerDetalleSolicitud}>
                <Eye className="w-4 h-4 mr-2 mt-1" />
                Ver Solicitud
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
                            onDatosMunicipioChange={(value) => setFormData({ ...formData, regional: value[0]["departamento"], ciudadMunicipio: value[0]["nombre"] })}
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
                            onCorreosChange={(Correos) => setFormData({ ...formData, correos: Correos })}
                            bBloqueado={true}
                        />
                        {/**Informacion Descripción general */}
                        <DescripcionSolicitud
                            descripcionSolicitud={formData.descripcionSolicitud}
                            onDatosSolicitudChange={(value) => setFormData({ ...formData, descripcionSolicitud: value })}
                            bBloquear={true}
                        />
                        <ResultadoSolicitud
                            estado={formData.estadoSolicitud}
                            resultado={formData.resultadoSolicitud}
                            descripcionResultado={formData.descripcionResultadoSolicitud}
                        />
                    </form>
                </Card>)}

                <DialogFooter>
                    <DialogClose className="px-4 py-2 bg-gray-300 rounded">Cerrar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}