<template>
    <div class="Top_nav">
        <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                background-color="#ffc0cb">
            <el-menu-item index="1" @click="homepage" v-if="this.role === 'custom'">
                <i class="el-icon-s-home"></i>首页
            </el-menu-item>
            <el-menu-item index="1" @click="adminHomepage" v-else>
                <i class="el-icon-s-home"></i>首页
            </el-menu-item>
            <el-menu-item index="2" @click="browser" v-if="this.role === 'custom'">
                <i class="el-icon-notebook-2"></i>浏览图书
            </el-menu-item>
            <el-menu-item index="2" @click="bookManage" v-else>
                <i class="el-icon-notebook-2"></i>书籍管理
            </el-menu-item>
            <el-menu-item index="3" v-if="this.role === 'custom'" @click="GotoCart">
                <i class="el-icon-shopping-cart-2"></i>购物车</el-menu-item>
            <el-menu-item index="3" @click="userManage" v-else>
                <i class="el-icon-s-custom"></i>用户管理
            </el-menu-item>
            <el-menu-item index="4" v-if="this.role === 'custom'" @click="GotoOrder">
                <i class="el-icon-tickets"></i>我的订单
            </el-menu-item>
            <el-menu-item index="4" v-else @click="orderManage">
                <i class="el-icon-tickets"></i>订单管理
            </el-menu-item>
            <el-menu-item index="5" v-if="this.role === 'admin'">
                <i class="el-icon-connection"></i>
                <a href="https://github.com/Laffery/Dore" target="_blank">Open Source</a>
            </el-menu-item>
            <el-menu-item index="5" v-else @click="chart">
                <i class="el-icon-pie-chart"></i>消费统计
            </el-menu-item>
            <el-menu-item index="6" @click="signOut">
                <i class="el-icon-switch-button"></i>退出登录
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "TopNav",
        data() {
            return {
                activeIndex: '1',
                name: '',
                role: '',
            };
        },
        created() {
            this.name = sessionStorage.getItem('name');
            this.role = sessionStorage.getItem('role');
        },
        methods: {
            // admin
            adminHomepage() {
                this.activeIndex = '1';
                this.$router.replace('/admin');
            },
            bookManage(){
                this.activeIndex = '2';
                this.$router.replace('/adminBookTable');
            },
            userManage() {
                this.activeIndex = '3';
                this.$router.replace('/UserTable');
            },
            orderManage() {
                this.activeIndex = '4';
                this.$router.replace('/Orders');
            },
            // custom
            homepage(){
                this.activeIndex = '1';
                this.$router.replace('/Homepage');
            },
            browser(){
                this.activeIndex = '2';
                this.$router.replace('/BookTable');
            },
            GotoCart() {
                this.activeIndex = '3';
                this.$router.push('/Cart');
            },
            GotoOrder() {
                this.activeIndex = '4';
                this.$router.push('/Order');
            },
            // public
            chart() {
                this.$router.push('/chart');
            },
            signOut() {
                this.$router.replace('login');
            }
        }
    }
</script>

<style scoped>
    .Top_nav{
        float: left;
        margin-top: -10px;
    }
</style>
