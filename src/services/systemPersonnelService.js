import axios from 'axios'

const apiUrl = "http://localhost:8080/api/systempersonnels"
export default class SystemPersonnelService{
    getByUserId(userId){
        return axios.get( apiUrl + "/getbyuserid?userId=" + userId)
    }

    verifyJobAdvertisement(id,verified){
        return axios({
            method:"post",
            url: apiUrl + "/verifyjobadvertisement?id=" + id + "&verified=" + verified,
        })
    }

    update(props){
        return axios({
            method:"post",
            url: apiUrl + "/update",
            data:{
                userId:props.userId,
                firstName:props.firstName,
                lastName:props.lastName
            }
        })
    }
}