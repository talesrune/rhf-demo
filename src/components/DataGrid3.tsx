import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, Paper, TextField, FormHelperText, Grid, NativeSelect, Button, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useState} from 'react'
//C:/Users/HowToDoThis/Desktop/Bootcamp 2022/react_hookform/rhf-demo
import customData from '../../sample.json';
import { randomNumberBetween } from "@mui/x-data-grid/utils/utils";

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

export default function DataGrid3() {

  const opList = ['contains', 'equals', 'is empty', 'is not empty']
  const columnList =  Object.keys(customData[0])

  const [column, setColumn] = useState<string[]>([''])
  const [operator, setOperator] = useState<string[]>([''])
  const [currentValue, setCurrentValue] = useState<string[]>([''])
  const [newData, setNewData] = useState<any>('')
  const [isOr, setIsOr] = useState(false)

  const handleChange = (e:any, index:number) => {
    let updatedColumn = [...column]
    updatedColumn[index] = e.target.value
    setColumn(updatedColumn)
  }
  const handleChangeOp = (e:any, index:number) => {
    let updatedOp = [...operator]
    updatedOp[index] = e.target.value
    setOperator(updatedOp)
  }
  const handleChangeValue = (e:any, index:number) => {
    let updatedValue = [...currentValue]
    updatedValue[index] = e.target.value
    setCurrentValue(updatedValue)
  }

  

  const handleClick = () => {

    let tempData = customData; //AND function, stacks filtered results
    let tempData2:any[] = []; //OR function, merge and remove duplicate results

    for (let i = 0; i < column.length; i++) {
      if (column[i] === '' || operator[i] === ''){
        console.log('cannot be empty')
        alert('cannot be empty')
        break;
      } else if (currentValue[i] === '' && !(operator[i] === 'is empty' || operator[i] === 'is not empty')) {
        console.log('value cannot be empty if operator is not equal to is empty or is not empty')
        alert('value cannot be empty if operator is not equal to is empty or is not empty')
        break;
      } else{
        if (operator[i] === 'equals') {
          if(!isOr) {
            tempData = tempData.filter((item:any) => String(item[column[i]]).toLowerCase() === currentValue[i])
            setNewData(tempData);
          } else {
            tempData2 = [...new Set([...tempData2, ...customData.filter((item:any) => String(item[column[i]]).toLowerCase() === currentValue[i])])]
          }
        } else if (operator[i] === 'contains') {
          if(!isOr) {
            tempData = tempData.filter((item:any) => String(item[column[i]]).toLowerCase().includes(currentValue[i]))
            setNewData(tempData);            
          } else {
            tempData2 = [...new Set([...tempData2, ...customData.filter((item:any) => String(item[column[i]]).toLowerCase().includes(currentValue[i]))])]
          }
        } else if (operator[i] === 'is empty') {
          if(!isOr) {
            tempData = tempData.filter((item:any) => String(item[column[i]]) === '' || item[column[i]] === null)
            setNewData(tempData);            
          } else {
            tempData2 = [...new Set([...tempData2, ...customData.filter((item:any) => String(item[column[i]]) === '' || item[column[i]] === null)])]
          }
        } else if (operator[i] === 'is not empty') {
          if(!isOr) {
            tempData = tempData.filter((item:any) => !(String(item[column[i]]) === '' || item[column[i]] === null))
            setNewData(tempData);            
          } else {
            tempData2 = [...new Set([...tempData2, ...customData.filter((item:any) => !(String(item[column[i]]) === '' || item[column[i]] === null))])]
          }
        }
      }
    }
    if (isOr) {
      tempData2.sort((a,b)=>{
        if(a.id < b.id){
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
      setNewData(tempData2)
    }
  }

  const handleAdd = () => {
    setColumn([...column,''])
    setOperator([...operator,''])
    setCurrentValue([...currentValue,''])
  }
  const handleRemove = (index:number) => {
    let updatedColumn = [...column]
    let updatedOp = [...operator]
    let updatedValue = [...currentValue]

    updatedColumn.splice(index, 1)
    updatedOp.splice(index, 1)
    updatedValue.splice(index, 1)

    setColumn(updatedColumn)
    setOperator(updatedOp)
    setCurrentValue(updatedValue)
  }
  const handleClear = () => {
    setColumn([''])
    setOperator([''])
    setCurrentValue([''])
    setNewData('')
  }
  const handleOr = () => {
    setIsOr((prev)=> !prev)
  }

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <Paper>
        {column.map((item, index:number) => (
          <Grid container key={item}>
            <Grid item xs={0.8} sx={{paddingTop:'1em'}}>
              <Button variant='contained' color='error' onClick={()=> handleRemove(index)}>Remove</Button>
            </Grid>
            <Grid item xs={1}>
            <FormHelperText>Column</FormHelperText>
            <NativeSelect
              value={column[index]}
              fullWidth
              onChange={(e:any)=>handleChange(e, index)}
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
              value={operator[index]}
              sx={{width:'10em'}}
              onChange={(e:any)=>handleChangeOp(e, index)}
            >
              <option key={new Date().getTime() + 'select2'} value={''}>Select an operator</option>
              {
                opList.map((item)=>{
                  return <option key={new Date().getTime() + item} value={item}>{item}</option>
                })
              }
            </NativeSelect>
            </Grid>
            <Grid item xs={1} sx={{paddingLeft:'2em'}} hidden={(operator[index] === 'is empty' || operator[index] === 'is not empty')}>
            <FormHelperText>Value</FormHelperText>
            <TextField size='small' onChange={(e)=>{ handleChangeValue(e,index)}} value={currentValue[index]}>
            </TextField>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={4} sx={{backgroundColor:(isOr) ? 'pink':'gold'}} hidden={index === column.length - 1}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>{(isOr) ? 'OR' : 'AND'}</Typography>
              </Box>
            </Grid>            
          </Grid>
        ))}
        <Grid container>
        <Grid item xs={1} sx={{paddingTop:'1em'}}>
          <Button variant='contained' color='error' onClick={handleClear}>Clear</Button>
        </Grid>
        <Grid item xs={1} sx={{paddingTop:'1em'}}>
          <Button variant='contained' color='secondary' onClick={handleAdd}>Add</Button>
        </Grid>
        <Grid item xs={1} sx={{paddingTop:'1em'}}>
          <Button variant='contained' color={(isOr)?'warning':'success'} onClick={handleOr}>{(isOr)?'Change to AND':'Change to OR'}</Button>
        </Grid>
        <Grid item xs={1} sx={{paddingTop:'1em'}}>
          <Button variant='contained' onClick={handleClick}>filter</Button>
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
