import { SAVE_USERINFO, DELETE_USERINFO } from '../action_types';

export const createSaveUserInfoAction = personObj => {
  const { user, token } = personObj;
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  return {
    type: SAVE_USERINFO,
    data: personObj
  };
};

export const createDeleteUserInfoAction = () => {
  localStorage.clear();
  return { type: DELETE_USERINFO, data: '' };
};
