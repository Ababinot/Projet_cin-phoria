const path = require('path');

module.exports = {
  resolve: {
    alias: {
      // Alias pour le dossier contenant les fichiers CSS
      '@styles': path.resolve(__dirname, 'src/assets/styles')
    }
  },
  entry: './src/main.js', // Point d'entrée de votre application
  output: {
    path: path.resolve(__dirname, 'dist'), // Répertoire de sortie pour les fichiers générés
    filename: 'bundle.js' // Nom du fichier de sortie
  },
  module: {
    rules: [
      // Règles pour le chargement des fichiers JavaScript avec Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // Règles pour le chargement des fichiers Vue avec Vue Loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // Règles pour le chargement des fichiers CSS
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // Extensions à résoudre automatiquement
    alias: {
      '@': path.resolve(__dirname, 'src') // Alias pour le répertoire src
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Répertoire de base pour le serveur de développement
    compress: true, // Compression activée
    port: 8080 // Port à utiliser pour le serveur de développement
  }
};
