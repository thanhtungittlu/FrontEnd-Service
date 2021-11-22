<template>
    <div class="content">
        <div class="row">
            <div class="col-md-8">
                <card>
                    <template slot="header">
                        <h3 class="card-title"><b>Camera information</b></h3>
                    </template>
                    <div class="main-box-table">
                        <b-table 
                            id="box-information-table" 
                            class='table borderless' 
                            :items="items">
                            <template v-slot:cell(first_collumn)="data">
                                {{ data.value }}
                            </template>
                            <template v-slot:cell(last_collumn)="data">
                                <div v-if="data.index==3">
                                    <div
                                        v-if="data.value=='Online'"
                                    >
                                        <span class="green-info-dot"></span>
                                        {{ data.value }}
                                    </div>
                                    <div
                                        v-else-if="data.value=='Offline'"
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
                    <div style="margin-left: 3%;">
                        <img :src="cameraImage">
                    </div>
                    <div class="disable-actions" style="padding-top:5%">
                        
                        <div
                        class="btn-action"
                            @click="deleteTable()"
                        >
                            <p style="color:white; padding-top:10%"><b>Disable Camera</b></p>
                        </div>
                    </div>
                </card>
            </div>
            <div class="col-md-4">
                <card>
                    <template slot="header">
                        <h3 class="card-title"><b>Logs</b></h3>
                    </template>
                    <div>
                        <div v-for="logs in logItems" :key="logs.message" >
                            <div class="main-box-table2">
                                <b-table 
                                    id="box-information-table2" 
                                    class='table borderless' 
                                    :items="logs">
                                    <template v-slot:cell(first_collumn)="data">
                                        {{ data.value }}
                                    </template>
                                </b-table>
                            </div>
                            <br>
                        </div>
                        
                    </div>
                </card>
            </div>
        </div>
        
    </div>
</template>
<script>
import { Card } from "@/components/index";

export default {
    components: {
        Card,
    },
    data() {
        return {
            cameraImage: "./img/thanhdeptrai.jpg",
            items: [
                { first_collumn: "CAMERA NAME", last_collumn: "Hàng Ngang 3" },
                { first_collumn: "CAMERA ID", last_collumn: "214125432465ad" },
                { first_collumn: "CAMERA LINK", last_collumn: "alo 1" },
                { first_collumn: "CAMERA STATUS", last_collumn: "Online" },
                { first_collumn: "FUNCTION", last_collumn: "People counting" },
                { first_collumn: "NOTE", last_collumn: "camera chiếu từ cổng đi vào" },
                { first_collumn: "NOTIFICATION", last_collumn: true },
            ],
            logItems:[
                [
                    { first_collumn: "STATUS", last_collumn: "SOLVED" },
                    { first_collumn: "TIME", last_collumn: "16:09 05/09/2021" },
                    { first_collumn: "MESSAGE", last_collumn: "online" },
                ],
                [
                    { first_collumn: "STATUS", last_collumn: "SOLVED" },
                    { first_collumn: "TIME", last_collumn: "16:09 05/09/2021" },
                    { first_collumn: "MESSAGE", last_collumn: "online" },
                ],
                [
                    { first_collumn: "STATUS", last_collumn: "SOLVED" },
                    { first_collumn: "TIME", last_collumn: "16:09 05/09/2021" },
                    { first_collumn: "MESSAGE", last_collumn: "online" },
                ],
            ] 
            
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
    #box-information-table {
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
    #box-information-table2 {
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