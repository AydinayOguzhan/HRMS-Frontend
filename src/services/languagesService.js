import axios from "axios";

const apiUrl = "http://localhost:8080/api/languages"
export default class LanguagesService{
    getAll(){
        return axios.get( apiUrl + "/getall")
    }
}