import axios from 'axios'

export default class UserJobExperiencesService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/userjobexperiences/getbyuseridorderbyquitdatedesc?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: "http://localhost:8080/api/userjobexperiences/add",
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
            url: "http://localhost:8080/api/userjobexperiences/delete",
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