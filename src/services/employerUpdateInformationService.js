import axios from 'axios'

export default class EmployerUpdateInformationService{
    getAll(){
        return axios.get("http://localhost:8080/api/employerUpdateInformations/getall")
    }

    getByUserId(userId){
        return axios.get("http://localhost:8080/api/employerUpdateInformations/getbyuserid?userId=" + userId)
    }
    
}