<template>
    <div class="content">
        <div class="row main-user-table" style="margin-top:5%; background-color: white">
            <div class="row">
                <div class="col-md-6">
                    <h3 class="text-lg-left" style="color:black; padding-top:1%; padding-left:2%">User list</h3>
                </div>
                <div class="col-md-6">
                    <b-button class="text-lg-right" style="margin-left:80%; margin-top:3%" @click="createUser">Create user</b-button>
                </div>
            </div>
            <div class="search-container text-lg-left">
                <img src="/img/loupe.png" />
                <input
                    class="base-input"
                    placeholder="Nhập tên email hoặc role"
                    @input="debounceInput"
                />
            </div>
            
            <b-table
                id="user-table"
                :items="filtered"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                show-empty
                hover
            >
                <template v-slot:cell(boxName)="data">
                    {{ data.value }}
                </template>

                <template v-slot:cell(owner)="data">
                    <div class="guest-name" :title="data.value">
                        {{ data.value }}
                    </div>
                </template>

                <template v-slot:cell(registedDate)="data">
                    {{ data.value }}
                </template>

                <template v-slot:cell(ipVPN)="data">
                    {{ data.value }}
                </template>

                <template v-slot:cell(status)="data">
                    <div
                        v-if="data.value == true "
                    >
                        <span class="green-dot"></span>
                        {{ data.value }}
                    </div>
                    <div
                        v-else-if="data.value== false "
                    >
                       <span class="grey-dot"></span>
                        {{ data.value }}
                    </div>
                    <div
                        v-else
                    >
                       <span class="red-dot"></span>
                        {{ data.value }}
                    </div>
                    
                </template>
                <template v-slot:cell(action)="data">
                <div class="manage-employee-actions">
                    <div
                        class="btn-action"
                        @click="getInfoUser(data.item)"
                    >
                        <img :src="imageInfo" />
                    </div>
                </div>
            </template>
            </b-table>

            <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                ref="pagination"
                :per-page="perPage"
                class="pagination-people-table"
                aria-controls="my-table"
            >
                <template #page="{ page, active }">
                    <b v-if="active">{{ page }}</b>
                    <i v-else>{{ page }}</i>
                </template>
            </b-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { InfoCard } from "@/components";
import _ from "lodash";
export default {
    methods: {
        debounceInput: _.debounce(function (e) {
            this.filters = e.target.value;
        }, 500),

        getInfoUser(data) {
            console.log(data.id);
            this.$router.push({
                name: "Thông tin chi tiết của user",
                params: {
                    id: data.id
                },
            });
        },

        createUser() {
            this.$router.push({
                name: "Tạo user",
            });
        }
    },
    components: {
        InfoCard,
    },
    computed: {
        filtered() {
            const filtered = this.items.filter((item) => {
                return Object.keys(this.filters).every(
                    (key) =>
                        String(item["email"])
                            .toLowerCase()
                            .includes(this.filters.toLowerCase()) ||
                        String(item["role"])
                            .toLowerCase()
                            .includes(this.filters.toLowerCase())
                );
            });
            return filtered.length > 0 ? filtered : null;
        },
        
    },
    watch: {
        filtered(val) {
            console.log("totalRows: ", val.length)
            if (val == null) {
                this.totalRows = 0;
            }
            this.totalRows = val.length;
        },
    },
    data() {
        return {
            url: 'http://192.168.101.51:5000/',
            // items: [
            //     { id: "1", email: "thanh@cxview.ai",  boxNumber: "1", role: "boss", status: "true"} ,
            //     { id: "2", email: "hoang@cxview.ai",  boxNumber: "2", role: "boss", status: "false"} ,
            // ],
            items: [],
            filters: "",
            imageInfo: "./img/icons8-info-48.png",
            imageDelete: "./img/delete.png",
            perPage: 5,
            currentPage: 1,
            totalRows: 15,
            fields: [
                {
                    key: "email",
                    label: "Email",
                },

                {
                    key: "boxNumber",
                    label: "Box Number",
                },

                {
                    key: "role",
                    label: "role",
                },
                {
                    key: "status",
                    label: "Status",
                },
                { 
                    key: "action",
                    label: "Action",
                },

            ],
        };
    },
    mounted() {
        this.AuthStr =sessionStorage.getItem("token");
        axios
            .get(this.url + "users", { headers: { Authorization: this.AuthStr } })
            .then((response) => {
                this.items= response.data
                
            })
            .catch((error) => console.log(error));
    }
};
</script>

<style lang="scss">
.green-dot {
  height: 10px;
  width: 10px;
  padding-top: 5%;
  background-color: rgb(67, 243, 23);
  border-radius: 50%;
  display: inline-block;
}
.grey-dot {
  height: 10px;
  width: 10px;
  padding-top: 5%;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.red-dot {
  height: 10px;
  width: 10px;
  padding-top: 5%;
  background-color: rgb(243, 19, 19);
  border-radius: 50%;
  display: inline-block;
}
input:focus {
    outline: none,
}
.main-user-table {
    .search-container {
        width: 25%;
        border: 2px solid #eaeaea;
        border-radius: 10px;
        padding: 8px;
        background-color: white;
        display: flex;
        align-items: center;
        position: relative;
        margin: 20px;
        gap: 10px;

        .base-input {
            width: 100%;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-size: 15px;
            border: none !important;
            // border-color: transparent;
        }
        img {
            width: 20px;
            height: 20px;
        }
        .date-range-attendance {
            position: absolute;
            top: 100%;
        }
    }
    #user-table {
        width: 100%;
        margin-bottom: 1rem;
        margin-left: 1rem;
        color: #495057;
        border-collapse: collapse;
        table-layout: fixed;

        td {
            word-wrap: break-word;
            white-space: normal;
        }

        thead td {
            cursor: default;
            text-align: center;
        }

        
        thead tr th:nth-child(1) {
            width: 16%;
            text-align: left;
        }

        thead tr th:nth-child(2),
        tr td:nth-child(2) {
            width: 20%;
            text-align: left;
        }
        thead tr th:nth-child(3),
        tr td:nth-child(3) {
            width: 16%;
            text-align: left;
        }

        thead tr th:nth-child(4) {
            width: 16%;
            text-align: left;
        }

        thead tr th:nth-child(5) {
            width: 16%;
            text-align: left;
        }

        thead tr th:nth-child(6) {
            width: 16%;
            text-align: left;
        }

        tbody td {
            text-align: left;
            .profile-image {
                margin: auto;
            }
            .manage-employee-actions {
                display: flex;
                gap: 15px;
                justify-content: left;

                .btn-action {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    cursor: pointer;

                    justify-content: left;
                    align-items: left;
                }

            }
        }
    }

    .pagination-people-table {
        float: right;
    }
}
</style>