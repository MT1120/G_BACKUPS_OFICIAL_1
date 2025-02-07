import Header from "../components/Header";
import NavBarLogin from "../components/NavBarLogin";
import DatePicker from "react-datepicker";

import { format } from "date-fns";
//import Table from "../components/Table"; // Corrected import
import { useState } from "react";
// import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
//import api from "../api";
import { getAllBackups, getAllBackupsByDate } from "../api";
import { useNavigate } from "react-router-dom";

import { deleteBackups } from "../api";
import { FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

export default function BackupView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date
      ? new Date(dateString).toISOString().split("T")[0]
      : "";
    return formattedDate;
  }

  const handleNavigation = (link) => {
    navigate(link);
  };

  //const [startDate, setStartDate] = useState(new Date());
  const [backups, setBackups] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBackups, setFilteredBackups] = useState([]);

  const getBackups = () => {
    getAllBackups()
      .then((res) => res.data)
      .then((data) => {
        setBackups(data);
        setFilteredBackups(data);
      })
      .catch((err) => alert(err));
  };

  const filterTapes = () => {
    let filtered = backups;
    //console.log(startDate);
    if (searchTerm) {
      filtered = filtered.filter((tape) =>
        tape.consecutive.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBackups(filtered);
  };

  const filterBackupsByDate = () => {
    if (selectedDate && selectedDate2) {
      console.log("Pass");
      getAllBackupsByDate(
        format(selectedDate, "yyyy-MM-dd"),
        format(selectedDate2, "yyyy-MM-dd")
      )
        .then((response) => {
          console.log("Pass2:", response.data);
          setFilteredBackups(response.data); // Update filteredTapes with API response
          console.log("Pass3:", response.data);
        })
        .catch((err) => alert(err));
    }
  };

  //Filter1

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    // const filtered = tapes.filter((tape) =>
    //   tape.consecutive.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setFilteredTapes(filtered);
    filterTapes();
  };

  const handleDateSearchClick = () => {
    filterBackupsByDate();
  };

  useEffect(() => {
    getBackups();
  }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-[85%] w-[90%] flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 shadow-2xl relative">
          <div className="bg-transparent w-full h-[5rem] border-b border-t-0 border-x-0 border-x-indigo-600 rounded-t-xl absolute top-0">
            <div className="w-full h-full flex flex-row items-center">
              <div className="h-full w-1/3 flex justify-center items-center ">
                <form
                  className="w-full mx-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      className="bg-transparent w-full p-4 ps-10 text-sm text-gray-900 border-2 border-gray-300   rounded-lg  focus:outline-none "
                      placeholder="Buscar"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      type="submit"
                      onClick={handleSearchClick}
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                    >
                      BUSCAR
                    </button>
                  </div>
                </form>
              </div>

              <div className="h-[80%] mx-1 flex items-cente w-[1px] my-5 bg-slate-200"></div>

              <div className="w-[60%] h-full mx-10 flex flex-row items-center justify-center ">
                <div className="w-full h-full">
                  <form
                    className="h-full w-full flex flex-row items-center justify-end"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="h-full flex flex-row items-center">
                      <div className="h-full  flex flex-row items-center ml-4 justify-center">
                        <p className="mr-3">De: </p>
                        <FaCalendarAlt className="text-blue-500 h-[24px] w-[24px] mr-2" />
                        <DatePicker
                          className=" focus:outline-none border-2 border-gray-300 rounded-lg p-1 w-[6.5rem]"
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select a date"
                        />
                        {console.log(format(selectedDate, "yyyy-MM-dd"))}
                      </div>
                      <p className="ml-5 mr-2"> - </p>
                      <div className="h-full  flex flex-row items-center ml-4 mr-4 justify-center">
                        <p className="mr-3">Hasta: </p>
                        <FaCalendarAlt className="text-blue-500 h-[24px] w-[24px] mr-2" />
                        <DatePicker
                          className=" focus:outline-none border-2 border-gray-300 rounded-lg p-1 w-[6.5rem]"
                          selected={selectedDate2}
                          onChange={(date2) => setSelectedDate2(date2)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Selecciona la fecha"
                        />
                        {console.log(format(selectedDate2, "yyyy-MM-dd"))}
                      </div>

                      <button
                        type="submit"
                        onClick={handleDateSearchClick}
                        className="ml-4 p-2 bg-blue-500 text-white rounded-full flex items-center justify-center"
                      >
                        <FaSearch className="" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full relative  shadow-md sm:rounded-lg overflow-y-auto overflow-x-hidden mt-10">
            <div className="overflow-x-hidden">
              <div className="min-w-full overflow-y-auto max-h-96">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                  <thead className="text-sm text-white uppercase bg-[#282c98] dark:bg-[#151980] dark:text-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-white">
                        Elemento
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Consecutivo
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Frecuencia
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Seguridad
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Tipo de copia
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Fecha de creación
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Autor
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Eliminar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Ver más</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {filteredBackups.map((item) => (
                      <tr
                        className="bg-white border-b dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-50 text-gray-600"
                        key={item.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-600">
                          {item.element_name}
                        </td>
                        <td className="px-6 py-4">{item.consecutive}</td>
                        <td className="px-6 py-4">{item.frecuency}</td>
                        <td className="px-6 py-4">{item.security}</td>
                        <td className="px-6 py-4">{item.copyType}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">
                          {formatDate(item.used_at)}
                        </td>
                        <td className="px-6 py-4">{item.author_name}</td>
                        <td className="px-6 py-4 text-right  text-red-700">
                          <div>
                            <button
                              className="w-6 h-6 "
                              onClick={async () => {
                                const accepted =
                                  window.confirm("Are you sure?");
                                if (accepted) {
                                  await deleteBackups(item.id);
                                  toast.success("Eliminado", {
                                    duration: 16000,
                                    position: "top-center",
                                    style: {
                                      background: "#151980",
                                      color: "#fff",
                                    },
                                  });
                                  getBackups();
                                }
                              }}
                            >
                              <FaTrash className="w-6 h-6" />
                            </button>

                            <Toaster />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                            onClick={() =>
                              handleNavigation(`/detailedBackup/${item.id}`)
                            }
                          >
                            Ver más
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}