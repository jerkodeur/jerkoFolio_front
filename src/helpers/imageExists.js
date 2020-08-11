const imageExists = (dir, file) =>
  fetch(`/images/${dir}/${file}`)
    .then((res) => {
      if (!res.ok) return false
      const contentType = res.headers.get('Content-Type')
      return typeof contentType === 'string' && contentType.startsWith('image/')
    })
    .catch((err) => {
      console.error(err)
      return false
    })

export default imageExists
