// ==UserScript==
// @name        Show Starcraft II Leagues
// @namespace   https://mez.im/userscripts/
// @updateURL   https://mez.im/userscripts/esl/showsc2leagues.user.js
// @version     1.0.1
// @description Show Leagues against SC2 Leaguejoins.
// @match       http://www.esl.eu/eu/sc2/*/admin_leaguejoins*
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @author      Martin Meredith <mez@mez.im>
// @grant       none
// @copyright   2013-2015, Martin Meredith
// ==/UserScript==

this.$ = jQuery.noConflict(true);

$('a.TextVSblack').each(function() {
    if ($(this).text() == 'B.net') {
        var el = this;
        var url = $(this).attr('href');
        var parts = url.match(/profile\/\d+\/\d\/.*\//);
        var otherparts = url.match(/..\.battle\.net/);

        var api_url = 'http://' + otherparts[0] + '/api/sc2/' + parts[0] + '?callback=?';

        $.getJSON(api_url, function(data) {

            var img_url;

            if (data.career.league == undefined) {
                img_url = "http://eu.battle.net/sc2/static/images/icons/league/none.png";
            } else {
                img_url = "http://eu.battle.net/sc2/static/images/icons/league/" + data.career.league.toLowerCase() + ".png";
            }

            $(el).parent().parent().find('img').before('<div style="display: inline-block; width:25px; height:25px; background: url(' + img_url + '); background-position: -145px 0; margin-right: 3px;">&nbsp;</div>');
        });

    }
});
