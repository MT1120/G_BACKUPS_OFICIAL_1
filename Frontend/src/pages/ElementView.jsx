//ElementView
import Header from "../components/Header";
import NavBarLogin from "../components/NavBarLogin";

import { useState } from "react";

import { format, parseISO } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";

import { useEffect } from "react";
import { getAllElements, getAllElementsByDate } from "../api";

import { deleteElements } from "../api";
import { FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
//import api from "../api";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

export default function ElementView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const navigate = useNavigate();

  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const formattedDate = date
  //     ? new Date(dateString).toISOString().split("T")[0]
  //     : "";
  //   return formattedDate;
  // }

  function formatDate(dateString) {
    if (!dateString) return "";
    return format(parseISO(dateString), "yyyy-MM-dd");
  }

  const handleNavigation = (link) => {
    navigate(link);
  };

  //const [startDate, setStartDate] = useState(new Date());
  const [elements, setElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredElements, setFilteredElements] = useState([]);

  const getElements = () => {
    getAllElements()
      .then((res) => res.data)
      .then((data) => {
        setElements(data);
        setFilteredElements(data);
        //console.log(data);
      })
      .catch((err) => alert(err));
  };

  const filterElement = () => {
    let filtered = elements;
    //console.log(startDate);
    if (searchTerm) {
      filtered = filtered.filter((tape) =>
        tape.elementType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredElements(filtered);
  };

  const filterElementByDate = () => {
    if (selectedDate && selectedDate2) {
      console.log("Pass");
      getAllElementsByDate(
        format(selectedDate, "yyyy-MM-dd"),
        format(selectedDate2, "yyyy-MM-dd")
      )
        .then((response) => {
          console.log("Pass2:", response.data);
          setFilteredElements(response.data); // Update filteredTapes with API response
          console.log("Pass3:", response.data);
        })
        .catch((err) => alert(err));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    filterElement();
  };

  const handleDateSearchClick = () => {
    filterElementByDate();
  };

  useEffect(() => {
    getElements();
  }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-white w-full flex flex-col border-t-2 border-gray-300  relative ">
        <div className="bg-transparent w-full h-[5rem] flex justify-center items-center text-xl font-bold uppercase">
          <h1>Consultar Elementos</h1>
        </div>
        <div className="bg-transparent w-full h-[5rem] border-b border-t border-x-0 border-x-indigo-600 ">
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
        <div className=" w-full relative  shadow-md  overflow-y-auto overflow-x-hidden ">
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="text-sm text-white uppercase bg-[#282c98] dark:bg-[#151980] dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-white">
                      Tipo de elemento
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Fecha de creación
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Eliminar
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {filteredElements.map((item) => (
                    <tr
                      className="bg-white border-b dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-50 text-gray-600"
                      key={item.id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-600">
                        {item.elementType}
                      </td>

                      <td className="px-6 py-4">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-6 py-4">{item.author_name}</td>
                      <td className="px-6 py-4 text-right  text-red-700">
                        <div>
                          <button
                            className="w-6 h-6 "
                            onClick={async () => {
                              const accepted = window.confirm("Are you sure?");
                              if (accepted) {
                                await deleteElements(item.id);
                                toast.success("Eliminado", {
                                  duration: 16000,
                                  position: "top-center",
                                  style: {
                                    background: "#151980",
                                    color: "#fff",
                                  },
                                });
                                getElements();
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
                          onClick={() =>
                            handleNavigation(`/detailedElement/${item.id}`)
                          }
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
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
  );
}
