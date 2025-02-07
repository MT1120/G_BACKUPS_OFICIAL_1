import Header from "../components/Header";
import NavBarLogin from "../components/NavBarLogin";
// import Table from "../components/Table"; // Corrected import
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaSearch } from 'react-icons/fa';

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {

    const lists = [
        {
            nombre: "value1",
            color: "value2",
            categoria: "value2",
            precio: "90",
            otro: "otro",
            ver_mas: "Edit"
        },
        {
            nombre: "value1",
            color: "value2",
            categoria: "value2",
            precio: "90",
            otro: "otro",
            ver_mas: "Edit"
        },
        {
            nombre: "value1",
            color: "value2",
            categoria: "value2",
            precio: "90",
            otro: "otro",
            ver_mas: "Edit"
        }
    ];



    return (

        <div className="w-[100vw] h-screen overflow-x-hidden relative">
            <Header />
            <NavBarLogin />
            {/* <div className="w-full fixed z-50 ">
                <Header  />
                <NavBarLogin  />
            </div> */}
            {/* mt-10 */}
            <div className='bg-[#f1f1f1] w-[100vw] h-[1500px] flex items-center justify-center'>
                <div className="bg-white h-[80%] w-[80%] flex flex-col   rounded-xl border-2 border-gray-200 shadow-2xl relative">
                    <div className="bg-transparent w-full h-[5rem] border-b border-t-0 border-x-0 border-x-indigo-600 rounded-t-xl absolute top-0 ">
                        <div className="w-full h-full flex items-center justify-center">
                            <button className="p-4 bg-emerald-500 text-white text-center text-xl text-semibolds rounded-xl shadow-xl hover:bg-emerald-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
                                Busca o añade una cinta
                            </button>
                        </div>
                    </div>
                    <div className="bg-blue-50 w-full mt-5  absolute bottom-0 rounded-b-xl " style={{ height: `calc(100% - 5rem)` }}>
                        <div className="h-full w-full grid grid-rows-2">

                            <div className="w-full h-full bg-red-100 rounded-bl-xl">

                            </div>
                            <div className="w-full h-full bg-yellow-100 grid grid-cols-2">
                                <div className="w-full h-full bg-purple-100 rounded-bl-xl">

                                </div>
                                <div className="w-full h-full bg-blue-100 rounded-br-xl">

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}