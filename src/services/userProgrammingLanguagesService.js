import axios from 'axios'

export default class UserProgrammingLanguagesService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/userprogramminglanguages/getbyuserid?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: "http://localhost:8080/api/userprogramminglanguages/add",
            data: {
                programmingLanguageId:params.programmingLanguage,
                userId:params.userId
            }
        })
    }

    delete(params){
        return axios({
            method: "post",
            url: "http://localhost:8080/api/userprogramminglanguages/delete",
            data: {
                id:params.id,
                programmingLanguageId:params.programmingLanguage,
                userId:params.userId
            }
        })
    }
}