
export interface PlantillaCorreo {
  id: string;
  titulo: string;
  asunto: string;
  contenido: string;
  tipo: "confirmacion" | "proceso" | "completada";
  variables: string[];
}
