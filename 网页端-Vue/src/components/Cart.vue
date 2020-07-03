<template>
    <div class="book_table">
        <div class="empty" v-if="this.empty">
            <p>购物车空空如也呢！</p>
        </div>
        <div style="margin: 20px 480px;" v-if="this.empty === false">
            <el-button type="primary" icon="el-icon-sell"
                       style="float: left; height: 40px;"
                       @click="buyAll">全部购买</el-button>
            <el-button type="success" icon="el-icon-delete"
                       style="float: left; height: 40px;"
                       @click="deleteAll">清空购物车</el-button>
        </div>
        <div class="_table" v-if="this.empty === false">
            <el-table
                    class="table"
                    ref="filterTable"
                    :data="tableData"
                    highlight-current-row
                    element-loading-text="loading···"
            >
                <el-table-column type="index" label="#" width="45"></el-table-column>
                <el-table-column prop="book.title" label="书名" width="180"></el-table-column>
                <el-table-column prop="book.author" label="作者" width="150"></el-table-column>
                <el-table-column prop="book.type" label="分类" width="100"></el-table-column>
                <el-table-column prop="book.price" label="单价" sortable width="150">
                    <template slot-scope="scope">
                        {{scope.row.book.price | priceFormat}}
                    </template>
                </el-table-column>
                <el-table-column prop="count" label="数量" sortable width="120">
                    <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.count" auto-complete="off"
                                  size="small" v-if="scope.row.id === editing"
                                  placeholder="请输入图书数量"></el-input>
                        <span v-else>{{scope.row.count}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="总价" sortable width="150">
                    <template slot-scope="scope">
                        {{scope.row.price | priceFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="库存" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.book.stock >= scope.row.count">充足</span>
                        <span v-else>不足</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div v-if="scope.row.id === editing">
                            <el-button
                                    type="primary" icon="el-icon-check" size="mini"
                                    @click="submit(scope.row)"></el-button>
                            <el-button
                                    type="danger" icon="el-icon-close" size="mini"
                                    @click="cancel"></el-button>
                        </div>
                        <div v-else>
                            <el-button
                                    type="success" icon="el-icon-edit" size="mini"
                                    @click="editor(scope.row)"
                            ></el-button>
                            <el-button
                                    type="primary" icon="el-icon-sell" size="mini"
                                    @click="buy(scope.row)"
                            ></el-button>
                            <el-button
                                    type="danger" icon="el-icon-delete" size="mini"
                                    @click="deleteBook(scope.row)"
                            ></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                tableData: [],
                empty: true,
                editing: 0,
            };
        },
        created() {
            let url = 'http://localhost:8181/cart/getByName?name='
                + sessionStorage.getItem('name');

            axios.get(url).then((response) => {
                this.tableData = response.data;
                if (this.tableData.length !== 0)
                    this.empty = false;
            });
        },
        methods: {
            editor(row) {
                if (this.editing === 0)
                    this.editing = row.id;
            },
            submit(row) {
                let form = {
                    id: row.id,
                    book: { id: row.book.id },
                    user: { id: row.user.id },
                    count: row.count,
                    price: row.count * row.book.price
                };

                axios.post('http://localhost:8181/cart/update', form).then(()=>{
                    console.log(form);
                    this.$message.success('修改成功！');
                    this.cancel();
                });
            },
            cancel() {
                this.editing = 0;
                window.location.reload();
            },
            buy(row) {
                axios.post('http://localhost:8181/order/save', {
                    user: { id: sessionStorage.getItem('id')},
                    items: [{
                        book: { id: row.book.id },
                        count: row.count,
                        price: row.price
                    }]
                }).then((response) =>{
                    if (response.data === 'success') {
                        this.$message.success('购买' + row.count + '本《' + row.book.title + '》成功!');
                        axios.delete('http://localhost:8181/cart/delete?id=' + row.id).then(() =>{});
                        this.$router.push('/Order');
                    }
                    else {
                        this.$message.error('数量超过库存，无法购买！');
                    }
                });
            },
            deleteBook(row) {
                let url = 'http://localhost:8181/cart/delete?id=' + row.id;
                axios.delete(url).then(() =>{
                    this.$message.success('删除《' + row.book.title + '》成功！');
                    window.location.reload();
                });
            },
            deleteAll() {
                for (let index = 0; index < this.tableData.length; ++index) {
                    let item = this.tableData[index];
                    let url = 'http://localhost:8181/cart/delete?id=' + item.id;
                    axios.delete(url).then(() =>{
                       console.log('删除《' + item.book.title + '》成功');
                    });
                }

                this.$message.success('清空购物车成功！');
                window.location.reload();
            },
            buyAll() {
                let form = {
                    user: { id: sessionStorage.getItem('id')},
                    items: []
                };

                for (let index = 0; index < this.tableData.length; ++index) {
                    let item = this.tableData[index];
                    if (item.book.stock < item.count) {
                        this.$message.error('存在书籍库存不足，购买失败！');
                        return;
                    }

                    let tmp = {
                        book: { id: item.book.id },
                        count: item.count,
                        price: item.price
                    }

                    form.items.push(tmp);
                }

                axios.post('http://localhost:8181/order/save', form).then((response) =>{
                    if (response.data === 'success') {
                        this.$message.success('购买成功!');

                        for (let index = 0; index < form.items.length; ++index) {
                            let item = form.items[index];
                            let url = 'http://localhost:8181/cart/delete?id=' + item.id;
                            axios.delete(url).then(() =>{});
                        }
                        this.$router.push('/Order');
                    }
                    else {
                        this.$message.error('存在图书的购买数量超过库存，无法购买！');
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .empty {
        color: #c6c6c6;
        font-size: 40px;
        font-weight: 600;
    }

    .book_table img {
        width: 145px;
        height: 200px;
    }

    ._table{
        margin-left: 12px;
    }
</style>
