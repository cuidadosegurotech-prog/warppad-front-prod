
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { FeedbackButton } from "./FeedbackButton";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header global fijo con el SidebarTrigger - siempre visible y nunca se mueve */}
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 flex items-center gap-3 px-4">
          <SidebarTrigger className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors" />
          <h1 className="text-lg font-semibold text-slate-800">Hub</h1>
        </header>

        {/* Layout principal con sidebar y contenido */}
        <div className="flex pt-14 min-h-screen w-full">
          <AppSidebar />
          
          {/* Contenido principal - sin padding que interfiera con el sidebar */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full p-4 md:p-6 lg:p-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg min-h-[calc(100vh-8rem)]">
                <div className="p-6">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Botón de Feedback Flotante - Global para todas las páginas */}
        <FeedbackButton />
      </div>
    </SidebarProvider>
  );
}
