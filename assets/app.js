(function () {
  "use strict";
  var KEY = "pbi-mc-v1";
  var isIndex = document.body.classList.contains("is-index");
  var root = isIndex ? "" : "../";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(root + "sw.js").catch(function () {});
    });
  }

  var deferred = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e;
    var n = document.getElementById("installNote");
    if (n) n.hidden = false;
  });
  var ib = document.getElementById("installBtn");
  if (ib) ib.addEventListener("click", function () {
    if (!deferred) return;
    deferred.prompt(); deferred = null;
    var n = document.getElementById("installNote"); if (n) n.hidden = true;
  });

  var bar = document.getElementById("progress");
  function docPct() {
    var d = document.documentElement;
    var max = d.scrollHeight - d.clientHeight;
    if (max <= 0) return 100;
    return Math.min(100, Math.max(0, ((window.scrollY || window.pageYOffset) / max) * 100));
  }

  /* ===================== chapter page ===================== */
  var chId = document.body.getAttribute("data-ch");
  if (chId) {
    var st0 = load();
    st0.read = st0.read || {};
    var saved = st0.read[chId];
    var wantTop = /(^|[#?&])top\b/.test(location.hash + location.search);

    if (!location.hash && !wantTop && saved && saved.y > 240 && (saved.pct || 0) < 97) {
      window.scrollTo(0, saved.y);
      var chip = document.getElementById("resumeChip");
      if (chip) {
        chip.hidden = false;
        var hide = setTimeout(function () { chip.hidden = true; }, 8000);
        var rt = document.getElementById("resumeTop");
        if (rt) rt.addEventListener("click", function () {
          clearTimeout(hide);
          window.scrollTo({ top: 0, behavior: "smooth" });
          chip.hidden = true;
        });
      }
    }

    var pctEl = document.getElementById("tbPct");
    var ticking = false, lastSave = 0;

    function record() {
      var p = docPct();
      if (bar) bar.style.width = p + "%";
      if (pctEl) pctEl.textContent = Math.round(p) + "%";
      var now = Date.now();
      if (now - lastSave < 400) return;
      lastSave = now;
      var s = load();
      s.read = s.read || {};
      var prev = s.read[chId] || {};
      s.read[chId] = {
        y: window.scrollY || window.pageYOffset,
        pct: p,
        max: Math.max(prev.max || 0, p),
        ts: now
      };
      s.last = { ch: chId, pct: p, ts: now };
      save(s);
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { record(); ticking = false; });
    }, { passive: true });
    window.addEventListener("pagehide", function () { lastSave = 0; record(); });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") { lastSave = 0; record(); }
    });
    record();

    var details = [].slice.call(document.querySelectorAll("details.expand"));
    var wantsOpen = /expandall|print/i.test(location.hash + location.search);
    if (!wantsOpen) details.forEach(function (d) { d.open = false; });
    var prior = null;
    window.addEventListener("beforeprint", function () {
      prior = details.map(function (d) { return d.open; });
      details.forEach(function (d) { d.open = true; });
    });
    window.addEventListener("afterprint", function () {
      if (!prior) return;
      details.forEach(function (d, i) { d.open = prior[i]; });
      prior = null;
    });

    document.addEventListener("keydown", function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var links = document.querySelectorAll(".prevnext .pn");
      if (e.key === "ArrowLeft" && links[0]) links[0].click();
      if (e.key === "ArrowRight" && links[1]) links[1].click();
    });
    return;
  }

  /* ===================== index page ===================== */
  var s = load();
  s.read = s.read || {};
  var rows = [].slice.call(document.querySelectorAll(".ct-row"));

  function paint() {
    var done = 0, started = 0;
    rows.forEach(function (row) {
      var id = row.getAttribute("data-ch");
      var r = s.read[id];
      var pct = r ? Math.round(r.max || r.pct || 0) : 0;
      var fill = row.querySelector(".ct-bar i");
      var stt = row.querySelector(".ct-state");
      if (fill) fill.style.width = pct + "%";
      row.classList.toggle("is-read", pct >= 92);
      row.classList.toggle("is-part", pct > 3 && pct < 92);
      if (stt) stt.textContent = pct >= 92 ? "Read" : (pct > 3 ? pct + "% read" : "");
      if (pct >= 92) done++; else if (pct > 3) started++;
    });
    var overall = rows.length ? ((done + started * 0.5) / rows.length) * 100 : 0;
    var f = document.getElementById("bigbarFill");
    if (f) f.style.width = overall.toFixed(1) + "%";
    var note = document.getElementById("progressNote");
    if (note) {
      note.textContent = (done === 0 && started === 0)
        ? "Nothing read yet. Chapter A is the place to start."
        : done + " of " + rows.length + " chapters finished" +
          (started ? ", " + started + " in progress" : "") + ".";
    }
    var panel = document.getElementById("resumePanel");
    if (s.last && s.last.ch && panel) {
      var row = document.querySelector('.ct-row[data-ch="' + s.last.ch + '"]');
      if (row) {
        panel.hidden = false;
        document.getElementById("rcNum").textContent = s.last.ch;
        document.getElementById("rcTitle").textContent = row.querySelector(".ct-t").textContent;
        document.getElementById("rcPct").textContent =
          Math.round(s.last.pct || 0) + " percent through this chapter";
        document.getElementById("resumeCard").setAttribute("href", "ch/" + s.last.ch + ".html");
      }
    }
  }
  paint();

  var reset = document.getElementById("resetProgress");
  if (reset) reset.addEventListener("click", function () {
    s = { read: {} };
    save(s);
    var p = document.getElementById("resumePanel");
    if (p) p.hidden = true;
    paint();
  });

  var q = document.getElementById("q");
  var out = document.getElementById("results");
  var idx = null;
  if (q && out) {
    fetch("search.json").then(function (r) { return r.json(); })
      .then(function (j) { idx = j; })
      .catch(function () {});
    q.addEventListener("input", function () {
      var term = q.value.trim().toLowerCase();
      out.innerHTML = "";
      if (!idx || term.length < 2) return;
      var hits = [];
      idx.forEach(function (c) {
        if (c.title.toLowerCase().indexOf(term) >= 0 || c.lede.toLowerCase().indexOf(term) >= 0) {
          hits.push({ c: c, h: null });
        }
        c.headings.forEach(function (h) {
          if (h.toLowerCase().indexOf(term) >= 0) hits.push({ c: c, h: h });
        });
      });
      hits.slice(0, 25).forEach(function (x) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", "ch/" + x.c.id + ".html");
        var n = document.createElement("span"); n.className = "r-n"; n.textContent = x.c.id;
        var b = document.createElement("span"); b.className = "r-b";
        var t = document.createElement("span"); t.className = "r-t"; t.textContent = x.c.title;
        var h = document.createElement("span"); h.className = "r-h";
        h.textContent = x.h || x.c.lede.slice(0, 120);
        b.appendChild(t); b.appendChild(h);
        a.appendChild(n); a.appendChild(b);
        li.appendChild(a); out.appendChild(li);
      });
      if (!hits.length) {
        var li2 = document.createElement("li");
        li2.innerHTML = '<a href="#"><span class="r-n"></span><span class="r-b"><span class="r-h">No chapter heading matches that. Try a shorter word.</span></span></a>';
        out.appendChild(li2);
      }
    });
  }
})();
