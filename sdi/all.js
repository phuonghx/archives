// var ms_base_url 	= "http://118.70.72.13:1168/arcgis/rest/services/";
// var ms_base_folder 	= "SDI_TayBac/";

var ms_base_url = "http://10.101.3.205:6080/arcgis/rest/services/";
var ms_base_folder = "CSDL_TayBac/";

dojo.require("dijit.registry");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.TitlePane");
dojo.require("dijit.Dialog");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.Select");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.Textarea");
dojo.require("dojox.validate.us");
dojo.require("dojox.validate.web");
dojo.require("dijit.Toolbar");
dojo.require("dijit.Tooltip");
dojo.require("esri.map");
dojo.require("esri.toolbars.navigation");
dojo.require("esri.InfoTemplate");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.Print");
dojo.require("esri.dijit.Measurement");
dojo.require("cbtree/Tree");
dojo.require("cbtree/extensions/TreeStyling");
dojo.require("cbtree/store/ObjectStore");
dojo.require("cbtree/store/Hierarchy");
dojo.require("cbtree/model/ForestStoreModel");
dojo.require("cbtree/model/TreeStoreModel");
dojo.require("esri.tasks.IdentifyTask");
dojo.require("esri.tasks.IdentifyParameters");
dojo.require("esri.tasks.FindTask");
dojo.require("esri.tasks.FindParameters");
dojo.require("esri.tasks.query");
dojo.require("esri.tasks.QueryTask");
dojo.require("esri.tasks.StatisticDefinition");
dojo.require("esri.tasks.LegendLayer");
dojo.require("esri.toolbars.draw");
dojo.require("esri.layers.graphics");
dojo.require("esri.graphic");
dojo.require("esri.renderers.SimpleRenderer");
dojo.require("esri.symbols.SimpleFillSymbol");
dojo.require("esri.symbols.SimpleLineSymbol");
dojo.require("esri.symbols.SimpleMarkerSymbol");
dojo.require("esri.dijit.Popup");
dojo.require("dojo.store.Memory");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.ObjectStore");
dojo.require("dojo.NodeList-traverse");
dojo.require("dojo.store.Observable");
dojo.require("dgrid.Grid");
dojo.require("dgrid.OnDemandList");
dojo.require("dgrid.OnDemandGrid");
dojo.require("dgrid.Keyboard");
dojo.require("dgrid.Selection");
dojo.require("dgrid.editor");
dojo.require("dgrid.extensions.ColumnHider");
dojo.require("dgrid.extensions.ColumnResizer");
dojo.require("dgrid.extensions.ColumnReorder");
dojo.require("dgrid.extensions.Pagination");
var init_extent, init_sr, map;
var identify_map, identify_task, identify_params;
var navigation, legend, scalebar, printer, overviewmap, measurement;
var mcs_layer, mcs_layers_store, mcs_draw_toolbar, mcs_geom, rg_is_toggled = true;

function initMap() {
    esri.config.defaults.io.proxyUrl = "proxy/proxy.php";
    esri.config.defaults.io.alwaysUseProxy = false;
    esri.config.defaults.geometryService = new esri.tasks.GeometryService(ms_base_url + "Utilities/Geometry/GeometryServer");
    init_extent = new esri.geometry.Extent({
        "xmin": 205931.4529,
        "ymin": 2054248.0142,
        "xmax": 744684.4813,
        "ymax": 2587048.1153,
        "spatialReference": {
            "wkt": 'PROJCS\["Transverse_Mercator",GEOGCS\["GCS_Geographic Coordinate System",DATUM\["D_Vietnam_2000",SPHEROID\["WGS84",6378137.0,298.257223560493\]\],PRIMEM\["Greenwich",0.0\],UNIT\["Degree",0.0174532925199433\]\],PROJECTION\["Transverse_Mercator"\],PARAMETER\["false_easting",500000.0\],PARAMETER\["false_northing",0.0\],PARAMETER\["central_meridian",105.0\],PARAMETER\["scale_factor",0.9996\],PARAMETER\["latitude_of_origin",0.0\],UNIT\["Meter",1.0\]\]'
        }
    });
    init_sr = new esri.SpatialReference('PROJCS\["Transverse_Mercator",GEOGCS\["GCS_Geographic Coordinate System",DATUM\["D_Vietnam_2000",SPHEROID\["WGS84",6378137.0,298.257223560493\]\],PRIMEM\["Greenwich",0.0\],UNIT\["Degree",0.0174532925199433\]\],PROJECTION\["Transverse_Mercator"\],PARAMETER\["false_easting",500000.0\],PARAMETER\["false_northing",0.0\],PARAMETER\["central_meridian",105.0\],PARAMETER\["scale_factor",0.9996\],PARAMETER\["latitude_of_origin",0.0\],UNIT\["Meter",1.0\]\]');
    map = new esri.Map("tb-map", {
        extent: init_extent,
        sliderPosition: "top-left",
        nav: false,
        fadeOnZoom: true,
        showAttribution: false,
        smartNavigation: false,
        spatialReference: init_sr
    });
    dojo.connect(dijit.byId("tb-map"), "onLoad", function () {
        var _0xa293x13;
        dojo.connect(dijit.byId("tb-map"), "resize", function () {
            clearTimeout(_0xa293x13);
            _0xa293x13 = setTimeout(function () {
                map.resize();
                map.reposition()
            }, 500)
        })
    })
}

