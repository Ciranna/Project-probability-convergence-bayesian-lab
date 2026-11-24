// Pure, validated probability calculations. No UI dependencies.
function probability(x, name) {
  if (!Number.isFinite(x) || x < 0 || x > 1) throw new RangeError(`${name} must be between 0 and 1`);
  return x;
}
function count(x, name) {
  if (!Number.isSafeInteger(x) || x < 0) throw new RangeError(`${name} must be a non-negative integer`);
  return x;
}
export function conditionalFromCounts(aAndB, notAAndB, aAndNotB, notAAndNotB) {
  const counts=[aAndB,notAAndB,aAndNotB,notAAndNotB];
  counts.forEach((x,i)=>count(x,`cell ${i+1}`));
  const total=counts.reduce((a,b)=>a+b,0);
  if(total===0) throw new RangeError('The table must contain at least one observation');
  const b=aAndB+notAAndB, a=aAndB+aAndNotB;
  return {total, pA:a/total,pB:b/total,pIntersection:aAndB/total,
    pAGivenB:b? aAndB/b:null,pBGivenA:a? aAndB/a:null};
}
export function bayesBinary(prior, sensitivity, falsePositiveRate) {
  probability(prior,'Prior');probability(sensitivity,'Likelihood P(E|H)');probability(falsePositiveRate,'Likelihood P(E|not H)');
  const trueEvidence=prior*sensitivity;
  const falseEvidence=(1-prior)*falsePositiveRate;
  const evidence=trueEvidence+falseEvidence;
  if(evidence===0) throw new RangeError('Evidence has zero probability: posterior is undefined');
  return {prior,sensitivity,falsePositiveRate,evidence,posterior:trueEvidence/evidence,
    complementPosterior:falseEvidence/evidence, trueEvidence,falseEvidence};
}
export function sequentialBayes(prior, observations) {
  probability(prior,'Prior');
  if(!Array.isArray(observations)) throw new TypeError('Observations must be an array');
  let current=prior;const history=[current];
  for(const observation of observations){
    if(!observation || typeof observation!=='object') throw new TypeError('Invalid observation');
    current=bayesBinary(current,observation.likelihoodH,observation.likelihoodNotH).posterior;
    history.push(current);
  }
  return history;
}
