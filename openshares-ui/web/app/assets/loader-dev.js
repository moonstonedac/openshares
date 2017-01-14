require("./stylesheets/app.scss");
require("file?name=index.html!./index-dev.html");
require("file?name=dictionary.json!common/dictionary_en.json");
require("babel/polyfill");
require("whatwg-fetch");
require("indexeddbshim");
require("./locales/locales.js");
