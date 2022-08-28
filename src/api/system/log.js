import request from '@/router/axios';
import { baseUrl } from '@/config/env';

export const listLog = (data) => request({
    url: baseUrl + '/cpmsService/sys-log/list',
    method: 'post',
    data:data
});
