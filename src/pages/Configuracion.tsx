
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, User, X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  jobTitle?: string;
  company?: string;
}

const roles = [
  { value: "admin", label: "Administrador" },
  { value: "user", label: "Usuario" },
  { value: "viewer", label: "Visualizador" },
];

const permissions = [
  { id: "create_requests", label: "Crear solicitudes" },
  { id: "edit_requests", label: "Editar solicitudes" },
  { id: "delete_requests", label: "Eliminar solicitudes" },
  { id: "view_all_requests", label: "Ver todas las solicitudes" },
  { id: "manage_users", label: "Gestionar usuarios" },
  { id: "view_reports", label: "Ver reportes" },
];

export default function Configuracion() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      permissions: ["create_requests", "edit_requests", "delete_requests", "view_all_requests", "manage_users", "view_reports"],
      jobTitle: "Administrador del Sistema",
      company: "Warp Inc."
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      permissions: ["create_requests", "edit_requests", "view_all_requests"],
      jobTitle: "Analista",
      company: "Tech Corp"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    jobTitle: "",
    company: "",
    role: "",
    permissions: [] as string[]
  });

  const handleCreateUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      jobTitle: formData.jobTitle,
      company: formData.company,
      role: formData.role,
      permissions: formData.permissions
    };
    setUsers([...users, newUser]);
    resetForm();
    setShowCreateForm(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      jobTitle: user.jobTitle || "",
      company: user.company || "",
      role: user.role,
      permissions: user.permissions
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    
    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { 
            ...user, 
            name: formData.name,
            email: formData.email,
            jobTitle: formData.jobTitle,
            company: formData.company,
            role: formData.role,
            permissions: formData.permissions
          }
        : user
    ));
    setEditingUser(null);
    resetForm();
    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

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

  const resetForm = () => {
    setFormData({ 
      name: "", 
      email: "", 
      password: "", 
      jobTitle: "", 
      company: "", 
      role: "", 
      permissions: [] 
    });
  };

  const handleShowCreateForm = () => {
    resetForm();
    setShowCreateForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
          <p className="text-gray-600 mt-1">Gestiona usuarios y permisos del sistema</p>
        </div>
        
        {!showCreateForm && (
          <Button onClick={handleShowCreateForm} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Crear Usuario
          </Button>
        )}
      </div>

      {/* Formulario de Creación de Usuario */}
      {showCreateForm && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-800">Crear Nuevo Usuario</CardTitle>
                <CardDescription>
                  Completa la información del nuevo usuario y asigna sus permisos.
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
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
                    onClick={handleCreateUser} 
                    disabled={!formData.name || !formData.email || !formData.password || !formData.role}
                    className="flex-1"
                  >
                    Crear Usuario
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Usuarios del Sistema
          </CardTitle>
          <CardDescription>
            Lista de todos los usuarios registrados y sus permisos asignados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {(user.jobTitle || user.company) && (
                        <p className="text-sm text-gray-500">
                          {user.jobTitle && user.company ? `${user.jobTitle} en ${user.company}` : user.jobTitle || user.company}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          user.role === 'admin' ? 'bg-red-100 text-red-700' :
                          user.role === 'user' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {roles.find(r => r.value === user.role)?.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.permissions.length} permisos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog - mantener como modal para edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica la información del usuario y sus permisos.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nombre Completo</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-email">Correo Electrónico</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="edit-jobTitle">Cargo</Label>
                <Input
                  id="edit-jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="Cargo del usuario"
                />
              </div>

              <div>
                <Label htmlFor="edit-company">Empresa</Label>
                <Input
                  id="edit-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Empresa"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-role">Rol</Label>
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
                <Label>Permisos</Label>
                <div className="space-y-2 mt-2 max-h-40 overflow-y-auto border rounded-md p-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${permission.id}`}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                      />
                      <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateUser} disabled={!formData.name || !formData.email || !formData.role}>
              Actualizar Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
