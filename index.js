module.exports = function(sails) {

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
        level: 'error'
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     */
    initialize: function(cb) {

      if (!sails.config[this.configKey].active) {
        sails.log.verbose("Autoreload hook deactivated.");
        return cb();
      }

      if (!sails.config[this.configKey].dsn) {
        sails.log.verbose("DSN for Sentry is required.");
        return cb();
      }

      var raven = require('raven');
      var client = new raven.Client(
        sails.config[this.configKey].dsn, {
          level: sails.config[this.configKey].level
        }
      );

      sails.sentry = client;
      sails.on('router:request:500', function(err) {
        client.captureError(err);
      });
      // We're done initializing.
      return cb();

    },

  };

};
