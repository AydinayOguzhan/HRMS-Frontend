import axios from 'axios'

const apiUrl = "http://localhost:8080/api/worktypes"
export default class WorkTypeService{
    getAllWorkTypes(){
        return axios.get( apiUrl + "/getall")
    }
}