function initToolbar() {
    legend = new esri.dijit.Legend({
        map: map,
        layerInfos: [],
        style: "font-size:12px;"
    }, "legendPane");
    legend.startup();
    scalebar = new esri.dijit.Scalebar({
        map: map,
        attachTo: "bottom-center",
        scalebarUnit: "metric"
    });
    printer = new esri.dijit.Print({
        map: map,
        url: ms_base_url + "Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        templates: [{
            label: "Chỉ có bản đồ",
            format: "PDF",
            layout: "MAP_ONLY",
            exportOptions: {
                width: map.width,
                height: map.height,
                dpi: 96
            }
        }, {
            label: "Khổ A3 ngang",
            format: "PDF",
            layout: "A3 Landscape",
            layoutOptions: {
                titleText: "Hệ thống cơ sở dữ liệu liên ngành vùng Tây Bắc",
                authorText: "Đề tài KHCN-TB.01C/13-18",
                copyrightText: "Chương trình KH&CN cấp Nhà Nước phục vụ phát triển bền vững vùng Tây Bắc",
                scalebarUnit: "Kilometers"
            }
        }, {
            label: "Khổ A3 dọc",
            format: "PDF",
            layout: "A3 Portrait",
            layoutOptions: {
                titleText: "Hệ thống cơ sở dữ liệu liên ngành vùng Tây Bắc",
                authorText: "Đề tài KHCN-TB.01C/13-18",
                copyrightText: "Chương trình KH&CN cấp Nhà Nước phục vụ phát triển bền vững vùng Tây Bắc",
                scalebarUnit: "Kilometers"
            }
        }, {
            label: "Khổ A4 ngang",
            format: "PDF",
            layout: "A4 Landscape",
            layoutOptions: {
                titleText: "Hệ thống cơ sở dữ liệu liên ngành vùng Tây Bắc",
                authorText: "Đề tài KHCN-TB.01C/13-18",
                copyrightText: "Chương trình KH&CN cấp Nhà Nước phục vụ phát triển bền vững vùng Tây Bắc",
                scalebarUnit: "Kilometers"
            }
        }, {
            label: "Khổ A4 dọc",
            format: "PDF",
            layout: "A4 Portrait",
            layoutOptions: {
                titleText: "Hệ thống cơ sở dữ liệu liên ngành vùng Tây Bắc",
                authorText: "Đề tài KHCN-TB.01C/13-18",
                copyrightText: "Chương trình KH&CN cấp Nhà Nước phục vụ phát triển bền vững vùng Tây Bắc",
                scalebarUnit: "Kilometers"
            }
        }]
    }, dojo.byId("printPane"));
    printer.startup();
    measurement = new esri.dijit.Measurement({
        map: map,
        style: "width: 295px; height: 250px;"
    }, "measurePane");
    measurement.startup();
    navigation = new esri.toolbars.Navigation(map)
}

function initLayers() {
    mcs_layers_store = new dojo.store.Memory({
        data: []
    });
    // console.log('tocObj: ', tocObj)
    dojo.forEach(tocObj, function (_0xa293x16, _0xa293x17) {
        // PhuongHX
        // if (_0xa293x16.type == "layer" && _0xa293x16.parent == 'ADM' ) {
        if (_0xa293x16.type == "layer") {
            var _0xa293x18 = new esri.layers.ArcGISTiledMapServiceLayer(ms_base_url + ms_base_folder + _0xa293x16.id + "/MapServer", {
                id: _0xa293x16.id,
                visible: _0xa293x16.checked ? true : false
            });
            // console.log('Service: ', _0xa293x18);
            map.addLayer(_0xa293x18)
        };
        // PhuongHX
        // if (_0xa293x16.type == "layer" || _0xa293x16.type == "table"  && _0xa293x16.parent == 'ADM' ) {
        if (_0xa293x16.type == "layer" || _0xa293x16.type == "table") {
            mcs_layers_store.put({
                id: _0xa293x16.id,
                type: _0xa293x16.type,
                name: _0xa293x16.name
            })
        }
    })
}

