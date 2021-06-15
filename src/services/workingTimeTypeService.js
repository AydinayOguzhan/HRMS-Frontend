import axios from 'axios'

export default class WorkingTimeTypeService{
    getAllWorkingTimeTypes(){
        return axios.get("http://localhost:8080/api/workingtimetypes/getall")
    }
}