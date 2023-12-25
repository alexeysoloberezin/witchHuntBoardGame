const resetGame = (): void => {
  for (let i = 1; i < 1000; i++) {
    clearInterval(i);
  }
  localStorage.clear()
}

export const scrollTo = (position: number = 0, after: number = 0): void => {
  setTimeout(() => {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }, after)
}

export default resetGame