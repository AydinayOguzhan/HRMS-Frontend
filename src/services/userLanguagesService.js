import axios from 'axios'

export default class UserLanguagesService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/userlanguages/getbyuserid?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: "http://localhost:8080/api/userlanguages/add",
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
            url: "http://localhost:8080/api/userlanguages/delete",
            data: {
                id:params.id,
                languageId:params.languageId,
                level:params.level,
                userId:params.userId
            }
        })
    }
}