import axios from "axios";

export default class JobSeekersService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/jobseekers/getbyuserid?userId=" + userId)
    }
}