// import React from 'react'
//Element

import { useState } from 'react';
import api from "../../api";
import Header from "../../components/Header";
import NavBarLogin from "../../components/NavBarLogin";
import '../../styles/forms.css';

export default function Element() {
    // const [elementType, setElementType] = useState('');
    // const [description, setDescription] = useState('');


    const [elementType, setElementType] = useState('');
    const [elementCode, setElementCode] = useState('');
    const [description, setDescription] = useState('');

    const createElementType = (e) => {
        e.preventDefault();
        api
            .post("/api/element/", { elementCode,elementType, description })
            .then((res) => {
                if (res.status === 201) {
                    alert("Elemento creado")
                } else {
                    alert("Error al crear elemento")
                }
            }).catch((err) => alert(err))

        setElementType("");
        setElementCode("");
        setDescription("");
    }

    return (
        <div className="w-[100vw] h-screen overflow-x-hidden">
            <Header />
            <NavBarLogin />
            <div className='bg-[#f1f1f1] w-[100vw] h-full flex items-center justify-center'>
                <div className="bg-white h-full w-full flex flex-col items-center justify-center     relative overflow-y-auto">
                    <form className="w-full h-full " onSubmit={createElementType}>
                        <div className='mb-1 w-full h-20  bg-[#151980] flex items-center  '>
                            <h1 className='w-full text-white font-semibold text-xl text-left my-auto ml-7 '>
                                FORMULARIO DE ELEMENTOS
                            </h1>
                        </div>
                        <div className="flex flex-col flex-1 w-full items-center justify-center">

                            <div className="relative w-[90%] mt-10 mx-auto">
                                <input
                                    type="text"
                                    name="elementCode"
                                    id="elementCode"
                                    required
                                    onChange={(e) => setElementCode(e.target.value)}
                                    value={elementCode}
                                    className='block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40'

                                />
                                <label htmlFor="elementCode" className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase">Codigo elemento</label>

                            </div>
                            <div className="relative w-[90%] mt-10 mx-auto">
                                <input
                                    type="text"
                                    name="elementType"
                                    id="elementType"
                                    required
                                    onChange={(e) => setElementType(e.target.value)}
                                    value={elementType}
                                    className='block w-full px-4 py-2 mt-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40'

                                />
                                <label htmlFor="elementType" className="absolute top-0 left-0 px-2 py-1 mb-3 text-black -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out font-semibold text-xl uppercase">Tipo de elemento</label>

                            </div>
                        </div>
                        <div className="relative  w-[90%] flex flex-col  mx-auto mt-10 ">
                            <label htmlFor="Observaciones" className="absolute top-0 left-0  px-2 py-1 mb-3  text-black  -translate-y-1/2 transform origin-left scale-75 pointer-events-none transition-all duration-300 ease-in-out  font-semibold text-xl uppercase">Observaciones</label>
                            <textarea name="Observaciones"
                                id="Observaciones"
                                className='block p-6 mt-5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            >

                            </textarea>

                        </div>

                        <div className='w-full flex justify-center mt-20'>
                            <input
                                type="submit"
                                value="Enviar Datos"
                                className='p-4 bg-blue-700 rounded-xl text-white   cursor-pointer'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}