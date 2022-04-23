<template>
  <div class="MenuIndex">
    <el-card>
      <el-button
        type="primary"
        size="small"
        @click="createMenu"
      >添加菜单
      </el-button>
      <el-divider></el-divider>
      <el-table
        :data="menus"
        style="width: 100%"
        row-key="id"
        :tree-props="{children: 'subMenuList'}"
      >
        <el-table-column
          label="编号"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          width="180">
          <template v-slot="{ row }">
            {{ row.level === 0 ? '一级' : '二级' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(row.id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, deleteMenu } from '@/api/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadMenuNodeList()
  },
  methods: {
    // 加载菜单列表
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    // 添加菜单
    createMenu () {
      this.$router.push({
        name: 'menu-create'
      })
    },
    // 编辑
    handleEdit (id: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id
        }
      })
    },
    // 删除
    handleDelete (id: number) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteMenu(id)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
          this.loadMenuNodeList()
        } else {
          this.$message.error(data.mesg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
