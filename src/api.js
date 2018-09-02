async function request({method, path, args, data, raw}) {
  const body = raw ? data : JSON.stringify(data);
  const headers = new Headers();
  if (!raw) {
    headers.append('Content-Type', 'application/json');
  }
  return await fetch(path, {
    method: method,
    headers: headers,
    body: body,
  });
}

async function post(path, data) {
  return await request({
    method: 'POST',
    path: path,
    data: data,
  });
}

const api = {
  post: post,
  request: request,
};

export default api;
