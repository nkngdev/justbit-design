"use strict";
module.exports = config => {
  config.default("defaultLang", "en");
  config.default("baseUrl", "http://localhost:3013");
  config.default("wsUrl", "ws://localhost:3011");
  config.default("projectName", "Exchanger");

  config.default("server:dev:port", 3013);
  config.default("server:dev:host", "localhost");
  config.default("__proxy_path", "/service");
  config.default("__proxy_to_rest_api", "http://localhost:3010");
  config.default("servicePath", "/service");
  config.default("fsPath", "/service/fs");
  config.default("apiPath", "/service/api/v1/");
  config.default("logoPath", "/service/fs/img/logo/big/logo.png");
  config.default("faviconPath", "/service/fs/img/favicon/32/favicon.png");

  config.default("styles:exchangeForm", "v2"); // v1 - select options, v2 - list, v3 - inputs
  config.default("eslint:status", false);

  config.save();
};
