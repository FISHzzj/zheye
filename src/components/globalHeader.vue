<template>
  <!-- <div> -->
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
      <a class="navbar-brand" href="#">者也专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <router-link to="/login" class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></router-link>
        <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
            <drop-downs :title="`你好 ${user.nickName}`">
              <drop-down-item><router-link to="/create" class="dropdown-item">新建文章</router-link></drop-down-item>
              <drop-down-item disabled><a class="dropdown-item" href="#">管理文章</a></drop-down-item>
              <drop-down-item><a class="dropdown-item" href="#">退出登录</a></drop-down-item>
            </drop-downs>
        </li>
      </ul>
  </nav>
  <!-- </div> -->
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDowns from './dropdowns.vue'
import DropDownItem from './dropDownItem.vue'
import { UserProps } from '../store/index'
// export interface UserProps {
//   isLogin: boolean;
//   name?: string;
//   id?: number;
// }
// interface dropData: dropdownProp{
//   title: ''
// }

export default defineComponent({
  name: 'globalHeader',
  components: {
    DropDowns,
    DropDownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>
