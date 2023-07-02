import axios from 'axios';

const createFormData = (params) => {
    const formData = new FormData();
    Object.keys(params).forEach((k) => {
        formData.append(k, params[k]);
    });
    return formData;
};
const getAxios = (opts, instance) => {
    const defaultOpts = {
        method: 'POST',
        slient: false,
        publicError: true,
        isUpload: false,
        headers: {},
        data: {},
        timeout: 30000,
    };
    let { url, method, headers, baseURL, onUploadProgress, onDownloadProgress, requestHook, responseHook, data, isUpload } = {
        ...defaultOpts,
        ...opts,
    };
    let instanceOpts = {
        url,
        method,
        headers,
        baseURL,
        onUploadProgress,
        onDownloadProgress,
    };
    // 上传
    if (isUpload) {
        data = createFormData(data);
    }
    if (method === 'GET') {
        instanceOpts.params = data;
    }
    else {
        instanceOpts.data = data;
    }
    if (requestHook) {
        requestHook(instanceOpts);
    }
    return instance(instanceOpts).then((res) => {
        if (responseHook && !responseHook(res)) {
            return;
        }
        return res.data;
    });
};
const getGlobalAxios = (opts) => {
    return axios.create(opts);
};

export { getAxios, getGlobalAxios };
