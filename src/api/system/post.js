import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const listPost = (data) => request({
    url: baseUrl + '/cpmsService/sys-post/list',
    method: 'post',
    data:data
});

export const addPost = (data) => request({
    url: baseUrl + '/cpmsService/sys-post/add',
    method: 'post',
    data:data
});

export const updatePost = (data) => request({
    url: baseUrl + '/cpmsService/sys-post/update',
    method: 'post',
    data:data
});


export const deletePost = (data) => request({
    url: baseUrl + '/cpmsService/sys-post/delete',
    method: 'post',
    data:data
});