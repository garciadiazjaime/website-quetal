var AppDispatcher = require('../dispatcher/AppDispatcher');
var ModalConstants = require('../constants/ModalConstants');

var ModalActions = {

  /**
   * @param {object} data
   */
  openModal: function(coverage) {
    AppDispatcher.dispatch({
      actionType: ModalConstants.OPEN_MODAL,
      coverage: coverage
    });
  }

};

module.exports = ModalActions;
