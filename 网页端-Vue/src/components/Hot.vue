<template>
    <div>
        <div>
            <el-tag style="float: left; margin-bottom: 30px;">热销好书榜</el-tag>
        </div>
        <div style="margin-top: 30px">
            <el-date-picker
                    v-model="during"
                    type="datetimerange"
                    align="right"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '00:00:00']"
                    style="float: left; margin-left: 330px">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search"
                       style="float: left; width: 90px; height: 40px;"
                       @click="search">搜索</el-button>
            <el-button type="success" icon="el-icon-close"
                       style="float: left; width: 100px; height: 40px;"
                       @click="cancel">取消</el-button>
            <el-table
                    class="table"
                    ref="filterTable"
                    :data="tableData"
                    highlight-current-row
                    element-loading-text="loading···"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
            >
                <el-table-column type="index" label="#" width="50"></el-table-column>
                <el-table-column prop="title" label="书名" width="200">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <el-image :src="scope.row.book.detail.iconBase64" alt="cover" style="height: 120px; width: 87px"/>
                            <div slot="reference">
                                <el-tag size="medium" @click="Browser(scope.row)">{{ scope.row.book.title }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="book.author" label="作者" width="150"></el-table-column>
                <el-table-column prop="book.type" label="分类" width="150"></el-table-column>
                <el-table-column
                        prop="book.isbn"
                        label="ISBN"
                        sortable
                        width="180"
                        column-key="ISBN">
                </el-table-column>
                <el-table-column
                        prop="book.price"
                        label="售价"
                        sortable
                        width="150">
                    <template slot-scope="scope">
                        {{scope.row.book.price | priceFormat}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="book.stock"
                        label="库存"
                        sortable
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="sold"
                        label="销量"
                        sortable
                        width="150">
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
                during: '',
                tableData: []
            };
        },
        created() {
            let start = "2020-01-01 00:00:00";
            let date = new Date();
            let end = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' 00:00:00';

            this.gen(start, end);
        },
        methods: {
            tableRowClassName({row}) {
                if (row.book.stock === 0) {
                    return 'out_of_stock';
                } else if (row.book.stock > 1000) {
                    return 'full_of_stock';
                }
                return 'middle_of_stock';
            },
            Browser(row) {
                this.$router.push({
                    path: '/Browser',
                    query: {
                        bid: row.book.id
                    }
                })
            },
            gen(start, end) {
                let url = 'http://localhost:8181/order/sellRank?'
                    + 'start=' + start
                    + '&end=' + end;
                console.log(url);

                axios.get(url).then((response) =>{
                    this.tableData = response.data;
                });
            },
            search() {
                let start = this.during[0];
                let end = this.during[1];

                this.gen(start, end);
            },
            cancel() {
                this.during = '';
                let start = "2020-01-01 00:00:00";
                let date = new Date();
                let end = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' 00:00:00';

                this.gen(start, end);
            }
        }
    };
</script>

<style scoped>
    .book_table img {
        width: 145px;
        height: 200px;
    }

    .table{
        margin-left: 12px;
    }
</style>

<style>
    .table .out_of_stock {
        background: oldlace;
    }

    .table .middle_of_stock {
        background: #f0f9eb;
    }

    .table .full_of_stock {
        background: #e2f0e4;
    }
</style>
