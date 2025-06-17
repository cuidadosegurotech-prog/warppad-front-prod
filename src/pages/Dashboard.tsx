
import { Card } from "@/components/ui/card";
import { FileText, Plus, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Solicitudes",
      value: "24",
      icon: FileText,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Solicitudes Pendientes",
      value: "8",
      icon: Users,
      change: "-5%",
      changeType: "negative" as const,
    },
    {
      title: "Completadas Hoy",
      value: "6",
      icon: TrendingUp,
      change: "+18%",
      changeType: "positive" as const,
    },
    {
      title: "Nuevas Esta Semana",
      value: "12",
      icon: Plus,
      change: "+8%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600">
          Resumen de tus automatizaciones y solicitudes
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6 hover:bg-white/90 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-800">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">vs mes anterior</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {[
              { action: "Nueva solicitud creada", time: "Hace 2 horas", status: "pending" },
              { action: "Solicitud #123 completada", time: "Hace 4 horas", status: "completed" },
              { action: "Automatización activada", time: "Hace 6 horas", status: "active" },
              { action: "Solicitud #119 en proceso", time: "Hace 8 horas", status: "processing" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-slate-800 text-sm font-medium">{activity.action}</p>
                  <p className="text-slate-500 text-xs">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                  activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  activity.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                  'bg-cyan-100 text-cyan-700'
                }`}>
                  {activity.status === 'completed' ? 'Completado' :
                   activity.status === 'pending' ? 'Pendiente' :
                   activity.status === 'processing' ? 'Procesando' : 'Activo'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/50 rounded-lg text-left transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-slate-800 font-medium">Nueva Solicitud</p>
                  <p className="text-slate-600 text-sm">Crear una nueva automatización</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 border border-slate-200/50 rounded-lg text-left transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-slate-800 font-medium">Ver Solicitudes</p>
                  <p className="text-slate-600 text-sm">Consultar estado de solicitudes</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
