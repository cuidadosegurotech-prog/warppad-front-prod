import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useKeycloak } from "@/context/KeycloakContext";

const API_URL = import.meta.env.VITE_CK_BACKEND_URL;

export function FeedbackButton() {
  const { toast } = useToast();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { token, authenticated, keycloak } = useKeycloak();

  const handleFeedbackSubmit = async() => {
    if (!feedbackForm.message.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu sugerencia o comentario",
        variant: "destructive",
      });
      return;
    }

    // Simulamos el envío de feedback
    toast({
      title: "¡Gracias por tu feedback!",
      description: "Tu sugerencia ha sido enviada correctamente. La revisaremos pronto.",
    });
    const resultado = await fetch(`${API_URL}/api/Feedback/Sugerencia`, { method : "POST" ,headers: { "Content-Type" : "Application/json", "Authorization" : `Brearer ${token}` }, body: JSON.stringify({ Feedback : feedbackForm.message, Correo: feedbackForm.email, Nombre: feedbackForm.name }) }).then(response => response.json()).then(data => data).catch(ex => console.error(`ERROR en envio de sugerencia() [ ${ex.name} - ${ex.message} ]`));
    // Limpiar formulario y cerrar modal
    setFeedbackForm({ name: "", email: "", message: "" });
    setFeedbackOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogTrigger asChild>
          <Button
            className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-800">
              Envíanos tu feedback
            </DialogTitle>
            <p className="text-sm text-slate-600 mt-2">
              Cuéntanos qué mejoras te gustaría ver en la aplicación
            </p>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-name" className="text-sm font-medium">
                Nombre (opcional)
              </Label>
              <Input
                id="feedback-name"
                placeholder="Tu nombre"
                value={feedbackForm.name}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-email" className="text-sm font-medium">
                Email (opcional)
              </Label>
              <Input
                id="feedback-email"
                type="email"
                placeholder="tu@email.com"
                value={feedbackForm.email}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback-message" className="text-sm font-medium">
                Sugerencia o mejora *
              </Label>
              <Textarea
                id="feedback-message"
                placeholder="Describe tu sugerencia o comentario..."
                className="min-h-[100px] resize-none"
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setFeedbackOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleFeedbackSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Enviar feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}