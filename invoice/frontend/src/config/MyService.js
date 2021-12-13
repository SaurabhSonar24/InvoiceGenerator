import axios from 'axios'
import { MAIN_URL } from './Url'


export function getPosts() {
    return axios.get(`${MAIN_URL}fetch`);
}
export function getinvoice() {
    return axios.get(`${MAIN_URL}fetch_invoice_data`);
}
export function login(data){
    return axios.post(`${MAIN_URL}login`,data);
}