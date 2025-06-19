
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ConfigSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ConfigCategory {
  id: string;
  label: string;
  sections: ConfigSection[];
}

interface ConfigSidebarProps {
  categories: ConfigCategory[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  collapsed?: boolean;
}

export function ConfigSidebar({ 
  categories, 
  activeSection, 
  onSectionChange, 
  collapsed = false 
}: ConfigSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map(cat => cat.id)
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (collapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-2">
        {categories.flatMap(category => 
          category.sections.map(section => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              className={cn(
                "w-10 h-10 p-0",
                activeSection === section.id && "bg-blue-50 text-blue-700"
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <section.icon className="w-5 h-5" />
            </Button>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Configuración</h2>
        <p className="text-sm text-gray-600 mt-1">
          Administra tu sistema
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="mb-2">
              <Button
                variant="ghost"
                className="w-full justify-between p-2 h-auto font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => toggleCategory(category.id)}
              >
                <span className="text-sm">{category.label}</span>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              
              {expandedCategories.includes(category.id) && (
                <div className="ml-2 mt-1 space-y-1">
                  {category.sections.map((section) => (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start p-2 h-auto text-left hover:bg-gray-50",
                        activeSection === section.id && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      )}
                      onClick={() => onSectionChange(section.id)}
                    >
                      <section.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">
                          {section.label}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {section.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
              
              {categoryIndex < categories.length - 1 && (
                <Separator className="mt-2" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
