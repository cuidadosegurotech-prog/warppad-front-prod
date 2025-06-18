
import LoginForm from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FCD34D%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 animate-pulse"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-2xl mb-4 shadow-2xl">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="https://branzontech.com/wp-content/uploads/2025/06/ChatGPT-Image-18-jun-2025-10_17_52.webp" 
                  alt="Hub Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent mb-2">
              Hub
            </h1>
            <p className="text-blue-200 text-sm">
              Tu plataforma de automatizaciones inteligentes
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <div className="text-center mt-8 text-blue-300 text-sm">
            <p>¿No tienes cuenta? <span className="text-yellow-400 cursor-pointer hover:text-yellow-300 transition-colors">Crear cuenta</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
