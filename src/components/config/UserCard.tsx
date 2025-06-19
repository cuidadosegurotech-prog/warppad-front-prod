
import { Button } from "@/components/ui/button";
import { Edit, Trash2, User } from "lucide-react";

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

interface UserCardProps {
  user: User;
  roles: Role[];
  onEdit: () => void;
  onDelete: () => void;
}

export function UserCard({ user, roles, onEdit, onDelete }: UserCardProps) {
  const getRoleLabel = (roleValue: string) => {
    return roles.find(r => r.value === roleValue)?.label || roleValue;
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            {(user.jobTitle || user.company) && (
              <p className="text-sm text-gray-500 truncate">
                {user.jobTitle && user.company ? `${user.jobTitle} en ${user.company}` : user.jobTitle || user.company}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                user.role === 'admin' ? 'bg-red-100 text-red-700' :
                user.role === 'user' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {getRoleLabel(user.role)}
              </span>
              <span className="text-xs text-gray-500">
                {user.permissions.length} permisos
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="hover:bg-blue-50"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
