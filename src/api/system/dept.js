import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const listDept = (data) => request({
    url: baseUrl + '/cpmsService/sys-dept/list',
    method: 'post',
    data:data
});


export const allDeptTree = (data) => request({
    url: baseUrl + '/cpmsService/sys-dept/allDeptTree',
    method: 'post',
    data:data
});


export const tenantDeptTree = () => request({
    url: baseUrl + '/cpmsService/sys-dept/tenantDeptTree',
    method: 'get',
});

export const addDept = (data) => request({
    url: baseUrl + '/cpmsService/sys-dept/add',
    method: 'post',
    data:data
});


export const updateDept = (data) => request({
    url: baseUrl + '/cpmsService/sys-dept/update',
    method: 'post',
    data:data
});


export const delDept = (data) => request({
    url: baseUrl + '/cpmsService/sys-dept/delete',
    method: 'post',
    data:data
});