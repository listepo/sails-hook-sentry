# sails-hook-sentry

[Sails JS](http://sailsjs.org) hook to log errors and stack traces in [Sentry](https://github.com/getsentry/sentry) from within your Sails.js applications.

[![npm version](https://badge.fury.io/js/sails-hook-sentry.svg)](http://badge.fury.io/js/sails-hook-sentry)
[![Dependency Status](https://david-dm.org/listepo/sails-hook-sentry.svg)](https://david-dm.org/listepo/sails-hook-sentry)
[![devDependency Status](https://david-dm.org/listepo/sails-hook-sentry/dev-status.svg)](https://david-dm.org/listepo/sails-hook-sentry#info=devDependencies)


### Installation

`npm install sails-hook-sentry`

### Usage
*requires at least sails >= 0.11*

### Configuration

By default, configuration lives in `sails.config.sentry`.  The configuration key (`sentry`) can be changed by setting `sails.config.hooks['sails-hook-sentry'].configKey`.

#### Example

```javascript
// [your-sails-app]/config/sentry.js
module.exports.sentry = {
  active: true,
  dsn: "{{ DSN }}",
  level: 'error'
};
```

```javascript
// [your-sails-app]/api/controllers/UserController.js
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function(req, res) {
		sails.sentry.captureMessage("Another message");
		res.ok('ok');
	}
};
```
More *sails.sentry* methods [raven-node](https://github.com/getsentry/raven-node)
