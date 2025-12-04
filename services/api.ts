import { cookies } from 'next/headers';
import api from '@/lib/axios';
import axios from 'axios';

export async function getAPIClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  const apiServer = axios.create({
    baseURL: api.defaults.baseURL,
    headers: {
      ...api.defaults.headers.common,
    },
  });

  apiServer.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return apiServer;
}