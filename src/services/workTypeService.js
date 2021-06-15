import axios from 'axios'

export default class WorkTypeService{
    getAllWorkTypes(){
        return axios.get("http://localhost:8080/api/worktypes/getall")
    }
}