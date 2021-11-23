<template>
    <div class="login">
        <div class="account-login">
            <h1>Account Login</h1>
            <form action="" class="login-form">
                <div class="form-group">
                    <input v-model="loginEmail" type="text" placeholder="Email" class="form-control">
                </div>
                <div class="form-group">
                    <input v-model="loginPassword" type="password" placeholder="Password"  class="form-control">
                </div>
                <button class="btn" @click="login">Login</button>

                <div class="option-footer">
                    <a href="#" class="pull-left ">Sign Up</a>
                    <a href="#" class="pull-right ">Forgot Password?</a>
                </div>  
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import LoginSuccess from '../Notifications/LoginSuccess.vue';
import LoginFailed from '../Notifications/LoginFailed.vue';


export default {
data () {
    return {
        loginEmail: null,
        loginPassword: null,
        admins: null,
        login_ :{
        "email" : "",
        "password" : "",
        },
        url: 'http://192.168.101.51:5000/',
        }
},   
methods: {
    login(){
        this.login_.email = this.loginEmail;
        this.login_.password = this.loginPassword;
        axios
            .post(this.url + "login",this.login_)
            .then((response) => {
            sessionStorage.setItem('token', response.data.access_token);    
            this.$router.push("/")
            this.$notify({
                component: LoginSuccess,
                verticalAlign: "top",
                horizontalAlign: "right",
                icon: "tim-icons icon-bell-55",
                type: "info" ,
                // type:["","info","success","warning","danger"],
                timeout: 2000 // Tính theo mls
            });
            })
            .catch(error => {
                this.$notify({
                    component: LoginFailed,
                    verticalAlign: "top",
                    horizontalAlign: "right",
                    icon: "tim-icons icon-bell-55",
                    type: "danger" ,
                    // type:["","info","success","warning","danger"],
                    timeout: 2000 // Tính theo mls
                });
            }) 
    },
},
mounted () {
    
    }
}
</script>

<style type="text/css">
    * {
    margin: 0px;
    padding: 0px;
    }
    .login {
    background: linear-gradient(to bottom, #0099ff 0%, #fff 100%);
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    }
    .login .account-login {
    width: 500px;
    }
    .login .form-control:focus {
    box-shadow: none;
    }
    .login p a {
    padding-left: 2px;
    }
    .login .account-login h1 {
    font-size: 25px;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 5px;
    }
    .login .login-form input {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #a39e9e;
    padding: 0;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    box-shadow: none;
    height: 63px;
    border-radius: 0px;
    }
    .login .login-form {
    background: #fff;
    float: left;
    width: 100%;
    padding: 40px;
    border-radius: 5px;
    }
    .login button.btn {
    width: 100%;
    background: #009cff;
    font-size: 20px;
    padding: 11px;
    color: #fff;
    border: 0px;
    margin: 10px 0px 20px;
    }
    .login .btn:hover{
    background-image: linear-gradient(to bottom left, #40d1eb, #40d1eb, #40d1eb) !important;
    color: #fff;
    opacity: 0.8;
    }
    .login p {
    float: left;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #000;
    margin-bottom: 0px;
    }
    .login .option-footer {
    float: left;
    width: 100%;
    margin: 10px 0 0;
    }
    /* Customize the label (the container) */
    .login .custom-checkbox {
    display: block;
    position: relative;
    padding-left: 27px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 13px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: normal;
    padding-top: 2px;
    float: left;
    }
    /* Hide the browser's default checkbox */
    .login .custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    }
    /* Create a custom checkbox */
    .login .custom-checkbox .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #bfbcbc;
    }
    /* On mouse-over, add a grey background color */
    .login .custom-checkbox:hover input ~ .checkmark {
    background-color: #747474;
    }
    /* When the checkbox is checked, add a blue background */
    .login .custom-checkbox input:checked ~ .checkmark {
    background-color: #2196F3;
    }
    /* Create the checkmark/indicator (hidden when not checked) */
    .login .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    }
    /* Show the checkmark when checked */
    .login .custom-checkbox input:checked ~ .checkmark:after {
    display: block;
    }
    /* Style the checkmark/indicator */
    .login .custom-checkbox .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    }
    @media (max-width: 767px){
    .login .account-login {
    width: 90%;
    }
    }

</style>