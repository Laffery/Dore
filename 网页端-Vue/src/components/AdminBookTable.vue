<template>
    <div class="book_table">
        <div style="height: 40px; margin-left:350px; width: 500px;">
            <el-input v-model="search"
                      placeholder="输入关键字搜索"
                      clearable
                      prefix-icon="el-icon-search"
                      @keyup.enter.native="doSearch"
                      style="float: left;
                        width: 280px;
                        height: 40px;
                        color: skyblue;
                        font-size: 15px;
                        font-weight: 200;"/>
            <el-button type="primary" icon="el-icon-search"
                       style="float: left; width: 90px; height: 40px;"
                        @click="doSearch">搜索</el-button>
            <el-button type="success"
                       style="float: left; width: 90px; height: 40px;"
                       icon="el-icon-plus"
                       @click="addBook">添加</el-button>
        </div>
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
                        <el-image :src="scope.row.detail.iconBase64" alt="cover" style="height: 120px; width: 87px"/>
                        <div slot="reference">
                            <el-tag size="medium" @click="Browser(scope.row)">{{ scope.row.title }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="150"></el-table-column>
            <el-table-column prop="type" label="分类" width="150"></el-table-column>
            <el-table-column
                    prop="isbn"
                    label="ISBN"
                    sortable
                    width="180"
                    column-key="ISBN">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="售价"
                    sortable
                    width="150">
                <template slot-scope="scope">
                    {{scope.row.price | priceFormat}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="stock"
                    label="库存"
                    sortable
                    width="150">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="success" icon="el-icon-edit" size="mini"
                            @click="editor(scope.row)"
                    ></el-button>
                    <el-button
                            type="danger" icon="el-icon-delete" size="mini"
                            @click="deleteBook(scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
        </el-pagination>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                search: "",
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                totalItems: 0
            };
        },
        created() {
            let url = 'http://localhost:8181/book/getPage?' +
                'index=' + this.currentPage+
                '&size=' + this.pageSize;

            axios.get('http://localhost:8181/book/getAll').then((response) => {
                this.totalItems = response.data.length;
            });
            axios.get(url).then((response) =>{
                this.tableData = response.data;
            });
        },
        methods: {
            Browser(row) {
                this.$router.push({
                    path: '/Browser',
                    query: {
                        bid: row.id
                    }
                })
            },
            tableRowClassName({row}) {
                if (row.stock === 0) {
                    return 'out_of_stock';
                } else if (row.stock > 1000) {
                    return 'full_of_stock';
                }
                return 'middle_of_stock';
            },
            doSearch() {
                if (this.search === '') {
                    this.handleCurrentChange(this.currentPage);
                }
                else {
                    let url = 'http://localhost:8181/book/searchTitle?title=' + this.search;
                    axios.get(url).then((response) =>{
                       this.tableData = response.data;
                    });
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleCurrentChange(this.currentPage);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let url = 'http://localhost:8181/book/getPage?' +
                    'index=' + this.currentPage+
                    '&size=' + this.pageSize;
                axios.get(url).then((response) =>{
                    this.tableData = response.data;
                });
            },
            editor(row){
                this.$router.push({
                    path: '/BookManage',
                    query: {
                        id: row.id
                    }
                })
            },
            deleteBook(row) {
                let id = row.id;
                let url = 'http://localhost:8181/book/deleteBook?id=' + id;
                axios.delete(url).then((response) => {
                    if (response.data === 'success') {
                        this.$message.success('《' + row.title + '》删除成功！');
                        window.location.reload();
                    }
                    else
                        this.$message.error('删除失败！');
                });
            },
            addBook() {
                this.$router.push('/addBook')
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

    .pagination{
        margin-top: 30px;
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
