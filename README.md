# Homework 7 — Probability Convergence & Bayesian Inference Lab

**Final Phase 5** · Interactive JavaScript / Vite laboratory for probability convergence and Bayesian inference.

## Assignment coverage

1. **Weak Law of Large Numbers:** cumulative Bernoulli sample means, empirical deviation probability and Chebyshev upper bound.
2. **Four modes of convergence:** in probability, almost surely, in mean square (L²) and in distribution; implications and typewriter counterexample.
3. **Central Limit Theorem:** standardized Bernoulli sample means, Monte Carlo density histogram and standard normal reference curve.
4. **Why √n appears:** variance additivity under independence, standard error of the mean and an equicorrelation illustration.
5. **Conditional probability:** 2×2 observed-count table and conditional/marginal probabilities.
6. **Bayes' theorem:** prior, likelihood, posterior, diagnostic-test example, prior sensitivity and repeated evidence under conditional independence.
7. **Beta-Binomial inference:** conjugate updating, posterior mean/variance, equal-tailed 95% credible interval and prior sensitivity comparison.
8. **Conclusions & Findings:** theoretical interpretation, advantages, assumptions and limitations.

## Run locally

Requires a recent Node.js release and npm.

```bash
npm install
npm test
npm run build
npm run dev
```

Open the URL printed by Vite (typically http://localhost:5173/).

## Structure

- `src/main.js`: page, interactive controls and SVG visualizations
- `src/style.css`: responsive styling
- `src/math/statistics.js`: descriptive statistics
- `src/math/convergence.js`: convergence examples and bounds
- `src/math/scaling.js`: independent and equicorrelated standard errors
- `src/math/bayes.js`: conditional probability and Bayes updates
- `src/math/betaBinomial.js`: Beta-Binomial posterior and credible intervals
- `src/simulations/lln.js`: Bernoulli paths and LLN Monte Carlo
- `src/simulations/clt.js`: CLT simulation and normal comparison
- `tests/`: four Vitest suites (78 tests in Phase 4)
- `.github/workflows/deploy.yml`: GitHub Pages deployment

## Mathematical assumptions and caveats

- LLN/CLT examples use independent Bernoulli observations; the CLT assumes finite positive variance.
- The typewriter construction distinguishes convergence in probability from almost-sure convergence.
- `σ/√n` is the independent-observation standard error. Correlation introduces covariance terms.
- A diagnostic test's sensitivity is not its positive predictive value: the prior matters.
- Sequential updates using identical likelihoods require conditional independence given each hypothesis.
- The Beta-Binomial model assumes Bernoulli outcomes conditionally independent given the unknown probability θ.
- A Bayesian credible interval is conditional on the prior and likelihood model; it is not a frequentist confidence interval.
- Simulations illustrate mathematical theorems but do not prove them.

## GitHub Pages

The workflow publishes the `dist/` folder on pushes to `main` or through manual workflow dispatch. It builds using a repository-specific Vite base path:

`/Project-probability-convergence-bayesian-lab/`

1. Create a GitHub repository named `Project-probability-convergence-bayesian-lab`.
2. Push this project to its `main` branch.
3. In **Settings → Pages**, select **GitHub Actions** as the build/deployment source.
4. Check the **Actions** tab and visit `https://ciranna.github.io/Project-probability-convergence-bayesian-lab/` after successful deployment.

The deployment URL is an expected URL based on the repository name, not confirmation that the site is already live.

## Verification

Run `npm test` and `npm run build` after replacing files. Review `npm audit` for dependency advisories; do not blindly run `npm audit fix --force`.
