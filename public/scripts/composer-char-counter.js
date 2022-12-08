$(document).ready(function() {
  $('textarea.input').on('input', onChange);

});

const onChange = function(e) {
  const input = $(this);
  const text = input.val();
  // const text = $('.input').val() //"old js way"
  const remaining = 140 - text.length;

  const form = input.closest('form');
  const output = form.find('output');


  output.text(remaining);
  if (remaining < 0) {
    output.addClass('red');
  } else {
    output.removeClass('red');
  }

};


