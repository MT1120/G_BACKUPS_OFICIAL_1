//import React from 'react'
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

export default function FormLogin({ route, method }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const handleNavigation = () => {
    //     navigate("/tapeView")
    // }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/backupView");
            }
        } catch (error) {
            alert(`Error: ${error.response?.data?.detail || error.message}`);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <h1 className='text-3xl font-semibold'>
                Bienvenido
            </h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>
                Ingresa tus datos
            </p>

            <div className='mt-8'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-3'>
                        <label className='text-lg font-medium mt-3 '>Usuario</label>
                        <input
                            type="text"
                            className='w-full  border-2 border-gray-300 rounded-lg p-4 mt-1 bg-transparent'
                            placeholder='Ingresa tu usuario'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <label className='text-lg font-medium '>Contraseña</label>
                        <input
                            type="password"
                            className='w-full  border-2 border-gray-300 rounded-lg p-4 mt-1 bg-transparent'
                            placeholder='Ingresa tu contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {loading && <LoadingIndicator />}
                    <button className="bg-[#151980] w-full font-medium text-base text-center text-white rounded-xl p-5 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-[#1e23ac] mt-6"
                        // onClick={handleNavigation}
                        type="submit"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}