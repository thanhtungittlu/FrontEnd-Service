<template>
    <div class="wrapper" >
        <side-bar
            :background-color="backgroundColor"
            title="Dasboard"
            abv=""
            backgroundColor="blue"
        >
            <!-- <mobile-menu slot="content"></mobile-menu> -->
            <sidebar-link to="/box-manage">
                <i class="tim-icons icon-chart-pie-36"></i>
                <template>
                    <p>Quản lý boxAI</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/user-manage">
                <i class="tim-icons icon-chart-pie-36"></i>
                <template>
                    <p>Quản lý user</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/dashboard">
                <i class="tim-icons icon-chart-pie-36"></i>
                <template>
                    <p>Dashboard</p>
                </template>
            </sidebar-link>

            <sidebar-link to="/icons">
                <i class="tim-icons icon-atom"></i>
                <template>
                    <p>Icons</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/maps">
                <i class="tim-icons icon-pin"></i>
                <template>
                    <p>Maps</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/notifications">
                <i class="tim-icons icon-bell-55"></i>
                <template>
                    <p>Notifications</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/user">
                <i class="tim-icons icon-single-02"></i>
                <template>
                    <p>User Profile</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/table">
                <i class="tim-icons icon-puzzle-10"></i>
                <template>
                    <p>Table List</p>
                </template>
            </sidebar-link>
            <sidebar-link to="/typography">
                <i class="tim-icons icon-align-center"></i>
                <template>
                    <p>Typography</p>
                </template>
            </sidebar-link>
        </side-bar>
        <sidebar-share :background-color.sync="backgroundColor"></sidebar-share>

        <div class="main-panel" :data="backgroundColor">
            <top-navbar></top-navbar>

            <dashboard-content
                @click.native="toggleSidebar"
            ></dashboard-content>
        </div>
    </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./DashboardContent.vue";
import SidebarShare from "./SidebarSharePlugin.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";

export default {
    components: {
        TopNavbar,
        DashboardContent,        
        SideBar,
        SidebarLink,
        SidebarShare,
    },
    data() {
        return {
            backgroundColor: "green",
        };
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        },
    },
};
</script>
