
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  jobTitle?: string;
  company?: string;
}

interface Role {
  value: string;
  label: string;
}

interface Permission {
  id: string;
  label: string;
}

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: Omit<User, 'id'>) => void;
  onCancel: () => void;
  title?: string;
  submitLabel: string;
  roles: Role[];
  permissions: Permission[];
  isDialog?: boolean;
}

export function UserForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  title, 
  submitLabel, 
  roles, 
  permissions,
  isDialog = false 
}: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    jobTitle: initialData?.jobTitle || "",
    company: initialData?.company || "",
    role: initialData?.role || "",
    permissions: initialData?.permissions || [] as string[]
  });

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const handleSubmit = () => {
    onSubmit({
      name: formData.name,
      email: formData.email,
      jobTitle: formData.jobTitle,
      company: formData.company,
      role: formData.role,
      permissions: formData.permissions
    });
  };

  const isValid = formData.name && formData.email && formData.role && (!isDialog || initialData || formData.password);

  const FormContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Información Personal */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Información Personal</h3>
        
        <div>
          <Label htmlFor="name">Nombre Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre completo del usuario"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Correo Electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="usuario@ejemplo.com"
          />
        </div>
        
        {!initialData && (
          <div>
            <Label htmlFor="password">Contraseña *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Contraseña temporal"
            />
          </div>
        )}

        <div>
          <Label htmlFor="jobTitle">Cargo</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            placeholder="Analista, Gerente, etc."
          />
        </div>

        <div>
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Nombre de la empresa"
          />
        </div>
      </div>

      {/* Configuración de Acceso */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Configuración de Acceso</h3>
        
        <div>
          <Label htmlFor="role">Rol del Sistema *</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Permisos del Usuario</Label>
          <div className="space-y-3 mt-3 max-h-48 overflow-y-auto border rounded-md p-3 bg-white">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-3">
                <Checkbox
                  id={permission.id}
                  checked={formData.permissions.includes(permission.id)}
                  onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                />
                <Label htmlFor={permission.id} className="text-sm font-normal">
                  {permission.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="flex-1"
          >
            {submitLabel}
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );

  if (isDialog) {
    return <FormContent />;
  }

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-blue-800">{title}</CardTitle>
            <CardDescription>
              Completa la información del usuario y asigna sus permisos.
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FormContent />
      </CardContent>
    </Card>
  );
}
