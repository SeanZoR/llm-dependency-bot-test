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
- **axios** `1.6.0` - HTTP client (testing minor version updates)
- **lodash** `4.17.20` - Utility library (testing patch updates with security considerations)
- **express** `4.18.0` - Web framework (testing updates to critical dependencies)
- **react** `18.2.0` - UI library (testing major framework updates)

### Development Dependencies
- **@types/node** `20.0.0` - TypeScript definitions (testing type-only updates)
- **@types/express** `4.17.0` - TypeScript definitions
- **typescript** `5.0.0` - TypeScript compiler (testing toolchain updates)

## Test Scenarios

### 1. Patch Updates (x.x.X)
**Expected Bot Behavior:** AUTO_MERGE (LOW risk)
- Minor bug fixes
- No breaking changes
- Typically safe to auto-merge if CI passes

### 2. Minor Updates (x.X.x)
**Expected Bot Behavior:** REQUIRE_APPROVAL or AUTO_MERGE (MEDIUM risk)
- New features added
- Backward compatible
- Bot should check release notes for significant changes

### 3. Major Updates (X.x.x)
**Expected Bot Behavior:** REQUIRE_APPROVAL (HIGH risk)
- Breaking changes expected
- Requires human review
- Bot should flag for careful consideration

### 4. Security Updates
**Expected Bot Behavior:** AUTO_MERGE or REQUIRE_APPROVAL (depends on severity)
- CVE fixes
- Should be prioritized
- Bot checks CVE database for both versions

### 5. Type Definition Updates
**Expected Bot Behavior:** AUTO_MERGE (LOW risk)
- @types/* packages
- No runtime impact
- Safe to merge with passing CI

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
