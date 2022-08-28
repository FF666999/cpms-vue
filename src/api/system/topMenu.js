import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const listTopMenu=()=>request({
    url: baseUrl + '/cpmsService/sys-top-menu/list',
    method: 'get'
})

export const addTopMenu = (data) => request({
    url: baseUrl + '/cpmsService/sys-top-menu/add',
    method: 'post',
    data:data
});


export const updateTopMenu = (data) => request({
    url: baseUrl + '/cpmsService/sys-top-menu/update',
    method: 'post',
    data:data
});

export const deleteTopMenu = (data) => request({
    url: baseUrl + '/cpmsService/sys-top-menu/delete',
    method: 'post',
    data:data
});

export const configTopMenu = (data) => request({
    url: baseUrl + '/cpmsService/sys-top-menu/configTopMenu',
    method: 'post',
    data:data
});