import { render, screen } from "@testing-library/react";
import { describe, test, vitest } from "vitest";
import App from "../App";

describe("App test", () => {
  test("App renders", () => {
    global.ResizeObserver = vitest.fn().mockImplementation(() => {
      return {
        observe: vitest.fn(),
        disconnect: vitest.fn(),
        unobserve: vitest.fn(),
      };
    });
    sessionStorage.setItem("jwt", import.meta.env.VITE_TEST_TOKEN);
    render(<App />);
    expect(screen.getByText(/add log/i)).toBeDefined();
  });
});
