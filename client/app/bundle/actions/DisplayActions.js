import { WHITE_NAVBAR_SET } from './types'

export function setWhiteNavbar(bool){
  return {
    type: WHITE_NAVBAR_SET,
    white_navbar: bool
  };
}
