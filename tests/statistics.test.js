import {describe,it,expect} from 'vitest';
import {mean,variance,sampleVariance,standardDeviation,standardError,meanSquaredError} from '../src/math/statistics.js';
import {bernoulliPath,convergenceExperiment} from '../src/simulations/lln.js';
describe('Statistics engine',()=>{
it('mean',()=>expect(mean([2,4,6,8])).toBe(5));
it('variance',()=>expect(variance([2,4,6,8])).toBe(5));
it('sample variance',()=>expect(sampleVariance([2,4,6,8])).toBeCloseTo(20/3));
it('standard deviation',()=>expect(standardDeviation([2,4,6,8])).toBeCloseTo(Math.sqrt(5)));
it('standard error',()=>expect(standardError(10,100)).toBe(1));
it('square root scaling',()=>expect(standardError(10,400)).toBeCloseTo(standardError(10,100)/2));
it('MSE',()=>expect(meanSquaredError([1,2,3],2)).toBeCloseTo(2/3));
it('reject empty input',()=>expect(()=>mean([])).toThrow());
it('reject invalid n',()=>expect(()=>standardError(10,0)).toThrow());
});
describe('LLN simulation',()=>{
it('all successes',()=>expect(bernoulliPath(5,1,()=>0).at(-1).mean).toBe(1));
it('all failures',()=>expect(bernoulliPath(5,0,()=>0.5).at(-1).mean).toBe(0));
it('path length',()=>expect(bernoulliPath(20).length).toBe(20));
it('deterministic empirical probability',()=>expect(convergenceExperiment(10,5,.1,.5,()=>0).empiricalProbability).toBe(1));
it('Chebyshev bound',()=>expect(convergenceExperiment(100,2,.1,.5,()=>0).chebyshevBound).toBeCloseTo(.25));
it('reject invalid epsilon',()=>expect(()=>convergenceExperiment(10,5,0)).toThrow());
});
