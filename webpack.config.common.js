const path = require('path')

const loaders = [
  {
    test: /\.(js|jsx)$/,
    use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
    include: path.join(__dirname, 'src')
  },
  {
    test: /\.json$/,
    include: path.join(__dirname, 'src'),
    use: { loader: 'json-loader' }
  },
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader?sourceMap&importLoaders=1&modules&localIdentName=[name]_[local]__[hash:base64:5]',
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ]
  },

  // Font Definitions
  { test: /\.svg$/, use: { loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]' } },
  { test: /\.woff$/, use: { loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' } },
  { test: /\.woff2$/, use: { loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' } },
  { test: /\.[ot]tf$/, use: { loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' } },
  { test: /\.eot$/, use: { loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' } },

  {
    test: /\.(png|jpg)$/,
    use: {
      loader: 'url-loader?limit=8192'
    },
    include: path.join(__dirname, 'src')
  }
]

module.exports = {
  loaders
}
