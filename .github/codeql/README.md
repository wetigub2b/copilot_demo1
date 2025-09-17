# CodeQL Security Analysis Setup

This directory contains the CodeQL configuration for the CAAT Pension Vue.js project.

## Files

- `codeql-config.yml` - Main CodeQL configuration file

## Configuration Overview

The CodeQL analysis is configured to:

1. **Analyze JavaScript/TypeScript code** (Vue.js frontend)
2. **Analyze Python code** (FastAPI backend)
3. **Run security-extended and security-and-quality query suites**
4. **Exclude test files and build artifacts from analysis**

## Workflow Integration

CodeQL runs automatically via the `.github/workflows/codeql.yml` workflow on:

- Push to main/develop branches
- Pull requests to main/develop branches  
- Weekly schedule (Mondays)

## Viewing Results

Security analysis results are available in the repository's **Security** tab under **Code scanning alerts**.

## Customization

To modify the analysis scope or add custom queries, edit the `codeql-config.yml` file in this directory.