function initEvents() {
    dojo.connect(navigation, "onExtentHistoryChange", function () {
        dijit.byId("btn-prev-extent").disabled = navigation.isFirstExtent();
        dijit.byId("btn-next-extent").disabled = navigation.isLastExtent()
    });
    dojo.connect(dojo.byId("btn-zoom-in"), "onclick", function () {
        navigation.activate(esri.toolbars.Navigation.ZOOM_IN)
    });
    dojo.connect(dojo.byId("btn-zoom-all"), "onclick", function () {
        map.setExtent(init_extent)
    });
    dojo.connect(dojo.byId("btn-zoom-out"), "onclick", function () {
        navigation.activate(esri.toolbars.Navigation.ZOOM_OUT)
    });
    dojo.connect(map, "onZoomEnd", function () {
        navigation.deactivate()
    });
    dojo.connect(dojo.byId("btn-prev-extent"), "onclick", function () {
        navigation.zoomToPrevExtent()
    });
    dojo.connect(dojo.byId("btn-next-extent"), "onclick", function () {
        navigation.zoomToNextExtent()
    });
    dojo.connect(dojo.byId("btn-refresh-map"), "onclick", function () {
        map.infoWindow.hide();
        map.graphics.clear();
        if (typeof mcs_layer !== "undefined") {
            mcs_layer.clear()
        };
        if (rg_is_toggled == true) {
            dijit.byId("centerPane").removeChild(dijit.byId("result-grid"));
            rg_is_toggled = false
        };
        if (dojo.byId("result-grid")) {
            dojo.empty(dojo.byId("result-grid"))
        };
        dijit.registry.byId("txt-mcs-geom").set("value", "")
    });
    dojo.connect(dojo.byId("btn-info"), "onclick", function () {
        if (layerTree.selectedItem == null) {
            window.alert("Bạn cần chọn lớp dữ liệu không gian ở mục Lớp Bản Đồ!")
        } else {
            if (layerTree.selectedItem.type == "layer") {
                if (layerTree.selectedItem.checked) {
                    activateIdentifyTask()
                } else {
                    window.alert("Bạn cần tích vào ô bên cạnh của lớp dữ liệu trước khi xem thông tin!")
                }
            } else {
                window.alert("Lớp bạn chọn không phải là dữ liệu không gian. Hãy chọn lại!")
            }
        }
    });
    dojo.connect(dojo.byId("btn-toggle-pane"), "onclick", function () {
        if (rg_is_toggled == false) {
            dijit.byId("centerPane").addChild(dijit.byId("result-grid"));
            rg_is_toggled = true
        } else {
            dijit.byId("centerPane").removeChild(dijit.byId("result-grid"));
            rg_is_toggled = false
        }
    });
    dojo.connect(dojo.byId("btn-request"), "onclick", function () {
        requestInfo.show()
    });
    dojo.query(".report-file").forEach(function (_0xa293x16) {
        dojo.connect(_0xa293x16, "onclick", function () {
            PDFObject.embed(dojo.attr(_0xa293x16, "path"), "#pdf-content");
            pdfViewer.show()
        })
    });
    dojo.connect(dojo.byId("pdf-fullscreen"), "onclick", function () {
        var _0xa293x1a = dojo.byId("pdf-content");
        dojo.style(_0xa293x1a, "width", "100%");
        dojo.style(_0xa293x1a, "height", "100%");
        var _0xa293x1b = _0xa293x1a.mozRequestFullScreen || _0xa293x1a.webkitRequestFullscreen || _0xa293x1a.requestFullscreen;
        _0xa293x1b.call(_0xa293x1a);
        var _0xa293x1c = dojo.connect(_0xa293x1a, "webkitfullscreenchange, mozfullscreenchange, fullscreenchange", function () {
            var _0xa293x1d = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            if (!_0xa293x1d) {
                dojo.style(_0xa293x1a, "width", "980px");
                dojo.style(_0xa293x1a, "height", "525px");
                dojo.disconnect(_0xa293x1c)
            }
        })
    });
    layerTree.on("checkBoxClick", function (_0xa293x16, _0xa293x1e, _0xa293x1f) {
        if (_0xa293x16.type == "layer") {
            if (_0xa293x1e.get("checked")) {
                map.getLayer(_0xa293x16.id).setVisibility(true)
            } else {
                map.getLayer(_0xa293x16.id).setVisibility(false)
            }
        } else {
            if (_0xa293x16.type == "table") {
                _0xa293x1e.set("checked", true);
                window.alert("Bạn không thể tắt lớp dữ liệu phi không gian!")
            } else {
                if (_0xa293x16.type == "sector") {
                    var _0xa293x20 = _0xa293x1e.getChildren();
                    _0xa293x20.forEach(function (_0xa293x21) {
                        if (_0xa293x21.item.type != "table") {
                            if (_0xa293x21.get("checked")) {
                                map.getLayer(_0xa293x21.item.id).setVisibility(true)
                            } else {
                                map.getLayer(_0xa293x21.item.id).setVisibility(false)
                            }
                        } else {
                            _0xa293x21.set("checked", true)
                        }
                    })
                } else {
                    if (_0xa293x16.type == "general") {
                        var _0xa293x22 = _0xa293x1e.getChildren();
                        _0xa293x22.forEach(function (_0xa293x23) {
                            var _0xa293x20 = _0xa293x23.getChildren();
                            _0xa293x20.forEach(function (_0xa293x21) {
                                if (_0xa293x21.item.type != "table") {
                                    if (_0xa293x21.get("checked")) {
                                        map.getLayer(_0xa293x21.item.id).setVisibility(true)
                                    } else {
                                        map.getLayer(_0xa293x21.item.id).setVisibility(false)
                                    }
                                } else {
                                    _0xa293x21.set("checked", true)
                                }
                            })
                        })
                    }
                }
            }
        }
    });
    layerTree.on("click", function (_0xa293x16, _0xa293x1e, _0xa293x1f) {
        if (_0xa293x16.type != "layer") {
            legend.layerInfos = []
        } else {
            legend.layerInfos = [{
                layer: map.getLayer(_0xa293x16.id),
                title: _0xa293x16.name
            }]
        };
        legend.refresh()
    });
    layerTree.on("load", function () {
        this.collapseAll();
        map.setExtent(init_extent)
    })
}

function activateIdentifyTask() {
    identify_task = new esri.tasks.IdentifyTask(ms_base_url + ms_base_folder + layerTree.selectedItem.id + "/MapServer");
    identify_params = new esri.tasks.IdentifyParameters();
    identify_params.tolerance = 3;
    identify_params.returnGeometry = true;
    identify_params.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
    identify_params.width = map.width;
    identify_params.height = map.height;
    identify_map = map.on("click", function (_0xa293x25) {
        identify_params.geometry = _0xa293x25.mapPoint;
        identify_params.mapExtent = map.extent;
        identify_params.tolerance = 5;
        var _0xa293x26 = identify_task.execute(identify_params).addCallback(function (_0xa293x27) {
            deactivateIdentifyTask();
            return dojo.map(_0xa293x27, function (_0xa293x28) {
                var _0xa293x29 = _0xa293x28.feature;
                var _0xa293x2a = _0xa293x28.layerName;
                var _0xa293x2b = "<table style='font-size:10px;'>";
                _0xa293x2b += "<tbody>";
                _0xa293x2b += "<tr><td><b>Lớp</b></td><td>" + _0xa293x2a + "</td></tr>";
                for (attr in _0xa293x29.attributes) {
                    if (attr.toLowerCase() != "shape" && attr.toLowerCase() != "objectid" && attr.toLowerCase() != "st_area\(shape\)" && attr.toLowerCase() != "st_length\(shape\)" && attr.toLowerCase() != "kinh độ" && attr.toLowerCase() != "vĩ độ" && attr.toLowerCase() != "kinh_do" && attr.toLowerCase() != "vi_do" && attr.toLowerCase().indexOf("mã") == -1 && _0xa293x29.attributes[attr].toLowerCase() != "null" && attr.toLowerCase() != "d" && attr.toLowerCase() != "p" && attr.toLowerCase() != "kinh độ" && attr.toLowerCase() != "s" && attr.toLowerCase() != "i" && attr.toLowerCase() != "r") {
                        _0xa293x2b += "<tr><td><b>" + toSentenceCase(attr.toLowerCase()) + "</b></td><td>" + _0xa293x29.attributes[attr] + "</td></tr>"
                    }
                };
                _0xa293x2b += "</tbody>";
                _0xa293x2b += "</table>";
                var _0xa293x2c = new esri.InfoTemplate("<b>Thông tin đối tượng</b>", _0xa293x2b);
                _0xa293x29.setInfoTemplate(_0xa293x2c);
                return _0xa293x29
            })
        });
        map.infoWindow.setFeatures([_0xa293x26]);
        map.infoWindow.resize(350, 200);
        map.infoWindow.show(_0xa293x25.mapPoint)
    })
}

