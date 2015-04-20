// ==UserScript==
// @name         Hide Reddit Sidebar
// @namespace    https://mez.im/
// @version      0.1.2
// @description  Toggle on and off the reddit sidebad
// @updateURL    https://mez.im/userscripts/hideredditsidebar.user.js
// @author       You
// @match        https://www.reddit.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

this.$ = jQuery.noConflict(true);

$('<span>').append(
    $('<a>').text('Toggle Sidebar')
        .attr('href', '#')
        .click(function (e) {
            e.preventDefault();

            var sidebar = $('.side');

            if (sidebar.attr('style')) {
                if (sidebar.attr('style').match('none')) {
                    sidebar.css('display', 'block');
                } else {
                    sidebar.css('display', 'none');
                }
            } else {
                sidebar.css('display', 'none');
            }
        })
)
    .prependTo($('#header-bottom-right'))
    .after($('<span>').text('|').addClass('seperator'));
