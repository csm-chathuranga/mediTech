import axios from 'axios';
import { API } from '../utils/variables';

export const httpGet=(url,callback)=>{
    const token=JSON.parse(localStorage.getItem('token'));
    axios.get(`${API+url}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
       })
    .then(response =>{
        callback(response)
    }).catch(res=>{
        if(res.response.status===401){
            window.location.href='/';
     }
    });
}

export const httpPost=(url,crt_req_data,callback)=>{
    const token=JSON.parse(localStorage.getItem('token'));
    axios.post(`${API+url}`, crt_req_data,{
        headers: {
          Authorization: 'Bearer ' +token
        }
       })
    .then(response =>{
        callback(response)
    }).catch(res=>{
        if(res.response.status===401){
               window.location.href='/';
        }
        callback(res)
    });
}

export const httpPostRegister=(url,crt_req_data,callback)=>{
    axios.post(`${API+url}`, crt_req_data)
    .then(response =>{
        callback(response)
    }).catch(res=>{
        callback(res)
    });
}

export const httpPut=(url,crt_req_data,callback)=>{
    const token=JSON.parse(localStorage.getItem('token'));
    axios.put(`${API+url}`, crt_req_data,{
        headers: {
          Authorization: 'Bearer ' +token
        }
       })
    .then(response =>{
        callback(response)
    }).catch(res=>{
        if(res.response.status===401){
               window.location.href='/';
        }
    });
}