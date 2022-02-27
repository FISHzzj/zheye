<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '@/components/validateForm.vue'
import ValidateInput, { RulesProp } from '@/components/validateInput.vue'
import createMessage from '@/components/createMessage'
const emailReg = /^([0-9A-Za-z\-\]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailVal = ref('')
    const passwordVal = ref('')
    const router = useRouter()
    const store = useStore()
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      }
    }
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result:boolean) => {
      // console.log('123', result)
      const payload = {
        email: emailVal.value,
        password: passwordVal.value
      }
      if (result) {
        store.dispatch('loginAndFetch', payload).then(data => {
          // console.log(data)
          createMessage('登录成功 2秒以后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch((e) => {
          console.log(e)
        })
        // store.commit('login')
      }
    }
    return {
      onFormSubmit,
      validateEmail,
      emailRef,
      emailVal,
      passwordVal,
      emailRules,
      passwordRules
    }
  }
})
</script>
