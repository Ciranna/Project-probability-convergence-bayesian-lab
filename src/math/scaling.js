export function independentSumVariance(n,sigma){
 if(!Number.isInteger(n)||n<1||!Number.isFinite(sigma)||sigma<0)throw Error('Invalid parameters');
 return n*sigma*sigma;
}
export function meanStandardError(n,sigma){return Math.sqrt(independentSumVariance(n,sigma))/n}
export function correlatedMeanVariance(n,sigma,rho){
 if(!Number.isInteger(n)||n<1||!Number.isFinite(sigma)||sigma<0||!Number.isFinite(rho)||rho< (n===1?-1:-1/(n-1))||rho>1)throw Error('Invalid equicorrelation');
 return sigma*sigma*(1+(n-1)*rho)/n;
}
