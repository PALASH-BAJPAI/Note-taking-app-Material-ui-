import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

import { Drawer,Typography } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon,ListItemText } from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory ,useLocation} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';

import {format} from 'date-fns';


const drawerWidth=240;

const useStyles =makeStyles({
    page:{
        background:'#f9f9f9',
        width:'100%',
        padding:"20px"
    },
    drawer:{
        width:drawerWidth
    },
    drawerPaper:{
        width:drawerWidth
    },
    root:{
        display: 'flex',
    },
    active:{
        background:"#f4f4f4"
    },
    appbar:{
        width:`calc(100% - ${drawerWidth}px)`,
        background:"#f4f4f4",
        color:"black"
    },
    toolbar:{
        marginTop:"5%"
    },
    date:{
        flexGrow:1
    },
    avatar:{
        marginLeft:"10px"
    }

})


export default function Layout({children}){
    const classes =useStyles();
    const history=useHistory();
    const location=useLocation();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    

    

    const menuItems=[
        {
            text:"My Notes",
            icon:<SubjectOutlined color="secondary" />,
            path:'/'
        },
        {
            text:"Create Note",
            icon:<AddCircleOutlineOutlined color='secondary' />,
            path:'/create'
        }

    ]


    return(
        <div className={classes.root}>
            {/* app bar */}
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}> Today is { format(new Date(),'do MMMM Y') }</Typography>
                    <Typography> Palash </Typography><Avatar className={classes.avatar} src="/Capture2.png" />
                </Toolbar>
            </AppBar>

            {/* sidebar */}
            <Drawer className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper :classes.drawerPaper}}>
                <div>
                    <Typography variant="h5">
                        NOTES
                    </Typography>
                </div>


                {/* list links */}
                <List>
                    {menuItems.map(item=>(
                        <ListItem key={item.text}
                         button
                         onClick={()=> history.push(item.path)}
                         className={location.pathname==item.path ? classes.active :null}
                        >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                   
                </List>


            </Drawer>

            <div className={classes.page}>
            <div className={classes.toolbar}>
            {children}
            </div>
            </div>
        </div>
    )
}