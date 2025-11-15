# Testing React Components with Vitest and React Testing Library

A comprehensive educational tutorial demonstrating how to test React components effectively using **Vitest** and **React Testing Library**.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Testing Basics](#testing-basics)
5. [Common Testing Patterns](#common-testing-patterns)
6. [Running Tests](#running-tests)
7. [Best Practices](#best-practices)

## Overview

This project teaches you how to write effective tests for React components using:

- **Vitest**: A blazingly fast unit test framework powered by Vite
- **React Testing Library**: A testing utility that encourages testing components like how users interact with them
- **jsdom**: A JavaScript implementation of web standards for testing in Node.js

### Why These Tools?

- **Vitest** is faster and has better ES module support than Jest
- **React Testing Library** promotes testing user behavior rather than implementation details
- Together, they provide a modern, efficient testing experience

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Project Structure

```
src/
├── components/
│   ├── HelloWorld.jsx              # Simple component
│   ├── HelloWorld.test.jsx         # Component test
│   ├── HelloPerson.jsx             # Props-based component
│   └── HelloPerson.test.jsx        # Props testing
```

## Core Concepts

### What is a Unit Test?

A unit test verifies that a single piece of code (a function, component, etc.) works as expected in isolation.

### The Testing Philosophy

React Testing Library encourages testing components the way users interact with them:

- Test **what users see** (rendered output)
- Test **what users do** (clicking, typing)
- Don't test implementation details (internal state, component structure)

### Test Structure: Arrange, Act, Assert

Most tests follow this pattern:

```javascript
it("should do something", () => {
  // Arrange: Set up the component
  render(<MyComponent />);

  // Act: Simulate user interaction
  const element = screen.getByText("Click me");
  userEvent.click(element);

  // Assert: Check the results
  expect(screen.getByText("Success!")).toBeInTheDocument();
});
```

## Testing Basics

### Example 1: Testing Simple Output

**Component (`HelloWorld.jsx`):**
```jsx
export default function HelloWorld() {
  return <h1>Hello World!</h1>
}
```

**Test (`HelloWorld.test.jsx`):**
```jsx
import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

describe("HelloWorld Component", () => {
  it("should render 'Hello World!' heading", () => {
    // Arrange: Render the component
    render(<HelloWorld />);
    
    // Act: Query for the element (implicitly done by screen.getByText)
    const heading = screen.getByText("Hello World!");
    
    // Assert: Verify it exists
    expect(heading).toBeInTheDocument();
  });
});
```

### Example 2: Testing with Props

**Component (`HelloPerson.jsx`):**
```jsx
export default function HelloPerson({ name }) {
  return <h1>Hello {name}!</h1>
}
```

**Test (`HelloPerson.test.jsx`):**
```jsx
import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HelloPerson from "./HelloPerson";

describe("HelloPerson Component", () => {
  it("should display the person's name", () => {
    render(<HelloPerson name="Alice" />);
    expect(screen.getByText("Hello Alice!")).toBeInTheDocument();
  });

  it("should work with different names", () => {
    render(<HelloPerson name="Bob" />);
    expect(screen.getByText("Hello Bob!")).toBeInTheDocument();
  });
});
```

**Key Takeaway**: Pass different props to test various scenarios.

## Common Testing Patterns

### Query Methods

React Testing Library provides several ways to find elements:

| Method | Use Case |
|--------|----------|
| `getByText()` | Find by visible text |
| `getByRole()` | Find by ARIA role (preferred) |
| `getByPlaceholderText()` | Find input by placeholder |
| `getByLabelText()` | Find by associated label |
| `queryBy*()` | Verify element does NOT exist |

**Tip**: `getByRole()` is the most accessible query method.

```jsx
// Good - finds by role
screen.getByRole("heading", { name: /hello/i });

// Also acceptable
screen.getByText(/hello world/i); // Case-insensitive regex
```

### Testing User Interactions

```jsx
import { userEvent } from "@testing-library/user-event";

it("should handle clicks", async () => {
  render(<Button onClick={vi.fn()}>Click me</Button>);
  
  const button = screen.getByRole("button");
  await userEvent.click(button);
  
  expect(someFunction).toHaveBeenCalled();
});
```

### Testing Conditional Rendering

```jsx
it("should show message when loading", () => {
  render(<Component isLoading={true} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("should show content when loaded", () => {
  render(<Component isLoading={false} />);
  expect(screen.getByText("Content")).toBeInTheDocument();
});
```

## Running Tests

### Run Tests in Watch Mode

Watch mode automatically re-runs tests when files change:

```bash
npm run test
```

This is great during development. Your tests will re-run as you make changes.

### Run Tests Once

Use this in CI/CD pipelines or when you just want a single run:

```bash
npm run test:run
```

### Run Specific Tests

```bash
npx vitest HelloWorld.test.jsx
```

### Run with Coverage

```bash
npx vitest --coverage
```

## Best Practices

### ✅ Do

- **Test user behavior**: Click buttons, submit forms, type in inputs
- **Test visible output**: What does the user see?
- **Use descriptive test names**: `it("should display user's name when provided")`
- **Keep tests focused**: One test should verify one behavior
- **Use semantic queries**: `getByRole()` > `getByText()` > `getByTestId()`
- **Test edge cases**: Empty states, error states, loading states

### ❌ Don't

- **Test implementation details**: Don't test internal state or functions
- **Use `querySelector()`**: Use React Testing Library queries instead
- **Mock unnecessarily**: Mock external APIs, not your own components
- **Write brittle tests**: Don't tie tests to exact HTML structure
- **Test CSS**: CSS is for visual regression tests, not unit tests

### Example: Good vs Bad

**❌ Bad - Tests implementation:**
```jsx
it("should set name state", () => {
  const component = render(<MyComponent />);
  // Don't do this - testing internal state
  expect(component.state.name).toBe("John");
});
```

**✅ Good - Tests behavior:**
```jsx
it("should display the user's name", () => {
  render(<MyComponent />);
  // Test what the user sees
  expect(screen.getByText("John")).toBeInTheDocument();
});
```

## Next Steps

1. **Run the existing tests**: `npm run test`
2. **Examine the test files** to see real examples
3. **Modify components** and watch tests pass/fail in watch mode
4. **Write your own tests** for new components
5. **Explore the docs**:
   - [Vitest Documentation](https://vitest.dev/)
   - [React Testing Library Docs](https://testing-library.com/react)
   - [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Resources

- [Kent C. Dodds on Testing](https://kentcdodds.com/) - Essential reading
- [React Testing Library Cheatsheet](https://testing-library.com/docs/queries/about)
- [Vitest Getting Started](https://vitest.dev/guide/)

---

Happy testing! 🧪
