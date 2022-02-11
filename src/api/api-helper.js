import axios from 'axios';

const API_URL = 'https://wallet.goit.ua/api';

export const signUserUp = async signUpDto => {
  const response = await axios.post(`${API_URL}/auth/sign-up`, signUpDto);
  const userData = response.data;
  return userData;
};

export const signUserIn = async signInDto => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, signInDto);
  const userData = response.data;
  return userData;
};

export const getCurrentUser = async token => {
  const response = await axios.get(`${API_URL}/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const currentUser = response.data;
  return currentUser;
};

export const signUserOut = async token => {
  await axios.delete(`${API_URL}/auth/sign-out`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};