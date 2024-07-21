import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brand: [
      '#f0f4ff',
      '#d9e2ff',
      '#b8c9ff',
      '#94afff',
      '#698fff',
      '#3e66ff',
      '#0044ff',
      '#0030cc',
      '#002099',
      '#001066',
    ],
  },
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 8 },
  fontFamily: 'Arial, sans-serif',
  headings: {
    fontFamily: 'Verdana, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2rem' },
      h3: { fontSize: '1.75rem' },
    },
  },
  components: {
    Table: {
      styles: (theme) => ({
        root: {
          width: '80%',
          borderCollapse: 'collapse',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        thead: {
          backgroundColor: theme.colors.brand[6],
          color: theme.white,
        },
        th: {
          padding: '12px',
          textAlign: 'left',
          borderBottom: '1px solid #ddd',
        },
        td: {
          padding: '12px',
          borderBottom: '1px solid #ddd',
        },
        'tbody tr:hover': {
          backgroundColor: theme.colors.gray[1],
        },
      }),
    },
  },
});
