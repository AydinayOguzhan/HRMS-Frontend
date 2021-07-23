import axios from 'axios'

export default class FavoritesService{
    add(advertisementId, jobSeekerId){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/favorites/add",
            data:{
                advertisementId:advertisementId,
                jobSeekerId:jobSeekerId
            }
        })
    }

    delete(id,advertisementId, jobSeekerId){
        return axios({
            method:"post",
            url:"http://localhost:8080/api/favorites/delete",
            data:{
                id:id,
                advertisementId:advertisementId,
                jobSeekerId:jobSeekerId
            }
        })
    }
}