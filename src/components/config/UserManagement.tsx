
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, User, X, Search } from "lucide-react";
import { UserCard } from "./UserCard";
import { UserForm } from "./UserForm";

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

export function UserManagement() {
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setUsers([...users, newUser]);
    setShowCreateForm(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = (userData: Omit<User, 'id'>) => {
    if (!editingUser) return;
    
    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...userData }
        : user
    ));
    setEditingUser(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Crear Usuario
        </Button>
      </div>

      {/* Formulario de Creación */}
      {showCreateForm && (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowCreateForm(false)}
          title="Crear Nuevo Usuario"
          submitLabel="Crear Usuario"
          roles={roles}
          permissions={permissions}
        />
      )}

      {/* Lista de Usuarios */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Usuarios ({filteredUsers.length})
          </h3>
        </div>
        
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              roles={roles}
              onEdit={() => handleEditUser(user)}
              onDelete={() => handleDeleteUser(user.id)}
            />
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No se encontraron usuarios" : "No hay usuarios registrados"}
            </div>
          )}
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica la información del usuario y sus permisos.
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <UserForm
              initialData={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setIsEditDialogOpen(false)}
              submitLabel="Actualizar Usuario"
              roles={roles}
              permissions={permissions}
              isDialog={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
