import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../pages/layout'
import Home from '../pages/home'
import Mail from '../pages/mail'
import User from '../pages/user'
import Login from '../pages/login'
import Interactive from '@/pages/interactive'
import Meeting from '@/pages/meeting'

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      //重定向
      {
        path: '/',
        element: <Navigate to='home' replace />
      },
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'mail',
        Component: Mail
      },
      {
        path: 'interactive',
        Component: Interactive
      },
      {
        path: 'meeting',
        Component: Meeting
      }
    ]
  },
  {
    path: 'login',
    Component: Login
  }
]

export default createBrowserRouter(routes)
