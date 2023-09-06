# chemify-frontend-assessment-todo

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Developer commentary

This app is able to perform all CRUD operations except for Update. There's currently no way to update an existing task.

**Tech stack used**:

- NextJS
- React
- Typescript
- Mantine UI
- Jest
- Cypress

**Testing**

Though the tooling for testing (Jest & Cypress) are configured and ready to work in the project, I had no time to write any test. You'll find the default E2E smoke test from Cypress if you run `npm run build` and then `npm run test:e2e`.
