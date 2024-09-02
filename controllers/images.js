const create = async (req, res, next) => {
  const image = await Image.create(req.body)
  // Sets a pretext "imageId" for our upload middleware
  req.imageId = image.id
  // Invoke our upload middleware with next()
  next()
  res.redirect('/images/' + image.id)
}
const update = async (req, res, next) => {
  const image = await Image.update(req.body, {
    where: { id: req.params.id }
  })
  // Sets a pretext "imageId" for our upload middleware
  req.imageId = req.params.id
  // Invoke our upload middleware with next()
  next()
  res.redirect('/images/' + req.params.id)
}
