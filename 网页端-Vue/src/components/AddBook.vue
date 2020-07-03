<template>
    <div class="updateBook">
        <div class="cover">
            <el-image :src="this.bookForm.detail.iconBase64" alt="cover"></el-image>
        </div>
        <div class="form">
            <el-form :rules="rules" :model="bookForm" @keyup.native.enter="update">
                <el-form-item prop="isbn">
                    <el-input type="text" v-model="bookForm.isbn" auto-complete="off"
                              prefix-icon="el-icon-user"
                              placeholder="请输入ISBN">
                        <template slot="prepend">ISBN编号</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="title">
                    <el-input type="text" v-model="bookForm.title" auto-complete="off"
                              prefix-icon="el-icon-watermelon"
                              placeholder="请输入图书名称">
                        <template slot="prepend">图书名称</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="type">
                    <el-input type="text" v-model="bookForm.type" auto-complete="off"
                              prefix-icon="el-icon-cherry"
                              placeholder="请输入图书类型">
                        <template slot="prepend">图书类型</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="author">
                    <el-input type="text" v-model="bookForm.author" auto-complete="off"
                              prefix-icon="el-icon-user"
                              placeholder="请输入作者姓名">
                        <template slot="prepend">作者姓名</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="iconBase64">
                    <el-input type="text" v-model="bookForm.detail.iconBase64" auto-complete="off"
                              prefix-icon="el-icon-picture-outline"
                              placeholder="请输入图书封面url">
                        <template slot="prepend">图书封面</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="description">
                    <el-input type="textarea" v-model="bookForm.detail.description" auto-complete="off"
                              prefix-icon="el-icon-document"
                              autosize
                              placeholder="请输入图书简介">
                    </el-input>
                </el-form-item>
                <el-form-item prop="price">
                    <el-input type="text" v-model="bookForm.price" auto-complete="off"
                              prefix-icon="el-icon-apple"
                              placeholder="请输入图书价格">
                        <template slot="prepend">图书价格</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="stock">
                    <el-input type="text" v-model="bookForm.stock" auto-complete="off"
                              prefix-icon="el-icon-pear"
                              placeholder="请输入图书库存">
                        <template slot="prepend">图书库存</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="success" @click="update" icon="el-icon-check">提交</el-button>
            <el-button type="primary" @click="giveUp" icon="el-icon-close">取消</el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "BookManage",
        data() {
            return {
                bookForm: {
                    id: 0,
                    isbn: '',
                    title: '',
                    type: '',
                    author: '',
                    price: 0.00,
                    stock: 0,
                    detail: {
                        description: '',
                        iconBase64: 'http://g.hiphotos.baidu.com/zhidao/pic/item/267f9e2f0708283879c75becb999a9014d08f104.jpg'
                    }
                },
                rules: {
                    title: [
                        {
                            required: true, message: '书名不能为空', trigger: 'blur'
                        }],
                    isbn: [
                        {
                            required: true, message: 'ISBN不能为空', trigger: 'blur'
                        }, {
                            min: 6, max: 6, message: 'ISBN长度需为6', trigger: 'blur'
                        }]
                }
            }
        },
        methods: {
            update() {
                if (this.bookForm.isbn.length === 0) {
                    this.$message.error('ISBN不能为空！');
                    return;
                }
                else if (this.bookForm.isbn.length !== 6) {
                    this.$message.error('ISBN长度需为6！');
                    return;
                }

                if (this.bookForm.title.length === 0) {
                    this.$message.error('书名不能为空！');
                    return;
                }

                if (this.bookForm.type.length === 0) {
                    this.$message.error('图书类型不能为空！');
                    return;
                }

                if (this.bookForm.author.length === 0) {
                    this.$message.error('作者不能为空！');
                    return;
                }

                let url = 'http://localhost:8181/book/saveBook';

                axios.post(url, this.bookForm).then((response) =>{
                    console.log(response.data);
                    if(response.data === "success"){
                        this.$message.success('添加图书《' + this.bookForm.title + '》成功！');
                        this.$router.push('/adminBookTable');
                    }
                    else {
                        this.$message.error('添加失败，ISBN与已有图书重复！');
                    }
                });
            },
            giveUp() {
                this.$router.push('/adminBookTable');
            }
        }
    }
</script>

<style scoped>
    .updateBook{
        width: 80%;
        margin-left: 10%;
    }

    .cover {
        float: left;
        width: 30%;
    }

    .form {
        float: left;
        margin-left: 10%;
        width: 60%;
    }
</style>
