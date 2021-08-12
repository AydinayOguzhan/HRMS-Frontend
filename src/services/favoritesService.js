import axios from 'axios'

const apiUrl = "http://localhost:8080/api/favorites"
export default class FavoritesService{
    add(advertisementId, jobSeekerId){
        return axios({
            method:"post",
            url: apiUrl + "/add",
            data:{
                advertisementId:advertisementId,
                jobSeekerId:jobSeekerId
            }
        })
    }

    delete(id,advertisementId, jobSeekerId){
        return axios({
            method:"post",
            url: apiUrl + "/delete",
            data:{
                id:id,
                advertisementId:advertisementId,
                jobSeekerId:jobSeekerId
            }
        })
    }
}