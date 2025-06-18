
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AppSidebar />
        <main className="flex-1 relative">
          {/* Header con trigger del sidebar para mobile */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 p-4 md:hidden">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-600 hover:text-blue-600 hover:bg-blue-50" />
              <h1 className="text-lg font-semibold text-slate-800">Hub</h1>
            </div>
          </header>

          {/* Trigger del sidebar para desktop */}
          <div className="hidden md:block sticky top-4 left-4 z-40">
            <SidebarTrigger className="text-slate-600 hover:text-blue-600 hover:bg-white/50 shadow-lg backdrop-blur-sm rounded-lg border border-slate-200/50" />
          </div>

          {/* Contenido principal */}
          <div className="p-4 md:p-6 lg:p-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg min-h-[calc(100vh-8rem)]">
              <div className="p-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
