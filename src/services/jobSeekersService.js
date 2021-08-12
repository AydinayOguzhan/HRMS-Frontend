import axios from "axios";

const apiUrl = "http://localhost:8080/api/jobseekers"
export default class JobSeekersService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: apiUrl + "/add",
            data: {
                dateOfBirth:params.dateOfBirth,
                firstName:params.firstName,
                lastName:params.lastName,
                nationalityId:params.nationalityId,
                userId:params.userId,
                verified:params.verified
            }
        })
    }
}
