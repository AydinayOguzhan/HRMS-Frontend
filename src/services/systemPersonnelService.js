import axios from 'axios'

export default class SystemPersonnelService{
    getByUserId(userId){
        return axios.get("http://localhost:8080/api/systempersonnels/getbyuserid?userId=" + userId)
    }

    verifyJobAdvertisement(id,verified){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/systempersonnels/verifyjobadvertisement?id=" + id + "&verified=" + verified,
        })
    }

    update(props){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/systempersonnels/update",
            data:{
                userId:props.userId,
                firstName:props.firstName,
                lastName:props.lastName
            }
        })
    }
}