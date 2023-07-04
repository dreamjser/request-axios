import axios, {AxiosProgressEvent, AxiosInstance} from "axios"

type OptionsRequiredType = {
  url: string
}

type OptionsNotRequiredType = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: object
  baseURL?: string
  timeout?: number
  data?: object
  params?: object
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}

type AxiosType = OptionsRequiredType & OptionsNotRequiredType

type OptionsCustomerType = {
  slient?: boolean
  isUpload?: boolean
  data?: object
  publicError?: boolean
  requestHook?: (opts: any) => any
  responseHook?: (opts: any) => boolean
}

export type OptionsGlobalType = {
  baseURL?: string
  timeout?: number
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  headers?: object
}

type OtherType = OptionsNotRequiredType & OptionsCustomerType

export type AllType = AxiosType & OptionsCustomerType

const createFormData = (params: any) => {
  const formData = new FormData()
  Object.keys(params).forEach((k: string) => {
    formData.append(k, params[k])
  })
  return formData
}


export const getAxios = (opts: AllType, instance: AxiosInstance) => {
  const defaultOpts: OtherType = {
    method: 'POST',
    slient: false,
    publicError: true,
    isUpload: false,
    headers: {},
    data: {},
    timeout: 30000,
  }

  let {
    url,
    method,
    headers,
    baseURL,
    onUploadProgress,
    onDownloadProgress,
    requestHook,
    responseHook,
    data,
    isUpload,
    slient,
    publicError,
  }: AllType = {
    ...defaultOpts,
    ...opts,
  }

  let instanceOpts: AllType = {
    url,
    method,
    headers,
    baseURL,
    onUploadProgress,
    onDownloadProgress,
    slient,
    publicError,
  }

  // 上传
  if(isUpload) {
    data = createFormData(data)
  }

  if(method === 'GET') {
    instanceOpts.params = data
  }else{
    instanceOpts.data = data
  }

  if(requestHook) {
    requestHook(instanceOpts)
  }

  return instance(instanceOpts).then((res: any) => {
    if(responseHook && !responseHook(res)) {
      return
    }

    return res.data
  })
}

export const getGlobalAxios = (opts: OptionsGlobalType) => {
  return axios.create(opts)
}

