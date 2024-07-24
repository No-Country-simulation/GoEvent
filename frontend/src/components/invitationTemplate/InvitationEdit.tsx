import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Draggable from 'react-draggable';
import EditableDiv from './EditableDiv';
import TemplateSelector from './TemplateSelector';
import { Template } from '../../types';

interface Field {
  id: string;
  content: string;
  position: { x: number; y: number };
}

const InvitationEditor: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [fields, setFields] = useState<Field[]>([
    { id: 'title', content: 'Título de la Invitación', position: { x: 50, y: 50 } },
    { id: 'texto', content: 'Nombre del Usuario', position: { x: 50, y: 100 } },
  ]);
  const invitationRef = useRef<HTMLDivElement>(null);

  const downloadInvitation = () => {
    if (invitationRef.current) {
      htmlToImage.toPng(invitationRef.current)
        .then((dataUrl) => {
          download(dataUrl, 'invitation.png');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleContentChange = (id: string, content: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, content } : field));
  };

  const handleStop = (e: any, data: any, id: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, position: { x: data.x, y: data.y } } : field));
  };

  if (!selectedTemplate) {
    return <TemplateSelector onSelect={setSelectedTemplate} />;
  }

  return (
    <div className="flex">
      {/* Left side: Editable fields */}
      <div className="w-1/2 p-4">
        <h2 className="mb-4 text-xl font-bold">Editar Campos</h2>
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 font-bold">{field.id}</label>
            <input
              type="text"
              value={field.content}
              onChange={(e) => handleContentChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}
      </div>

      {/* Right side: Invitation preview */}
      <div className="w-1/2 p-4">
        <h2 className="mb-4 text-xl font-bold">Previsualización de la Invitación</h2>
        <div
          ref={invitationRef}
          className="relative border"
          style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
        >
          <img
            src={selectedTemplate.template_image}
            alt="Plantilla de Invitación"
            className="w-full h-full object-contain"
            style={{ maxHeight: '100%' }}
          />
          {fields.map((field) => (
            <Draggable
              key={field.id}
              defaultPosition={field.position}
              onStop={(e, data) => handleStop(e, data, field.id)}
            >
              <div
                style={{
                  position: 'absolute',
                  top: field.position.y,
                  left: field.position.x,
                  cursor: 'move',
                  transform: 'none',
                }}
              >
                <EditableDiv
                  value={field.content}
                  onChange={(value) => handleContentChange(field.id, value)}
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: '2em',
                    cursor: 'move',
                  }}
                />
              </div>
            </Draggable>
          ))}
        </div>
      </div>
      <button onClick={downloadInvitation} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Descargar Invitación</button>
    </div>
  );
};

export default InvitationEditor;
