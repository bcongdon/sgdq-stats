"use strict";function accumulateStats(c){var d=0,e=0,a=0;for(var b=0;b<c.length;b++){d+=c[b].c;e+=c[b].e;a+=c[b].t}return{c:d,e:e,t:a}}function populateStatsOdometers(b){var a=b[b.length-1].m.toFixed(2);$("#oDonations").text(a);$("#oDonators").text(b[b.length-1].d);$("#oViewers").text(Math.max(b.reduce(function(e,d){return e>d.v?e:d.v},0)));var c=accumulateStats(b);$("#oChats").text(c.c);$("#oEmotes").text(c.e);$("#oTweets").text(c.t)}DBConnection.timeseriesListeners.push(populateStatsOdometers);DBConnection.getTimeseries().then(function(a){populateStatsOdometers(a)});function populateGamesOdometer(a){$("#oGames").text(a.length)}DBConnection.scheduleListeners.push(populateGamesOdometer);DBConnection.getSchedule().then(function(a){populateGamesOdometer(a)});