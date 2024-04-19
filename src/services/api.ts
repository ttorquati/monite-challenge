import axios, { AxiosInstance } from 'axios'

import { Unit } from '../types/unit';
import { Product } from '../types/product';

export class ApiService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })
  }

  getUnits = async () => {
    return (await this.axiosInstance.get<Unit[]>('/units')).data
  }

  addUnit = async (unit: Unit) => {
    return (await this.axiosInstance.post<Unit>('/units', unit)).data
  }

  getProducts = async () => {
    return (await this.axiosInstance.get<Product[]>('/products')).data
  }

  addProduct = async (product: Product) => {
    return (await this.axiosInstance.post<Product>('/products', product)).data
  }
}