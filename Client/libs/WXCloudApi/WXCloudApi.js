var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var egret;
(function (egret) {
    var WXDBWatcher = (function () {
        function WXDBWatcher() {
        }
        WXDBWatcher.openCollection = function (name, env) {
            var db = new WXDBWatcher();
            db._env = env;
            db.init(name);
            return db;
        };
        WXDBWatcher.prototype.startWatch = function (selectRule, callback) {
            var listener = this._collection.where(selectRule).watch(callback);
            return new WXDBListener(listener);
        };
        WXDBWatcher.prototype.stopWatch = function (listener) {
            listener.close();
        };
        WXDBWatcher.prototype.init = function (name) {
            var wxDB;
            var env = this._env;
            if (!env) {
                wxDB = egret.wxCloud.cloud.database();
            }
            else {
                wxDB = egret.wxCloud.cloud.database({ env: env });
            }
            this._collection = wxDB.collection(name);
        };
        return WXDBWatcher;
    }());
    egret.WXDBWatcher = WXDBWatcher;
    __reflect(WXDBWatcher.prototype, "egret.WXDBWatcher");
    var WXDBListener = (function () {
        function WXDBListener(listener) {
            this._listener = listener;
        }
        WXDBListener.prototype.close = function () {
            this._listener.close();
        };
        return WXDBListener;
    }());
    egret.WXDBListener = WXDBListener;
    __reflect(WXDBListener.prototype, "egret.WXDBListener");
})(egret || (egret = {}));
/////////////////////
///// WX Cloud Apis
/////////////////////
/**
 * Common interfaces and types
 */
var egret;
(function (egret) {
    var wxCloud;
    (function (wxCloud) {
        var cloud = (function () {
            function cloud() {
            }
            cloud.init = function (config) {
                if (!assertWXPlatform("egret.wxCloud.cloud")) {
                    return;
                }
                wx.cloud.init(config);
            };
            cloud.database = function (config) {
                if (!assertWXPlatform("egret.wxCloud.cloud")) {
                    return new EgretDatabase(config, undefined);
                }
                // return new EgretDatabase(config, wx.cloud.database(config));
                return wx.cloud.database(config);
            };
            cloud.callFunction = function (param) {
                if (!assertWXPlatform("egret.wxCloud.cloud")) {
                    return;
                }
                return wx.cloud.callFunction(param);
            };
            return cloud;
        }());
        wxCloud.cloud = cloud;
        __reflect(cloud.prototype, "egret.wxCloud.cloud");
    })(wxCloud = egret.wxCloud || (egret.wxCloud = {}));
})(egret || (egret = {}));
/**
 * @internal
 */
function assertWXPlatform(apiName) {
    if (typeof egret.Capabilities === "undefined" ||
        egret.Capabilities.runtimeType !== egret.RuntimeType.WXGAME) {
        if (apiName) {
            console.warn(apiName + "\u53EA\u5728\u5FAE\u4FE1\u5C0F\u6E38\u620F\u4E0B\u53EF\u7528");
        }
        else {
            console.warn("\u8BE5\u63A5\u53E3\u53EA\u5728\u5FAE\u4FE1\u5C0F\u6E38\u620F\u4E0B\u53EF\u7528");
        }
        return false;
    }
    return true;
}
/**
 * @internal
 */
