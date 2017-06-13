export default function autocomplete(input_id, list_id, list) {
  var initialArray = [];
  initialArray = $(`#${list_id} option`);
  $(`#${input_id}`).keyup(function() {
    var inputVal = $(`#${input_id}`).val();
    if (inputVal != '' && inputVal!= 'undefined') {
      var options = '';
      for (var i = 0; i < list.length; i++) {
        if (list[i].toLowerCase().startsWith(inputVal.toLowerCase())) {
          options += '<option value="' + list[i] + '" />';
        }
      }
      document.getElementById(list_id).innerHTML = options;
    }else{
      var options = '';
      for (var i = 0; i < initialArray.length; i++) {
        options += '<option value="' + initialArray[i].value + '" />';
      }
      document.getElementById(list_id).innerHTML = options;
    }
  });
};
