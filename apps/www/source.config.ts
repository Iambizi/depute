import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import githubLightHighContrast from '@shikijs/themes/github-light-high-contrast';
import { z } from 'zod';

// The high-contrast theme's comment gray is #66707B. On the docs code
// background (#f1f1f1) that pair is 4.46:1. #5c6570 clears 4.5:1.
const lightTheme = {
  ...githubLightHighContrast,
  name: 'depute-docs-light',
  tokenColors: githubLightHighContrast.tokenColors?.map((token) => {
    const scope = token.scope;
    const scopes = Array.isArray(scope) ? scope : scope ? [scope] : [];
    if (!scopes.includes('comment')) return token;
    return {
      ...token,
      settings: { ...token.settings, foreground: '#5c6570' },
    };
  }),
};

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      badge: z.string().optional(),
    }),
  }
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: lightTheme,
        dark: 'github-dark-high-contrast',
      },
    },
  },
});
