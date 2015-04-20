// ==UserScript==
// @name        Auto-Accept New GA Changes
// @namespace   https://mez.im/userscripts/
// @updateURL   https://mez.im/userscripts/esl/autoacceptnewgachanges.user.js
// @version     1.0.1
// @description Accepts GA changes with no previous GA
// @match       http://www.esl.eu/*/admin_ga_changes/view/*
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @author      Martin Meredith <mez@mez.im>
// @grant       none
// @copyright   2014-2015, Martin Meredith
// ==/UserScript==

this.$ = jQuery.noConflict(true);

var selector = $('#main_content').find('table');

if ($($(selector[1]).find('tr')[3]).find('td')[1].innerHTML == '<em>none</em>') {
    $($(selector[0]).find('div div')[5]).find('a')[0].click()
}
