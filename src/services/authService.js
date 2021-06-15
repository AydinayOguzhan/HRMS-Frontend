import axios from 'axios'

export default class AuthService{
    login(email,password){
        axios({
            method:"post",
            url:"http://localhost:8080/api/auth/login",
            data:{
                email:email,
                password:password
            }
        })
    }
}