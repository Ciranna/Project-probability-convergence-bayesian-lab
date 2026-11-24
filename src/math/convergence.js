// Mathematical examples: probabilities are exact, not inferred from finite simulations.
export function typewriter(n, omega) {
  if (!Number.isInteger(n) || n < 1 || !Number.isFinite(omega) || omega < 0 || omega >= 1) throw Error('Invalid n or omega');
  const level = Math.floor(Math.log2(n));
  const first = 2 ** level;
  const index = n - first;
  const left = index / first;
  const right = (index + 1) / first;
  return {level,index,left,right,value: omega >= left && omega < right ? 1 : 0,probability:1/first};
}
export function convergenceRelations() {
  return [
    {from:'Almost sure',to:'In probability'},
    {from:'Mean-square (L²)',to:'In probability'},
    {from:'In probability',to:'In distribution'}
  ];
}
export function bernoulliMSE(n,p=0.5) {
  if(!Number.isInteger(n)||n<1||!Number.isFinite(p)||p<0||p>1)throw Error('Invalid parameters');
  return p*(1-p)/n;
}
export function bernoulliChebyshev(n,p,epsilon){
  if(!Number.isFinite(epsilon)||epsilon<=0)throw Error('Invalid epsilon');
  return Math.min(1,bernoulliMSE(n,p)/(epsilon*epsilon));
}
