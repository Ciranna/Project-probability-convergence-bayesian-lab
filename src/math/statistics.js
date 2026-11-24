export function mean(values) {
  if (!Array.isArray(values) || !values.length || !values.every(Number.isFinite)) throw new Error('Expected a non-empty array of finite numbers');
  return values.reduce((a,b)=>a+b,0)/values.length;
}
export function variance(values) { const m=mean(values); return mean(values.map(x=>(x-m)**2)); }
export function sampleVariance(values) { if (!Array.isArray(values)||values.length<2) throw new Error('At least two observations required'); const m=mean(values); return values.reduce((s,x)=>s+(x-m)**2,0)/(values.length-1); }
export function standardDeviation(values) { return Math.sqrt(variance(values)); }
export function standardError(sigma,n) { if (!Number.isFinite(sigma)||sigma<0||!Number.isInteger(n)||n<=0) throw new Error('Invalid sigma or n'); return sigma/Math.sqrt(n); }
export function meanSquaredError(values,target) { if (!Number.isFinite(target)) throw new Error('Invalid target'); return mean(values.map(x=>(x-target)**2)); }
