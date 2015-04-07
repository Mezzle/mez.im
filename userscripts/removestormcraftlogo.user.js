// ==UserScript==
// @name         Remove Stormcraft Logo
// @namespace    https://mez.im/userscripts/
// @updateURL    https://mez.im/userscripts/removestormcraftlogo.user.js
// @version      0.1.1
// @description  Removes the Stormcraft logo
// @author       Martin Meredith <mez@mez.im>
// @match        http://www.stormcraft.com/en/drafttool/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$ = jQuery.noConflict(true);

$('.dt-header-logo').remove();
