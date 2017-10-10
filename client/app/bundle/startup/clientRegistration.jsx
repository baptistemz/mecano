import ReactOnRails from 'react-on-rails';
import Root from '../containers/ClientRoot';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

// Initizalize all locales for react-intl.
addLocaleData([...en, ...fr]);
console.log("client")
// This is how react_on_rails can see the App in the browser.
ReactOnRails.register({
  Root,
});
