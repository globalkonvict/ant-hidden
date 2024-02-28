"use client";
import React, { useEffect, useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

/**
 * Interface for defining props related to responsive breakpoints. Each prop
 * corresponds to a range of screen widths, allowing the component's visibility
 * to be controlled based on the screen size.
 */
interface BreakpointProps {
  /** Display on extra small screens: screen < 576px */
  xs?: boolean;
  /** Display on small screens: screen ≥ 576px */
  sm?: boolean;
  /** Display on medium screens: screen ≥ 768px */
  md?: boolean;
  /** Display on large screens: screen ≥ 992px */
  lg?: boolean;
  /** Display on extra large screens: screen ≥ 1200px */
  xl?: boolean;
  /** Display on extra extra large screens: screen ≥ 1600px */
  xxl?: boolean;
}

/**
 * Interface for defining props related to custom media queries. Allows for
 * custom visibility controls beyond predefined breakpoints.
 */
interface MediaProps {
  /** Custom media query or queries for visibility */
  media?: string | string[];
}

/**
 * Combines `BreakpointProps` and `MediaProps` to create a comprehensive set of
 * props for the `Hidden` component, including `children` for the content to
 * conditionally display.
 */
type HiddenProps = BreakpointProps &
  MediaProps & {
    /** The content that will be conditionally displayed */
    children: React.ReactNode;
  };

/**
 * `Hidden` is a component that conditionally renders its children based on the current viewport's breakpoint or a custom media query.
 * This component integrates with Ant Design's `useBreakpoint` hook to dynamically show or hide content according to the screen size.
 *
 * @param {HiddenProps} props The props for the Hidden component.
 * @returns {React.ReactNode} The children to be rendered based on the specified conditions.
 *
 * @example
 * <Hidden xs={true}>
 *   <p>This text is hidden on extra small screens.</p>
 * </Hidden>
 *
 * @example
 * <Hidden media="(max-width: 768px)">
 *   <p>This text is hidden on screen widths up to 768px.</p>
 * </Hidden>
 *
 * @example
 * <Hidden xs sm>
 *   <p>This text is hidden on extra small and small screens.</p>
 * </Hidden>
 */
const Hidden: React.FC<HiddenProps> = ({ children, media, ...breakpoints }) => {
  const screens = useBreakpoint();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const updateVisibility = () => {
      if (media) {
        const mediaQueries = Array.isArray(media) ? media : [media];
        const matchMediaQuery = mediaQueries.some(
          (query) => window.matchMedia(query).matches
        );
        setShow(!matchMediaQuery);
      } else {
        const breakpointKeys = Object.keys(breakpoints) as Array<
          keyof typeof breakpoints
        >;
        const shouldHide = breakpointKeys.some(
          (key) => screens[key] && breakpoints[key]
        );
        setShow(!shouldHide);
      }
    };

    updateVisibility();

    if (media) {
      const mediaQueries = Array.isArray(media) ? media : [media];
      const mediaQueryLists = mediaQueries.map((query) =>
        window.matchMedia(query)
      );
      const handleChange = () => updateVisibility();

      mediaQueryLists.forEach((mql) =>
        mql.addEventListener("change", handleChange)
      );

      return () =>
        mediaQueryLists.forEach((mql) =>
          mql.removeEventListener("change", handleChange)
        );
    }
  }, [screens, media, breakpoints]);

  return show ? <>{children}</> : null;
};

export default Hidden;
