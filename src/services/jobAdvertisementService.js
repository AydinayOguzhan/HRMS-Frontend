import axios from 'axios'

export default class JobAdvertisementService{
    getAllActiveJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobadvertisements/getallbyisactivetrueandisapprovedtrue")
    }

    getAllDetail(){
        return axios.get("http://localhost:8080/api/jobadvertisements/getalldetail")
    }

    add(props){
        axios({
            method:"post",
            url:"http://localhost:8080/api/jobadvertisements/add",
            data:{
                active:true,
                approved:false,
                cityId:props.cityId,
                deadline:props.deadline,
                jobDescription:props.jobDescription,
                jobPositionId:props.jobPositionId,
                maxSalary:props.jobSalary,
                minSalary:props.minSalary,
                maxSalary:props.maxSalary,
                numberOfPosition:props.numberOfPosition,
                userId:4,
                workTypeId:props.workTypeId,
                workingTimeTypeId:props.workingTimeTypeId
            }
        })
    }
}