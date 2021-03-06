var update = require('react/addons').addons.update;
var findIndex = require('find-index');

var extension = require('../../extension.js');


var createStore = require('../core').createStore;

var BuilderStore = createStore('OptionsStore', {
  handlers: {
    'GET_OPTIONS_START': 'onGetOptionsStart',
    'GET_OPTIONS_SUCCESS': 'onGetOptionsSuccess',
    'GET_OPTIONS_FAILURE': 'onError',
    'SET_OPTION_START': 'onSetOptionStart',
    'SET_OPTION_SUCCESS': 'onSetOptionSuccess',
    'SET_OPTION_FAILURE': 'onError'
  },

  initialize: function() {
    this.config = extension.getConfig();
    this.loading = true;
    this.options = {};
    this.manifest = chrome.runtime.getManifest();
    document.title = this.manifest.name + ' ' + this.manifest.version;
  },

  onGetOptionsStart: function(payload) {
    // this.loading = true;
    this.emitChange();
  },

  onGetOptionsSuccess: function(payload) {
    this.options = update(this.options, { $merge: payload });
    this.loading = false;
    this.emitChange();
  },

  onSetOptionStart: function(payload) {
    this.options = update(this.options, { $merge: payload });
    // this.loading = true;
    this.emitChange();
  },

  onSetOptionSuccess: function() {
    // this.loading = false;
    this.emitChange();
  },

  getConfig: function() {
    return this.config;
  },

  getOptions: function() {
    var self = this;
    var res = {};
    Object.keys(this.config).forEach(function(option){
      res[option] = self.getOption(option);
    });
    return res;
  },

  getOption: function(option) {
    if ('undefined' === typeof this.options[option]) {
      this.options[option] = this.config[option].default;
    }
    return this.options[option];
  },

  getConfig: function() {
    return this.config;
  },

  getManifest: function() {
    return this.manifest;
  },

  onError: function (error) {
    throw error;
  },

  isLoading: function() {
    return this.loading;
  }

});


exports = module.exports = BuilderStore;