var EgretDatabase = (function () {
    function EgretDatabase(_config, db) {
        this._config = _config;
        this._db = db;
    }
    Object.defineProperty(EgretDatabase.prototype, "config", {
        get: function () {
            if (this._db) {
                return this._db.config;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EgretDatabase.prototype, "command", {
        get: function () {
            if (this._db) {
                return this._db.command;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return new EgretDatabaseCommand();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EgretDatabase.prototype, "Geo", {
        get: function () {
            if (this._db) {
                return this._db.Geo;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return new EgretGeo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretDatabase.prototype, "serverDate", {
        get: function () {
            if (this._db) {
                return this._db.serverDate;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return function () {
                return {
                    options: {
                        offset: 0
                    }
                };
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretDatabase.prototype, "RegExp", {
        get: function () {
            if (this._db) {
                return this._db.RegExp;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return EgretRegExp;
        },
        enumerable: true,
        configurable: true
    });
    EgretDatabase.prototype.collection = function (collectionName) {
        if (this._db) {
            return this._db.collection(collectionName);
        }
        assertWXPlatform("egret.wxCloud.DB.Database");
        return new EgretCollectionReference("", undefined);
    };
    return EgretDatabase;
}());
__reflect(EgretDatabase.prototype, "EgretDatabase");
/**
 * @internal
 */
var EgretQuery = (function () {
    function EgretQuery() {
    }
    EgretQuery.prototype.where = function (condition) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.orderBy = function (fieldPath, order) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.limit = function (max) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.skip = function (offset) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.field = function (object) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.get = function (options) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return Promise.resolve({
            data: [],
            errMsg: ""
        });
    };
    EgretQuery.prototype.count = function (options) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return Promise.resolve({
            total: 0,
            errMsg: ""
        });
    };
    EgretQuery.prototype.watch = function (callback) {
        assertWXPlatform("egret.wxCloud.DB.Query");
    };
    return EgretQuery;
}());
__reflect(EgretQuery.prototype, "EgretQuery");
/**
 * @internal
 */
var EgretCollectionReference = (function (_super) {
    __extends(EgretCollectionReference, _super);
    function EgretCollectionReference(name, database) {
        var _this = _super.call(this) || this;
        _this.collectionName = name;
        _this.database = database;
        return _this;
    }
    EgretCollectionReference.prototype.doc = function (docId) {
        assertWXPlatform("egret.wxCloud.DB.CollectionReference");
        return new EgretDocumentReference(docId, this.database);
    };
    EgretCollectionReference.prototype.add = function (options) {
        assertWXPlatform("egret.wxCloud.DB.CollectionReference");
        return Promise.resolve({
            _id: "",
            errMsg: ""
        });
    };
    return EgretCollectionReference;
}(EgretQuery));
__reflect(EgretCollectionReference.prototype, "EgretCollectionReference");
/**
 * @internal
 */
var EgretDocumentReference = (function () {
    function EgretDocumentReference(docId, database) {
        this.docId = docId;
        this.database = database;
    }
    EgretDocumentReference.prototype.field = function (object) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return this;
    };
    EgretDocumentReference.prototype.get = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            data: [],
            errMsg: ""
        });
    };
    EgretDocumentReference.prototype.set = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            _id: this.docId,
            stats: {
                updated: 0,
                created: 0
            },
            errMsg: ""
        });
    };
    EgretDocumentReference.prototype.update = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            stats: {
                updated: 0,
            },
            errMsg: ""
        });
    };
    EgretDocumentReference.prototype.remove = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            stats: {
                removed: 0,
            },
            errMsg: ""
        });
    };
    return EgretDocumentReference;
}());
__reflect(EgretDocumentReference.prototype, "EgretDocumentReference");
/**
 * @internal
 */
var EgretDatabaseCommand = (function () {
    function EgretDatabaseCommand() {
    }
    EgretDatabaseCommand.prototype.eq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.neq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.gt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.gte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.lt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.lte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.in = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.nin = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.geoNear = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.geoWithin = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.geoIntersects = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.and = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseLogicCommand();
    };
    EgretDatabaseCommand.prototype.or = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseLogicCommand();
    };
    EgretDatabaseCommand.prototype.set = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.remove = function () {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.inc = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.mul = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.push = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.pop = function () {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.shift = function () {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.unshift = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    return EgretDatabaseCommand;
}());
__reflect(EgretDatabaseCommand.prototype, "EgretDatabaseCommand");
/**
 * @internal
 */
var EgretDatabaseLogicCommand = (function () {
    function EgretDatabaseLogicCommand() {
    }
    EgretDatabaseLogicCommand.prototype._setFieldName = function (fieldName) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseLogicCommand");
        this.fieldName = fieldName;
        return this;
    };
    EgretDatabaseLogicCommand.prototype.and = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseLogicCommand");
        return this;
    };
    EgretDatabaseLogicCommand.prototype.or = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseLogicCommand");
        return this;
    };
    return EgretDatabaseLogicCommand;
}());
__reflect(EgretDatabaseLogicCommand.prototype, "EgretDatabaseLogicCommand");
/**
 * @internal
 */
var EgretDatabaseQueryCommand = (function (_super) {
    __extends(EgretDatabaseQueryCommand, _super);
    function EgretDatabaseQueryCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EgretDatabaseQueryCommand.prototype._setFieldName = function (fieldName) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        this.fieldName = fieldName;
        return this;
    };
    EgretDatabaseQueryCommand.prototype.eq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.neq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.gt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.gte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.lt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.lte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.in = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.nin = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.geoNear = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.geoWithin = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.geoIntersects = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    return EgretDatabaseQueryCommand;
}(EgretDatabaseLogicCommand));
__reflect(EgretDatabaseQueryCommand.prototype, "EgretDatabaseQueryCommand");
/**
 * @internal
 */
