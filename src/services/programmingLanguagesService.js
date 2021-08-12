import axios from "axios";

const apiUrl = "http://localhost:8080/api/programminglanguages"
export default class ProgrammingLanguagesService{
    getAll(){
        return axios.get( apiUrl + "/getall")
    }
}