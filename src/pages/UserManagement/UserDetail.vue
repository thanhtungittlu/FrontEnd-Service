<template>
    <div class="content">
        <div class="row">
            <div class="col-md-8">
                <card>
                    <template slot="header">
                        <h3 class="card-title"><b>User information</b></h3>
                    </template>
                    <div class="main-box-table">
                        <b-table 
                            id="user-information-table" 
                            class='table borderless' 
                            :items="items">
                            <template v-slot:cell(first_collumn)="data">
                                {{ data.value }}
                            </template>
                            <template v-slot:cell(last_collumn)="data">
                                <div v-if="data.index==1">
                                    <div
                                        v-if="data.value=='Active'"
                                    >
                                        <span class="green-info-dot"></span>
                                        {{ data.value }}
                                    </div>
                                    <div
                                        v-else-if="data.value=='Deactive'"
                                    >
                                    <span class="grey-info-dot"></span>
                                        {{ data.value }}
                                    </div>
                                    <div
                                        v-else
                                    >
                                    <span class="red-info-dot"></span>
                                        {{ data.value }}
                                    </div>
                                </div>
                                <div v-else-if="data.index==6">
                                    <ul id="example-1">
                                        <li v-for="box in data.value" :key="box.name">
                                            <div
                                                v-if="box.status=='Online'"
                                                @click="getInfoBoxAI(box)"
                                            >
                                                <span class="green-info-dot"></span>
                                                {{ box.name }}
                                            </div>
                                            <div
                                                v-else-if="box.status=='Offline'"
                                                @click="getInfoBoxAI(box)"
                                            >
                                            <span class="grey-info-dot"></span>
                                                {{ box.name }}
                                            </div>
                                            <div
                                                v-else
                                                @click="getInfoBoxAI(box)"
                                            >
                                            <span class="red-info-dot"></span>
                                                {{ box.name }}
                                            </div>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <div v-else-if="data.index==7">
                                    <div v-if="data.value===true">
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value=true checked> Enable
                                    </div>
                                    <div v-else>
                                        <input type="checkbox" id="vehicle1" name="vehicle1" value=false> Enable
                                    </div>
                                </div>
                                <div v-else>
                                    {{ data.value }} 
                                </div>
                                
                            </template>
                        </b-table>
                        
                    </div>
                </card>
            </div>
        </div>
        
    </div>
</template>
<script>
import { Card } from "@/components/index";
import axios from 'axios'
export default {
    components: {
        Card,
    },
    data() {
        return {
            url: 'http://192.168.101.51:5000/',
            items: [
                { first_collumn: "USER NAME", last_collumn: "" },
                { first_collumn: "USER STATUS", last_collumn: "Active" },
                { first_collumn: "USER ID", last_collumn: "" },
                { first_collumn: "ROLE", last_collumn: "" },
                { first_collumn: "CONTACT", last_collumn: "" },
                { first_collumn: "NOTE", last_collumn: "" },
                { first_collumn: "BOX", last_collumn: [

                ]},
                { first_collumn: "NOTIFICATION", last_collumn: true },
            ],
        };
    },
    methods: {
        getInfoCamera(data) {
            this.$router.push({
                name: "Thông tin chi tiết của camera",
                params: {
                    id: data.link,
                    data: data.link,
                },
            });
        }
    },
    mounted() {
        this.id = this.$route.params.id
        this.AuthStr =sessionStorage.getItem("token");
        axios
            .get(this.url + "user/" + this.id, { headers: { Authorization: this.AuthStr } })
            .then((response) => {
                this.items[0].last_collumn = response.data.name
                this.items[2].last_collumn = response.data.id
                this.items[3].last_collumn = response.data.role
                this.items[4].last_collumn = response.data.phoneNumber
            })
            .catch((error) => console.log(error));   
    }
};
</script>
<style lang="scss">
.borderless table {
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-bottom-style: none;
}
.main-box-table {
    #user-information-table {
        width: 100%;
        margin-bottom: 1rem;
        margin-left: 1rem;
        color: #495057;
        border-collapse: collapse;
        table-layout: fixed;

        td {
            word-wrap: break-word;
            white-space: normal;
            border: 0;
            // border-collapse: collapse;
            // border-spacing: 0;
            // margin: 0;
            // padding: 0;
        }
        tbody{
            text-align: left;
        }
        thead {
            display: none;
        }

    }

    .pagination-people-table {
        float: right;
    }
}

.main-box-table2 {
    border:1px solid black;
    #user-information-table2 {
        width: 100%;
        margin-bottom: 1rem;
        margin-left: 1rem;
        color: #495057;
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 3px;
        font-size: 15px;
        tr { 
            padding-bottom: 5px;
        }
        td {
            word-wrap: break-word;
            white-space: normal;
            border: 0;
            padding: 2px;
            // border-collapse: collapse;
            // border-spacing: 0;
            // margin: 0;
            // padding: 0;
        }
        tbody{
            text-align: left;
        }
        thead {
            display: none;
        }

    }

    .pagination-people-table {
        float: right;
    }
}
.green-info-dot {
  height: 5%;
  width: 5%;
  background-color: rgb(67, 243, 23);
  padding-top: 5%;
  border-radius: 50%;
  display: inline-block;
}
.grey-info-dot {
  height: 5%;
  width: 5%;
  padding-top: 5%;
  background-color: rgb(120, 128, 118);
  border-radius: 50%;
  display: inline-block;
}
.red-info-dot {
  height: 5%;
  width: 5%;
  padding-top: 5%;
  background-color: rgb(243, 19, 19);
  border-radius: 50%;
  display: inline-block;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.disable-actions {
    display: flex;
    justify-content: left;

    .btn-action {
        margin-left: 3%;
        width: 17%;
        height: 40px;
        border-radius: 10px;
        display: flex;
        cursor: pointer;
        background-color: rgb(243, 19, 19);
        justify-content: center;
        align-items: center;
    }
    


}
</style>