import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import UserMenu from "../components/home/UserMenu";
const imagenes = [
  { src: "./public/img1.png", alt: "imagen1" },
  { src: "./public/img2.png", alt: "imagen2" },
  { src: "./public/img3.png", alt: "imagen3" },
  { src: "./public/img4.png", alt: "imagen4" },
  { src: "./public/img5.png", alt: "imagen5" },
  { src: "./public/img6.png", alt: "imagen6" },
];

const LandingPage = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="fondo">
      <Navbar openMenu={setIsOpenMenu} />

      {isOpenMenu ? (
        <UserMenu closeMenu={setIsOpenMenu} />
      ) : (
        <div>
          {/*Grid*/}
          <div className="grid grid-cols-3 items-center justify-between gap-6 px-[400px] pb-14 pt-7 md:w-[344px] lg:w-full">
            {imagenes.map((e) => {
              return <img src={e.src} alt={e.alt} className="imgStyle" />;
            })}
          </div>

          {/*Como funciona GoEvent*/}
          <div className="via-yellow mx-auto mb-10 h-[455px] w-[1200px] rounded-xl border-none bg-gradient-to-r from-[#EBE2CD] to-[#EB9C64] shadow-md shadow-gray-500">
            <h2 className="ps-[72px] pt-7 text-2xl font-medium">
              Cómo funciona GoEvent?
            </h2>
            <p className="ps-[168px] pt-[34px] text-xl">
              Selecciona el tipo de evento que vas a realizar
            </p>
            <p className="ps-[245px] pt-[34px] text-xl">
              Elije entre nuestras plantillas de invitaciones o sube la tuya
            </p>
            <p className="ps-[290px] pt-[34px] text-xl">
              Carga tu lista de invitados o escribelos desde la web
            </p>
            <p className="ps-[336px] pt-[34px] text-xl">
              Comparte tu invitación con facilidad, enviales el qr para acceder
              el día del evento
            </p>
            <p className="ps-[429px] pt-[34px] text-xl">
              Recibe confirmación de asistencia y gestiona tu evento desde la
              web
            </p>
            <p className="ps-[624px] pt-[34px] text-2xl font-medium">
              ¡Organiza fácilmente tu evento!
            </p>

            <img
              src="./public/Character.svg"
              alt="character"
              className="relative left-[2px] top-[-168px] z-30"
            />
            <img
              src="./public/cellphone.svg"
              alt="cellphone"
              className="relative left-[116px] top-[-420px] z-20"
            />
            <img
              src="./public/freepik.svg"
              alt="freepik"
              className="relative left-[5px] top-[-680px] z-10 h-[215px] w-[318px]"
            />
          </div>

          <h3 className="px-6 pb-[53px] pt-5 text-center text-3xl">
            Elegí el plan que mejor se adapte a tus necesidades
          </h3>

          {/*Planes*/}
          <div className="flex justify-center gap-12 pb-12">
            <div className="degradado2 h-fit-content w-[552px] rounded-3xl border-0 shadow-md shadow-gray-500">
              <h3 className="font-weight:500 pl-[71px] pt-5 text-2xl text-[#0D1512]">
                Gratuito:
              </h3>
              <div className="flex items-center ps-8 pt-10">
                <img
                  src="./public/Confetti.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="text-lg text-[#0D1512]">Máximo 50 invitaciones</p>
              </div>
              <div className="flex items-center ps-8 pt-10">
                <img
                  src="./public/Confetti.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  15 modelos distintos de plantillas para tus tarjetas
                </p>
              </div>
              <div className="flex items-center ps-8 pt-10">
                <img
                  src="./public/Confetti.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Podes crear hasta un evento mensual
                </p>
              </div>
              <div className="flex justify-center pb-4 pt-[60px]">
                <button className="boton h-[48px] w-[186px] rounded-xl px-11 font-bold text-[#0D1512] underline decoration-1 hover:bg-orange-500">
                  Registrarse
                </button>
              </div>
            </div>

            <div className="degradado2 h-fit-content w-[552px] rounded-3xl border-0 shadow-md shadow-gray-500">
              <h3 className="font-weight:500 pl-[71px] pt-5 text-2xl text-[#0D1512]">
                Membresía ($2 por mes):
              </h3>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./public/Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Sin límite de eventos por mes
                </p>
              </div>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./public/Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Sin limite de invitaciones
                </p>
              </div>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./public/Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Base de datos para futuros eventos
                </p>
              </div>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./public/Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Mas de 20 modelos de plantillas o sube tus propias ideas
                </p>
              </div>
              <div className="flex justify-center pb-4">
                <button className="boton h-[48px] w-[186px] rounded-xl px-11 font-bold text-[#0D1512] underline decoration-1 hover:bg-orange-500">
                  Registrarse
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
