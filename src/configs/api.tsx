import axios from 'axios'
import cookie from 'react-cookies'

export const authApis = {
  register: '/users/register',
  login: '/users/login',
  current: '/users/current',
}

export const threadApis = {
  all: '/threads',
  byId: (id: Number) => `/threads/${id}`,
  create: '/threads',
  edit: (id: Number) => `/threads/${id}`,
  delete: (id: Number) => `/threads/${id}`,
}

export const threadCategoryApis = {
  all: '/thread-categories',
  byId: (id: Number) => `/thread-categories/${id}`,
  create: '/thread-categories',
  edit: (id: Number) => `/thread-categories/${id}`,
  delete: (id: Number) => `/thread-categories/${id}`,
}

export const replyApis = {
  all: '/replies',
  byId: (id: Number) => `/replies/${id}`,
  create: '/replies',
  edit: (id: Number) => `/replies/${id}`,
  delete: (id: Number) => `/replies/${id}`,
}

export const endpoints = {
  categories: '/categories',
  products: '/products',
  login: '/login',
  'current-user': '/current-user',
  register: '/users',
}

export const BASE_URL = 'http://localhost:8083/api'

export const authAPIs = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${cookie.load('access-token')}`,
    },
  })
}

const APIs = axios.create({
  baseURL: BASE_URL,
})

export default APIs
