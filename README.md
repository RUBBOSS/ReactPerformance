# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Application Performance Profiling

### Optimization Strategy

This application is built in two phases:
1. Initial implementation without performance optimizations
2. Enhanced version with React.memo and useMemo optimizations

The profiling results below measure the differences between these two implementations.

### Overview of Application Performance

We used React Dev Tools Profiler to analyze the performance of our Countries application. Below are the key findings from profiling various interactions like filtering, searching, and sorting countries.

### Key Profiling Results

#### Initial Performance Analysis

From our profiling data (03-20-2025), we observed the following commit durations without optimizations:

![React Profiler Screenshot](./public/Screenshot(32).png)

| Commit # | Duration (ms) | Interaction Type |
|----------|--------------|-----------------|
| 1        | 31.1         | Initial Render  |
| 2        | 5.4          | Search Input    |
| 3        | 4.5          | Search Input    |
| 4        | 1.4          | Search Input    |
| 5        | 62.8         | Sort Operation  |
| 6        | 3.5          | Filter Region   |
| 7        | 3.3          | Filter Region   |

The results show that:
- The initial render took about 31ms
- Search interactions were efficient (1.4-5.4ms)
- Sorting operations were the most expensive (62.8ms)
- Region filtering was relatively quick (3.3-3.5ms)

#### Component Render Analysis

From the component measures in our profiling data:

```
{
  "componentName": "App",
  "duration": 1.8000000715255737,
  "timestamp": 10.5,
  "type": "render"
},
{
  "componentName": "SearchBar",
  "duration": 0.20000004768371582,
  "timestamp": 12.5,
  "type": "render"
},
{
  "componentName": "RegionFilter",
  "duration": 0.2999999523162842,
  "timestamp": 12.700000047683716,
  "type": "render"
},
{
  "componentName": "SortOptions",
  "duration": 0.20000004768371582,
  "timestamp": 13.200000047683716,
  "type": "render"
},
{
  "componentName": "CountryList",
  "duration": 2,
  "timestamp": 13.400000095367432,
  "type": "render"
},
{
  "componentName": "CountryCard",
  "duration": 0.19999992847442627,
  "timestamp": 16.90000009536743,
  "type": "render"
}
```

- Individual component render times were very fast (mostly < 0.3ms)
- The `CountryList` component had the longest render time (2ms)
- `CountryCard` components rendered in approximately 0.2ms each

### Performance Observations

![React Flame Graph](./public/screenshot(32).png)

- **Commit Duration**: Most interactions completed rendering in under 5ms, well within the 16ms threshold for a 60fps experience. The only exception was the sorting operation at 62.8ms.
- **Render Duration**: Individual components rendered quickly, with the `CountryList` component taking the most time due to the number of children it renders.
- **Interactive Performance**: Search functionality was particularly responsive (1.4-5.4ms), making it feel instant to users.
- **Expensive Operations**: Sorting the country list by population was the most expensive operation, taking over 60ms.

### Areas for Optimization

Based on our profiling data, we identified these optimization targets:

1. **Sorting Operations**: At 62.8ms, this is the most expensive interaction. Using `useMemo` to cache sorted results would prevent unnecessary re-sorting.

2. **CountryList Component**: This component and its children account for most of the render time. Memoizing this component with `React.memo` would prevent unnecessary re-renders.

3. **CountryCard Components**: With 250+ countries, these components are rendered frequently. Memoizing them with `React.memo` would prevent unnecessary re-renders when filtering or sorting.

### How to Run Your Own Profiling

1. Install React Developer Tools browser extension.
2. Open your application in development mode.
3. Open browser DevTools and navigate to the "Profiler" tab in React DevTools.
4. Click the record button (⚫) and perform the interaction you want to analyze.
5. Stop recording and analyze the results.

#### What to Look For

- **Commit Duration**: Time taken for React to render the committed updates. Aim for under 16ms for 60fps.
- **Render Duration**: Time taken for individual components to render. Look for components with unexpectedly high render times.
- **Interactions**: Which user interactions triggered renders and how efficiently they were processed.
- **Flame Graph**: Visual representation of component render times. Identify deep component trees or components that render too frequently.
- **Ranked Chart**: Sorted list of components by render duration. Focus optimization efforts on the slowest components.

### Future Optimization Opportunities

- Implement windowing (virtualization) for the country list when dealing with very large datasets.
- Consider lazy loading images for countries not currently in the viewport.
- Further optimize the sorting algorithm for large datasets.
- Implement debouncing for the search input to reduce the frequency of re-renders during typing.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
