"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigs = exports.Deployments = exports.apiVersionPrefix = exports.apiVersion = exports.BASEPATH = void 0;
var path = __importStar(require("path"));
exports.BASEPATH = "/pipeline";
exports.apiVersion = "v1beta1";
exports.apiVersionPrefix = "apis/" + exports.apiVersion;
var Deployments;
(function (Deployments) {
    Deployments["NOT_SPECIFIED"] = "NOT_SPECIFIED";
    Deployments["KUBEFLOW"] = "KUBEFLOW";
    Deployments["MARKETPLACE"] = "MARKETPLACE";
})(Deployments = exports.Deployments || (exports.Deployments = {}));
/** converts string to bool */
var asBool = function (value) { return ["true", "1"].includes(value.toLowerCase()); };
function parseArgs(argv) {
    if (argv.length < 3) {
        var msg = "  Usage: node server.js <static-dir> [port].\n         You can specify the API server address using the\n         ML_PIPELINE_SERVICE_HOST and ML_PIPELINE_SERVICE_PORT\n         env vars.";
        throw new Error(msg);
    }
    var staticDir = path.resolve(argv[2]);
    var port = parseInt(argv[3] || "3000", 10);
    return { staticDir: staticDir, port: port };
}
function loadConfigs(argv, env) {
    var _a = parseArgs(argv), staticDir = _a.staticDir, port = _a.port;
    var 
    /** API service will listen to this host */
    _b = env.ML_PIPELINE_SERVICE_HOST, 
    /** API service will listen to this host */
    ML_PIPELINE_SERVICE_HOST = _b === void 0 ? 'localhost' : _b, 
    /** API service will listen to this port */
    _c = env.ML_PIPELINE_SERVICE_PORT, 
    /** API service will listen to this port */
    ML_PIPELINE_SERVICE_PORT = _c === void 0 ? '3001' : _c, _d = env.DEPLOYMENT, DEPLOYMENT_STR = _d === void 0 ? "" : _d, HIDE_SIDENAV = env.HIDE_SIDENAV;
    return {
        pipeline: {
            host: ML_PIPELINE_SERVICE_HOST,
            port: ML_PIPELINE_SERVICE_PORT,
        },
        server: {
            apiVersionPrefix: exports.apiVersionPrefix,
            basePath: exports.BASEPATH,
            deployment: DEPLOYMENT_STR.toUpperCase() === Deployments.KUBEFLOW
                ? Deployments.KUBEFLOW
                : DEPLOYMENT_STR.toUpperCase() === Deployments.MARKETPLACE
                    ? Deployments.MARKETPLACE
                    : Deployments.NOT_SPECIFIED,
            hideSideNav: HIDE_SIDENAV === undefined
                ? DEPLOYMENT_STR.toUpperCase() === Deployments.KUBEFLOW
                : asBool(HIDE_SIDENAV),
            port: port,
            staticDir: staticDir
        }
    };
}
exports.loadConfigs = loadConfigs;
//# sourceMappingURL=configs.js.map