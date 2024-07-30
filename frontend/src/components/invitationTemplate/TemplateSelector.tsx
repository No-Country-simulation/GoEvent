import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Template } from "../../types";
import { getTemplates } from "../../services/templateService";
import { useAtom } from "jotai";
import { selectedTemplateAtom } from "../../context/atoms";
import Loading from "../Loading";

const TemplateSelector: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [, setSelectedTemplate] = useAtom(selectedTemplateAtom);

  useEffect(() => {
    const fetchTemplates = async () => {
      // try {
      //   const templates = await getTemplates();
      //   setTemplates(templates.data.templates);
      //   console.error("Error fetching templates:", error);
      // } finally {
      //   setLoading(false);
      // }

      // Si no estoy mal, no es necesario en uso de tryCatch porque
      // ya estamos manejando los errores dentro de la llamada, solo
      // tenemos que preguntar por templates.success

      const templates = await getTemplates();

      templates.success
        ? setTemplates(templates.data.templates)
        : console.error("Error fetching templates:", templates.error);

      setLoading(false);
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <Loading />;
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
              onClick={() => {
                setSelectedTemplate(template);
                navigate("/invitationEdit");
              }}
              className="h-auto w-full cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
