import axios from "axios";

export default class ImageUploadService {
    getByUserId(userId) {
        return axios.get("http://localhost:8080/api/imageupload/getimagebyuserid?userId=" + userId)
    }

    add(userId, file) {
        axios({
            // headers: {"Content-Type":"multipart/form-data"},
            method: "post",
            url: "http://localhost:8080/api/imageupload/saveimage?userId=" + userId,
            data: file
        })
        // axios.post("http://localhost:8080/api/imageupload/saveimage?userId=" + userId,
        //     file,{headers:{'Access-Control-Allow-Headers':"*",'Access-Control-Allow-Methods':"GET, POST, PUT, DELETE, OPTIONS"
        //         ,"Content-Type": "multipart/form-data", "Access-Control-Allow-Origin":"*"}}
        // 
    }
}