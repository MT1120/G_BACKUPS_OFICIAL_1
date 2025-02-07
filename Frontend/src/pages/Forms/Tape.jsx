import { useState, useEffect } from "react";
import api from "../../api";
// import Header from "../../components/Header";
// import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";

export default function Tape() {
  const [description, setDescription] = useState("");
  const [tapeType, setTapeType] = useState("");
  const [consecutive, setConsecutive] = useState("");
  const [estatus, setEstatus] = useState("");
  const [used, setUsed] = useState("");
  const [used_at, setUsed_at] = useState(new Date());

  const [onCustody, setOnCustody] = useState("");

  const createTape = (e) => {
    e.preventDefault();
    api
      .post("/api/tapes/", {
        tapeType,
        consecutive,
        estatus,
        used,
        onCustody,
        description,
        used_at,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Creado con éxito");
        } else {
          alert("Error al crear la cinta");
        }
      })
      .catch((err) => alert(err));

    setDescription("");
    setTapeType("");
    setConsecutive("");
    setEstatus("");
    setUsed("");
    setOnCustody("");
    setUsed_at(new Date());
  };

  const [tapeTypes, setTapeTypes] = useState([]);

  const getTapeTypes = () => {
    api
      .get("/api/tapetypes/")
      .then((res) => res.data)
      .then((data) => {
        setTapeTypes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getTapeTypes();
  }, []);

  return (
    <form className="w-full h-full" onSubmit={createTape}>
      
      <div className="flex flex-col flex-1 w-full items-center justify-center">
        <div className="relative w-[90%] mt-10 mx-auto">
          <select
            name="select1"
            required
            value={tapeType}
            onChange={(e) => setTapeType(e.target.value)}
            className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="" disabled></option>
            {tapeTypes.map((Types) => (
              <option value={Types.id} key={Types.id}>
                {Types.name}
              </option>
            ))}
          </select>
          <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
            Elige un tipo de cinta
          </label>
        </div>
        <div className="relative w-[90%] mt-10 mx-auto">
          <input
            type="text"
            name="ConSTv"
            id="ConSTv"
            required
            value={consecutive}
            onChange={(e) => setConsecutive(e.target.value)}
            className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <label
            htmlFor="ConSTv"
            className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
          >
            Consecutivo
          </label>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full items-center justify-center ">
        <div className="relative w-[90%] mt-10 mx-auto">
          <select
            name="select1"
            value={estatus}
            required
            onChange={(e) => setEstatus(e.target.value)}
            className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="" disabled></option>
            <option value="nueva">Nueva</option>
            <option value="usada">Usada</option>
            <option value="dañada">Dañada</option>
          </select>
          <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
            Estado de la cinta
          </label>
        </div>
        <div className="relative w-[90%] mt-10 mx-auto">
          <select
            name="select1"
            value={used}
            required
            onChange={(e) => setUsed(e.target.value)}
            className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="" disabled></option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
          <label
            htmlFor="select1"
            className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
          >
            Dado de baja
          </label>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full items-center justify-center ">
        <div className="relative w-[90%] mt-10 mx-auto">
          <select
            name="select1"
            value={onCustody}
            required
            onChange={(e) => setOnCustody(e.target.value)}
            className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="" disabled></option>
            <option value="S">Si</option>
            <option value="N">No</option>
          </select>
          <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
            En custodia
          </label>
        </div>
        <div className="relative w-[90%] mt-11 mx-auto">
          <input
            type="date"
            id="used_at"
            value={used_at}
            required
            onChange={(e) => setUsed_at(e.target.value)}
            className={`block w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
          />
          <label
            htmlFor="used_at"
            className="absolute -top-3 left-0 px-2 py-1 mb-7 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase"
          >
            Fecha de creación
          </label>
        </div>
      </div>

      <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
        <label
          htmlFor="Observaciones"
          className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl uppercase"
        >
          Observaciones
        </label>
        <textarea
          name="Observaciones"
          id="Observaciones"
          className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className="w-full flex flex-col justify-center items-center mt-10">
          <input
            type="submit"
            value="Enviar Datos"
            className="w-[250px] p-4 bg-[#151980] rounded-xl text-white cursor-pointer "
          />
          <div className="w-full h-[20px]"></div>
        </div>
      </div>
    </form>
  );
}
