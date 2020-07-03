<template>
    <div class="container center">
        <div class="box">
            <div class="image">
                <img src="../assets/image/issues/login.png" alt="logo picture"/>
            </div>
            <div class="login">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    .center{
        width: 1264px;
        margin: auto;
        background-color: pink;
    }

    body{
        overflow-y: hidden;
    }

    .container{
        height: 560px;
        padding: 60px 232px;
        background-color: skyblue;
        margin: auto;
    }

    .box{
        height: 450px;
        width: 800px;
        margin-top: 50px;
        border-radius: 5px;
        background-color: #f3f5f7;
    }

    .image{
        float: left;
        width: 360px;
        height: 360px;
        margin: 45px 45px 0 45px;
    }

    .image img{
        width: 100%;
    }

    .login{
        float: left;
        height: 360px;
        width: 280px;
        margin-top: 45px;
        margin-bottom: 45px;
        margin-left: 15px;
        background-color: #f3f5f7;
    }

    h2{
        font-size: 20px;
        font-weight: 400;
    }
</style>