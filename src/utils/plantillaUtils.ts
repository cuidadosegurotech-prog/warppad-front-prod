
import { CheckCircle, Clock, FileCheck, Mail } from "lucide-react";

export const getIconByType = (tipo: string) => {
  switch (tipo) {
    case "confirmacion":
      return CheckCircle;
    case "proceso":
      return Clock;
    case "completada":
      return FileCheck;
    default:
      return Mail;
  }
};

export const getBadgeColor = (tipo: string) => {
  switch (tipo) {
    case "confirmacion":
      return "bg-green-100 text-green-800";
    case "proceso":
      return "bg-orange-100 text-orange-800";
    case "completada":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
