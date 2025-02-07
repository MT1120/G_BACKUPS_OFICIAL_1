import { useState, useEffect } from "react";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import { useParams } from "react-router-dom";
import api from "../../api";
import { getAllTapes } from "../../api";
//import toast, { Toaster } from "react-hot-toast";

export default function SendTape() {
  //const [custodyTape, setCustodyTape] = useState({ tape: [], description: "" });
  const [tapes, setTapes] = useState([]);

  

  const [shTape, setShTape] = useState({
    tape: [],
    formato: "",
    used_at: new Date(),
  });

  
  const handleTapeChange = (tapeId) => {
    setShTape((prevState) => {
      // Check if the tapeId is already selected (present in the array)
      if (prevState.tape.includes(tapeId)) {
        // Remove the tapeId if it is already selected
        return {
          ...prevState,
          tape: prevState.tape.filter((id) => id !== tapeId),
        };
      } else {
        // Add the tapeId if it's not already selected
        return {
          ...prevState,
          tape: [...prevState.tape, tapeId],
        };
      }
    });
  };

  

  const [formato, setFormato] = useState("");

  const [used_at, setUsed_at] = useState(new Date());

  const createSendH = (e) => {
    e.preventDefault();
    api
      .post("/api/sendTape/", shTape)
      .then((res) => {
        if (res.status === 201) {
          alert("Registro de envio a custodia exitoso");
        } else {
          alert("Error");
        }
      })
      .catch((err) => alert(err));

    console.log(shTape);
  };
  
  useEffect(() => {
    getAllTapes().then((res) => {
      setTapes(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center  relative">
          <div className="h-full w-full overflow-auto">
            <div className="bg-blue-800 w-full h-[5rem] text-white flex items-center ">
              <h1 className="text-xl text-center w-full mb-3">
                Enviar a custodia
              </h1>
            </div>
            <div className="w-full">
              <form className="w-full" onSubmit={createSendH}>
                <div className="flex flex-col flex-1 w-full items-center justify-center">
                  <div className="relative w-[90%] mt-10 mx-auto">
                    <input
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                      value={shTape.formato}
                      onChange={(e) =>
                        setShTape({ ...shTape, formato: e.target.value })
                      }
                    />

                    <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-gray-600 -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl">
                      # Formato
                    </label>
                  </div>
                  <div className="relative w-[90%] mt-11 mx-auto">
                    <input
                      type="date"
                      id="used_at"
                      value={shTape.used_at}
                      required
                      onChange={(e) =>
                        setShTape({ ...shTape, used_at: e.target.value })
                      }
                      className={`block w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
                    />
                    <label
                      htmlFor="used_at"
                      className="absolute -top-3 left-0 px-2 py-1 mb-7 text-gray-700 -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl "
                    >
                      Fecha de creación
                    </label>
                  </div>
                </div>

                <div className="flex flex-col flex-1 w-full items-center justify-center">
                  <div className="relative w-[90%] mt-10 mx-auto">
                    {/* <select
                      multiple
                      name="tapes"
                      className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 "
                      required
                      value={tape}
                      onChange={(e) => setTape(e.target.value)}

                      // Make the input read-only for display
                    >
                      <option value="" disabled></option>
                      {tapes.map((Tapes) => (
                        <option value={Tapes.id} key={Tapes.id}>
                          {Tapes.consecutive}
                        </option>
                      ))}
                    </select> */}
                    {tapes.map((Tapes) => (
                      <label
                        key={Tapes.id}
                        className="flex items-center p-3 transition-colors duration-200 rounded-md hover:bg-gray-50 cursor-pointer group mt-3 overflow-y-auto"
                      >
                        <input
                          type="checkbox"
                          name="tapes"
                          value={Tapes.id}
                          onChange={() => handleTapeChange(Tapes.id)}
                          required
                          checked={shTape.tape.includes(Tapes.id)}
                          className="w-5 h-5 border-2 rounded-md text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                          {Tapes.consecutive}
                        </span>
                      </label>
                    ))}

                    <label className="absolute top-0 left-0 px-2 py-1 mb-4 text-gray-600 -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl">
                      Cintas :
                    </label>
                  </div>
                </div>

                <div className="w-full flex justify-center mt-20">
                  <input
                    type="submit"
                    value="Enviar Datos"
                    className="p-4 bg-blue-700 rounded-xl text-white  "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
