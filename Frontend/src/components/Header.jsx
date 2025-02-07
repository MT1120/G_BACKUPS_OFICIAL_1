// import React from 'react'
//import Logo from '../assets/LOGO.png'
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/logout");
  };
  return (
    <nav className=" bg-white w-screen h-[4.7rem]  ">
      <div className="flex flex-row w-[100vw] ">
        <div className="w-[85%] h-[4.7rem] ">
          <div className="w-full h-[4.7rem] flex items-center bg-gradient-to-r from-[#151980] from-20% via-[#1c21af] to-emerald-500 to-90% rounded-br-full ">
            <h2 className="flex w-full justify-center text-2xl font-bold   text-white ">
              Sistema de Gestión de Backups
            </h2>
          </div>
        </div>
        <div className="bg-white flex items-center w-[15%] h-[4.7rem] ">
          <div className=" w-full h-full flex justify-center items-center my-auto">
            <button
              className="justify-center py-3 px-6 bg-[#282c98] text-white   rounded-3xl hover:bg-[#1c21af] mx-auto tenor-sans-regular text-sm"
              onClick={handleNavigation}
            >
              Cerrar Sesión
            </button>
          </div>
          {/*screen-minus-1200*/}
        </div>
      </div>
    </nav>
  );
}
