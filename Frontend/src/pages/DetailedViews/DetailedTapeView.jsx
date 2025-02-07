import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useParams } from "react-router-dom";
import api from "../../api";
import { getTape, updateTape } from "../../api";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoDocumentText } from "react-icons/io5";
import Logo from "../../assets/LOGO.png";

export default function DetailedTapeView() {
  const { id } = useParams(); // Get the id parameter from the URL

  const tableRef = useRef(null);

  const exportPDF = () => {
    const input = tableRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
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

  const [tapes, setTapes] = useState([]);

  useEffect(() => {
    const fetchTapes = async () => {
      try {
        const res = await api.get("/api/tapes/");
        console.log("Data from API:", res.data); // Log the data received from API
        const filteredTapes = res.data.filter(
          (tape) => tape.id === parseInt(id)
        ); // Ensure id comparison is correct
        console.log("Filtered Tapes:", filteredTapes); // Log filtered tapes
        setTapes(filteredTapes);
      } catch (err) {
        alert(err); // Handle errors
      }
    };

    fetchTapes();
  }, [id]); //

  const [backups, setBakups] = useState([]);
  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const res = await api.get("/api/backups/");
        console.log("Data from API:", res.data); // Log the data received from API
        const filteredBackups = res.data.filter(
          (backup) => backup.tape === parseInt(id)
        ); // Ensure id comparison is correct
        console.log("Filtered back:", filteredBackups); // Log filtered tapes
        setBakups(filteredBackups);
      } catch (err) {
        alert(err); // Handle errors
      }
    };

    fetchBackups();
  }, [id]); //

  //const [consecutive, setConsecutive] = useState("");
  const [custodyTape, setCustodyTape] = useState([]);

  const getCustodyTape = () => {
    api
      .get("/api/custodyTape/")
      .then((res) => res.data)
      .then((data) => {
        setCustodyTape(data);
        console.log("Data_custody", data);
      })
      .catch((err) => alert(err));
  };

  // const [tape, setTape] = useState("");

  // const [formato, setFormato] = useState("");

  // const [used_at, setUsed_at] = useState(new Date());

  //updates
  const [tapeTypeName, setName] = useState("");
  const [data, setData] = useState({
    tapeType: "",
    consecutive: "",
    estatus: "",
    used: "",
    onCustody: "",
    description: "",
    used_at: "",
  });

  useEffect(() => {
    async function loadTape() {
      if (id) {
        const response = await getTape(id);
        console.log(response);
        const { data } = response;
        setName(data.tapeType_name);
        const formattedDate = data.used_at
          ? new Date(data.used_at).toISOString().split("T")[0]
          : "";
        setData({
          tapeType: data.tapeType,
          consecutive: data.consecutive,
          estatus: data.estatus,
          used: data.used,
          onCustody: data.onCustody,
          description: data.description,
          used_at: formattedDate,
        });
      }
    }
    loadTape();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTape(id, data);
      toast.success("Datos actualizados", {
        duration: 16000,
        position: "top-center",
        style: {
          background: "#151980",
          color: "#fff",
        },
      });
    }
    //navigate("/backup/");
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
    getCustodyTape();
  }, []); // Verifica si los datos se actualizan correctamente al cargar la página.

  useEffect(() => {
    getTapeTypes();
  }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-[90%] w-[90%] flex flex-col items-center rounded-xl shadow-2xl relative">
          <div className="bg-blue-800 w-full rounded-t-xl h-[5rem] text-white flex flex-row  items-center">
            <div className="h-full w-1/2 flex justify-center items-center">
              <h1 className="text-xl text-center  mb-3">Cinta</h1>
            </div>
            <div className="h-full w-1/2  flex justify-center items-center">
              <IoDocumentText
                className="h-6 w-6  justify-end cursor-pointer "
                onClick={exportPDF}
              />
            </div>
          </div>
          <div className="h-full w-full overflow-auto">
            {tapes.map((item) => (
              <div
                className="min-w-full overflow-y-auto"
                key={item.id}
                ref={tableRef}
              >
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-3">
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
                        <div className="flex justify-start items-center mt-2">
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

                    {/* Encabezados */}
                    <tr className="bg-blue-200 text-center">
                      <th className="px-6 py-3">Usuario</th>
                      <th className="px-6 py-3">Tipo de cinta</th>
                      <th className="px-6 py-3">Consecutivo</th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="px-6 py-3">Dado de baja</th>
                      <th className="px-6 py-3">En custodia</th>
                      <th className="px-6 py-3"># Backups</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {/* Filas dinámicas */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-center">
                        {item.author_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {tapeTypeName || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.consecutive || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.estatus || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.given_low || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.onCustody || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.total_backups || 0}
                      </td>
                    </tr>
                    {/* Descripción */}
                    <tr className="bg-gray-100">
                      <td colSpan="7" className="px-6 py-4 text-left">
                        <strong>Descripción:</strong>{" "}
                        {item.description || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {backups.length > 0 ? (
                  <>
                    <div className="flex min-w-full bg-blue-800 justify-center items-center mt-5 py-4 px-4">
                      <p className="font-semibold text-xl text-white">
                        Backups
                      </p>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <thead>
                        <tr className="bg-blue-200 text-center">
                          <th className="px-6 py-3">Autor</th>

                          <th className="px-6 py-3">Consecutivo</th>
                          <th className="px-6 py-3">Fecha de creación</th>
                          <th className="px-6 py-3">Fecha de registro </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-gray-700">
                        {backups.map((backup) => (
                          <tr className="hover:bg-gray-50" key={backup.id}>
                            <td className="px-6 py-4 text-center">
                              {backup.author_name || "N/A"}
                            </td>

                            <td className="px-6 py-4 text-center">
                              {backup.consecutive || "N/A"}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatDate(backup.created_at)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatDate(backup.used_at || "N/A")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  // Display a message if no backups are available
                  <p>No backups available.</p>
                )}
                {/* <div className="flex min-w-full bg-blue-800 justify-center items-center mt-5 py-4 px-4">
                  <p className="font-semibold text-xl text-white">Backups</p>
                </div> */}
                {/* <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                  <thead>
                    <tr className="bg-blue-200 text-center">
                      <th className="px-6 py-3">Autor</th>

                      <th className="px-6 py-3">Consecutivo</th>
                      <th className="px-6 py-3">Fecha de creación</th>
                      <th className="px-6 py-3">Fecha de registro </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-700">
                    {backups.map((backup) => (
                      <tr className="hover:bg-gray-50" key={backup.id}>
                        <td className="px-6 py-4 text-center">
                          {backup.author_name || "N/A"}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {backup.consecutive || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {formatDate(backup.created_at)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {formatDate(backup.used_at || "N/A")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </div>
            ))}

            <form className="w-full h-full" onSubmit={handleSubmit}>
              <div className="mb-1 w-full h-20  bg-blue-800 flex items-center  ">
                <h1 className="w-full text-white font-semibold text-xl text-center my-auto uppercase">
                  Actualizar Cinta
                </h1>
              </div>
              <div className="flex flex-col flex-1 w-full items-center justify-center">
                <div className="relative w-[90%] mt-10 mx-auto">
                  {/* (e) => setTapeType(e.target.value) */}
                  <select
                    name="tapeType"
                    required
                    value={data.tapeType}
                    onChange={handleChange}
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
                    Elige un tipo de cinta ( Opción seleccionada:
                    <span className="text-blue-800"> {tapeTypeName}</span>)
                  </label>
                </div>
                <div className="relative w-[90%] mt-10 mx-auto">
                  {/* (e) => setConsecutive(e.target.value) */}
                  <input
                    type="text"
                    name="consecutive"
                    id="ConSTv"
                    required
                    value={data.consecutive}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <label
                    htmlFor="consecutive"
                    className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                  >
                    Consecutivo( Dato actual:
                    <span className="text-blue-800"> {data.consecutive}</span>)
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-1 w-full items-center justify-center ">
                <div className="relative w-[90%] mt-10 mx-auto">
                  {/*(e) => setEstatus(e.target.value) */}
                  <select
                    name="estatus"
                    value={data.estatus}
                    required
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" disabled></option>
                    <option value="nueva">Nueva</option>
                    <option value="usada">Usada</option>
                    <option value="dañada">Dañada</option>
                  </select>
                  <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                    Estado de la cinta( Dato actual:
                    <span className="text-blue-800"> {data.estatus}</span>)
                  </label>
                </div>
                <div className="relative w-[90%] mt-10 mx-auto">
                  {/*(e) => setUsed(e.target.value) */}
                  <select
                    name="used"
                    value={data.used}
                    required
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" disabled></option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <label
                    htmlFor="used"
                    className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                  >
                    Dado de baja( Dato actual:
                    <span className="text-blue-800"> {data.used}</span>)
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-1 w-full items-center justify-center ">
                <div className="relative w-[90%] mt-10 mx-auto">
                  {/*(e) => setOnCustody(e.target.value) */}
                  <select
                    name="onCustody"
                    value={data.onCustody}
                    required
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    <option value="" disabled></option>
                    <option value="S">Si</option>
                    <option value="N">No</option>
                  </select>
                  <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                    En custodia( Dato actual:
                    <span className="text-blue-800"> {data.onCustody}</span>)
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
                    className="flex flex-row absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase"
                  >
                    Fecha de creación:{" "}
                    <p className="ml-3 text-blue-800">{data.used_at}</p>
                  </label>
                </div>
              </div>
              <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
                <label
                  htmlFor="description"
                  className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl uppercase"
                >
                  Observaciones
                </label>
                {/*(e) => setDescription(e.target.value) */}
                <textarea
                  name="description"
                  id="Observaciones"
                  className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  required
                  onChange={handleChange}
                  value={data.description}
                ></textarea>
              </div>
              <div className="w-full flex justify-center mt-10">
                <input
                  type="submit"
                  value="Enviar Datos"
                  className="p-4 bg-blue-700 rounded-xl text-white cursor-pointer "
                />
                <Toaster></Toaster>
              </div>
              <div className="h-5 w-full"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
