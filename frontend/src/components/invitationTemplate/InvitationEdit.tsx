import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedTemplateAtom } from "../../context/atoms";
import { dateFormat } from "../../utils";
import { selectedEventAtom } from "../../context/atoms";
import { updateEventImage } from "../../services";

const InvitationEditor: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom);
  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(24);
  const invitationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [event, setEvent] = useAtom(selectedEventAtom);
  if (!event) {
    navigate(-1);
  }
  const [description, setDescription] = useState(event?.description);

  const [name, setName] = useState(event?.name);
  const dateFormatView = dateFormat(event?.date);
  const [date, setDate] = useState(dateFormatView);
  const [time, setTime] = useState(event?.time);
  const [eventLocation, setEventLocation] = useState(event?.location);

  const downloadInvitation = () => {
    if (invitationRef.current) {
      htmlToImage
        .toPng(invitationRef.current)
        .then((dataUrl) => {
          download(dataUrl, "invitation.png");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleContinue = async () => {
    if (invitationRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(invitationRef.current);

        // Verifica que dataUrl tenga datos válidos
        if (!dataUrl) {
          console.error("No se generó la imagen correctamente.");
          return;
        }

        // Convierte dataUrl a Blob y luego a File
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const file = new File([blob], "invitation.png", { type: "image/png" });

        // Prepare FormData
        const formData = new FormData();
        formData.append("id", event?.id || "");
        formData.append("template_image", file);

        // Call the API
        await updateEventImage(formData);

        //navigate(`/evento/${event.id}`); // O la ruta a la que deseas navegar
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleTemplateSelection = () => {
    navigate("/template-selector");
  };

  const handleGoBack = () => {
    navigate(-1); // Regresar a la página anterior
  };

  if (!selectedTemplate) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="mb-8 text-2xl font-bold">
          Selecciona una plantilla para comenzar
        </h1>
        <button
          onClick={handleTemplateSelection}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Seleccionar Plantilla
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-8 text-2xl font-bold">Personaliza tu invitación</h1>
      <div className="flex w-full max-w-4xl space-y-8 md:space-x-8 md:space-y-0">
        {/* Lado izquierdo: opciones de edición */}
        <div className="w-1/2 rounded-md border bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Editar texto</h2>
          <div className="mb-4">
            <label className="mb-2 block font-bold">Nombre del evento</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold">Descripcion</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="mb-2 block font-bold">Fecha</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="mb-2 block font-bold">Hora</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold">Ubicación</label>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/3">
              <label className="mb-2 block font-bold">Fuente</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full rounded border px-3 py-2"
              >
                {[
                  "Arial",
                  "Times New Roman",
                  "Cambay",
                  "Georgia",
                  "Verdana",
                  "Tahoma",
                  "Courier New",
                  "Trebuchet MS",
                  "Lucida Console",
                  "Palatino Linotype",
                  "Comic Sans MS",
                ].map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label className="mb-2 block font-bold">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-full rounded border"
              />
            </div>
            <div className="w-1/3">
              <label className="mb-2 block font-bold">Tamaño</label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleGoBack}
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              Atrás
            </button>
            <button
              onClick={handleContinue}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Continuar
            </button>
            <button
              onClick={downloadInvitation}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Descargar Invitación
            </button>
          </div>
        </div>

        {/* Lado derecho: previsualización de la invitación */}
        <div className="w-1/2 rounded-md border bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-bold">
            Previsualización de la Invitación
          </h2>
          <div
            ref={invitationRef}
            className="relative border"
            style={{
              width: "100%",
              height: "auto",
              overflow: "hidden",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <img
              src={selectedTemplate.template_image}
              alt="Plantilla de Invitación"
              className="h-full w-full object-contain"
            />
            <div
              style={{
                position: "absolute",
                top: "50px", // Ajustar según la posición deseada
                left: "50%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              {name}
            </div>
            <div
              style={{
                position: "absolute",
                top: "150px", // Ajustar según la posición deseada
                left: "50%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              {description}
            </div>
            <div
              style={{
                position: "absolute",
                top: "330px", // Ajustar según la posición deseada
                left: "30%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              Fecha:
            </div>
            <div
              style={{
                position: "absolute",
                top: "360px", // Ajustar según la posición deseada
                left: "30%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              {date}
            </div>
            <div
              style={{
                position: "absolute",
                top: "330px", // Ajustar según la posición deseada
                left: "75%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              Hora:
            </div>
            <div
              style={{
                position: "absolute",
                top: "360px", // Ajustar según la posición deseada
                left: "75%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              {time}
            </div>
            <div
              style={{
                position: "absolute",
                top: "420px", // Ajustar según la posición deseada
                left: "50%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              Ubicacion:
            </div>
            <div
              style={{
                position: "absolute",
                top: "460px", // Ajustar según la posición deseada
                left: "50%",
                transform: "translateX(-50%)",
                color: color,
                fontFamily: font,
                fontSize: `${fontSize}px`,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0)", // Fondo semitransparente para mejor visibilidad
                padding: "5px", // Padding para mejor usabilidad
              }}
            >
              {eventLocation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationEditor;
