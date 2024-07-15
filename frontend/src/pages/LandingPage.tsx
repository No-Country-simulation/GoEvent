import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

const LandingPage = () => {

  const images = [
    {
      original : "./public/img1.png",
    },
    {
      original : "./public/img2.png",
    },
    {
      original : "./public/img3.png",
    },
    {
      original : "./public/img4.png",
    },
    {
      original : "./public/img5.png",
    },
    {
      original : "./public/img6.png",
    }
    
  ]

  return (
    <div className="container bg-gradient-to-b from-[#88B4A8] via-[#F5EEED] to-[#88B4A8] pb-3">
      {/*Navbar*/}
      <div className="flex items-center justify-between w-[360px] h-[59px] mx-auto shadow-lg shadow-grey">
        <img src="./public/Menu.png" className="w-[25px] h-[25px] ml-7" alt="menu" />
        <img src="./public/Union.svg" className="w-[96px] h-[17px] ml-7" alt="logo" />
        <p className="text-xs mr-5 mt-1">Iniciar sesión</p>
      </div>

      {/*Carrousel*/}
      <div className="carousel bg-[#F5EEED] w-[344px] h-[221px] mx-auto p-0 mt-4">
        <ImageGallery 
        items={images}
        showPlayButton={true}
        showFullscreenButton={false}
        showBullets={true}
        autoPlay={true}
        slideInterval={5500}
        />
      </div>
      <h3 className="text-center pt-5 pb-3 px-6">Elegí el plan que mejor se adapte a tus necesidades</h3>
      
      {/*Contenedor de planes1*/}
      <div className="plan1 w-[328px] h-fit-content mx-auto border-0 rounded-3xl bg-gradient-to-b from-[#A5C3BA] via-[#A5C3BA] to-[#43534E] shadow-lg shadow-grey">
        <h3 className="font-weight:500 text-[#0D1512] pt-3 pl-3">Gratuito:</h3>
        <div className="flex items-center">
          <img src="./public/Confetti.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">Máximo 50 invitaciones</p>
        </div>
        <div className="flex items-center">
          <img src="./public/Confetti.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">15 modelos distintos de plantillas para tus tarjetas</p>
        </div>
        <div className="flex items-center">
          <img src="./public/Confetti.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">Podes crear hasta un evento mensual</p>
        </div>
        <div className="flex justify-center pb-3">
          <button className= "bg-gradient-to-b from-[#A5C3BA] via-[#F5EEED] to-[#C9D6D1] hover:bg-green-700 text-[#0D1512] font-bold underline decoration-1 py-3 px-11 rounded-full">  
          Registrarse
          </button>
        </div>
      </div>

       {/*Contenedor de planes2*/}
       <div className="plan1 w-[328px] h-fit-content mx-auto border-0 rounded-3xl bg-gradient-to-b from-[#A5C3BA] via-[#A5C3BA] to-[#43534E] shadow-lg shadow-grey my-4">
        <h3 className="font-weight:500 text-[#0D1512] pt-3 pl-3">Membresía ($2 por mes):</h3>
        <div className="flex items-center">
          <img src="./public/Diamond.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">Sin límite de eventos por mes</p>
        </div>
        <div className="flex items-center">
          <img src="./public/Diamond.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">Sin limite de invitaciones</p>
        </div>
        <div className="flex items-center">
          <img src="./public/Diamond.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">Base de datos para futuros eventos</p>
        </div>
        <div className="flex items-center">
          <img src="./public/Diamond.png" className="pl-2 pr-2 py-4" alt="confetti" />
          <p className="text-[#0D1512] text-sm pr-8">Mas de 20 modelos de plantillas o sube tus propias ideas</p>
        </div>
        <div className="flex justify-center pb-3">
          <button className= "bg-gradient-to-b from-[#A5C3BA] via-[#F5EEED] to-[#C9D6D1] hover:bg-green-700 text-[#0D1512] font-bold underline decoration-1 py-3 px-11 rounded-full">  
          Registrarse
          </button>
        </div>
      </div>
    </div>
    
  )
};

export default LandingPage;
