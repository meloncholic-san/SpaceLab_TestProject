import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: {
    fund: './src/pages/fund/fund.js',
    token: './src/pages/token/token.js',
    main_page: './src/pages/main-page/main_page.js',
    app: './src/js/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,               
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,              
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
