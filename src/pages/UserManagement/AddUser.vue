<template>
    <div class="content">
        <div class="row">
           
            <div class="add-employee-container">
                <div class="form-add-employee">
                    <h3 style="font-color:black">Thêm User</h3>
                    <div class="info-employee">
                        <BaseUserInput
                            title="Email(*)"
                            type="email"
                            :responseEmail="responseEmail"
                            @valueGender="valueEmail"                
                        />

                        <BaseUserInput
                            title="Mật khẩu(*)"
                            type="password"
                            :responsePassword="responsePassword"
                            @valueGender="valuePassword"  
                        /> 
                        <BaseUserInput
                            title="Name"
                            :responseName="responseName" 
                            @valueGender="valueName"  
                        />
                        <BaseUserInput
                            title="Số điện thoại"
                            :responsePhonenumber="responsePhonenumber" 
                            @valueGender="valuePhonenumber"  
                        />
                        <BaseUserInput
                            title="Note"
                            :responseNote="responseNote" 
                            @valueGender="valueNote"  
                        />
                        
                        <BaseUserInput
                            title="ApiUrl"
                            :responseUrl="responseUrl" 
                            @valueGender="valueUrl"  
                        />
                        <BaseUserInput
                            title="Cửa hàng quản lý"
                            option="formSelect"
                            :responseGroup="responseGroup"
                            @selectedGender="selectedGroup"
                            :listData="listGroup"
                            :isRequired="isRequired"
                            
                        />
                        <BaseUserInput
                            title="Role"
                            option="formSelect"
                            :responseRole="responseRole"
                             @selectedGender="selectedRole"
                            :listData="listRole"
                            :isRequired="isRequired"   
                        />
                        
                    </div>
                    <div class="action-add-employee">
                        <div
                            class="btn-employee btn-add-employee"
                            v-if="
                                dataInfoUser.id == '' || dataInfoUser.id == undefined
                            "
                            @click="addNewUser"
                        >
                            Thêm hồ sơ
                        </div>
                        <div
                            class="btn-employee btn-cancel-employee"
                            @click="redirectUserManage"
                        >
                            Hủy bỏ
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import { BaseUserInput } from "@/components";
import AddUserSuccess from '../Notifications/UserManage/AddUserSuccess.vue';
import EmailFailed from '../Notifications/UserManage/EmailFailed.vue';
import PasswordFailed from '../Notifications/UserManage/PasswordFailed.vue';
import PhoneNumberFailed from '../Notifications/UserManage/PhoneNumberFailed.vue';
import RoleFailed from '../Notifications/UserManage/RoleFailed.vue';

import axios from 'axios';

const defaultImageSource = "./img/user.png";

