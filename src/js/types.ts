const types: Record<string, string> = {
  'info': 'Информация',
  'attack': 'Атака',
  'holy': 'Святость',
  'guard': 'Защита',
  'attack|info': 'Зависит от выбора: Могильщик(info) или Судья(атака)',
}

import im1 from '../assets/roles/Group 67.png'
import im2 from '../assets/roles/Group 65.png'
import im3 from '../assets/roles/Group 68.png'
import im4 from '../assets/roles/Group 66.png'

export const roles: Record<string, string> = {
  'info': im1,
  'attack':im2,
  'holy': im3,
  'guard': im4,
  'attack|info': null
}

export const logType: Record<string, string> = {
  'tryKill': "Попытка убийства",
  'dayKill': "Казнь",
  'kill': "Убийство",
}

export default types