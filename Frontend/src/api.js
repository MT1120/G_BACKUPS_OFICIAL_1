import axios from "axios"


import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const getAllTapesByDate= (gte, lte) => api.get(`/api/tapes/?used_at__gte=${gte}&used_at__lte=${lte}`);
export const getAllBackupsByDate= (gte, lte) => api.get(`/api/backups/?used_at__gte=${gte}&used_at__lte=${lte}`);
export const getAllTapesTypesByDate= (gte, lte) => api.get(`/api/tapetypes/?created_at__gte=${gte}&created_at__lte=${lte}`);
export const getAllCloudsByDate= (gte, lte) => api.get(`/api/clouds/?used_at__gte=${gte}&used_at__lte=${lte}`);
export const getAllCloudBackupsByDate= (gte, lte) => api.get(`/api/cloudBackup/?used_at__gte=${gte}&used_at__lte=${lte}`);

export const getAllElementsByDate= (gte, lte) => api.get(`/api/element/?created_at__gte=${gte}&created_at__lte=${lte}`);
export const getAllInfCopiedByDate= (gte, lte) => api.get(`/api/copiedInf/?created_at__gte=${gte}&created_at__lte=${lte}`);
export const getAllRecoverTapeByDate= (gte, lte) => api.get(`/api/recoverTape/?created_at__gte=${gte}&created_at__lte=${lte}`);
export const getAllSendHTapeByDate= (gte, lte) => api.get(`/api/sendTape/?created_at__gte=${gte}&created_at__lte=${lte}`);
export const getAllSupportedSByDate= (gte, lte) => api.get(`/api/ssp/?created_at__gte=${gte}&created_at__lte=${lte}`);


export const getAllCloudBackups = () => api.get("/api/cloudBackup/");
export const deleteCloudBackups = (id) => api.delete(`/api/cloudBackup/${id}`);
export const updateCloudBackups = (id, data) => api.put(`/api/cloudBackup/${id}/`, data);
export const getCloudBackups = (id) => api.get(`/api/cloudBackup/${id}`);

export const getAllClouds = () => api.get("/api/clouds/");
export const deleteClouds = (id) => api.delete(`/api/clouds/${id}`);
export const updateClouds = (id, data) => api.put(`/api/clouds/${id}/`, data);
export const getClouds = (id) => api.get(`/api/clouds/${id}`);

export const getAllBackups = () => api.get("/api/backups/");
export const deleteBackups= (id) => api.delete(`/api/backups/${id}`);
export const updateBackups= (id, data) => api.put(`/api/backups/${id}/`,data);
export const getBackup= (id) => api.get(`/api/backups/${id}`);

export const getAllTapes = () => api.get("/api/tapes/");
export const deleteTape = (id) => api.delete(`/api/tapes/${id}/`);
export const updateTape= (id, data) => api.put(`/api/tapes/${id}/`,data);
export const getTape= (id) => api.get(`/api/tapes/${id}`);

export const getAllTapesTypes = () => api.get("/api/tapetypes/");
export const deleteTapesTypes = (id) => api.delete(`/api/tapetypes/${id}`);
export const updateTapesTypes= (id, data) => api.put(`/api/tapetypes/${id}/`,data);
export const getTapesTypes= (id) => api.get(`/api/tapetypes/${id}`);


export const getAllElements = ()=> api.get("/api/element/");
export const deleteElements = (id) => api.delete(`/api/element/${id}`);
export const updateElements= (id, data) => api.put(`/api/element/${id}/`,data);
export const getElements= (id) => api.get(`/api/element/${id}`);

export const getAllInfCopied = ()=> api.get("/api/copiedInf/");
export const deleteInfCopied = (id) => api.delete(`/api/copiedInf/${id}`);
export const updateInfCopied = (id, data) => api.put(`/api/copiedInf/${id}/`, data);
export const getInfCopied = (id) => api.get(`/api/copiedInf/${id}`);

export const getAllRecoverTape = () => api.get("/api/recoverTape/");
export const deleteRecoverTape = (id) => api.delete(`/api/recoverTape/${id}`);
export const updateRecoverTape = (id, data) => api.put(`/api/recoverTape/${id}/`, data);
export const getRecoverTape = (id) => api.get(`/api/recoverTape/${id}`);

export const getAllSendHTape = () => api.get("/api/sendTape/");
export const deleteSendHTape = (id) => api.delete(`/api/sendTape/${id}`);
export const updateSendHTape = (id, data) => api.put(`/api/sendTape/${id}/`, data);
export const getSendHTape = (id) => api.get(`/api/sendTape/${id}`);

//export const getAllStorage = () => api.get("/api/storage/");


export const getAllSupportedS = () => api.get("/api/ssp/")
export const deleteSupportedS = (id) => api.delete(`/api/ssp/${id}`);
export const updateSupportedS = (id, data) => api.put(`/api/ssp/${id}/`, data);
export const getSupportedS = (id) => api.get(`/api/ssp/${id}`);

export const getAllFrecuencies = () => api.get("/api/frecuency/");
export const deleteFrecuencies= (id) => api.delete(`/api/frecuency/${id}`);
export const updateFrecuencies = (id, data) => api.put(`/api/frecuency/${id}/`, data);
export const getFrecuencies = (id) => api.get(`/api/frecuency/${id}`);



export default api