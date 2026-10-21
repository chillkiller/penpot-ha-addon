var WasmModule = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var render_wasm_exports = {};
  __export(render_wasm_exports, {
    default: () => render_wasm_default
  });
  const import_meta = {};
  var createRustSkiaModule = (() => {
    var _scriptName = import_meta.url;
    return (async function(moduleArg = {}) {
      var moduleRtn;
      var Module = moduleArg;
      var readyPromiseResolve, readyPromiseReject;
      var readyPromise = new Promise((resolve, reject) => {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
      var ENVIRONMENT_IS_WEB = typeof window == "object";
      var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
      var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
      if (ENVIRONMENT_IS_NODE) {
        const { createRequire } = await import("module");
        var require = createRequire(import_meta.url);
      }
      var moduleOverrides = { ...Module };
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = (status, toThrow) => {
        throw toThrow;
      };
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var readAsync, readBinary;
      if (ENVIRONMENT_IS_NODE) {
        var fs = require("fs");
        var nodePath = require("path");
        if (!import_meta.url.startsWith("data:")) {
          scriptDirectory = nodePath.dirname(require("url").fileURLToPath(import_meta.url)) + "/";
        }
        readBinary = (filename) => {
          filename = isFileURI(filename) ? new URL(filename) : filename;
          var ret = fs.readFileSync(filename);
          return ret;
        };
        readAsync = async (filename, binary = true) => {
          filename = isFileURI(filename) ? new URL(filename) : filename;
          var ret = fs.readFileSync(filename, binary ? void 0 : "utf8");
          return ret;
        };
        if (!Module["thisProgram"] && process.argv.length > 1) {
          thisProgram = process.argv[1].replace(/\\/g, "/");
        }
        arguments_ = process.argv.slice(2);
        quit_ = (status, toThrow) => {
          process.exitCode = status;
          throw toThrow;
        };
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document != "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptName) {
          scriptDirectory = _scriptName;
        }
        if (scriptDirectory.startsWith("blob:")) {
          scriptDirectory = "";
        } else {
          scriptDirectory = scriptDirectory.slice(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
        }
        {
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response);
            };
          }
          readAsync = async (url) => {
            var response = await fetch(url, { credentials: "same-origin" });
            if (response.ok) {
              return response.arrayBuffer();
            }
            throw new Error(response.status + " : " + response.url);
          };
        }
      } else {
      }
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.error.bind(console);
      Object.assign(Module, moduleOverrides);
      moduleOverrides = null;
      if (Module["arguments"]) arguments_ = Module["arguments"];
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      var wasmBinary = Module["wasmBinary"];
      var wasmMemory;
      var ABORT = false;
      var EXITSTATUS;
      var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;
      var runtimeInitialized = false;
      var isFileURI = (filename) => filename.startsWith("file://");
      function updateMemoryViews() {
        var b = wasmMemory.buffer;
        Module["HEAP8"] = HEAP8 = new Int8Array(b);
        Module["HEAP16"] = HEAP16 = new Int16Array(b);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
        Module["HEAP32"] = HEAP32 = new Int32Array(b);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
        Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
        Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
      }
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(onPreRuns);
      }
      function initRuntime() {
        runtimeInitialized = true;
        wasmExports["Wf"]();
      }
      function preMain() {
      }
      function postRun() {
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(onPostRuns);
      }
      var runDependencies = 0;
      var dependenciesFulfilled = null;
      function addRunDependency(id) {
        runDependencies++;
        Module["monitorRunDependencies"]?.(runDependencies);
      }
      function removeRunDependency(id) {
        runDependencies--;
        Module["monitorRunDependencies"]?.(runDependencies);
        if (runDependencies == 0) {
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      function abort(what) {
        Module["onAbort"]?.(what);
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        what += ". Build with -sASSERTIONS for more info.";
        var e = new WebAssembly.RuntimeError(what);
        readyPromiseReject(e);
        throw e;
      }
      var wasmBinaryFile;
      function findWasmBinary() {
        if (Module["locateFile"]) {
          return locateFile("render_wasm.wasm");
        }
        return new URL("render_wasm.wasm", import_meta.url).href;
      }
      function getBinarySync(file) {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      }
      async function getWasmBinary(binaryFile) {
        if (!wasmBinary) {
          try {
            var response = await readAsync(binaryFile);
            return new Uint8Array(response);
          } catch {
          }
        }
        return getBinarySync(binaryFile);
      }
      async function instantiateArrayBuffer(binaryFile, imports) {
        try {
          var binary = await getWasmBinary(binaryFile);
          var instance = await WebAssembly.instantiate(binary, imports);
          return instance;
        } catch (reason) {
          err(`failed to asynchronously prepare wasm: ${reason}`);
          abort(reason);
        }
      }
      async function instantiateAsync(binary, binaryFile, imports) {
        if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !ENVIRONMENT_IS_NODE) {
          try {
            var response = fetch(binaryFile, { credentials: "same-origin" });
            var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
            return instantiationResult;
          } catch (reason) {
            err(`wasm streaming compile failed: ${reason}`);
            err("falling back to ArrayBuffer instantiation");
          }
        }
        return instantiateArrayBuffer(binaryFile, imports);
      }
      function getWasmImports() {
        return { a: wasmImports };
      }
      async function createWasm() {
        function receiveInstance(instance, module) {
          wasmExports = instance.exports;
          wasmMemory = wasmExports["Vf"];
          updateMemoryViews();
          wasmTable = wasmExports["Xf"];
          removeRunDependency("wasm-instantiate");
          return wasmExports;
        }
        addRunDependency("wasm-instantiate");
        function receiveInstantiationResult(result2) {
          return receiveInstance(result2["instance"]);
        }
        var info = getWasmImports();
        if (Module["instantiateWasm"]) {
          return new Promise((resolve, reject) => {
            Module["instantiateWasm"](info, (mod, inst) => {
              receiveInstance(mod, inst);
              resolve(mod.exports);
            });
          });
        }
        wasmBinaryFile ??= findWasmBinary();
        try {
          var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
          var exports = receiveInstantiationResult(result);
          return exports;
        } catch (e) {
          readyPromiseReject(e);
          return Promise.reject(e);
        }
      }
      class ExitStatus {
        name = "ExitStatus";
        constructor(status) {
          this.message = `Program terminated with exit(${status})`;
          this.status = status;
        }
      }
      var callRuntimeCallbacks = (callbacks) => {
        while (callbacks.length > 0) {
          callbacks.shift()(Module);
        }
      };
      var onPostRuns = [];
      var addOnPostRun = (cb) => onPostRuns.unshift(cb);
      var onPreRuns = [];
      var addOnPreRun = (cb) => onPreRuns.unshift(cb);
      var noExitRuntime = Module["noExitRuntime"] || true;
      var stackRestore = (val) => __emscripten_stack_restore(val);
      var stackSave = () => _emscripten_stack_get_current();
      var exceptionCaught = [];
      var uncaughtExceptionCount = 0;
      var ___cxa_begin_catch = (ptr2) => {
        var info = new ExceptionInfo(ptr2);
        if (!info.get_caught()) {
          info.set_caught(true);
          uncaughtExceptionCount--;
        }
        info.set_rethrown(false);
        exceptionCaught.push(info);
        ___cxa_increment_exception_refcount(ptr2);
        return ___cxa_get_exception_ptr(ptr2);
      };
      var exceptionLast = 0;
      var ___cxa_end_catch = () => {
        _setThrew(0, 0);
        var info = exceptionCaught.pop();
        ___cxa_decrement_exception_refcount(info.excPtr);
        exceptionLast = 0;
      };
      class ExceptionInfo {
        constructor(excPtr) {
          this.excPtr = excPtr;
          this.ptr = excPtr - 24;
        }
        set_type(type) {
          HEAPU32[this.ptr + 4 >> 2] = type;
        }
        get_type() {
          return HEAPU32[this.ptr + 4 >> 2];
        }
        set_destructor(destructor) {
          HEAPU32[this.ptr + 8 >> 2] = destructor;
        }
        get_destructor() {
          return HEAPU32[this.ptr + 8 >> 2];
        }
        set_caught(caught) {
          caught = caught ? 1 : 0;
          HEAP8[this.ptr + 12] = caught;
        }
        get_caught() {
          return HEAP8[this.ptr + 12] != 0;
        }
        set_rethrown(rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[this.ptr + 13] = rethrown;
        }
        get_rethrown() {
          return HEAP8[this.ptr + 13] != 0;
        }
        init(type, destructor) {
          this.set_adjusted_ptr(0);
          this.set_type(type);
          this.set_destructor(destructor);
        }
        set_adjusted_ptr(adjustedPtr) {
          HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
        }
        get_adjusted_ptr() {
          return HEAPU32[this.ptr + 16 >> 2];
        }
      }
      var setTempRet0 = (val) => __emscripten_tempret_set(val);
      var findMatchingCatch = (args) => {
        var thrown = exceptionLast;
        if (!thrown) {
          setTempRet0(0);
          return 0;
        }
        var info = new ExceptionInfo(thrown);
        info.set_adjusted_ptr(thrown);
        var thrownType = info.get_type();
        if (!thrownType) {
          setTempRet0(0);
          return thrown;
        }
        for (var caughtType of args) {
          if (caughtType === 0 || caughtType === thrownType) {
            break;
          }
          var adjusted_ptr_addr = info.ptr + 16;
          if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
            setTempRet0(caughtType);
            return thrown;
          }
        }
        setTempRet0(thrownType);
        return thrown;
      };
      var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
      var ___cxa_find_matching_catch_4 = (arg0, arg1) => findMatchingCatch([arg0, arg1]);
      var ___cxa_throw = (ptr2, type, destructor) => {
        var info = new ExceptionInfo(ptr2);
        info.init(type, destructor);
        exceptionLast = ptr2;
        uncaughtExceptionCount++;
        throw exceptionLast;
      };
      var ___resumeException = (ptr2) => {
        if (!exceptionLast) {
          exceptionLast = ptr2;
        }
        throw exceptionLast;
      };
      var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
      var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
          return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        }
        var str = "";
        while (idx < endPtr) {
          var u0 = heapOrArray[idx++];
          if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue;
          }
          var u1 = heapOrArray[idx++] & 63;
          if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }
          var u2 = heapOrArray[idx++] & 63;
          if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
          }
          if (u0 < 65536) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          }
        }
        return str;
      };
      var UTF8ToString = (ptr2, maxBytesToRead) => ptr2 ? UTF8ArrayToString(HEAPU8, ptr2, maxBytesToRead) : "";
      var SYSCALLS = { varargs: void 0, getStr(ptr2) {
        var ret = UTF8ToString(ptr2);
        return ret;
      } };
      function ___syscall_fcntl64(fd, cmd, varargs) {
        SYSCALLS.varargs = varargs;
        return 0;
      }
      var ___syscall_fstat64 = (fd, buf) => {
      };
      var ___syscall_getcwd = (buf, size) => {
      };
      function ___syscall_ioctl(fd, op, varargs) {
        SYSCALLS.varargs = varargs;
        return 0;
      }
      var ___syscall_lstat64 = (path, buf) => {
      };
      var ___syscall_newfstatat = (dirfd, path, buf, flags) => {
      };
      function ___syscall_openat(dirfd, path, flags, varargs) {
        SYSCALLS.varargs = varargs;
      }
      var ___syscall_stat64 = (path, buf) => {
      };
      var __abort_js = () => abort("");
      var __emscripten_throw_longjmp = () => {
        throw Infinity;
      };
      var INT53_MAX = 9007199254740992;
      var INT53_MIN = -9007199254740992;
      var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
      function __gmtime_js(time, tmPtr) {
        time = bigintToI53Checked(time);
        var date = new Date(time * 1e3);
        HEAP32[tmPtr >> 2] = date.getUTCSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
        HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
        HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
        var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
        var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
      }
      function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
        offset = bigintToI53Checked(offset);
        return -52;
      }
      function __munmap_js(addr, len, prot, flags, fd, offset) {
        offset = bigintToI53Checked(offset);
      }
      var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var u = str.charCodeAt(i2);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i2);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      };
      var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      var __tzset_js = (timezone, daylight, std_name, dst_name) => {
        var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        var winter = new Date(currentYear, 0, 1);
        var summer = new Date(currentYear, 6, 1);
        var winterOffset = winter.getTimezoneOffset();
        var summerOffset = summer.getTimezoneOffset();
        var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
        HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
        HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
        var extractZone = (timezoneOffset) => {
          var sign = timezoneOffset >= 0 ? "-" : "+";
          var absOffset = Math.abs(timezoneOffset);
          var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
          var minutes = String(absOffset % 60).padStart(2, "0");
          return `UTC${sign}${hours}${minutes}`;
        };
        var winterName = extractZone(winterOffset);
        var summerName = extractZone(summerOffset);
        if (summerOffset < winterOffset) {
          stringToUTF8(winterName, std_name, 17);
          stringToUTF8(summerName, dst_name, 17);
        } else {
          stringToUTF8(winterName, dst_name, 17);
          stringToUTF8(summerName, std_name, 17);
        }
      };
      var _emscripten_get_now = () => performance.now();
      var _emscripten_date_now = () => Date.now();
      var nowIsMonotonic = 1;
      var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
      function _clock_time_get(clk_id, ignored_precision, ptime) {
        ignored_precision = bigintToI53Checked(ignored_precision);
        if (!checkWasiClock(clk_id)) {
          return 28;
        }
        var now;
        if (clk_id === 0) {
          now = _emscripten_date_now();
        } else if (nowIsMonotonic) {
          now = _emscripten_get_now();
        } else {
          return 52;
        }
        var nsec = Math.round(now * 1e3 * 1e3);
        HEAP64[ptime >> 3] = BigInt(nsec);
        return 0;
      }
      var GLctx;
      var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
        var ext = ctx.getExtension("ANGLE_instanced_arrays");
        if (ext) {
          ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
          ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
          ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
          return 1;
        }
      };
      var webgl_enable_OES_vertex_array_object = (ctx) => {
        var ext = ctx.getExtension("OES_vertex_array_object");
        if (ext) {
          ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
          ctx["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
          ctx["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
          ctx["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
          return 1;
        }
      };
      var webgl_enable_WEBGL_draw_buffers = (ctx) => {
        var ext = ctx.getExtension("WEBGL_draw_buffers");
        if (ext) {
          ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
          return 1;
        }
      };
      var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));
      var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
      var webgl_enable_EXT_polygon_offset_clamp = (ctx) => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
      var webgl_enable_EXT_clip_control = (ctx) => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
      var webgl_enable_WEBGL_polygon_mode = (ctx) => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
      var webgl_enable_WEBGL_multi_draw = (ctx) => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
      var getEmscriptenSupportedExtensions = (ctx) => {
        var supportedExtensions = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance", "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode"];
        return (ctx.getSupportedExtensions() || []).filter((ext) => supportedExtensions.includes(ext));
      };
      var GL = { counter: 1, buffers: [], programs: [], framebuffers: [], renderbuffers: [], textures: [], shaders: [], vaos: [], contexts: [], offscreenCanvases: {}, queries: [], samplers: [], transformFeedbacks: [], syncs: [], stringCache: {}, stringiCache: {}, unpackAlignment: 4, unpackRowLength: 0, recordError: (errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      }, getNewId: (table) => {
        var ret = GL.counter++;
        for (var i2 = table.length; i2 < ret; i2++) {
          table[i2] = null;
        }
        return ret;
      }, genObject: (n, buffers, createFunction, objectTable) => {
        for (var i2 = 0; i2 < n; i2++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(1282);
          }
          HEAP32[buffers + i2 * 4 >> 2] = id;
        }
      }, getSource: (shader, count, string, length) => {
        var source = "";
        for (var i2 = 0; i2 < count; ++i2) {
          var len = length ? HEAPU32[length + i2 * 4 >> 2] : void 0;
          source += UTF8ToString(HEAPU32[string + i2 * 4 >> 2], len);
        }
        return source;
      }, createContext: (canvas, webGLContextAttributes) => {
        if (!canvas.getContextSafariWebGL2Fixed) {
          let fixedGetContext = function(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
          };
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          canvas.getContext = fixedGetContext;
        }
        var ctx = webGLContextAttributes.majorVersion > 1 ? canvas.getContext("webgl2", webGLContextAttributes) : canvas.getContext("webgl", webGLContextAttributes);
        if (!ctx) return 0;
        var handle = GL.registerContext(ctx, webGLContextAttributes);
        return handle;
      }, registerContext: (ctx, webGLContextAttributes) => {
        var handle = GL.getNewId(GL.contexts);
        var context = { handle, attributes: webGLContextAttributes, version: webGLContextAttributes.majorVersion, GLctx: ctx };
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
        return handle;
      }, makeContextCurrent: (contextHandle) => {
        GL.currentContext = GL.contexts[contextHandle];
        Module["ctx"] = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      }, getContext: (contextHandle) => GL.contexts[contextHandle], deleteContext: (contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == "object") {
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        if (GL.contexts[contextHandle]?.GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = void 0;
        }
        GL.contexts[contextHandle] = null;
      }, initExtensions: (context) => {
        context ||= GL.currentContext;
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
        var GLctx2 = context.GLctx;
        webgl_enable_WEBGL_multi_draw(GLctx2);
        webgl_enable_EXT_polygon_offset_clamp(GLctx2);
        webgl_enable_EXT_clip_control(GLctx2);
        webgl_enable_WEBGL_polygon_mode(GLctx2);
        webgl_enable_ANGLE_instanced_arrays(GLctx2);
        webgl_enable_OES_vertex_array_object(GLctx2);
        webgl_enable_WEBGL_draw_buffers(GLctx2);
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx2);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx2);
        if (context.version >= 2) {
          GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query_webgl2");
        }
        if (context.version < 2 || !GLctx2.disjointTimerQueryExt) {
          GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query");
        }
        getEmscriptenSupportedExtensions(GLctx2).forEach((ext) => {
          if (!ext.includes("lose_context") && !ext.includes("debug")) {
            GLctx2.getExtension(ext);
          }
        });
      } };
      var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
      var _emscripten_glActiveTexture = _glActiveTexture;
      var _glAttachShader = (program, shader) => {
        GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
      };
      var _emscripten_glAttachShader = _glAttachShader;
      var _glBeginQuery = (target, id) => {
        GLctx.beginQuery(target, GL.queries[id]);
      };
      var _emscripten_glBeginQuery = _glBeginQuery;
      var _glBeginQueryEXT = (target, id) => {
        GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
      };
      var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;
      var _glBeginTransformFeedback = (x0) => GLctx.beginTransformFeedback(x0);
      var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;
      var _glBindAttribLocation = (program, index, name) => {
        GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
      };
      var _emscripten_glBindAttribLocation = _glBindAttribLocation;
      var _glBindBuffer = (target, buffer) => {
        if (target == 35051) {
          GLctx.currentPixelPackBufferBinding = buffer;
        } else if (target == 35052) {
          GLctx.currentPixelUnpackBufferBinding = buffer;
        }
        GLctx.bindBuffer(target, GL.buffers[buffer]);
      };
      var _emscripten_glBindBuffer = _glBindBuffer;
      var _glBindBufferBase = (target, index, buffer) => {
        GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
      };
      var _emscripten_glBindBufferBase = _glBindBufferBase;
      var _glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
        GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
      };
      var _emscripten_glBindBufferRange = _glBindBufferRange;
      var _glBindFramebuffer = (target, framebuffer) => {
        GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
      };
      var _emscripten_glBindFramebuffer = _glBindFramebuffer;
      var _glBindRenderbuffer = (target, renderbuffer) => {
        GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
      };
      var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;
      var _glBindSampler = (unit, sampler) => {
        GLctx.bindSampler(unit, GL.samplers[sampler]);
      };
      var _emscripten_glBindSampler = _glBindSampler;
      var _glBindTexture = (target, texture) => {
        GLctx.bindTexture(target, GL.textures[texture]);
      };
      var _emscripten_glBindTexture = _glBindTexture;
      var _glBindTransformFeedback = (target, id) => {
        GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
      };
      var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;
      var _glBindVertexArray = (vao) => {
        GLctx.bindVertexArray(GL.vaos[vao]);
      };
      var _emscripten_glBindVertexArray = _glBindVertexArray;
      var _glBindVertexArrayOES = _glBindVertexArray;
      var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;
      var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
      var _emscripten_glBlendColor = _glBlendColor;
      var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
      var _emscripten_glBlendEquation = _glBlendEquation;
      var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
      var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;
      var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
      var _emscripten_glBlendFunc = _glBlendFunc;
      var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
      var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;
      var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
      var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;
      var _glBufferData = (target, size, data, usage) => {
        if (GL.currentContext.version >= 2) {
          if (data && size) {
            GLctx.bufferData(target, HEAPU8, usage, data, size);
          } else {
            GLctx.bufferData(target, size, usage);
          }
          return;
        }
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
      };
      var _emscripten_glBufferData = _glBufferData;
      var _glBufferSubData = (target, offset, size, data) => {
        if (GL.currentContext.version >= 2) {
          size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
          return;
        }
        GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size));
      };
      var _emscripten_glBufferSubData = _glBufferSubData;
      var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
      var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;
      var _glClear = (x0) => GLctx.clear(x0);
      var _emscripten_glClear = _glClear;
      var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);
      var _emscripten_glClearBufferfi = _glClearBufferfi;
      var _glClearBufferfv = (buffer, drawbuffer, value) => {
        GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, value >> 2);
      };
      var _emscripten_glClearBufferfv = _glClearBufferfv;
      var _glClearBufferiv = (buffer, drawbuffer, value) => {
        GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, value >> 2);
      };
      var _emscripten_glClearBufferiv = _glClearBufferiv;
      var _glClearBufferuiv = (buffer, drawbuffer, value) => {
        GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, value >> 2);
      };
      var _emscripten_glClearBufferuiv = _glClearBufferuiv;
      var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
      var _emscripten_glClearColor = _glClearColor;
      var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
      var _emscripten_glClearDepthf = _glClearDepthf;
      var _glClearStencil = (x0) => GLctx.clearStencil(x0);
      var _emscripten_glClearStencil = _glClearStencil;
      var _glClientWaitSync = (sync, flags, timeout) => {
        timeout = Number(timeout);
        return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
      };
      var _emscripten_glClientWaitSync = _glClientWaitSync;
      var _glClipControlEXT = (origin, depth) => {
        GLctx.extClipControl["clipControlEXT"](origin, depth);
      };
      var _emscripten_glClipControlEXT = _glClipControlEXT;
      var _glColorMask = (red, green, blue, alpha) => {
        GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
      };
      var _emscripten_glColorMask = _glColorMask;
      var _glCompileShader = (shader) => {
        GLctx.compileShader(GL.shaders[shader]);
      };
      var _emscripten_glCompileShader = _glCompileShader;
      var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
            GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
            return;
          }
          GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
          return;
        }
        GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray(data, data + imageSize));
      };
      var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;
      var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
        } else {
          GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
        }
      };
      var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;
      var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
            GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
            return;
          }
          GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
          return;
        }
        GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray(data, data + imageSize));
      };
      var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;
      var _glCompressedTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
        } else {
          GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize);
        }
      };
      var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;
      var _glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
      var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;
      var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
      var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;
      var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
      var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;
      var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);
      var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;
      var _glCreateProgram = () => {
        var id = GL.getNewId(GL.programs);
        var program = GLctx.createProgram();
        program.name = id;
        program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
        program.uniformIdCounter = 1;
        GL.programs[id] = program;
        return id;
      };
      var _emscripten_glCreateProgram = _glCreateProgram;
      var _glCreateShader = (shaderType) => {
        var id = GL.getNewId(GL.shaders);
        GL.shaders[id] = GLctx.createShader(shaderType);
        return id;
      };
      var _emscripten_glCreateShader = _glCreateShader;
      var _glCullFace = (x0) => GLctx.cullFace(x0);
      var _emscripten_glCullFace = _glCullFace;
      var _glDeleteBuffers = (n, buffers) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[buffers + i2 * 4 >> 2];
          var buffer = GL.buffers[id];
          if (!buffer) continue;
          GLctx.deleteBuffer(buffer);
          buffer.name = 0;
          GL.buffers[id] = null;
          if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
          if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
        }
      };
      var _emscripten_glDeleteBuffers = _glDeleteBuffers;
      var _glDeleteFramebuffers = (n, framebuffers) => {
        for (var i2 = 0; i2 < n; ++i2) {
          var id = HEAP32[framebuffers + i2 * 4 >> 2];
          var framebuffer = GL.framebuffers[id];
          if (!framebuffer) continue;
          GLctx.deleteFramebuffer(framebuffer);
          framebuffer.name = 0;
          GL.framebuffers[id] = null;
        }
      };
      var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;
      var _glDeleteProgram = (id) => {
        if (!id) return;
        var program = GL.programs[id];
        if (!program) {
          GL.recordError(1281);
          return;
        }
        GLctx.deleteProgram(program);
        program.name = 0;
        GL.programs[id] = null;
      };
      var _emscripten_glDeleteProgram = _glDeleteProgram;
      var _glDeleteQueries = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[ids + i2 * 4 >> 2];
          var query = GL.queries[id];
          if (!query) continue;
          GLctx.deleteQuery(query);
          GL.queries[id] = null;
        }
      };
      var _emscripten_glDeleteQueries = _glDeleteQueries;
      var _glDeleteQueriesEXT = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[ids + i2 * 4 >> 2];
          var query = GL.queries[id];
          if (!query) continue;
          GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
          GL.queries[id] = null;
        }
      };
      var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;
      var _glDeleteRenderbuffers = (n, renderbuffers) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[renderbuffers + i2 * 4 >> 2];
          var renderbuffer = GL.renderbuffers[id];
          if (!renderbuffer) continue;
          GLctx.deleteRenderbuffer(renderbuffer);
          renderbuffer.name = 0;
          GL.renderbuffers[id] = null;
        }
      };
      var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;
      var _glDeleteSamplers = (n, samplers) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[samplers + i2 * 4 >> 2];
          var sampler = GL.samplers[id];
          if (!sampler) continue;
          GLctx.deleteSampler(sampler);
          sampler.name = 0;
          GL.samplers[id] = null;
        }
      };
      var _emscripten_glDeleteSamplers = _glDeleteSamplers;
      var _glDeleteShader = (id) => {
        if (!id) return;
        var shader = GL.shaders[id];
        if (!shader) {
          GL.recordError(1281);
          return;
        }
        GLctx.deleteShader(shader);
        GL.shaders[id] = null;
      };
      var _emscripten_glDeleteShader = _glDeleteShader;
      var _glDeleteSync = (id) => {
        if (!id) return;
        var sync = GL.syncs[id];
        if (!sync) {
          GL.recordError(1281);
          return;
        }
        GLctx.deleteSync(sync);
        sync.name = 0;
        GL.syncs[id] = null;
      };
      var _emscripten_glDeleteSync = _glDeleteSync;
      var _glDeleteTextures = (n, textures) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[textures + i2 * 4 >> 2];
          var texture = GL.textures[id];
          if (!texture) continue;
          GLctx.deleteTexture(texture);
          texture.name = 0;
          GL.textures[id] = null;
        }
      };
      var _emscripten_glDeleteTextures = _glDeleteTextures;
      var _glDeleteTransformFeedbacks = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[ids + i2 * 4 >> 2];
          var transformFeedback = GL.transformFeedbacks[id];
          if (!transformFeedback) continue;
          GLctx.deleteTransformFeedback(transformFeedback);
          transformFeedback.name = 0;
          GL.transformFeedbacks[id] = null;
        }
      };
      var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;
      var _glDeleteVertexArrays = (n, vaos) => {
        for (var i2 = 0; i2 < n; i2++) {
          var id = HEAP32[vaos + i2 * 4 >> 2];
          GLctx.deleteVertexArray(GL.vaos[id]);
          GL.vaos[id] = null;
        }
      };
      var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;
      var _glDeleteVertexArraysOES = _glDeleteVertexArrays;
      var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;
      var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
      var _emscripten_glDepthFunc = _glDepthFunc;
      var _glDepthMask = (flag) => {
        GLctx.depthMask(!!flag);
      };
      var _emscripten_glDepthMask = _glDepthMask;
      var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
      var _emscripten_glDepthRangef = _glDepthRangef;
      var _glDetachShader = (program, shader) => {
        GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
      };
      var _emscripten_glDetachShader = _glDetachShader;
      var _glDisable = (x0) => GLctx.disable(x0);
      var _emscripten_glDisable = _glDisable;
      var _glDisableVertexAttribArray = (index) => {
        GLctx.disableVertexAttribArray(index);
      };
      var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;
      var _glDrawArrays = (mode, first, count) => {
        GLctx.drawArrays(mode, first, count);
      };
      var _emscripten_glDrawArrays = _glDrawArrays;
      var _glDrawArraysInstanced = (mode, first, count, primcount) => {
        GLctx.drawArraysInstanced(mode, first, count, primcount);
      };
      var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;
      var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;
      var _glDrawArraysInstancedARB = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedARB = _glDrawArraysInstancedARB;
      var _glDrawArraysInstancedBaseInstanceWEBGL = (mode, first, count, instanceCount, baseInstance) => {
        GLctx.dibvbi["drawArraysInstancedBaseInstanceWEBGL"](mode, first, count, instanceCount, baseInstance);
      };
      var _emscripten_glDrawArraysInstancedBaseInstanceWEBGL = _glDrawArraysInstancedBaseInstanceWEBGL;
      var _glDrawArraysInstancedEXT = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedEXT = _glDrawArraysInstancedEXT;
      var _glDrawArraysInstancedNV = _glDrawArraysInstanced;
      var _emscripten_glDrawArraysInstancedNV = _glDrawArraysInstancedNV;
      var tempFixedLengthArray = [];
      var _glDrawBuffers = (n, bufs) => {
        var bufArray = tempFixedLengthArray[n];
        for (var i2 = 0; i2 < n; i2++) {
          bufArray[i2] = HEAP32[bufs + i2 * 4 >> 2];
        }
        GLctx.drawBuffers(bufArray);
      };
      var _emscripten_glDrawBuffers = _glDrawBuffers;
      var _glDrawBuffersEXT = _glDrawBuffers;
      var _emscripten_glDrawBuffersEXT = _glDrawBuffersEXT;
      var _glDrawBuffersWEBGL = _glDrawBuffers;
      var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;
      var _glDrawElements = (mode, count, type, indices) => {
        GLctx.drawElements(mode, count, type, indices);
      };
      var _emscripten_glDrawElements = _glDrawElements;
      var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
        GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
      };
      var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;
      var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;
      var _glDrawElementsInstancedARB = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedARB = _glDrawElementsInstancedARB;
      var _glDrawElementsInstancedBaseVertexBaseInstanceWEBGL = (mode, count, type, offset, instanceCount, baseVertex, baseinstance) => {
        GLctx.dibvbi["drawElementsInstancedBaseVertexBaseInstanceWEBGL"](mode, count, type, offset, instanceCount, baseVertex, baseinstance);
      };
      var _emscripten_glDrawElementsInstancedBaseVertexBaseInstanceWEBGL = _glDrawElementsInstancedBaseVertexBaseInstanceWEBGL;
      var _glDrawElementsInstancedEXT = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedEXT = _glDrawElementsInstancedEXT;
      var _glDrawElementsInstancedNV = _glDrawElementsInstanced;
      var _emscripten_glDrawElementsInstancedNV = _glDrawElementsInstancedNV;
      var _glDrawRangeElements = (mode, start, end, count, type, indices) => {
        _glDrawElements(mode, count, type, indices);
      };
      var _emscripten_glDrawRangeElements = _glDrawRangeElements;
      var _glEnable = (x0) => GLctx.enable(x0);
      var _emscripten_glEnable = _glEnable;
      var _glEnableVertexAttribArray = (index) => {
        GLctx.enableVertexAttribArray(index);
      };
      var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;
      var _glEndQuery = (x0) => GLctx.endQuery(x0);
      var _emscripten_glEndQuery = _glEndQuery;
      var _glEndQueryEXT = (target) => {
        GLctx.disjointTimerQueryExt["endQueryEXT"](target);
      };
      var _emscripten_glEndQueryEXT = _glEndQueryEXT;
      var _glEndTransformFeedback = () => GLctx.endTransformFeedback();
      var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;
      var _glFenceSync = (condition, flags) => {
        var sync = GLctx.fenceSync(condition, flags);
        if (sync) {
          var id = GL.getNewId(GL.syncs);
          sync.name = id;
          GL.syncs[id] = sync;
          return id;
        }
        return 0;
      };
      var _emscripten_glFenceSync = _glFenceSync;
      var _glFinish = () => GLctx.finish();
      var _emscripten_glFinish = _glFinish;
      var _glFlush = () => GLctx.flush();
      var _emscripten_glFlush = _glFlush;
      var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
        GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
      };
      var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;
      var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
        GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
      };
      var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;
      var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
        GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
      };
      var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;
      var _glFrontFace = (x0) => GLctx.frontFace(x0);
      var _emscripten_glFrontFace = _glFrontFace;
      var _glGenBuffers = (n, buffers) => {
        GL.genObject(n, buffers, "createBuffer", GL.buffers);
      };
      var _emscripten_glGenBuffers = _glGenBuffers;
      var _glGenFramebuffers = (n, ids) => {
        GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
      };
      var _emscripten_glGenFramebuffers = _glGenFramebuffers;
      var _glGenQueries = (n, ids) => {
        GL.genObject(n, ids, "createQuery", GL.queries);
      };
      var _emscripten_glGenQueries = _glGenQueries;
      var _glGenQueriesEXT = (n, ids) => {
        for (var i2 = 0; i2 < n; i2++) {
          var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
          if (!query) {
            GL.recordError(1282);
            while (i2 < n) HEAP32[ids + i2++ * 4 >> 2] = 0;
            return;
          }
          var id = GL.getNewId(GL.queries);
          query.name = id;
          GL.queries[id] = query;
          HEAP32[ids + i2 * 4 >> 2] = id;
        }
      };
      var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;
      var _glGenRenderbuffers = (n, renderbuffers) => {
        GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
      };
      var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;
      var _glGenSamplers = (n, samplers) => {
        GL.genObject(n, samplers, "createSampler", GL.samplers);
      };
      var _emscripten_glGenSamplers = _glGenSamplers;
      var _glGenTextures = (n, textures) => {
        GL.genObject(n, textures, "createTexture", GL.textures);
      };
      var _emscripten_glGenTextures = _glGenTextures;
      var _glGenTransformFeedbacks = (n, ids) => {
        GL.genObject(n, ids, "createTransformFeedback", GL.transformFeedbacks);
      };
      var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;
      var _glGenVertexArrays = (n, arrays) => {
        GL.genObject(n, arrays, "createVertexArray", GL.vaos);
      };
      var _emscripten_glGenVertexArrays = _glGenVertexArrays;
      var _glGenVertexArraysOES = _glGenVertexArrays;
      var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;
      var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
      var _emscripten_glGenerateMipmap = _glGenerateMipmap;
      var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
        program = GL.programs[program];
        var info = GLctx[funcName](program, index);
        if (info) {
          var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
          if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
          if (size) HEAP32[size >> 2] = info.size;
          if (type) HEAP32[type >> 2] = info.type;
        }
      };
      var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
      var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;
      var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
      var _emscripten_glGetActiveUniform = _glGetActiveUniform;
      var _glGetActiveUniformBlockName = (program, uniformBlockIndex, bufSize, length, uniformBlockName) => {
        program = GL.programs[program];
        var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
        if (!result) return;
        if (uniformBlockName && bufSize > 0) {
          var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
          if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
        } else {
          if (length) HEAP32[length >> 2] = 0;
        }
      };
      var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;
      var _glGetActiveUniformBlockiv = (program, uniformBlockIndex, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        program = GL.programs[program];
        if (pname == 35393) {
          var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
          HEAP32[params >> 2] = name.length + 1;
          return;
        }
        var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
        if (result === null) return;
        if (pname == 35395) {
          for (var i2 = 0; i2 < result.length; i2++) {
            HEAP32[params + i2 * 4 >> 2] = result[i2];
          }
        } else {
          HEAP32[params >> 2] = result;
        }
      };
      var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;
      var _glGetActiveUniformsiv = (program, uniformCount, uniformIndices, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        if (uniformCount > 0 && uniformIndices == 0) {
          GL.recordError(1281);
          return;
        }
        program = GL.programs[program];
        var ids = [];
        for (var i2 = 0; i2 < uniformCount; i2++) {
          ids.push(HEAP32[uniformIndices + i2 * 4 >> 2]);
        }
        var result = GLctx.getActiveUniforms(program, ids, pname);
        if (!result) return;
        var len = result.length;
        for (var i2 = 0; i2 < len; i2++) {
          HEAP32[params + i2 * 4 >> 2] = result[i2];
        }
      };
      var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;
      var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
        var result = GLctx.getAttachedShaders(GL.programs[program]);
        var len = result.length;
        if (len > maxCount) {
          len = maxCount;
        }
        HEAP32[count >> 2] = len;
        for (var i2 = 0; i2 < len; ++i2) {
          var id = GL.shaders.indexOf(result[i2]);
          HEAP32[shaders + i2 * 4 >> 2] = id;
        }
      };
      var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;
      var _glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
      var _emscripten_glGetAttribLocation = _glGetAttribLocation;
      var writeI53ToI64 = (ptr2, num) => {
        HEAPU32[ptr2 >> 2] = num;
        var lower = HEAPU32[ptr2 >> 2];
        HEAPU32[ptr2 + 4 >> 2] = (num - lower) / 4294967296;
      };
      var webglGetExtensions = () => {
        var exts = getEmscriptenSupportedExtensions(GLctx);
        exts = exts.concat(exts.map((e) => "GL_" + e));
        return exts;
      };
      var emscriptenWebGLGet = (name_, p, type) => {
        if (!p) {
          GL.recordError(1281);
          return;
        }
        var ret = void 0;
        switch (name_) {
          case 36346:
            ret = 1;
            break;
          case 36344:
            if (type != 0 && type != 1) {
              GL.recordError(1280);
            }
            return;
          case 34814:
          case 36345:
            ret = 0;
            break;
          case 34466:
            var formats = GLctx.getParameter(34467);
            ret = formats ? formats.length : 0;
            break;
          case 33309:
            if (GL.currentContext.version < 2) {
              GL.recordError(1282);
              return;
            }
            ret = webglGetExtensions().length;
            break;
          case 33307:
          case 33308:
            if (GL.currentContext.version < 2) {
              GL.recordError(1280);
              return;
            }
            ret = name_ == 33307 ? 3 : 0;
            break;
        }
        if (ret === void 0) {
          var result = GLctx.getParameter(name_);
          switch (typeof result) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(1280);
              return;
            case "object":
              if (result === null) {
                switch (name_) {
                  case 34964:
                  case 35725:
                  case 34965:
                  case 36006:
                  case 36007:
                  case 32873:
                  case 34229:
                  case 36662:
                  case 36663:
                  case 35053:
                  case 35055:
                  case 36010:
                  case 35097:
                  case 35869:
                  case 32874:
                  case 36389:
                  case 35983:
                  case 35368:
                  case 34068: {
                    ret = 0;
                    break;
                  }
                  default: {
                    GL.recordError(1280);
                    return;
                  }
                }
              } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
                for (var i2 = 0; i2 < result.length; ++i2) {
                  switch (type) {
                    case 0:
                      HEAP32[p + i2 * 4 >> 2] = result[i2];
                      break;
                    case 2:
                      HEAPF32[p + i2 * 4 >> 2] = result[i2];
                      break;
                    case 4:
                      HEAP8[p + i2] = result[i2] ? 1 : 0;
                      break;
                  }
                }
                return;
              } else {
                try {
                  ret = result.name | 0;
                } catch (e) {
                  GL.recordError(1280);
                  err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                  return;
                }
              }
              break;
            default:
              GL.recordError(1280);
              err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`);
              return;
          }
        }
        switch (type) {
          case 1:
            writeI53ToI64(p, ret);
            break;
          case 0:
            HEAP32[p >> 2] = ret;
            break;
          case 2:
            HEAPF32[p >> 2] = ret;
            break;
          case 4:
            HEAP8[p] = ret ? 1 : 0;
            break;
        }
      };
      var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
      var _emscripten_glGetBooleanv = _glGetBooleanv;
      var _glGetBufferParameteri64v = (target, value, data) => {
        if (!data) {
          GL.recordError(1281);
          return;
        }
        writeI53ToI64(data, GLctx.getBufferParameter(target, value));
      };
      var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;
      var _glGetBufferParameteriv = (target, value, data) => {
        if (!data) {
          GL.recordError(1281);
          return;
        }
        HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
      };
      var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;
      var _glGetError = () => {
        var error = GLctx.getError() || GL.lastError;
        GL.lastError = 0;
        return error;
      };
      var _emscripten_glGetError = _glGetError;
      var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
      var _emscripten_glGetFloatv = _glGetFloatv;
      var _glGetFragDataLocation = (program, name) => GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
      var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;
      var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
        var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
        if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
          result = result.name | 0;
        }
        HEAP32[params >> 2] = result;
      };
      var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;
      var emscriptenWebGLGetIndexed = (target, index, data, type) => {
        if (!data) {
          GL.recordError(1281);
          return;
        }
        var result = GLctx.getIndexedParameter(target, index);
        var ret;
        switch (typeof result) {
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "number":
            ret = result;
            break;
          case "object":
            if (result === null) {
              switch (target) {
                case 35983:
                case 35368:
                  ret = 0;
                  break;
                default: {
                  GL.recordError(1280);
                  return;
                }
              }
            } else if (result instanceof WebGLBuffer) {
              ret = result.name | 0;
            } else {
              GL.recordError(1280);
              return;
            }
            break;
          default:
            GL.recordError(1280);
            return;
        }
        switch (type) {
          case 1:
            writeI53ToI64(data, ret);
            break;
          case 0:
            HEAP32[data >> 2] = ret;
            break;
          case 2:
            HEAPF32[data >> 2] = ret;
            break;
          case 4:
            HEAP8[data] = ret ? 1 : 0;
            break;
          default:
            throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type;
        }
      };
      var _glGetInteger64i_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 1);
      var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;
      var _glGetInteger64v = (name_, p) => {
        emscriptenWebGLGet(name_, p, 1);
      };
      var _emscripten_glGetInteger64v = _glGetInteger64v;
      var _glGetIntegeri_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 0);
      var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;
      var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
      var _emscripten_glGetIntegerv = _glGetIntegerv;
      var _glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
        if (bufSize < 0) {
          GL.recordError(1281);
          return;
        }
        if (!params) {
          GL.recordError(1281);
          return;
        }
        var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
        if (ret === null) return;
        for (var i2 = 0; i2 < ret.length && i2 < bufSize; ++i2) {
          HEAP32[params + i2 * 4 >> 2] = ret[i2];
        }
      };
      var _emscripten_glGetInternalformativ = _glGetInternalformativ;
      var _glGetProgramBinary = (program, bufSize, length, binaryFormat, binary) => {
        GL.recordError(1282);
      };
      var _emscripten_glGetProgramBinary = _glGetProgramBinary;
      var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null) log = "(unknown error)";
        var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;
      var _glGetProgramiv = (program, pname, p) => {
        if (!p) {
          GL.recordError(1281);
          return;
        }
        if (program >= GL.counter) {
          GL.recordError(1281);
          return;
        }
        program = GL.programs[program];
        if (pname == 35716) {
          var log = GLctx.getProgramInfoLog(program);
          if (log === null) log = "(unknown error)";
          HEAP32[p >> 2] = log.length + 1;
        } else if (pname == 35719) {
          if (!program.maxUniformLength) {
            var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
            for (var i2 = 0; i2 < numActiveUniforms; ++i2) {
              program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i2).name.length + 1);
            }
          }
          HEAP32[p >> 2] = program.maxUniformLength;
        } else if (pname == 35722) {
          if (!program.maxAttributeLength) {
            var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
            for (var i2 = 0; i2 < numActiveAttributes; ++i2) {
              program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i2).name.length + 1);
            }
          }
          HEAP32[p >> 2] = program.maxAttributeLength;
        } else if (pname == 35381) {
          if (!program.maxUniformBlockNameLength) {
            var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
            for (var i2 = 0; i2 < numActiveUniformBlocks; ++i2) {
              program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i2).length + 1);
            }
          }
          HEAP32[p >> 2] = program.maxUniformBlockNameLength;
        } else {
          HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
        }
      };
      var _emscripten_glGetProgramiv = _glGetProgramiv;
      var _glGetQueryObjecti64vEXT = (id, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        var query = GL.queries[id];
        var param;
        if (GL.currentContext.version < 2) {
          param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
        } else {
          param = GLctx.getQueryParameter(query, pname);
        }
        var ret;
        if (typeof param == "boolean") {
          ret = param ? 1 : 0;
        } else {
          ret = param;
        }
        writeI53ToI64(params, ret);
      };
      var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;
      var _glGetQueryObjectivEXT = (id, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        var query = GL.queries[id];
        var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
        var ret;
        if (typeof param == "boolean") {
          ret = param ? 1 : 0;
        } else {
          ret = param;
        }
        HEAP32[params >> 2] = ret;
      };
      var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;
      var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
      var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;
      var _glGetQueryObjectuiv = (id, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        var query = GL.queries[id];
        var param = GLctx.getQueryParameter(query, pname);
        var ret;
        if (typeof param == "boolean") {
          ret = param ? 1 : 0;
        } else {
          ret = param;
        }
        HEAP32[params >> 2] = ret;
      };
      var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;
      var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
      var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;
      var _glGetQueryiv = (target, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAP32[params >> 2] = GLctx.getQuery(target, pname);
      };
      var _emscripten_glGetQueryiv = _glGetQueryiv;
      var _glGetQueryivEXT = (target, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
      };
      var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;
      var _glGetRenderbufferParameteriv = (target, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
      };
      var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;
      var _glGetSamplerParameterfv = (sampler, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAPF32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
      };
      var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;
      var _glGetSamplerParameteriv = (sampler, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAP32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
      };
      var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;
      var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = "(unknown error)";
        var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;
      var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
        var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
        HEAP32[range >> 2] = result.rangeMin;
        HEAP32[range + 4 >> 2] = result.rangeMax;
        HEAP32[precision >> 2] = result.precision;
      };
      var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;
      var _glGetShaderSource = (shader, bufSize, length, source) => {
        var result = GLctx.getShaderSource(GL.shaders[shader]);
        if (!result) return;
        var numBytesWrittenExclNull = bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _emscripten_glGetShaderSource = _glGetShaderSource;
      var _glGetShaderiv = (shader, pname, p) => {
        if (!p) {
          GL.recordError(1281);
          return;
        }
        if (pname == 35716) {
          var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
          if (log === null) log = "(unknown error)";
          var logLength = log ? log.length + 1 : 0;
          HEAP32[p >> 2] = logLength;
        } else if (pname == 35720) {
          var source = GLctx.getShaderSource(GL.shaders[shader]);
          var sourceLength = source ? source.length + 1 : 0;
          HEAP32[p >> 2] = sourceLength;
        } else {
          HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
        }
      };
      var _emscripten_glGetShaderiv = _glGetShaderiv;
      var lengthBytesUTF8 = (str) => {
        var len = 0;
        for (var i2 = 0; i2 < str.length; ++i2) {
          var c = str.charCodeAt(i2);
          if (c <= 127) {
            len++;
          } else if (c <= 2047) {
            len += 2;
          } else if (c >= 55296 && c <= 57343) {
            len += 4;
            ++i2;
          } else {
            len += 3;
          }
        }
        return len;
      };
      var stringToNewUTF8 = (str) => {
        var size = lengthBytesUTF8(str) + 1;
        var ret = _malloc(size);
        if (ret) stringToUTF8(str, ret, size);
        return ret;
      };
      var _glGetString = (name_) => {
        var ret = GL.stringCache[name_];
        if (!ret) {
          switch (name_) {
            case 7939:
              ret = stringToNewUTF8(webglGetExtensions().join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              var s = GLctx.getParameter(name_);
              if (!s) {
                GL.recordError(1280);
              }
              ret = s ? stringToNewUTF8(s) : 0;
              break;
            case 7938:
              var webGLVersion = GLctx.getParameter(7938);
              var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
              if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
              ret = stringToNewUTF8(glVersion);
              break;
            case 35724:
              var glslVersion = GLctx.getParameter(35724);
              var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
              var ver_num = glslVersion.match(ver_re);
              if (ver_num !== null) {
                if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
                glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
              }
              ret = stringToNewUTF8(glslVersion);
              break;
            default:
              GL.recordError(1280);
          }
          GL.stringCache[name_] = ret;
        }
        return ret;
      };
      var _emscripten_glGetString = _glGetString;
      var _glGetStringi = (name, index) => {
        if (GL.currentContext.version < 2) {
          GL.recordError(1282);
          return 0;
        }
        var stringiCache = GL.stringiCache[name];
        if (stringiCache) {
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281);
            return 0;
          }
          return stringiCache[index];
        }
        switch (name) {
          case 7939:
            var exts = webglGetExtensions().map(stringToNewUTF8);
            stringiCache = GL.stringiCache[name] = exts;
            if (index < 0 || index >= stringiCache.length) {
              GL.recordError(1281);
              return 0;
            }
            return stringiCache[index];
          default:
            GL.recordError(1280);
            return 0;
        }
      };
      var _emscripten_glGetStringi = _glGetStringi;
      var _glGetSynciv = (sync, pname, bufSize, length, values) => {
        if (bufSize < 0) {
          GL.recordError(1281);
          return;
        }
        if (!values) {
          GL.recordError(1281);
          return;
        }
        var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
        if (ret !== null) {
          HEAP32[values >> 2] = ret;
          if (length) HEAP32[length >> 2] = 1;
        }
      };
      var _emscripten_glGetSynciv = _glGetSynciv;
      var _glGetTexParameterfv = (target, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname);
      };
      var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;
      var _glGetTexParameteriv = (target, pname, params) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        HEAP32[params >> 2] = GLctx.getTexParameter(target, pname);
      };
      var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;
      var _glGetTransformFeedbackVarying = (program, index, bufSize, length, size, type, name) => {
        program = GL.programs[program];
        var info = GLctx.getTransformFeedbackVarying(program, index);
        if (!info) return;
        if (name && bufSize > 0) {
          var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
          if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
        } else {
          if (length) HEAP32[length >> 2] = 0;
        }
        if (size) HEAP32[size >> 2] = info.size;
        if (type) HEAP32[type >> 2] = info.type;
      };
      var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;
      var _glGetUniformBlockIndex = (program, uniformBlockName) => GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
      var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;
      var _glGetUniformIndices = (program, uniformCount, uniformNames, uniformIndices) => {
        if (!uniformIndices) {
          GL.recordError(1281);
          return;
        }
        if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
          GL.recordError(1281);
          return;
        }
        program = GL.programs[program];
        var names = [];
        for (var i2 = 0; i2 < uniformCount; i2++) names.push(UTF8ToString(HEAP32[uniformNames + i2 * 4 >> 2]));
        var result = GLctx.getUniformIndices(program, names);
        if (!result) return;
        var len = result.length;
        for (var i2 = 0; i2 < len; i2++) {
          HEAP32[uniformIndices + i2 * 4 >> 2] = result[i2];
        }
      };
      var _emscripten_glGetUniformIndices = _glGetUniformIndices;
      var jstoi_q = (str) => parseInt(str);
      var webglGetLeftBracePos = (name) => name.slice(-1) == "]" && name.lastIndexOf("[");
      var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
        var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i2, j;
        if (!uniformLocsById) {
          program.uniformLocsById = uniformLocsById = {};
          program.uniformArrayNamesById = {};
          var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
          for (i2 = 0; i2 < numActiveUniforms; ++i2) {
            var u = GLctx.getActiveUniform(program, i2);
            var nm = u.name;
            var sz = u.size;
            var lb = webglGetLeftBracePos(nm);
            var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
            var id = program.uniformIdCounter;
            program.uniformIdCounter += sz;
            uniformSizeAndIdsByName[arrayName] = [sz, id];
            for (j = 0; j < sz; ++j) {
              uniformLocsById[id] = j;
              program.uniformArrayNamesById[id++] = arrayName;
            }
          }
        }
      };
      var _glGetUniformLocation = (program, name) => {
        name = UTF8ToString(name);
        if (program = GL.programs[program]) {
          webglPrepareUniformLocationsBeforeFirstUse(program);
          var uniformLocsById = program.uniformLocsById;
          var arrayIndex = 0;
          var uniformBaseName = name;
          var leftBrace = webglGetLeftBracePos(name);
          if (leftBrace > 0) {
            arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
            uniformBaseName = name.slice(0, leftBrace);
          }
          var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
          if (sizeAndId && arrayIndex < sizeAndId[0]) {
            arrayIndex += sizeAndId[1];
            if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
              return arrayIndex;
            }
          }
        } else {
          GL.recordError(1281);
        }
        return -1;
      };
      var _emscripten_glGetUniformLocation = _glGetUniformLocation;
      var webglGetUniformLocation = (location) => {
        var p = GLctx.currentProgram;
        if (p) {
          var webglLoc = p.uniformLocsById[location];
          if (typeof webglLoc == "number") {
            p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
          }
          return webglLoc;
        } else {
          GL.recordError(1282);
        }
      };
      var emscriptenWebGLGetUniform = (program, location, params, type) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        program = GL.programs[program];
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var data = GLctx.getUniform(program, webglGetUniformLocation(location));
        if (typeof data == "number" || typeof data == "boolean") {
          switch (type) {
            case 0:
              HEAP32[params >> 2] = data;
              break;
            case 2:
              HEAPF32[params >> 2] = data;
              break;
          }
        } else {
          for (var i2 = 0; i2 < data.length; i2++) {
            switch (type) {
              case 0:
                HEAP32[params + i2 * 4 >> 2] = data[i2];
                break;
              case 2:
                HEAPF32[params + i2 * 4 >> 2] = data[i2];
                break;
            }
          }
        }
      };
      var _glGetUniformfv = (program, location, params) => {
        emscriptenWebGLGetUniform(program, location, params, 2);
      };
      var _emscripten_glGetUniformfv = _glGetUniformfv;
      var _glGetUniformiv = (program, location, params) => {
        emscriptenWebGLGetUniform(program, location, params, 0);
      };
      var _emscripten_glGetUniformiv = _glGetUniformiv;
      var _glGetUniformuiv = (program, location, params) => emscriptenWebGLGetUniform(program, location, params, 0);
      var _emscripten_glGetUniformuiv = _glGetUniformuiv;
      var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
        if (!params) {
          GL.recordError(1281);
          return;
        }
        var data = GLctx.getVertexAttrib(index, pname);
        if (pname == 34975) {
          HEAP32[params >> 2] = data && data["name"];
        } else if (typeof data == "number" || typeof data == "boolean") {
          switch (type) {
            case 0:
              HEAP32[params >> 2] = data;
              break;
            case 2:
              HEAPF32[params >> 2] = data;
              break;
            case 5:
              HEAP32[params >> 2] = Math.fround(data);
              break;
          }
        } else {
          for (var i2 = 0; i2 < data.length; i2++) {
            switch (type) {
              case 0:
                HEAP32[params + i2 * 4 >> 2] = data[i2];
                break;
              case 2:
                HEAPF32[params + i2 * 4 >> 2] = data[i2];
                break;
              case 5:
                HEAP32[params + i2 * 4 >> 2] = Math.fround(data[i2]);
                break;
            }
          }
        }
      };
      var _glGetVertexAttribIiv = (index, pname, params) => {
        emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
      };
      var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;
      var _glGetVertexAttribIuiv = _glGetVertexAttribIiv;
      var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIuiv;
      var _glGetVertexAttribPointerv = (index, pname, pointer) => {
        if (!pointer) {
          GL.recordError(1281);
          return;
        }
        HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
      };
      var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;
      var _glGetVertexAttribfv = (index, pname, params) => {
        emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
      };
      var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;
      var _glGetVertexAttribiv = (index, pname, params) => {
        emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
      };
      var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;
      var _glHint = (x0, x1) => GLctx.hint(x0, x1);
      var _emscripten_glHint = _glHint;
      var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
        var list = tempFixedLengthArray[numAttachments];
        for (var i2 = 0; i2 < numAttachments; i2++) {
          list[i2] = HEAP32[attachments + i2 * 4 >> 2];
        }
        GLctx.invalidateFramebuffer(target, list);
      };
      var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;
      var _glInvalidateSubFramebuffer = (target, numAttachments, attachments, x, y, width, height) => {
        var list = tempFixedLengthArray[numAttachments];
        for (var i2 = 0; i2 < numAttachments; i2++) {
          list[i2] = HEAP32[attachments + i2 * 4 >> 2];
        }
        GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
      };
      var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;
      var _glIsBuffer = (buffer) => {
        var b = GL.buffers[buffer];
        if (!b) return 0;
        return GLctx.isBuffer(b);
      };
      var _emscripten_glIsBuffer = _glIsBuffer;
      var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
      var _emscripten_glIsEnabled = _glIsEnabled;
      var _glIsFramebuffer = (framebuffer) => {
        var fb = GL.framebuffers[framebuffer];
        if (!fb) return 0;
        return GLctx.isFramebuffer(fb);
      };
      var _emscripten_glIsFramebuffer = _glIsFramebuffer;
      var _glIsProgram = (program) => {
        program = GL.programs[program];
        if (!program) return 0;
        return GLctx.isProgram(program);
      };
      var _emscripten_glIsProgram = _glIsProgram;
      var _glIsQuery = (id) => {
        var query = GL.queries[id];
        if (!query) return 0;
        return GLctx.isQuery(query);
      };
      var _emscripten_glIsQuery = _glIsQuery;
      var _glIsQueryEXT = (id) => {
        var query = GL.queries[id];
        if (!query) return 0;
        return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
      };
      var _emscripten_glIsQueryEXT = _glIsQueryEXT;
      var _glIsRenderbuffer = (renderbuffer) => {
        var rb = GL.renderbuffers[renderbuffer];
        if (!rb) return 0;
        return GLctx.isRenderbuffer(rb);
      };
      var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;
      var _glIsSampler = (id) => {
        var sampler = GL.samplers[id];
        if (!sampler) return 0;
        return GLctx.isSampler(sampler);
      };
      var _emscripten_glIsSampler = _glIsSampler;
      var _glIsShader = (shader) => {
        var s = GL.shaders[shader];
        if (!s) return 0;
        return GLctx.isShader(s);
      };
      var _emscripten_glIsShader = _glIsShader;
      var _glIsSync = (sync) => GLctx.isSync(GL.syncs[sync]);
      var _emscripten_glIsSync = _glIsSync;
      var _glIsTexture = (id) => {
        var texture = GL.textures[id];
        if (!texture) return 0;
        return GLctx.isTexture(texture);
      };
      var _emscripten_glIsTexture = _glIsTexture;
      var _glIsTransformFeedback = (id) => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);
      var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;
      var _glIsVertexArray = (array) => {
        var vao = GL.vaos[array];
        if (!vao) return 0;
        return GLctx.isVertexArray(vao);
      };
      var _emscripten_glIsVertexArray = _glIsVertexArray;
      var _glIsVertexArrayOES = _glIsVertexArray;
      var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;
      var _glLineWidth = (x0) => GLctx.lineWidth(x0);
      var _emscripten_glLineWidth = _glLineWidth;
      var _glLinkProgram = (program) => {
        program = GL.programs[program];
        GLctx.linkProgram(program);
        program.uniformLocsById = 0;
        program.uniformSizeAndIdsByName = {};
      };
      var _emscripten_glLinkProgram = _glLinkProgram;
      var _glMultiDrawArraysInstancedBaseInstanceWEBGL = (mode, firsts, counts, instanceCounts, baseInstances, drawCount) => {
        GLctx.mdibvbi["multiDrawArraysInstancedBaseInstanceWEBGL"](mode, HEAP32, firsts >> 2, HEAP32, counts >> 2, HEAP32, instanceCounts >> 2, HEAPU32, baseInstances >> 2, drawCount);
      };
      var _emscripten_glMultiDrawArraysInstancedBaseInstanceWEBGL = _glMultiDrawArraysInstancedBaseInstanceWEBGL;
      var _glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL = (mode, counts, type, offsets, instanceCounts, baseVertices, baseInstances, drawCount) => {
        GLctx.mdibvbi["multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL"](mode, HEAP32, counts >> 2, type, HEAP32, offsets >> 2, HEAP32, instanceCounts >> 2, HEAP32, baseVertices >> 2, HEAPU32, baseInstances >> 2, drawCount);
      };
      var _emscripten_glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL = _glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL;
      var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();
      var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;
      var _glPixelStorei = (pname, param) => {
        if (pname == 3317) {
          GL.unpackAlignment = param;
        } else if (pname == 3314) {
          GL.unpackRowLength = param;
        }
        GLctx.pixelStorei(pname, param);
      };
      var _emscripten_glPixelStorei = _glPixelStorei;
      var _glPolygonModeWEBGL = (face, mode) => {
        GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
      };
      var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;
      var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
      var _emscripten_glPolygonOffset = _glPolygonOffset;
      var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
        GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
      };
      var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;
      var _glProgramBinary = (program, binaryFormat, binary, length) => {
        GL.recordError(1280);
      };
      var _emscripten_glProgramBinary = _glProgramBinary;
      var _glProgramParameteri = (program, pname, value) => {
        GL.recordError(1280);
      };
      var _emscripten_glProgramParameteri = _glProgramParameteri;
      var _glQueryCounterEXT = (id, target) => {
        GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
      };
      var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;
      var _glReadBuffer = (x0) => GLctx.readBuffer(x0);
      var _emscripten_glReadBuffer = _glReadBuffer;
      var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
        function roundedToNextMultipleOf(x, y) {
          return x + y - 1 & -y;
        }
        var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
        return height * alignedRowSize;
      };
      var colorChannelsInGlTextureFormat = (format) => {
        var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 };
        return colorChannels[format - 6402] || 1;
      };
      var heapObjectForWebGLType = (type) => {
        type -= 5120;
        if (type == 0) return HEAP8;
        if (type == 1) return HEAPU8;
        if (type == 2) return HEAP16;
        if (type == 4) return HEAP32;
        if (type == 6) return HEAPF32;
        if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
        return HEAPU16;
      };
      var toTypedArrayIndex = (pointer, heap) => pointer >>> 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
      var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
        var heap = heapObjectForWebGLType(type);
        var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
        var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
        return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
      };
      var _glReadPixels = (x, y, width, height, format, type, pixels) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelPackBufferBinding) {
            GLctx.readPixels(x, y, width, height, format, type, pixels);
            return;
          }
          var heap = heapObjectForWebGLType(type);
          var target = toTypedArrayIndex(pixels, heap);
          GLctx.readPixels(x, y, width, height, format, type, heap, target);
          return;
        }
        var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
        if (!pixelData) {
          GL.recordError(1280);
          return;
        }
        GLctx.readPixels(x, y, width, height, format, type, pixelData);
      };
      var _emscripten_glReadPixels = _glReadPixels;
      var _glReleaseShaderCompiler = () => {
      };
      var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;
      var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
      var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;
      var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
      var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;
      var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();
      var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;
      var _glSampleCoverage = (value, invert) => {
        GLctx.sampleCoverage(value, !!invert);
      };
      var _emscripten_glSampleCoverage = _glSampleCoverage;
      var _glSamplerParameterf = (sampler, pname, param) => {
        GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameterf = _glSamplerParameterf;
      var _glSamplerParameterfv = (sampler, pname, params) => {
        var param = HEAPF32[params >> 2];
        GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;
      var _glSamplerParameteri = (sampler, pname, param) => {
        GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameteri = _glSamplerParameteri;
      var _glSamplerParameteriv = (sampler, pname, params) => {
        var param = HEAP32[params >> 2];
        GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
      };
      var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;
      var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
      var _emscripten_glScissor = _glScissor;
      var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
        GL.recordError(1280);
      };
      var _emscripten_glShaderBinary = _glShaderBinary;
      var _glShaderSource = (shader, count, string, length) => {
        var source = GL.getSource(shader, count, string, length);
        GLctx.shaderSource(GL.shaders[shader], source);
      };
      var _emscripten_glShaderSource = _glShaderSource;
      var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
      var _emscripten_glStencilFunc = _glStencilFunc;
      var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
      var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;
      var _glStencilMask = (x0) => GLctx.stencilMask(x0);
      var _emscripten_glStencilMask = _glStencilMask;
      var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
      var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;
      var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
      var _emscripten_glStencilOp = _glStencilOp;
      var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
      var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;
      var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
            return;
          }
          if (pixels) {
            var heap = heapObjectForWebGLType(type);
            var index = toTypedArrayIndex(pixels, heap);
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
            return;
          }
        }
        var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
        GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
      };
      var _emscripten_glTexImage2D = _glTexImage2D;
      var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
        }
      };
      var _emscripten_glTexImage3D = _glTexImage3D;
      var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
      var _emscripten_glTexParameterf = _glTexParameterf;
      var _glTexParameterfv = (target, pname, params) => {
        var param = HEAPF32[params >> 2];
        GLctx.texParameterf(target, pname, param);
      };
      var _emscripten_glTexParameterfv = _glTexParameterfv;
      var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
      var _emscripten_glTexParameteri = _glTexParameteri;
      var _glTexParameteriv = (target, pname, params) => {
        var param = HEAP32[params >> 2];
        GLctx.texParameteri(target, pname, param);
      };
      var _emscripten_glTexParameteriv = _glTexParameteriv;
      var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
      var _emscripten_glTexStorage2D = _glTexStorage2D;
      var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
      var _emscripten_glTexStorage3D = _glTexStorage3D;
      var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            return;
          }
          if (pixels) {
            var heap = heapObjectForWebGLType(type);
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
            return;
          }
        }
        var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
        GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
      };
      var _emscripten_glTexSubImage2D = _glTexSubImage2D;
      var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
        }
      };
      var _emscripten_glTexSubImage3D = _glTexSubImage3D;
      var _glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
        program = GL.programs[program];
        var vars = [];
        for (var i2 = 0; i2 < count; i2++) vars.push(UTF8ToString(HEAP32[varyings + i2 * 4 >> 2]));
        GLctx.transformFeedbackVaryings(program, vars, bufferMode);
      };
      var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;
      var _glUniform1f = (location, v0) => {
        GLctx.uniform1f(webglGetUniformLocation(location), v0);
      };
      var _emscripten_glUniform1f = _glUniform1f;
      var miniTempWebGLFloatBuffers = [];
      var _glUniform1fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
          return;
        }
        if (count <= 288) {
          var view = miniTempWebGLFloatBuffers[count];
          for (var i2 = 0; i2 < count; ++i2) {
            view[i2] = HEAPF32[value + 4 * i2 >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 4 >> 2);
        }
        GLctx.uniform1fv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform1fv = _glUniform1fv;
      var _glUniform1i = (location, v0) => {
        GLctx.uniform1i(webglGetUniformLocation(location), v0);
      };
      var _emscripten_glUniform1i = _glUniform1i;
      var miniTempWebGLIntBuffers = [];
      var _glUniform1iv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, value >> 2, count);
          return;
        }
        if (count <= 288) {
          var view = miniTempWebGLIntBuffers[count];
          for (var i2 = 0; i2 < count; ++i2) {
            view[i2] = HEAP32[value + 4 * i2 >> 2];
          }
        } else {
          var view = HEAP32.subarray(value >> 2, value + count * 4 >> 2);
        }
        GLctx.uniform1iv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform1iv = _glUniform1iv;
      var _glUniform1ui = (location, v0) => {
        GLctx.uniform1ui(webglGetUniformLocation(location), v0);
      };
      var _emscripten_glUniform1ui = _glUniform1ui;
      var _glUniform1uiv = (location, count, value) => {
        count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count);
      };
      var _emscripten_glUniform1uiv = _glUniform1uiv;
      var _glUniform2f = (location, v0, v1) => {
        GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
      };
      var _emscripten_glUniform2f = _glUniform2f;
      var _glUniform2fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2);
          return;
        }
        if (count <= 144) {
          count *= 2;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 2) {
            view[i2] = HEAPF32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 8 >> 2);
        }
        GLctx.uniform2fv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform2fv = _glUniform2fv;
      var _glUniform2i = (location, v0, v1) => {
        GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
      };
      var _emscripten_glUniform2i = _glUniform2i;
      var _glUniform2iv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 2);
          return;
        }
        if (count <= 144) {
          count *= 2;
          var view = miniTempWebGLIntBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 2) {
            view[i2] = HEAP32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAP32[value + (4 * i2 + 4) >> 2];
          }
        } else {
          var view = HEAP32.subarray(value >> 2, value + count * 8 >> 2);
        }
        GLctx.uniform2iv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform2iv = _glUniform2iv;
      var _glUniform2ui = (location, v0, v1) => {
        GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
      };
      var _emscripten_glUniform2ui = _glUniform2ui;
      var _glUniform2uiv = (location, count, value) => {
        count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 2);
      };
      var _emscripten_glUniform2uiv = _glUniform2uiv;
      var _glUniform3f = (location, v0, v1, v2) => {
        GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _emscripten_glUniform3f = _glUniform3f;
      var _glUniform3fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3);
          return;
        }
        if (count <= 96) {
          count *= 3;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 3) {
            view[i2] = HEAPF32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
            view[i2 + 2] = HEAPF32[value + (4 * i2 + 8) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 12 >> 2);
        }
        GLctx.uniform3fv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform3fv = _glUniform3fv;
      var _glUniform3i = (location, v0, v1, v2) => {
        GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _emscripten_glUniform3i = _glUniform3i;
      var _glUniform3iv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 3);
          return;
        }
        if (count <= 96) {
          count *= 3;
          var view = miniTempWebGLIntBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 3) {
            view[i2] = HEAP32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAP32[value + (4 * i2 + 4) >> 2];
            view[i2 + 2] = HEAP32[value + (4 * i2 + 8) >> 2];
          }
        } else {
          var view = HEAP32.subarray(value >> 2, value + count * 12 >> 2);
        }
        GLctx.uniform3iv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform3iv = _glUniform3iv;
      var _glUniform3ui = (location, v0, v1, v2) => {
        GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _emscripten_glUniform3ui = _glUniform3ui;
      var _glUniform3uiv = (location, count, value) => {
        count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 3);
      };
      var _emscripten_glUniform3uiv = _glUniform3uiv;
      var _glUniform4f = (location, v0, v1, v2, v3) => {
        GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _emscripten_glUniform4f = _glUniform4f;
      var _glUniform4fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4);
          return;
        }
        if (count <= 72) {
          var view = miniTempWebGLFloatBuffers[4 * count];
          var heap = HEAPF32;
          value = value >> 2;
          count *= 4;
          for (var i2 = 0; i2 < count; i2 += 4) {
            var dst = value + i2;
            view[i2] = heap[dst];
            view[i2 + 1] = heap[dst + 1];
            view[i2 + 2] = heap[dst + 2];
            view[i2 + 3] = heap[dst + 3];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
        }
        GLctx.uniform4fv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform4fv = _glUniform4fv;
      var _glUniform4i = (location, v0, v1, v2, v3) => {
        GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _emscripten_glUniform4i = _glUniform4i;
      var _glUniform4iv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4);
          return;
        }
        if (count <= 72) {
          count *= 4;
          var view = miniTempWebGLIntBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 4) {
            view[i2] = HEAP32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAP32[value + (4 * i2 + 4) >> 2];
            view[i2 + 2] = HEAP32[value + (4 * i2 + 8) >> 2];
            view[i2 + 3] = HEAP32[value + (4 * i2 + 12) >> 2];
          }
        } else {
          var view = HEAP32.subarray(value >> 2, value + count * 16 >> 2);
        }
        GLctx.uniform4iv(webglGetUniformLocation(location), view);
      };
      var _emscripten_glUniform4iv = _glUniform4iv;
      var _glUniform4ui = (location, v0, v1, v2, v3) => {
        GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _emscripten_glUniform4ui = _glUniform4ui;
      var _glUniform4uiv = (location, count, value) => {
        count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 4);
      };
      var _emscripten_glUniform4uiv = _glUniform4uiv;
      var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
        program = GL.programs[program];
        GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
      };
      var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;
      var _glUniformMatrix2fv = (location, count, transpose, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4);
          return;
        }
        if (count <= 72) {
          count *= 4;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 4) {
            view[i2] = HEAPF32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
            view[i2 + 2] = HEAPF32[value + (4 * i2 + 8) >> 2];
            view[i2 + 3] = HEAPF32[value + (4 * i2 + 12) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
        }
        GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
      };
      var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;
      var _glUniformMatrix2x3fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
      };
      var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;
      var _glUniformMatrix2x4fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
      };
      var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;
      var _glUniformMatrix3fv = (location, count, transpose, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9);
          return;
        }
        if (count <= 32) {
          count *= 9;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i2 = 0; i2 < count; i2 += 9) {
            view[i2] = HEAPF32[value + 4 * i2 >> 2];
            view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
            view[i2 + 2] = HEAPF32[value + (4 * i2 + 8) >> 2];
            view[i2 + 3] = HEAPF32[value + (4 * i2 + 12) >> 2];
            view[i2 + 4] = HEAPF32[value + (4 * i2 + 16) >> 2];
            view[i2 + 5] = HEAPF32[value + (4 * i2 + 20) >> 2];
            view[i2 + 6] = HEAPF32[value + (4 * i2 + 24) >> 2];
            view[i2 + 7] = HEAPF32[value + (4 * i2 + 28) >> 2];
            view[i2 + 8] = HEAPF32[value + (4 * i2 + 32) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 36 >> 2);
        }
        GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
      };
      var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;
      var _glUniformMatrix3x2fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
      };
      var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;
      var _glUniformMatrix3x4fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
      };
      var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;
      var _glUniformMatrix4fv = (location, count, transpose, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
          return;
        }
        if (count <= 18) {
          var view = miniTempWebGLFloatBuffers[16 * count];
          var heap = HEAPF32;
          value = value >> 2;
          count *= 16;
          for (var i2 = 0; i2 < count; i2 += 16) {
            var dst = value + i2;
            view[i2] = heap[dst];
            view[i2 + 1] = heap[dst + 1];
            view[i2 + 2] = heap[dst + 2];
            view[i2 + 3] = heap[dst + 3];
            view[i2 + 4] = heap[dst + 4];
            view[i2 + 5] = heap[dst + 5];
            view[i2 + 6] = heap[dst + 6];
            view[i2 + 7] = heap[dst + 7];
            view[i2 + 8] = heap[dst + 8];
            view[i2 + 9] = heap[dst + 9];
            view[i2 + 10] = heap[dst + 10];
            view[i2 + 11] = heap[dst + 11];
            view[i2 + 12] = heap[dst + 12];
            view[i2 + 13] = heap[dst + 13];
            view[i2 + 14] = heap[dst + 14];
            view[i2 + 15] = heap[dst + 15];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2);
        }
        GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
      };
      var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;
      var _glUniformMatrix4x2fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
      };
      var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;
      var _glUniformMatrix4x3fv = (location, count, transpose, value) => {
        count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
      };
      var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;
      var _glUseProgram = (program) => {
        program = GL.programs[program];
        GLctx.useProgram(program);
        GLctx.currentProgram = program;
      };
      var _emscripten_glUseProgram = _glUseProgram;
      var _glValidateProgram = (program) => {
        GLctx.validateProgram(GL.programs[program]);
      };
      var _emscripten_glValidateProgram = _glValidateProgram;
      var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
      var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;
      var _glVertexAttrib1fv = (index, v) => {
        GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
      };
      var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;
      var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
      var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;
      var _glVertexAttrib2fv = (index, v) => {
        GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2]);
      };
      var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;
      var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
      var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;
      var _glVertexAttrib3fv = (index, v) => {
        GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2]);
      };
      var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;
      var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
      var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;
      var _glVertexAttrib4fv = (index, v) => {
        GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2], HEAPF32[v + 12 >> 2]);
      };
      var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;
      var _glVertexAttribDivisor = (index, divisor) => {
        GLctx.vertexAttribDivisor(index, divisor);
      };
      var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;
      var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;
      var _glVertexAttribDivisorARB = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorARB = _glVertexAttribDivisorARB;
      var _glVertexAttribDivisorEXT = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorEXT = _glVertexAttribDivisorEXT;
      var _glVertexAttribDivisorNV = _glVertexAttribDivisor;
      var _emscripten_glVertexAttribDivisorNV = _glVertexAttribDivisorNV;
      var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);
      var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;
      var _glVertexAttribI4iv = (index, v) => {
        GLctx.vertexAttribI4i(index, HEAP32[v >> 2], HEAP32[v + 4 >> 2], HEAP32[v + 8 >> 2], HEAP32[v + 12 >> 2]);
      };
      var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;
      var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);
      var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;
      var _glVertexAttribI4uiv = (index, v) => {
        GLctx.vertexAttribI4ui(index, HEAPU32[v >> 2], HEAPU32[v + 4 >> 2], HEAPU32[v + 8 >> 2], HEAPU32[v + 12 >> 2]);
      };
      var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;
      var _glVertexAttribIPointer = (index, size, type, stride, ptr2) => {
        GLctx.vertexAttribIPointer(index, size, type, stride, ptr2);
      };
      var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;
      var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr2) => {
        GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr2);
      };
      var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;
      var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
      var _emscripten_glViewport = _glViewport;
      var _glWaitSync = (sync, flags, timeout) => {
        timeout = Number(timeout);
        GLctx.waitSync(GL.syncs[sync], flags, timeout);
      };
      var _emscripten_glWaitSync = _glWaitSync;
      var getHeapMax = () => 2147483648;
      var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
      var growMemory = (size) => {
        var b = wasmMemory.buffer;
        var pages = (size - b.byteLength + 65535) / 65536 | 0;
        try {
          wasmMemory.grow(pages);
          updateMemoryViews();
          return 1;
        } catch (e) {
        }
      };
      var _emscripten_resize_heap = (requestedSize) => {
        var oldSize = HEAPU8.length;
        requestedSize >>>= 0;
        var maxHeapSize = getHeapMax();
        if (requestedSize > maxHeapSize) {
          return false;
        }
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + 0.8 / cutDown);
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
          var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
          var replacement = growMemory(newSize);
          if (replacement) {
            return true;
          }
        }
        return false;
      };
      var _emscripten_run_script = (ptr) => {
        eval(UTF8ToString(ptr));
      };
      var ENV = {};
      var getExecutableName = () => thisProgram || "./this.program";
      var getEnvStrings = () => {
        if (!getEnvStrings.strings) {
          var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
          var env = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: lang, _: getExecutableName() };
          for (var x in ENV) {
            if (ENV[x] === void 0) delete env[x];
            else env[x] = ENV[x];
          }
          var strings = [];
          for (var x in env) {
            strings.push(`${x}=${env[x]}`);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      };
      var stringToAscii = (str, buffer) => {
        for (var i2 = 0; i2 < str.length; ++i2) {
          HEAP8[buffer++] = str.charCodeAt(i2);
        }
        HEAP8[buffer] = 0;
      };
      var _environ_get = (__environ, environ_buf) => {
        var bufSize = 0;
        getEnvStrings().forEach((string, i2) => {
          var ptr2 = environ_buf + bufSize;
          HEAPU32[__environ + i2 * 4 >> 2] = ptr2;
          stringToAscii(string, ptr2);
          bufSize += string.length + 1;
        });
        return 0;
      };
      var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach((string) => bufSize += string.length + 1);
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0;
      };
      var runtimeKeepaliveCounter = 0;
      var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
      var _proc_exit = (code) => {
        EXITSTATUS = code;
        if (!keepRuntimeAlive()) {
          Module["onExit"]?.(code);
          ABORT = true;
        }
        quit_(code, new ExitStatus(code));
      };
      var exitJS = (status, implicit) => {
        EXITSTATUS = status;
        _proc_exit(status);
      };
      var _exit = exitJS;
      var _fd_close = (fd) => 52;
      function _fd_pread(fd, iov, iovcnt, offset, pnum) {
        offset = bigintToI53Checked(offset);
        return 52;
      }
      var _fd_read = (fd, iov, iovcnt, pnum) => 52;
      function _fd_seek(fd, offset, whence, newOffset) {
        offset = bigintToI53Checked(offset);
        return 70;
      }
      var printCharBuffers = [null, [], []];
      var printChar = (stream, curr) => {
        var buffer = printCharBuffers[stream];
        if (curr === 0 || curr === 10) {
          (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
          buffer.length = 0;
        } else {
          buffer.push(curr);
        }
      };
      var _fd_write = (fd, iov, iovcnt, pnum) => {
        var num = 0;
        for (var i2 = 0; i2 < iovcnt; i2++) {
          var ptr2 = HEAPU32[iov >> 2];
          var len = HEAPU32[iov + 4 >> 2];
          iov += 8;
          for (var j = 0; j < len; j++) {
            printChar(fd, HEAPU8[ptr2 + j]);
          }
          num += len;
        }
        HEAPU32[pnum >> 2] = num;
        return 0;
      };
      var _llvm_eh_typeid_for = (type) => type;
      var initRandomFill = () => {
        if (ENVIRONMENT_IS_NODE) {
          var nodeCrypto = require("crypto");
          return (view) => nodeCrypto.randomFillSync(view);
        }
        return (view) => crypto.getRandomValues(view);
      };
      var randomFill = (view) => {
        (randomFill = initRandomFill())(view);
      };
      var _random_get = (buffer, size) => {
        randomFill(HEAPU8.subarray(buffer, buffer + size));
        return 0;
      };
      function _wapi_notifyTilesRenderComplete() {
        if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
          return;
        }
        document.dispatchEvent(new CustomEvent("penpot:wasm:tiles-complete"));
      }
      var handleException = (e) => {
        if (e instanceof ExitStatus || e == "unwind") {
          return EXITSTATUS;
        }
        quit_(1, e);
      };
      var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
      var stringToUTF8OnStack = (str) => {
        var size = lengthBytesUTF8(str) + 1;
        var ret = stackAlloc(size);
        stringToUTF8(str, ret, size);
        return ret;
      };
      var wasmTableMirror = [];
      var wasmTable;
      var getWasmTableEntry = (funcPtr) => {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        return func;
      };
      for (let i2 = 0; i2 < 32; ++i2) tempFixedLengthArray.push(new Array(i2));
      var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
      for (var i = 0; i <= 288; ++i) {
        miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
      }
      var miniTempWebGLIntBuffersStorage = new Int32Array(288);
      for (var i = 0; i <= 288; ++i) {
        miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
      }
      var wasmImports = { Ua: ___cxa_begin_catch, Ta: ___cxa_end_catch, a: ___cxa_find_matching_catch_2, h: ___cxa_find_matching_catch_4, Va: ___cxa_throw, g: ___resumeException, ca: ___syscall_fcntl64, Bd: ___syscall_fstat64, xd: ___syscall_getcwd, Cd: ___syscall_ioctl, yd: ___syscall_lstat64, zd: ___syscall_newfstatat, da: ___syscall_openat, Ad: ___syscall_stat64, Dd: __abort_js, Ya: __emscripten_throw_longjmp, sd: __gmtime_js, qd: __mmap_js, rd: __munmap_js, Ed: __tzset_js, Xa: _clock_time_get, ea: _emscripten_date_now, N: _emscripten_get_now, pf: _emscripten_glActiveTexture, qf: _emscripten_glAttachShader, Td: _emscripten_glBeginQuery, Nd: _emscripten_glBeginQueryEXT, cc: _emscripten_glBeginTransformFeedback, rf: _emscripten_glBindAttribLocation, sf: _emscripten_glBindBuffer, $b: _emscripten_glBindBufferBase, ac: _emscripten_glBindBufferRange, pe: _emscripten_glBindFramebuffer, qe: _emscripten_glBindRenderbuffer, Zd: _emscripten_glBindSampler, tf: _emscripten_glBindTexture, ob: _emscripten_glBindTransformFeedback, Le: _emscripten_glBindVertexArray, Oe: _emscripten_glBindVertexArrayOES, uf: _emscripten_glBlendColor, vf: _emscripten_glBlendEquation, gd: _emscripten_glBlendEquationSeparate, wf: _emscripten_glBlendFunc, fd: _emscripten_glBlendFuncSeparate, je: _emscripten_glBlitFramebuffer, xf: _emscripten_glBufferData, yf: _emscripten_glBufferSubData, re: _emscripten_glCheckFramebufferStatus, zf: _emscripten_glClear, Eb: _emscripten_glClearBufferfi, Fb: _emscripten_glClearBufferfv, Hb: _emscripten_glClearBufferiv, Gb: _emscripten_glClearBufferuiv, Af: _emscripten_glClearColor, ed: _emscripten_glClearDepthf, Bf: _emscripten_glClearStencil, ge: _emscripten_glClientWaitSync, xc: _emscripten_glClipControlEXT, Cf: _emscripten_glColorMask, Df: _emscripten_glCompileShader, Ef: _emscripten_glCompressedTexImage2D, oc: _emscripten_glCompressedTexImage3D, Ff: _emscripten_glCompressedTexSubImage2D, nc: _emscripten_glCompressedTexSubImage3D, ie: _emscripten_glCopyBufferSubData, dd: _emscripten_glCopyTexImage2D, Gf: _emscripten_glCopyTexSubImage2D, pc: _emscripten_glCopyTexSubImage3D, Hf: _emscripten_glCreateProgram, If: _emscripten_glCreateShader, Jf: _emscripten_glCullFace, Kf: _emscripten_glDeleteBuffers, se: _emscripten_glDeleteFramebuffers, Lf: _emscripten_glDeleteProgram, Ud: _emscripten_glDeleteQueries, Od: _emscripten_glDeleteQueriesEXT, te: _emscripten_glDeleteRenderbuffers, _d: _emscripten_glDeleteSamplers, Mf: _emscripten_glDeleteShader, he: _emscripten_glDeleteSync, Nf: _emscripten_glDeleteTextures, nb: _emscripten_glDeleteTransformFeedbacks, Me: _emscripten_glDeleteVertexArrays, Pe: _emscripten_glDeleteVertexArraysOES, cd: _emscripten_glDepthFunc, Of: _emscripten_glDepthMask, bd: _emscripten_glDepthRangef, ad: _emscripten_glDetachShader, Pf: _emscripten_glDisable, Qf: _emscripten_glDisableVertexAttribArray, Rf: _emscripten_glDrawArrays, Je: _emscripten_glDrawArraysInstanced, kd: _emscripten_glDrawArraysInstancedANGLE, ab: _emscripten_glDrawArraysInstancedARB, Ge: _emscripten_glDrawArraysInstancedBaseInstanceWEBGL, uc: _emscripten_glDrawArraysInstancedEXT, bb: _emscripten_glDrawArraysInstancedNV, Ee: _emscripten_glDrawBuffers, sc: _emscripten_glDrawBuffersEXT, ld: _emscripten_glDrawBuffersWEBGL, Sf: _emscripten_glDrawElements, Ke: _emscripten_glDrawElementsInstanced, id: _emscripten_glDrawElementsInstancedANGLE, _a: _emscripten_glDrawElementsInstancedARB, He: _emscripten_glDrawElementsInstancedBaseVertexBaseInstanceWEBGL, $a: _emscripten_glDrawElementsInstancedEXT, tc: _emscripten_glDrawElementsInstancedNV, ye: _emscripten_glDrawRangeElements, Tf: _emscripten_glEnable, Uf: _emscripten_glEnableVertexAttribArray, Vd: _emscripten_glEndQuery, Pd: _emscripten_glEndQueryEXT, bc: _emscripten_glEndTransformFeedback, de: _emscripten_glFenceSync, fa: _emscripten_glFinish, ga: _emscripten_glFlush, ue: _emscripten_glFramebufferRenderbuffer, ve: _emscripten_glFramebufferTexture2D, fc: _emscripten_glFramebufferTextureLayer, ha: _emscripten_glFrontFace, ia: _emscripten_glGenBuffers, we: _emscripten_glGenFramebuffers, Wd: _emscripten_glGenQueries, Qd: _emscripten_glGenQueriesEXT, xe: _emscripten_glGenRenderbuffers, $d: _emscripten_glGenSamplers, ja: _emscripten_glGenTextures, mb: _emscripten_glGenTransformFeedbacks, Ie: _emscripten_glGenVertexArrays, Qe: _emscripten_glGenVertexArraysOES, le: _emscripten_glGenerateMipmap, $c: _emscripten_glGetActiveAttrib, _c: _emscripten_glGetActiveUniform, zb: _emscripten_glGetActiveUniformBlockName, Ab: _emscripten_glGetActiveUniformBlockiv, Cb: _emscripten_glGetActiveUniformsiv, Zc: _emscripten_glGetAttachedShaders, Yc: _emscripten_glGetAttribLocation, Xc: _emscripten_glGetBooleanv, ub: _emscripten_glGetBufferParameteri64v, ka: _emscripten_glGetBufferParameteriv, la: _emscripten_glGetError, ma: _emscripten_glGetFloatv, Rb: _emscripten_glGetFragDataLocation, me: _emscripten_glGetFramebufferAttachmentParameteriv, vb: _emscripten_glGetInteger64i_v, xb: _emscripten_glGetInteger64v, dc: _emscripten_glGetIntegeri_v, na: _emscripten_glGetIntegerv, eb: _emscripten_glGetInternalformativ, ib: _emscripten_glGetProgramBinary, oa: _emscripten_glGetProgramInfoLog, qa: _emscripten_glGetProgramiv, Kd: _emscripten_glGetQueryObjecti64vEXT, nd: _emscripten_glGetQueryObjectivEXT, Ld: _emscripten_glGetQueryObjectui64vEXT, Xd: _emscripten_glGetQueryObjectuiv, Rd: _emscripten_glGetQueryObjectuivEXT, Yd: _emscripten_glGetQueryiv, Sd: _emscripten_glGetQueryivEXT, ne: _emscripten_glGetRenderbufferParameteriv, qb: _emscripten_glGetSamplerParameterfv, rb: _emscripten_glGetSamplerParameteriv, ra: _emscripten_glGetShaderInfoLog, Hd: _emscripten_glGetShaderPrecisionFormat, Wc: _emscripten_glGetShaderSource, sa: _emscripten_glGetShaderiv, ta: _emscripten_glGetString, Ne: _emscripten_glGetStringi, wb: _emscripten_glGetSynciv, Vc: _emscripten_glGetTexParameterfv, Uc: _emscripten_glGetTexParameteriv, Zb: _emscripten_glGetTransformFeedbackVarying, Bb: _emscripten_glGetUniformBlockIndex, Db: _emscripten_glGetUniformIndices, ua: _emscripten_glGetUniformLocation, Tc: _emscripten_glGetUniformfv, Sc: _emscripten_glGetUniformiv, Sb: _emscripten_glGetUniformuiv, Yb: _emscripten_glGetVertexAttribIiv, Xb: _emscripten_glGetVertexAttribIuiv, Pc: _emscripten_glGetVertexAttribPointerv, Rc: _emscripten_glGetVertexAttribfv, Qc: _emscripten_glGetVertexAttribiv, Oc: _emscripten_glHint, Id: _emscripten_glInvalidateFramebuffer, Jd: _emscripten_glInvalidateSubFramebuffer, Nc: _emscripten_glIsBuffer, Mc: _emscripten_glIsEnabled, Lc: _emscripten_glIsFramebuffer, Kc: _emscripten_glIsProgram, mc: _emscripten_glIsQuery, od: _emscripten_glIsQueryEXT, Jc: _emscripten_glIsRenderbuffer, tb: _emscripten_glIsSampler, Ic: _emscripten_glIsShader, ee: _emscripten_glIsSync, va: _emscripten_glIsTexture, lb: _emscripten_glIsTransformFeedback, ec: _emscripten_glIsVertexArray, md: _emscripten_glIsVertexArrayOES, wa: _emscripten_glLineWidth, xa: _emscripten_glLinkProgram, Ce: _emscripten_glMultiDrawArraysInstancedBaseInstanceWEBGL, De: _emscripten_glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL, kb: _emscripten_glPauseTransformFeedback, ya: _emscripten_glPixelStorei, wc: _emscripten_glPolygonModeWEBGL, Hc: _emscripten_glPolygonOffset, yc: _emscripten_glPolygonOffsetClampEXT, hb: _emscripten_glProgramBinary, gb: _emscripten_glProgramParameteri, Md: _emscripten_glQueryCounterEXT, Fe: _emscripten_glReadBuffer, za: _emscripten_glReadPixels, Gc: _emscripten_glReleaseShaderCompiler, oe: _emscripten_glRenderbufferStorage, ke: _emscripten_glRenderbufferStorageMultisample, jb: _emscripten_glResumeTransformFeedback, Fc: _emscripten_glSampleCoverage, ae: _emscripten_glSamplerParameterf, sb: _emscripten_glSamplerParameterfv, be: _emscripten_glSamplerParameteri, ce: _emscripten_glSamplerParameteriv, Aa: _emscripten_glScissor, Ec: _emscripten_glShaderBinary, Ba: _emscripten_glShaderSource, Ca: _emscripten_glStencilFunc, Da: _emscripten_glStencilFuncSeparate, Ea: _emscripten_glStencilMask, Fa: _emscripten_glStencilMaskSeparate, Ga: _emscripten_glStencilOp, Ha: _emscripten_glStencilOpSeparate, Ia: _emscripten_glTexImage2D, rc: _emscripten_glTexImage3D, Ja: _emscripten_glTexParameterf, Ka: _emscripten_glTexParameterfv, La: _emscripten_glTexParameteri, Ma: _emscripten_glTexParameteriv, ze: _emscripten_glTexStorage2D, fb: _emscripten_glTexStorage3D, Na: _emscripten_glTexSubImage2D, qc: _emscripten_glTexSubImage3D, _b: _emscripten_glTransformFeedbackVaryings, Oa: _emscripten_glUniform1f, Pa: _emscripten_glUniform1fv, lf: _emscripten_glUniform1i, mf: _emscripten_glUniform1iv, Qb: _emscripten_glUniform1ui, Mb: _emscripten_glUniform1uiv, nf: _emscripten_glUniform2f, of: _emscripten_glUniform2fv, kf: _emscripten_glUniform2i, jf: _emscripten_glUniform2iv, Pb: _emscripten_glUniform2ui, Lb: _emscripten_glUniform2uiv, hf: _emscripten_glUniform3f, gf: _emscripten_glUniform3fv, ef: _emscripten_glUniform3i, df: _emscripten_glUniform3iv, Ob: _emscripten_glUniform3ui, Jb: _emscripten_glUniform3uiv, cf: _emscripten_glUniform4f, bf: _emscripten_glUniform4fv, Re: _emscripten_glUniform4i, Se: _emscripten_glUniform4iv, Nb: _emscripten_glUniform4ui, Ib: _emscripten_glUniform4uiv, yb: _emscripten_glUniformBlockBinding, Te: _emscripten_glUniformMatrix2fv, lc: _emscripten_glUniformMatrix2x3fv, jc: _emscripten_glUniformMatrix2x4fv, Ue: _emscripten_glUniformMatrix3fv, kc: _emscripten_glUniformMatrix3x2fv, hc: _emscripten_glUniformMatrix3x4fv, Ve: _emscripten_glUniformMatrix4fv, ic: _emscripten_glUniformMatrix4x2fv, gc: _emscripten_glUniformMatrix4x3fv, We: _emscripten_glUseProgram, Dc: _emscripten_glValidateProgram, Xe: _emscripten_glVertexAttrib1f, Cc: _emscripten_glVertexAttrib1fv, Bc: _emscripten_glVertexAttrib2f, Ye: _emscripten_glVertexAttrib2fv, Ac: _emscripten_glVertexAttrib3f, Ze: _emscripten_glVertexAttrib3fv, zc: _emscripten_glVertexAttrib4f, _e: _emscripten_glVertexAttrib4fv, Ae: _emscripten_glVertexAttribDivisor, hd: _emscripten_glVertexAttribDivisorANGLE, cb: _emscripten_glVertexAttribDivisorARB, vc: _emscripten_glVertexAttribDivisorEXT, db: _emscripten_glVertexAttribDivisorNV, Wb: _emscripten_glVertexAttribI4i, Ub: _emscripten_glVertexAttribI4iv, Vb: _emscripten_glVertexAttribI4ui, Tb: _emscripten_glVertexAttribI4uiv, Be: _emscripten_glVertexAttribIPointer, $e: _emscripten_glVertexAttribPointer, af: _emscripten_glViewport, fe: _emscripten_glWaitSync, Za: _emscripten_resize_heap, pb: _emscripten_run_script, ud: _environ_get, vd: _environ_sizes_get, Sa: _exit, Q: _fd_close, pd: _fd_pread, ba: _fd_read, td: _fd_seek, P: _fd_write, Qa: _glGetIntegerv, S: _glGetString, Ra: _glGetStringi, Gd: invoke_dd, Fd: invoke_dddd, r: invoke_dii, K: invoke_fiii, D: invoke_i, j: invoke_ii, f: invoke_iii, k: invoke_iiii, o: invoke_iiiii, L: invoke_iiiiii, T: invoke_iiiiiii, J: invoke_iiiiiiii, U: invoke_iiiiiiiiii, W: invoke_jiii, n: invoke_v, t: invoke_vff, c: invoke_vi, pa: invoke_vifiii, b: invoke_vii, I: invoke_viiddidd, ff: invoke_viifff, Y: invoke_viififfff, V: invoke_viifii, d: invoke_viii, u: invoke_viiif, i: invoke_viiii, C: invoke_viiiifiii, e: invoke_viiiii, p: invoke_viiiiifi, Z: invoke_viiiiifif, B: invoke_viiiiifiii, m: invoke_viiiiii, v: invoke_viiiiiif, E: invoke_viiiiiifii, aa: invoke_viiiiiii, _: invoke_viiiiiiifif, q: invoke_viiiiiiififi, H: invoke_viiiiiiii, z: invoke_viiiiiiiif, w: invoke_viiiiiiiifif, y: invoke_viiiiiiiififif, M: invoke_viiiiiiiii, Wa: invoke_viiiiiiiiif, A: invoke_viiiiiiiiii, O: invoke_viiiiiiiiiif, x: invoke_viiiiiiiiiifif, X: invoke_viiiiiiiiiii, Kb: invoke_viiiiiiiiiiif, s: invoke_viiiiiiiiiiiifi, $: invoke_viiiiiiiiiiiiifif, R: invoke_viiiiiiiiiiiiii, G: invoke_viijj, F: invoke_vijjjj, l: _llvm_eh_typeid_for, wd: _random_get, jd: _wapi_notifyTilesRenderComplete };
      var wasmExports = await createWasm();
      var ___wasm_call_ctors = wasmExports["Wf"];
      var _malloc = wasmExports["Yf"];
      var _add_shape_center_stroke = Module["_add_shape_center_stroke"] = wasmExports["Zf"];
      var _add_shape_child = Module["_add_shape_child"] = wasmExports["_f"];
      var _add_shape_fill = Module["_add_shape_fill"] = wasmExports["$f"];
      var _add_shape_inner_stroke = Module["_add_shape_inner_stroke"] = wasmExports["ag"];
      var _add_shape_outer_stroke = Module["_add_shape_outer_stroke"] = wasmExports["bg"];
      var _add_shape_shadow = Module["_add_shape_shadow"] = wasmExports["cg"];
      var _add_shape_stroke_fill = Module["_add_shape_stroke_fill"] = wasmExports["dg"];
      var _alloc_bytes = Module["_alloc_bytes"] = wasmExports["eg"];
      var _begin_loading = Module["_begin_loading"] = wasmExports["fg"];
      var _calculate_bool = Module["_calculate_bool"] = wasmExports["gg"];
      var _calculate_position_data = Module["_calculate_position_data"] = wasmExports["hg"];
      var _capture_frames = Module["_capture_frames"] = wasmExports["ig"];
      var _clean_modifiers = Module["_clean_modifiers"] = wasmExports["jg"];
      var _clean_up = Module["_clean_up"] = wasmExports["kg"];
      var _clear_focus_mode = Module["_clear_focus_mode"] = wasmExports["lg"];
      var _clear_fonts = Module["_clear_fonts"] = wasmExports["mg"];
      var _clear_render_include_filter = Module["_clear_render_include_filter"] = wasmExports["ng"];
      var _clear_shape_blur = Module["_clear_shape_blur"] = wasmExports["og"];
      var _clear_shape_constraints = Module["_clear_shape_constraints"] = wasmExports["pg"];
      var _clear_shape_fills = Module["_clear_shape_fills"] = wasmExports["qg"];
      var _clear_shape_layout = Module["_clear_shape_layout"] = wasmExports["rg"];
      var _clear_shape_shadows = Module["_clear_shape_shadows"] = wasmExports["sg"];
      var _clear_shape_strokes = Module["_clear_shape_strokes"] = wasmExports["tg"];
      var _clear_shape_text = Module["_clear_shape_text"] = wasmExports["ug"];
      var _convert_stroke_to_path = Module["_convert_stroke_to_path"] = wasmExports["vg"];
      var _current_to_path = Module["_current_to_path"] = wasmExports["wg"];
      var _debug_atlas_base64 = Module["_debug_atlas_base64"] = wasmExports["xg"];
      var _debug_atlas_console = Module["_debug_atlas_console"] = wasmExports["yg"];
      var _debug_cache_base64 = Module["_debug_cache_base64"] = wasmExports["zg"];
      var _debug_cache_console = Module["_debug_cache_console"] = wasmExports["Ag"];
      var _debug_surface_console = Module["_debug_surface_console"] = wasmExports["Bg"];
      var _end_loading = Module["_end_loading"] = wasmExports["Cg"];
      var _end_temp_objects = Module["_end_temp_objects"] = wasmExports["Dg"];
      var _evict_images_to_budget = Module["_evict_images_to_budget"] = wasmExports["Eg"];
      var _find_guide_at = Module["_find_guide_at"] = wasmExports["Fg"];
      var _force_update_shape_text_layout_for = Module["_force_update_shape_text_layout_for"] = wasmExports["Gg"];
      var _free_bytes = Module["_free_bytes"] = wasmExports["Hg"];
      var _free_gpu_resources = Module["_free_gpu_resources"] = wasmExports["Ig"];
      var _get_fonts_for_shape = Module["_get_fonts_for_shape"] = wasmExports["Jg"];
      var _get_grid_coords = Module["_get_grid_coords"] = wasmExports["Kg"];
      var _get_selection_rect = Module["_get_selection_rect"] = wasmExports["Lg"];
      var _get_shape_extrect = Module["_get_shape_extrect"] = wasmExports["Mg"];
      var _get_text_dimensions = Module["_get_text_dimensions"] = wasmExports["Ng"];
      var _has_shape = Module["_has_shape"] = wasmExports["Og"];
      var _hide_grid = Module["_hide_grid"] = wasmExports["Pg"];
      var _init = Module["_init"] = wasmExports["Qg"];
      var _init_headless = Module["_init_headless"] = wasmExports["Rg"];
      var _init_shapes_pool = Module["_init_shapes_pool"] = wasmExports["Sg"];
      var _intersect_position_in_shape = Module["_intersect_position_in_shape"] = wasmExports["Tg"];
      var _is_font_uploaded = Module["_is_font_uploaded"] = wasmExports["Ug"];
      var _is_image_cached = Module["_is_image_cached"] = wasmExports["Vg"];
      var _propagate_modifiers = Module["_propagate_modifiers"] = wasmExports["Wg"];
      var _read_error_code = Module["_read_error_code"] = wasmExports["Xg"];
      var _render = Module["_render"] = wasmExports["Yg"];
      var _render_blurred_snapshot = Module["_render_blurred_snapshot"] = wasmExports["Zg"];
      var _render_from_backbuffer = Module["_render_from_backbuffer"] = wasmExports["_g"];
      var _render_from_cache = Module["_render_from_cache"] = wasmExports["$g"];
      var _render_loading_overlay = Module["_render_loading_overlay"] = wasmExports["ah"];
      var _render_preview = Module["_render_preview"] = wasmExports["bh"];
      var _render_shape_pdf = Module["_render_shape_pdf"] = wasmExports["ch"];
      var _render_shape_pixels = Module["_render_shape_pixels"] = wasmExports["dh"];
      var _render_shape_raster = Module["_render_shape_raster"] = wasmExports["eh"];
      var _render_stats = Module["_render_stats"] = wasmExports["fh"];
      var _render_sync = Module["_render_sync"] = wasmExports["gh"];
      var _render_sync_shape = Module["_render_sync_shape"] = wasmExports["hh"];
      var _render_ui_only = Module["_render_ui_only"] = wasmExports["ih"];
      var _reset_canvas = Module["_reset_canvas"] = wasmExports["jh"];
      var _resize_viewbox = Module["_resize_viewbox"] = wasmExports["kh"];
      var _set_antialias_threshold = Module["_set_antialias_threshold"] = wasmExports["lh"];
      var _set_blur_downscale_threshold = Module["_set_blur_downscale_threshold"] = wasmExports["mh"];
      var _set_browser = Module["_set_browser"] = wasmExports["nh"];
      var _set_canvas_background = Module["_set_canvas_background"] = wasmExports["oh"];
      var _set_children = Module["_set_children"] = wasmExports["ph"];
      var _set_children_0 = Module["_set_children_0"] = wasmExports["qh"];
      var _set_children_1 = Module["_set_children_1"] = wasmExports["rh"];
      var _set_children_2 = Module["_set_children_2"] = wasmExports["sh"];
      var _set_children_3 = Module["_set_children_3"] = wasmExports["th"];
      var _set_children_4 = Module["_set_children_4"] = wasmExports["uh"];
      var _set_children_5 = Module["_set_children_5"] = wasmExports["vh"];
      var _set_flex_layout_data = Module["_set_flex_layout_data"] = wasmExports["wh"];
      var _set_focus_mode = Module["_set_focus_mode"] = wasmExports["xh"];
      var _set_grid_cells = Module["_set_grid_cells"] = wasmExports["yh"];
      var _set_grid_columns = Module["_set_grid_columns"] = wasmExports["zh"];
      var _set_grid_layout_data = Module["_set_grid_layout_data"] = wasmExports["Ah"];
      var _set_grid_rows = Module["_set_grid_rows"] = wasmExports["Bh"];
      var _set_guides = Module["_set_guides"] = wasmExports["Ch"];
      var _set_layout_data = Module["_set_layout_data"] = wasmExports["Dh"];
      var _set_max_blocking_time_ms = Module["_set_max_blocking_time_ms"] = wasmExports["Eh"];
      var _set_modifiers = Module["_set_modifiers"] = wasmExports["Fh"];
      var _set_modifiers_end = Module["_set_modifiers_end"] = wasmExports["Gh"];
      var _set_modifiers_start = Module["_set_modifiers_start"] = wasmExports["Hh"];
      var _set_node_batch_threshold = Module["_set_node_batch_threshold"] = wasmExports["Ih"];
      var _set_parent = Module["_set_parent"] = wasmExports["Jh"];
      var _set_preview_mode = Module["_set_preview_mode"] = wasmExports["Kh"];
      var _set_render_include_filter = Module["_set_render_include_filter"] = wasmExports["Lh"];
      var _set_render_options = Module["_set_render_options"] = wasmExports["Mh"];
      var _set_rulers_colors = Module["_set_rulers_colors"] = wasmExports["Nh"];
      var _set_rulers_frame_visible = Module["_set_rulers_frame_visible"] = wasmExports["Oh"];
      var _set_rulers_offsets = Module["_set_rulers_offsets"] = wasmExports["Ph"];
      var _set_rulers_selection = Module["_set_rulers_selection"] = wasmExports["Qh"];
      var _set_rulers_visible = Module["_set_rulers_visible"] = wasmExports["Rh"];
      var _set_shape_base_props = Module["_set_shape_base_props"] = wasmExports["Sh"];
      var _set_shape_blend_mode = Module["_set_shape_blend_mode"] = wasmExports["Th"];
      var _set_shape_blur = Module["_set_shape_blur"] = wasmExports["Uh"];
      var _set_shape_bool_type = Module["_set_shape_bool_type"] = wasmExports["Vh"];
      var _set_shape_clip_content = Module["_set_shape_clip_content"] = wasmExports["Wh"];
      var _set_shape_constraint_h = Module["_set_shape_constraint_h"] = wasmExports["Xh"];
      var _set_shape_constraint_v = Module["_set_shape_constraint_v"] = wasmExports["Yh"];
      var _set_shape_corners = Module["_set_shape_corners"] = wasmExports["Zh"];
      var _set_shape_fills = Module["_set_shape_fills"] = wasmExports["_h"];
      var _set_shape_grow_type = Module["_set_shape_grow_type"] = wasmExports["$h"];
      var _set_shape_hidden = Module["_set_shape_hidden"] = wasmExports["ai"];
      var _set_shape_masked_group = Module["_set_shape_masked_group"] = wasmExports["bi"];
      var _set_shape_opacity = Module["_set_shape_opacity"] = wasmExports["ci"];
      var _set_shape_path_buffer = Module["_set_shape_path_buffer"] = wasmExports["di"];
      var _set_shape_path_chunk_buffer = Module["_set_shape_path_chunk_buffer"] = wasmExports["ei"];
      var _set_shape_path_content = Module["_set_shape_path_content"] = wasmExports["fi"];
      var _set_shape_rotation = Module["_set_shape_rotation"] = wasmExports["gi"];
      var _set_shape_selrect = Module["_set_shape_selrect"] = wasmExports["hi"];
      var _set_shape_stroke_sides = Module["_set_shape_stroke_sides"] = wasmExports["ii"];
      var _set_shape_svg_attrs = Module["_set_shape_svg_attrs"] = wasmExports["ji"];
      var _set_shape_svg_raw_content = Module["_set_shape_svg_raw_content"] = wasmExports["ki"];
      var _set_shape_text_content = Module["_set_shape_text_content"] = wasmExports["li"];
      var _set_shape_transform = Module["_set_shape_transform"] = wasmExports["mi"];
      var _set_shape_type = Module["_set_shape_type"] = wasmExports["ni"];
      var _set_shape_vertical_align = Module["_set_shape_vertical_align"] = wasmExports["oi"];
      var _set_structure_modifiers = Module["_set_structure_modifiers"] = wasmExports["pi"];
      var _set_view = Module["_set_view"] = wasmExports["qi"];
      var _set_view_end = Module["_set_view_end"] = wasmExports["ri"];
      var _set_view_start = Module["_set_view_start"] = wasmExports["si"];
      var _set_viewport_interest_area_threshold = Module["_set_viewport_interest_area_threshold"] = wasmExports["ti"];
      var _show_grid = Module["_show_grid"] = wasmExports["ui"];
      var _start_shape_path_buffer = Module["_start_shape_path_buffer"] = wasmExports["vi"];
      var _start_temp_objects = Module["_start_temp_objects"] = wasmExports["wi"];
      var _store_font = Module["_store_font"] = wasmExports["xi"];
      var _store_image = Module["_store_image"] = wasmExports["yi"];
      var _store_image_from_texture = Module["_store_image_from_texture"] = wasmExports["zi"];
      var _text_editor_apply_theme = Module["_text_editor_apply_theme"] = wasmExports["Ai"];
      var _text_editor_blur = Module["_text_editor_blur"] = wasmExports["Bi"];
      var _text_editor_composition_end = Module["_text_editor_composition_end"] = wasmExports["Ci"];
      var _text_editor_composition_start = Module["_text_editor_composition_start"] = wasmExports["Di"];
      var _text_editor_composition_update = Module["_text_editor_composition_update"] = wasmExports["Ei"];
      var _text_editor_delete_backward = Module["_text_editor_delete_backward"] = wasmExports["Fi"];
      var _text_editor_delete_forward = Module["_text_editor_delete_forward"] = wasmExports["Gi"];
      var _text_editor_dispose = Module["_text_editor_dispose"] = wasmExports["Hi"];
      var _text_editor_export_content = Module["_text_editor_export_content"] = wasmExports["Ii"];
      var _text_editor_export_selection = Module["_text_editor_export_selection"] = wasmExports["Ji"];
      var _text_editor_focus = Module["_text_editor_focus"] = wasmExports["Ki"];
      var _text_editor_get_active_shape_id = Module["_text_editor_get_active_shape_id"] = wasmExports["Li"];
      var _text_editor_get_current_styles = Module["_text_editor_get_current_styles"] = wasmExports["Mi"];
      var _text_editor_get_cursor_rect = Module["_text_editor_get_cursor_rect"] = wasmExports["Ni"];
      var _text_editor_get_selection = Module["_text_editor_get_selection"] = wasmExports["Oi"];
      var _text_editor_get_selection_rects = Module["_text_editor_get_selection_rects"] = wasmExports["Pi"];
      var _text_editor_has_focus = Module["_text_editor_has_focus"] = wasmExports["Qi"];
      var _text_editor_has_focus_with_id = Module["_text_editor_has_focus_with_id"] = wasmExports["Ri"];
      var _text_editor_has_selection = Module["_text_editor_has_selection"] = wasmExports["Si"];
      var _text_editor_insert_paragraph = Module["_text_editor_insert_paragraph"] = wasmExports["Ti"];
      var _text_editor_insert_text = Module["_text_editor_insert_text"] = wasmExports["Ui"];
      var _text_editor_move_cursor = Module["_text_editor_move_cursor"] = wasmExports["Vi"];
      var _text_editor_pointer_down = Module["_text_editor_pointer_down"] = wasmExports["Wi"];
      var _text_editor_pointer_move = Module["_text_editor_pointer_move"] = wasmExports["Xi"];
      var _text_editor_pointer_up = Module["_text_editor_pointer_up"] = wasmExports["Yi"];
      var _text_editor_poll_event = Module["_text_editor_poll_event"] = wasmExports["Zi"];
      var _text_editor_render_caret = Module["_text_editor_render_caret"] = wasmExports["_i"];
      var _text_editor_render_overlay = Module["_text_editor_render_overlay"] = wasmExports["$i"];
      var _text_editor_select_all = Module["_text_editor_select_all"] = wasmExports["aj"];
      var _text_editor_select_word_boundary = Module["_text_editor_select_word_boundary"] = wasmExports["bj"];
      var _text_editor_set_cursor_from_offset = Module["_text_editor_set_cursor_from_offset"] = wasmExports["cj"];
      var _text_editor_set_cursor_from_point = Module["_text_editor_set_cursor_from_point"] = wasmExports["dj"];
      var _text_editor_toggle_overtype_mode = Module["_text_editor_toggle_overtype_mode"] = wasmExports["ej"];
      var _text_editor_update_blink = Module["_text_editor_update_blink"] = wasmExports["fj"];
      var _touch_shape = Module["_touch_shape"] = wasmExports["gj"];
      var _update_shape_text_layout = Module["_update_shape_text_layout"] = wasmExports["hj"];
      var _update_shape_text_layout_for = Module["_update_shape_text_layout_for"] = wasmExports["ij"];
      var _use_shape = Module["_use_shape"] = wasmExports["jj"];
      var _main = Module["_main"] = wasmExports["kj"];
      var _setThrew = wasmExports["lj"];
      var __emscripten_tempret_set = wasmExports["mj"];
      var __emscripten_stack_restore = wasmExports["nj"];
      var __emscripten_stack_alloc = wasmExports["oj"];
      var _emscripten_stack_get_current = wasmExports["pj"];
      var ___cxa_decrement_exception_refcount = wasmExports["qj"];
      var ___cxa_increment_exception_refcount = wasmExports["rj"];
      var ___cxa_can_catch = wasmExports["sj"];
      var ___cxa_get_exception_ptr = wasmExports["tj"];
      function invoke_iiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vii(index, a1, a2) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_ii(index, a1) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iii(index, a1, a2) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vi(index, a1) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vifiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiddidd(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_dii(index, a1, a2) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viifff(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiififi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiififif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiifif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiifif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viijj(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_i(index) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)();
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_v(index) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)();
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiiiiifif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiifif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiifif(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viififfff(index, a1, a2, a3, a4, a5, a6, a7, a8) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiif(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_fiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vff(index, a1, a2) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_jiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
          return 0n;
        }
      }
      function invoke_viifii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_dd(index, a1) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_dddd(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vijjjj(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0) throw e;
          _setThrew(1, 0);
        }
      }
      Module["UTF8ToString"] = UTF8ToString;
      Module["stringToUTF8"] = stringToUTF8;
      Module["GL"] = GL;
      function callMain(args = []) {
        var entryFunction = _main;
        args.unshift(thisProgram);
        var argc = args.length;
        var argv = stackAlloc((argc + 1) * 4);
        var argv_ptr = argv;
        args.forEach((arg) => {
          HEAPU32[argv_ptr >> 2] = stringToUTF8OnStack(arg);
          argv_ptr += 4;
        });
        HEAPU32[argv_ptr >> 2] = 0;
        try {
          var ret = entryFunction(argc, argv);
          exitJS(ret, true);
          return ret;
        } catch (e) {
          return handleException(e);
        }
      }
      function run(args = arguments_) {
        if (runDependencies > 0) {
          dependenciesFulfilled = run;
          return;
        }
        preRun();
        if (runDependencies > 0) {
          dependenciesFulfilled = run;
          return;
        }
        function doRun() {
          Module["calledRun"] = true;
          if (ABORT) return;
          initRuntime();
          preMain();
          readyPromiseResolve(Module);
          Module["onRuntimeInitialized"]?.();
          var noInitialRun = Module["noInitialRun"] || true;
          if (!noInitialRun) callMain(args);
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(() => {
            setTimeout(() => Module["setStatus"](""), 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      run();
      moduleRtn = readyPromise;
      return moduleRtn;
    });
  })();
  var render_wasm_default = createRustSkiaModule;
  return __toCommonJS(render_wasm_exports);
})();
