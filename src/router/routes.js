import Landing from '@/pages/Landing.vue';

const CardZoom = () => import('@/pages/CardZoom.vue');
const Dashboard = () => import('@/layouts/Dashboard.vue');
const DashboardHome = () => import('@/pages/Home.vue');
const GameStart  = () => import('@/pages/GameStar/GameStart.vue')
const GameComming  = () => import('@/pages/GameStar/GameComming.vue')
const Game  = () => import('@/pages/GameStar/Game.vue')
const DownloadPdf  = () => import('@/pages/DownloadPdf.vue')
const GameConnectUsers  = () => import('@/pages/GameStar/GameConnectUsers.vue')

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
  {path: '/Game/connectUsers', name: 'connectUsers', component: GameConnectUsers},
  {path: '/pdf', name: 'downloadPdf', component: DownloadPdf},
  {path: '/GameStart', name: 'GameStart', component: GameStart},
  {path: '/GameComming', name: 'GameComming', component: GameComming},
  {path: '/Game', name: 'Game', component: Game},
  // {path: "*", component: NotFound},
]