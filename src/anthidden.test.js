import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Hidden from "./AntHidden";

// Mock the useBreakpoint hook from Ant Design
jest.mock("antd/lib/grid/hooks/useBreakpoint");

describe("Hidden Component", () => {
  it("should hide content on specified breakpoints", () => {
    // Mock the hook to simulate different screen sizes
    useBreakpoint.mockReturnValue({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    });

    const { rerender } = render(
      <Hidden xs>
        <div data-testid="content">Content</div>
      </Hidden>
    );

    // Content should not be visible on xs screens
    expect(screen.queryByTestId("content")).toBeNull();

    // Simulate a change to sm breakpoint where content should be visible
    useBreakpoint.mockReturnValue({
      xs: false,
      sm: true,
      md: false,
      lg: false,
      xl: false,
    });
    rerender(
      <Hidden xs>
        <div data-testid="content">Content</div>
      </Hidden>
    );

    // Now, content should be visible
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("should handle custom media queries", () => {
    // Use real window.matchMedia for this test
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 768px)",
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    render(
      <Hidden media="(max-width: 768px)">
        <div data-testid="content">Content</div>
      </Hidden>
    );

    // Content should not be visible because the media query matches
    expect(screen.queryByTestId("content")).toBeNull();
  });
});