export default {
    components: {
        BaseUserInput,
    },

    data() {
        return {
            listGroup: ["cửa hàng 1", "cửa hàng 2"],
            listRole: ["boss", "manager"],
            responseGroup: "",
            responseRole: "",
            
            dataInfoUser: {
                name: "",
                email: "",
                password: "",
                phoneNumber: "",
                apiURL:"",
                note: "",
                listGroup: "",
                role: "",
            },

            idUser: localStorage.getItem("idUser"),
            AVATAR_PICKER_ID: "avatar-file-picker",
            avatarEmp: defaultImageSource,
            isSearch: true,
            

        };
    },
    created() {
        this.fetchData();
    },

    methods: {
        valueEmail(val) {
            this.dataInfoUser.email = val;
        },
        valuePassword(val) {
            this.dataInfoUser.password = val;
        },
        valueName(val) {
            this.dataInfoUser.name = val;
        },
        valuePhonenumber(val) {
            this.dataInfoUser.phoneNumber = val;
        },
        valueNote(val) {
            this.dataInfoUser.note = val;
        },
        valueUrl(val) {
            this.dataInfoUser.apiURL = val;
        },
        selectedGroup(val) {
            this.dataInfoUser.listGroup = val;
        },
        selectedRole(val) {
            this.dataInfoUser.role = val;
        },

        checkErrorEmail() {
            var regexName =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
            if (!regexName.test(this.dataInfoUser.email.trim())) {
                return true; // Có lỗi
            } else {
                return false; // Không lỗi
            }
        },
        checkErrorPassword() { 
            if (this.dataInfoUser.password.trim() == "") { // Không được rỗng
                return true; // Có lỗi
            } else {
                return false; // Không lỗi
            }
        },
        checkErrorPhonenumber() {
            var regexName = /^[0-9]{0,12}$/; // là số từ 0-12 ký tự
            if (
                !regexName.test(this.dataInfoUser.phoneNumber.replace(/\s/g, ""))
            ) {
                return true; // Có lỗi
            } else {
                return false; // Không có lỗi
            }
        },
        checkErrorRole() { 
            if (this.dataInfoUser.role.trim() == "") { // Không được rỗng
                return true; // Có lỗi
            } else {
                return false; // Không lỗi
            }
        },
        checkErrorInput() {
            if (
                this.checkErrorPassword() == false &&
                this.checkErrorEmail() == false &&
                this.checkErrorPhonenumber() == false&&
                this.checkErrorRole() == false
            ) {
                return false; // tất cả không có lỗi thì trả về không lỗi
            }
            return true;
        },


        addNewUser() {
            if (this.checkErrorInput() == false) { // Nếu không có lỗi thì thêm vào DB        
                axios
                    .post(this.$store.state.url + "insert", this.dataInfoUser , { headers: { Authorization: this.AuthStr } })
                    .then((response) => {
                        this.$router.push("/user-manage");
                        this.$notify({
                            component: AddUserSuccess,
                            verticalAlign: "top",
                            horizontalAlign: "right",
                            icon: "tim-icons icon-bell-55",
                            type: "success" ,
                            // type:["","info","success","warning","danger"],
                            timeout: 3000 // Tính theo mls
                        });
                    })
                    .catch((error) => {
                        alert(error);
                    });

            } else {
                if (this.checkErrorPassword() == true) {
                    this.$notify({
                        component: PasswordFailed,
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        icon: "tim-icons icon-bell-55",
                        type: "danger" ,
                        // type:["","info","success","warning","danger"],
                        timeout: 4000 // Tính theo mls
                    });
                }
                if (this.checkErrorEmail() == true) {
                    this.$notify({
                        component: EmailFailed,
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        icon: "tim-icons icon-bell-55",
                        type: "danger" ,
                        // type:["","info","success","warning","danger"],
                        timeout:4000 // Tính theo mls
                    });
                }
                if (this.checkErrorPhonenumber() == true) {
                    this.$notify({
                        component: PhoneNumberFailed,
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        icon: "tim-icons icon-bell-55",
                        type: "danger" ,
                        // type:["","info","success","warning","danger"],
                        timeout: 4000 // Tính theo mls
                    });
                }
                if (this.checkErrorRole() == true) {
                    this.$notify({
                        component: RoleFailed,
                        verticalAlign: "top",
                        horizontalAlign: "center",
                        icon: "tim-icons icon-bell-55",
                        type: "danger" ,
                        // type:["","info","success","warning","danger"],
                        timeout: 4000 // Tính theo mls
                    });
                }
            }
        },
        redirectUserManage() {
            window.location.href = "/user-manage";
        },
    },
    watch: {},
    mounted() {
        this.AuthStr =sessionStorage.getItem("token");
    }
};
</script>

<style lang="scss">
.add-employee-container {
    width: 50%;
    margin: 0 auto;
    padding: 30px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-direction: column;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    .pick-avatar-employee {
        .avatar-employee-container {
            width: 100px;
            height: 100px;
            margin-bottom: 10px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .button {
            color: white;
            font-size: 16px;
            background: #3fb37f;
            cursor: pointer;
            transition: background 0.5s;
            font-family: Open Sans, Arial;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            border-radius: 10px;

            &:hover {
                background: #38d890;
            }
            input {
                width: 100%;
                height: 100%;
                display: none;
            }
        }
    }

    .form-add-employee {
        height: auto;
        padding: 40px 0 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .info-employee {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .form-container-right {
                width: 40%;
            }
        }

        .action-add-employee {
            display: flex;
            justify-content: center;
            gap: 40px;

            .btn-employee {
                width: auto;
                height: auto;
                border: 1px solid transparent;
                margin-top: 20px;
                padding: 10px;
                border-radius: 10px;
                font-size: 14px;
                cursor: pointer;
            }

            .btn-add-employee {
                background-color: #3fb37f;
                color: white;

                &:hover {
                    background: #38d890;
                }
            }

            .btn-cancel-employee {
                border-color: #707070;
            }
        }
    }
}
.add-employee-container h3 {
    color: #000 !important;
}
</style>
