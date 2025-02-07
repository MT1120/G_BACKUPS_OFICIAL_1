import { useState, useEffect } from "react";
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";

export default function Backup() {
  const [tape, setTape] = useState("");
  const [element, setElement] = useState("");
  const [consecutive, setConsecutive] = useState("");
  const [tool, setTool] = useState("");
  //
  const [frecuency, setFrecuency] = useState("");
  const [security, setSecurity] = useState("");
  const [copyType, setCopyType] = useState("");
  //

  //
  const [status, setEstatus] = useState("");
  const [storage_size, setStorage_size] = useState("");
  const [storaget_at, setStoraget_at] = useState("");
  //
  const [description, setDescription] = useState("");
  //
  const [used_at, setUsed_at] = useState(new Date());

  //getInf
  const [tapes, setTapes] = useState([]);
  const [elements, setElements] = useState([]);
  const [frecuencies, setFrecuencies] = useState([]);

  //Cambios

  //Crear Backup

  const createBackup = (e) => {
    e.preventDefault();
    const data = {
      tape,
      element,
      consecutive,
      tool,
      frecuency,
      security,
      copyType,
      status,

      storage_size,
      storaget_at,
      description,
      used_at,
    };
    console.log("Data being sent to the backend:", data);

    api
      .post("/api/backups/", {
        tape,
        element,
        consecutive,
        tool,
        frecuency,
        security,
        copyType,
        status,

        storage_size,
        storaget_at,
        description,
        used_at,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Backup Creado");
        } else {
          alert("Error al crear el Backup");
        }
      })
      .catch((err) => alert(err));

    setTape("");
    setElement("");
    setConsecutive("");
    setTool("");
    setFrecuency("");
    setSecurity("");
    setCopyType("");
    setEstatus("");
    setStoraget_at(""), setStorage_size("");
    setDescription("");
    setUsed_at(new Date());
  };
  //Obtener elementos

  const getElements = () => {
    api
      .get("/api/element/")
      .then((res) => res.data)
      .then((data) => {
        setElements(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getElements();
  }, []);

  //obtener cintas

  const getTapes = () => {
    api
      .get("/api/tapes/")
      .then((res) => res.data)
      .then((data) => {
        setTapes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getTapes();
  }, []);

  // Obtener frecuencias

  const getFrecuencies = () => {
    api
      .get("/api/frecuency/")
      .then((res) => res.data)
      .then((data) => {
        setFrecuencies(data);
        console.log("data",data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getFrecuencies();
  }, []);

  return (
    <div className="bg-white w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center relative ">
          <form className="w-full h-full" onSubmit={createBackup}>
            <div className="mb-1 w-full h-20  bg-[#151980] flex items-center mt-1">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto uppercase ml-7">
                Formulario de Backups
              </h1>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select1"
                  required
                  value={tape}
                  onChange={(e) => setTape(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  {tapes.map((Tapes) => (
                    <option value={Tapes.id} key={Tapes.id}>
                      {Tapes.consecutive}
                    </option>
                  ))}
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Elige la cinta donde deseas realizar el backup
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select2"
                  required
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  {elements.map((Elements) => (
                    <option value={Elements.id} key={Elements.id}>
                      {Elements.elementType}
                    </option>
                  ))}
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Elige el elemento deseado
                </label>
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center ">
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
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="ConSTv"
                  id="ConSTv"
                  required
                  value={tool}
                  onChange={(e) => setTool(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="ConSTv"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                >
                  Herramienta
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select3"
                  required
                  value={frecuency}
                  onChange={(e) => setFrecuency(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  {frecuencies.map((Frecuencies) => (
                    <option value={Frecuencies.id} key={Frecuencies.id}>
                      {Frecuencies.value}
                    </option>
                  ))}
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Frecuencia
                </label>
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center ">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select4"
                  required
                  value={security}
                  onChange={(e) => setSecurity(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  <option value="Cifradas">Cifradas</option>
                  <option value="Cifrado">Cifrado</option>
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Seguridad
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select5"
                  required
                  value={copyType}
                  onChange={(e) => setCopyType(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  <option value="Completa">Completa</option>
                  <option value="Incremental">Incremental</option>
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Tipo de copia
                </label>
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center ">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select6"
                  value={status}
                  required
                  onChange={(e) => setEstatus(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  <option value="Completo">Completo</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Iniciado">Iniciado</option>
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Estado del backup
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="number"
                  name="storage"
                  id="storage"
                  required
                  value={storage_size}
                  onChange={(e) => setStorage_size(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="storage"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                >
                  Tamaño del backup
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="storage_at"
                  id="storage"
                  required
                  value={storaget_at}
                  onChange={(e) => setStoraget_at(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="storage_at"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                >
                  Almacenado en
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
            </div>
            <div className="w-full flex justify-center">
              <input
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white mt-10 mb-5 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
