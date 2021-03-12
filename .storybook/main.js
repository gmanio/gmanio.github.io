module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async config => {
    // Without stats = false, building will generate an error at node_modules/@storybook/builder-webpack5/dist/cjs/index.js:181
    // TypeError: Cannot read property 'forEach' of undef
    config.stats = false;

    return { ...config, module: { ...config.module, rules: [...config.module.rules, {
      test: /\.(ts|tsx)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    }] } };
  },
};
