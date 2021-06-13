import React from "react";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { makeStyles, Typography } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutlined } from "@material-ui/icons";
import Avatar from '@material-ui/core/Avatar';
import {blue,green,pink,yellow} from '@material-ui/core/colors';


const useStyles =makeStyles({
    avatar:{
        backgroundColor:(note)=>{
            console.log(note.category);
            if(note.category=='work'){
            return yellow[700]
            }
            if(note.category=='money'){
                return green[500]
            }
            if(note.category=='todos'){
                return pink[500]
            }
            else{
            return blue[500]
            }
        }

    }
})


export default function NoteCard({note,handleDelete}){
    const classes=useStyles(note);
return(
    <div>
        
    <Card elevation={2}>
      <CardHeader
        avatar={
            <Avatar className={classes.avatar}>
                {note.category[0].toUpperCase()}
            </Avatar>
        }
        action={
            <IconButton onClick={()=>handleDelete(note.id)}>
                <DeleteOutlined />
            </IconButton>
        }

        title={note.title}
        subheader={note.category}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {note.details}
        </Typography>
      </CardContent>

    </Card>

    </div>
)
}