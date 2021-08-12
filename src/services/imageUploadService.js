import axios from "axios";

const apiUrl = "http://localhost:8080/api/imageupload"
export default class ImageUploadService {
    getByUserId(userId) {
        return axios.get( apiUrl + "/getimagebyuserid?userId=" + userId)
    }

    add(userId, file) {
        const formData = new FormData()
        formData.append("file",file)
        return axios({
            method: "post",
            url: apiUrl + "/saveimage?userId=" + userId,
            data:formData
        })
    }

    delete(userId){
        return axios({
            method:"post",
            url: apiUrl + "/deleteimage?userId=" + userId
        })
    }
}