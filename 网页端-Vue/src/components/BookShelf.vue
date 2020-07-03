<template>
    <div class="BookShelf center">
        <div class="BookShelfHeader center">
            <span><h3>好书推荐</h3></span>
        </div>
        <div class="BookShelfBody">
            <ul>
                <li v-for="book in books" :key="book.imgUrl">
                    <el-card class="BookCard" :body-style="{ padding: '0px' }" shadow="hover">
                        <el-image :src="book.detail.iconBase64" :alt="book.title" class="image"/>
                        <div class="info">
                            <span class="BookName">{{book.title}}</span>
                            <div class="bottom clear">
                                <span class="price">￥{{book.price}}</span>
                                <el-button type="text" class="button" @click="buy(book.id)">购买</el-button>
                            </div>
                        </div>
                    </el-card>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "BookShelf",
        data() {
            return {
                books: [],
            }
        },
        created() {
            let url = 'http://localhost:8181/book/getPage?index=1&size=12';
            axios.get(url).then((response) =>{
                this.books = response.data;
            });
        },
        methods: {
            buy(val) {
                this.$router.push({
                    path: '/ops',
                    query: {
                        type: 'buy',
                        bid: val
                    }
                });
            }
        }
    }

</script>

<style scoped>
    .clear:before,
    .clear:after {
        display: table;
        content: "";
    }

    .clear:after {
        clear: both
    }

    .BookShelfHeader{
        height: 25px;
    }

    .BookShelfHeader span{
        float: left;
        margin-left: 30px;
    }

    .BookShelfHeader h3{
        line-height: 25px;
        font-size: 18px;
        color: #494949;
    }

    .BookShelfHeader a{
        float: right;
        line-height: 25px;
        font-size: 12px;
        margin-top: 10px;
        margin-right: 30px;
        color: #aaaa00;
    }

    .BookShelfBody{
        margin: 30px auto;
        height: 580px;
        width: 1140px;
        padding: 0 30px;
        background-color: pink;
        border-radius: 5px;
    }

    .BookCard{
        float: left;
        width: 145px;
        height: 250px;
        margin: 20px 15px;
        background-color: skyblue;
        border-radius: 5px;
    }

    .BookName{
        height: 20px;
        line-height: 16px;
        font-size: 10px;
        color: #050505;
        font-weight: 400;
        margin: 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .info {
        padding: 7px 10px;
    }

    .price {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 0;
        line-height: 12px;
    }

    .bottom span{
        float: left;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        height: 200px;
        display: block;
        margin: auto;
    }
</style>
