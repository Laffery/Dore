<template>
    <div class="search_bar"
         style="float: left;
                height: 40px;
                width: 400px;
                padding-left: 40px;">
        <el-input class="input"
                v-model="search"
                placeholder="输入关键字搜索"
                style="float: left;
                        width: 280px;
                        height: 40px;
                        color: skyblue;
                        font-size: 15px;
                        font-weight: 200;"/>
        <el-button type="primary" icon="el-icon-search"
            style="float: left; width: 90px; height: 40px;">搜索</el-button>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return{
                search: ''
            }
        }
    }
</script>

<style scoped>
    .search_bar{
        float: left;
        height: 40px;
        width: 400px;
        padding-left: 40px;
    }

    .input{
        float: left;
        width: 280px;
        height: 40px;
        color: skyblue;
        font-size: 15px;
        font-weight: 200;
    }

    .button{
        float: left;
        width: 90px;
        height: 40px;
    }
</style>
