import React,{useEffect, useState} from 'react';
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
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import TimerIcon from '@material-ui/icons/Timer';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Colors from '../values/colors';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Logo from '../images/logo.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CardImg } from 'react-bootstrap';
import instance from '../services/api';
import SubjectIcon from '@material-ui/icons/Subject';
import { Link } from 'react-router-dom';
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

function ResponsiveDrawer(props) {
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
          <Link to="materias" style={{color: '#000'}}><ListItem button key={0}>
            <ListItemIcon>  <SubjectIcon/></ListItemIcon>
            <ListItemText primary={"Matérias"} />
          </ListItem></Link>
          <Link to="metodos" style={{color: '#000'}}><ListItem button key={1}>
            <ListItemIcon>  <TimerIcon/></ListItemIcon>
            <ListItemText primary={"Métodos"} />
          </ListItem></Link>

          <Link to="atividades" style={{color: '#000'}}><ListItem button key={2}>
            <ListItemIcon>  <AssignmentIcon/></ListItemIcon>
            <ListItemText primary={"Atividades"} />
          </ListItem></Link>

          <Link to="usuarios" style={{color: '#000'}}><ListItem button key={4}>
            <ListItemIcon>  <GroupIcon/></ListItemIcon>
            <ListItemText primary={"Usuários"} />
          </ListItem></Link>
      </List>
      <Divider />
    </div>
  );
    const [usuario, setUsuario] = useState(0);
    const [materias, setMaterias] = useState(0);
    const [atividades, setAtividades] = useState(0);
    const [planos,setPlanos] = useState(0);
    const [minutos, setMinutos] = useState(0);
  const container = window !== undefined ? () => window().document.body : undefined;
  useEffect(()=>{
    instance().post("get_usuario.php").then((result) => setUsuario(result.data.length));
    instance().post("get_materia.php").then((result) => setMaterias(result.data.length));
    instance().post("get_plano.php").then((result) => setPlanos(result.data.length));
    let horas = 0;
    instance().post("get_atividade.php").then((result) => {setAtividades(result.data.length);result.data.map((atividade)=>{horas += parseInt(atividade.cronometro)}); setMinutos(horas)});
  });
  let history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar style={{flex: 1,backgroundColor: Colors.primaryDarkColor}}>
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
            <Row>                
                <Col lg>
                <Card>
                        <Card.Body >
                            <Row>
                            <Col xs={4}><GroupIcon style={{color: Colors.primaryColor, fontSize: 75}}/></Col>

                            <Col xs={8}>
                                <Card.Title>Assinaturas</Card.Title>
                                <Card.Text>Temos um total de {usuario} assinantes</Card.Text>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br></br>
                </Col>
                <Col lg>
                    <Card>
                        <Card.Body >
                            <Row>
                            <Col xs={4}><MonetizationOnIcon style={{color: Colors.primaryColor, fontSize: 75}} /></Col>

                            <Col xs={8}>
                                <Card.Title>Planos</Card.Title>
                                <Card.Text>Há {planos} planos cadastrados.</Card.Text>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br></br>
                </Col>
               
            </Row>
            <Row>                
            <Col lg>
                <Card>
                        <Card.Body >
                            <Row>
                            <Col xs={4}><AssignmentIcon style={{color: Colors.primaryColor, fontSize: 75}}/></Col>

                            <Col xs={8}>
                                <Card.Title>Atividades</Card.Title>
                                <Card.Text>Temos um total de {atividades} atividades</Card.Text>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br></br>
                </Col>
                <Col lg>
                    <Card>
                        <Card.Body >
                            <Row>
                            <Col xs={4}><TimerIcon style={{color: Colors.primaryColor, fontSize: 75}} /></Col>

                            <Col xs={8}>
                                <Card.Title>Minutos estudados</Card.Title>
                                <Card.Text>{minutos} minutos cadastrados.</Card.Text>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br></br>
                </Col>
               
            </Row>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
