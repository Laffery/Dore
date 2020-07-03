<template>
    <div class="book_table">
        <div v-if="this.totalItems === 0" class="empty">
            <p>没有订单!</p>
            <el-button v-if="this.searchType !== 0"
                       type="success" icon="el-icon-close"
                       style="width: 100px; height: 40px;"
                       @click="cancel">返回</el-button>
        </div>
        <div v-else>
            <div v-if="this.searchType === 0" style="margin-left: 500px;">
                <el-button type="primary" icon="el-icon-search"
                           style="float: left; width: 100px; height: 40px;"
                           @click="book_search">按书名</el-button>
                <el-button type="success" icon="el-icon-search"
                           style="float: left; width: 100px; height: 40px;"
                           @click="date_search">按时间</el-button>
            </div>
            <div v-if="this.searchType === 1">
                <el-input class="input"
                          v-model="search"
                          placeholder="输入关键字搜索"
                          clearable
                          prefix-icon="el-icon-search"
                          @keyup.enter.native="bookSearch"
                          style="float: left;
                                margin-left: 400px;
                                width: 280px;
                                height: 40px;
                                color: skyblue;
                                font-size: 15px;
                                font-weight: 200;"/>
                <el-button type="primary" icon="el-icon-search"
                           style="float: left; width: 90px; height: 40px;"
                           @click="bookSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-close"
                           style="float: left; width: 100px; height: 40px;"
                           @click="cancel">取消</el-button>
            </div>
            <div v-if="this.searchType === 2">
                <el-date-picker
                        v-model="during"
                        type="datetimerange"
                        align="right"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '00:00:00']"
                        style="float: left; margin-left: 350px">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search"
                           style="float: left; width: 90px; height: 40px;"
                           @click="dateSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-close"
                           style="float: left; width: 100px; height: 40px;"
                           @click="cancel">取消</el-button>
            </div>
            <el-table
                    class="table"
                    ref="filterTable"
                    :data="tableData"
                    highlight-current-row
                    element-loading-text="loading···"
            >
                <el-table-column type="index" label="#" width="100"></el-table-column>
                <el-table-column prop="user.name" label="用户" width="200"></el-table-column>
                <el-table-column prop="date" label="时间" width="300"></el-table-column>
                <el-table-column prop="price" label="总价" width="200">
                    <template slot-scope="scope">
                        {{scope.row.price | priceFormat}}
                    </template>
                </el-table-column>
                <el-table-column prop="items" label="明细" width="400" type="expand">
                    <template slot-scope="scope">
                        <el-table :data="scope.row.items">
                            <el-table-column type="index" label="#" width="50"></el-table-column>
                            <el-table-column prop="book.title" label="书名"></el-table-column>
                            <el-table-column prop="book.price" label="单价">
                                <template slot-scope="scope">
                                    {{scope.row.book.price | priceFormat}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="count" label="数量"></el-table-column>
                            <el-table-column prop="price" label="总价">
                                <template slot-scope="scope">
                                    {{scope.row.price | priceFormat}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
<!--                <el-table-column label="操作" width="200">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button-->
<!--                                type="danger" icon="el-icon-delete" size="mini"-->
<!--                                @click="deleteOrder(scope.row)"-->
<!--                        ></el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                searchType: 0,
                search: '',
                during: '',
                tableData: [],
                totalItems: 0,
            };
        },
        created() {
            this.gen();
        },
        methods: {
            gen() {
                this.search = '';
                this.during = '';
                this.searchType = 0;

                axios.get('http://localhost:8181/order/getAll').then((response) => {
                    this.tableData = response.data;
                    this.totalItems = this.tableData.length;
                });
            },
            book_search() {
                this.searchType = 1;
            },
            date_search() {
                this.searchType = 2;
            },
            cancel() {
                this.gen();
            },
            bookSearch() {
                if (this.search === '')
                    return;

                axios.get('http://localhost:8181/book/searchTitle?title=' + this.search).then((response) =>{
                    let books = response.data;

                    if (books.length === 0) {
                        this.tableData = [];
                        this.totalItems = 0;
                        return;
                    }

                    axios.get('http://localhost:8181/order/getAll').then((response) => {
                        let tmp = response.data;
                        this.tableData = [];
                        for (let i = 0; i < tmp.length; ++i) {
                            let order = tmp[i];
                            for (let j = 0; j < order.items.length; ++j) {
                                let flag = false;
                                let item = order.items[j];
                                for (let k = 0; k < books.length; ++k) {
                                    if (item.book.id === books[k].id) {
                                        this.tableData.push(order);
                                        flag = true;
                                        break;
                                    }
                                }

                                if (flag)
                                    break;
                            }
                        }

                        this.totalItems = this.tableData.length;
                    });
                });
            },
            dateSearch() {
                let start = this.during[0];
                let end = this.during[1];

                let url = 'http://localhost:8181/order/during?'
                    + '&start=' + start
                    + '&end=' + end;
                console.log(start);
                console.log(end);
                console.log(url);
                axios.get(url).then((response) =>{
                    this.tableData = response.data;
                    this.totalItems = this.tableData.length;
                });
            },
            deleteOrder(row) {
                let url = 'http://localhost:8181/order/delete?id=' + row.id;
                axios.delete(url).then(()=>{
                    this.$message.success('删除订单成功！');
                    this.gen();
                });
            },
        }
    };
</script>

<style scoped>
    .table {
        margin: 12px 20px;
    }

    .empty {
        color: #c6c6c6;
        font-size: 40px;
        font-weight: 600;
    }
</style>
