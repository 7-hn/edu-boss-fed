<template>
  <div class="LoginIndex">
    <h1>edu boss 登录管理系统</h1>
    <el-form
      ref="form"
      label-position="top"
      label-width="80px"
      :model="formData"
      :rules="rules"
    >
      <h1>登录</h1>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loginLoading"
          @click="onSubmit"
        >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Form } from 'element-ui'
import { login } from '@/api/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    const rules = {
      phone: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入手机号'
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          trigger: 'blur',
          message: '请输入合法手机号'
        }
      ],
      password: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入密码'
        }, {
          min: 6,
          max: 16,
          message: '长度在6～16位之间'
        }
      ]
    }

    return {
      formData: {
        phone: '18201288771',
        password: '111111'
      },
      loginLoading: false,
      rules
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.loginLoading = true
        const { data } = await login(this.formData)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 登录成功，记录登录状态，状态需要能够全局访问（放到 vuex）
          this.setUser(data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success(data.message)
        }
      } catch {
        console.log('校验失败')
      } finally {
        this.loginLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.LoginIndex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #757779;

  .el-form {
    padding: 20px;
    width: 350px;
    background-color: #fff;

    .el-button {
      width: 100%;
    }
  }
}
</style>
