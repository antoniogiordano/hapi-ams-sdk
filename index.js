/**
 * Created by AntonioGiordano on 25/01/16.
 */

'use strict'

var AzureService  = require('./lib/service')
const Joi = require('joi');

const optionsSchema = Joi.object({
    client_id: Joi.string(),
    client_secret: Joi.string()
});

exports.register = (server, pluginOptions, next) => {

    optionsSchema.validate(pluginOptions, (err, options) => {

        if (err) {
            return next(err);
        }

        var amsService = new AzureService(pluginOptions)
        amsService.setToken((err) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                const expose = {
                    amsService
                };

                if (pluginOptions.decorate) {
                    const decorate = pluginOptions.decorate === true ? 'ams-sdk' : pluginOptions.decorate;
                    server.decorate('server', decorate, expose);
                    server.decorate('request', decorate, expose);
                } else {
                    Object.keys(expose).forEach((key) => {
                        server.expose(key, expose[key]);
                    });
                }

                next()
            }
        })
    })
}

exports.register.attributes = {
    pkg: require('./package.json')
}
