export const entryIsCompleted = entry => {
  const [key, value] = entry;
  if (key === 'comments') {
    return true; // comments are optional
  } else {
    return Number(value) > 0;
  }
};