import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const getMenu=(topMenuId)=>request({
    url: baseUrl + '/cpmsService/sys-menu/left-menu',
    method: 'get',
    params: {
        topMenuId:topMenuId
    }
})

export const getTopMenu = () => request({
    url: baseUrl + '/cpmsService/sys-top-menu/top-menu',
    method: 'post'
});


export const listMenu=(data)=>request({
    url: baseUrl + '/cpmsService/sys-menu/list',
    method: 'post',
    data:data
})

export const userOwnedMenus=()=>request({
    url: baseUrl + '/cpmsService/sys-menu/userOwnedMenus',
    method: 'get',
})

export const tenantOwnedMenus=()=>request({
    url: baseUrl + '/cpmsService/sys-menu/tenantOwnedMenus',
    method: 'get',
})


export const selectMenuByTenantId=(tenantId)=>request({
    url: baseUrl + '/cpmsService/sys-menu/selectMenuByTenantId',
    method: 'get',
    params: {
        tenantId:tenantId
    }
})

export const addMenu=(data)=>request({
    url: baseUrl + '/cpmsService/sys-menu/addMenu',
    method: 'post',
    data:data
})


export const editMenu=(data)=>request({
    url: baseUrl + '/cpmsService/sys-menu/updateMenu',
    method: 'post',
    data:data
})

export const delMenu=(data)=>request({
    url: baseUrl + '/cpmsService/sys-menu/deleteMenu',
    method: 'post',
    data:data
})