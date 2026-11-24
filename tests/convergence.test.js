import {describe,it,expect} from 'vitest';
import {typewriter,bernoulliMSE,bernoulliChebyshev,convergenceRelations} from '../src/math/convergence.js';
import {standardizeBernoulli,simulateCLT,normalPDF,histogramDensity} from '../src/simulations/clt.js';
import {independentSumVariance,meanStandardError,correlatedMeanVariance} from '../src/math/scaling.js';
describe('Convergence modes',()=>{
 it('typewriter first interval',()=>expect(typewriter(1,.37).value).toBe(1));
 it('typewriter second level first interval',()=>expect(typewriter(2,.37).value).toBe(1));
 it('typewriter second level other interval',()=>expect(typewriter(3,.37).value).toBe(0));
 it('typewriter shrinking probability',()=>expect(typewriter(16,.37).probability).toBe(1/16));
 it('typewriter rejects omega=1',()=>expect(()=>typewriter(2,1)).toThrow());
 it('MSE is variance divided by n',()=>expect(bernoulliMSE(100,.5)).toBe(.0025));
 it('MSE quadrupling n',()=>expect(bernoulliMSE(400,.5)).toBeCloseTo(bernoulliMSE(100,.5)/4));
 it('Chebyshev bound capped at one',()=>expect(bernoulliChebyshev(1,.5,.01)).toBe(1));
 it('relations include a.s. to probability',()=>expect(convergenceRelations()).toContainEqual({from:'Almost sure',to:'In probability'}));
});
describe('Central limit theorem',()=>{
 it('zero for successes equal expected count',()=>expect(standardizeBernoulli(5,10,.5)).toBe(0));
 it('correct standardized z',()=>expect(standardizeBernoulli(6,10,.5)).toBeCloseTo(1/Math.sqrt(2.5)));
 it('reject degenerate Bernoulli variance',()=>expect(()=>standardizeBernoulli(1,5,1)).toThrow());
 it('deterministic all-successes simulation',()=>expect(simulateCLT(4,3,.5,()=>0)).toEqual([2,2,2]));
 it('normal density at zero',()=>expect(normalPDF(0)).toBeCloseTo(1/Math.sqrt(2*Math.PI)));
 it('histogram density integrates to one in range',()=>{const h=histogramDensity([-1,0,1],-2,2,4);expect(h.reduce((s,b)=>s+b.density,0)).toBeCloseTo(1)});
 it('reject empty histogram',()=>expect(()=>histogramDensity([])).toThrow());
});
describe('Square-root scaling',()=>{
 it('sum variance adds under independence',()=>expect(independentSumVariance(100,2)).toBe(400));
 it('mean standard error',()=>expect(meanStandardError(100,10)).toBe(1));
 it('quadrupling n halves standard error',()=>expect(meanStandardError(400,10)).toBeCloseTo(meanStandardError(100,10)/2));
 it('zero correlation matches independence',()=>expect(correlatedMeanVariance(100,10,0)).toBeCloseTo(1));
 it('perfect correlation does not shrink variance',()=>expect(correlatedMeanVariance(100,10,1)).toBeCloseTo(100));
 it('reject invalid correlation',()=>expect(()=>correlatedMeanVariance(10,1,-.5)).toThrow());
});
