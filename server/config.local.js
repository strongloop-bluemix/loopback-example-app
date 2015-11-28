module.exports = {
  remoting: {
    errorHandler: {
      handler: function (err, req, res, next) {
        var app = req.app;

        // custom API error handling logic
        app.logger.error('{type:\'remoting\', method:\'%s\', original_url:\'%s\', status_code:\'%s\', message:\'%s\'}', req.method, res.req.originalUrl, err.statusCode, err.message);

        // call next() to fall back to the default error handler
        next();
      }
    }
  }
};
