import App from 'client/App'
import Home from 'client/views/home'
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
