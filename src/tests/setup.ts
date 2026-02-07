import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";

import { server } from "./mocks/server";

// expect.extend(matchers);
expect.extend(axeMatchers);
// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Close server after all tests
afterAll(() => server.close());
