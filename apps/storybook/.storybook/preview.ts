import { Preview } from '@storybook/angular';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'theme-dark',
        pastel: 'theme-pastel',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
