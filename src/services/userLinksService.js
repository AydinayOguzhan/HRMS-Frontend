import axios from 'axios'

export default class UserLinksService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/userlinks/getbyuserid?userId=" + userId)
    }

    add(params){
        axios({
            method: "post",
            url: "http://localhost:8080/api/userlinks/add",
            data: {
                link:params.link,
                userId:params.userId
            }
        })
    }

    delete(params){
        axios({
            method: "post",
            url: "http://localhost:8080/api/userlinks/delete",
            data: {
                id:params.id,
                link:params.link,
                userId:params.userId
            }
        })
    }
}