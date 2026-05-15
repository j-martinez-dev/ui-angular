import { Preview } from '@storybook/angular';
import { withThemeByClassName } from '@storybook/addon-themes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'theme-dark',
        stripe: 'theme-stripe',
        vercel: 'theme-vercel',
        linear: 'theme-linear',
        figma: 'theme-figma',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
