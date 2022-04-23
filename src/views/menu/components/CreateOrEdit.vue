<template>
  <div class="create">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="form.orderNum" :step="2" step-strictly></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            :loading="submitLoading"
            @click="onSubmit"
          >
            提交
          </el-button>
          <el-button v-if="!isEdit" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/api/menu'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'MenuCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const rules = {
      name: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入菜单名称'
        }
      ],
      icon: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入前端图标'
        }
      ],
      description: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入描述'
        }
      ]
    }
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      submitLoading: false,
      parentMenuList: [],
      rules
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.submitLoading = true
        const { data } = await createOrUpdateMenu(this.form)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
          this.$router.back()
        } else {
          this.$message.error(data.mesg)
        }
      } catch (e) {
      } finally {
        this.submitLoading = false
      }
    },
    reset () {
      (this.$refs.form as Form).resetFields()
    },
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
