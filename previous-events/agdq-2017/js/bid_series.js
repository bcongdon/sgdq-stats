"use strict";getRetry("http://storage.api.gdqstat.us/killVsSave.json",function(a){setupBidSeries(a)});function setupBidSeries(c){c=JSON.parse(c);var d=c.map(function(f){return new Date(f.time)});d.unshift("x");var e=["Kill"],a=["Save"];for(var b=0;b<c.length;b++){if(b>0){c[b].save+=c[b-1].save;c[b].kill+=c[b-1].kill}e.push(c[b].kill);a.push(c[b].save)}graphSeries("#metroid_chart",d,[e,a])}function graphSeries(c,b,a){var d=[b].concat(a);return c3.generate({bindto:c,data:{x:"x",columns:d,colors:{Save:d3.rgb("#00AEEF"),Kill:d3.rgb("#F21847")}},axis:{x:{type:"timeseries",tick:{format:"%Y-%m-%d %I:%M%p",fit:false,count:9}},y:{tick:{format:d3.format("$,")}}},point:{r:1},tooltip:{format:{value:function(f,e,h){var g=d3.format("$,.2f");return g(f)}}},zoom:{enabled:true,rescale:true}})};