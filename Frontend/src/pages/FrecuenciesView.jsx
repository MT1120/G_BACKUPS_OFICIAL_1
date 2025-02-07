import Header from "../components/Header";
import NavBarLogin from "../components/NavBarLogin";

import { useState } from "react";

import { format, parseISO } from "date-fns";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { getAllFrecuencies } from "../api";

import "react-datepicker/dist/react-datepicker.css";

export default function FrecuenciesView() {
  const navigate = useNavigate();

  function formatDate(dateString) {
    if (!dateString) return "";
    return format(parseISO(dateString), "yyyy-MM-dd");
  }

  const handleNavigation = (link) => {
    navigate(link);
  };

  //const [startDate, setStartDate] = useState(new Date());
  const [frecuencies, setFrecuencies] = useState([]);

  const getFrecy = () => {
    getAllFrecuencies()
      .then((res) => res.data)
      .then((data) => {
        setFrecuencies(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getFrecy();
  }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-transparentnsparent h-[80%] w-[80%] flex flex-col items-center justify-start rounded-xl   relative">
          <div className="w-full relative  shadow-md sm:rounded-lg overflow-y-auto ">
            <div className="overflow-x-auto">
              <div className="min-w-full overflow-y-auto max-h-96">
                <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="text-sm text-white uppercase bg-[#282c98] dark:bg-[#151980] dark:text-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-white">
                        Frecuencia
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        fecha
                      </th>
                      <th scope="col" className="px-6 py-3 text-white">
                        Usuario
                      </th>

                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {frecuencies.map((item) => (
                      <tr
                        className="bg-white border-b dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-50 text-gray-600"
                        key={item.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-600">
                          {item.value}
                        </td>

                        <td className="px-6 py-4">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-6 py-4">{item.author_name}</td>

                        <td className="px-6 py-4 text-right">
                          <div
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                            onClick={() =>
                              handleNavigation(`/detailedFrecuency/${item.id}`)
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
