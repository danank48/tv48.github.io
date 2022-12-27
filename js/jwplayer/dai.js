!function(){"use strict";var t="dai",e="-1",i="adBreakEnd",a="adError",s="time",r="meta",n="jw-flag-ads jw-flag-ads-dai",o="playing";function l(){return l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},l.apply(this,arguments)}var d={adTagParameters:{},apiKey:"",assetKey:"",cmsID:"",locale:"",debug:!1,liveAdMessage:"Playing Ad",requestTimeout:3e3,videoID:""},h=function(){function t(t,e){for(var i in d)if(d.hasOwnProperty(i)){var a=t[i],s=d[i],r=typeof s;if(void 0!==a){if("boolean"!==r&&"number"!==r||(a=_(a)),typeof a!==r)throw new Error("invalid parameter: "+i+" should be a "+r);this[i]=a}else this[i]=s}this.setLocalizationOptions(e)}return t.prototype.setLocalizationOptions=function(t){var e=t.loadingAd,i=t.admessage,a=t.podmessage,s=t.cuetext;this.loadingMessage=e,this.admessage=i,this.adcounterdynamic=a,this.cuetext=s},t}();function _(t){if("true"===t)return!0;if("false"===t)return!1;var e=parseFloat(t);return isNaN(e)?t:e}var u=null;function c(t){if(u)return u;if(window.google&&google.ima&&google.ima.dai)return u=Promise.resolve();var e=["//","imasdk.googleapis.com/js/sdkloader/ima3_dai.js"];"file:"===document.location.protocol&&e.unshift("https:");var i=new(0,t.scriptloader)(e.join(""));return u=i.load().then((function(){}))}var m={},p={};var g=function(t,e,i){var a=p[e];return a||(p[e]=function(t,e){return m[e]||(m[e]=new Promise((function(i,a){var s=new t.key(e);if("unlimited"===s.edition())return a();var r=["//","entitlements.jwplayer.com","/",s.token(),".json"];"file:"===window.location.protocol&&r.unshift("https:"),t.ajax(r.join(""),(function(t){var e=t&&t.response;e?i(e):a()}),(function(){a()}),{timeout:1e4,responseType:"json"})})))}(t,e).catch((function(){return{}})).then((function(t){var e,a;if(!0===i.outstream?(e=!1!==t.canPlayOutstreamAds,a="Outstream Ad Limit Reached"):(e=!1!==t.canPlayAds,a="Ad Limit Reached"),!1===e)throw new Error(a);return{message:"Can Play Ads"}})))},f=function(){function e(t){this.player_=t,this.adBreakIds_={},this.adIds_={},this.currentAd_=null}var i=e.prototype;return i.getAdBreakId_=function(t){return y("b"+(v(t)||t.getAdId()),this.adBreakIds_)},i.getAdPlayId_=function(t){return y("b"+v(t)+"a"+t.getAdId(),this.adIds_)},i.adEventObject=function(e){var i=e||this.currentAd_,a={client:t,viewable:this.player_.getViewable()};if(!i)return a;this.currentAd_=i,a.id=this.getAdBreakId_(i),a.adPlayId=this.getAdPlayId_(i),a.adtitle=i.getTitle(),a.adsystem=i.getAdSystem(),a.creativetype="application/x-mpegURL",a.linear="linear";var s=i.getAdPodInfo();if(s){var r=s.getTotalAds();r>1&&(a.sequence=s.getAdPosition(),a.podcount=r),a.adposition=function(t){var e=t.getTimeOffset();if(0===e)return"pre";if(-1===e)return"post";return"mid"}(s)}return a},i.clearAd=function(){this.currentAd_=null},e}();function y(t,i){if(t){var a=i[t];return a||(i[t]=(s=12,a=new Array(s+1).join((Math.random().toString(36)+"00000000000000000").slice(2,18)).slice(0,s))),a}var s;return e}function v(t){var e=t.getAdPodInfo();return e?(""+e.getTimeOffset()).replace(/[-.]/g,"N"):null}var A=function(){function t(t,e,i,a){var s=this;this.item_=t,this.options_=e,this.player_=i,this.daiUtils_=new f(i),this.adCues_=[],this.utils_=i.utils,this.playerContainer_=i.getContainer(),this.playerPositionBeforeMidroll_=null,this.instream_=null,this.timeoutAdStart_=-1,this.isVOD_=e.cmsID&&e.videoID,this.liveMode_=!this.isVOD_&&e.assetKey,this.video_=null,this.streamManager_=null,this.streamManagerEvents_=null,this.streamEventHandler_=function(t){s.onStreamEvent_(t)},this.adUiElement_=a,this.utils_.addClass(a,"jw-plugin-dai")}var d=t.prototype;return d.beforePlay=function(){var t=this;this.instream_||this.destroyed_()||(clearTimeout(this.timeoutAdStart_),this.timeoutAdStart_=setTimeout((function(){t.destroyed_()||t.destroy()}),this.options_.requestTimeout),this.video_=this.player_.getConfig().mediaElement,this.instream_=this.player_.createInstream().init().setText(this.options_.loadingMessage),this.init_().catch((function(){t.stopBlocking_()})))},d.pause=function(){this.video_&&this.video_.pause()},d.resume=function(){this.video_&&this.video_.play()},d.stopBlocking_=function(){this.destroyed_()||(clearTimeout(this.timeoutAdStart_),this.destroyBlockingInstreamPlayer_())},d.init_=function(){var t=this;return c().then((function(){if(t.destroyed_())return null;var e,i=google.ima.dai.api.StreamEvent.Type,a=new google.ima.dai.api.UiSettings;if(a.setLocale(t.options_.locale||t.player_.getConfig().language),t.streamManager_=new google.ima.dai.api.StreamManager(t.video_,t.adUiElement_,a),t.streamManagerEvents_=[i.CUEPOINTS_CHANGED,i.LOADED,i.AD_BREAK_STARTED,i.AD_BREAK_ENDED,i.STARTED,i.AD_PROGRESS,i.CLICK,i.COMPLETE,i.ERROR],t.streamManager_.addEventListener(t.streamManagerEvents_,t.streamEventHandler_,!1),t.isVOD_)(e=new google.ima.dai.api.VODStreamRequest).contentSourceId=t.options_.cmsID,e.videoId=t.options_.videoID;else{if(!t.liveMode_)throw new Error("Invalid options");(e=new google.ima.dai.api.LiveStreamRequest).assetKey=t.options_.assetKey,t.player_.off(r,t.handleMeta_,t),t.player_.on(r,t.handleMeta_,t)}e.apiKey=t.options_.apiKey,e.adTagParameters=t.options_.adTagParameters,t.streamManager_.requestStream(e)}))},d.loadStream_=function(t){var e=this.player_.getPlaylistItem(this.player_.getPlaylistIndex()),i=t.url;e.sources=[l(e.sources[0],{file:i})],this.instream_&&(this.instream_.replacePlaylistItem(e),this.stopBlocking_())},d.onStreamEvent_=function(t){var r=this,n=google.ima.dai.api.StreamEvent.Type,d=this.daiUtils_.adEventObject(t.getAd());switch(t.type){case n.CUEPOINTS_CHANGED:var h=this.adCues_=t.getStreamData().cuepoints;if(h&&h.length){var _=h.filter((function(t){return t.start>0})).map((function(t){return{begin:t.start,text:r.options_.cuetext}}));this.player_.setCues(_),this.player_.on(s,this.checkMidrolls_,this)}break;case n.LOADED:clearTimeout(this.timeoutAdStart_),this.loadStream_(t.getStreamData());break;case n.AD_BREAK_STARTED:this.player_.getState()!==o&&this.player_.play(),this.player_.trigger("adBreakStart",d),this.setAdsMode_(!0),this.instream_.once("destroyed",(function(){r.instream_=null,r.player_.trigger(i,d),r.daiUtils_.clearAd()}));break;case n.AD_BREAK_ENDED:this.instream_.off().once("destroyed",(function(){r.instream_=null,r.player_.trigger(i,d),r.daiUtils_.clearAd()})),this.setAdsMode_(!1);break;case n.STARTED:this.player_.trigger("adImpression",d);var u=this.daiUtils_.adEventObject(null);u.newstate=o,this.instream_.setState(u);break;case n.AD_PROGRESS:if(!this.instream_)return;this.handleTime_(t.getStreamData().adProgressData,d);break;case n.CLICK:this.player_.trigger("adClick",d),this.player_.pause();break;case n.COMPLETE:this.player_.trigger("adComplete",d),this.daiUtils_.clearAd();break;case n.ERROR:var c=t.getStreamData().errorMessage,m=l({id:e,message:"Ad Error: "+c},d);this.player_.trigger(a,m),this.daiUtils_.clearAd()}},d.checkMidrolls_=function(t){if(this.adCues_.length){for(var e=t.position,i=-1,a=0;a<this.adCues_.length&&!(this.adCues_[a].start>e);a++)i=a;i>-1&&!this.adCues_[i].played&&e!==this.adCues_[i].start&&(this.playerPositionBeforeMidroll_=e,this.player_.seek(this.adCues_[i].start))}},d.handleMeta_=function(t){var e=t.metadata;this.streamManager_&&e&&this.streamManager_.onTimedMetadata(e)},d.setAdsMode_=function(t){var e=this;this.player_.off(s,this.checkMidrolls_,this),t?(this.utils_.addClass(this.playerContainer_,n),this.instream_||(this.instream_=this.player_.createInstream()),this.instream_.enableAdsMode(),this.liveMode_&&this.instream_.setText(this.options_.liveAdMessage),this.instream_.off(null,null,this).on("state",(function(t){e.instream_.setState(t)}),this),this.liveMode_&&(this.instream_.on(r,this.handleMeta_,this),this.handleMeta_({metadata:this.player_.getItemMeta()}))):(this.utils_.removeClass(this.playerContainer_,n),this.isVOD_&&this.player_.on(s,this.checkMidrolls_,this),this.destroyBlockingInstreamPlayer_(),this.playerPositionBeforeMidroll_&&(this.video_.currentTime=this.playerPositionBeforeMidroll_,this.playerPositionBeforeMidroll_=null))},d.handleTime_=function(t,e){var i=t.currentTime,a=t.duration;if(e.position=i,e.duration=a,this.instream_.setTime(e),this.isVOD_){var s=t.adPosition,r=t.totalAds,n=this.options_.admessage||"",o=this.options_.adcounterdynamic||"";n=n.replace(/xx/gi,""+Math.ceil(a-i)),r>1&&(n=(o=(o=o.replace(/__AD_POD_CURRENT__/g,""+s)).replace(/__AD_POD_LENGTH__/g,""+r))+" "+n),this.instream_.setText(n)}},d.destroyBlockingInstreamPlayer_=function(){this.instream_&&(this.instream_.destroy(),this.instream_=null)},d.destroy=function(){clearTimeout(this.timeoutAdStart_),this.destroyed_()||(this.player_.off(null,null,this),this.streamManager_&&(this.streamManager_.removeEventListener(this.streamManagerEvents_,this.streamEventHandler_,!1),this.streamManager_.reset()),this.stopBlocking_(),this.options_=null,this.video_=null,this.player_=null,this.item_=null,this.streamManager_=null)},d.destroyed_=function(){return!this.item_},t}();!function(t){if(t&&"undefined"!=typeof window){var e=document.createElement("style");e.setAttribute("media","screen"),e.innerHTML=t,document.head.appendChild(e)}}(".jw-plugin-dai{top:0;left:0;bottom:0}.jwplayer.jw-flag-ads-dai .jw-plugin-dai{width:100%;height:100%}.jwplayer.jw-flag-ads-dai .jw-controlbar{background:0 0!important;pointer-events:none}.jwplayer.jw-flag-ads-dai .jw-controlbar .jw-icon{pointer-events:all}.jwplayer.jw-flag-ads-dai .jw-controlbar .jw-icon-fullscreen:not(.jw-fullscreen-ima){display:none}.jwplayer.jw-flag-ads-dai .jw-controlbar .jw-fullscreen-ima{display:flex}"),(window.jwplayerPluginJsonp||window.jwplayer().registerPlugin)(t,"8.0",(function(i,s,r){var n,o=i.utils,d=i.getConfig(),_=new h(s||{},d.localization.advertising);c(o).catch(o.noop);var u=d.key;function m(){n&&(n.destroy(),n=null)}this.version="0.5.4",l(this,i.Events),i.pauseAd=function(t){t="boolean"!=typeof t||t,n&&(t?n.pause():n.resume())},i.on("ready",(function(){d.localization=i.getConfig().localization,_.setLocalizationOptions(d.localization.advertising),c(o).catch((function(){i.getAdBlock()&&f("Ad playback blocked by an ad blocker",2e4)})),p.catch((function(t){f("Ad Error: "+t.message,60002)}))}),this).on("playlistItem",(function(t){m();var e=t.item,a=l({},_,e.daiSetting);(a.cmsID&&a.videoID||a.assetKey)&&(e.preload="none",n=new A(e,a,i,r),i.once("beforePlay",n.beforePlay,n))}),this).on("destroyPlugin",m,this);var p=g(o,u,s);function f(s,r){m(),i.off(null,null,this),i.trigger(a,{id:e,client:t,message:s,code:900,adErrorCode:r,tag:""})}p.catch(o.noop),this.destroy=m}))}();