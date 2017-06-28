export default function googlePlaceAutocompleteConfig(form_name){
  var input = document.getElementById('icon_full_address');
  var options = { componentRestrictions: {country: ['fr', 'be', 'ch']} };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE
  google.maps.event.addDomListener(input, 'keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
}
