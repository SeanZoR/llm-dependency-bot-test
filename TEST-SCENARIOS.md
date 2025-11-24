# Comprehensive Test Scenarios for LLM Dependency Bot

This document outlines all test scenarios covered by the dependencies in this repository. Each dependency is strategically chosen to test specific bot behaviors.

## 📊 Test Coverage Summary

- **Total Dependencies**: 37 (23 production + 14 dev)
- **Risk Levels Covered**: LOW, MEDIUM, HIGH, CRITICAL
- **Update Types Covered**: Patch, Minor, Major, Security, Deprecation
- **Ecosystems**: React, Node.js, Build Tools, Testing, Database, Authentication

---

## 🎯 Production Dependencies Test Matrix

### Utility Libraries (LOW RISK) - 5 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **lodash** | 4.17.21 | Security patches (known CVEs) | Patch version updates |
| **uuid** | 9.0.0 | Simple utility updates | Stable API, rare breaking changes |
| **date-fns** | 2.30.0 | Minor version increments | Tree-shakeable, modular updates |
| **chalk** | 5.2.0 | ESM-only package handling | Pure ESM migration patterns |
| **moment** | 2.29.4 | **DEPRECATED package detection** | Migration path suggestions |

**Expected Bot Behavior:**
- ✅ Auto-merge patch updates with passing CI
- ✅ Auto-merge minor updates for non-critical utilities
- ⚠️ Flag moment deprecation and suggest date-fns/dayjs

---

### HTTP & API (MEDIUM RISK) - 3 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **axios** | 1.6.0 | Minor version updates | Breaking changes in major versions |
| **swr** | 2.2.0 | React hooks library updates | Peer dependency compatibility |
| **graphql** | 16.6.0 | API specification updates | Breaking changes in schemas |

**Expected Bot Behavior:**
- ✅ Auto-merge patch updates
- ⚠️ Review minor updates (check release notes for API changes)
- 🛑 Require approval for major versions (breaking changes)

**Special Considerations:**
- axios: Frequently has security updates, bot should prioritize
- swr: Requires react peer dependency, test coordinated updates
- graphql: Schema changes can break queries, needs careful review

---

### Web Frameworks (HIGH RISK) - 3 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **express** | 4.18.0 | Critical web framework updates | Middleware compatibility |
| **react** | 18.2.0 | Major UI library changes | Concurrent rendering updates |
| **react-router-dom** | 6.14.0 | Routing library breaking changes | React 18 compatibility |

**Expected Bot Behavior:**
- 🛑 Require approval for ALL updates (even patches)
- 🛑 Flag as critical infrastructure
- 📝 Request detailed release notes analysis

**Why High Risk:**
- Core application dependencies
- Breaking changes affect entire codebase
- Require thorough testing before merge

---

### State Management (MEDIUM RISK) - 2 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **redux** | 4.2.0 | State management updates | Redux Toolkit compatibility |
| **zustand** | 4.3.0 | Modern state library | Minimal API, stable updates |

**Expected Bot Behavior:**
- ⚠️ Review minor/major updates
- ✅ Auto-merge patches if CI passes
- 📝 Check for breaking changes in state APIs

---

### Database & Auth (CRITICAL RISK) - 3 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **pg** | 8.11.0 | PostgreSQL driver updates | Connection pool changes |
| **mongoose** | 7.0.0 | MongoDB ORM major versions | Schema breaking changes |
| **jsonwebtoken** | 9.0.0 | **Security-critical auth updates** | Algorithm changes, CVEs |

**Expected Bot Behavior:**
- 🚨 NEVER auto-merge (even patches)
- 🛑 Always require human approval
- 📝 Fetch CVE database for security issues
- 📝 Detailed release notes analysis mandatory

**Why Critical:**
- Database drivers: Data corruption/loss if broken
- jsonwebtoken: Security vulnerabilities = major breaches
- These are the "do not break" dependencies

---

### Validation & Schema (LOW-MEDIUM RISK) - 3 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **joi** | 17.9.0 | Schema validation updates | API changes in validators |
| **zod** | 3.21.0 | TypeScript-first validation | Type inference changes |
| **dotenv** | 16.0.0 | Environment variable loading | Zero-dependency stability |

**Expected Bot Behavior:**
- ✅ Auto-merge patches
- ⚠️ Review minors (API might change)
- 🛑 Require approval for majors (breaking schema changes)

---

### Build Tools (MEDIUM-HIGH RISK) - 4 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **webpack** | 5.88.0 | **Major build tool updates** | Plugin compatibility |
| **vite** | 4.3.0 | Modern build tool updates | Fast development server |
| **@babel/core** | 7.22.0 | **Monorepo coordinated updates** | Must match preset versions |
| **@babel/preset-env** | 7.22.0 | **Monorepo coordinated updates** | Must match core version |

**Expected Bot Behavior:**
- 🛑 Require approval for ALL updates
- 📝 Check if Babel packages update together
- ⚠️ Flag if @babel/core and @babel/preset-env versions diverge
- 📝 Build tool changes = full test suite required

**Special Test:**
- When @babel/core updates, bot should check if @babel/preset-env also updates
- If only one updates, bot should warn about version mismatch

---

## 🧪 Development Dependencies Test Matrix

### Type Definitions (LOW RISK) - 5 packages

| Package | Version | Primary Test Case |
|---------|---------|-------------------|
| **@types/node** | 20.17.0 | Type-only updates, no runtime impact |
| **@types/express** | 4.17.0 | Framework types, check main package compatibility |
| **@types/uuid** | 9.0.0 | Simple utility types |
| **@types/react** | 18.2.0 | Major framework types |
| **@types/jsonwebtoken** | 9.0.0 | Security library types |

