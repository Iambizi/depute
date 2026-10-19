import { useEffect, type ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

function ThemeFrame({
  theme,
  density,
  children,
}: {
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable';
  children: ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    if (density === 'comfortable') root.dataset.axDensity = 'comfortable';
    else delete root.dataset.axDensity;
    document.body.style.background = theme === 'dark' ? '#111111' : '#fcfcfc';
    document.body.style.color = theme === 'dark' ? '#eeeeee' : '#202020';
  }, [theme, density]);

  return (
    <div data-ax-density={density === 'comfortable' ? 'comfortable' : undefined} style={{ padding: 24 }}>
      {children}
    </div>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light or dark component tokens',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
    density: {
      name: 'Density',
      description: 'Card and row density',
      defaultValue: 'compact',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    density: 'compact',
  },
  decorators: [
    (Story, context) => (
      <ThemeFrame
        theme={context.globals.theme === 'dark' ? 'dark' : 'light'}
        density={context.globals.density === 'comfortable' ? 'comfortable' : 'compact'}
      >
        <Story />
      </ThemeFrame>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
