import axios from 'axios'

const apiUrl = "http://localhost:8080/api/jobpositions"
export default class JobPositionService{
    getAllJobPositions(){
        return axios.get( apiUrl + "/getall")
    }

    add(props){
        return axios({
            method:"post",
            url: apiUrl + "/add",
            data:{
               name:props.name
            }
        })
        
    }

    delete(props){
        return axios({
            method:"post",
            url: apiUrl + "/delete",
            data:{
                id:props.id,
               name:props.name
            }
        })
    }
}