//>>built
define("dojox/analytics/plugins/dojo",["dojo/_base/lang","../_base","dojo/_base/config","dojo/ready"],function(a,d,c,e){return a.getObject("dojox.analytics.plugins",!0).dojo=new function(){this.addData=a.hitch(d,"addData","dojo");e(a.hitch(this,function(){var a={},b;for(b in dojo)if("version"==b||!("object"==typeof dojo[b]||"function"==typeof dojo[b])&&"_"!=b[0])a[b]=dojo[b];c&&(a.djConfig=c);this.addData(a)}))}});