**Expected Bot Behavior:**
- ✅ **Always auto-merge** (no runtime impact)
- ✅ Even major version updates are safe
- ✅ As long as CI passes (type checking)

---

### Testing Libraries (LOW RISK) - 4 packages

| Package | Version | Primary Test Case | Secondary Test Case |
|---------|---------|-------------------|---------------------|
| **jest** | 29.5.0 | Test framework updates | Breaking config changes |
| **vitest** | 0.34.0 | Modern test runner | Vite integration |
| **@testing-library/react** | 14.0.0 | **Monorepo pattern** | React version compatibility |
| **@testing-library/jest-dom** | 5.16.0 | **Monorepo pattern** | Custom matchers |
| **@testing-library/user-event** | 14.4.0 | **Monorepo pattern** | User interaction testing |

**Expected Bot Behavior:**
- ✅ Auto-merge patches
- ⚠️ Review majors (test API might change)
- 📝 Check @testing-library/* packages update together

---

### Code Quality (LOW RISK) - 3 packages

| Package | Version | Primary Test Case |
|---------|---------|-------------------|
| **typescript** | 5.0.4 | Compiler updates, breaking type changes |
| **eslint** | 8.50.0 | Linting rule updates |
| **prettier** | 3.0.0 | Formatting changes (cosmetic) |

**Expected Bot Behavior:**
- ✅ Auto-merge prettier (just formatting)
- ⚠️ Review eslint (new rules might fail CI)
- 🛑 Review typescript majors (type errors)

---

### Build Tooling (MEDIUM RISK) - 2 packages

| Package | Version | Primary Test Case |
|---------|---------|-------------------|
| **babel-loader** | 9.1.0 | Webpack loader compatibility |
| **@babel/preset-react** | 7.22.0 | React-specific Babel transformations |

**Expected Bot Behavior:**
- ⚠️ Review all updates
- 📝 Check webpack compatibility
- 📝 Check @babel/* version alignment

---

## 🧠 Advanced Test Scenarios

### Scenario 1: Coordinated Monorepo Updates
**Setup:** @babel/core 7.22.0 → 7.23.0 AND @babel/preset-env 7.22.0 → 7.23.0

**Expected Behavior:**
- Bot should recognize these are related
- ✅ Auto-merge if BOTH update together
- 🛑 Flag warning if only ONE updates

**Why Important:** Mismatched Babel package versions can cause build failures

---

### Scenario 2: Security CVE Response
**Setup:** jsonwebtoken has a new CVE announced

**Expected Behavior:**
- 🚨 Bot should detect CVE immediately
- 📝 Fetch CVE details and severity
- 🛑 Require approval but flag as HIGH PRIORITY
- 📝 Include CVE link in PR comment

**Why Important:** Security updates need fast response but careful review

---

### Scenario 3: Deprecated Package Detection
**Setup:** moment package is deprecated

**Expected Behavior:**
- ⚠️ Bot should flag deprecation
- 📝 Suggest migration to date-fns or dayjs
- 🛑 Recommend NOT updating, but migrating away
- 📝 Link to migration guide

**Why Important:** Deprecated packages shouldn't be updated, should be replaced

---

### Scenario 4: Breaking Major Version
**Setup:** react 18.2.0 → 19.0.0 (hypothetical)

**Expected Behavior:**
- 🛑 NEVER auto-merge
- 📝 Fetch release notes
- 📝 List breaking changes
- 📝 Estimate migration effort
- 👤 Request human review with detailed analysis

**Why Important:** Major framework updates are risky and need planning

---

### Scenario 5: Critical Infrastructure Failure
**Setup:** pg update causes CI to fail

**Expected Behavior:**
- 🚨 Bot should BLOCK merge
- 📝 Comment on PR with failure details
- 🛑 Label as "DO_NOT_MERGE"
- 📝 Explain what failed and why

**Why Important:** Failing CI means something broke, bot must prevent merge

---

## 📈 Success Metrics

The bot should demonstrate:

1. **Risk Assessment Accuracy** - Correctly categorize updates by risk level
2. **Security Prioritization** - Fast response to CVEs while maintaining safety
3. **Monorepo Intelligence** - Recognize coordinated updates across related packages
4. **Deprecation Detection** - Flag deprecated packages and suggest alternatives
5. **Breaking Change Detection** - Read release notes to find breaking changes
6. **Critical Infrastructure Protection** - NEVER auto-merge database/auth packages
7. **Explainability** - Every decision includes detailed natural language reasoning

---

## 🎓 Learning Outcomes

By testing with these dependencies, you'll learn:

1. **Agent Decision Making** - How LLMs reason about risk and make decisions
2. **Tool Use Patterns** - When to fetch release notes, check CVEs, analyze diffs
3. **Prompt Engineering** - How system prompts guide agent behavior
4. **Context Understanding** - How agents parse PR metadata, CI status, labels
5. **Multi-agent Potential** - How specialized agents could handle different scenarios

---

## 🔄 Maintenance

**Adding New Test Cases:**
1. Identify gap in test coverage
2. Choose package that represents that scenario
3. Add to package.json with intentionally old version
4. Document expected bot behavior here
5. Run `npm install` to lock versions
6. Push and wait for Dependabot PRs

**Monitoring Bot Performance:**
```bash
# List all dependency PRs
gh pr list --label dependencies

# View bot's decision on a specific PR
gh pr view <number> --comments

# Check bot workflow runs
gh run list --workflow="LLM Dependency Bot"
```

---

*Last Updated: 2025-11-24*
*Total Test Scenarios: 10 major categories, 37 dependencies*
