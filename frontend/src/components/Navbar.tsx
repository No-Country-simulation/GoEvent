const Navbar = () => {
      
  
    return (
        <div className="naranja mx-auto flex h-[91px] items-center justify-between shadow-md shadow-gray-500 w-full">
        <img
          src="./public/Menu.png"
          className="ml-7 h-[35px] w-[35px]"
          alt="menu"
        />
        <img
          src="./public/Union.svg"
          className="ml-7 h-[42px] w-[230px]"
          alt="logo"
        />
        <p className="mr-5 mt-1 text-sm">Iniciar sesión</p>
      </div>
    )

};
  
  export default Navbar;
  