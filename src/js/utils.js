
const resetGame = () => {
  for (let i = 1; i < 1000; i++) {
    clearInterval(i);
  }
  localStorage.clear()

  // localStorage.removeItem('playersRoles')
  // localStorage.removeItem('gameRoles')
  // localStorage.removeItem('saveGame')
  // localStorage.removeItem('logList')
  // localStorage.removeItem('votedListItems')
  // localStorage.removeItem('saveGame_all')
}

export default resetGame