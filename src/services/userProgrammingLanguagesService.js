import axios from 'axios'

const apiUrl = "http://localhost:8080/api/userprogramminglanguages"
export default class UserProgrammingLanguagesService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: apiUrl + "/add",
            data: {
                programmingLanguageId:params.programmingLanguage,
                userId:params.userId
            }
        })
    }

    delete(params){
        return axios({
            method: "post",
            url: apiUrl + "/delete",
            data: {
                id:params.id,
                programmingLanguageId:params.programmingLanguage,
                userId:params.userId
            }
        })
    }
}