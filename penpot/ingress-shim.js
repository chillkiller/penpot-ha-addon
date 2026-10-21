(function () {
  'use strict';
  // Ingress-Shim: re-schreibt absolute same-origin-URLs auf das aktuelle
  // Basis-Pfad-Präfix (HA-Ingress iframe). Am Root-Pfad (LAN :9010) No-Op.
  var p = window.location.pathname;
  if (!p || p === '/') return;
  var BASE = p.endsWith('/') ? p : p + '/';

  function fix(u) {
    if (typeof u !== 'string') return u;
    if (u.charAt(0) !== '/') return u;   // relativ → Browser-Basis übernimmt Präfix
    if (u.charAt(1) === '/') return u;   // protokoll-relativ
    return BASE + u.slice(1);
  }

  // fetch
  var _fetch = window.fetch && window.fetch.bind(window);
  if (_fetch) {
    window.fetch = function (input, init) {
      try {
        if (typeof input === 'string') {
          input = fix(input);
        } else if (input && typeof Request !== 'undefined' && input instanceof Request) {
          var nu = fix(input.url);
          if (nu !== input.url) input = new Request(nu, { method: input.method, headers: input.headers, body: input.body, mode: input.mode, credentials: input.credentials, cache: input.cache, redirect: input.redirect, referrer: input.referrer, integrity: input.integrity });
        }
      } catch (e) { /* im Zweifel unverändert */ }
      return _fetch(input, init);
    };
  }

  // XMLHttpRequest
  try {
    var _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (m, u) {
      var args = Array.prototype.slice.call(arguments);
      args[1] = fix(u);
      return _open.apply(this, args);
    };
  } catch (e) {}

  // Worker
  if (typeof Worker !== 'undefined') {
    var _Worker = Worker;
    window.Worker = function (u, o) {
      return new _Worker(fix(String(u)), o);
    };
    window.Worker.prototype = _Worker.prototype;
    ['onmessage', 'onerror', 'onmessageerror'].forEach(function (k) {});
  }

  // EventSource (SSE)
  if (typeof EventSource !== 'undefined') {
    var _ES = EventSource;
    window.EventSource = function (u, c) {
      return new _ES(fix(String(u)), c);
    };
    window.EventSource.prototype = _ES.prototype;
  }

  // WebSocket (absolute ws://…/ws/notifications verliert das Präfix sonst)
  if (typeof WebSocket !== 'undefined') {
    var _WS = WebSocket;
    window.WebSocket = function (u, pr) {
      var s = String(u), f = fix(s);
      if (f !== s) return new _WS(f, pr);
      try {
        var x = new URL(s, window.location.href);
        if (x.pathname && x.pathname !== '/' && BASE !== '/') {
          x.pathname = BASE.replace(/\/$/, '') + x.pathname;
          return new _WS(x.toString(), pr);
        }
      } catch (e) { /* unverändert */ }
      return new _WS(s, pr);
    };
    window.WebSocket.prototype = _WS.prototype;
    window.WebSocket.CONNECTING = _WS.CONNECTING;
    window.WebSocket.OPEN = _WS.OPEN;
    window.WebSocket.CLOSING = _WS.CLOSING;
    window.WebSocket.CLOSED = _WS.CLOSED;
  }
})();