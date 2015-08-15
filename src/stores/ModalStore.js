/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * ModalStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ModalConstants = require('../constants/ModalConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _data = {
  status: false,
  coverage: ''
};

/**
 * Delete all the completed TODO items.
 */
function openModal(coverage) {
  _data.status = true;
  _data.coverage = coverage;
}

var ModalStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return {
      status: _data.status,
      coverage: _data.coverage
    };
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case ModalConstants.OPEN_MODAL:
      openModal(action.coverage);
      ModalStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ModalStore;
