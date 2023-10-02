# Notes from course

## github

- create repo **pw-practice-app** on github, add dummy file **x** to it
- clone app locally
- locally update the remote Url
  - `git remote add origin https://github.com/protono/pw-practice-app.git` -> `error: remote origin already exists.`
  - `git remote set-url origin https://github.com/protono/pw-practice-app.git`
- rebase
  - `git pull --rebase origin main`
- delete dummy file
  - `rm -rf x`
- commit
  - `git add . ; git commit -m 'initial commit'`
- name the branch as wished
  - `git branch -M main`
- push
  - `git push -u origin main`

## install

- `npm init playwright@latest --force -y`
- `npx playwrigth test --project=chromium`
- `npx playwright test --project=chromium --headed`
- `npx playwright show-report`
- `npx playwright test example.spec.ts --project=chromium`
- `npx playwright test -g 'has title' --project=chromium`
- `npx playwright test --ui`
- `npx playwright test --project=chromium --trace on`
- `npx playwright test --project=chromium --debug`

## first test

```javascript
import { test } from '@playwright/test'
test.describe('first suite', () => {
    test('first test', async ({ page }) => {
        await page.goto('')
    })
})
```

using `baseURL: 'http://localhost:4200'` in `playwright.config.ts`
