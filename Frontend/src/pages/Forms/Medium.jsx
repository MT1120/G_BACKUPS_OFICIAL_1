import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useState } from "react";
import Tape from "./Tape";
import Cloud from "./Cloud";

export default function Medium() {
  const [medium, setMedium] = useState("");
  return (
    <div className="bg-white w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="flex-1 overflow-y-auto items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center relative ">
          <form className="w-full h-full " action="">
            <div className="mb-1 w-full h-20  bg-[#151980] flex items-center ">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto uppercase ml-7">
                Formulario de Medios
              </h1>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="cloud"
                  required
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>

                  <option value="Cinta">Cinta</option>
                  <option value="Nube">Nube</option>
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Elige un Medio
                </label>
              </div>
            </div>
          </form>
          <div className="w-full h-full overflow-y-auto">
            {medium === "Cinta" ? (
              <div className="w-full h-auto">
                <Tape></Tape>
              </div>
            ) : (
              <div className=" w-full h-auto">
                <Cloud></Cloud>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
