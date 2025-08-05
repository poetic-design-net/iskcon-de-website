# Global Playwright Setup Instructions

## Why Global Installation?
To save disk space across multiple projects, Playwright has been installed globally on this system.

## Global Installation Location
- npm global packages: `/Users/frederikkarschuk/.npm-global/`
- Playwright browsers cache: `/Users/frederikkarschuk/Library/Caches/ms-playwright/`

## How to Use in New Projects

### 1. Create a new project
```bash
mkdir my-new-project
cd my-new-project
npm init -y
```

### 2. Install only @playwright/test locally
```bash
npm install -D @playwright/test
```

### 3. Create playwright.config.ts
Create a `playwright.config.ts` file in your project root. The global Playwright installation will be used automatically.

### 4. Run tests
```bash
# Using npx (recommended)
npx playwright test

# Or add to package.json scripts
npm test
```

## Verify Global Installation
```bash
# Check global npm packages
npm list -g playwright

# Check browser installations
ls /Users/frederikkarschuk/Library/Caches/ms-playwright/
```

## Benefits
- **Space Saving**: Browsers (Firefox, WebKit, Chromium) are only stored once
- **Faster Setup**: New projects don't need to download browsers
- **Consistent Versions**: All projects use the same browser versions

## Updating Global Installation
```bash
# Update global Playwright
npm update -g playwright

# Update browsers
npx playwright install
```

## Troubleshooting
If a project can't find the global installation:
1. Ensure `@playwright/test` is installed locally in the project
2. Clear npm cache: `npm cache clean --force`
3. Verify global path is in npm config: `npm config get prefix`