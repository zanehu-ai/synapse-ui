import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export interface CreateClientOptions {
  baseURL: string
  timeout?: number
  withCredentials?: boolean
  getToken?: () => string | null
  onUnauthorized?: () => void
  unauthorizedCodes?: number[]
}

export interface TypedClient {
  instance: AxiosInstance
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>
}

export function createClient(options: CreateClientOptions & {
  getToken: () => string | null
  onUnauthorized: () => void
}): TypedClient
export function createClient(options: CreateClientOptions): AxiosInstance
export function createClient(options: CreateClientOptions): AxiosInstance | TypedClient {
  const {
    baseURL,
    timeout = 30000,
    withCredentials,
    getToken,
    onUnauthorized,
    unauthorizedCodes = [401, 1002],
  } = options

  const instance = axios.create({
    baseURL,
    timeout,
    withCredentials,
    headers: { 'Content-Type': 'application/json' },
  })

  if (!getToken || !onUnauthorized) {
    return instance
  }

  instance.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      const { data } = response
      if (data && typeof data === 'object' && 'code' in data) {
        if (data.code !== 0 && data.code !== 200) {
          if (unauthorizedCodes.includes(data.code)) {
            onUnauthorized()
          }
          return Promise.reject(new Error(data.msg || data.message || 'Request failed'))
        }
        return data.data
      }
      return data
    },
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized()
      }
      return Promise.reject(error)
    },
  )

  return {
    instance,
    get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
      instance.get(url, config) as unknown as Promise<T>,
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      instance.post(url, data, config) as unknown as Promise<T>,
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      instance.put(url, data, config) as unknown as Promise<T>,
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
      instance.delete(url, config) as unknown as Promise<T>,
    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      instance.patch(url, data, config) as unknown as Promise<T>,
  }
}
