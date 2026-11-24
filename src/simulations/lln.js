export function bernoulliPath(n,p=0.5,rng=Math.random){
  if(!Number.isInteger(n)||n<1||n>100000||!Number.isFinite(p)||p<0||p>1)throw new Error('Invalid n or p');
  let heads=0; const path=[];
  for(let i=1;i<=n;i++){if(rng()<p)heads++;path.push({n:i,mean:heads/i});}
  return path;
}
export function convergenceExperiment(n,trials,epsilon,p=0.5,rng=Math.random){
  if(!Number.isInteger(trials)||trials<1||trials>10000||!Number.isFinite(epsilon)||epsilon<=0)throw new Error('Invalid trials or epsilon');
  let misses=0;for(let j=0;j<trials;j++){const path=bernoulliPath(n,p,rng);if(Math.abs(path[n-1].mean-p)>epsilon)misses++;}
  return {n,trials,epsilon,p,misses,empiricalProbability:misses/trials,chebyshevBound:Math.min(1,p*(1-p)/(n*epsilon**2))};
}
