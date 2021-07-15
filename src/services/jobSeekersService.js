import axios from "axios";

export default class JobSeekersService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/jobseekers/getbyuserid?userId=" + userId)
    }

    add(params){
        axios({
            method: "post",
            url: "http://localhost:8080/api/jobseekers/add",
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
