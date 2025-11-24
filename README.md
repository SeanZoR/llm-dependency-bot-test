# LLM Dependency Bot - Test Repository

This repository serves as a comprehensive test bed for the [LLM Dependency Bot](https://github.com/SeanZoR/llm-dependency-bot), an autonomous AI agent powered by Claude that intelligently manages dependency updates.

## Purpose

This test repository validates the bot's ability to:
- Detect and analyze dependency update PRs
- Make intelligent merge decisions based on risk assessment
- Use autonomous tool calling (fetch release notes, check CVEs, analyze diffs)
- Provide clear reasoning for its decisions
- Interact appropriately with GitHub PRs (comments, reviews, merges)

## Test Dependencies

The repository includes various dependencies to test different update scenarios:

### Production Dependencies

#### Utility Libraries (LOW RISK)
- **lodash** `4.17.21` - Utility library (patch updates, security considerations)
- **uuid** `9.0.0` - UUID generation
- **date-fns** `2.30.0` - Date manipulation
- **chalk** `5.2.0` - Terminal styling
- **moment** `2.29.4` - Date library (DEPRECATED - tests deprecation warnings)

#### HTTP & API (MEDIUM RISK)
- **axios** `1.6.0` - HTTP client (minor version updates)
- **swr** `2.2.0` - React hooks for data fetching
- **graphql** `16.6.0` - GraphQL implementation

#### Web Frameworks (HIGH RISK)
- **express** `4.18.0` - Web framework (critical dependency)
- **react** `18.2.0` - UI library (major framework updates)
- **react-router-dom** `6.14.0` - React routing

#### State Management (MEDIUM RISK)
- **redux** `4.2.0` - Predictable state container
- **zustand** `4.3.0` - Modern state management

#### Database & Auth (HIGH RISK - Critical)
- **pg** `8.11.0` - PostgreSQL driver (database operations)
- **mongoose** `7.0.0` - MongoDB ORM (breaking changes between majors)
- **jsonwebtoken** `9.0.0` - JWT authentication (security-critical)

#### Validation & Schema (LOW-MEDIUM RISK)
- **joi** `17.9.0` - Schema validation
- **zod** `3.21.0` - TypeScript-first schema validation
- **dotenv** `16.0.0` - Environment variables

#### Build Tools (MEDIUM-HIGH RISK)
- **webpack** `5.88.0` - Module bundler (breaking changes)
- **vite** `4.3.0` - Modern build tool
- **@babel/core** `7.22.0` - Babel transpiler (coordinated updates)
- **@babel/preset-env** `7.22.0` - Babel preset (must match core version)

### Development Dependencies

#### Type Definitions (LOW RISK)
- **@types/node** `20.17.0` - Node.js types
- **@types/express** `4.17.0` - Express types
- **@types/uuid** `9.0.0` - UUID types
- **@types/react** `18.2.0` - React types
- **@types/jsonwebtoken** `9.0.0` - JWT types

#### Testing Libraries (LOW RISK)
- **jest** `29.5.0` - Testing framework
- **vitest** `0.34.0` - Vite-native test runner
- **@testing-library/react** `14.0.0` - React testing utilities
- **@testing-library/jest-dom** `5.16.0` - Jest DOM matchers
- **@testing-library/user-event** `14.4.0` - User interaction simulation

#### Code Quality (LOW RISK)
- **typescript** `5.0.4` - TypeScript compiler
- **eslint** `8.50.0` - Linter
- **prettier** `3.0.0` - Code formatter

#### Build Tooling (MEDIUM RISK)
- **babel-loader** `9.1.0` - Webpack Babel loader
- **@babel/preset-react** `7.22.0` - Babel React preset

## Test Scenarios

### 1. Patch Updates (x.x.X)
**Expected Bot Behavior:** AUTO_MERGE (LOW risk)
- Minor bug fixes
- No breaking changes
- Typically safe to auto-merge if CI passes
- **Examples:** lodash, uuid, date-fns patch updates

### 2. Minor Updates (x.X.x)
**Expected Bot Behavior:** REQUIRE_APPROVAL or AUTO_MERGE (MEDIUM risk)
- New features added
- Backward compatible
- Bot should check release notes for significant changes
- **Examples:** axios, express, redux minor updates

### 3. Major Updates (X.x.x)
**Expected Bot Behavior:** REQUIRE_APPROVAL (HIGH risk)
- Breaking changes expected
- Requires human review
- Bot should flag for careful consideration
- **Examples:** react, webpack, mongoose major updates

### 4. Security Updates
**Expected Bot Behavior:** AUTO_MERGE or REQUIRE_APPROVAL (depends on severity)
- CVE fixes
- Should be prioritized
- Bot checks CVE database for both versions
- **Examples:** lodash security patches, jsonwebtoken updates

### 5. Type Definition Updates
**Expected Bot Behavior:** AUTO_MERGE (LOW risk)
- @types/* packages
- No runtime impact
- Safe to merge with passing CI
- **Examples:** @types/node, @types/express, @types/react

### 6. Critical Infrastructure Updates (NEW)
**Expected Bot Behavior:** REQUIRE_APPROVAL (HIGH-CRITICAL risk)
- Database drivers, authentication libraries
- High impact if broken
- Requires thorough testing
- **Examples:** pg, mongoose, jsonwebtoken

### 7. Monorepo Coordinated Updates (NEW)
**Expected Bot Behavior:** AUTO_MERGE if all related packages update together (MEDIUM risk)
- Multiple packages from same ecosystem
- Should update together for compatibility
- Bot should recognize coordinated updates
- **Examples:** @babel/core + @babel/preset-env, @testing-library packages

### 8. Deprecated Package Updates (NEW)
**Expected Bot Behavior:** REQUIRE_APPROVAL with migration suggestion (MEDIUM risk)
- Package is marked as deprecated
- Bot should suggest modern alternatives
- **Examples:** moment (deprecated, suggest date-fns or dayjs)

### 9. Build Tool Updates (NEW)
**Expected Bot Behavior:** REQUIRE_APPROVAL (MEDIUM-HIGH risk)
- Build pipeline changes can break everything
- Requires local testing before merge
- **Examples:** webpack, vite, babel-loader

### 10. State Management & Routing Updates (NEW)
**Expected Bot Behavior:** REQUIRE_APPROVAL for major, AUTO_MERGE for minor (MEDIUM risk)
- Core application architecture
- Breaking changes affect entire app
- **Examples:** redux, zustand, react-router-dom

## Application Code

The test app demonstrates real usage of dependencies:

```javascript
// index.js - Simple Express app using all dependencies
import axios from 'axios';
import _ from 'lodash';
import express from 'express';

// Uses lodash for data processing
export function processData(data) {
  return _.chunk(data, 2);
}

// Uses axios for HTTP requests
export async function fetchUserData(userId) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return response.data;
}

// Express server with API endpoints
app.get('/api/data', ...);
app.get('/api/user/:id', ...);
```

## Test Suite

Automated tests verify:
1. ✅ Lodash data processing works correctly
2. ✅ Axios HTTP client can fetch external data
3. ✅ All dependencies load without errors
4. ✅ Express server can be instantiated

Run tests:
```bash
npm test
```

## Bot Workflow

The bot is configured to run on:
- `pull_request` events (opened, synchronize, reopened)
- `workflow_run` events after CI completes

### Configuration

`.github/workflows/dependency-bot.yml`:
```yaml
jobs:
  dependency-bot:
    if: github.actor == 'dependabot[bot]' || contains(github.event.pull_request.title, 'Bump')
    runs-on: ubuntu-latest

    permissions:
      contents: write
      pull-requests: write
      checks: read

    steps:
      - uses: SeanZoR/llm-dependency-bot@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          skip-author-check: true  # For testing manual PRs
```

## Expected Bot Outputs

### Example: Minor Update (axios 1.6.0 → 1.7.9)

**Decision:** 👤 Human review required
**Risk Level:** MEDIUM

**Reasoning:**
> While this appears to be a minor version update, several factors require human review. The CI status is currently 'pending' with no conclusion, which means we don't have confirmation that all tests pass. The mergeable status is 'unstable' rather than clean, suggesting potential issues. Additionally, this spans multiple minor versions (1.6.0 to 1.7.9), which could include accumulated changes that warrant review.

### Example: Patch Update (lodash 4.17.20 → 4.17.21)

**Decision:** ✅ Auto-merge
**Risk Level:** LOW

**Reasoning:**
> This is a patch-level update with passing CI tests. The mergeable state is clean. Lodash 4.17.21 includes security fixes but no breaking changes. Safe to auto-merge.

## Testing the Bot Locally

For local testing and development of the bot itself, see the main repository's documentation:
https://github.com/SeanZoR/llm-dependency-bot

## Dependabot Configuration

`.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    open-pull-requests-limit: 10
```

## CI Pipeline

Basic CI workflow that the bot considers:
- Runs `npm test` to verify all dependencies work
- Must pass before bot will auto-merge
- Bot checks CI status as part of risk assessment

## Monitoring Bot Activity

View bot activity:
```bash
# List recent workflow runs
gh run list --workflow="LLM Dependency Bot"

# View specific run logs
gh run view <run-id> --log

# Check PR comments
gh pr view <pr-number> --comments
```

## Contributing

This is a test repository for the LLM Dependency Bot. For issues or improvements to the bot itself, please visit:
https://github.com/SeanZoR/llm-dependency-bot

## License

MIT
