import axios from 'axios';

export const login = async (uniqueIdentity: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      {
        uniqueIdentity,
        password,
      }
    );
    const {
      data: { data },
    } = response;
    const { accessToken } = data;
    localStorage.setItem('ACCESS_TOKEN', accessToken);
    return data;
  } catch (err) {
    throw new Error(
      (err as { response: { data: { message: string } } }).response.data.message
    );
  }
};

export const getUserLogedin = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/users/self/profile`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      }
    );
    const {
      data: { data },
    } = response;
    return data;
  } catch (err) {
    throw new Error(
      (err as { response: { data: { message: string } } }).response.data.message
    );
  }
};
