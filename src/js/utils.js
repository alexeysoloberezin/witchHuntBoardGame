
 const resetGame = () => {
  localStorage.removeItem('playersRoles')
  localStorage.removeItem('gameRoles')
  localStorage.removeItem('saveGame')
  localStorage.removeItem('logList')
  localStorage.removeItem('votedListItems')
  localStorage.removeItem('saveGame_all')
}

export default resetGame