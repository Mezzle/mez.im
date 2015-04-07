// ==UserScript==
// @name        Colour Date specific Cups
// @namespace   https://mez.im/userscripts/esl/
// @updateURL   https://mez.im/userscripts/esl/colourdatespecificcups.user.js
// @version     1.0
// @description Change colour of date specific cups in League joins
// @match       http://www.esl.eu/*/admin_leaguejoins/*
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @author      Martin Meredith <mez@mez.im>
// @grant       none
// @copyright   2013-2015, Martin Meredith
// ==/UserScript==

$ = jQuery.noConflict(true);

var links = $($('#main_content').find('.TextS')[0]).find('a');

var months=['01','02','03','04', '05','06','07','08','09','10','11','12'];

var d = new Date();

var today;

if (d.getDate() < 10) {
    today = '0' + d.getDate() + '.' + months[d.getMonth()];
} else {
    today = d.getDate() + '.' + months[d.getMonth()];
}
var today_month = d.getMonth() + 1;
var today_date = d.getDate();

for (var i=0; i<links.length; i++) {
    mtch = $(links[i]).text().match('.+\\((\\d\\d\\.\\d\\d)\\)\\s+\\(\\d+\\)');
    // If Date specific
    if (mtch != null) {
        if (mtch[1] != today) {
            $(links[i]).css({ "color": "#ddd"});
        }
        m2 = mtch[1].match('(\\d\\d).(\\d\\d)');
        if (parseInt(m2[2]) < today_month || (parseInt(m2[2]) == today_month && parseInt(m2[1]) < today_date)) {
            $(links[i]).css({ "color": "#f00" });
        }
    }
    else {
        $(links[i]).css({ "color": "#d0d"})
    }
}
