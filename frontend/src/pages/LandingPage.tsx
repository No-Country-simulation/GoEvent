import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import UserMenu from "../components/home/UserMenu";
import ImageGallery from "react-image-gallery";
const imagenes = [
  { original: "./img1.png", alt: "imagen1" },
  { original: "./img2.png", alt: "imagen2" },
  { original: "./img3.png", alt: "imagen3" },
  { original: "./img4.png", alt: "imagen4" },
  { original: "./img5.png", alt: "imagen5" },
  { original: "./img6.png", alt: "imagen6" },
];

const LandingPage = () => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  return (
    <div className="fondo">
      <Navbar openMenu={setIsOpenUserMenu} />
      {!isOpenUserMenu ? (
        <div className="mx-auto font-gotic sm:w-[400px] md:w-[700px] lg:w-[900px] xl:w-[1100px]">
          {/*Grid*/}
          <div className="hidden gap-6 pb-14 pt-7 md:grid md:grid-cols-2 xl:grid-cols-3">
            {imagenes.map((e, i) => {
              return (
                <img
                  key={i}
                  src={e.original}
                  alt={e.alt}
                  className="imgStyle"
                />
              );
            })}
          </div>
          {/*Carrousel*/}
          <div className="carousel mx-auto my-8 h-[221px] w-[344px] bg-[#F5EEED] p-0 md:hidden">
            <ImageGallery
              items={imagenes}
              showPlayButton={true}
              showFullscreenButton={false}
              showBullets={true}
              autoPlay={true}
              slideInterval={5500}
            />
          </div>
          Como funciona GoEvent
          <div className="mb-10 w-full rounded-xl border-none bg-gradient-to-r from-[#EBE2CD] to-[#EB9C64] px-6 shadow-md shadow-gray-500 sm:h-[900px] md:h-[660px] lg:h-[550px] xl:h-[455px]">
            <h2 className="ps-[72px] pt-7 text-2xl font-medium">
              Cómo funciona GoEvent?
            </h2>
            <p className="pt-[34px] text-xl sm:ps-8 md:ps-[168px]">
              Selecciona el tipo de evento que vas a realizar
            </p>
            <p className="pt-[34px] text-xl sm:ps-8 md:ps-[245px]">
              Elije entre nuestras plantillas de invitaciones o sube la tuya
            </p>
            <p className="pt-[34px] text-xl sm:ps-8 md:ps-[290px]">
              Carga tu lista de invitados o escribelos desde la web
            </p>
            <p className="pt-[34px] text-xl sm:ps-8 md:ps-[336px]">
              Comparte tu invitación con facilidad, enviales el qr para acceder
              el día del evento
            </p>
            <p className="pt-[34px] text-xl sm:ps-8 md:ps-[429px]">
              Recibe confirmación de asistencia y gestiona tu evento desde la
              web
            </p>
            <p className="pt-[34px] text-2xl font-medium sm:ps-8 md:ps-[450px] lg:ps-[624px]">
              ¡Organiza fácilmente tu evento!
            </p>

            <img
              src="./Character.png"
              alt="character"
              className="relative left-[2px] z-30 sm:top-[-40px] md:top-[-350px] lg:top-[-300px]"
            />
          </div>
          <h3 className="px-6 pb-[53px] pt-5 text-center text-3xl">
            Elegí el plan que mejor se adapte a tus necesidades
          </h3>
          {/*Planes*/}
          <div className="h-fit-content sm: flex flex-col justify-center gap-12 pb-12 sm:flex-row sm:flex-col lg:flex-row">
            <div className="degradado2 h-fit-content mx-auto rounded-3xl border-0 shadow-md shadow-gray-500 sm:w-[380px] md:w-[550px]">
              <h3 className="font-weight:500 pl-[71px] pt-5 text-2xl text-[#0D1512]">
                Gratuito:
              </h3>
              <div className="flex items-center ps-8 pt-10">
                <img
                  src="./Confetti.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="text-lg text-[#0D1512]">Máximo 50 invitaciones</p>
              </div>
              <div className="flex items-center ps-8 pt-10">
                <img
                  src="./Confetti.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  15 modelos distintos de plantillas para tus tarjetas
                </p>
              </div>
              <div className="flex items-center ps-8 pt-10">
                <img
                  src="./Confetti.png"
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

            <div className="degradado2 h-fit-content mx-auto rounded-3xl border-0 shadow-md shadow-gray-500 sm:w-[380px] md:w-[550px]">
              <h3 className="font-weight:500 pl-[71px] pt-5 text-2xl text-[#0D1512]">
                Membresía ($2 por mes):
              </h3>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Sin límite de eventos por mes
                </p>
              </div>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Sin limite de invitaciones
                </p>
              </div>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Base de datos para futuros eventos
                </p>
              </div>
              <div className="flex items-center ps-8 pt-8">
                <img
                  src="./Diamond.png"
                  className="h[50px] w-[50px] pr-4"
                  alt="confetti"
                />
                <p className="pr-8 text-lg text-[#0D1512]">
                  Mas de 20 modelos de plantillas o sube tus propias ideas
                </p>
              </div>
              <div className="flex justify-center pb-4 sm:pt-5">
                <button className="boton h-[48px] w-[186px] rounded-xl px-11 font-bold text-[#0D1512] underline decoration-1 hover:bg-orange-500">
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UserMenu closeMenu={setIsOpenUserMenu} />
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;
