

export function checkPagination (req, res, next) {
  if (!req.query.page || req.query.page < 1) {
    req.query.page = 1;
  }
  if (!req.query.per_page || req.query.per_page < 1) {
    req.query.per_page = 10;
  }
  req.query.page = parseInt(req.query.page);
  req.query.per_page = parseInt(req.query.per_page);
  return next();
}

export function checkUserIdParam(req, res, next) {
  // console.log({ params: req.params.user_id, path: req.path });
  if (!req.params.user_id) {
    return res.status(404).send({ success: false, message: "User Id not found!"})
  }
  return next();
}
