const Footer = () => {
  return (
    <div className="footer">
    <div className="footer justify-arount mx-auto flex w-full px-[450px] pt-9 pb-3 text-lg">
      <div className="columna1">
        <h3 className="pb-3 font-bold underline underline-offset-2">
          Menú
        </h3>
        <div className="flex">
          <img src="./public/Vector.svg" alt="icono" className="pb-3" />
          <ul className="pb-3 pl-2">Servicios</ul>
        </div>
        <div className="flex">
          <img src="./public/Vector.svg" alt="icono" className="pb-3" />
          <ul className="pb-3 pl-2">Sobre Nosotros</ul>
        </div>
        <div className="flex">
          <img src="./public/Vector.svg" alt="icono" className="pb-3" />
          <ul className="pb-3 pl-2">Contacto</ul>
        </div>
      </div>

      <div className="columna2 ps-[60px]">
        <h3 className="pb-3 font-bold underline underline-offset-2">
          Información legal
        </h3>
        <div className="flex pl-2">
          <img src="./public/Vector.svg" alt="icono" className="pb-3" />
          <ul className="pb-3 pl-2">Aviso legal</ul>
        </div>
        <div className="flex pl-2">
          <img src="./public/Vector.svg" alt="icono" className="pb-3" />
          <ul className="pb-3 pl-2">Política de privacidad</ul>
        </div>
        <div className="flex pl-2">
          <img src="./public/Vector.svg" alt="icono" className="pb-3" />
          <ul className="pb-3 pl-2">Términos y condiciones</ul>
        </div>
      </div>
      <div className="relative left-[650px] top-[50px]">
        <img
          src="./public/support_agent.svg"
          alt="Suport agent"
          className="rounded-full bg-[#F5ECD7] px-3 py-3 w-[70px] h-[70px]"
        />
      </div>
    </div>

    {/*redes*/}
    <div className="footer redes px-4 py-3">
      <div className="flex justify-center gap-10 px-8">
        <div>
          <img src="./public/Union.svg" alt="logo" className="w-[150px] h-[35px]" />
        </div>
        <div className="flex gap-2">
          <img src="./public/redes1.svg" alt="instagram" />
          <img src="./public/redes2.svg" alt="x" />
          <img src="./public/redes3.svg" alt="youtube" />
          <img src="./public/redes4.svg" alt="facebook" />
          <img src="./public/redes5.svg" alt="linkedin" />
        </div>
      </div>
      <div className="p-2 text-center text-sm">
        <div className="flex justify-center pt-3">
          <img src="./public/ph_copyright-bold.svg" alt="copyright" className="w-[20px]" />
          <p className="">2024 creado por GoEvent</p>
        </div>
        <p>-información adicional</p>
      </div>
    </div>
  </div>
  );
};

export default Footer;
