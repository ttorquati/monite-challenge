import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { ApiService } from "./api"
import { Product } from "../types/product"

export class ProductsService {
  apiService: ApiService

  constructor() {
    this.apiService = new ApiService()
  }

  useProducts = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: this.apiService.getProducts
    })
  }

  useAddProducts = (queryClient: QueryClient) => {
    return useMutation({
      mutationFn: (product: Product) => this.apiService.addProduct(product),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['products'] })
      }
    })
  }
}