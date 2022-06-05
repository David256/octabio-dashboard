export function useSmartSimulation() {
  const simulate = (value: number) => {
    const result = ((Math.random() - 0.5) * 0.4) + value;
    if (result < 0) return 0;
    if (result > 1) return 1;
    return result;
  }
  return simulate;
}

export function useKaoticSimulation() {
  const simulate = (value: number) => {
    let random = Math.random() * 2;
    if (random > 1) random = 1;
    if (random < 0) random = 0;
    random -= 0.5;
    let result = value + random;
    if (result > 1) result = 1;
    if (result < 0) result = 0;
    return result;
  }
  return simulate;
}

export default function useSimulation() {
  const simulate = () => Math.random();
  return simulate;
}
