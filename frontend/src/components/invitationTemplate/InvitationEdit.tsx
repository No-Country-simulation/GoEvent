import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Draggable from 'react-draggable';
import EditableDiv from './editable';
import TemplateSelector from './TemplateSelector';
import { Template } from '../../types';

const InvitationEditor: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [title, setTitle] = useState('Título de la Invitación');
  const [text, setText] = useState('Texto de la invitación.');
  const [user, setUser] = useState('Nombre del Usuario');
  const [time, setTime] = useState('Hora del Evento');
  const [date, setDate] = useState('Fecha del Evento');
  const [location, setLocation] = useState('Ubicación del Evento');
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

  if (!selectedTemplate) {
    return <TemplateSelector onSelect={setSelectedTemplate} />;
  }

  return (
    <div>
      <h1>Previsualización de la Invitación</h1>
      <div id="template-container" ref={invitationRef} style={{ position: 'relative', display: 'inline-block' }}>
        <img src={selectedTemplate.imageUrl} alt="Plantilla de Invitación" style={{ width: '100%', height: 'auto' }} />
        <Draggable>
          <div>
            <EditableDiv
              value={title}
              onChange={setTitle}
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: '2em',
                width: '100%',
                cursor: 'move',
              }}
            />
          </div>
        </Draggable>
        {/* Repite para los otros campos como user, time, date, location, text */}
      </div>
      <button onClick={downloadInvitation}>Descargar Invitación</button>
    </div>
  );
};

export default InvitationEditor;
