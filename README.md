# Homework Printer

App for generating printable homework sheets. See it live at: [homework.kilumanga.com](https://homework.kilumanga.com)

※ This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development

- `npm start` runs the app on http://localhost:3000.
- `npm test` runs the unit tests: problem difficulty, pagination, and a layout contract every block type in [src/blocks/registry.ts](src/blocks/registry.ts) must meet.
- `npm run test:layout` runs the browser layout tests in [e2e/](e2e/) with Playwright: the rendered pages must match the layout model in every language, and drag and drop must work. Run `npx playwright install chromium` once before the first run.

New problem types are blocks: implement `BlockDefinition` from [src/blocks/types.ts](src/blocks/types.ts), give each unit a fixed height in mm, and add the block to the registry. The contract and layout tests then cover it.
