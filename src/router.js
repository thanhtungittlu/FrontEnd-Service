import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";

// Các chức năng Login
import Login from "@/pages/Login/Login.vue"



// Quản lý box
import BoxManagement from "@/pages/BoxManagement/BoxManage.vue"
import BoxDetailInfo from "@/pages/BoxManagement/BoxDetailInfo.vue"
import CameraInfo from "@/pages/BoxManagement/CameraInfo.vue"

// Quản lý user 
import UserManage from "@/pages/UserManagement/UserManage.vue"
import UserDetail from "@/pages/UserManagement/UserDetail.vue"
import AddUser from "@/pages/UserManagement/AddUser.vue"

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
  path: "/",
  component: DashboardLayout,
  redirect: "dashboard",
  children:[
    {
      path: "box-manage",
      name: "Quản lý boxAI",
      component: BoxManagement
    },
    {
      path: "box-info?id=:id",
      name: "Thông tin chi tiết của box",
      component: BoxDetailInfo
    },
    {
      path: "camera-info?id=:id",
      name: "Thông tin chi tiết của camera",
      component: CameraInfo
    },
    {
        path: "user-manage",
        name: "Quản lý user",
        component: UserManage
    },
    {
        path: "add-user",
        name: "Tạo user",
        component: AddUser
    },
    {
        path: "user-detail?id=:id",
        name: "Thông tin chi tiết của user",
        component: UserDetail
    },
    {
      path: "dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "icons",
      name: "Icons",
      component: Icons
    },
    {
      path: "maps",
      name: "Maps",
      component: Maps
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "user",
      name: "User Profile",
      component: UserProfile
    },
    {
      path: "table",
      name: "Table List",
      component: TableList
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography
    }
  ]

    }
];

export default routes;
