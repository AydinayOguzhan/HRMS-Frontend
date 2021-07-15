import axios from 'axios'

export default class UserSchoolsService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/userschools/getbyuseridorderbygraduatedatedesc?userId=" + userId)
    }

    add(params){
        axios({
            method: "post",
            url: "http://localhost:8080/api/userschools/add",
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
        axios({
            method: "post",
            url: "http://localhost:8080/api/userschools/delete",
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