function deactivateIdentifyTask() {
    identify_map.remove()
}

function initMCS() {
    if (rg_is_toggled == true) {
        dijit.byId("centerPane").removeChild(dijit.byId("result-grid"));
        rg_is_toggled = false
    };
    var _0xa293x2f = new dijit.form.FilteringSelect({
        labelAttr: "name",
        store: new dojo.store.Memory({
            data: mcs_layers_store.query({}, {
                sort: function (_0xa293x30, _0xa293x31) {
                    return _0xa293x30.name.localeCompare(_0xa293x31.name)
                }
            })
        }),
        style: "width:308px; margin:1px;",
        sortByLabel: false
    }, "cbx-msc-layers");

    function _0xa293x32() {
        var _0xa293x33 = mcs_layers_store.get(this.get("value"));
        if (_0xa293x33.type == "layer") {
            var _0xa293x34 = ms_base_url + ms_base_folder + this.get("value") + "/MapServer/0\?f=json"
        } else {
            var _0xa293x34 = ms_base_url + ms_base_folder + "blank/MapServer/" + this.get("value") + "\?f=json"
        };
        dojo.xhrGet({
            url: _0xa293x34,
            headers: {
                "X-Requested-With": null
            },
            handleAs: "json",
            load: function (_0xa293x35) {
                _0xa293x38.setData([]);
                dojo.forEach(_0xa293x35.fields, function (_0xa293x16, _0xa293x17) {
                    if (_0xa293x16.name.toLowerCase() != "shape" && _0xa293x16.name.toLowerCase() != "objectid" && _0xa293x16.name.toLowerCase() != "st_area\(shape\)" && _0xa293x16.name.toLowerCase() != "st_length\(shape\)" && _0xa293x16.name.toLowerCase() != "st_area" && _0xa293x16.name.toLowerCase() != "st_length" && _0xa293x16.name.toLowerCase() != "kinh_do" && _0xa293x16.name.toLowerCase() != "vi_do" && _0xa293x16.name.toLowerCase() != "d" && _0xa293x16.name.toLowerCase() != "p" && _0xa293x16.name.toLowerCase() != "s" && _0xa293x16.name.toLowerCase() != "i" && _0xa293x16.name.toLowerCase() != "r" && _0xa293x16.name.toLowerCase().indexOf("ma_") == -1) {
                        _0xa293x38.put({
                            id: _0xa293x16.name,
                            name: _0xa293x16.alias,
                            dataType: _0xa293x16.type
                        })
                    }
                });
                dojo.query('\[name="mcs-fields"\]').forEach(function (_0xa293x35) {
                    var _0xa293x36 = dijit.getEnclosingWidget(_0xa293x35);
                    _0xa293x36.setStore(_0xa293x38);
                    // PhuongHX
                    if (_0xa293x38.data && _0xa293x38.data[0]) {
                        _0xa293x36.attr("value", _0xa293x38.data[0].id)
                    }
                })
            },
            error: function (_0xa293x37) {}
        })
    }
    _0xa293x2f.on("change", _0xa293x32);
    _0xa293x2f.startup();
    _0xa293x2f.attr("value", mcs_layers_store.data[0].id);
    var _0xa293x38 = new dojo.store.Memory({
        data: []
    });
    var _0xa293x39 = new dojo.store.Memory({
        data: []
    });
    _0xa293x39.put({
        id: "and",
        name: "Và"
    });
    _0xa293x39.put({
        id: "or",
        name: "Hoặc"
    });
    var _0xa293x3a = new dojo.store.Memory({
        data: []
    });
    _0xa293x3a.put({
        name: "=",
        id: "="
    });
    _0xa293x3a.put({
        name: ">",
        id: ">"
    });
    _0xa293x3a.put({
        name: "<",
        id: "<"
    });
    _0xa293x3a.put({
        name: "Khác",
        id: "<>"
    });
    _0xa293x3a.put({
        name: "Tương Tự",
        id: "like"
    });

    function _0xa293x3b(_0xa293x3c, _0xa293x3d) {
        var _0xa293x3e = new dojo.store.Memory({
            data: []
        });
        var _0xa293x33 = mcs_layers_store.get(_0xa293x2f.get("value"));
        if (_0xa293x33.type == "layer") {
            var _0xa293x3f = ms_base_url + ms_base_folder + _0xa293x2f.get("value") + "/MapServer/0\?"
        } else {
            var _0xa293x3f = ms_base_url + ms_base_folder + "blank/MapServer/" + _0xa293x2f.get("value") + ""
        };
        var _0xa293x40 = new esri.tasks.QueryTask(_0xa293x3f);
        var _0xa293x41 = new esri.tasks.Query();
        _0xa293x41.returnGeometry = false;
        _0xa293x41.returnDistinctValues = true;
        _0xa293x41.outFields = [_0xa293x3c.get("value")];
        _0xa293x41.where = "1=1";
        _0xa293x40.execute(_0xa293x41, function (_0xa293x27) {
            _0xa293x3d.set("item", null);
            _0xa293x27.features.forEach(function (_0xa293x42, _0xa293x17) {
                _0xa293x3e.put({
                    id: _0xa293x42.attributes[_0xa293x3c.get("value")],
                    name: _0xa293x42.attributes[_0xa293x3c.get("value")]
                })
            });
            _0xa293x3d.setAttribute("store", _0xa293x3e)
        })
    }
    var _0xa293x43 = dojo.query(".mcs-attr-conditions");
    var _0xa293x44 = dojo.create("div", {}, _0xa293x43[0]);
    var _0xa293x45 = new dijit.form.Button({
        iconClass: "icon-mcs-add",
        style: "width:30px; margin:1px;",
        showLabel: false
    });
    var _0xa293x46 = new dijit.form.Select({
        name: "mcs-fields",
        labelAttr: "name",
        style: "width:100px; margin:1px;"
    });
    var _0xa293x47 = new dijit.form.Select({
        name: "mcs-equals",
        labelAttr: "name",
        store: _0xa293x3a,
        style: "width:70px; margin:1px;"
    }).attr("value", _0xa293x3a.data[0].id);
    var _0xa293x48 = new dijit.form.ComboBox({
        name: "mcs-values",
        hasDownArrow: false,
        searchAttr: "name",
        autocomplete: true,
        style: "width:88px; margin:1px;"
    });
    _0xa293x44.appendChild(_0xa293x46.domNode);
    _0xa293x44.appendChild(_0xa293x47.domNode);
    _0xa293x44.appendChild(_0xa293x48.domNode);
    _0xa293x44.appendChild(_0xa293x45.domNode);
    _0xa293x46.on("change", function () {
        _0xa293x3b(_0xa293x46, _0xa293x48)
    });
    var _0xa293x49 = 3;
    var _0xa293x4a = 1;
    _0xa293x45.on("click", function () {
        if (_0xa293x4a >= _0xa293x49) {
            window.alert("Bạn không thể thêm quá " + _0xa293x49 + " điều kiện!")
        } else {
            var _0xa293x4b = new dijit.form.Select({
                name: "mcs-conditions",
                labelAttr: "name",
                store: _0xa293x39,
                style: "width:70px; margin:1px; display:block;"
            }).attr("value", _0xa293x39.data[0].id);
            var _0xa293x4c = new dijit.form.Select({
                name: "mcs-fields",
                labelAttr: "name",
                store: _0xa293x38,
                style: "width:100px; margin:1px;"
            }).attr("value", _0xa293x38.data[0].id);
            var _0xa293x4d = new dijit.form.Select({
                name: "mcs-equals",
                labelAttr: "name",
                store: _0xa293x3a,
                style: "width:70px; margin:1px;"
            }).attr("value", _0xa293x3a.data[0].id);
            var _0xa293x4e = new dijit.form.ComboBox({
                name: "mcs-values",
                hasDownArrow: false,
                searchAttr: "name",
                autocomplete: true,
                style: "width:88px; margin:1px;"
            });
            var _0xa293x4f = new dijit.form.Button({
                iconClass: "icon-mcs-remove",
                style: "width:30px; margin:1px;",
                showLabel: false,
                onClick: function () {
                    dojo.destroy(this.domNode.parentNode);
                    _0xa293x4a--
                }
            });
            var _0xa293x50 = dojo.create("div", {}, _0xa293x43[0]);
            _0xa293x50.appendChild(_0xa293x4b.domNode);
            _0xa293x50.appendChild(_0xa293x4c.domNode);
            _0xa293x50.appendChild(_0xa293x4d.domNode);
            _0xa293x50.appendChild(_0xa293x4e.domNode);
            _0xa293x50.appendChild(_0xa293x4f.domNode);
            _0xa293x4c.on("change", function () {
                _0xa293x3b(_0xa293x4c, _0xa293x4e)
            });
            _0xa293x4a++
        }
    });
    mcs_draw_toolbar = new esri.toolbars.Draw(map);
    dojo.connect(dojo.byId("btn-mcs-draw"), "onclick", function () {
        if (typeof mcs_layer === "undefined") {
            mcs_layer = new esri.layers.GraphicsLayer({
                id: "rl"
            });
            map.addLayer(mcs_layer)
        };
        mcs_draw_toolbar.activate(esri.toolbars.Draw.POLYGON);
        mcs_draw_toolbar.on("draw-end", function (_0xa293x51) {
            mcs_layer.clear();
            var _0xa293x52 = new esri.symbol.SimpleFillSymbol();
            var _0xa293x53 = new esri.Graphic(_0xa293x51.geometry, _0xa293x52);
            mcs_layer.add(_0xa293x53);
            mcs_geom = _0xa293x51.geometry;
            dijit.registry.byId("txt-mcs-geom").set("value", JSON.stringify(mcs_geom.toJson()));
            mcs_draw_toolbar.deactivate()
        })
    });
    dojo.connect(dojo.byId("btn-mcs-start"), "onclick", function () {
        if (!rg_is_toggled) {
            dijit.byId("centerPane").addChild(dijit.byId("result-grid"));
            rg_is_toggled = true
        };
        map.infoWindow.hide();
        dojo.empty(dojo.byId("result-grid"));
        var _0xa293x54 = "";
        var _0xa293x55 = dojo.query('\[name="mcs-conditions"\]');
        var _0xa293x56 = dojo.query('\[name="mcs-fields"\]');
        var _0xa293x57 = dojo.query('\[name="mcs-equals"\]');
        var _0xa293x58 = dojo.query('\[name="mcs-values"\]');
        for (var _0xa293x17 = 0; _0xa293x17 < _0xa293x4a; _0xa293x17++) {
            if (_0xa293x17 > 0) {
                if (dijit.getEnclosingWidget(_0xa293x57[_0xa293x17]).get("value") == "like") {
                    var _0xa293x59 = " " + dijit.getEnclosingWidget(_0xa293x55[_0xa293x17 - 1]).get("value") + " ";
                    var _0xa293x5a = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\(" + dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value") + "\)") : (dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value"));
                    var _0xa293x5b = " " + dijit.getEnclosingWidget(_0xa293x57[_0xa293x17]).get("value") + " ";
                    var _0xa293x5c = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\('%" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "%'\)") : ("'%" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "%'");
                    _0xa293x54 += _0xa293x59 + _0xa293x5a + _0xa293x5b + _0xa293x5c
                } else {
                    var _0xa293x59 = " " + dijit.getEnclosingWidget(_0xa293x55[_0xa293x17 - 1]).get("value") + " ";
                    var _0xa293x5a = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\(" + dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value") + "\)") : (dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value"));
                    var _0xa293x5b = " " + dijit.getEnclosingWidget(_0xa293x57[_0xa293x17]).get("value") + " ";
                    var _0xa293x5c = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\('" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "'\)") : ("'" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "'");
                    _0xa293x54 += _0xa293x59 + _0xa293x5a + _0xa293x5b + _0xa293x5c
                }
            } else {
                if (dijit.getEnclosingWidget(_0xa293x57[_0xa293x17]).get("value") == "like") {
                    var _0xa293x5a = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\(" + dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value") + "\)") : (dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value"));
                    var _0xa293x5b = " " + dijit.getEnclosingWidget(_0xa293x57[_0xa293x17]).get("value") + " ";
                    var _0xa293x5c = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\('%" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "%'\)") : ("'%" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "%'");
                    _0xa293x54 += _0xa293x5a + _0xa293x5b + _0xa293x5c
                } else {
                    var _0xa293x5a = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\(" + dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value") + "\)") : (dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value"));
                    var _0xa293x5b = " " + dijit.getEnclosingWidget(_0xa293x57[_0xa293x17]).get("value") + " ";
                    var _0xa293x5c = (_0xa293x38.get(dijit.getEnclosingWidget(_0xa293x56[_0xa293x17]).get("value")).dataType == "esriFieldTypeString") ? ("lower\('" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "'\)") : ("'" + dijit.getEnclosingWidget(_0xa293x58[_0xa293x17]).get("value") + "'");
                    _0xa293x54 += _0xa293x5a + _0xa293x5b + _0xa293x5c
                }
            }
        };
        if (mcs_layers_store.get(_0xa293x2f.get("value")).type == "layer") {
            var _0xa293x5d = new esri.tasks.QueryTask(ms_base_url + ms_base_folder + mcs_layers_store.get(_0xa293x2f.get("value")).id + "/MapServer/0");
            var _0xa293x5e = new esri.tasks.Query();
            if (typeof mcs_geom !== "undefined") {
                _0xa293x5e.geometry = mcs_geom
            };
            _0xa293x5e.returnGeometry = true;
            _0xa293x5e.outFields = ["\*"];
            _0xa293x5e.where = _0xa293x54;
            var _0xa293x5f, _0xa293x60;
            _0xa293x5d.execute(_0xa293x5e, function (_0xa293x27) {
                if (_0xa293x27.features.length == 0) {
                    return
                };
                if (typeof mcs_layer === "undefined") {
                    mcs_layer = new esri.layers.GraphicsLayer({
                        id: "rl"
                    });
                    map.addLayer(mcs_layer)
                };
                mcs_layer.clear();
                var _0xa293x61 = [{
                    label: "Id",
                    field: "id",
                    resizable: true,
                    hidden: false
                }];
                _0xa293x27.fields.forEach(function (_0xa293x62) {
                    if (_0xa293x62.name.toLowerCase() != "shape" && _0xa293x62.name.toLowerCase() != "objectid" && _0xa293x62.name.toLowerCase() != "st_area\(shape\)" && _0xa293x62.name.toLowerCase() != "st_length\(shape\)" && _0xa293x62.name.toLowerCase() != "st_area" && _0xa293x62.name.toLowerCase() != "st_length" && _0xa293x62.name.toLowerCase() != "kinh_do" && _0xa293x62.name.toLowerCase() != "vi_do") {
                        if (_0xa293x62.name.toLowerCase() != "d" && _0xa293x62.name.toLowerCase() != "p" && _0xa293x62.name.toLowerCase() != "s" && _0xa293x62.name.toLowerCase() != "i" && _0xa293x62.name.toLowerCase() != "r" && _0xa293x62.name.toLowerCase().indexOf("ma_") == -1) {
                            var _0xa293x3c = {};
                            _0xa293x3c.label = toSentenceCase(_0xa293x62.alias.toLowerCase());
                            _0xa293x3c.field = _0xa293x62.name;
                            _0xa293x3c.resizable = true;
                            _0xa293x3c.hidden = false;
                            _0xa293x61.push(_0xa293x3c)
                        } else {
                            var _0xa293x3c = {};
                            _0xa293x3c.label = toSentenceCase(_0xa293x62.alias.toLowerCase());
                            _0xa293x3c.field = _0xa293x62.name;
                            _0xa293x3c.resizable = true;
                            _0xa293x3c.hidden = true;
                            _0xa293x61.push(_0xa293x3c)
                        }
                    }
                });
                if (_0xa293x27.geometryType == "esriGeometryPolygon") {
                    var _0xa293x63 = new esri.symbols.SimpleFillSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new esri.symbols.SimpleLineSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new dojo.Color([222, 45, 38]), 2), new dojo.Color([252, 146, 114, 0.75]))
                } else {
                    if (_0xa293x27.geometryType == "esriGeometryLine" || _0xa293x27.geometryType == "esriGeometryPolyline") {
                        var _0xa293x63 = new esri.symbols.SimpleFillSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new esri.symbols.SimpleLineSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new dojo.Color([222, 45, 38]), 2), new dojo.Color([252, 146, 114, 0.75]))
                    } else {
                        if (_0xa293x27.geometryType == "esriGeometryPoint" || _0xa293x27.geometryType == "esriGeometryMultiPoint") {
                            var _0xa293x63 = new esri.symbols.SimpleMarkerSymbol(esri.symbols.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbols.SimpleLineSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new dojo.Color([222, 45, 38]), 2), new dojo.Color([252, 146, 114, 0.75]))
                        }
                    }
                };
                var _0xa293x64 = [];
                _0xa293x27.features.forEach(function (_0xa293x42, _0xa293x17) {
                    var _0xa293x65 = {};
                    _0xa293x65.id = _0xa293x17 + 1;
                    _0xa293x42.attributes.id = _0xa293x17 + 1;
                    for (var _0xa293x66 in _0xa293x42.attributes) {
                        if (_0xa293x66.toLowerCase() != "shape" && _0xa293x66.toLowerCase() != "objectid" && _0xa293x66.toLowerCase() != "st_area\(shape\)" && _0xa293x66.toLowerCase() != "st_length\(shape\)" && _0xa293x66.toLowerCase() != "st_area" && _0xa293x66.toLowerCase() != "st_length" && _0xa293x66.toLowerCase() != "kinh_do" && _0xa293x66.toLowerCase() != "vi_do") {
                            if (_0xa293x42.attributes[_0xa293x66] == null) {
                                _0xa293x42.attributes[_0xa293x66] = "Không có giá trị"
                            };
                            _0xa293x65[_0xa293x66] = _0xa293x42.attributes[_0xa293x66]
                        }
                    };
                    _0xa293x64.push(_0xa293x65);
                    var _0xa293x67 = _0xa293x42;
                    _0xa293x67.setSymbol(_0xa293x63);
                    mcs_layer.add(_0xa293x67)
                });
                _0xa293x60 = new dojo.store.Memory({
                    data: _0xa293x64
                });
                var _0xa293x68 = esri.graphicsExtent(mcs_layer.graphics);
                map.setExtent(_0xa293x68);
                var _0xa293x69 = dojo.store.Observable(new dojo.store.Memory({
                    data: []
                }));
                if (typeof _0xa293x5f === "undefined") {
                    var _0xa293x6a = dojo.declare([dgrid.OnDemandGrid, dgrid.Selection, dgrid.extensions.ColumnHider, dgrid.extensions.ColumnResizer, dgrid.extensions.ColumnReorder, dgrid.Keyboard, dgrid.extensions.Pagination]);
                    _0xa293x5f = new _0xa293x6a({
                        sort: "id",
                        columns: _0xa293x61,
                        selectionMode: "single",
                        rowsPerPage: 5,
                        noDataMessage: "Không có dữ liệu nào được tìm thấy!",
                        loadingMessage: "Đang tải dữ liệu..."
                    });
                    dojo.place(_0xa293x5f.domNode, dojo.byId("result-grid"));
                    _0xa293x5f.startup();
                    _0xa293x5f.on("dgrid-select", function (_0xa293x1f) {
                        dojo.forEach(mcs_layer.graphics, function (_0xa293x53) {
                            if ((_0xa293x53.attributes) && _0xa293x53.attributes.id === _0xa293x1f.rows[0].data.id) {
                                var _0xa293x2b = "<table style='font-size:10px;'>";
                                _0xa293x2b += "<tbody>";
                                for (attr in _0xa293x1f.rows[0].data) {
                                    if (attr.toLowerCase() != "shape" && attr.toLowerCase() != "objectid" && attr.toLowerCase() != "st_area\(shape\)" && attr.toLowerCase() != "st_length\(shape\)" && attr.toLowerCase() != "st_area" && attr.toLowerCase() != "st_length" && attr.toLowerCase() != "kinh_do" && attr.toLowerCase() != "vi_do" && _0xa293x1f.rows[0].data[attr] != "Không có giá trị" && attr.toLowerCase() != "d" && attr.toLowerCase() != "p" && attr.toLowerCase() != "s" && attr.toLowerCase() != "i" && attr.toLowerCase() != "r" && attr.toLowerCase().indexOf("ma_") == -1) {
                                        if (attr.toLowerCase() == "id") {
                                            _0xa293x2b += "<tr><td><b>Id</b></td><td>" + _0xa293x1f.rows[0].data.id + "</td></tr>"
                                        } else {
                                            _0xa293x2b += "<tr><td><b>" + toSentenceCase(String(_0xa293x27.fieldAliases[attr]).toLowerCase()) + "</b></td><td>" + _0xa293x1f.rows[0].data[attr] + "</td></tr>"
                                        }
                                    }
                                };
                                _0xa293x2b += "</tbody>";
                                _0xa293x2b += "</table>";
                                map.infoWindow.setTitle("<b>Thông tin đối tượng</b>");
                                map.infoWindow.setContent(_0xa293x2b);
                                map.infoWindow.resize(350, 200);
                                if (_0xa293x53.geometry.type === "polygon" || _0xa293x53.geometry.type === "multipolygon") {
                                    map.infoWindow.show(_0xa293x53.geometry.getExtent().getCenter());
                                    map.setExtent(_0xa293x53.geometry.getExtent(), true)
                                } else {
                                    if (_0xa293x53.geometry.type === "line" || _0xa293x53.geometry.type === "polyline") {
                                        map.infoWindow.show(_0xa293x53.geometry.getExtent().getCenter());
                                        map.setExtent(_0xa293x53.geometry.getExtent(), true)
                                    } else {
                                        map.infoWindow.show(_0xa293x53.geometry);
                                        var _0xa293x6b = 500;
                                        var _0xa293x6c = new esri.geometry.Extent(_0xa293x53.geometry.x - _0xa293x6b, _0xa293x53.geometry.y - _0xa293x6b, _0xa293x53.geometry.x + _0xa293x6b, _0xa293x53.geometry.y + _0xa293x6b, _0xa293x53.geometry.spatialReference);
                                        map.setExtent(_0xa293x6c, true)
                                    }
                                };
                                return
                            }
                        })
                    })
                };
                _0xa293x5f.setStore(_0xa293x69);
                _0xa293x5f.refresh();
                _0xa293x5f.setStore(_0xa293x60)
            })
        } else {
            var _0xa293x5d = new esri.tasks.QueryTask(ms_base_url + ms_base_folder + "blank/MapServer/" + mcs_layers_store.get(_0xa293x2f.get("value")).id);
            var _0xa293x5e = new esri.tasks.Query();
            _0xa293x5e.returnGeometry = false;
            _0xa293x5e.outFields = ["\*"];
            _0xa293x5e.where = _0xa293x54;
            var _0xa293x6d, _0xa293x6e;
            _0xa293x5d.execute(_0xa293x5e, function (_0xa293x27) {
                if (typeof mcs_layer === "undefined") {
                    mcs_layer = new esri.layers.GraphicsLayer({
                        id: "rl"
                    });
                    map.addLayer(mcs_layer)
                };
                mcs_layer.clear();
                var _0xa293x61 = [{
                    label: "Id",
                    field: "id",
                    resizable: true,
                    hidden: false
                }];
                _0xa293x27.fields.forEach(function (_0xa293x62) {
                    if (_0xa293x62.name.toLowerCase() != "objectid") {
                        if (_0xa293x62.name.toLowerCase().indexOf("ma_") == -1) {
                            var _0xa293x3c = {};
                            _0xa293x3c.label = toSentenceCase(_0xa293x62.alias.toLowerCase());
                            _0xa293x3c.field = _0xa293x62.name;
                            _0xa293x3c.resizable = true;
                            _0xa293x3c.hidden = false;
                            _0xa293x61.push(_0xa293x3c)
                        } else {
                            var _0xa293x3c = {};
                            _0xa293x3c.label = toSentenceCase(_0xa293x62.alias.toLowerCase());
                            _0xa293x3c.field = _0xa293x62.name;
                            _0xa293x3c.resizable = true;
                            _0xa293x3c.hidden = true;
                            _0xa293x61.push(_0xa293x3c)
                        }
                    }
                });
                var _0xa293x64 = [];
                _0xa293x27.features.forEach(function (_0xa293x42, _0xa293x17) {
                    var _0xa293x65 = {};
                    _0xa293x65.id = _0xa293x17 + 1;
                    _0xa293x42.attributes.id = _0xa293x17 + 1;
                    for (var _0xa293x66 in _0xa293x42.attributes) {
                        if (_0xa293x66.toLowerCase() != "objectid") {
                            if (_0xa293x42.attributes[_0xa293x66] == null) {
                                _0xa293x42.attributes[_0xa293x66] = "Không có giá trị"
                            };
                            _0xa293x65[_0xa293x66] = _0xa293x42.attributes[_0xa293x66]
                        }
                    };
                    _0xa293x64.push(_0xa293x65)
                });
                _0xa293x6e = new dojo.store.Memory({
                    data: _0xa293x64
                });
                var _0xa293x69 = dojo.store.Observable(new dojo.store.Memory({
                    data: []
                }));
                if (typeof _0xa293x6d === "undefined") {
                    var _0xa293x6a = dojo.declare([dgrid.OnDemandGrid, dgrid.Selection, dgrid.extensions.ColumnHider, dgrid.extensions.ColumnResizer, dgrid.extensions.ColumnReorder, dgrid.Keyboard, dgrid.extensions.Pagination]);
                    _0xa293x6d = new _0xa293x6a({
                        sort: "id",
                        columns: _0xa293x61,
                        selectionMode: "single",
                        rowsPerPage: 5,
                        noDataMessage: "Không có dữ liệu nào được tìm thấy!",
                        loadingMessage: "Đang tải dữ liệu..."
                    });
                    dojo.place(_0xa293x6d.domNode, dojo.byId("result-grid"));
                    _0xa293x6d.startup();
                    _0xa293x6d.on("dgrid-select", function (_0xa293x1f) {
                        if (_0xa293x1f.rows[0].data.ma_don_vi_hanh_chinh.length == 2) {
                            var _0xa293x6f = ms_base_url + ms_base_folder + "adm_ranh_gioi_tinh/MapServer/0"
                        } else {
                            if (_0xa293x1f.rows[0].data.ma_don_vi_hanh_chinh.length == 3) {
                                var _0xa293x6f = ms_base_url + ms_base_folder + "adm_ranh_gioi_huyen/MapServer/0"
                            } else {
                                if (_0xa293x1f.rows[0].data.ma_don_vi_hanh_chinh.length == 5) {
                                    var _0xa293x6f = ms_base_url + ms_base_folder + "adm_ranh_gioi_xa/MapServer/0"
                                }
                            }
                        };
                        var _0xa293x70 = new esri.tasks.QueryTask(_0xa293x6f);
                        var _0xa293x71 = new esri.tasks.Query();
                        _0xa293x71.returnGeometry = true;
                        _0xa293x71.outFields = ["\*"];
                        _0xa293x71.where = "ma_don_vi_hanh_chinh='" + _0xa293x1f.rows[0].data.ma_don_vi_hanh_chinh + "'";
                        _0xa293x70.execute(_0xa293x71, function (_0xa293x72) {
                            if (typeof mcs_layer === "undefined") {
                                mcs_layer = new esri.layers.GraphicsLayer({
                                    id: "rl"
                                });
                                map.addLayer(mcs_layer)
                            };
                            mcs_layer.clear();
                            var _0xa293x67 = _0xa293x72.features[0];
                            var _0xa293x63 = new esri.symbols.SimpleFillSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new esri.symbols.SimpleLineSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, new dojo.Color([222, 45, 38]), 2), new dojo.Color([252, 146, 114, 0.75]));
                            _0xa293x67.setSymbol(_0xa293x63);
                            mcs_layer.add(_0xa293x67);
                            var _0xa293x2b = "<table style='font-size:10px;'>";
                            _0xa293x2b += "<tbody>";
                            for (attr in _0xa293x1f.rows[0].data) {
                                if (_0xa293x1f.rows[0].data[attr] != "Không có giá trị" && attr.toLowerCase().indexOf("ma_") == -1) {
                                    if (attr.toLowerCase() == "id") {
                                        _0xa293x2b += "<tr><td><b>Id</b></td><td>" + _0xa293x1f.rows[0].data.id + "</td></tr>"
                                    } else {
                                        _0xa293x2b += "<tr><td><b>" + toSentenceCase(String(_0xa293x27.fieldAliases[attr]).toLowerCase()) + "</b></td><td>" + _0xa293x1f.rows[0].data[attr] + "</td></tr>"
                                    }
                                }
                            };
                            _0xa293x2b += "</tbody>";
                            _0xa293x2b += "</table>";
                            map.infoWindow.setTitle("<b>Thông tin đối tượng</b>");
                            map.infoWindow.setContent(_0xa293x2b);
                            map.infoWindow.resize(350, 200);
                            map.infoWindow.show(_0xa293x67.geometry.getExtent().getCenter());
                            map.setExtent(_0xa293x67.geometry.getExtent(), true)
                        })
                    })
                };
                _0xa293x6d.setStore(_0xa293x69);
                _0xa293x6d.refresh();
                _0xa293x6d.setStore(_0xa293x6e)
            })
        }
    })
}

function toSentenceCase(_0xa293x74) {
    var _0xa293x75 = _0xa293x74;
    return _0xa293x75.replace(_0xa293x75.charAt(0), _0xa293x75.charAt(0).toUpperCase())
}

function hideLMask() {
    dojo.fadeOut({
        node: dojo.query(".mask")[0],
        duration: 2000,
        onEnd: function () {
            dojo.style(this.node, "display", "none")
        }
    }).play()
}

function init() {
    initMap();
    initLayers();
    initToolbar();
    initEvents();
    initMCS();
    hideLMask()
}