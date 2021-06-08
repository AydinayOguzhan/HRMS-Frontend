import axios from 'axios'

export default class JobAdvertisementService{
    getAllActiveJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobadvertisements/getallactive")
    }
}