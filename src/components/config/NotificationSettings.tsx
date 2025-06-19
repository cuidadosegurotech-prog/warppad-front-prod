
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Mail, Bell, MessageSquare } from "lucide-react";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    requestCreated: true,
    requestUpdated: true,
    requestCompleted: true,
    systemAlerts: true,
    marketingEmails: false,
    emailServer: "smtp.gmail.com",
    emailPort: "587",
    emailUser: "",
    emailPassword: ""
  });

  const handleSave = () => {
    console.log("Guardando configuración de notificaciones:", notifications);
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tipos de Notificación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Tipos de Notificación
            </CardTitle>
            <CardDescription>
              Configura cómo quieres recibir las notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                <p className="text-sm text-gray-500">Recibir notificaciones por correo</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications">Notificaciones Push</Label>
                <p className="text-sm text-gray-500">Notificaciones en el navegador</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">Notificaciones SMS</Label>
                <p className="text-sm text-gray-500">Mensajes de texto</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={notifications.smsNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Eventos de Notificación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Eventos de Notificación
            </CardTitle>
            <CardDescription>
              Selecciona qué eventos deseas que generen notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="requestCreated">Solicitud Creada</Label>
              <Switch
                id="requestCreated"
                checked={notifications.requestCreated}
                onCheckedChange={(checked) => setNotifications({ ...notifications, requestCreated: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requestUpdated">Solicitud Actualizada</Label>
              <Switch
                id="requestUpdated"
                checked={notifications.requestUpdated}
                onCheckedChange={(checked) => setNotifications({ ...notifications, requestUpdated: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requestCompleted">Solicitud Completada</Label>
              <Switch
                id="requestCompleted"
                checked={notifications.requestCompleted}
                onCheckedChange={(checked) => setNotifications({ ...notifications, requestCompleted: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="systemAlerts">Alertas del Sistema</Label>
              <Switch
                id="systemAlerts"
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="marketingEmails">Emails de Marketing</Label>
              <Switch
                id="marketingEmails"
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuración de Email */}
      {notifications.emailNotifications && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Configuración de Email
            </CardTitle>
            <CardDescription>
              Configura el servidor SMTP para envío de emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="emailServer">Servidor SMTP</Label>
                <Input
                  id="emailServer"
                  value={notifications.emailServer}
                  onChange={(e) => setNotifications({ ...notifications, emailServer: e.target.value })}
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div>
                <Label htmlFor="emailPort">Puerto</Label>
                <Input
                  id="emailPort"
                  value={notifications.emailPort}
                  onChange={(e) => setNotifications({ ...notifications, emailPort: e.target.value })}
                  placeholder="587"
                />
              </div>

              <div>
                <Label htmlFor="emailUser">Usuario</Label>
                <Input
                  id="emailUser"
                  type="email"
                  value={notifications.emailUser}
                  onChange={(e) => setNotifications({ ...notifications, emailUser: e.target.value })}
                  placeholder="usuario@gmail.com"
                />
              </div>

              <div>
                <Label htmlFor="emailPassword">Contraseña</Label>
                <Input
                  id="emailPassword"
                  type="password"
                  value={notifications.emailPassword}
                  onChange={(e) => setNotifications({ ...notifications, emailPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
