//Common views
import Landing from '@/pages/Landing';

const CardZoom = () => import('@/pages/CardZoom');
const Dashboard = () => import('@/layouts/Dashboard');
const DashboardHome = () => import('@/pages/Home');
// const NotFound = () => import('@/pages/NotFound');
const GameStart  = () => import('@/pages/GameStar/GameStart')
const GameComming  = () => import('@/pages/GameStar/GameComming')
const Game  = () => import('@/pages/GameStar/Game')
const DownloadPdf  = () => import('@/pages/DownloadPdf')

export default [
  {path: '/', name: 'Homepage', component: Landing},
  {
    path: '/main',
    component: Dashboard,
    children: [
      {path: '/', redirect: {name: 'DashboardHome'}},
      {path: 'home', name: 'DashboardHome', component: DashboardHome},

      {path: "cards/:id", name: 'CardZoom', component: CardZoom},
    ]
  },
  {path: '/pdf', name: 'downloadPdf', component: DownloadPdf},
  {path: '/GameStart', name: 'GameStart', component: GameStart},
  {path: '/GameComming', name: 'GameComming', component: GameComming},
  {path: '/Game', name: 'Game', component: Game},
  // {path: "*", component: NotFound},
]