<template>
    <div class="bottom center">
        <div class="copyright">
            <h6>2020© Laffery. Powered by SJTU SE WAD</h6>
        </div>

        <div class="footer">
            <h6>
                Email: laffery.of.fiona@sjtu.edu.cn | Mobile phone: 15972777067
            </h6>
        </div>

        <div class="slogan">
            <h3>你想要的，小叮当全都有</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .bottom{
        text-align: center;
        background-color: pink;
    }

    .bottom copyright{
        margin-top: 10px;
    }

    .bottom h6{
        color: dodgerblue;
        margin: 5px;
    }

    .slogan{
        text-align: center;
        margin-bottom: 10px;
    }

    .slogan h3{
        color: gray;
    }
</style>
