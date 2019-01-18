const BASE_URL = 'http://18.220.177.244/grocaryapp/index.php?route=restapi'

const makeRequest = config => {
  const url = `${BASE_URL}${config.url}`
  let requestConfig = {
    method: config.method
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    // }
  }

  const { params } = config
  if (params) {
    if (config.method === 'POST' || config.method === 'PUT') {
      requestConfig.body = params
    }
  }
  return fetch(url, requestConfig).then(response => {
    return response.json()
  })
}

export const get = (url, params) => {
  return makeRequest({ url, params, method: 'GET' })
}

export const post = (url, params) => {
  return makeRequest({ url, params, method: 'POST' })
}

export const put = (url, params) => {
  return makeURequest({ url, params, method: 'PUT' })
}

export const remove = (url, params) => {
  return makeRequest({ url, params, method: 'DELETE' })
}
