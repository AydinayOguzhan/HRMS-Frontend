import axios from 'axios'

export default class JobAdvertisementService{

    getAllByPage(pageNo, pageSize){
        return axios.get("http://localhost:8080/api/jobadvertisements/getallbypage?pageNo=" + pageNo + "&pageSize=" + pageSize)
    }

    getTotalPages(pageNo, pageSize){
        return axios.get("http://localhost:8080/api/jobadvertisements/getTotalPages?pageNo=" + pageNo + "&pageSize=" + pageSize)
    }


    getAllDetail(){
        return axios.get("http://localhost:8080/api/jobadvertisements/getalldetail")
    }

    getDetailById(jobAdvertisementId){
        return axios.get("http://localhost:8080/api/jobadvertisements/getdetailbyid?id=" + jobAdvertisementId)
    }

    getAllWithDeadline(deadline){
        return axios.get("http://localhost:8080/api/jobadvertisements/getallactiveandisapprovedwithdeadline?deadline=" + deadline)
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
                numberOfPosition:props.numberOfPosition,
                userId:4,
                workTypeId:props.workTypeId,
                workingTimeTypeId:props.workingTimeTypeId
            }
        })
    }
}