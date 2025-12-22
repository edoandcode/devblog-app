// @ts-nocheck
import { StrapiApp } from '@strapi/strapi/admin';

import Favicon from './extensions/favicon.ico';
import Logo from './extensions/logo.png';

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    auth: {
      logo: Logo
    },
    menu: {
      logo: Logo
    },
    head: {
      favicon: Favicon
    },
    tutorials: false,
    notifications: {
      releases: false
    }

  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};