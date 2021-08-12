import axios from 'axios'

const apiUrl = "http://localhost:8080/api/auth" 
export default class AuthService{

    login(email,password){
        return axios({
            method:"post",
            url: apiUrl + "/login",
            data:{
                email:email,
                password:password
            }
        })
    }
}