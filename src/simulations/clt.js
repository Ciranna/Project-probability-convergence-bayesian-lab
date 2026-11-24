export function standardizeBernoulli(successes,n,p){
  if(!Number.isInteger(n)||n<1||!Number.isFinite(p)||p<=0||p>=1||!Number.isInteger(successes)||successes<0||successes>n)throw Error('Invalid CLT inputs');
  return (successes-n*p)/Math.sqrt(n*p*(1-p));
}
export function simulateCLT(n,trials,p=0.5,rng=Math.random){
  if(!Number.isInteger(n)||n<1||n>5000||!Number.isInteger(trials)||trials<1||trials>10000||!Number.isFinite(p)||p<=0||p>=1)throw Error('Invalid simulation settings');
  const values=[];
  for(let t=0;t<trials;t++){
    let successes=0;
    for(let i=0;i<n;i++)if(rng()<p)successes++;
    values.push(standardizeBernoulli(successes,n,p));
  }
  return values;
}
export function normalPDF(z){return Math.exp(-z*z/2)/Math.sqrt(2*Math.PI)}
export function histogramDensity(values,min=-4,max=4,bins=20){
  if(!Array.isArray(values)||values.length===0||!values.every(Number.isFinite)||!Number.isFinite(min)||!Number.isFinite(max)||max<=min||!Number.isInteger(bins)||bins<1)throw Error('Invalid histogram');
  const counts=Array(bins).fill(0),width=(max-min)/bins;
  for(const v of values){if(v>=min&&v<=max){const k=Math.min(bins-1,Math.floor((v-min)/width));counts[k]++}}
  return counts.map((count,i)=>({x:min+(i+.5)*width,density:count/(values.length*width),count}));
}
