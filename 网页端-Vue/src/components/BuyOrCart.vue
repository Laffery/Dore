<template>
    <div class="browserBook">
        <div class="book_cover" >
            <el-image :src="bookForm.detail.iconBase64" :about="bookForm.title"></el-image>
            <el-input type="text" v-model="num" auto-complete="off"
                      size="small" prefix-icon="el-icon-grape"
                      placeholder="请输入操作的图书数量"
                      style="margin-top: 30px; width: 80%;"></el-input>
            <div class="buttons">
                <el-button
                        type="success" size="medium" round
                        @click="cart" v-if="this.type === 'cart'"
                >入车</el-button>
                <el-button
                        type="success" size="medium" round
                        @click="buy" v-if="this.type === 'buy'"
                >购买</el-button>
                <el-button
                        type="danger" size="medium" round
                        @click="cancel"
                >返回</el-button>
            </div>
        </div>
        <div class="book_info">
            <el-form :model="bookForm" class="bookRoot" label-position="left">
                <el-form-item>
                    <el-tag effect="plain" class="tags">图书编号</el-tag>
                    <el-input type="text" v-model="bookForm.id" auto-complete="off"
                              size="small" prefix-icon="el-icon-grape"
                              readonly class="text"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">ISBN</el-tag>
                    <el-input type="text" v-model="bookForm.isbn" auto-complete="off"
                              size="small" prefix-icon="el-icon-user"
                              readonly class="text"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">图书名称</el-tag>
                    <el-input type="text" v-model="bookForm.title" auto-complete="off"
                              size="small" prefix-icon="el-icon-watermelon"
                              readonly class="text"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">图书类型</el-tag>
                    <el-input type="text" v-model="bookForm.type" auto-complete="off"
                              size="small" prefix-icon="el-icon-cherry"
                              readonly class="text"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">作者姓名</el-tag>
                    <el-input type="text" v-model="bookForm.author" auto-complete="off"
                              size="small" prefix-icon="el-icon-user"
                              readonly class="text"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">图书介绍</el-tag>
                    <el-input type="textarea" resize="none"
                              v-model="bookForm.detail.description" auto-complete="off"
                              readonly class="text"
                              style="margin-top: 10px"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">图书价格</el-tag>
                    <el-input type="text" v-model="bookForm.price" auto-complete="off"
                              size="small" prefix-icon="el-icon-apple"
                              readonly class="text"/>
                </el-form-item>
                <el-form-item>
                    <el-tag effect="plain" class="tags">图书库存</el-tag>
                    <el-input type="text" v-model="bookForm.stock" auto-complete="off"
                              size="small" prefix-icon="el-icon-pear"
                              readonly class="text"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "BuyOrCart",
        data() {
            return {
                num: 0,
                bookForm: {
                    detail: {
                        iconBase64: ''
                    }
                },
                cartForm: {},
                buyForm: {}
            }
        },
        methods: {
            cart() {
                if (this.num === 0) {
                    this.$message.error('图书数量不能为0！');
                    return;
                }

                axios.post('http://localhost:8181/cart/save', {
                    book: { id: this.$route.query.bid },
                    user: { id: sessionStorage.getItem('id')},
                    count: this.num,
                    price: this.num * this.bookForm.price
                }).then(( ) =>{
                    this.$message.success('《'+ this.bookForm.title + '》添加到购物车成功!');
                    this.$router.go(-1);
                });
            },
            buy() {
                if (this.num === 0) {
                    this.$message.error('图书数量不能为0！');
                    return;
                }

                axios.post('http://localhost:8181/order/save', {
                    user: { id: sessionStorage.getItem('id')},
                    items: [{
                        book: { id: this.$route.query.bid },
                        count: this.num,
                        price: this.num * this.bookForm.price
                    }]
                }).then((response) =>{
                    if (response.data === 'success')
                        this.$message.success('购买'+ this.num + '本《'+ this.bookForm.title + '》成功!');
                    this.$router.push('/Order');
                });
            },
            cancel() {
                this.$router.go(-1);
            }
        },
        created() {
            this.type = this.$route.query.type;
            this.role = sessionStorage.getItem('role');
            let bid = this.$route.query.bid;
            let url = 'http://localhost:8181/book/getByID?id=' + bid;

            axios.get(url).then((response) =>{
                this.bookForm = response.data;
            });
        }
    }
</script>

<style scoped>
    .browserBook{
        width: 80%;
        margin-left: 10%;
    }

    .book_cover{
        width: 40%;
        float: left;
    }

    .buttons{
        margin-top: 10%;
    }

    .book_info{
        width: 50%;
        float: left;
    }

    .tags{
        float: left;
        width: 20%;
        margin-top: 10px;
    }

    .text{
        float: left;
        width: 80%;
        margin-top: 6px;
    }
</style>
