import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme();

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: '',
      completed: 0,
      searchKeyword : ''
    }
  }

  handleValueChange = (e) =>{
    let nextState ={};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  } 
    
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword : ''
    });
    // 고객데이터 불러오기
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount = () => {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
             고객 관리 시스템
            </Typography>
            <div className={classes.grow}/>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="검색하기" classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
            </div>
          </Toolbar>
        </AppBar>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return ( <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

const AppWithStyles = withStyles(styles)(App);

const AppWithTheme = (props) => (
  <ThemeProvider theme={theme}>
    <AppWithStyles {...props} />
  </ThemeProvider>
);

export default AppWithTheme;