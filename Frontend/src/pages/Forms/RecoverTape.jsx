import { useState, useEffect } from "react";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import api from "../../api";

export default function RecoverTape() {
  const [rvTape, setRvTape] = useState({
    tape: [],
    formato: "",
    used_at: new Date(),
  });

  // const [tape, setTape] = useState("");

  const [formato, setFormato] = useState("");

  const [used_at, setUsed_at] = useState(new Date());

  const [Tapes, setTapes] = useState([]);

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

  const createRecoverH = (e) => {
    e.preventDefault();

    api
      .post("/api/recoverTape/", rvTape)
      .then((res) => {
        if (res.status === 201) {
          alert("Recuperación Registrada");
        } else {
          alert("Error");
        }
      })
      .catch((err) => alert(err));
  };
  const handleTapeChange = (tapeId) => {
    setRvTape((prevState) => {
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

  useEffect(() => {
    getTapes();
  }, []);
  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center  relative overflow-y-auto">
          <div className=" w-full h-20  bg-[#151980] flex items-center absolute top-0  ">
            <h1 className="w-full text-white font-semibold text-xl text-left my-auto ml-7 ">
              RECUPERAR CINTAS
            </h1>
          </div>
          <form className="w-full flex flex-col" onSubmit={createRecoverH}>
            <div className="flex flex-col flex-1 w-full items-center justify-center mb-5">
              <div className="relative w-[90%]  mx-auto">
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  value={rvTape.formato}
                  onChange={(e) =>
                    setRvTape({ ...rvTape, formato: e.target.value })
                  }
                />

                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  # Formato
                </label>
              </div>
              <div className="relative w-[90%] mt-11 mx-auto">
                <input
                  type="date"
                  id="used_at"
                  value={rvTape.used_at}
                  required
                  onChange={(e) =>
                    setRvTape({ ...rvTape, used_at: e.target.value })
                  }
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

            <div className="flex flex-col flex-1 w-full items-center justify-center mt-3">
              <div className="relative w-[90%]  mx-auto">
                {Tapes.map((Tapes) => (
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
                      checked={rvTape.tape.includes(Tapes.id)}
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

            <div className="w-full flex justify-center absolute bottom-3">
              <input
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white mt-10  cursor-pointer "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
