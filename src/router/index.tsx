import * as React from 'react';
// import routes from './router.config'
import {
  Navigate,
  useRoutes
} from 'react-router-dom';
import App from '../App';
import utils from '../config/utils';
import { About, Data, Home, Login } from '../pages';
import Test from './../pages/Test';

interface SanRouterProp {

}

const SanRouter: React.SFC<SanRouterProp> = props => {
  // const { props } = props;
  
  const elements = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: utils.getUserId() ? <Navigate replace to={"home"}  /> : <Navigate replace to={"login"} />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'table',
          element: <Data.Table />
        },
        {
          path: 'calendar',
          element: <Data.Calendar />
        },
        {
          path: 'ReactDND',
          element: <Data.ReactDnd />,
        },
        {
          path: 'canvas',
          element: <Data.Canvas />
        },
        {path:"Test", element:<Test />},
        {path: 'Input', element: <Data.Input />},
      ]
    },
    {
      path: '/login',
      element: <Login />
    }
  ])

  return (
    <>
      {elements}
    </>
    
  );
}

export default SanRouter;