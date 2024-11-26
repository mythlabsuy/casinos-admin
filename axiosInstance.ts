import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { signOut } from './auth';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_HOST,  
  timeout: 10000,
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response is successful, just return it
    return response;
  },
  async (error: AxiosError) => {
    // Check if the error response is 401
    if (error.response?.status === 401) {
      try {
        // Trigger the signOut function to log out the user
        await signOut({  redirect: true, redirectTo: '/login' });

      } catch (signOutError) {
        console.error('SignOut failed:', signOutError);
      }

      // Optionally, throw an error to handle it in the calling code
      return Promise.resolve({ data: null, status: 401 } as AxiosResponse);
    }

    // Handle other errors or pass the error to the next handler
    return Promise.reject(error);
  }
);

export default axiosInstance;
