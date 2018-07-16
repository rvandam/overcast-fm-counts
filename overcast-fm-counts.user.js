// ==UserScript==
// @name         Overcast Counts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://overcast.fm/podcasts
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

GM_addStyle(".stats { margin-left: 25px; }");
GM_addStyle(".left { left: 25px; float: left; width: calc(100% - 50px); }");
GM_addStyle(".right { float: right; text-align: right; width: 25px;}");

(function() {
    'use strict';

    // make some room for table of contents
    $('.pure-u-1-5:first-child').remove();
    var $container = $('.pure-u-1-5').addClass('pure-u-2-5').removeClass('pure-u-1-5'); //$('.container');

    // create div for presenting stats
    var $stats = $('<div class="stats content"></div>')
    $container.prepend($stats);
    var $table = $stats;
    $stats.append($table);

    // find and count all episodes
    var $episodes = $('.episodecell');
    var total = $episodes.length;
    $table.append('<h2 class="ocseparatorbar">Episode Counts</h2>');
    addLine($table, 'Total Episodes', total);

    // break down count of episodes by podcast name
    var $podcasts = $episodes.find('.titlestack > .caption2.singleline:first-child');
    var counts = {};
    $podcasts.each(function() { var key = $(this).html(); counts[key] = counts[key] || 0; counts[key]++; });

    // sort podcasts by count
    var sortable = [];
    for (var key in counts) {
        if (counts.hasOwnProperty(key)) {
            sortable.push([key, counts[key]]);
        }
    }
    sortable.sort(function(a,b) { return b[1] - a[1] }); // numeric sort of original value

    // present
    $.each(sortable, function (index) {
        var key, value;
        [key, value] = sortable[index];
        addLine($table, key, value);
    });
})();

function addLine($container, key, value) { $container.append('<div><div class="caption2 singleline left">' + key + '</div><div class="caption2 singeline right">' + value + '</div></div>'); }