var DatabaseUpdateCommand = (function () {
    function DatabaseUpdateCommand(
        // operator: UPDATE_COMMANDS_LITERAL,
        operator, operands, fieldName) {
        this.operator = operator;
        this.operands = operands;
        this.fieldName = fieldName;
    }
    DatabaseUpdateCommand.prototype._setFieldName = function (fieldName) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseUpdateCommand");
        this.fieldName = fieldName;
        return this;
    };
    return DatabaseUpdateCommand;
}());
__reflect(DatabaseUpdateCommand.prototype, "DatabaseUpdateCommand");
/**
 * @internal
 */
var EgretGeo = (function () {
    function EgretGeo() {
        this.Point = EgretGeoPoint;
        this.MultiPoint = EgretGeoMultiPoint;
        this.LineString = EgretGeoLineString;
        this.MultiLineString = EgretGeoMultiLineString;
        this.Polygon = EgretGeoPolygon;
        this.MultiPolygon = EgretGeoMultiPolygon;
    }
    return EgretGeo;
}());
__reflect(EgretGeo.prototype, "EgretGeo", ["egret.wxCloud.DB.IGeo"]);
/**
 * @internal
 */
var EgretGeoPoint = (function () {
    function EgretGeoPoint(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
    EgretGeoPoint.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPoint");
        return {};
    };
    EgretGeoPoint.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPoint");
        return "";
    };
    return EgretGeoPoint;
}());
__reflect(EgretGeoPoint.prototype, "EgretGeoPoint");
/**
 * @internal
 */
var EgretGeoMultiPoint = (function () {
    function EgretGeoMultiPoint(points) {
        this.points = points;
    }
    EgretGeoMultiPoint.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiPoint");
        return {
            type: 'MultiPoint',
            coordinates: []
        };
    };
    EgretGeoMultiPoint.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiPoint");
        return "";
    };
    return EgretGeoMultiPoint;
}());
__reflect(EgretGeoMultiPoint.prototype, "EgretGeoMultiPoint");
/**
 * @internal
 */
var EgretGeoLineString = (function () {
    function EgretGeoLineString(points) {
        this.points = points;
    }
    EgretGeoLineString.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoLineString");
        return {
            type: 'LineString',
            coordinates: []
        };
    };
    EgretGeoLineString.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoLineString");
        return "";
    };
    return EgretGeoLineString;
}());
__reflect(EgretGeoLineString.prototype, "EgretGeoLineString");
/**
 * @internal
 */
var EgretGeoMultiLineString = (function () {
    function EgretGeoMultiLineString(lines) {
        this.lines = lines;
    }
    EgretGeoMultiLineString.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiLineString");
        return {
            type: 'GeoMultiLineString',
            coordinates: []
        };
    };
    EgretGeoMultiLineString.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiLineString");
        return "";
    };
    return EgretGeoMultiLineString;
}());
__reflect(EgretGeoMultiLineString.prototype, "EgretGeoMultiLineString");
/**
 * @internal
 */
var EgretGeoPolygon = (function () {
    function EgretGeoPolygon(lines) {
        this.lines = lines;
    }
    EgretGeoPolygon.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPolygon");
        return {
            type: 'Polygon',
            coordinates: []
        };
    };
    EgretGeoPolygon.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPolygon");
        return "";
    };
    return EgretGeoPolygon;
}());
__reflect(EgretGeoPolygon.prototype, "EgretGeoPolygon");
/**
 * @internal
 */
var EgretGeoMultiPolygon = (function () {
    function EgretGeoMultiPolygon(polygons) {
        this.polygons = polygons;
    }
    EgretGeoMultiPolygon.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.MultiPolygon");
        return {
            type: 'MultiPolygon',
            coordinates: []
        };
    };
    EgretGeoMultiPolygon.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.MultiPolygon");
        return "";
    };
    return EgretGeoMultiPolygon;
}());
__reflect(EgretGeoMultiPolygon.prototype, "EgretGeoMultiPolygon");
/**
 * @internal
 */
var EgretRegExp = (function () {
    /**
     *
     */
    function EgretRegExp(options) {
    }
    Object.defineProperty(EgretRegExp.prototype, "regexp", {
        get: function () {
            assertWXPlatform("egret.wxCloud.DB.RegExp");
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretRegExp.prototype, "options", {
        get: function () {
            assertWXPlatform("egret.wxCloud.DB.RegExp");
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return EgretRegExp;
}());
__reflect(EgretRegExp.prototype, "EgretRegExp");
