/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';

/**
 * This file includes polyfills needed by Angular and is loaded before the main app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browser.
 *   2. Application imports. Files imported after ZoneJS that should be in the order.
 *
 * The current setup is for most modern browsers. See https://angular.io/guide/browser-support
 * for more details on browser support.
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * Web Animations `@angular/platform-browser/animations`
 * Browser required for web animations support
 */
import 'web-animations-js'; // Run `npm install --save web-animations-js`.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
