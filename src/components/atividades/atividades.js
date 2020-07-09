import React, {useState, useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Colors from '../../values/colors';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Logo from '../../images/logo.png';
import {Formik, useFormik} from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import instance from '../../services/api';
import ListGroup from 'react-bootstrap/ListGroup';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import TimerIcon from '@material-ui/icons/Timer';
import { Link } from 'react-router-dom';
import SubjectIcon from '@material-ui/icons/Subject';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory} from 'react-router-dom';
const drawerWidth = 240;
//material-ui drawer
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Atividades(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <Link to="/materias" style={{color: '#000'}}><ListItem button key={0}>
            <ListItemIcon>  <SubjectIcon/></ListItemIcon>
            <ListItemText primary={"Matérias"} />
          </ListItem></Link>
          <Link to="/metodos" style={{color: '#000'}}><ListItem button key={1}>
            <ListItemIcon>  <TimerIcon/></ListItemIcon>
            <ListItemText primary={"Métodos"} />
          </ListItem></Link>

          <Link to="/atividades" style={{color: '#000'}}><ListItem button key={2}>
            <ListItemIcon>  <AssignmentIcon/></ListItemIcon>
            <ListItemText primary={"Atividades"} />
          </ListItem></Link>

          <Link to="/usuarios" style={{color: '#000'}}><ListItem button key={4}>
            <ListItemIcon>  <GroupIcon/></ListItemIcon>
            <ListItemText primary={"Usuários"} />
          </ListItem></Link>
      </List>
      <Divider />
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const schema = yup.object({
    nome: yup.string().required("required"),
    prazo: yup.string().required(),
    valor: yup.string().required()
  });
  const [atividades, setAtividades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [metodos, setMetodos] = useState([]);
  const [materias, setMaterias] = useState([]);

  useEffect(()=>{
    console.log("effect");
    instance().get("get_atividade.php").then((result)=>{setAtividades(result.data);});
    instance().get("get_usuario.php").then((result)=>{setUsuarios(result.data);});
    instance().get("get_metodo.php").then((result)=>{setMetodos(result.data);});
    instance().get("get_materia.php").then((result)=>{setMaterias(result.data);});
    
  },[]);
  let history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar style={{flex: 1,backgroundColor: Colors.primaryColor}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          
           <Image src={Logo} width="190" height="45" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}/>
<ExitToAppIcon style={{position: 'absolute', left: '92%', top: '50%',transform: 'translate(-50%, -50%)', fontSize: 40}} onClick={()=>{localStorage.clear(); history.push("/login"); }}/>
          
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card style={{padding:10}}>
            <Card.Title  style={{alignSelf: 'center'}}>Atuais Atividades cadastradas</Card.Title>
            <ListGroup variant="flush" style={{flex:1}}>
                {atividades.map((atividade)=>{ return (<ListGroup.Item key={atividade.id}><Row><Col sm={10}>{atividade.nome}</Col> <Col><Link to={"/atividades/editar/" +atividade.id} onClick={()=>{let usuarioId; metodos.map((metodo) =>{if(metodo.id===atividade.id_metodo) atividade.id_metodo = metodo.nome;}); materias.map((materia)=>{if(materia.id===atividade.id_materia) atividade.id_materia =materia.nome;} );usuarios.map((usuario) =>{if(usuario.id === atividade.id_usuario) usuarioId = usuario.email;}  ); atividade.id_usuario = usuarioId; localStorage.setItem("atividade", JSON.stringify(atividade))}}><Button sm={1} variant="warning">Editar</Button></Link></Col><Col><Button sm={1} variant="danger" onClick={()=>{instance().post("delete_atividade.php", {id: atividade.id}).then(()=>props.history.go(0))}}>Apagar</Button></Col></Row></ListGroup.Item>)})}
            </ListGroup>
            <div style={{alignSelf: 'center', marginTop: 10}}> <Link to="/atividades/adicionar"><Button variant="primary" onClick={()=>console.log("clicked")}> Adicionar </Button></Link></div>
        </Card>
      </main>
    </div>
  );
}

export default Atividades;
