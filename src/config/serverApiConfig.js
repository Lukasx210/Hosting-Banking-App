export const API_BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE == 'remote'
    ? import.meta.env.VITE_BACKEND_SERVER + 'api/'
    : 'http://localhost:8082/api/';
export const BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
    ? import.meta.env.VITE_BACKEND_SERVER
    : 'http://localhost:8082/';

export const WEBSITE_URL = import.meta.env.PROD
  ? 'http://cloud.idurarapp.com/'
  : 'http://localhost:3000/';
export const DOWNLOAD_BASE_URL =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
    ? import.meta.env.VITE_BACKEND_SERVER + 'download/'
    : 'http://localhost:8082/download/';
export const ACCESS_TOKEN_NAME = 'x-auth-token';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_MANAGER = 'ROLE_MANAGER';
export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
export const EDITOR_API_KEY = import.meta.env.VITE_EDITOR_API_KEY;
