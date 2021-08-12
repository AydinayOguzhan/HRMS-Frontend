import axios from 'axios'

const apiUrl = "http://localhost:8080/api/workingtimetypes"
export default class WorkingTimeTypeService{
    getAllWorkingTimeTypes(){
        return axios.get( apiUrl + "/getall")
    }
}