import axios from 'axios'

const apiUrl = "http://localhost:8080/api/employerUpdateInformations"
export default class EmployerUpdateInformationService{
    getAll(){
        return axios.get( apiUrl + "/getall")
    }

    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }
    
}