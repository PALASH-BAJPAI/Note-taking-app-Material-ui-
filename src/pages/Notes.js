import React,{useEffect} from 'react'
import { useState } from 'react'
import NoteCard from '../components/NoteCard';

import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import '../index.css';
import Masonry from 'react-masonry-css';


export default function Notes() {
   
  const [notes,setNotes] =useState([]);

  useEffect(()=>{
    fetch('http://localhost:8000/notes')
      .then(res=>res.json())
      .then(data=>setNotes(data))
  },[])


  const handleDelete=async (id)=>{
    await fetch('http://localhost:8000/notes/'+id,{
      method: 'DELETE'
    })
    const newNotes =notes.filter( note=>note.id!=id )
    setNotes(newNotes);
  }

  const breakpoints={
    default:3,
    1100: 2,
    700 :1
  }
  return (
    <Container>
      <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName='my-masonry-grid_columns'
      >

      {notes.map(note=>(
        <div key={note.id} style={{marginBottom:"30px",marginLeft:"20px"}}>
          <NoteCard note={note} handleDelete={handleDelete} />
        </div> 
      ))}

    </Masonry>
    </Container>
  )
}
