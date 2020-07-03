<template>
    <div class="logo">
        <img src="../assets/image/logo/logo.png" alt="Logo"/>
    </div>
</template>

<script>
    export default {
        name: "Logo"
    }
</script>

<style scoped>
    .logo{
        float: left;
        width: 150px;
        height: 40px;
        line-height: 40px;
    }

    .logo img{
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }
</style>