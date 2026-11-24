import {describe,it,expect} from 'vitest';
import {conditionalFromCounts,bayesBinary,sequentialBayes} from '../src/math/bayes.js';
describe('Conditional probability',()=>{
 it('computes all joint and conditional probabilities',()=>{const r=conditionalFromCounts(30,10,20,40);expect(r.total).toBe(100);expect(r.pA).toBe(.5);expect(r.pB).toBe(.4);expect(r.pIntersection).toBe(.3);expect(r.pAGivenB).toBe(.75);expect(r.pBGivenA).toBe(.6)});
 it('does not confuse P(A|B) and P(B|A)',()=>{const r=conditionalFromCounts(30,10,20,40);expect(r.pAGivenB).not.toBe(r.pBGivenA)});
 it('returns null when conditioning event is impossible',()=>{const r=conditionalFromCounts(0,0,4,6);expect(r.pAGivenB).toBeNull()});
 it('rejects negative counts',()=>expect(()=>conditionalFromCounts(-1,2,3,4)).toThrow());
 it('rejects fractional counts',()=>expect(()=>conditionalFromCounts(.5,2,3,4)).toThrow());
 it('rejects empty table',()=>expect(()=>conditionalFromCounts(0,0,0,0)).toThrow());
});
describe('Bayesian inference',()=>{
 it('computes diagnostic-test posterior',()=>expect(bayesBinary(.01,.95,.05).posterior).toBeCloseTo(.16101694915));
 it('computes evidence by total probability',()=>expect(bayesBinary(.01,.95,.05).evidence).toBeCloseTo(.059));
 it('normalizes the two posterior hypotheses',()=>{const r=bayesBinary(.2,.8,.1);expect(r.posterior+r.complementPosterior).toBeCloseTo(1)});
 it('preserves prior for uninformative evidence',()=>expect(bayesBinary(.3,.7,.7).posterior).toBeCloseTo(.3));
 it('gives certainty for perfectly discriminating evidence',()=>expect(bayesBinary(.2,1,0).posterior).toBe(1));
 it('allows impossible hypothesis',()=>expect(bayesBinary(0,.9,.2).posterior).toBe(0));
 it('rejects zero-probability evidence',()=>expect(()=>bayesBinary(.5,0,0)).toThrow());
 it('rejects invalid prior',()=>expect(()=>bayesBinary(-.1,.8,.1)).toThrow());
 it('rejects invalid likelihood',()=>expect(()=>bayesBinary(.1,1.2,.1)).toThrow());
 it('updates sequentially for independent evidence given hypothesis',()=>{const h=sequentialBayes(.2,[{likelihoodH:.8,likelihoodNotH:.1},{likelihoodH:.8,likelihoodNotH:.1}]);expect(h).toHaveLength(3);expect(h[1]).toBeCloseTo(2/3);expect(h[2]).toBeCloseTo(16/17)});
 it('returns initial prior for no evidence',()=>expect(sequentialBayes(.4,[])).toEqual([.4]));
});
