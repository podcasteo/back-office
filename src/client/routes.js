import App from 'client/App'
import Home from 'client/views/home'
import Podcast from 'client/views/podcast'
import Training from 'client/views/training'
import TrainingData from 'client/views/trainingData'
import Login from 'client/views/login'
import ScriptManager from 'client/views/scriptManager'
import Parameters from 'client/views/parameters'
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
        path: '/training',
        exact: true,
        component: TrainingData,
      },
      {
        path: '/training/:id',
        exact: true,
        component: Training,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/scripts',
        exact: true,
        component: ScriptManager,
      },
      {
        path: '/parameters',
        exact: true,
        component: Parameters,
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
