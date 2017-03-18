module.exports = function Sentry(sails) {
  return {
    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {
      __configKey__: {
        // Set autoreload to be active by default
        active: true,
        dsn: null,
        options: {}
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     * @return {Function} cb Callback for when we're done initializing
     */
    initialize: function(cb) {
      var settings = sails.config[this.configKey];
      if (!settings.active) {
        sails.log.verbose('Autoreload hook deactivated.');
        return cb();
      }

      if (!settings.dsn) {
        sails.log.verbose('DSN for Sentry is required.');
        return cb();
      }

      var Raven = require('raven');
      Raven.config(settings.dsn, settings.options).install();

      sails.sentry = Raven;
      sails.on('router:request:500', function(err) {
        Raven.captureException(err);
      });
      // We're done initializing.
      return cb();
    }
  };
};
