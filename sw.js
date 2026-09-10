/* Data Modelling for Power BI, offline cache. Generated, do not edit by hand. */
var CACHE = "pbi-mc-0390a621e8";
var ASSETS = [
  "./index.html",
  "./search.json",
  "./manifest.webmanifest",
  "./assets/app.css",
  "./assets/app.js",
  "./ch/A.html",
  "./ch/B.html",
  "./ch/C.html",
  "./ch/D.html",
  "./ch/00.html",
  "./ch/01.html",
  "./ch/02.html",
  "./ch/03.html",
  "./ch/04.html",
  "./ch/05.html",
  "./ch/06.html",
  "./ch/07.html",
  "./ch/08.html",
  "./ch/09.html",
  "./ch/10.html",
  "./ch/11.html",
  "./ch/12.html",
  "./ch/13.html",
  "./ch/14.html",
  "./ch/15.html",
  "./ch/16.html",
  "./ch/17.html",
  "./ch/18.html",
  "./ch/19.html",
  "./ch/20.html",
  "./ch/21.html",
  "./ch/E.html",
  "./ch/F.html",
  "./assets/fonts/0210dffb8d05.woff2",
  "./assets/fonts/035f1b5c566e.woff2",
  "./assets/fonts/0564cf0e9004.woff2",
  "./assets/fonts/0bc96cd0d5b0.woff2",
  "./assets/fonts/116b2e588e3b.woff2",
  "./assets/fonts/1969f6ffdbf5.woff2",
  "./assets/fonts/1b581b151893.woff2",
  "./assets/fonts/1c9061cda787.woff2",
  "./assets/fonts/20a2282437fb.woff2",
  "./assets/fonts/264226c2a81f.woff2",
  "./assets/fonts/2c9573ead22c.woff2",
  "./assets/fonts/2d5256eb9fc2.woff2",
  "./assets/fonts/31a13eb3eb89.woff2",
  "./assets/fonts/3bc0e2d21685.woff2",
  "./assets/fonts/3c1d6686eeec.woff2",
  "./assets/fonts/4c44d894c77c.woff2",
  "./assets/fonts/5cd8a0d35559.woff2",
  "./assets/fonts/5d08296bfe97.woff2",
  "./assets/fonts/5ead4b0975b6.woff2",
  "./assets/fonts/632855d1d7aa.woff2",
  "./assets/fonts/64d42499a463.woff2",
  "./assets/fonts/67e25181688f.woff2",
  "./assets/fonts/758b9f95f75a.woff2",
  "./assets/fonts/863c73553b8d.woff2",
  "./assets/fonts/868a235a9c8b.woff2",
  "./assets/fonts/92e63ec1067b.woff2",
  "./assets/fonts/93cfae71a503.woff2",
  "./assets/fonts/9a1070392547.woff2",
  "./assets/fonts/9e4ef71e303c.woff2",
  "./assets/fonts/9f82391e9b15.woff2",
  "./assets/fonts/a15d607a76a1.woff2",
  "./assets/fonts/a6dd22768125.woff2",
  "./assets/fonts/a73533172c59.woff2",
  "./assets/fonts/ba1487898ffe.woff2",
  "./assets/fonts/baf63ee991d8.woff2",
  "./assets/fonts/c73940f4fb37.woff2",
  "./assets/fonts/cebbca458f90.woff2",
  "./assets/fonts/cf22e2896fe0.woff2",
  "./assets/fonts/da78b4b316e6.woff2",
  "./assets/fonts/daa6ba71b83a.woff2",
  "./assets/fonts/e2661bcc0d77.woff2",
  "./assets/fonts/e8c66a4c41d0.woff2",
  "./assets/fonts/fb03f5d3f43d.woff2",
  "./assets/fonts/fe670a7e7c5c.woff2",
  "./assets/fonts/fonts.css",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./data/AircraftRegistry.csv",
  "./data/CrewAssignment.csv",
  "./data/CrewCodeMap.csv",
  "./data/CrewRoster.csv",
  "./data/DeptSubmission.csv",
  "./data/HMCCSchedule.csv",
  "./data/HeavyPreInput.csv",
  "./data/LaborEntries.csv",
  "./data/ManhourForecast.csv",
  "./data/PartsIssued.csv",
  "./data/ProductivityFactor.csv",
  "./data/RPODemand.csv",
  "./data/ShopCapacity.csv",
  "./data/Technicians.csv",
  "./data/WorkOrders.csv",
  "./data/index.html"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(ASSETS.map(function (u) {
      return c.add(new Request(u, { cache: "reload" })).catch(function () {});
    }));
  }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) {
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504, statusText: "offline" });
      });
    })
  );
});
