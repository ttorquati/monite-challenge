import { useState } from "react"

import { Button, Grid, Typography } from "@mui/material"

import { DialogModal, Table } from "./components";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpen = () => {
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" maxWidth={1200} mx="auto" p={2}>
        <Grid item xs={12} md={10} sx={{ display: "flex", alignItems: "center" }} gap={2}>
          <Typography variant="h4" component="h1">Products</Typography>
          <Button variant="outlined">Guide me!</Button>
        </Grid>
        <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleOpen}>Add new</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <Table />
        </Grid>
      </Grid>

      
      <DialogModal open={dialogOpen} handleClose={handleClose} />
    </>
  )
}

export default App
