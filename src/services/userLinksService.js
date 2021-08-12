import axios from 'axios'

const apiUrl = "http://localhost:8080/api/userlinks"
export default class UserLinksService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    add(params){
        return axios({
            method: "post",
            url: apiUrl + "/add",
            data: {
                link:params.link,
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
                link:params.link,
                userId:params.userId
            }
        })
    }
}