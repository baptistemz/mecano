import { toastr } from 'react-redux-toastr';

export default function errorHandling(response) {
  console.log(response)

  const messages = response.data.errors.full_messages || response.data.errors;
  for (var i = 0; i < messages.length; i++) {
    toastr.error(messages[i]);
  }
};
