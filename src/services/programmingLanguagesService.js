import axios from "axios";

export default class ProgrammingLanguagesService{
    getAll(){
        return axios.get("http://localhost:8080/api/programminglanguages/getall")
    }
}