// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/WMSLayerInfo":function(){define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","../kernel"],function(n,f,l,p,e){n=n(null,{declaredClass:"esri.layers.WMSLayerInfo",name:null,title:null,description:null,extent:null,legendURL:null,subLayers:[],allExtents:[],spatialReferences:[],constructor:function(d){d&&(this.name=d.name,this.title=d.title,this.description=d.description,this.extent=d.extent,this.legendURL=d.legendURL,this.subLayers=d.subLayers?d.subLayers:
[],this.allExtents=d.allExtents?d.allExtents:[],this.spatialReferences=d.spatialReferences?d.spatialReferences:[])},clone:function(){var d={name:this.name,title:this.title,description:this.description,legendURL:this.legendURL},e;this.extent&&(d.extent=this.extent.getExtent());d.subLayers=[];l.forEach(this.subLayers,function(e){d.subLayers.push(e.clone())});d.allExtents=[];for(e in this.allExtents)e=parseInt(e,10),isNaN(e)||(d.allExtents[e]=this.allExtents[e].getExtent());d.spatialReferences=[];l.forEach(this.spatialReferences,
function(e){d.spatialReferences.push(e)});return d}});p("extend-esri")&&f.setObject("layers.WMSLayerInfo",n,e);return n})},"*noref":1}});
define("esri/layers/WMSLayer","require dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../request ../urlUtils ../SpatialReference ../geometry/Extent ./DynamicMapServiceLayer ./WMSLayerInfo dojo/query".split(" "),function(n,f,l,p,e,d,v,w,q,r,m,x,y){l=l([x],{declaredClass:"esri.layers.WMSLayer",_CRS_TO_EPSG:{84:4326,83:4269,27:4267},_REVERSED_LAT_LONG_RANGES:[[4001,4999],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,
2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3416,3416],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,
31259],[31275,31279],[31281,31290],[31466,31700]],_WEB_MERCATOR:[102100,3857,102113,900913],_WORLD_MERCATOR:[3395,54004],allExtents:[],version:null,constructor:function(a,b){var c=q.urlToObject(a);if(c.query&&(c.query.version||c.query.Version||c.query.VERSION))this.version=c.query.version||c.query.Version||c.query.VERSION;this.url=a=this._stripParameters(a,"version service request bbox format height width layers srs crs styles transparent bgcolor exceptions time elevation sld wfs".split(" "));this._url=
q.urlToObject(a);this._getCapabilitiesURL=a;this._initLayer=p.hitch(this,this._initLayer);this._parseCapabilities=p.hitch(this,this._parseCapabilities);this._getCapabilitiesError=p.hitch(this,this._getCapabilitiesError);b?(this.imageFormat=this._getImageFormat(b.format),this.imageTransparency=!1!==b.transparent,this.visibleLayers=b.visibleLayers?b.visibleLayers:[],this.version=b.version||this.version,b.resourceInfo?this._readResourceInfo(b.resourceInfo):this._getCapabilities()):(this.imageFormat=
"image/png",this.imageTransparency=!0,this.visibleLayers=[],this._getCapabilities());this._blankImageURL=n.toUrl("../images/pixel.png")},setVisibleLayers:function(a){this.visibleLayers=(a=this._checkVisibleLayersList(a))?a:[];this.refresh(!0)},setImageFormat:function(a){this.imageFormat=this._getImageFormat(a);this.refresh(!0)},setImageTransparency:function(a){this.imageTransparency=a;this.refresh(!0)},getImageUrl:function(a,b,c,g){if(!this.visibleLayers||0===this.visibleLayers.length)g(this._blankImageURL);
else{var k=a.spatialReference.wkid;-1===e.indexOf(this.spatialReferences,k)&&a.spatialReference.latestWkid&&(k=a.spatialReference.latestWkid);if(e.some(this._WEB_MERCATOR,function(a){return a==k})){var d=e.filter(this.spatialReferences,function(a){return e.some(this._WEB_MERCATOR,function(b){return b==a})},this);0===d.length&&(d=e.filter(this.spatialReferences,function(a){return e.some(this._WORLD_MERCATOR,function(b){return b==a})},this));k=0<d.length?d[0]:this._WEB_MERCATOR[0]}this.spatialReferences=
e.filter(this.spatialReferences,function(a){return a!==k});this.spatialReferences.unshift(k);var d=a.xmin,h=a.xmax,t=a.ymin,u=a.ymax;a={SERVICE:"WMS",REQUEST:"GetMap"};a.FORMAT=this.imageFormat;a.TRANSPARENT=this.imageTransparency?"TRUE":"FALSE";a.STYLES="";a.VERSION=this.version;a.LAYERS=this.visibleLayers?this.visibleLayers.toString():null;a.WIDTH=b;a.HEIGHT=c;this.maxWidth<b&&(a.WIDTH=this.maxWidth);this.maxHeight<c&&(a.HEIGHT=this.maxHeight);b=k?k:NaN;isNaN(b)||("1.3.0"==this.version?a.CRS="EPSG:"+
b:a.SRS="EPSG:"+b);"1.3.0"==this.version&&this._useLatLong(b)?a.BBOX=t+","+d+","+u+","+h:a.BBOX=d+","+t+","+h+","+u;b=this.getMapURL;var f;b+=-1==b.indexOf("?")?"?":"";for(f in a)a.hasOwnProperty(f)&&(b+="?"==b.substring(b.length-1,b.length)?"":"\x26",b+=f+"\x3d"+a[f]);g(q.addProxy(b))}},_initLayer:function(a,b){this.spatialReference=new r(this.extent.spatialReference);this.initialExtent=new m(this.extent);this.fullExtent=new m(this.extent);this.visibleLayers=this._checkVisibleLayersList(this.visibleLayers);
this.loaded=!0;this.onLoad(this);var c=this._loadCallback;c&&(delete this._loadCallback,c(this))},_readResourceInfo:function(a){a.extent?a.layerInfos?(this.extent=a.extent,this.allExtents[0]=a.extent,this.layerInfos=a.layerInfos,this.description=a.description?a.description:"",this.copyright=a.copyright?a.copyright:"",this.title=a.title?a.title:"",this.getMapURL=a.getMapURL?a.getMapURL:this._getCapabilitiesURL,this.version=a.version?a.version:"1.3.0",this.maxWidth=a.maxWidth?a.maxWidth:5E3,this.maxHeight=
a.maxHeight?a.maxHeight:5E3,this.spatialReferences=a.spatialReferences?a.spatialReferences:[],this.imageFormat=this._getImageFormat(a.format),this.setScaleRange(a.minScale,a.maxScale),this._initLayer()):this._errorHandler(Error("esri.layers.WMSLayer: unable to find the 'layerInfos' property in resourceInfo")):this._errorHandler(Error("esri.layers.WMSLayer: Unable to find the 'extent' property in resourceInfo."))},_getCapabilities:function(){var a=this._url.query?this._url.query:{};a.SERVICE="WMS";
a.REQUEST="GetCapabilities";this.version&&(a.VERSION=this.version);var b=this._url.path+"?",c;for(c in a)a.hasOwnProperty(c)&&(b+="?"==b.substring(b.length-1,b.length)?"":"\x26",b+=c+"\x3d"+a[c]);w({url:b,handleAs:"xml",headers:{"Content-Type":null},load:this._parseCapabilities,error:this._getCapabilitiesError},{usePost:!1})},_parseCapabilities:function(a){if(a){this.version=this._getAttributeValue("WMS_Capabilities","version",a,null);this.version||(this.version=this._getAttributeValue("WMT_MS_Capabilities",
"version",a,"1.3.0"));var b=this._getTag("Service",a);this.title=this._getTagValue("Title",b,"");this.title||(this.title=this._getTagValue("Name",b,""));this.copyright=this._getTagValue("AccessConstraints",b,"");this.description=this._getTagValue("Abstract",b,"");this.maxWidth=parseInt(this._getTagValue("MaxWidth",b,5E3),10);this.maxHeight=parseInt(this._getTagValue("MaxHeight",b,5E3),10);if(b=this._getTag("Layer",a)){var c=this._getLayerInfo(b),g=0,d=null,b=this._getTag("Capability",a);e.forEach(b.childNodes,
function(a){"Layer"==a.nodeName&&(0===g?d=a:(1===g&&c.name&&(c.name="",c.subLayers=[],c.subLayers.push(this._getLayerInfo(d))),c.subLayers.push(this._getLayerInfo(a))),g++)},this);if(c){this.layerInfos=c.subLayers;if(!this.layerInfos||0===this.layerInfos.length)this.layerInfos=[c];this.extent=c.extent;this.extent||(c.extent=new m(this.layerInfos[0].extent.toJson()),this.extent=c.extent);this.allExtents=c.allExtents;if(!this.allExtents||!this.allExtents.length)c.allExtents=[],e.forEach(this.layerInfos[0].allExtents,
function(a,b){a&&(c.allExtents[b]=new m(a.toJson()))}),this.allExtents=c.allExtents;this.spatialReferences=c.spatialReferences;if(!this.spatialReferences.length&&0<this.layerInfos.length)for(b=0;b<this.layerInfos.length;b++){var s=this.layerInfos[b];this.spatialReferences=this.layerInfos[0].spatialReferences;if(this.spatialReferences.length)break;if(s.subLayers&&0<s.subLayers.length){var h;for(h=0;h<s.subLayers.length&&!(this.spatialReferences=s.subLayers[h].spatialReferences,this.spatialReferences.length);h++);
}if(this.spatialReferences.length)break}}this.getMapURL=this._getCapabilitiesURL;if((b=f.query("DCPType",this._getTag("GetMap",a)))&&0<b.length)if((b=f.query("HTTP",b[0]))&&0<b.length)if((b=f.query("Get",b[0]))&&0<b.length)if(b=this._getAttributeValue("OnlineResource","xlink:href",b[0],null))b.indexOf("\x26")==b.length-1&&(b=b.substring(0,b.length-1)),this.getMapURL=b;this.getMapFormats=[];0===f.query("Operation",a).length?e.forEach(f.query("Format",this._getTag("GetMap",a)),function(a){this.getMapFormats.push(a.text?
a.text:a.textContent)},this):e.forEach(f.query("Operation",a),function(a){"GetMap"==a.getAttribute("name")&&e.forEach(f.query("Format",a),function(a){this.getMapFormats.push(a.text?a.text:a.textContent)},this)},this);e.some(this.getMapFormats,function(a){return-1<a.indexOf(this.imageFormat)},this)||(this.imageFormat=this.getMapFormats[0]);this._initLayer()}else this._errorHandler(Error("esri.layers.WMSLayer: Response does not contain any layers."))}else this._errorHandler(Error("GetCapabilities request for "+
this._getCapabilitiesURL+" failed. (Response is null.)"))},_getCapabilitiesError:function(a){a&&a.message&&(a.message="GetCapabilities request for "+this._getCapabilitiesURL+" failed. ("+a.message+")");this._errorHandler(a)},_getLayerInfo:function(a){if(!a)return null;var b=new y;b.name="";b.title="";b.description="";b.allExtents=[];b.spatialReferences=[];b.subLayers=[];var c=this._getTag("LatLonBoundingBox",a);c&&(b.allExtents[0]=this._getExtent(c,4326));var g=this._getTag("EX_GeographicBoundingBox",
a),d;g&&(d=new m(0,0,0,0,new r({wkid:4326})),d.xmin=parseFloat(this._getTagValue("westBoundLongitude",g,0)),d.ymin=parseFloat(this._getTagValue("southBoundLatitude",g,0)),d.xmax=parseFloat(this._getTagValue("eastBoundLongitude",g,0)),d.ymax=parseFloat(this._getTagValue("northBoundLatitude",g,0)),b.allExtents[0]=d);!c&&!g&&(d=new m(-180,-90,180,90,new r({wkid:4326})),b.allExtents[0]=d);b.extent=b.allExtents[0];var f=-1<e.indexOf(["1.0.0","1.1.0","1.1.1"],this.version)?"SRS":"CRS";e.forEach(a.childNodes,
function(a){if("Name"==a.nodeName)b.name=(a.text?a.text:a.textContent)||"";else if("Title"==a.nodeName)b.title=(a.text?a.text:a.textContent)||"";else if("Abstract"==a.nodeName)b.description=(a.text?a.text:a.textContent)||"";else if("BoundingBox"==a.nodeName){var c=a.getAttribute(f);c&&0===c.indexOf("EPSG:")?(c=parseInt(c.substring(5),10),0!==c&&!isNaN(c)&&(a="1.3.0"==this.version?this._getExtent(a,c,this._useLatLong(c)):this._getExtent(a,c),b.allExtents[c]=a,b.extent||(b.extent=a))):c&&0===c.indexOf("CRS:")?
(c=parseInt(c.substring(4),10),0!==c&&!isNaN(c)&&(this._CRS_TO_EPSG[c]&&(c=this._CRS_TO_EPSG[c]),b.allExtents[c]=this._getExtent(a,c))):(c=parseInt(c,10),0!==c&&!isNaN(c)&&(b.allExtents[c]=this._getExtent(a,c)))}else if(a.nodeName==f)a=(a.text?a.text:a.textContent).split(" "),e.forEach(a,function(a){a=-1<a.indexOf(":")?parseInt(a.split(":")[1],10):parseInt(a,10);0!==a&&!isNaN(a)&&(this._CRS_TO_EPSG[a]&&(a=this._CRS_TO_EPSG[a]),-1==e.indexOf(b.spatialReferences,a)&&b.spatialReferences.push(a))},this);
else if("Style"==a.nodeName){if(a=this._getTag("LegendURL",a))if(a=this._getTag("OnlineResource",a))b.legendURL=a.getAttribute("xlink:href")}else"Layer"===a.nodeName&&b.subLayers.push(this._getLayerInfo(a))},this);b.title=b.title||b.name;return b},_getImageFormat:function(a){switch(a?a.toLowerCase():""){case "jpg":return"image/jpeg";case "bmp":return"image/bmp";case "gif":return"image/gif";case "svg":return"image/svg+xml";default:return"image/png"}},getImageFormat:function(){switch(this.imageFormat?
this.imageFormat.toLowerCase():""){case "image/jpeg":return"jpg";case "image/bmp":return"bmp";case "image/gif":return"gif";case "image/svg+xml":return"svg";default:return"png"}},_getExtent:function(a,b,c){var d;if(a){d=new m;var e=parseFloat(a.getAttribute("minx")),f=parseFloat(a.getAttribute("miny")),h=parseFloat(a.getAttribute("maxx"));a=parseFloat(a.getAttribute("maxy"));c?(d.xmin=isNaN(f)?-1*Number.MAX_VALUE:f,d.ymin=isNaN(e)?-1*Number.MAX_VALUE:e,d.xmax=isNaN(a)?Number.MAX_VALUE:a,d.ymax=isNaN(h)?
Number.MAX_VALUE:h):(d.xmin=isNaN(e)?-1*Number.MAX_VALUE:e,d.ymin=isNaN(f)?-1*Number.MAX_VALUE:f,d.xmax=isNaN(h)?Number.MAX_VALUE:h,d.ymax=isNaN(a)?Number.MAX_VALUE:a);d.spatialReference=new r({wkid:b})}return d},_useLatLong:function(a){var b,c;for(c=0;c<this._REVERSED_LAT_LONG_RANGES.length;c++){var d=this._REVERSED_LAT_LONG_RANGES[c];if(a>=d[0]&&a<=d[1]){b=!0;break}}return b},_getTag:function(a,b){var c=f.query(a,b);return c&&0<c.length?c[0]:null},_getTagValue:function(a,b,c){return(a=f.query(a,
b))&&0<a.length?a[0].text?a[0].text:a[0].textContent:c},_getAttributeValue:function(a,b,c,d){return(a=f.query(a,c))&&0<a.length?a[0].getAttribute(b):d},_checkVisibleLayersList:function(a){if(a&&(0<a.length&&this.layerInfos&&0<this.layerInfos.length)&&"number"==typeof a[0]){var b=[];e.forEach(a,function(a){a<this.layerInfos.length&&b.push(this.layerInfos[a].name)},this);a=b}return a},_stripParameters:function(a,b){var c=q.urlToObject(a),d,f=[];for(d in c.query)c.query.hasOwnProperty(d)&&-1===e.indexOf(b,
d.toLowerCase())&&f.push(d+"\x3d"+c.query[d]);return c.path+(f.length?"?"+f.join("\x26"):"")}});d("extend-esri")&&p.setObject("layers.WMSLayer",l,v);return l});