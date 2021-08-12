import axios from "axios";

const apiUrl = "http://localhost:8080/api/usercoverletters"
export default class UserCoverLettersService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    update(userId,letter){
        return axios({
            method:"post",
            url: apiUrl + "/update",
            data:{
                letter:letter,
                userId:userId
            }
        })
    }
}