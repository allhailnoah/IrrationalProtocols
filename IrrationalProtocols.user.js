// ==UserScript==
// @name           Irrational Protocols
// @version        1.0
// @author         SnoringFrog and Michcioperz
// @description    Replaces "xkcd://###" with a link to xkcd comic ###. Also, some other stuff.
// @include        */*
// @updateURL      https://github.com/allhailnoah/IrrationalProtocols/raw/master/IrrationalProtocols.user.js
// ==/UserScript==

(function() {
    var xkcdLink_pre = '<a class="url-ext" rel="url" target="_blank" href="http://xkcd.com/';
    var steamStoreLink_pre = '<a class="url-ext" rel="url" target="_blank" href="http://store.steampowered.com/app/';
    var steamCommunityLink_pre = '<a class="url-ext" rel="url" target="_blank" href="http://steamcommunity.com/id/';

  function process(parent) {
        var list = parent.querySelectorAll('.js-tweet-text');
        for(var i = list.length; i--;) {
            if(list[i].innerHTML.indexOf("xkcd://") != -1){
                list[i].innerHTML = list[i].innerHTML.replace(/(xkcd:\/\/([0-9]+))/g,xkcdLink_pre + '$2">$1</a>');
            }
            if(list[i].innerHTML.indexOf("steamapp://") != -1){
                list[i].innerHTML = list[i].innerHTML.replace(/(steamapp:\/\/([0-9]+))/g,steamStoreLink_pre + '$2">$1</a>');
            }
            if(list[i].innerHTML.indexOf("steamuser://") != -1){
                list[i].innerHTML = list[i].innerHTML.replace(/(steamuser:\/\/(\w+))/g,steamCommunityLink_pre + '$2">$1</a>');
            }
		}
	}

	function onMutations(muts) {        
		for(var i = muts.length, m; i-- && (m = muts[i]);) {
			for(var j = m.addedNodes.length, node; j-- && (node = m.addedNodes[j]);) {
				if(node.nodeType == 1) {
					process(node);
				}
			}
		}
	}
    
	process(document.body);
	var M = window.MutationObserver || window.WebKitMutationObserver;
	new M(onMutations).observe(document.body, {childList:true, subtree:true});

})();
