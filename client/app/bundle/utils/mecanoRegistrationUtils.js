import { change } from 'redux-form';

export function formatDomainDataForSubmit(values){
  const data = []
  Object.keys(values).map((k)=>{
      if(values[k] !== ""){data.push({kind: "technical_skill", value: k})};
    }
  )
}

export function googleMapsAutocomplete(input, options, dispatch, form, field){
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  //DON'T SUBMIT ON PRESS-ENTER IN AUTOCOMPLETE
  google.maps.event.addDomListener(input, 'keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
  // Change value on autocomplete click
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    triggerAutocomplete(this.getPlace().formatted_address)
  });
  const triggerAutocomplete = (value) => {
    dispatch(change(form, field, value));
  }
}

export function formatRegistrationData(values, mobile, pro){
  values['mobile'] = mobile === 'mobile';
  values['pro'] = pro === 'pro';
  splitAdress(values)
  return values
}

function splitAdress(values){
  const splitted_address = values.full_address.split(',');
  values['country'] = splitted_address[splitted_address.length - 1];
  values['city'] = splitted_address[splitted_address.length - 2];
  values['address'] = splitted_address[splitted_address.length - 3];
  return values;
}
