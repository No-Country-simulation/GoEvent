import React, { useEffect, useState } from "react";
import { Template } from "../../types";
import { getTemplates } from "../../services/templateService";

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates = await getTemplates();
        setTemplates(templates.data.templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Cargando plantillas...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center text-xl font-bold">
        Selecciona una Plantilla
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="overflow-hidden rounded-lg border shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <img
              src={template.template_image}
              alt={`Plantilla ${template.id}`}
              onClick={() => onSelect(template)}
              className="h-auto w-full cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;