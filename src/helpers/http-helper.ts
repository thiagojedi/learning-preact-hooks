type Method = 'DELETE' | 'GET' | 'POST' | 'PUT'

function createRequest(method: Method, url: string, data?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    
    if (method === 'GET')
    url = objectToKeyValue(data)
    .reduce((prevUrl, { key, value }) => setQueryString(prevUrl, key, value), url)
    
    xhr.open(method, url)

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('trakt-api-version', '2');
    xhr.setRequestHeader('trakt-api-key', '[client key]');

    xhr.onload = () => {
      let jsonResponse = {} as any
      try {
        jsonResponse = JSON.parse(xhr.responseText)
      } catch {
        // Cannot parse response
      }

      if (xhr.status >= 200 && xhr.status < 300)
        resolve(jsonResponse)
      else
        reject(jsonResponse)
    }
    xhr.onerror = () => reject({ status: 'failed' })

    xhr.send(data)
  })
}

export const getJson = (url: string, data?: any) => createRequest('GET', url, data)
export const postJson = (url: string, data?: any) => createRequest('POST', url, data)

function setQueryString(uri: string, key: string, value: string) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  const separator = uri.indexOf('?') !== -1 ? '&' : '?'

  if (uri.match(re))
    return uri.replace(re, '$1' + key + '=' + value + '$2')

  return uri + separator + key + '=' + value
}

function objectToKeyValue(objectParams: { [key: string]: any }) {
  const queryString: Array<{ key: string, value: string }> = []

  for (const key in objectParams) {
    if (!objectParams[key])
      continue
    let value = objectParams[key]

    value = Array.isArray(value) ? value.join(',') : value.toString()

    queryString.push({ key, value })
  }

  return queryString
}
