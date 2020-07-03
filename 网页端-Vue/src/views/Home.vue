<template>
    <div>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main style="margin-top: 30px">
                <router-view></router-view>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default {
        components: {
            Footer,
            Header
        }
    }
</script>
