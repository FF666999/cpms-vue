import Cookies from 'js-cookie'
import website from '@/config/website'
const Authorization = website.Authorization
export function getToken () {
  return Cookies.get(Authorization)
}

export function setToken (token,expires) {
  return Cookies.set(Authorization, token, { expires: new Date(new Date().getTime() + expires * 1000) })
}

export function removeToken () {
  return Cookies.remove(Authorization)
}