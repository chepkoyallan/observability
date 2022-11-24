"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIServer = void 0;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var utils_1 = require("./utils");
var healthz_1 = require("./handlers/healthz");
function getRegisterHandler(app, basePath) {
    return function (func, route, handler) {
        func.call(app, route, handler);
        return func.call(app, "" + basePath + route, handler);
    };
}
/**
 * UIServer wraps around a express application to:
 * - proxy requests to ml-pipeline api server
 * - retrieve artifacts from the various backend
 * - create and retrieve new viewer instances
 * - serve static front-end resources (i.e. react app)
 */
var UIServer = /** @class */ (function () {
    function UIServer(options) {
        this.options = options;
        this.app = createUIServer(options);
    }
    /**
     * Starts the http server.
     * @param port optionally overwrite the provided port to listen to.
     */
    UIServer.prototype.start = function (port) {
        if (this.httpServer) {
            throw new Error("UIServer already started.");
        }
        port = port || this.options.server.port;
        this.httpServer = this.app.listen(port, function () {
            console.log("Server listening at http://localhost:" + port);
        });
        return this.httpServer;
    };
    /**
     * Stops the http server.
     */
    UIServer.prototype.close = function () {
        if (this.httpServer) {
            this.httpServer.close();
        }
        this.httpServer = undefined;
        return this;
    };
    return UIServer;
}());
exports.UIServer = UIServer;
function createUIServer(options) {
    var currDir = path_1.default.resolve(__dirname);
    var basePath = options.server.basePath;
    var apiVersionPrefix = options.server.apiVersionPrefix;
    var apiServerAddress = utils_1.getAddress(options.pipeline);
    // const envoyServiceAddress = getAddress(options.metadata.envoyService);
    var app = express_1.default();
    var registerHandler = getRegisterHandler(app, basePath);
    /** log to stdout */
    app.use(function (req, _, next) {
        console.info(req.method + " " + req.originalUrl);
        next;
    });
    /** Healthz */
    registerHandler(app.get, "/" + apiVersionPrefix + "/healthz", healthz_1.getHealthzHandler({
        healthzEndpoint: healthz_1.getHealthzEndpoint(apiServerAddress, apiVersionPrefix),
        healthzStats: healthz_1.getBuildMetadata(currDir),
    }));
    return app;
}
//# sourceMappingURL=app.js.map