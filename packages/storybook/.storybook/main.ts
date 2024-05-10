import { dirname, join } from 'node:path'
import type { StorybookConfig } from '@storybook/vue3-vite'

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../../components/**/stories/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  staticDirs: ['../public'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
}

export default config
