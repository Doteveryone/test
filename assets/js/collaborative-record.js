$('.button').click(function() {
  $(this).find('i').toggleClass('fa-plus').toggleClass('fa-minus');
  $(this).toggleClass('active');
});

$('.bottom-button').click(function() {
  var buttons = $('.button');
  buttons.each(function() {
    var buttonEl = $(this).find('h2');
    var name = buttonEl.data('accordion-button');
    if (buttonEl.attr('data-open-screen')) {
      buttonEl.removeAttr('data-open-screen');
    } else {
      buttonEl.attr('data-open-screen', name)
    }
  });
});

$('.info-overlay').click(function() {
  $(this).fadeOut();
});

$('body').click(function() {
  $('.info-overlay').fadeOut();
  $('[contenteditable=true]').focus();
});

$('.person').click(function(event) {
  var x = event.clientX;
  var y = event.clientY;
  var $img = $('<img>', {class: 'target', src: 'assets/img/target.svg', style: 'left: ' + x + 'px; top: ' + y + 'px;'});
  $('.symptom-locator').append($img);

  var $this = $(this);
  var parent = $this.parents('[data-screen=step1]');

  $this.css({ height: 'auto' })
  parent.find('.stacked-buttons').removeClass('hidden');
  parent.find('.bottom-button').addClass('hidden');
});

$('body').on('click', '.target', function() {
  var $this = $(this);
  var width = $this.width() * 1.2;
  $this.css({
    width: width,
    marginLeft: -(width/2),
    marginTop: -(width/2),
    maxWidth: 'none'
  });
});


// From the voice first day
var RecordingButton = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change:recording', this.render);
  },

  events: {
    'click ': 'toggle'
  },

  toggle: function(event) {
    event.preventDefault();
    this.model.toggleRecording();
  },

  render: function() {
    var recording = this.model.get('recording');

    if (recording) {
      this.$el.addClass('recording');
    } else {
      this.$el.removeClass('recording');
    }
  }
});

var VoiceApp = Backbone.Model.extend({
  initialize: function() {
    this.setUpRecordingButton();
  },

  setUpRecordingButton: function() {
    var buttonEl = document.getElementsByClassName('speak')[0];

    new RecordingButton({ model: this, el: buttonEl });
  },

  toggleRecording: function() {
    var recording = this.get('recording');

    if (recording) {
      this.unset('recording');
    } else {
      this.set('recording', true);
    }

  },

});


var voiceApp = new VoiceApp();

