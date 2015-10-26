module.exports = function (Location) {
    /*
    Location.disableRemoteMethod('create', true);
    Location.disableRemoteMethod('find', true);
    Location.disableRemoteMethod('upsert', true);
    Location.disableRemoteMethod('exists', true);
    Location.disableRemoteMethod('findById', true);
    Location.disableRemoteMethod('deleteById', true);
    Location.disableRemoteMethod('createChangeStream', true);
    Location.disableRemoteMethod('count', true);
    Location.disableRemoteMethod('updateAll', true);
    Location.disableRemoteMethod('findOne', true);
    Location.disableRemoteMethod('updateAttributes', false);

    Location.disableRemoteMethod('__get__inventory', false);
    Location.disableRemoteMethod('__create__inventory', false);
    Location.disableRemoteMethod('__delete__inventory', false);
    Location.disableRemoteMethod('__findById__inventory', false);
    Location.disableRemoteMethod('__destroyById__inventory', false);
    Location.disableRemoteMethod('__updateById__inventory', false);
    Location.disableRemoteMethod('__count__inventory', false);
    */

    Location.nearby = function (here, page, max, fn) {
        if (typeof page === 'function') {
            fn = page;
            page = 0;
            max = 0;
        }

        if (typeof max === 'function') {
            fn = max;
            max = 0;
        }

        var limit = 10;
        page = page || 0;
        max = Number(max || 100000);

        Location.find({
            // find locations near the provided GeoPoint
            where: {geo: {near: here, maxDistance: max}},
            // paging
            skip: limit * page,
            limit: limit
        }, fn);
    };

    // Google Maps API has a rate limit of 10 requests per second
    // Seems we need to enforce a lower rate to prevent errors
    var lookupGeo = require('function-rate-limit')(5, 1000, function () {
        var geoService = Location.app.dataSources.geo;
        geoService.geocode.apply(geoService, arguments);
    });

    Location.beforeSave = function (next, loc) {
        if (loc.geo) return next();

        // geo code the address
        lookupGeo(loc.street, loc.city, loc.state, function (err, data) {
                if (data && data[0]) {
                    loc.geo = data[0].lng + ',' + data[0].lat;

                    next();
                } else {
                    next(new Error('could not find location'));
                }
            });
    };

    Location.remoteMethod('nearby', {
        description: 'Find nearby locations around the geo point',
        accepts: [
            {
                arg: 'here',
                type: 'GeoPoint',
                required: true,
                description: 'geo location (lng & lat)'
            },
            {
                arg: 'page',
                type: 'Number',
                description: 'number of pages (page size=10)'
            },
            {
                arg: 'max',
                type: 'Number',
                description: 'max distance in miles'
            }
        ],
        returns: {
            arg: 'locations',
            root: true
        },
        http: {
            verb: 'GET'
        }
    });
};
