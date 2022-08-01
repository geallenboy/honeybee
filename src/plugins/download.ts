import axios from 'axios'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import {errorCode} from '@/utils/errorCode'
import { blobValidate } from '@/utils/main'

const baseURL = import.meta.env.VITE_APP_BASE_API

const printErrMsg=async(data: { text: () => any }) =>{
  const resText = await data.text();
  const rspObj = JSON.parse(resText);
  const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
  ElMessage.error(errMsg);
}

export default {
  name(name: string, isDelete = true) {
    var url = baseURL + "/common/download?fileName=" + encodeURI(name) + "&delete=" + isDelete
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(async (res:any) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data])
        saveAs(blob, decodeURI(res.headers['download-filename']))
      } else {
       printErrMsg(res.data);
      }
    })
  },
  resource(resource: string) {
    var url = baseURL + "/common/download/resource?resource=" + encodeURI(resource);
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(async (res: any) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data])
       saveAs(blob, decodeURI(res.headers['download-filename']))
      } else {
        printErrMsg(res.data);
      }
    })
  },
  zip(url: any, name: any) {
    var url = baseURL + url
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(async (res: any) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        saveAs(blob, name)
      } else {
        printErrMsg(res.data);
      }
    })
  },


}

