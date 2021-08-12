import axios from 'axios'

const apiUrl = "http://localhost:8080/api/employers"
export default class EmployerService{

    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    update(params){
        return axios({
            method:"post",
            url: apiUrl + "/update",
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

    updatePermanently(params){
        return axios({
            method:"post",
            url: apiUrl + "/updatepermanently",
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