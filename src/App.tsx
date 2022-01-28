import React, { useEffect } from 'react';
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
  const [skin, setSkin] = React.useState<boolean>(() => {
    if (!localStorage.getItem('skin')) {
      localStorage.setItem('skin', 'light');
      return false;
    } else {
      return localStorage.getItem('skin') !== 'light'
    }
  });

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
    localStorage.setItem('skin', v ? 'dark' : 'light');
    setSkin(v);
  }

  useEffect(() => {
    if (!localStorage.getItem('skin')) {
      localStorage.setItem('skin', 'light');
      setSkin(false)
    } else {
      setSkin(localStorage.getItem('skin') !== 'light')
    }
  }, [])

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
