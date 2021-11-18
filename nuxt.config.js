module.exports = {
  head: {
    // eg: '%s | Moonhea的微博',
    titleTemplate: '%s | Moonhea的微博',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/font-Noto-Sans-SC.css' },
      { rel: 'stylesheet', href: '/css/style.css?2021-11-16' },
      { rel: 'stylesheet', href: '/font-awesome/css/font-awesome.min.css'},
    ],
  },
  //if you will deploy in <username>.github.io/<my-project>
  //then base should be set to "/<my-project>/"
  router: {
    base: '/desk-weibo/'
  },
  modules: [
  '@nuxt/content',
  ],
  content: {
    // $content api will be served on localhost:3000/content-api
    apiPrefix: 'content-api',
    markdown: {
      prism: {//need to create folder and import manually
        theme: 'prism-themes/themes/prism-ghcolors.css'
      }
    }
  },
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/bus'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
  },
  generate: {
  	async routes () {
      const { $content } = require('@nuxt/content');
      var files = await $content('desk')
      .sortBy("slug", "asc")
      .fetch();
      var allArticles = [];
      for (let i = 0; i < files.length; i++) {
        allArticles = [...allArticles,...files[i].posts];
      }
      allArticles = allArticles.reverse();

      const totalArticles = allArticles.length;

      // use Math.ceil to round up to the nearest whole number
      var lastPage = Math.ceil(totalArticles / 5);

      var postPaths = [];
      allArticles.map(function(a) {
        postPaths.push('/post/'+a.id);
      });
      for (let j = 1; j < lastPage+1; j++) {
        postPaths.push('/page/'+j);
      }
      return postPaths;
    },
    subFolders: false,
  },
  render: {
    fallback: {
      static: {
        handlers: {
          '.js': false,
          '.css': false
        }
      }
    }
  }
}
