<template>
    <div class="user_table">
        <el-table
                class="table"
                ref="filterTable"
                :data="tableData"
                highlight-current-row
                element-loading-text="loading···"
                style="width: 100%"
                :row-class-name="tableRowClassName"
        >
            <el-table-column prop="id" label="#" width="50"></el-table-column>
            <el-table-column prop="avatar" width="100" label="用户头像">
                <template slot-scope="scope">
                    <el-image :src="scope.row.avatar.iconBase64" alt="avatar" class="avatar"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户名称" width="200"></el-table-column>
            <el-table-column prop="password" label="密码" width="150"></el-table-column>
            <el-table-column prop="role" label="用户类型" width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱地址" width="200"></el-table-column>
            <el-table-column prop="permission" label="状态" width="150">
                <template slot-scope="scope">
                    <div v-if="scope.row.id === editing">
                        <el-switch
                                v-model="scope.row.permission"
                                :active-value="1"
                                :inactive-value="0"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                    <div v-else>
                        <el-switch
                                v-model="scope.row.permission"
                                :active-value="1"
                                :inactive-value="0"
                                disabled
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <div v-if="editing !== scope.row.id">
                        <el-button
                                type="success" icon="el-icon-edit" size="mini"
                                @click="editor(scope.row)"
                        ></el-button>
                    </div>
                    <div v-else>
                        <el-button
                                type="primary" icon="el-icon-check" size="mini"
                                @click="submit(scope.row)"
                        ></el-button>
                        <el-button
                            type="danger" icon="el-icon-close" size="mini"
                            @click="cancel"
                        ></el-button>
                    </div>
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
                editing: 0,
                search: '',
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                totalItems: 0,
            };
        },
        created() {
            this.gen();
        },
        methods: {
            tableRowClassName({row}) {
                return (row.permission === 1) ? 'permission_allow' : 'permission_banned';
            },
            gen() {
                axios.get('http://localhost:8181/user/getAll').then((response) => {
                    this.totalItems = response.data.length;

                    let url = 'http://localhost:8181/user/getPage?'
                            + 'no=' + this.currentPage
                            + '&size=' + this.pageSize;
                    axios.get(url).then((res) =>{
                        this.tableData = res.data;
                        for (let i = 0; i < this.pageSize; ++i) {
                            this.tableData.edit = false;
                        }
                    });
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleCurrentChange(this.currentPage);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let url = 'http://localhost:8181/user/getPage?' +
                    'no=' + this.currentPage +
                    '&size=' + this.pageSize;
                axios.get(url).then((response) =>{
                    this.tableData = response.data;
                });
            },
            editor(row){
                if(!this.editing) {
                    this.editing = row.id;
                }
            },
            cancel(){
                this.editing = 0;
                this.gen();
            },
            submit(row){
                let url = 'http://localhost:8181/user/permission';

                axios.post(url, {
                    name: row.name,
                    permission: row.permission,
                    role: row.role,
                }).then((response) => {
                    if (response.data === "error")
                        this.$message.error("没有权限对管理员用户更改授权！");
                    else
                        this.$message.success("更改成功！");
                    this.cancel();
                });
            }
        }
    };
</script>

<style scoped>
    .user_table img {
        width: 145px;
        height: 200px;
    }

    .table{
        margin-left: 12px;
    }

    .pagination{
        margin-top: 30px;
    }

    .avatar{
        width: 50px;
        height: 50px;
    }
</style>

<style>
    .table .permission_allow {
        background: #f0f9eb;
    }

    .table .permission_banned {
        background: oldlace;
    }
</style>
