//Common views
import Landing from '@/pages/Landing';

const CardZoom = () => import('@/pages/CardZoom');
const Dashboard = () => import('@/layouts/Dashboard');
const DashboardHome = () => import('@/pages/Home');
const Commands = () => import('@/pages/Commands');
const FeatureRequest = () => import('@/pages/FeatureRequest');
const Logs = () => import('@/pages/Logs');
const Settings = () => import('@/pages/Settings');
const Setup = () => import('@/pages/Setup');
const NotFound = () => import('@/pages/NotFound');
const Deeplink = () => import('@/pages/Deeplink');
const GameStart  = () => import('@/pages/GameStar/GameStart')
const GameComming  = () => import('@/pages/GameStar/GameComming')
const Game  = () => import('@/pages/GameStar/Game')

export default [
  {path: '/', name: 'Homepage', component: Landing},
  {
    path: '/main',
    component: Dashboard,
    children: [
      {path: '/', redirect: {name: 'DashboardHome'}},
      {path: 'home', name: 'DashboardHome', component: DashboardHome},
      {path: 'commands', name: 'Commands', component: Commands},
      {path: 'features', name: 'FeatureRequest', component: FeatureRequest},
      {path: 'logs', name: 'Logs', component: Logs},
      {path: 'settings', name: 'Settings', component: Settings},
      {path: 'setup', name: 'Setup', component: Setup},
      {path: 'deeplink', name: 'Deeplink', component: Deeplink},
      {path: "cards/:id", name: 'CardZoom', component: CardZoom},
    ]
  },
  {path: '/GameStart', name: 'GameStart', component: GameStart},
  {path: '/GameComming', name: 'GameComming', component: GameComming},
  {path: '/Game', name: 'Game', component: Game},
  {path: "*", component: NotFound},
]