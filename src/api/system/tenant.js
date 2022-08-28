import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const listTenant = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/list',
    method: 'post',
    data:data
});

export const addTenant = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/add',
    method: 'post',
    data:data
});

export const updateTenant = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/update',
    method: 'post',
    data:data
});


export const delTenant = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/delete',
    method: 'post',
    data:data
});

export const dropDownTenants = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/dropDownTenants',
    method: 'get',
    params: data
});


export const configTenantPer = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/configTenantPer',
    method: 'post',
    data:data
});


export const changeTenantStatus = (data) => request({
    url: baseUrl + '/cpmsService/sys-tenant/changeTenantStatus',
    method: 'get',
    params: {
        ...data
    }
});