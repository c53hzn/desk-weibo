var myBase = "/desk-weibo";

module.exports = {
  head: {
    // eg: '%s | Jenny的微博',
    titleTemplate: '%s | Jenny的微博',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: myBase+'/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: myBase+'/favicon.ico' },
      { rel: 'stylesheet', href: myBase+'/css/font-Noto-Sans-SC.css' },
      { rel: 'stylesheet', href: myBase+'/css/style.css?2021-11-18' },
      { rel: 'stylesheet', href: myBase+'/font-awesome/css/font-awesome.min.css'},
    ],
    script: [
      { src: '/js/statcounter.js?2021-11-20'},
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-2790001673900763',
        'async':true
      }
    ]
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
