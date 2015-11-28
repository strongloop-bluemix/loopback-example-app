module.exports = function(options) {
  return function fourOhFourError(req, res, next) {
    res.status(404).sendFile(options.path);

    var app = req.app;

    app.logger.info('{type:\'404 Error\', method:\'%s\', original_url:\'%s\', status_code:\'%s\'}',
      req.method, res.req.originalUrl, res.req.originalUrl, res.statusCode);
  };
}
