import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const listProject = (data) => request({
    url: baseUrl + '/cpmsService/project/listProject',
    method: 'post',
    data:data
});

export const delProject = (data) => request({
    url: baseUrl + '/cpmsService/project/delProject',
    method: 'post',
    data:data
});

export const addProject = (data) => request({
    url: baseUrl + '/cpmsService/project/addProject',
    method: 'post',
    data:data
});

export const updateProject = (data) => request({
    url: baseUrl + '/cpmsService/project/updateProject',
    method: 'post',
    data:data
});

export const testDb = (data) => request({
    url: baseUrl + '/cpmsService/dynamic/test-db',
    method: 'post',
    data:data
});

export const genScaffold = (projectId) => request({
    url: baseUrl + '/cpmsService/gen-code/genScaffold',
    responseType: 'blob',  // 获取二进制数据
    method: 'get',
    params: {
        projectId:projectId
    }
});

export const dbTables = (dbId) => request({
    url: baseUrl + '/cpmsService/dynamic/dbTables',
    method: 'get',
    params: {
        dbId:dbId
    }
});

export const genFun = (data) => request({
    url: baseUrl + '/cpmsService/gen-code/genFun',
    responseType: 'blob',  // 获取二进制数据
    method: 'post',
    data:data
});



export const syncField = (data) => request({
    url: baseUrl + '/cpmsService/gen-code/syncField',
    method: 'post',
    data:data
});