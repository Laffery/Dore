<template>
    <div class="updateUser">
        <el-form :rules="rules" :model="userForm" class="userRoot" @keyup.native.enter="update">
            <el-form-item label="用户编号">
                <el-input type="text" v-model="userForm.id" auto-complete="off"
                          prefix-icon="el-icon-grape"
                          readonly/>
            </el-form-item>
            <el-form-item prop="name" label="用户名称">
                <el-input type="text" v-model="userForm.name" auto-complete="off"
                          prefix-icon="el-icon-user"
                          placeholder="请输入用户名称"/>
            </el-form-item>
            <el-form-item prop="password" label="用户密码">
                <el-input type="text" v-model="userForm.password" auto-complete="off"
                          prefix-icon="el-icon-key"
                          placeholder="请输入用户密码"/>
            </el-form-item>
            <el-form-item label="用户类型">
                <el-input type="text" v-model="userForm.role" auto-complete="off"
                          prefix-icon="el-icon-cherry"
                          readonly/>
            </el-form-item>
            <el-form-item prop="email" label="用户邮箱">
                <el-input type="text" v-model="userForm.email" auto-complete="off"
                          prefix-icon="el-icon-message"
                          placeholder="请输入用户邮箱"/>
            </el-form-item>
            <el-form-item prop="permission" label="用户状态">
                <el-input type="text" v-model="userForm.permission" auto-complete="off"
                          prefix-icon="el-icon-turn-off"
                          placeholder="请输入用户状态"/>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="update">提交</el-button>
        <el-button type="primary" @click="giveUp">取消</el-button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "UserManage",
        data() {
            return {
                userForm: {
                    id: 0,
                    name: '',
                    password: '',
                    role: '',
                    email: '',
                    permission: 0
                },
                rules: {
                    name: [
                        {
                            required: true, message: '用户名不能为空', trigger: 'blur'
                        },{
                            min: 1, max: 12, message: '用户名长度在 1 到 12 个字符', trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            update() {
                let url = 'http://localhost:8181/user/updateUser';

                axios.put(url, this.userForm).then((response) =>{
                    if(response.data == "success"){
                        this.$message.success('修改成功');
                        this.$router.push('/UserTable');
                    }
                });
            },
            giveUp() {
                this.$router.push('/UserTable');
            }
        },
        created() {
            let name = this.$route.query.name;
            let url = 'http://localhost:8181/user/getUser?name=' + name;

            axios.get(url).then((response) =>{
                this.userForm = response.data;
            });
        }
    }
</script>

<style scoped>
    .updateUser{
        width: 60%;
        margin-left: 20%;
    }
</style>