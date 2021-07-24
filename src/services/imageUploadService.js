import axios from "axios";

export default class ImageUploadService {
    getByUserId(userId) {
        return axios.get("http://localhost:8080/api/imageupload/getimagebyuserid?userId=" + userId)
    }

    add(userId, file) {
        const formData = new FormData()
        formData.append("file",file)
        return axios({
            method: "post",
            url: "http://localhost:8080/api/imageupload/saveimage?userId=" + userId,
            data:formData
        })
    }

    delete(userId){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/imageupload/deleteimage?userId=" + userId
        })
    }
}