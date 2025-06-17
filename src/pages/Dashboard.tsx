
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
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-blue-200">
          Resumen de tus automatizaciones y solicitudes
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-6 hover:bg-blue-700/30 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300 mb-1">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-blue-300 ml-1">vs mes anterior</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-xl">
                <stat.icon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {[
              { action: "Nueva solicitud creada", time: "Hace 2 horas", status: "pending" },
              { action: "Solicitud #123 completada", time: "Hace 4 horas", status: "completed" },
              { action: "Automatización activada", time: "Hace 6 horas", status: "active" },
              { action: "Solicitud #119 en proceso", time: "Hace 8 horas", status: "processing" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <p className="text-blue-300 text-xs">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                  activity.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                  activity.status === 'processing' ? 'bg-blue-400/20 text-blue-400' :
                  'bg-cyan-400/20 text-cyan-400'
                }`}>
                  {activity.status === 'completed' ? 'Completado' :
                   activity.status === 'pending' ? 'Pendiente' :
                   activity.status === 'processing' ? 'Procesando' : 'Activo'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-blue-800/20 border border-blue-400/30 shadow-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 hover:from-yellow-500/30 hover:to-amber-500/30 border border-yellow-400/30 rounded-lg text-left transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-medium">Nueva Solicitud</p>
                  <p className="text-blue-300 text-sm">Crear una nueva automatización</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/30 rounded-lg text-left transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-medium">Ver Solicitudes</p>
                  <p className="text-blue-300 text-sm">Consultar estado de solicitudes</p>
                </div>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
