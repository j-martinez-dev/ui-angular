import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|js|mdx)',
    '../../../libs/shared-ui/**/src/**/*.stories.@(ts|js|mdx)',
  ],
  addons: ['@storybook/addon-themes'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;

