# `react-antd-hidden`

The `react-antd-hidden` component utilizes Ant Design's `useBreakpoint` hook to conditionally render children based on the viewport's breakpoints or custom media queries. This component is designed for responsive layouts, allowing developers to easily show or hide content at specific screen sizes or according to custom criteria.

## Features

- Seamless integration with Ant Design projects.
- Supports predefined Ant Design breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`.
- Allows for custom media query support, offering granular visibility control.
- Dependency-free, relying only on `react` and `antd`.

## Installation

Before installing `react-antd-hidden`, ensure your project includes `react` and `antd`.

Install via npm:

```bash
npm install react-antd-hidden
```

Or using yarn:

```bash
yarn add react-antd-hidden
```

## Usage

To use `Hidden`, import it into your component and wrap the elements you want to conditionally render based on viewport size or custom media queries.

### Examples

#### Hiding Content on Specific Breakpoints

```jsx
import Hidden from 'react-antd-hidden';

const ExampleComponent = () => (
  <Hidden xs sm>
    <p>This text is hidden on extra small and small screens.</p>
  </Hidden>
);
```

#### Utilizing Custom Media Queries

```jsx
import Hidden from 'react-antd-hidden';

const ExampleComponent = () => (
  <Hidden media="(max-width: 768px)">
    <p>This text is hidden on screens narrower than 768px.</p>
  </Hidden>
);
```

## API

### Props

| Prop    | Type                  | Description                                                                                               |
|---------|-----------------------|-----------------------------------------------------------------------------------------------------------|
| `xs`    | `boolean`             | Hide content on screens < 576px.                                                                          |
| `sm`    | `boolean`             | Hide content on screens ≥ 576px.                                                                          |
| `md`    | `boolean`             | Hide content on screens ≥ 768px.                                                                          |
| `lg`    | `boolean`             | Hide content on screens ≥ 992px.                                                                          |
| `xl`    | `boolean`             | Hide content on screens ≥ 1200px.                                                                         |
| `xxl`   | `boolean`             | Hide content on screens ≥ 1600px.                                                                         |
| `media` | `string \| string[]`  | Custom media query or queries. Content is hidden when the query matches.                                 |
| `children` | `React.ReactNode` | The content to be conditionally displayed based on the specified conditions. |

## Contributing

Contributions are welcome to enhance `react-antd-hidden`. Feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

`react-antd-hidden` is available under the MIT License. See the LICENSE file for more info.

