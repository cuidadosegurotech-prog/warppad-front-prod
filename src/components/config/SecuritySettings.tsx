
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Shield, Lock, Key, AlertTriangle } from "lucide-react";

export function SecuritySettings() {
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    maxLoginAttempts: "5",
    sessionDuration: "480",
    requireStrongPassword: true,
    ipWhitelist: false,
    auditLog: true,
    encryptionLevel: "aes256",
    sslOnly: true,
    allowedIps: ""
  });

  const handleSave = () => {
    console.log("Guardando configuración de seguridad:", security);
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Autenticación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Autenticación
            </CardTitle>
            <CardDescription>
              Configuraciones de acceso y autenticación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Autenticación de Dos Factores</Label>
                <p className="text-sm text-gray-500">Requerir 2FA para todos los usuarios</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={security.twoFactorAuth}
                onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
              />
            </div>

            <div>
              <Label htmlFor="maxLoginAttempts">Máximo Intentos de Login</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={security.maxLoginAttempts}
                onChange={(e) => setSecurity({ ...security, maxLoginAttempts: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="sessionDuration">Duración de Sesión (minutos)</Label>
              <Input
                id="sessionDuration"
                type="number"
                value={security.sessionDuration}
                onChange={(e) => setSecurity({ ...security, sessionDuration: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireStrongPassword">Contraseñas Fuertes</Label>
                <p className="text-sm text-gray-500">Requerir contraseñas complejas</p>
              </div>
              <Switch
                id="requireStrongPassword"
                checked={security.requireStrongPassword}
                onCheckedChange={(checked) => setSecurity({ ...security, requireStrongPassword: checked })}
              />
            </div>

            <div>
              <Label htmlFor="passwordExpiry">Expiración de Contraseña (días)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={security.passwordExpiry}
                onChange={(e) => setSecurity({ ...security, passwordExpiry: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad de Red */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Seguridad de Red
            </CardTitle>
            <CardDescription>
              Configuraciones de red y acceso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sslOnly">Solo HTTPS</Label>
                <p className="text-sm text-gray-500">Forzar conexiones seguras</p>
              </div>
              <Switch
                id="sslOnly"
                checked={security.sslOnly}
                onCheckedChange={(checked) => setSecurity({ ...security, sslOnly: checked })}
              />
            </div>

            <div>
              <Label htmlFor="encryptionLevel">Nivel de Encriptación</Label>
              <Select value={security.encryptionLevel} onValueChange={(value) => setSecurity({ ...security, encryptionLevel: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes128">AES-128</SelectItem>
                  <SelectItem value="aes256">AES-256</SelectItem>
                  <SelectItem value="rsa2048">RSA-2048</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ipWhitelist">Lista Blanca de IPs</Label>
                <p className="text-sm text-gray-500">Restringir acceso por IP</p>
              </div>
              <Switch
                id="ipWhitelist"
                checked={security.ipWhitelist}
                onCheckedChange={(checked) => setSecurity({ ...security, ipWhitelist: checked })}
              />
            </div>

            {security.ipWhitelist && (
              <div>
                <Label htmlFor="allowedIps">IPs Permitidas</Label>
                <Input
                  id="allowedIps"
                  value={security.allowedIps}
                  onChange={(e) => setSecurity({ ...security, allowedIps: e.target.value })}
                  placeholder="192.168.1.1, 10.0.0.1"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auditLog">Log de Auditoría</Label>
                <p className="text-sm text-gray-500">Registrar todas las acciones</p>
              </div>
              <Switch
                id="auditLog"
                checked={security.auditLog}
                onCheckedChange={(checked) => setSecurity({ ...security, auditLog: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advertencia de Seguridad */}
      <Card className="border-yellow-200 bg-yellow-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="w-5 h-5" />
            Advertencia de Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            Los cambios en la configuración de seguridad pueden afectar el acceso de los usuarios existentes. 
            Asegúrate de comunicar cualquier cambio importante a tu equipo antes de aplicarlo.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
