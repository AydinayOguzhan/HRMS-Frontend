import axios from "axios";

export default class UserCoverLettersService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/usercoverletters/getbyuserid?userId=" + userId)
    }

    update(userId,letter){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/usercoverletters/update",
            data:{
                letter:letter,
                userId:userId
            }
        })
    }
}