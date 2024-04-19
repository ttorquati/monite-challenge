import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ProductsService } from '../../services/products.service';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'unit', headerName: 'Unit', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'vat', headerName: 'VAT', width: 130 },

]

export function Table() {
  const productQueryService = new ProductsService()
  const productsQuery = productQueryService.useProducts()

  return (
    <DataGrid
      rows={productsQuery.data || []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      density='comfortable'
      loading={productsQuery.isLoading}
    />
  )
}