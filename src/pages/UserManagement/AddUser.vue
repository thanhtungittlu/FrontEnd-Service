<template>
    <div class="content">
        <div class="row">
           
            <div class="add-employee-container">
                <div class="form-add-employee">
                    <h3 style="font-color:black">Quản lý user</h3>
                    <div class="info-employee">
                        <BaseUserInput
                            title="Email"
                            :value="dataInfoUser.email"
                            @phoneNumber="changeInputName"
                        />
                        <BaseUserInput
                            title="Mật khẩu"
                            :value="dataInfoUser.password"
                            @age="changeInputPassword"
                        />
                        <BaseUserInput
                            title="Note"
                            :value="dataInfoUser.note"
                            @age="changeInputNote"
                        />
                        <BaseUserInput
                            title="Số điện thoại"
                            :value="dataInfoUser.note"
                            @age="changeInputNote"
                        />
                        <BaseUserInput
                            title="Cửa hàng quản lý"
                            option="formSelect"
                            :responseGroup="responseGroup"
                            :listData="listGroup"
                            :isRequired="isRequired"
                            @selectedGender="selectedGroup"
                        />
                        <BaseUserInput
                            title="Role"
                            option="formSelect"
                            :responseGroup="responseRole"
                            :listData="listRole"
                            :isRequired="isRequired"
                            @selectedGender="selectedGender"
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
                            @click="redirectEmployeeManage"
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
                email: "",
                password: "",
                note: "",
                listGroup: [],
                role: ""
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
        changeInputName(val) {
            this.dataInfoUser.email = val;
        },
        changeInputPassword(val) {
            this.dataInfoUser.password = val;
        },
        changeInputNote(val) {
            this.dataInfoUser.note = val;
        },
        selectedGroup(val) {
            this.dataInfoUser.listGroup = val;
        },
        addNewUser() {
            console.log("ayoooo: ")
        },

        redirectEmployeeManage() {
            window.location.href = "/#/face-recogition/manage-customer";
        },
    },
    watch: {},
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
</style>
