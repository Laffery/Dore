<template>
    <div style="margin-top: 30px;">
        <div>
            <el-tag style="float: left; margin-bottom: 30px;">用户消费榜</el-tag>
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
                <el-table-column prop="avatar" width="200" label="用户头像">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.user.avatar.iconBase64" alt="avatar" class="avatar"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="user.id" label="用户ID" width="160"></el-table-column>
                <el-table-column prop="user.name" label="用户名称" width="200"></el-table-column>
                <el-table-column prop="user.role" label="用户类型" width="200"></el-table-column>
                <el-table-column prop="user.email" label="邮箱地址" width="200"></el-table-column>
                <el-table-column prop="price" label="购买金额" width="200" sortable></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                during: '',
                tableData: []
            }
        },
        created() {
            let start = "2020-01-01 00:00:00";
            let date = new Date();
            let end = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' 00:00:00';

            this.gen(start, end);
        },
        methods: {
            tableRowClassName({row}) {
                return (row.permission === 1) ? 'permission_allow' : 'permission_banned';
            },
            gen(start, end) {
                let url = 'http://localhost:8181/order/buyRank?'
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
    }
</script>

<style scoped>
    .avatar {
        width: 80px;
        height: 80px;
    }
</style>
