# Files to Update in GitHub Repository

## 1. vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node",
      "config": { "maxLambdaSize": "15mb" }
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)\\.(?:js|css|svg|png|jpg|jpeg|gif|ico)$",
      "headers": { "cache-control": "public, max-age=31536000, immutable" },
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 2. vitest.config.ts
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./client/src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['client/src/**/*.{ts,tsx}'],
      exclude: ['client/src/**/*.test.{ts,tsx}', 'client/src/test/**/*']
    },
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@db': path.resolve(__dirname, './db')
    }
  },
  build: {
    outDir: 'dist/public',
    emptyOutDir: true
  }
});
```

## 3. client/src/test/setup.ts
```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

// Extend Vitest's expect with React Testing Library's matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Setup global test environment
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

## 4. Package Updates (Add to devDependencies in package.json)
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^latest",
    "@vitest/coverage-v8": "^latest",
    "@testing-library/user-event": "^latest"
  }
}
```

Please update these files in your GitHub repository with the exact contents shown above. This will ensure proper Vercel deployment and testing setup.
