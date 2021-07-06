import axios from "axios";

export default class UserCvsService{
    getUserCv(userId){
        return axios.get("http://localhost:8080/api/usercvs/getusercv?userId=" + userId)
    }
}