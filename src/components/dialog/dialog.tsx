import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, createFilterOptions } from "@mui/material";

import { UnitInputValue } from "../../types/unit";
import { UnitsService } from "../../services/units.service";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDropDown, ArrowDropUp, EuroSymbol } from "@mui/icons-material";
import { Product } from "../../types/product";
import { ProductsService } from "../../services/products.service";
import { Snackbar } from "../snackbar";

const filter = createFilterOptions<UnitInputValue>();

type DialogModalProps = {
  open: boolean
  handleClose: () => void
}

export function DialogModal({ open = false, handleClose }: DialogModalProps) {
  const [unitValue, setUnitValue] = useState<UnitInputValue | null>(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success')
  const [unitOpen, setUnitOpen] = useState(false)

  const unitQueryService = new UnitsService()
  const unitsQuery = unitQueryService.useUnits()

  const queryClient = useQueryClient()
  const createUnitMutation = unitQueryService.useAddUnit(queryClient)

  const productQueryService = new ProductsService()
  const createProductMutation = productQueryService.useAddProducts(queryClient)

  const { register, handleSubmit, control, setValue, reset } = useForm<Product>()

  useEffect(() => {
    setValue('unit', unitValue?.title || '');
  }, [unitValue, setValue]);

  const handleAddUnit = (value: string) => {
    createUnitMutation.mutate({ title: value }, {
      onSuccess: async () => {
        setSnackMessage(`The '${value}' was added as a new measuring unit`)
        setSnackOpen(true)
        setSnackSeverity('success')
      },
      onError: async () => {
        setSnackMessage(`The '${value}' was not added as a new measuring unit`)
        setSnackOpen(true)
        setSnackSeverity('error')
      }
    })
  }

  const onSubmit: SubmitHandler<Product> = (data) => {
    createProductMutation.mutate(data, {
      onSuccess: async () => {
        setSnackMessage(`Product '${data?.name}' was added as a new measuting unit`)
        setSnackOpen(true)
        setSnackSeverity('success')
        reset()
        handleClose()
      },
      onError: async () => {
        setSnackMessage(`Product '${data?.name}' was not added as a new measuting unit`)
        setSnackOpen(true)
        setSnackSeverity('error')
      }
    })
  }

  const handleSnackClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Controller 
              name="type"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <RadioGroup {...field} row onChange={(_, value) => field.onChange(value)} value={field.value}>
                    <FormControlLabel value="Product" control={<Radio />} label="Product" />
                    <FormControlLabel value="Service" control={<Radio />} label="Service" />
                  </RadioGroup>
                </FormControl>
              )}
            />

            <TextField id="name" label="Product name" variant="outlined" {...register('name')} />

            <TextField id="description" label="Description" variant="outlined" {...register('description')} />

            <Controller 
              name="unit"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={unitValue}
                  sx={{ width: 300 }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  open={unitOpen}
                  onOpen={() => setUnitOpen(true)}
                  onClose={() => setUnitOpen(false)}
                  options={unitsQuery.data as UnitInputValue[] || []}
                  onChange={(_, newValue) => {
                    if (typeof newValue === 'string') {
                      setUnitValue({
                        title: newValue,
                      });
                      field.value = newValue
                    } else if (newValue && newValue.inputValue) {
                      handleAddUnit(newValue.inputValue);
                      setUnitValue({
                        title: newValue.inputValue,
                      });
                      field.value = newValue.inputValue
                    } else {
                      setUnitValue(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;

                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  renderInput={(params) => (
                    <TextField {...params} 
                      label="Items" 
                      InputProps={
                        { 
                          ...params.InputProps, 
                          endAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              {unitOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                            </>
                          )
                        }
                      }
                    />
                  )}
                />
              )}
            />

            <TextField 
              id="price" 
              label="Unit price (net)" 
              variant="outlined"
              InputProps={{startAdornment: (<EuroSymbol fontSize="small" />)}}
              {...register('price')}
            />

            <Controller 
              name="vat"
              defaultValue="10%"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select {...field} value={field.value}>
                    <MenuItem value={'10%'}>10%</MenuItem>
                    <MenuItem value={'12%'}>12%</MenuItem>
                    <MenuItem value={'14%'}>14%</MenuItem>
                    <MenuItem value={'16%'}>16%</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit(onSubmit)}
            disabled={createProductMutation.isPending}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        message={snackMessage}
        onClose={handleSnackClose}
        severity={snackSeverity}
      >
      </Snackbar>
    </>
  )
}