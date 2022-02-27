import { createStore, Commit, Store } from 'vuex'
import axios from 'axios'
// import { testData, testPosts } from '../testData'
export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  columnId?: string;
  email?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  columnId: string;
  // author?: string | UserProps;
  // isHTML?: boolean;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  commit('setLoading', true)
  await new Promise(resolve => setTimeout(resolve, 3000))
  const { data } = await axios.get(url)
  commit(mutationName, data)
  setTimeout(() => {
    commit('setLoading', false)
  }, 2000)
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  commit('setLoading', true)
  await new Promise(resolve => setTimeout(resolve, 3000))
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  setTimeout(() => {
    commit('setLoading', false)
  }, 2000)
  return data
}

export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true }
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: 'zzj' }
    // },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
      // const { data } = await axios.get(`/columns/${cid}`)
      // commit('fetchColumn', data)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
      // const { data } = await axios.get(`/columns/${cid}/posts`)
      // commit('fetchPosts', data)
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
      // const { data } = await axios.get(`/columns/${cid}/posts`)
      // commit('fetchPosts', data)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }

  },
  getters: {
    // biggerColumnsLen (state) {
    //   return state.columns.filter(c => c.id > 2).length
    // },
    getColumnById: (state) => (id:string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid:string) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  modules: {
  }
})
