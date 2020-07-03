<template>
    <div class="user">
        <el-avatar
                :src="url" alt="avatar"
                shape="square"
                @error="errorHandler"
        >
        </el-avatar>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "UserAvatar",
        data() {
            return {
                url: 'http://bpic.588ku.com/element_pic/01/55/09/6357474dbf2409c.jpg'
            }
        },
        created() {
            let name = sessionStorage.getItem('name');
            let url = 'http://localhost:8181/user/getAvatar?name=' + name;
            axios.get(url).then((response) =>{
                this.url = response.data;
            });
        },
        methods: {
            errorHandler() {
                this.url = "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
                return true;
            }
        }
    }
</script>

<style scoped>
    .user{
        float: right;
        height: 40px;
        line-height: 40px;
        margin-right: 30px;
        font-size: 14px;
        color: brown;
    }
</style>
