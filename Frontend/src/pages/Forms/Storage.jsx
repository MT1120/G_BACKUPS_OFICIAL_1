//import React from 'react'
//Storage
import { useState, useEffect } from "react";
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";

export default function Storage() {
  const [description, setDescription] = useState("");
  const [element, setElement] = useState("");
  const [storage, setStorage] = useState("");
  //const [selectedOption2, setSelectedOption2] = useState('');

  const [elementTypes, setElementType] = useState([]);

  const getElements = () => {
    api
      .get("/api/element/")
      .then((res) => res.data)
      .then((data) => {
        setElementType(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const createStorage = (e) => {
    e.preventDefault();
    api
      .post("/api/storage/", { element, storage, description })
      .then((res) => {
        if (res.status === 201) {
          alert("Creado con éxito");
        } else {
          alert("Error");
        }
      })
      .catch((err) => alert(err));

    setDescription("");
    setElement("");
    setStorage("");
  };
  useEffect(() => {
    getElements();
  }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-screen flex items-center justify-center">
        <div className="bg-white h-[80%] w-[80%] flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 shadow-2xl relative overflow-y-auto">
          <form className="w-full h-full" onSubmit={createStorage}>
            <div className="mb-1 w-full h-20 rounded-t-xl bg-[#151980] flex items-center  ">
              <h1 className="w-full text-white font-semibold text-xl text-center my-auto uppercase">
                Almacenaje
              </h1>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="select1"
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled></option>
                  {elementTypes.map((elementType) => (
                    <option value={elementType.id} key={elementType.id}>
                      {elementType.elementType}
                    </option>
                  ))}
                </select>
                <label className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase ">
                  Elige el elemento deseado
                </label>
              </div>
              <div className="relative w-[90%] mt-10 mx-auto">
                <input
                  type="text"
                  name="infc"
                  id="infc"
                  required
                  onChange={(e) => setStorage(e.target.value)}
                  value={storage}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40 z-50"
                />
                <label
                  htmlFor="infc"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                >
                  Almacenado en
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
                className="p-4 bg-blue-700 rounded-xl text-white  absolute bottom-5 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
