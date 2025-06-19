
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Save, Globe, Clock, Database } from "lucide-react";

export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "Hub - Plataforma de Automatizaciones",
    timezone: "America/Bogota",
    language: "es",
    maintenanceMode: false,
    autoBackup: true,
    sessionTimeout: "60",
    maxFileSize: "10",
    apiRateLimit: "100"
  });

  const handleSave = () => {
    console.log("Guardando configuración del sistema:", settings);
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Configuración General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Configuración General
            </CardTitle>
            <CardDescription>
              Configuraciones básicas de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Nombre del Sitio</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Bogota">America/Bogotá</SelectItem>
                  <SelectItem value="America/Mexico_City">America/Ciudad de México</SelectItem>
                  <SelectItem value="America/New_York">America/Nueva York</SelectItem>
                  <SelectItem value="Europe/Madrid">Europa/Madrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance">Modo Mantenimiento</Label>
                <p className="text-sm text-gray-500">Desactiva el acceso público</p>
              </div>
              <Switch
                id="maintenance"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Sistema y Rendimiento
            </CardTitle>
            <CardDescription>
              Configuraciones técnicas y de rendimiento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="maxFileSize">Tamaño Máximo de Archivo (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="apiRateLimit">Límite de API (req/min)</Label>
              <Input
                id="apiRateLimit"
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => setSettings({ ...settings, apiRateLimit: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Respaldo Automático</Label>
                <p className="text-sm text-gray-500">Respaldo diario de datos</p>
              </div>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
