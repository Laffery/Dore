<template>
    <div class="Carousel center">
        <el-carousel height="300px">
            <el-carousel-item v-for="carousel in carousels" :key="carousel.imgUrl">
                <img :src="carousel.imgUrl" :alt="carousel.imgAlt"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import carousel_1 from "../assets/image/carousel/carousel_1.png";
    import carousel_2 from "../assets/image/carousel/carousel_2.png";
    import carousel_3 from "../assets/image/carousel/carousel_3.png";
    import carousel_4 from "../assets/image/carousel/carousel_4.png";

    export default {
        name: "Carousel",
        data(){
            return{
                carousels: [
                    {imgUrl: carousel_1, imgAlt: "item1"},
                    {imgUrl: carousel_2, imgAlt: "item2"},
                    {imgUrl: carousel_3, imgAlt: "item3"},
                    {imgUrl: carousel_4, imgAlt: "item4"}
                ],
            }
        }
    }
</script>

<style scoped>
    .Carousel{
        height: 300px;
        background-color: pink;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

</style>