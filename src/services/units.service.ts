import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "./api";
import { Unit } from "../types/unit"

export class UnitsService {
  apiService: ApiService

  constructor() {
    this.apiService = new ApiService()
  }

  useUnits = () => {
    return useQuery({
      queryKey: ['units'],
      queryFn: this.apiService.getUnits
    })
  }

  useAddUnit = (queryClient: QueryClient) => {
    return useMutation({
      mutationFn: (unit: Unit) => this.apiService.addUnit(unit),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['units'] })
      }
    })
  }
}