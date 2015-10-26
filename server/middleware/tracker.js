module.exports = function () {
  return function tracker(req, res, next) {
    var app = req.app;

    if(startsWith(req.url, '/api')) {
      var start = process.hrtime();

      res.once('finish', function () {
        var diff = process.hrtime(start);
        var ms = diff[0] * 1e3 + diff[1] * 1e-6;

        app.logger.info('{type:\'tracker\', method:\'%s\', original_url:\'%s\', status_code:\'%s\', duration_ms:%d}', req.method, res.req.originalUrl, res.statusCode, ms);
      });
    }

    next();
  };
};

function startsWith(a, str) {
  return a.slice(0, str.length) === str;
}
