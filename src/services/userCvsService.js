import axios from "axios";

const apiUrl = "http://localhost:8080/api/usercvs"
export default class UserCvsService{
    getUserCv(userId){
        return axios.get( apiUrl + "/getusercv?userId=" + userId)
    }
}