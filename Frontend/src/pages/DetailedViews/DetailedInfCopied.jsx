import { useState } from "react";
//import { useEffect } from "react";
import { updateInfCopied, getInfCopied } from "../../api";
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import "../../styles/forms.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function DetailedInfCopied() {
  const { id } = useParams();
  //const [description, setDescription] = useState("");
  //const [element, setElement] = useState("");

  //const [codeInfCopied, setCodeInfCopied] = useState("");

  //const [copiedInf, setCopiedInf] = useState("");
  //const [selectedOption2, setSelectedOption2] = useState('');

  //element, copiedInf, description

  const [data, setData] = useState({
    element: "",
    //code: "",
    copiedInf: "",
    //elementCode: "",
    description: "",
  });

  useEffect(() => {
    async function loadInfCopied() {
      if (id) {
        const response = await getInfCopied(id);
        console.log(response);
        const { data } = response;
        //setName(data.tapeType_name);
        setData({
          element: data.element,
          copiedInf: data.copiedInf,

          //elementCode: data.elementCode,
          description: data.description,
        });
      }
    }
    loadInfCopied();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateInfCopied(id, data);
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

  useEffect(() => {
    getElements();
  }, []);

  return (
    <div className="w-[100vw] h-screen overflow-x-hidden">
      <Header />
      <NavBarLogin />
      <div className="bg-[#f1f1f1] w-[100vw] h-full flex items-center justify-center">
        <div className="bg-white h-full w-full flex flex-col items-center justify-center  relative overflow-y-auto">
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="mb-1 w-full h-20  bg-[#151980] flex items-center  ">
              <h1 className="w-full text-white font-semibold text-xl text-left my-auto uppercase ml-7">
                Actualizar Información copiada
              </h1>
            </div>
            <div className="flex flex-col flex-1 w-full items-center justify-center">
              <div className="relative w-[90%] mt-10 mx-auto">
                <select
                  name="element"
                  value={data.element}
                  onChange={handleChange}
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
                  name="copiedInf"
                  id="infc"
                  required
                  onChange={handleChange}
                  value={data.copiedInf}
                  className="block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <label
                  htmlFor="infc"
                  className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase "
                >
                  Información copiada
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
                name="description"
                id="Observaciones"
                className="block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                required
                onChange={handleChange}
                value={data.description}
              ></textarea>
            </div>

            <div className="w-full flex justify-center mt-20">
              <button
                type="submit"
                value="Enviar Datos"
                className="p-4 bg-blue-700 rounded-xl text-white   cursor-pointer"
              >Actualizar datos</button>
              <Toaster></Toaster>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
