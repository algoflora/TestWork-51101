import {USER_TOKEN} from './store'

export const getToken = () => {
  return localStorage.getItem(USER_TOKEN) || '';
}
