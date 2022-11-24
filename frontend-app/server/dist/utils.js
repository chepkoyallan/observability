"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = void 0;
/** get the server address from host, port, and schema (defaults to 'http'). */
function getAddress(_a) {
    var host = _a.host, port = _a.port, namespace = _a.namespace, _b = _a.schema, schema = _b === void 0 ? 'http' : _b;
    namespace = namespace ? "." + namespace : '';
    port = port ? ":" + port : '';
    return schema + "://" + host + namespace + port;
}
exports.getAddress = getAddress;
//# sourceMappingURL=utils.js.map