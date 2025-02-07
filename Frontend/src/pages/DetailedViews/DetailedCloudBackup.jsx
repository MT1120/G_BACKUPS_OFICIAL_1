//import React from 'react'
//DetailedBackup
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useParams } from "react-router-dom";
import api from "../../api";
import { updateCloudBackups } from "../../api";
import toast, { Toaster } from "react-hot-toast";
import { getCloudBackups } from "../../api";
import { IoDocumentText } from "react-icons/io5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/LOGO.png";

export default function DetailedCloudBackup() {
  const { id } = useParams();
  const tableRef = useRef(null);

  const exportPDF = () => {
    const input = tableRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("l", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      const pageHeight = 210;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      while (imgHeight > pageHeight) {
        position = position - pageHeight;
        if (position < 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      }

      pdf.save("table.pdf");
    });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date
      ? new Date(dateString).toISOString().split("T")[0]
      : "";
    return formattedDate;
  }

  const [backups, setBakups] = useState([]);

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const res = await api.get("/api/cloudBackup/");
        console.log("Data from API:", res.data);
        const filteredBackups = res.data.filter(
          (backup) => backup.id === parseInt(id)
        );
        console.log("Filtered Tapes:", filteredBackups);
        setBakups(filteredBackups);
      } catch (err) {
        alert(err);
      }
    };

    fetchBackups();
  }, [id]);

  const [cloudName, setCloudName] = useState("");
  const [element_name, setElement_name] = useState("");
  const [frecuency_name, setFrecuency_name] = useState("");
  const [data, setData] = useState({
    tape: "",
    element: "",
    consecutive: "",
    tool: "",
    frecuency: "",
    
    copyType: "",
    status: "",
    storage_size: "",
    storaget_at: "",
    description: "",
    used_at: "new Date()",
  });

  useEffect(() => {
    async function loadBackup() {
      if (id) {
        const response = await getCloudBackups(id);
        console.log(response);
        const { data } = response;
        setCloudName(data.cloudName);
        setElement_name(data.element_name);
        setFrecuency_name(data.frecuency_name);
        const formattedDate = data.used_at
          ? new Date(data.used_at).toISOString().split("T")[0]
          : "";
        setData({
          cloud: data.cloud,
          element: data.element,
          consecutive: data.consecutive,
          tool: data.tool,
          frecuency: data.frecuency,
          
          copyType: data.copyType,
          status: data.status,
          storage_size: data.storage_size,
          storaget_at: data.storaget_at,
          description: data.description,
          used_at: formattedDate,
        });
      }
    }
    loadBackup();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCloudBackups(id, data);
      toast.success("Datos actualizados", {
        duration: 16000,
        position: "top-center",
        style: {
          background: "#151980",
          color: "#fff",
        },
      });
    }
  };

  //getInf
  const [clouds, setClouds] = useState([]);
  const [elements, setElements] = useState([]);
  const [frecuencies, setFrecuencies] = useState([]);

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

  const getClouds = () => {
    api
      .get("/api/clouds/")
      .then((res) => res.data)
      .then((data) => {
        setClouds(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getClouds();
  }, []);

  // Obtener frecuencias

  const getFrecuencies = () => {
    api
      .get("/api/frecuency/")
      .then((res) => res.data)
      .then((data) => {
        setFrecuencies(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getFrecuencies();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-[100%] w-[100%] flex flex-col  items-center rounded-xl  shadow-2xl relative ">
          <div className="bg-blue-800 w-full  h-[5rem] text-white flex flex-row  items-center">
            <div className="h-full w-1/2 flex justify-center items-center">
              <h1 className="text-xl text-center  mb-3">Backup</h1>
            </div>
            <div className="h-full w-1/2  flex justify-center items-center">
              <IoDocumentText
                className="h-6 w-6  justify-end cursor-pointer "
                onClick={exportPDF}
              />
            </div>
          </div>
          <div className="h-full w-full overflow-auto">
            {backups.map((item) => (
              <div key={item.id} className="min-w-full overflow-y-auto">
                <table
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-3"
                  ref={tableRef}
                >
                  <thead>
                    {/* Logo y Fechas */}
                    <tr className=" text-white text-center">
                      <th colSpan="7" className="py-4">
                        <img
                          src={Logo}
                          alt="logo"
                          className="h-[64px] w-[100px] mx-auto"
                        />
                      </th>
                    </tr>
                    <tr className="flex flex-col md:flex-row items-start text-black text-left ml-3 mb-2">
                      <th colSpan="7" className="py-2 w-full">
                        {/* Title */}
                        <div className="w-[300px] flex justify-start items-center mt-2">
                          <p className="font-semibold">
                            Gestión de copias de seguridad
                          </p>
                        </div>

                        {/* Subtitle */}
                        <div className="flex justify-start items-center mt-2">
                          <p>Reporte de cintas</p>
                        </div>

                        {/* Creation Date */}
                        <div className="flex flex-col md:flex-row justify-start items-center mt-3">
                          <span className="mr-2">Fecha de creación:</span>
                          <p>{formatDate(item.created_at)}</p>
                        </div>

                        {/* Registration Date */}
                        <div className="flex flex-col md:flex-row justify-start items-center mt-3">
                          <span className="mr-2">Fecha de registro:</span>
                          <p>{formatDate(item.used_at)}</p>
                        </div>
                      </th>
                    </tr>
                    <tr className="bg-blue-200 text-center">
                      <th className="px-4 py-3">Usuario</th>
                      <th className="px-4 py-3">Nube</th>
                      <th className="px-5 py-3">Elemento</th>
                      <th className="px-6 py-3">Consecutivo</th>
                      <th className="px-6 py-3">Herramienta</th>
                      <th className="px-4 py-3">Frecuencia</th>
                      
                      <th className="px-4 py-3">Tipo de copia</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3">Almacenado en</th>
                      <th className="px-4 py-3">Tamaño</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-center">
                        {item.author_name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.cloudName}
                      </td>
                      <td className="px-6 py-4 text-center">{element_name} </td>
                      <td className="px-6 py-4 text-center">
                        {item.consecutive}
                      </td>
                      <td className="px-6 py-4 text-center">{item.tool}</td>
                      <td className="px-6 py-4 text-center">
                        {item.frecuency_name}
                      </td>
                      
                      <td className="px-6 py-4 text-center">{item.copyType}</td>
                      <td className="px-6 py-4 text-center">{item.status}</td>
                      <td className="px-6 py-4 text-center">
                        {item.storaget_at}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.storage_size}
                      </td>

                      {/* <td className="px-6 py-4 font-semibold">{item.author}</td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

            <div className="bg-blue-800 w-full  h-[5rem] text-white flex items-center">
              <h1 className="text-xl text-center w-full mb-3 uppercase">
                Actualizar backup
              </h1>
            </div>
            <div className="w-full flex flex-col items-center justify-center  relative">
              <form className="w-full h-full" onSubmit={handleSubmit}>
                <div className="flex flex-col flex-1 w-full items-center justify-center">
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <select
                      name="tape"
                      required
                      value={data.tape}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled></option>
                      {clouds.map((Tapes) => (
                        <option value={Tapes.id} key={Tapes.id}>
                          {Tapes.cloud_name}
                        </option>
                      ))}
                    </select>
                    <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                      Elige la Nube ( Opción
                      seleccionada:
                      <span className="text-blue-800"> {cloudName}</span>)
                    </label>
                  </div>
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <select
                      name="element"
                      required
                      value={data.element}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled></option>
                      {elements.map((Elements) => (
                        <option value={Elements.id} key={Elements.id}>
                          {Elements.elementType}
                        </option>
                      ))}
                    </select>
                    <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                      Elige el elemento deseado ( Opción seleccionada:
                      <span className="text-blue-800"> {element_name}</span>)
                    </label>
                  </div>
                </div>
                <div className="flex flex-col flex-1 w-full items-center justify-center ">
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <input
                      type="text"
                      name="consecutive"
                      id="ConSTv"
                      required
                      value={data.consecutive}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <label
                      htmlFor="consecutive"
                      className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                    >
                      Consecutivo( Dato actual:
                      <span className="text-blue-800"> {data.consecutive}</span>
                      )
                    </label>
                  </div>
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <input
                      type="text"
                      name="tool"
                      id="ConSTv"
                      required
                      value={data.tool}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <label
                      htmlFor="consecutive"
                      className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                    >
                      Herramienta( Dato actual:
                      <span className="text-blue-800"> {data.tool}</span>)
                    </label>
                  </div>
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <select
                      name="frecuency"
                      required
                      value={data.frecuency}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled></option>
                      {frecuencies.map((Frecuencies) => (
                        <option value={Frecuencies.id} key={Frecuencies.id}>
                          {Frecuencies.value}
                        </option>
                      ))}
                    </select>
                    <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                      Elige la frecuencia ( Opción seleccionada:
                      <span className="text-blue-800"> {frecuency_name}</span>)
                    </label>
                  </div>
                </div>
                <div className="flex flex-col flex-1 w-full items-center justify-center ">
                  
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <select
                      name="copyType"
                      required
                      value={data.copyType}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled></option>
                      <option value="Completa">Completa</option>
                      <option value="Incremental">Incremental</option>
                    </select>
                    <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                      Tipo de copia( Dato actual:
                      <span className="text-blue-800"> {data.copyType}</span>)
                    </label>
                  </div>
                </div>
                <div className="flex flex-col flex-1 w-full items-center justify-center ">
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <select
                      name="status"
                      value={data.status}
                      required
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled></option>
                      <option value="Completo">Completo</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Iniciado">Iniciado</option>
                    </select>
                    <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                      Estado del backup ( Dato actual:
                      <span className="text-blue-800"> {data.status}</span>)
                    </label>
                  </div>
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <input
                      type="number"
                      name="storage_size"
                      id="storage"
                      required
                      value={data.storage_size}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <label
                      htmlFor="storage"
                      className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                    >
                      Tamaño del backup( Dato actual:
                      <span className="text-blue-800">
                        {" "}
                        {data.storage_size}
                      </span>
                      )
                    </label>
                  </div>
                </div>
                <div className="relative w-[90%] mt-10 mx-auto">
                  <input
                    type="text"
                    name="storaget_at"
                    id="storaget_at"
                    required
                    value={data.storaget_at}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:lue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <label
                    htmlFor="storage_at"
                    className="absolute top-0 left-0 px-2  mb-5 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                  >
                    Almacenado en( Dato actual:
                    <span className="text-blue-800"> {data.storaget_at}</span>)
                  </label>
                </div>
                <div className="relative w-[90%] mt-10 mx-auto">
                  <input
                    type="date"
                    name="used_at"
                    value={data.used_at}
                    required
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                    id="Fecha"
                  />
                  <label
                    htmlFor="Fecha"
                    className="flex flex-row absolute -top-2 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase"
                  >
                    Fecha de creación:{" "}
                    <p className="ml-3 text-blue-800">{data.used_at}</p>
                  </label>
                </div>

                <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
                  <label
                    htmlFor="Observaciones"
                    className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl uppercase"
                  >
                    Observaciones
                  </label>
                  <textarea
                    name="description"
                    id="Observaciones"
                    className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:lue-500 "
                    required
                    value={data.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    value="Enviar Datos"
                    className="p-4 bg-blue-700 rounded-xl text-white mt-10 mb-5 cursor-pointer"
                  >
                    Actualizar datos
                  </button>
                  <Toaster></Toaster>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
