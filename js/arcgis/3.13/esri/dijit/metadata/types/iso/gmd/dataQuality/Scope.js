// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmd/dataQuality/templates/Scope.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n\t\tdata-dojo-props\x3d"target:\'gmd:scope\',minOccurs:0,showHeader:false"\x3e\r\n\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n\t\t\tdata-dojo-props\x3d"target:\'gmd:DQ_Scope\',minOccurs:0"\x3e\r\n\t\t\t\r\n\t\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListReference"\r\n\t\t\t\tdata-dojo-props\x3d"target:\'gmd:level\',\r\n\t\t\t\t\tlabel:\'${i18nIso.DQ_Scope.level}\'"\x3e\r\n\t\t\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/maintenance/MD_ScopeCode"\x3e\x3c/div\x3e\r\n\t\t\t\x3c/div\x3e\r\n\t\t\t\r\n\t\t\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\t\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmd/dataQuality/Scope","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/iso/AbstractObject ../../../../form/iso/CodeListReference ../../../../form/iso/ObjectReference ../maintenance/MD_ScopeCode dojo/text!./templates/Scope.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmd.dataQuality.Scope",a,f);return a});