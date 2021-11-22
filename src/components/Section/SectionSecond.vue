<template>
    <div class="row main-employee-table" style="margin-top:5%; background-color: white">
        <h3  class="text-lg-left" style="color:black; padding-top:1%; padding-left:2%">Box list</h3>
        <div class="search-container text-lg-left">
            <img src="/img/loupe.png" />
            <input
                class="base-input"
                placeholder="Nhập tên box"
                @input="debounceInput"
            />
        </div>
        
        <b-table
            id="employee-table"
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
                    @click="getInfoBoxAI(data.item)"
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
</template>

<script>
import _ from "lodash";
export default {
    mounted() {
        console.log(this.$route.query.currentPage)
    },
    methods: {
        debounceInput: _.debounce(function (e) {
            this.filters = e.target.value;
        }, 500),
        getInfoBoxAI(data) {
            this.$router.push({
                name: "Thông tin chi tiết của box",
                params: {
                    id: data.id,
                    data: data.id,
                },
            });
        }
    },
    components: {

    },
    computed: {
        filtered() {
            const filtered = this.items.filter((item) => {
                return Object.keys(this.filters).every(
                    (key) =>
                        String(item["boxName"])
                            .toLowerCase()
                            .includes(this.filters.toLowerCase()) ||
                        String(item["owner"])
                            .toLowerCase()
                            .includes(this.filters.toLowerCase()) || 
                        String(item["ipVPN"])
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
                { id: "1", boxName: "Láng Hạ 1", owner: "Torano", registedDate: "12/12/2020", ipVPN: "10.2.222", status:"online"},
                { id: "2", boxName: "Hàng Ngang 2", owner: "Circle k", registedDate: "12/12/2020", ipVPN: "10.1.232", status:"offline"},
                { id: "3", boxName: "Hàng Cấm", owner: "Vinmart", registedDate: "12/12/2020", ipVPN: "5.2.242", status:"disable"},
                { id: "4", boxName: "Sơn Trà 4", owner: "Soc", registedDate: "12/12/2020", ipVPN: "3.5.542", status:"online"},
                { id: "5", boxName: "Tân Sơn Nhất 1", owner: "SHB bank", registedDate: "12/12/2020", ipVPN: "3.5.142", status:"online"},
                { id: "6", boxName: "Láng Hạ 4", owner: "Torano", registedDate: "12/12/2020", ipVPN: "10.2.222", status:"disable"},
                { id: "7", boxName: "Hàng Ngang 6", owner: "Circle k", registedDate: "12/12/2020", ipVPN: "10.1.232", status:"online"},
                { id: "8", boxName: "Hàng Ngang 7", owner: "Vinmart", registedDate: "12/12/2020", ipVPN: "5.2.242", status:"online"},
                { id: "9", boxName: "Sơn Trà 8", owner: "Soc", registedDate: "12/12/2020", ipVPN: "3.5.542", status:"online"},
                { id: "10", boxName: "Tân Sơn Nhất 9", owner: "SHB bank", registedDate: "12/12/2020", ipVPN: "3.5.142", status:"online"},
                { id: "11", boxName: "Láng Hạ 10", owner: "Torano", registedDate: "12/12/2020", ipVPN: "10.2.222", status:"online"},
                { id: "12", boxName: "Hàng Ngang 12", owner: "Circle k", registedDate: "12/12/2020", ipVPN: "10.1.232", status:"online"},
                { id: "13", boxName: "Hàng Ngang 13", owner: "Vinmart", registedDate: "12/12/2020", ipVPN: "5.2.242", status:"online"},
                { id: "14", boxName: "Sơn Trà 14", owner: "Soc", registedDate: "12/12/2020", ipVPN: "3.5.542", status:"online"},
                { id: "15", boxName: "Tân Sơn Nhất 15", owner: "SHB bank", registedDate: "12/12/2020", ipVPN: "3.5.142", status:"online"},
            ],

            filters: "",
            imageInfo: "./img/icons8-info-48.png",
            imageDelete: "./img/delete.png",
            perPage: 5,
            currentPage: 1,
            totalRows: 15,
            fields: [
                {
                    key: "boxName",
                    label: "Box Name",
                },

                {
                    key: "owner",
                    label: "Owner",
                },

                {
                    key: "registedDate",
                    label: "Registed date",
                },
                {
                    key: "ipVPN",
                    label: "ipVPN",
                },
                {
                    key: "status",
                    label: "Status",
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
.main-employee-table {
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
    #employee-table {
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
