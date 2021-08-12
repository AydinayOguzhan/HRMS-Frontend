import axios from 'axios'

const apiUrl = "http://localhost:8080/api/jobadvertisements"
export default class JobAdvertisementService{

    getAllByPage(pageNo, pageSize){
        return axios.get( apiUrl + "/getallbypage?pageNo=" + pageNo + "&pageSize=" + pageSize)
    }

    getTotalPages(pageNo, pageSize){
        return axios.get( apiUrl + "/getTotalPages?pageNo=" + pageNo + "&pageSize=" + pageSize)
    }


    getAllDetail(){
        return axios.get( apiUrl + "/getalldetail")
    }

    getDetailById(jobAdvertisementId){
        return axios.get( apiUrl + "/getdetailbyid?id=" + jobAdvertisementId)
    }

    getAllWithDeadline(deadline){
        return axios.get( apiUrl + "/getallactiveandisapprovedwithdeadline?deadline=" + deadline)
    }

    add(props){
        return axios({
            method:"post",
            url: apiUrl + "/add",
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