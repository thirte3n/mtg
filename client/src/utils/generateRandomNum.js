export const generateRandomNum = (maxNum) => {
  if (maxNum > 99999 || maxNum < 1) {
    return '0';
  }

  const randomNum = Math.floor(Math.random() * maxNum) + 1;

  // Change random number generator to random coin toss
  if (maxNum === 2) {
    if (randomNum === 1) {
      return 'heads';
    } else {
      return 'tails';
    }
  }

  return randomNum;
};
