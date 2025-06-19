
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, Send, Eye, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function PlantillasCorreo() {
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Plantilla copiada al portapapeles");
  };

  const plantillaConfirmacion = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Solicitud</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; }
        .logo { width: 60px; height: 60px; background: #ffffff; border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; }
        .title { color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; }
        .subtitle { color: #e2e8f0; font-size: 14px; margin: 5px 0 0 0; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 16px; font-weight: bold; color: #1e40af; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }
        .details-grid { background: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #3b82f6; }
        .detail-item { margin-bottom: 10px; }
        .detail-label { font-weight: 600; color: #475569; display: inline-block; width: 140px; }
        .detail-value { color: #1e293b; }
        .steps { counter-reset: step-counter; }
        .step { counter-increment: step-counter; margin-bottom: 15px; padding-left: 30px; position: relative; }
        .step::before { content: counter(step-counter); position: absolute; left: 0; top: 0; background: #3b82f6; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
        .info-box { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .contact-info { background: #f1f5f9; border-radius: 8px; padding: 20px; }
        .contact-item { margin-bottom: 8px; }
        .footer { background: #1e293b; padding: 25px 30px; text-align: center; }
        .footer-text { color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0; }
        .note { background: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; padding: 15px; margin-top: 20px; font-size: 13px; color: #991b1b; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <span style="font-size: 24px; color: #1e40af;">📧</span>
            </div>
            <h1 class="title">[NOMBRE_INSTITUCION]</h1>
            <p class="subtitle">Confirmación de Recepción de Solicitud</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Estimado/a <strong>[NOMBRE_SOLICITANTE]</strong>,
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
                Esperamos que este mensaje le encuentre bien. Por medio de la presente, confirmamos la recepción de su solicitud.
            </p>
            
            <!-- Detalles de la Solicitud -->
            <div class="section">
                <div class="section-title">📋 DETALLES DE LA SOLICITUD</div>
                <div class="details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Número de solicitud:</span>
                        <span class="detail-value"><strong>[NUMERO_SOLICITUD]</strong></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Fecha de recepción:</span>
                        <span class="detail-value">[FECHA_RECEPCION]</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo de solicitud:</span>
                        <span class="detail-value">[TIPO_SOLICITUD]</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Estado actual:</span>
                        <span class="detail-value" style="color: #059669; font-weight: 600;">✅ En proceso de revisión</span>
                    </div>
                </div>
            </div>
            
            <!-- Próximos Pasos -->
            <div class="section">
                <div class="section-title">🚀 PRÓXIMOS PASOS</div>
                <div class="steps">
                    <div class="step">Su solicitud será revisada por nuestro equipo especializado</div>
                    <div class="step">Recibirá una respuesta en un plazo máximo de <strong>[TIEMPO_RESPUESTA] días hábiles</strong></div>
                    <div class="step">Cualquier documentación adicional requerida le será comunicada oportunamente</div>
                </div>
            </div>
            
            <!-- Información Importante -->
            <div class="info-box">
                <h4 style="margin: 0 0 10px 0; color: #92400e;">📌 INFORMACIÓN IMPORTANTE</h4>
                <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                    <li>Conserve este número de solicitud: <strong>[NUMERO_SOLICITUD]</strong></li>
                    <li>Puede consultar el estado en nuestro portal web</li>
                    <li>Para consultas adicionales, utilice nuestros canales oficiales</li>
                </ul>
            </div>
            
            <!-- Datos de Contacto -->
            <div class="section">
                <div class="section-title">📞 DATOS DE CONTACTO</div>
                <div class="contact-info">
                    <div class="contact-item"><strong>Teléfono:</strong> [TELEFONO_CONTACTO]</div>
                    <div class="contact-item"><strong>Email:</strong> [EMAIL_CONTACTO]</div>
                    <div class="contact-item"><strong>Horario:</strong> [HORARIO_ATENCION]</div>
                </div>
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin-top: 30px;">
                Agradecemos su confianza en nuestros servicios y le aseguramos que su solicitud será atendida con la mayor diligencia y profesionalismo.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #64748b;">Atentamente,</p>
                <p style="margin: 5px 0 0 0; font-weight: 600; color: #1e293b;">[NOMBRE_FUNCIONARIO]</p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">[CARGO]</p>
            </div>
            
            <div class="note">
                <strong>NOTA:</strong> Este es un mensaje automático, por favor no responda a este correo. Para consultas, utilice nuestros canales oficiales de atención.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                [NOMBRE_INSTITUCION]<br>
                [DIRECCION]<br>
                [TELEFONO] | [EMAIL_INSTITUCIONAL]
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();

  const plantillaProceso = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud en Proceso</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; }
        .logo { width: 60px; height: 60px; background: #ffffff; border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; }
        .title { color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; }
        .subtitle { color: #d1fae5; font-size: 14px; margin: 5px 0 0 0; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 16px; font-weight: bold; color: #059669; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }
        .details-grid { background: #f0fdf4; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981; }
        .detail-item { margin-bottom: 10px; }
        .detail-label { font-weight: 600; color: #475569; display: inline-block; width: 140px; }
        .detail-value { color: #1e293b; }
        .progress-bar { background: #e5e7eb; border-radius: 20px; height: 12px; margin: 20px 0; overflow: hidden; }
        .progress-fill { background: linear-gradient(90deg, #10b981, #059669); height: 100%; border-radius: 20px; transition: width 0.3s ease; }
        .progress-text { text-align: center; margin-top: 10px; color: #059669; font-weight: 600; }
        .timeline { position: relative; padding-left: 30px; }
        .timeline-item { position: relative; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb; }
        .timeline-item:last-child { border-bottom: none; }
        .timeline-dot { position: absolute; left: -35px; top: 5px; width: 12px; height: 12px; border-radius: 50%; }
        .timeline-dot.completed { background: #10b981; }
        .timeline-dot.current { background: #f59e0b; box-shadow: 0 0 0 4px #fef3c7; }
        .timeline-dot.pending { background: #d1d5db; }
        .timeline-title { font-weight: 600; color: #1e293b; margin-bottom: 5px; }
        .timeline-desc { color: #64748b; font-size: 14px; }
        .status-box { background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 20px; text-align: center; margin: 25px 0; }
        .status-icon { font-size: 48px; margin-bottom: 15px; }
        .status-title { font-size: 20px; font-weight: bold; color: #059669; margin-bottom: 10px; }
        .status-desc { color: #047857; font-size: 16px; }
        .info-box { background: #fefce8; border: 1px solid #facc15; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .contact-info { background: #f1f5f9; border-radius: 8px; padding: 20px; }
        .contact-item { margin-bottom: 8px; }
        .footer { background: #1e293b; padding: 25px 30px; text-align: center; }
        .footer-text { color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0; }
        .note { background: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; padding: 15px; margin-top: 20px; font-size: 13px; color: #991b1b; }
        .next-steps { background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <span style="font-size: 24px; color: #059669;">⚙️</span>
            </div>
            <h1 class="title">[NOMBRE_INSTITUCION]</h1>
            <p class="subtitle">Actualización de Estado - Solicitud en Proceso</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Estimado/a <strong>[NOMBRE_SOLICITANTE]</strong>,
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
                Nos complace informarle sobre el progreso de su solicitud. Nuestro equipo está trabajando activamente en su caso.
            </p>
            
            <!-- Estado Actual -->
            <div class="status-box">
                <div class="status-icon">🔄</div>
                <div class="status-title">SOLICITUD EN PROCESO</div>
                <div class="status-desc">Su solicitud está siendo revisada y procesada por nuestro equipo especializado</div>
            </div>
            
            <!-- Detalles de la Solicitud -->
            <div class="section">
                <div class="section-title">📋 DETALLES DE LA SOLICITUD</div>
                <div class="details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Número de solicitud:</span>
                        <span class="detail-value"><strong>[NUMERO_SOLICITUD]</strong></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Fecha de recepción:</span>
                        <span class="detail-value">[FECHA_RECEPCION]</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo de solicitud:</span>
                        <span class="detail-value">[TIPO_SOLICITUD]</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Fecha de inicio proceso:</span>
                        <span class="detail-value">[FECHA_INICIO_PROCESO]</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Responsable asignado:</span>
                        <span class="detail-value">[NOMBRE_RESPONSABLE]</span>
                    </div>
                </div>
            </div>
            
            <!-- Progreso -->
            <div class="section">
                <div class="section-title">📊 PROGRESO ACTUAL</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: [PORCENTAJE_PROGRESO]%;"></div>
                </div>
                <div class="progress-text">[PORCENTAJE_PROGRESO]% Completado</div>
            </div>
            
            <!-- Timeline del Proceso -->
            <div class="section">
                <div class="section-title">🕐 CRONOLOGÍA DEL PROCESO</div>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-dot completed"></div>
                        <div class="timeline-title">Solicitud Recibida</div>
                        <div class="timeline-desc">Su solicitud fue recibida y registrada en nuestro sistema - [FECHA_RECEPCION]</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot completed"></div>
                        <div class="timeline-title">Documentación Validada</div>
                        <div class="timeline-desc">Los documentos fueron revisados y validados - [FECHA_VALIDACION]</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot current"></div>
                        <div class="timeline-title">En Proceso de Revisión</div>
                        <div class="timeline-desc">Actualmente: [ETAPA_ACTUAL] - Estimado: [TIEMPO_ESTIMADO] días adicionales</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot pending"></div>
                        <div class="timeline-title">Revisión Final</div>
                        <div class="timeline-desc">Verificación final y preparación de respuesta</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot pending"></div>
                        <div class="timeline-title">Respuesta Final</div>
                        <div class="timeline-desc">Notificación con la resolución de su solicitud</div>
                    </div>
                </div>
            </div>
            
            <!-- Próximos Pasos -->
            <div class="section">
                <div class="section-title">🚀 PRÓXIMOS PASOS</div>
                <div class="next-steps">
                    <ul style="margin: 0; padding-left: 20px; color: #0369a1;">
                        <li style="margin-bottom: 8px;"><strong>Revisión técnica:</strong> [DESCRIPCION_REVISION_TECNICA]</li>
                        <li style="margin-bottom: 8px;"><strong>Tiempo estimado:</strong> [TIEMPO_ESTIMADO] días hábiles adicionales</li>
                        <li style="margin-bottom: 8px;"><strong>Próxima actualización:</strong> [FECHA_PROXIMA_ACTUALIZACION]</li>
                    </ul>
                </div>
            </div>
            
            <!-- Información Importante -->
            <div class="info-box">
                <h4 style="margin: 0 0 10px 0; color: #a16207;">⚠️ INFORMACIÓN IMPORTANTE</h4>
                <ul style="margin: 0; padding-left: 20px; color: #a16207;">
                    <li>No es necesario contactarnos a menos que tenga información adicional que proporcionar</li>
                    <li>Recibirá actualizaciones automáticas sobre cualquier cambio en el estado</li>
                    <li>Puede consultar el estado actualizado en tiempo real en nuestro portal web</li>
                    <li>Si necesita agregar documentación, utilice el número de solicitud: <strong>[NUMERO_SOLICITUD]</strong></li>
                </ul>
            </div>
            
            <!-- Datos de Contacto -->
            <div class="section">
                <div class="section-title">📞 DATOS DE CONTACTO</div>
                <div class="contact-info">
                    <div class="contact-item"><strong>Responsable:</strong> [NOMBRE_RESPONSABLE]</div>
                    <div class="contact-item"><strong>Teléfono directo:</strong> [TELEFONO_DIRECTO]</div>
                    <div class="contact-item"><strong>Email:</strong> [EMAIL_RESPONSABLE]</div>
                    <div class="contact-item"><strong>Horario de atención:</strong> [HORARIO_ATENCION]</div>
                </div>
            </div>
            
            <p style="color: #475569; line-height: 1.6; margin-top: 30px;">
                Agradecemos su paciencia mientras procesamos su solicitud. Nos comprometemos a mantenerle informado durante todo el proceso.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #64748b;">Atentamente,</p>
                <p style="margin: 5px 0 0 0; font-weight: 600; color: #1e293b;">[NOMBRE_RESPONSABLE]</p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">[CARGO_RESPONSABLE]</p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">[DEPARTAMENTO]</p>
            </div>
            
            <div class="note">
                <strong>NOTA:</strong> Este es un mensaje automático de actualización. Para consultas específicas, utilice los datos de contacto proporcionados.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                [NOMBRE_INSTITUCION]<br>
                [DIRECCION]<br>
                [TELEFONO] | [EMAIL_INSTITUCIONAL]<br>
                Portal web: [URL_PORTAL]
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Plantillas de Correo
        </h1>
        <p className="text-lg text-slate-600">
          Plantillas profesionales para comunicación con usuarios
        </p>
      </div>

      <div className="grid gap-6">
        {/* Plantilla de Confirmación de Recepción */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Confirmación de Recepción de Solicitud
                </CardTitle>
                <CardDescription>
                  Plantilla profesional HTML para confirmar la recepción de solicitudes
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">HTML</Badge>
                <Badge className="bg-green-500">Profesional</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Vista previa */}
              <div className="bg-slate-50 p-6 rounded-lg border-2 border-dashed border-slate-300">
                <div className="text-sm text-slate-600 mb-3 font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Vista previa del diseño:
                </div>
                <div className="bg-white rounded-lg border shadow-lg max-h-96 overflow-y-auto">
                  <div 
                    dangerouslySetInnerHTML={{ __html: plantillaConfirmacion }} 
                    className="email-preview"
                    style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%' }}
                  />
                </div>
              </div>

              {/* Características del diseño */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  ✨ Características del diseño:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Diseño responsivo para móviles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Colores corporativos profesionales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Iconos y emojis para mejor UX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Secciones bien organizadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>Compatible con todos los clientes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Tipografía legible y moderna</span>
                  </div>
                </div>
              </div>

              {/* Variables disponibles */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Variables dinámicas disponibles:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NOMBRE_SOLICITANTE]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NUMERO_SOLICITUD]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[FECHA_RECEPCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[TIPO_SOLICITUD]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[TIEMPO_RESPUESTA]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[TELEFONO_CONTACTO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[EMAIL_CONTACTO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[HORARIO_ATENCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NOMBRE_FUNCIONARIO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[CARGO]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[NOMBRE_INSTITUCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[DIRECCION]</code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">[EMAIL_INSTITUCIONAL]</code>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button 
                  onClick={() => copyToClipboard(plantillaConfirmacion)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Copy className="w-4 h-4" />
                  Copiar HTML
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Función de previsualización en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Vista Completa
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Función de descarga en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar HTML
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => toast.info("Función de envío en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Prueba
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plantilla de Solicitud en Proceso */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                    <span className="text-white text-xs">⚙️</span>
                  </div>
                  Solicitud en Proceso
                </CardTitle>
                <CardDescription>
                  Plantilla para notificar el progreso y estado actual de solicitudes en proceso
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">HTML</Badge>
                <Badge className="bg-green-500">Profesional</Badge>
                <Badge className="bg-orange-500">Proceso</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Vista previa */}
              <div className="bg-slate-50 p-6 rounded-lg border-2 border-dashed border-slate-300">
                <div className="text-sm text-slate-600 mb-3 font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Vista previa del diseño:
                </div>
                <div className="bg-white rounded-lg border shadow-lg max-h-96 overflow-y-auto">
                  <div 
                    dangerouslySetInnerHTML={{ __html: plantillaProceso }} 
                    className="email-preview"
                    style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%' }}
                  />
                </div>
              </div>

              {/* Características del diseño */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  ✨ Características del diseño:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Esquema de colores verde para "en proceso"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Barra de progreso visual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Timeline interactivo del proceso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Estado actual destacado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>Información de contacto del responsable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Próximos pasos claramente definidos</span>
                  </div>
                </div>
              </div>

              {/* Variables disponibles */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Variables dinámicas disponibles:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[NOMBRE_SOLICITANTE]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[NUMERO_SOLICITUD]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[FECHA_RECEPCION]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[TIPO_SOLICITUD]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[FECHA_INICIO_PROCESO]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[NOMBRE_RESPONSABLE]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[PORCENTAJE_PROGRESO]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[FECHA_VALIDACION]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[ETAPA_ACTUAL]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[TIEMPO_ESTIMADO]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[FECHA_PROXIMA_ACTUALIZACION]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[DESCRIPCION_REVISION_TECNICA]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[TELEFONO_DIRECTO]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[EMAIL_RESPONSABLE]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[CARGO_RESPONSABLE]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[DEPARTAMENTO]</code>
                  <code className="bg-green-100 px-2 py-1 rounded text-green-800">[URL_PORTAL]</code>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button 
                  onClick={() => copyToClipboard(plantillaProceso)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Copy className="w-4 h-4" />
                  Copiar HTML
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Función de previsualización en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Vista Completa
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.info("Función de descarga en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar HTML
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => toast.info("Función de envío en desarrollo")}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Prueba
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card>
          <CardHeader>
            <CardTitle>Guía de Implementación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Estas plantillas son HTML completo listas para usar en sistemas de envío de correos</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Las variables entre corchetes [VARIABLE] deben ser reemplazadas dinámicamente</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Los diseños son responsivos y se adaptan automáticamente a dispositivos móviles</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Compatible con los principales clientes de correo (Gmail, Outlook, Apple Mail, etc.)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Incluye estilos CSS inline para máxima compatibilidad</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
