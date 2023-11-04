import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, Paper, TextField, FormHelperText, Grid, NativeSelect, Button, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useState} from 'react'
//C:/Users/HowToDoThis/Desktop/Bootcamp 2022/react_hookform/rhf-demo
import customData from '../../sample.json';
import { randomNumberBetween } from "@mui/x-data-grid/utils/utils";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { id:0, title: 'The Shawshank Redemption', year: 1994 },
  { id:1, title: 'The Godfather', year: 1972 },
  { id:2, title: 'The Godfather: Part II', year: 1974 },
  { id:3, title: 'The Dark Knight', year: 2008 },
  { id:4, title: '12 Angry Men', year: 1957 },
  { id:5, title: "Schindler's List", year: 1993 },
  { id:6, title: 'Pulp Fiction', year: 1994 }
]

const daList = [
  { id:0, title: 'Phone number', type: "string" },
  { id:1, title: 'Email', type: "string" },
  { id:2, title: 'Date of birth', type: "date" },
  { id:3, title: 'Last Name', type: "string" },
  { id:4, title: 'Deadline Date', type: "date" },
  { id:5, title: "Address", type: "string" },
  { id:6, title: 'Region', type: "string" }
]


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const columns2: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'isActive', headerName: 'Active?', width: 90 },
  { field: 'balance', headerName: 'Balance', width: 90 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'name', headerName: 'Name', width: 120 },
  { field: 'gender', headerName: 'Gender', width: 90 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'registered', headerName: 'Registered Date', width: 250 },
  { field: 'favoriteFruit', headerName: 'Favorite Fruit', width: 120 },
];

export default function DataGrid2() {

  const opList = ['contains', 'equals', 'is empty', 'is not empty']
  const columnList =  Object.keys(customData[0])

  const [column, setColumn] = useState('')
  const [operator, setOperator] = useState('')
  const [currentValue, setCurrentValue] = useState('')

  const handleChange = (e:any) => {
    // console.log(e.target.value)
    setColumn(e.target.value)
  }
  const handleChangeOp = (e:any) => {
    // console.log(e.target.value)
    setOperator(e.target.value)
  }

  const [newData, setNewData] = useState<any>('')

  const handleClick = (e:any) => {
    console.log('clicked')
    // console.log(column)
    // console.log(operator)
    // console.log(currentValue)

    if (column === '' || operator === ''){
      console.log('cannot be empty')
    } else if (currentValue === '' && !(operator === 'is empty' || operator === 'is not empty')) {
      console.log('value cannot be empty if operator is not equal to is empty or is not empty')
    } else{
      if (operator === 'equals') {
        setNewData(customData.filter((item:any) => String(item[column]) === currentValue));
      } else if (operator === 'contains') {
        setNewData(customData.filter((item:any) => String(item[column]).includes(currentValue)));
      } else if (operator === 'is empty') {
        setNewData(customData.filter((item:any) => String(item[column]) === '' || item[column] === null));
        //console.log(customData.filter((item:any) => String(item[column]) === '' || item[column] === null));
      } else if (operator === 'is not empty') {
        setNewData(customData.filter((item:any) => !(String(item[column]) === '' || item[column] === null)));
        //console.log(customData.filter((item:any) => !(String(item[column]) === '' || item[column] === null)));
      }
    }
  }
  const handleClear = () => {
    setColumn('')
    setOperator('')
    setCurrentValue('')
    setNewData('')
  }


  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <Paper>
        <Grid container>
          <Grid item xs={1}>
          <FormHelperText>Column</FormHelperText>
          <NativeSelect
            value={column}
            fullWidth
            onChange={handleChange}
          >
            <option key={new Date().getTime() + 'select'} value={''}>Select an option</option>
            {
              columnList.map((item)=>{
                return <option key={new Date().getTime() + item} value={item}>{item}</option>
              })
            }
          </NativeSelect>
          </Grid>
          <Grid item xs={1} sx={{paddingLeft:'1em'}}>
          <FormHelperText>Operator</FormHelperText>
          <NativeSelect
            value={operator}
            sx={{width:'10em'}}
            onChange={handleChangeOp}
          >
            <option key={new Date().getTime() + 'select2'} value={''}>Select an operator</option>
            {
              opList.map((item)=>{
                return <option key={new Date().getTime() + item} value={item}>{item}</option>
              })
            }
          </NativeSelect>
          </Grid>
          <Grid item xs={1} sx={{paddingLeft:'2em'}} hidden={(operator === 'is empty' || operator === 'is not empty')}>
          <FormHelperText>Value</FormHelperText>
          <TextField size='small' onChange={(e)=>{ setCurrentValue(e.target.value)}} value={currentValue}>
          </TextField>
          </Grid>
          <Grid item xs={1} sx={{paddingLeft:'1.5em', paddingTop:'1em'}}>
          <Button variant='contained' onClick={handleClick}>filter</Button>
          </Grid>
          <Grid item xs={1} sx={{paddingTop:'1em', marginLeft:'-50px'}}>
          <Button variant='contained' color='error' onClick={handleClear}>Clear</Button>
          </Grid>
        </Grid>
      </Paper>
      <DataGrid
        rows={(newData !== '') ? newData : customData} //rows
        columns={columns2} //columns
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        autoHeight
        pageSizeOptions={[10,20,50,100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
