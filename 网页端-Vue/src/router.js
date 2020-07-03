import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import SignIn from './components/SignIn'
import SignUp from "./components/SignUp"
import Home from './views/Home'
import AdminHome from "@/views/AdminHome";
import AdminHomePage from "@/components/AdminHomePage";
import HomePage from "./components/HomePage";
import UserTable from "@/components/UserTable";
import BookTable from "./components/BookTable";
import BookBrowser from "@/components/BookBrowser";
import AdminBookTable from "@/components/AdminBookTable";
import BookManage from "@/components/BookManage";
import UserManage from "@/components/UserManage";
import Cart from "@/components/Cart";
import Orders from "@/components/Orders";
import AddBook from "@/components/AddBook";
import BuyOrCart from "@/components/BuyOrCart";
import OrderTable from "@/components/OrderTable";
import Chart from "@/components/Chart";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login,
            redirect: '/sign_in',
            children: [{
                path: '/sign_in', component: SignIn
            }, {
                path: '/sign_up', component: SignUp
            }]
        },
        {
            path: '/home',
            component: Home,
            redirect: '/HomePage',
            children: [{
                path: '/HomePage', component: HomePage
            }, {
                path: '/bookTable', component: BookTable
            },{
                path: '/Cart', component: Cart
            },{
                path: '/Order', component: Orders
            },{
                path: '/Browser', component: BookBrowser
            },{
                path: '/ops', component: BuyOrCart
            },{
                path: '/chart', component: Chart
            }]
        },{
            path: '/adminHome',
            component: AdminHome,
            redirect: '/admin',
            children: [{
                path: '/admin', component: AdminHomePage
            },{
                path: '/adminBookTable', component: AdminBookTable
            },{
                path: '/UserTable', component: UserTable
            },{
                path: '/UserManage', component: UserManage
            },{
                path: '/BookManage', component: BookManage
            },{
                path: '/addBook', component: AddBook
            },{
                path: '/Browser', component: BookBrowser
            },{
                path: '/Orders', component: OrderTable
            }]
        }
    ]
})
