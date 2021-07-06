import axios from "axios";

export default class LanguagesService{
    getAll(){
        return axios.get("http://localhost:8080/api/languages/getall")
    }
}