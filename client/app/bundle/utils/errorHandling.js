import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

export default function errorHandling(response) {
  switch (response.status) {
    case 401:
      browserHistory.push('/login');
      toastr.error(response.data.errors);
      break;
    default:

  }
};
