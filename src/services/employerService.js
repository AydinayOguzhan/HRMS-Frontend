import axios from 'axios'

export default class EmployerService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/employers/getbyuserid?userId=" + userId)
    }

    update(params){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/employers/update",
            data:{
                userId:params.userId,
                approved:params.approved,
                companyName:params.companyName,
                mailVerified:params.mailVerified,
                phoneNumber:params.phoneNumber,
                website:params.website
            }
        })
    }
}