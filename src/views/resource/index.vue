<template>
  <div class="ResourceIndex">
    <el-card shadow="never">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="资源管理" prop="name">
          <el-input type="text" v-model="form.name" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input type="text" v-model="form.url" placeholder="请输入资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择资源分类">
            <el-option
                v-for="item in resourceCategory"
                :key="item.id"
                :value="item.id"
                :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadResourcePages">查询搜索</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <el-button type="primary">添加</el-button>
        <el-button type="primary">资源分类</el-button>
      </template>
      <el-table :data="resources">
        <el-table-column label="编号" type="index"/>
        <el-table-column label="资源名称" prop="name"/>
        <el-table-column label="资源路径" prop="url"/>
        <el-table-column label="描述" prop="description"/>
        <el-table-column label="添加时间" prop="createdTime"/>
        <el-table-column label="操作">
          <template v-slot="{}">
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin: 10px 0; float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategory, getResourcePages } from '@/api/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      form: {
        current: 1,
        size: 10
      },
      resources: [],
      totalCount: 0,
      resourceCategory: []
    }
  },
  created () {
    this.loadResourcePages()
    this.loadResourceCategory()
  },
  methods: {
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },
    loadResourcePages: async function () {
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
      }
    },
    handleSizeChange (val: number) {
      this.form.current = 1
      this.form.size = val
      this.loadResourcePages()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResourcePages()
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped></style>
