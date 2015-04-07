// ==UserScript==
// @name        Seed From toolbox
// @namespace   https://mez.im/userscripts/
// @updateURL   https://mez.im/userscripts/esl/seedfromtoolbox.user.js
// @version     0.3.0
// @description Create button that will seed from toolbox
// @match       http://www.esl.eu/eu/*/admin_contestants*
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @author      Martin Meredith <mez@mez.im>
// @grant       none
// @copyright   2014-2015, Martin Meredith
// ==/UserScript==

$ = jQuery.noConflict(true);

var toolbox_url = 'http://toolbox1.tedc.de/';

var cup_url = window.location.href.replace('/admin_contestants','/').replace(/\/\/$/, '/');

$.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: toolbox_url + 'go4/get_series_by_url?url=' + cup_url + '&jsonpCallbackFunction=?',
        success: function (data) {

            var slug = data.slug;

            var rows = $('form table tr');

            $('input[value="Randomize Seedings"]').after('<input type="button" id="toolboxseed" value="Seed From Toolbox" />');
            $('#toolboxseed').click(
                function () {
                    var contestants = {};
                    var count = 0;
                    var result;
                    var arrayToSeed = [];

                    contestants_to_send = [];

                    rows.each(function (index) {
                        var id = $(this).find('td').eq(2).html();
                        if (id == parseInt(id)) {
                            contestants_to_send.push(id);
                        }
                    });

                    $.ajax({
                        type: 'POST',
                        crossDomain: true,
                        data: {contestants: contestants_to_send.join(",")},
                        url: toolbox_url + 'go4/' + slug + '/seed',
                        success: function (data) {
                            console.log(data);
                            result = data;
                            var count = 0;
                            rows.each(function (index) {
                                var id = $(this).find('td').eq(2).html();
                                var contestantRanking = data[id];
                                if (!isNaN(contestantRanking) && contestantRanking > 0) {
                                    arrayToSeed[count] = id;
                                    count++;
                                }
                            });

                            arrayToSeed.sort(function(a,b) {
                                return data[b]-data[a]
                            });

                            console.log(arrayToSeed);
                            rows.each(function (index) {
                                var id = $(this).find('td').eq(2).html();
                                var seed = arrayToSeed.indexOf(id);
                                var textfield = $(this).find('td input:text').first();
                                if (!isNaN(seed) && seed >= 0) {
                                    $(textfield).val(seed+1);
                                } else {
                                    $(textfield).val(0);
                                }
                            });
                        }
                    });
                }
            );
        }}
);
