import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import {makeStyles,FormControlLabel} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { RadioGroup } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';

import {useHistory} from 'react-router-dom';

const useStyles =makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
})


export default function Create() {

  const classes=useStyles();
  const history=useHistory();   //Used for redireecting
  const [title,setTitle]=useState('')
  const [details,setDetails]=useState('')
  const [titleError,setTitleError]=useState(false)
  const [detailsError,setDetailsError]=useState(false)
  const [category,setCategory]=useState('todos')

  const handleSubmit=(e)=>{
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if(title==''){
      setTitleError(true);
      console.log(titleError)
    }
    if(details==''){
      setDetailsError(true);
    }
    if(title && details){
      fetch("http://localhost:8000/notes",{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({title,details,category})
      }).then(()=>history.push('/'))
    }

  }



  return (
    <Container>
    <Typography variant="h6" color='textSecondary' gutterBottom>
      Create a New Note
    </Typography>


    <form novalidate autocomplete="off" onSubmit={handleSubmit}>

      <TextField
      onChange={(e)=>setTitle(e.target.value)}
      className={classes.field}
      label="Note Title"
      color="primary"
      variant="outlined"
      fullWidth
      required
      error={titleError}
      />

      <TextField
      onChange={(e)=>setDetails(e.target.value)}
      className={classes.field}
      label="Details"
      color="primary"
      variant="outlined"
      multiline
      rows={4}
      fullWidth
      required
      error={detailsError}
      />


    <FormControl className={classes.field}>
      <FormLabel>Note Category</FormLabel>
      <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)} >
      <FormControlLabel value="todos" control={<Radio />} label="Todos" />
      <FormControlLabel value="reminders" control={<Radio />} label="Reminder" />
      <FormControlLabel value="money" control={<Radio />} label="Money" />
      <FormControlLabel value="work" control={<Radio />} label="Work" />
      </RadioGroup>
    </FormControl>


    <Button
     type='submit'
     variant="contained" 
     color='Secondary'
     endIcon={<ChevronRightOutlinedIcon />}>
      Submit
    </Button>


    
    </form>
    
    </Container>
  )
}
