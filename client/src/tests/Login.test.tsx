import { render, screen } from "@testing-library/react";

import { describe, expect, test } from "vitest";
import Login from "../Components/Login.component";

describe("Test for Login Form", () => {
  test("Form renders", async () => {
    render(<Login />, {});

    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /Login/i })).toBeDefined();
  });

  test("Invalid username and password", async () => {});

  test("Valid username and password", async () => {});

  test("Render App when already authenticated", async () => {});
});
