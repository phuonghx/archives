// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/inspire/base/templates/ServiceRoot.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n\t\tdata-dojo-props\x3d"target:\'gmd:MD_Metadata\',label:\'${i18nInspire.documentTypes.service.caption}\'"\x3e\r\n\t\t\r\n\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n\t\t\t\r\n\t\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/gmd/metadataEntity/MetadataSection"\r\n\t\t\t\tdata-dojo-props\x3d"label:\'${i18nIso.sections.metadata}\'"\x3e\x3c/div\x3e\r\n\t\t\t\t\r\n\t\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/srv/ServiceIdentification"\r\n\t\t\t\tdata-dojo-props\x3d"label:\'${i18nIso.sections.identification}\'"\x3e\x3c/div\x3e\r\n\t\t\t\t\r\n\t\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/distribution/Distribution"\r\n\t\t\t\tdata-dojo-props\x3d"label:\'${i18nIso.sections.distribution}\'"\x3e\x3c/div\x3e\r\n\t\t\t\t\r\n\t\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/dataQuality/Quality"\r\n\t\t\t\tdata-dojo-props\x3d"label:\'${i18nIso.sections.quality}\'"\x3e\x3c/div\x3e\r\n\t\t\t\r\n\t\t\x3c/div\x3e\r\n\r\n\t\x3c/div\x3e\r\n\t\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/inspire/base/ServiceRoot","dojo/_base/declare dojo/_base/lang dojo/has ../../../base/Descriptor ../../../form/Element ../../../form/Tabs ../../iso/gmd/dataQuality/Quality ../../iso/gmd/distribution/Distribution ../gmd/metadataEntity/MetadataSection ../srv/ServiceIdentification dojo/text!./templates/ServiceRoot.html ../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,m,n,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.inspire.base.ServiceRoot",
a,f);return a});