# Understanding Semantic Versioning in npm Packages

Semantic Versioning (SemVer) is a versioning scheme that helps developers communicate how changes to a package might impact users. It's widely adopted in the npm ecosystem and essential to understand for effective dependency management.

## The Basics: MAJOR.MINOR.PATCH

SemVer uses a three-part version number format:

```
MAJOR.MINOR.PATCH
```

Example: `2.4.1`

- **MAJOR**: Incremented when making incompatible API changes
- **MINOR**: Incremented when adding functionality in a backward-compatible manner
- **PATCH**: Incremented when making backward-compatible bug fixes

## Version Change Rules

When releasing new package versions, follow these rules:

1. **PATCH update** (1.0.0 → 1.0.1)
   - Bug fixes
   - Performance improvements
   - Changes that don't affect the API

2. **MINOR update** (1.0.0 → 1.1.0)
   - New features
   - Non-breaking API additions
   - Marking features as deprecated
   - Large internal refactors that maintain compatibility

3. **MAJOR update** (1.0.0 → 2.0.0)
   - Breaking changes
   - API redesigns
   - Removing deprecated features
   - Major architectural changes

## Version Ranges in package.json

In your package.json, you can specify version ranges using special characters:

```json
"dependencies": {
  "exact-version": "1.2.3",
  "compatible-updates": "^1.2.3",
  "patch-updates-only": "~1.2.3",
  "greater-than": ">1.2.3",
  "greater-equal": ">=1.2.3",
  "less-than": "<2.0.0",
  "range": ">=1.2.3 <2.0.0"
}
```

### Range Specifiers

- **^1.2.3**: Allows updates that don't change the leftmost non-zero digit
  - `^1.2.3` → `>=1.2.3 <2.0.0`
  - `^0.2.3` → `>=0.2.3 <0.3.0`
  - `^0.0.3` → `>=0.0.3 <0.0.4`

- **~1.2.3**: Allows patch-level changes if minor version is specified
  - `~1.2.3` → `>=1.2.3 <1.3.0`
  - `~1.2` → `>=1.2.0 <1.3.0`

- **>**, **>=**, **<**, **<=**: Allows versions greater/less than the specified version

- **1.2.x** or **1.2.***: Equivalent to `>=1.2.0 <1.3.0`

- **\***: Allows any version

## Pre-release Versions

For software in development, use pre-release versions:

```
1.0.0-alpha
1.0.0-alpha.1
1.0.0-beta
1.0.0-beta.2
1.0.0-rc.1
```

Pre-release versions indicate the software is not yet ready for production.

## Example: Version Evolution

Here's how a package might evolve:

1. **1.0.0**: Initial stable release
2. **1.0.1**: Fixed a bug in error handling (PATCH)
3. **1.1.0**: Added a new function (MINOR)
4. **1.1.1**: Fixed a memory leak (PATCH)
5. **2.0.0**: Changed parameter order in main function (MAJOR - breaking change)
6. **2.1.0**: Added optional parameters (MINOR)

## Practical Demo: Version Updates

The `package.json` in this folder contains examples of how to specify dependencies with different version constraints. You can experiment with updating versions to see how they behave.

## Managing Package Updates

To check for outdated packages in your project:

```bash
npm outdated
```

To update packages according to the version ranges in package.json:

```bash
npm update
```

To install a specific version:

```bash
npm install lodash@4.17.15
```

## Best Practices

1. **Start at 1.0.0** for public APIs, or 0.y.z for development
2. **Follow SemVer strictly** to build trust with users
3. **Document breaking changes** in release notes
4. **Use caution with ^** in dependencies for critical applications
5. **Lock versions** in production with package-lock.json
6. **Update regularly** to avoid major compatibility gaps
7. **Consider using ~ for critical dependencies** to only get bug fixes

## The 0.y.z Versions

Versions below 1.0.0 (e.g., 0.y.z) are considered "initial development" versions:

- The API is not considered stable
- Breaking changes can happen in MINOR releases
- Use with caution in production

## Further Reading

- [Official Semantic Versioning Specification](https://semver.org/)
- [npm Docs: About semantic versioning](https://docs.npmjs.com/about-semantic-versioning)
- [npm semver calculator](https://semver.npmjs.com/) 