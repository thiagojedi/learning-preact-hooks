type Method = 'DELETE' | 'GET' | 'POST' | 'PUT'

async function createRequest(method: Method, url: string, data?: any): Promise<any> {
  let body: string | undefined = undefined;
  if (method === 'GET') {
    url = objectToKeyValue(data)
      .reduce((prevUrl, { key, value }) => setQueryString(prevUrl, key, value), url)
  } else {
    body = JSON.stringify(data);
  }

  const headers = {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': '[client key]',
  }

  const r = await fetch(url, { method, body, headers });
  if (!r.ok)
    throw new Error(r.statusText);
  return r.json();
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
