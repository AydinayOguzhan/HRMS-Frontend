import axios from 'axios'

const apiUrl = "http://localhost:8080/api/cities"
export default class CitiesService{
    getAllCities(){
        return axios.get( apiUrl + "/getall")
    }
}