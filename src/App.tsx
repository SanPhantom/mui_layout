import React from 'react';
import './App.css';
import { Layout } from './components/index'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { Outlet } from 'react-router';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns"


declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    status: {
      danger: string,
    }
  }
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export interface AppProps {
  // props

}

const App: React.SFC<AppProps> = (props) => {

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [skin, setSkin] = React.useState(false);

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: !skin ? 'light' : 'dark',
        primary: {
          main: !skin ? '#503a65' : '#825ea2'
        }
      },
      status: {
        danger: orange[500],
      }
    }), [skin])

  

  const updateTheme = (v: boolean) => {
    setSkin(v);
  }

  console.log(props)

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout updateTheme={updateTheme} skin={skin}>
            <Outlet />
          </Layout>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
