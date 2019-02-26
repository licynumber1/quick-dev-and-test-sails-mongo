/**
 * powered by 波比小金刚 at 2018-05-08 15:16:14 
 * last modified by 波比小金刚 at 2018-05-08 15:16:14 
 * @Description: 按需加载的路由配置 
*/
import React from 'react';
import Loadable from 'react-loadable';
import {Loading} from '../layouts/Loading'
import Search from '../pages/search';
import Empty from '../pages/empty'
import Details from '../pages/details'
import SearchDetails from '../pages/searchDetails'
import Add from '../pages/add'
import Data from '../pages/data'
import Map from '../pages/map'
import WaitIndex from '../pages/waitIndex'
import RenderSelf from '../components/renderSelfPage'
import DrillDown from '../pages/drillDown'
import ShareDetails from '../pages/shareDetails'
import Share from '../pages/share'

// 按需加载
const getAsyncComponent = ({dynamicalComponent, ...rest}) => {
  const WrapperComponent =  Loadable({
    loader: dynamicalComponent,
    loading: Loading,
    ...rest
  });

  return React.cloneElement(<WrapperComponent />, [], []);
}

// 路由配置
export const getRouterData = app => {
  const routerConfig = [
    {//首页分发器
      path: '/',
      component: <WaitIndex />, // getCodeSpidingComponent()
      exact: true,
      key: 'index'
    },
      {//新增页面跳转器
          path: '/addpage/:id',
          component: <WaitIndex type="add"/>, // getCodeSpidingComponent()
          exact: true,
          key: 'index'
      },
      {
          path: '/map',
          component: <Map />,
          key: 'map'
      },
    {
      path: '/data/:id',
      component: <Data />,
      key: 'data'
    },
      {
          path: '/DrillDown/:id/:contentID',
          component: <DrillDown />,
          key: 'drillDown'
      },
      {
          path: '/empty',
          component: <Empty />,
          exact: true,
          key: 'empty'
      },
      {
          path: '/renderSelf',
          component: <RenderSelf />,
          exact: true,
          key: 'renderSelf'
      },
      {
          path: '/details/:itemId/:id',
          component: <Details />,
          exact: true,
          key: 'details'
      },
      {
          path: '/searchDetails/:id/:id',
          component: <SearchDetails />,
          exact: true,
          key: 'searchDetails'
      },
    {
      path: '/search/:id/:type',
      component: <Search />,
      exact: true,
      key: 'search'
    },
    {
      path: '/add/:id',
      component: <Add />,
      exact: true,
      key: 'add'
    },
    {
      path:'/data',
      component: getAsyncComponent({
        dynamicalComponent:() => import('../pages/data')
      }),
      exact: true,
      key: 'data'
    },
    {
      path: '/production',
      component: <h1>production</h1>,
      exact: true,
      key:'production'
    }
  ]
  
  return routerConfig;

}


