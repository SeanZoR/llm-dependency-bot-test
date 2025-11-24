# LLM Dependency Bot - Test Repository

This repository is used to test the [LLM Dependency Bot](https://github.com/SeanZoR/llm-dependency-bot) GitHub Action.

## Purpose

- Test automated dependency updates
- Verify bot decisions (auto-merge, require-approval, block)
- Validate CI integration

## Dependencies

This repo intentionally uses older versions of popular packages to trigger Dependabot updates:
- axios (for patch/minor updates)
- lodash (for security updates)
- @types/node (for type definition updates)

## CI

Simple test workflow that always passes to validate bot behavior with passing CI.
 
