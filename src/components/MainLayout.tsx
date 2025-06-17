
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <AppSidebar />
        <main className="flex-1 relative">
          {/* Header con trigger del sidebar para mobile */}
          <header className="sticky top-0 z-40 bg-blue-800/20 backdrop-blur-xl border-b border-blue-400/20 p-4 md:hidden">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white hover:text-yellow-400 hover:bg-blue-800/30" />
              <h1 className="text-lg font-semibold text-white">Warp</h1>
            </div>
          </header>

          {/* Trigger del sidebar para desktop */}
          <div className="hidden md:block sticky top-4 left-4 z-40">
            <SidebarTrigger className="text-white hover:text-yellow-400 hover:bg-blue-800/30 shadow-lg" />
          </div>

          {/* Contenido principal */}
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
