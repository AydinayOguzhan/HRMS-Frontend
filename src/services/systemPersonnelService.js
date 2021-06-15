import axios from 'axios'

export default class SystemPersonnelService{
    verifyJobAdvertisement(id,verified){
        axios({
            method:"post",
            url:"http://localhost:8080/api/systempersonnels/verifyjobadvertisement?id=" + id + "&verified=" + verified,
        })
    }
}