<template>
    <div class="header center">
        <Logo></Logo>
        <TopNav class="nav"></TopNav>
        <UserAvatar></UserAvatar>
    </div>
</template>

<script>
    import Logo from "@/components/Logo";
    import TopNav from "@/components/TopNav";
    import UserAvatar from "@/components/UserAvatar";

    export default {
        name: "Header",
        components: {UserAvatar, TopNav, Logo},
    }
</script>

<style scoped>
    body{
        background-color: #f3f5f7;
    }

    .header{
        height: 40px;
        background: pink;
        margin: 30px auto;
        padding: 10px;
    }

    .nav{
        margin-left: 230px;
    }
</style>
