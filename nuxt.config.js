const {sitemap} = require("./plugins/sitemap");

const Sass = require("sass");

const config_creator = require("./plugins/config-creator");
const {getExcludeRoutes, generateRoutes} =require("./plugins/routeGenerator");

const config = config_creator.get();
let proxyConfig = {};
if (!config.__proxy_path) config.__proxy_path = "/service";
const pxp = config.__proxy_path + "/";
proxyConfig[pxp] = {
  target: config.__proxy_to_rest_api,
  pathRewrite: {}
};
proxyConfig[pxp].pathRewrite["^" + pxp] = "/";

module.exports = {
  telemetry: false,
  target: "static",
  server: {
    port: config_creator.get("server:dev:port"),
    host: config_creator.get("server:dev:host")
  },
  generate: {
    dir: "dist/client",
    routes: async () => generateRoutes(),
    exclude: [/^(?=.*\buser\b).*$/]
  },
  ssr: true,
  head: {
    title: config_creator.get("projectName"),
    meta: [{charset: "utf-8"}, {name: "viewport", content: "width=device-width, initial-scale=1"}],
    link: [{rel: "icon", type: "image/x-icon", href: config_creator.get("faviconPath")}]
  },
  loading: {
    color: "#006cf0",
    height: "5px"
  },
  css: [],
  modules: [
    ["@nuxtjs/proxy", {logLevel: 'error'}],
    ["nuxt-validate"],
    ["nuxt-clipboard2"],
    ["cookie-universal-nuxt", {alias: "cookiz", parseJSON: false}],
    [
      "nuxt-i18n",
      {
        strategy: "prefix_and_default",
        parsePages: false,
        // rootRedirect: config_creator.get("defaultLang") + "/",
        lazy: true,
        baseUrl: config_creator.get("baseUrl"),
        detectBrowserLanguage: false,
        // detectBrowserLanguage: {
        //   cookieKey: "redirected",
        //   useCookie: true
        // }
        locales: [
          {
            name: "Русский",
            symbol: "РУС",
            code: "ru",
            iso: "ru-RU",
            file: "ru.js"
          },
          {
            name: "English",
            symbol: "ENG",
            code: "en",
            iso: "en-US",
            file: "en.js"
          }
        ],
        langDir: "locales/",
        defaultLocale: config_creator.get("defaultLang")
      }
    ],
    ["vue-sweetalert2/nuxt"],
    ["@nuxtjs/moment", {locales: ["en-gb", "ru"], defaultLocale: "en-gb"}],
    [
      "@nuxtjs/pwa",
      {
        meta: {name: config.projectName, description: config.projectName},
        manifest: {name: config.projectName, theme_color: "#121621"},
        icon: {iconSrc: config_creator.get("faviconPath")}
      }
    ],
    "@nuxtjs/axios",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    ["nuxt-seo"]
  ],
  robots: {
    UserAgent: "*",
    CrawlDelay: "1",
    Host: config.baseUrl.split("://")[1],
    Sitemap: config.baseUrl + "/sitemap.xml",
    Disallow: undefined
  },
  sitemap: {
    hostname: config.baseUrl,
    gzip: true,
    defaults: {
      changefreq: "weekly",
      priority: 0.5,
      lastmod: new Date()
    },
    exclude: getExcludeRoutes(),
    routes: async () => {
      const friendlyExchange = await generateRoutes(true);
      if (!friendlyExchange) return sitemap;
      friendlyExchange.forEach(el => {
        sitemap.push({url: el, changefreq: "always", priority: 0.9});
      });
      return sitemap;
    },
    i18n: {
      defaultLocale: "en",
      locales: ["en", "ru"],
      routesNameSeparator: "___"
    }
  },
  plugins: [
    {src: "~/plugins/loader.js"},
    {src: "~/plugins/rest-api.js"},
    {src: "~/plugins/v-runtime.js", ssr: false}
  ],
  axios: {
    proxy: true
  },
  proxy: proxyConfig,
  env: {
    config: config
  },

  build: {
    loaders: {
      scss: {
        implementation: Sass,
        // fiber: Fiber
      }
    },
    extend(config) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    }
  }
};
