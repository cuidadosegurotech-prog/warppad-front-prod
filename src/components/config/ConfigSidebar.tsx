
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
      <div className="fixed top-4 left-4 z-40 w-16 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-xl shadow-lg flex flex-col items-center py-4 space-y-2 max-h-[calc(100vh-2rem)]">
        <ScrollArea className="flex-1 w-full h-full">
          <div className="flex flex-col items-center space-y-2 px-2">
            {categories.flatMap(category => 
              category.sections.map(section => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-10 h-10 p-0 rounded-lg hover:bg-blue-50 transition-all duration-200",
                    activeSection === section.id && "bg-blue-100 text-blue-700 shadow-sm border border-blue-200/50"
                  )}
                  onClick={() => onSectionChange(section.id)}
                  title={section.label}
                >
                  <section.icon className="w-5 h-5" />
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-40 w-72 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-xl shadow-lg flex flex-col max-h-[calc(100vh-2rem)]">
      <div className="p-4 border-b border-gray-200/60 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-800">Configuración</h2>
        <p className="text-sm text-gray-600 mt-1">
          Administra tu sistema
        </p>
      </div>
      
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-3 space-y-3">
          {categories.map((category, categoryIndex) => (
            <div key={category.id}>
              <Button
                variant="ghost"
                className="w-full justify-between p-3 h-auto font-medium text-gray-700 hover:bg-gray-50/80 rounded-lg transition-all duration-200"
                onClick={() => toggleCategory(category.id)}
              >
                <span className="text-sm font-medium">{category.label}</span>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </Button>
              
              {expandedCategories.includes(category.id) && (
                <div className="ml-2 mt-2 space-y-1">
                  {category.sections.map((section) => (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start p-3 h-auto text-left hover:bg-gray-50/80 rounded-lg transition-all duration-200 group",
                        activeSection === section.id && "bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-sm border border-blue-200/50"
                      )}
                      onClick={() => onSectionChange(section.id)}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-200 group-hover:bg-blue-100",
                        activeSection === section.id && "bg-blue-100"
                      )}>
                        <section.icon className="w-4 h-4" />
                      </div>
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
                <Separator className="mt-3 bg-gray-200/60" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
