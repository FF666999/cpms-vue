import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const listRole = (data) => request({
    url: baseUrl + '/cpmsService/sys-role/list',
    method: 'post',
    data:data
});

export const addRole = (data) => request({
    url: baseUrl + '/cpmsService/sys-role/addRole',
    method: 'post',
    data:data
});

export const updateRole = (data) => request({
    url: baseUrl + '/cpmsService/sys-role/updateRole',
    method: 'post',
    data:data
});


export const deleteRole = (data) => request({
    url: baseUrl + '/cpmsService/sys-role/deleteRole',
    method: 'post',
    data:data
});

export const configRolePer = (data) => request({
    url: baseUrl + '/cpmsService/sys-role/configRolePer',
    method: 'post',
    data:data
});