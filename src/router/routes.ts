import Landing from '@/pages/Landing.vue';
import {RouteRecordRaw} from "vue-router";
import GameVariants from "@/js/GameModModules/GameVariants";

const CardZoom = () => import('@/pages/CardZoom.vue');
const Dashboard = () => import('@/layouts/Dashboard.vue');
const DashboardHome = () => import('@/pages/Home.vue');
const GameStart  = () => import('@/pages/GameStar/GameStart.vue')
const GameComming  = () => import('@/pages/GameStar/GameComming.vue')
const PlayerChoose  = () => import('@/pages/GameStar/PlayerChoose.vue')
const Game  = () => import('@/pages/GameStar/Game.vue')
const RoomLayout  = () => import('@/pages/GameStar/rooms/RoomLayout.vue')
const GameCreateRoom  = () => import('@/pages/GameStar/rooms/GameCreateRoom.vue')
const GameConnectInRoom  = () => import('@/pages/GameStar/rooms/GameConnectInRoom.vue')
const GameRoom  = () => import('@/pages/GameStar/rooms/GameRoom.vue')
const GameRooms  = () => import('@/pages/GameStar/rooms/GameRooms.vue')
const Roles  = () => import('@/pages/GameStar/Roles.vue')
const GameVariantsPage  = () => import('@/pages/GameStar/GameVariants.vue')
const GuardGame = () => import('@/components/GuardGame/index.vue')

export default [
  {path: '/', name: 'Homepage', component: Landing},
  {path: '/Roles', name: 'Roles', component: Roles},
  {
    path: '/main',
    component: Dashboard,
    children: [
      {path: '/', redirect: {name: 'DashboardHome'}},
      {path: 'home', name: 'DashboardHome', component: DashboardHome},

      {path: "cards/:id", name: 'CardZoom', component: CardZoom},
    ]
  },
  {
    path: "/GameRoom",
    component: RoomLayout,
    children: [
      {path: 'createRoom', name: 'createRoom', component: GameCreateRoom},
      {path: 'room/:id', name: 'room', component: GameRoom},
      {path: 'rooms', name: 'rooms', component: GameRooms},
      {path: 'connectInRoom/:id', name: 'connectInRoom', component: GameConnectInRoom},
    ],
  },
  {path: '/GameGuard', name: 'GuardGame', component: GuardGame},
  {path: '/GameVariants', name: 'GameVariants',meta: {requiresAuth: true}, component: GameVariantsPage},
  {path: '/GameStart', name: 'GameStart', meta: {requiresAuth: true}, component: GameStart},
  {path: '/GameComming', name: 'GameComming', meta: {requiresAuth: true}, component: GameComming},
  {path: '/Game', name: 'Game', meta: {requiresAuth: true}, component: Game},
  {path: '/PlayerChoose', name: 'PlayerChoose', meta: {requiresAuth: true}, component: PlayerChoose},
  // {path: "*", component: NotFound},
] as RouteRecordRaw[]