# Monite Case Study

Case: [Monite Study Case](https://monite.notion.site/2024-04-Case-Study-v3-Frontend-Engineer-c7e9f50c81fc4692bd93a052be09dd7a)

### Installing

Consider installing dependencies using npm `npm install` 

Consider installing json-server globally `npm install -g json-server` 

Execute json-server to load our database / api routes `npx json-server db.json`

### Project

Project created using [Material UI Components](https://mui.com/material-ui/), [React TanStackQuery](https://tanstack.com/query/latest), [React Hook Form](https://react-hook-form.com/)

### Walkthrough

#### Home Component
  - Header Component with Typography and Buttons from MUI
  - DataTable Mui Component
    - Fetching Products data using useQuery

![Home Component](https://github.com/ttorquati/monite-challenge/blob/master/public/Screenshot_1.png?raw=true)

#### Dialog Component
  - Dialog, Inputs, Buttons MUI Components
  - Units Input Component is an AutoComplete Free Solo MUI Component
    - Units List fetching Units data using useQuery
    - Add New Unit POST data using Mutations 
      - Post Mutation invalidates query to update Unit List with new record
      - SnackBar appears to notify the user
  - Add Prodcut POST data using Mutations
    - Post Mutation invalidates query to update Products Table with new record
    - SnackBar appears to notify the user
