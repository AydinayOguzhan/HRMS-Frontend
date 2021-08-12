import axios from 'axios'

const apiUrl = "http://localhost:8080/api/userschools"
export default class UserSchoolsService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuseridorderbygraduatedatedesc?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: apiUrl + "/add",
            data: {
                department:params.department,
                graduateDate:params.graduateDate,
                schoolName:params.schoolName,
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
                department:params.department,
                graduateDate:params.graduateDate,
                schoolName:params.schoolName,
                startDate:params.startDate,
                userId:params.userId
            }
        })
    }
}