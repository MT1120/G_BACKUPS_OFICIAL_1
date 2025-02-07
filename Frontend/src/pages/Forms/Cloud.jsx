import { useState } from "react";
import api from "../../api";
import "../../styles/forms.css";

export default function Cloud() {
  const [description, setDescription] = useState("");
  const [cloud_name, setcloud_name] = useState("");
  const [used_at, setUsed_at] = useState(new Date());

  const CreateCloud = (e) => {
    e.preventDefault();
    api
      .post("/api/clouds/", {
        cloud_name,
        description,
        used_at,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Creado con éxito");
        } else {
          alert("Error al crear la nube");
        }
      })
      .catch((err) => alert(err));
    setcloud_name("");
    setDescription("");
    setUsed_at(new Date());
  };
  return (
    <form onSubmit={CreateCloud}>
      <div className="relative w-[90%] mt-11 mx-auto">
        <input
          type="text"
          name="name"
          id="name"
          required
          value={cloud_name}
          onChange={(e) => setcloud_name(e.target.value)}
          className="block w-full px-4 py-2 mt-5 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <label
          htmlFor="name"
          className="absolute -top-1 left-0 px-2 py-1 mb-4 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
        >
          Nombre de la nube
        </label>
      </div>
      <div className="flex flex-col flex-1 w-full items-center justify-center ">
        <div className="relative w-[90%] mt-11 mx-auto">
          <input
            type="date"
            id="used_at"
            value={used_at}
            required
            onChange={(e) => setUsed_at(e.target.value)}
            className={`block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40`}
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
