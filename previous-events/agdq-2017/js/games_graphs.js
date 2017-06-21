getRetry("/data/2016/sgdq2016final.json",drawGamesGraphs);function getRetry(b,a){$.ajax({url:b,async:true,retryCount:0,retryLimit:5,retryTimeout:15000,timeout:2000,created:Date.now(),error:function(d,e,c){this.retryCount++;if(this.retryCount<=this.retryLimit&&Date.now()-this.created<this.retryTimeout){console.log("Retrying");$.ajax(this);return}},success:a})}function drawGamesGraphs(a){totalDonationsGraph(a);donationsPerMinuteGraph(a)}function donationsPerMinuteGraph(f){var a=[];var e=[];for(var c in f.games){a.push(f.games[c].title);e.push(parseInt(c))}var g=e.map(function(n,h){var m=e[h+1]?e[h+1]:1468137180000;var o=0;var j=Infinity;for(var l in f.data){if(l>=n&&l<m){if(f.data[l].m>o){o=f.data[l].m}if(f.data[l].m<j){j=f.data[l].m}}}var k=(m-n)/(1000*60);return Math.max(0,(o-j)/k)});var b=e.map(function(i,h){return[i,g[h],a[h]]});b=b.sort(function(i,h){return h[1]-i[1]});g=b.map(function(h){return h[1]});e=b.map(function(h){return h[0]});a=b.map(function(h){return h[2]});g.unshift("Average Donations Per Minute During Game");var d=c3.generate({bindto:"#donationsPerMinuteGraph",data:{columns:[g],type:"bar",},axis:{x:{type:"category",categories:a,show:false},y:{tick:{format:d3.format("$,")}}},bar:{width:{ratio:1}},tooltip:{format:{value:function(i,h,k){var j=d3.format("$,.2f");return j(i)+" per minute"}}},})}function totalDonationsGraph(f){var a=[];var e=[];for(var c in f.games){a.push(f.games[c].title);e.push(parseInt(c))}var g=e.map(function(m,h){var l=e[h+1]?e[h+1]:1468137180000;var n=0;var j=Infinity;for(var k in f.data){if(k>=m&&k<l){if(f.data[k].m>n){n=f.data[k].m}if(f.data[k].m<j){j=f.data[k].m}}}return Math.max(0,n-j)});var b=e.map(function(i,h){return[i,g[h],a[h]]});b=b.sort(function(i,h){return h[1]-i[1]});g=b.map(function(h){return h[1]});e=b.map(function(h){return h[0]});a=b.map(function(h){return h[2]});g.unshift("Donation Total During Game");var d=c3.generate({bindto:"#totalDonationsGraph",data:{columns:[g],type:"bar",},axis:{x:{type:"category",categories:a,show:false},y:{tick:{format:d3.format("$,")}}},bar:{width:{ratio:1}},tooltip:{format:{value:function(i,h,k){var j=d3.format("$,.2f");return j(i)}}},})};