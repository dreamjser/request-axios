# @dreamjser/axios

## 安装

```
  // npm安装
  npm i @dreamjser/request-axios

```


```
  // yarn安装
  yarn add @dreamjser/request-axios

```

```
  // pnpm安装
  pnpm add @dreamjser/request-axios
```

## 使用

```
import { getGlobalAxios, getAxios, AllType, OptionsGlobalType } from '@dreamjser/request-axios'

// 获取axios实例，设置全局的配置
const globalOpts: OptionsGlobalType = {
  timeout: 30000,
  baseURL: GLOBAL_CONFIG.BASE_URL,
}
const axiosInstance = getGlobalAxios(globalOpts)

// 获取axios实例
const axiosInstance = getAxios(opts: AllType, globalInstance)
```


### getGlobalAxios(globalOpts)

globalOpts参数可以设置axios的一些全局配置，配置同axios，如下：

```
{
  // baseURL: 'http://api.xxx.com/'
  baseURL?: string
  // timeout: 15000
  timeout?: number
  // 上传进度回调
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  // 下载进度回调
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  // headers: {'content-type': 'xxx'}
  headers?: object
}
```

### getAxios(opts, globalInstance)

opts参数可以设置axios的配置，配置同axios，同时新增了一些参数如下

```
{
  // 是否显示loading，默认true
  slient?:
  // 是否上传文件，默认false，为true则默认使用FormData数据
  isUpload?: boolean
  // 传参数据，不区分method
  data?: object
  // 是否显示公共错误提示，默认true，为false可以在调用时捕获异常做处理
  publicError?: boolean
  // 请求发起前hook
  requestHook?: (opts: AllType) => any
  // 请求返回数据hook
  responseHook?: (reslove: any, reject: any, data: any) => void
}
```


## 示例

```
import { getGlobalAxios, getAxios, AllType, OptionsGlobalType } from '@dreamjser/request-axios'
import { showLoading, hideLoading } from './loading'

const globalOpts: OptionsGlobalType = {
  timeout: 30000,
  baseURL: GLOBAL_CONFIG.BASE_URL,
}
const axiosInstance = getGlobalAxios(globalOpts)

const requestHook = (config: AllType) => {
  !config.slient && showLoading()
}

const responseHook = (reslove: any, reject: any, res: any) => {
  const { config, data } = res
  const { errorCode, errorMsg } = data

  !config.slint && setTimeout(hideLoading, 100)

  if (errorCode !== '0') {
    if (config.publicError) {
      App.interface.toast(errorMsg)
    } else {
      reject({
        errorCode,
        errorMsg,
      })
    }
    return
  }

  reslove(data)
}

const request = (opts: AllType) => {
  opts.requestHook = requestHook
  opts.responseHook = responseHook
  return getAxios(opts, axiosInstance).catch(() => {
    App.interface.toast('网络请求失败')
  })
}

export default request

```
