const request = require('./request')

const toQs = (filters) => {
  return Object.keys(filters).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
  }).join('&')
}

module.exports = {
  create: ({
    type,
    data
  }) => request(`/${type}`, {
    method: 'post',
    data: Object.assign(data, {
      created: (new Date()).toISOString(),
      modified: (new Date()).toISOString()
    })
  }),
  readOne: ({
    type,
    id
  }) => request(`/${type}/${id}`),
  readAll: ({
    type,
    filters = {}
  }) => {
    let filterString = toQs(filters)
    return request(`/${type}${filterString.length ? `?${filterString}` : ''}`)
  },
  readMany: ({
    type,
    ids
  }) => Promise.all(ids.map(id => request(`/${type}/${id}`))),
  update: ({
    type,
    id,
    data
  }) => request(`/${type}/${id}`, {
    method: 'patch',
    data: Object.assign(data, {
      modified: (new Date()).toISOString()
    })
  }),
  delete: ({
    type,
    id
  }) => request(`/${type}/${id}`).then(item => request(`/${type}/${id}`, {
    method: 'delete'
  }).then(() => item))
}
