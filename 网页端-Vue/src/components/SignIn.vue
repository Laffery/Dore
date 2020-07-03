<template>
    <el-form :rules="rules" :model="loginForm" class="loginRoot" @keyup.native.enter="login">
        <h3 class="loginTitle">登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" auto-complete="off"
                      prefix-icon="el-icon-user"
                      placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="text" v-model="loginForm.password" auto-complete="off"
                      prefix-icon="el-icon-key"
                      placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
            <el-button type="text" @click="register">没有账户？现在注册</el-button>
        </el-form-item>
        <el-form-item class="rapid_login">
            <img src="../assets/image/issues/rapid_login.png" alt="暂不支持"/>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "signIn",
        data() {
            return {
                loginForm: {
                    username : '',
                    password : '',
                },
                rules: {
                    username: [
                        {
                            required: true, message: '用户名不能为空', trigger: 'blur'
                        },{
                            min: 3, max: 12, message: '用户名长度须在 3 到 12 个字符', trigger: 'blur'
                        }],
                    password: [
                        {
                            required: true, message: '密码不能为空', trigger: 'blur'
                        },{
                            min: 6, max: 16, message: '密码长度须在 6 到 16 个字符', trigger: 'blur'
                        }],
                }
            }
        },
        methods: {
            login() {
                let name = this.loginForm.username;
                if (name.length === 0) {
                    this.$message.error("用户名不能为空!")
                    return;
                }else if (name.length < 3 || name.length > 12) {
                    this.$message.error("用户名长度须在 3 到 12 个字符!")
                    return;
                }

                let pwd = this.loginForm.password;
                if (pwd.length === 0) {
                   this.$message.error("密码不能为空") ;
                   return;
                } else if(pwd.length < 6 || pwd.length > 16) {
                    this.$message.error("密码长度须在 6 到 16 个字符");
                    return;
                }

                axios.post('http://localhost:8181/user/login', {
                    name: name,
                    password: pwd
                }).then((response) =>{
                    let res = response.data;

                    if(res.id === 0) {
                        this.$message.error("此用户不存在！");
                    }
                    else if(res.id === -1){
                        this.$message.error("密码错误，请重新输入！");
                    }
                    else if(res.id === -2){
                        this.$message.error("您的账户已被禁用");
                    }
                    else {
                        sessionStorage.setItem('id', res.id);
                        sessionStorage.setItem('name', name);
                        sessionStorage.setItem('role', res.role);
                        if(res.role === 'admin') {
                            this.$message.success('管理员账号登录成功!');
                            this.$router.push('/adminHome');
                        }
                        else {
                            this.$message.success('用户 ' + name + ' 登录成功!');
                            this.$router.push('/Home');
                        }
                    }
                });
            },
            register() {
                this.$router.replace('/sign_up');
            },
        }
    }
</script>

<style scoped>
    .rapid_login{
        width: 100%;
        height: 48px;
    }

    .rapid_login img{
        width: 100%;
        height: 100%;
    }

    .loginRoot {
        width: 280px;
        border-radius: 15px;
        background-clip: padding-box;
        margin: auto auto;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #c6c6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505050;
    }
</style>
