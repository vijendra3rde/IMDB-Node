import axios from "axios";


export const getMoviesAPI = () => {
    return axios.get(`${process.env.REACT_APP_API_PATH_URL}movies/all`)
}


export const getActorsAPI = () => {
    return axios.get(`${process.env.REACT_APP_API_PATH_URL}actors/all`)
}


export const getProducersAPI = () => {
    return axios.get(`${process.env.REACT_APP_API_PATH_URL}producers/all`)
}


export const postMoviesAPI = (data) => {
    return axios.post(`${process.env.REACT_APP_API_PATH_URL}movies/create`,data)
}

export const postProducersAPI = (data) => {
    return axios.post(`${process.env.REACT_APP_API_PATH_URL}producers/create/`,data)
}

export const postActorsAPI = (data) => {
    return axios.post(`${process.env.REACT_APP_API_PATH_URL}actors/create/`,data)
}


export const putMoviesAPI = (id,data) => {
    return axios.put(`${process.env.REACT_APP_API_PATH_URL}movies/update/${id}`,data)
}