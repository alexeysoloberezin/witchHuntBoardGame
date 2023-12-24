
const resetGame = () => {
  for (let i = 1; i < 1000; i++) {
    clearInterval(i);
  }
  localStorage.clear()
}

export const scrollTo = (position = 0, after = 0) => {
  setTimeout(() => {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
      block: 'start',
    });
  }, after)
}

export default resetGame