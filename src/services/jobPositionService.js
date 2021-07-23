import axios from 'axios'

export default class JobPositionService{
    getAllJobPositions(){
        return axios.get("http://localhost:8080/api/jobpositions/getall")
    }

    add(props){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/jobpositions/add",
            data:{
               name:props.name
            }
        })
        
    }

    delete(props){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/jobpositions/delete",
            data:{
                id:props.id,
               name:props.name
            }
        })
    }
}