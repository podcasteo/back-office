import App from 'client/App'
import Home from 'client/views/home'
import Podcast from 'client/views/podcast'
import Login from 'client/views/login'
import Test from 'client/views/test'
import NotFound from 'client/views/notFound'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/podcast/:id',
        exact: true,
        component: Podcast,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/test',
        exact: true,
        component: Test,
      },
      {
        path: '*',
        exact: true,
        component: NotFound,
      },
    ],
  },
]

export default routes
