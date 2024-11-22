import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../pages/layout'
import Home from '../pages/home'
import Project from '../pages/project'
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
        path: 'project',
        Component: Project
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
