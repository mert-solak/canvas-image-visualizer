/**
 * returns -1 or 1 randomly
 * @returns number
 */
export const getRandomSign = (): number => (Math.round(Math.random() * 10) % 2 === 0 ? -1 : 1);
