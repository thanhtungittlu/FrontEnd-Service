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
                    placeholder="Nhập tên user"
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
                        v-if="data.value=='online'"
                    >
                        <span class="green-dot"></span>
                        {{ data.value }}
                    </div>
                    <div
                        v-else-if="data.value=='offline'"
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
import { InfoCard } from "@/components";
import _ from "lodash";
export default {
    methods: {
        debounceInput: _.debounce(function (e) {
            this.filters = e.target.value;
        }, 500),
        getInfoUser(data) {
            this.$router.push({
                name: "Thông tin chi tiết của user",
                params: {
                    id: data.id,
                    data: data.id,
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
                        String(item["userName"])
                            .toLowerCase()
                            .includes(this.filters.toLowerCase()) ||
                        String(item["userEmail"])
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
            items: [
                { id: "1", userName: "Thành", userEmail: "thanh@cxview.ai", role: "manager", box: "1"},
                { id: "2", userName: "Hoàng", userEmail: "hoang@cxview.ai", role: "manager", box: "2"},
                { id: "3", userName: "Hùng", userEmail: "hung@cxview.ai", role: "manager", box: "3"},
                { id: "4", userName: "Hiền", userEmail: "hien@cxview.ai", role: "manager", box: "4"},
                { id: "5", userName: "Thái", userEmail: "thai@cxview.ai", role: "manager", box: "5"},
                { id: "6", userName: "Khoa", userEmail: "khoa@cxview.ai", role: "manager", box: "6"},
                { id: "7", userName: "Tân", userEmail: "tan@cxview.ai", role: "manager", box: "7"},
                { id: "8", userName: "Tùng", userEmail: "tung@cxview.ai", role: "manager", box: "8"},
                { id: "9", userName: "Minh", userEmail: "minh@cxview.ai", role: "manager", box: "9"},
                { id: "10", userName: "Nam", userEmail: "nam@cxview.ai", role: "manager", box: "10"},
                { id: "11", userName: "Hải", userEmail: "hai@cxview.ai", role: "manager", box: "11"},
                { id: "12", userName: "Linh", userEmail: "linh@cxview.ai", role: "manager", box: "12"},
                { id: "13", userName: "Trang", userEmail: "trang@cxview.ai", role: "manager", box: "13"},
                { id: "14", userName: "Sơn", userEmail: "son@cxview.ai", role: "manager", box: "14"},
                { id: "15", userName: "Trung", userEmail: "trung@cxview.ai", role: "manager", box: "15"},
            ],
            filters: "",
            imageInfo: "./img/icons8-info-48.png",
            imageDelete: "./img/delete.png",
            perPage: 5,
            currentPage: 1,
            totalRows: 15,
            fields: [
                {
                    key: "userName",
                    label: "user name",
                },

                {
                    key: "userEmail",
                    label: "Owner",
                },

                {
                    key: "role",
                    label: "role",
                },
                {
                    key: "box",
                    label: "box",
                },
                {
                    key: "action",
                    label: "action", 
                }
            ],
        };
    },
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