import axios from 'axios'

const apiUrl = "http://localhost:8080/api/userlanguages"
export default class UserLanguagesService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: apiUrl + "/add",
            data: {
                languageId:params.userLanguage,
                level:params.level,
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
                languageId:params.languageId,
                level:params.level,
                userId:params.userId
            }
        })
    }
}