Keeping it simple - my new github pages site is y2k themed! Using pure HTML, CSS and a small amount of JavaScript.
Great thanks to Jdan for their amazing [98 css](https://jdan.github.io/98.css/) project - check it out!

## Browser and accessibility tests

Install dependencies and the Playwright Chromium browser once:

```sh
npm install
npx playwright install chromium
```

Run the end-to-end tests with:

```sh
npm run test:e2e
```

The tests exercise the theme controls, project window, modal keyboard behavior,
mobile layout, and automated WCAG 2.1 A/AA checks using axe.
