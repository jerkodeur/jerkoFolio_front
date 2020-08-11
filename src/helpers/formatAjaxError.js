const formatAjaxError = (err, action) => {
  const errStatus = err.response ? err.response.status : 'N/D'
  const errData = err.response
    ? err.response.data
    : { message: 'Network Error' }
  return {
    action,
    code: errStatus,
    message: errData.message
  }
}

export default formatAjaxError
