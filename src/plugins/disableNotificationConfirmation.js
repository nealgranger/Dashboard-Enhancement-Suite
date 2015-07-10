var disableNotificationConfirmation = {
  config: {
    name: 'disableNotificationConfirmation',
    type: 'checkbox',
    label: 'Instant notification delete:',
    description: 'Prevents delete confirmation dialog for individual notifications.',
    default: false
  },
  initialize: function() {
    this.origlnkDelete_Click = window.lnkDelete_Click;
  },
  activate: function() { 
    this.injectStylesheet(this.getUrl('resources/disableNotificationConfirmation.css'));

    // override the function that dislays the confirmation
    window.lnkDelete_Click = function() {
      return true;
    };
  },
  deactivate: function() {
    this.removeStylesheet(this.getUrl('resources/disableNotificationConfirmation.css'));
    
    window.lnkDelete_Click = this.origlnkDelete_Click;
  }
}

module.exports = disableNotificationConfirmation;