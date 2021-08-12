import axios from 'axios'

const apiUrl = "http://localhost:8080/api/userjobexperiences"
export default class UserJobExperiencesService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuseridorderbyquitdatedesc?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url:  apiUrl + "/add",
            data: {
                companyName:params.companyName,
                position:params.position,
                quitDate:params.quitDate,
                startDate:params.startDate,
                userId:params.userId
            }
        })
    }

    delete(params){
        return axios({
            method: "post",
            url: apiUrl + "/delete",
            data: {
                id:params.id,
                companyName:params.companyName,
                position:params.position,
                quitDate:params.quitDate,
                startDate:params.startDate,
                userId:params.userId
            }
        })
    }
}