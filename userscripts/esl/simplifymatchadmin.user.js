// ==UserScript==
// @name        Simplify Match Admin
// @namespace   https://mez.im/userscripts/
// @updateURL   https://mez.im/userscripts/esl/simplifymatchadmin.user.js
// @version     1.0
// @description Simplify Match Admin Interface
// @match       http://www.esl.eu/*/admin_match/*
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @author      Martin Meredith <mez@mez.im>
// @grant       none
// @copyright   2013-2015, Martin Meredith
// ==/UserScript==

$ = jQuery.noConflict(true);

var save_button = jQuery('input[type=image]')[1];

jQuery(save_button).parent().append('<input type="submit" id="send" value="Send" />');
jQuery(save_button).parent().append('<input type="button" id="cnc" value="Close &amp; Confirm" />');

jQuery(save_button).remove();

jQuery('#cnc').click(function() {
    jQuery('select[name=status]').val('closed');
    jQuery('select[name=calculate]').val('yes');
    jQuery('input[type=checkbox]').prop('checked', true);
    jQuery('input[name=featured]').prop('checked', false);
    jQuery('#send').click();
});

var main_content = jQuery('#main_content');

var table = jQuery(main_content.find('table')[1]);
var len = table.find('tr').length

for (var i = len - 7; i < len; i++) {
    jQuery(table.find('tr')[i]).toggle();
}

jQuery(table.find('tr')[len-8]).click(function () {
    for (var i = len - 7; i < len; i++) {
        jQuery(table.find('tr')[i]).toggle();
    }
});

var first_contestant = jQuery('input[name=contestant\\[1\\]]');
var second_contestant = jQuery('input[name=contestant\\[2\\]]');

if ((second_contestant.val() == 0) || (first_contestant.val() == 0)) {

    jQuery('select[name=status]').val('closed');
    jQuery('select[name=calculate]').val('yes');
    jQuery('input[type=checkbox]').prop('checked', true);
    jQuery('input[name=featured]').prop('checked', false);

    var cnt = jQuery(main_content.find('table')[2]).find('input').length
    var p2 = jQuery(main_content.find('table')[2]).find('input')[cnt-3];
    var p1 = jQuery(main_content.find('table')[2]).find('input')[cnt-7];

    if (second_contestant.val() == 0) {
        jQuery('select[name=defaultwin]').val(1);
        jQuery(p1).prop('value','1');
        jQuery(p2).prop('value','0');
    } else {
        jQuery('select[name=defaultwin]').val(2);
        jQuery(p1).prop('value','0');
        jQuery(p2).prop('value','1');
    }
    //alert('Defwin Detected, click send if correct');

    jQuery('#send').click();
}
