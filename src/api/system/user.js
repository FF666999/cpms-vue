import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const loginByUsername = (data) => request({
    url: baseUrl + '/cpmsService/auth/token',
    method: 'post',
    meta: {
        isToken: false
    },
    data: data
})

export const captcha = () => request({
    url: baseUrl + '/cpmsService/auth/captcha',
    method: 'get',
})

export const userList = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/list',
    method: 'post',
    data: data
})

export const getUserDetail = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/getUserDetail',
    method: 'post',
    data: data
})


export const checkUserInfo = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/checkUserInfo',
    method: 'post',
    data: data
})

export const generateAccount = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/generateAccount',
    method: 'post',
    data: data
})


export const addUser = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/add',
    method: 'post',
    data: data
})

export const updateUser = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/update',
    method: 'post',
    data: data
})

export const deleteUser = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/delete',
    method: 'post',
    data: data
})

export const modifiedPassword = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/modifiedPassword',
    method: 'post',
    data: data
})


export const changeUserStatus = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/changeUserStatus',
    method: 'get',
    params: {
        ...data
    }
})



export const modifiedPersonalInfo = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/modifiedPersonalInfo',
    method: 'post',
    data: data
})


export const resetPassword = (data) => request({
    url: baseUrl + '/cpmsService/sys-user/resetPassword',
    method: 'post',
    data: data
})























export const getUserInfo = () => request({
    url: baseUrl + '/user/getUserInfo',
    method: 'get'
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refesh',
    method: 'post'
})

export const sendLogs = (list) => request({
    url: baseUrl + '/user/logout',
    method: 'post',
    data: list
})

export const logout = () => request({
    url: baseUrl + '/user/logout',
    meta: {
        isToken: false
    },
    method: 'get'
})