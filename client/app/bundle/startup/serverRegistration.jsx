import ReactOnRails from 'react-on-rails';
import Root from '../containers/ServerRoot';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';


addLocaleData([...en, ...fr]);


ReactOnRails.register({
  Root,
});
