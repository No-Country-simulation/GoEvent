import React from 'react';
import { Template } from '../../types';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const templates: Template[] = [
    { id: '1', imageUrl: 'url/to/template1.png' },
    { id: '2', imageUrl: 'url/to/template2.png' },
    // Agrega más plantillas según sea necesario
  ];

  return (
    <div>
      <h2>Selecciona una Plantilla</h2>
      <div>
        {templates.map((template) => (
          <img
            key={template.id}
            src={template.imageUrl}
            alt={`Plantilla ${template.id}`}
            onClick={() => onSelect(template)}
            style={{ cursor: 'pointer', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;

