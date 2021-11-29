import React from 'react';
import './App.css';
import { Layout } from './components/index'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { useMediaQuery } from '@material-ui/core';
import { Outlet } from 'react-router';

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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [skin, setSkin] = React.useState(true);

  const theme = React.useMemo(() => 
    createTheme({
      palette: {
        mode: !skin ? 'light' : 'dark'
      },
      status: {
        danger: orange[500],
      }
    }), [prefersDarkMode, skin]) 

  const updateTheme = (v: boolean) => {
    setSkin(v);
  }

  console.log(props)

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout updateTheme={updateTheme} skin={skin}>
          <span>123</span>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
