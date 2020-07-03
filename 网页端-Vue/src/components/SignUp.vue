<template>
    <el-form :rules="rules" :model="registerForm" class="registerRoot">
        <h3 class="registerTitle">注册</h3>
        <el-form-item prop="email">
            <el-input type="text" v-model="registerForm.email" auto-complete="off"
                      prefix-icon="el-icon-message"
                      placeholder="请输入邮箱地址"/>
        </el-form-item>
        <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.name" auto-complete="off"
                      prefix-icon="el-icon-user-solid"
                      placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="text" v-model="registerForm.password" auto-complete="off"
                      prefix-icon="el-icon-key"
                      placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-form-item prop="confirm">
            <el-input type="text" v-model="registerForm.confirm" auto-complete="off"
                      prefix-icon="el-icon-finished"
                      placeholder="请再次输入密码" show-password/>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
    </el-form>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SignUp",
        data() {
            return {
                registerForm: {
                    email    : '',
                    name : '',
                    password : '',
                    confirm  : '',
                    role: 'custom',
                    permission: 1,
                    avatar: {
                        id: Number,
                        iconBase64: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
                    }
                },
                rules: {
                    email: [
                        {
                            required: true, message: '邮箱不能为空', trigger: 'blur'
                        }],
                    name: [
                        {
                            required: true, message: '用户名不能为空', trigger: 'blur'
                        },{
                            min: 3, max: 12, message: '用户名长度在 3 到 12 个字符', trigger: 'blur'
                        }],
                    password: [
                        {
                            required: true, message: '密码不能为空', trigger: 'blur'
                        },{
                            min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'
                        }],
                    confirm: [
                        {
                            required: true, message: '密码不能为空', trigger: 'blur'
                        },{
                            min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'
                        }],
                },
            }
        },
        methods: {
            register() {
                let form = this.registerForm;
                let email = form.email;
                if (email.length === 0) {
                    this.$message.error("邮箱不能为空!")
                    return;
                } else {
                    let format = /^([a-zA-Z0-9.]{3,12})+@[a-zA-Z0-9]+\.([a-zA-Z.]{2,12})$/;
                    if (!format.test(email)) {
                        this.$message.error("邮箱格式不正确!")
                        return;
                    }
                }

                let name = form.name;
                if (name.length === 0) {
                    this.$message.error("用户名不能为空!")
                    return;
                }else if (name.length < 3 || name.length > 12) {
                    this.$message.error("用户名长度须在 3 到 12 个字符!")
                    return;
                }

                let pwd = form.password;
                if (pwd.length === 0) {
                    this.$message.error("密码不能为空") ;
                    return;
                } else if(pwd.length < 6 || pwd.length > 16) {
                    this.$message.error("密码长度须在 6 到 16 个字符");
                    return;
                }

                let confirm = form.confirm;
                if (confirm.length === 0) {
                    this.$message.error("再次输入密码不能为空！");
                    return;
                } else if (confirm !== pwd) {
                    this.$message.error("两次输入密码应一致！");
                    return;
                }

                let url = 'http://localhost:8181/user/save';
                axios.post(url, form).then((response) =>{
                   if (response.data === "error")
                       this.$message.error("此用户名已存在！");
                   else {
                       this.$message.success('注册成功！');
                       this.$router.replace('/login');
                   }
                });
            }
        }
    }
</script>

<style scoped>
    .registerRoot {
        width: 280px;
        height: 360px;
        border-radius: 15px;
        background-clip: padding-box;
        margin: auto auto;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #c6c6c6;
    }
    .registerTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505050;
    }
</style>
