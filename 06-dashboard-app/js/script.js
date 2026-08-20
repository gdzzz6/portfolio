/* ==========================================================================
   Pulse Analytics — Dashboard interactivity
   Vanilla JS. No frameworks, no chart libraries.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Theme toggle (persisted in localStorage, applied pre-paint in HTML)
   * ------------------------------------------------------------------ */
  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById('themeToggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('pulse-theme', next); } catch (e) { /* ignore */ }
      // Re-render charts so stroke colors that depend on computed CSS vars stay crisp.
      renderMainChart();
      renderDonutChart();
    });
  }

  /* ------------------------------------------------------------------ *
   * Sidebar collapse (desktop) + off-canvas drawer (mobile)
   * ------------------------------------------------------------------ */
  function initSidebar() {
    var app = document.getElementById('app');
    var sidebar = document.getElementById('sidebar');
    var collapseBtn = document.getElementById('sidebarCollapseBtn');
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var scrim = document.getElementById('sidebarScrim');

    function isMobile() { return window.innerWidth <= 860; }

    collapseBtn.addEventListener('click', function () {
      sidebar.classList.toggle('is-collapsed');
      try {
        localStorage.setItem('pulse-sidebar-collapsed', sidebar.classList.contains('is-collapsed') ? '1' : '0');
      } catch (e) { /* ignore */ }
    });

    hamburgerBtn.addEventListener('click', function () {
      app.classList.toggle('drawer-open');
    });

    scrim.addEventListener('click', function () {
      app.classList.remove('drawer-open');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') app.classList.remove('drawer-open');
    });

    // Close the mobile drawer automatically if the viewport grows back to desktop.
    window.addEventListener('resize', function () {
      if (!isMobile()) app.classList.remove('drawer-open');
    });

    // Restore collapsed preference (desktop) on load.
    try {
      if (localStorage.getItem('pulse-sidebar-collapsed') === '1') {
        sidebar.classList.add('is-collapsed');
      }
    } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------ *
   * User profile block — simple dropdown affordance (aria state only)
   * ------------------------------------------------------------------ */
  function initUserBlock() {
    var userBlock = document.getElementById('userBlock');
    if (!userBlock) return;
    userBlock.addEventListener('click', function () {
      var expanded = userBlock.getAttribute('aria-expanded') === 'true';
      userBlock.setAttribute('aria-expanded', String(!expanded));
    });
  }

  /* ------------------------------------------------------------------ *
   * Date range button group — visual selected state
   * ------------------------------------------------------------------ */
  function initDateRange() {
    var group = document.getElementById('dateRange');
    if (!group) return;
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.range-btn');
      if (!btn) return;
      group.querySelectorAll('.range-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  }

  /* ------------------------------------------------------------------ *
   * Sparklines (tiny SVG polylines inside stat cards)
   * ------------------------------------------------------------------ */
  function renderSparklines() {
    var svgEls = document.querySelectorAll('.sparkline[data-spark]');
    svgEls.forEach(function (svg) {
      var values = svg.getAttribute('data-spark').split(',').map(Number);
      var trend = svg.getAttribute('data-trend') === 'down' ? 'down' : 'up';
      var w = 88, h = 32, pad = 3;
      var min = Math.min.apply(null, values);
      var max = Math.max.apply(null, values);
      var range = (max - min) || 1;

      var points = values.map(function (v, i) {
        var x = pad + (i / (values.length - 1)) * (w - pad * 2);
        var y = h - pad - ((v - min) / range) * (h - pad * 2);
        return [x, y];
      });

      var pointsAttr = points.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
      var color = trend === 'up' ? 'var(--up)' : 'var(--down)';

      var last = points[points.length - 1];
      var areaPath = 'M' + points.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' L') +
        ' L' + last[0].toFixed(1) + ',' + h + ' L' + points[0][0].toFixed(1) + ',' + h + ' Z';

      svg.innerHTML =
        '<path d="' + areaPath + '" fill="' + color + '" opacity="0.12"></path>' +
        '<polyline points="' + pointsAttr + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>' +
        '<circle cx="' + last[0].toFixed(1) + '" cy="' + last[1].toFixed(1) + '" r="2.4" fill="' + color + '"></circle>';
    });
  }

  /* ------------------------------------------------------------------ *
   * Main chart — hand-built SVG line chart with gridlines, axis labels
   * and an accurate mouse-position-to-data-index hover tooltip.
   * ------------------------------------------------------------------ */
  var revenueData = [
    { label: 'Sep', value: 52400 },
    { label: 'Oct', value: 54900 },
    { label: 'Nov', value: 58200 },
    { label: 'Dec', value: 61800 },
    { label: 'Jan', value: 59100 },
    { label: 'Feb', value: 63400 },
    { label: 'Mar', value: 68700 },
    { label: 'Apr', value: 66200 },
    { label: 'May', value: 71500 },
    { label: 'Jun', value: 75300 },
    { label: 'Jul', value: 79800 },
    { label: 'Aug', value: 84210 }
  ];

  var CHART_W = 720, CHART_H = 280;
  var CHART_PAD = { top: 16, right: 16, bottom: 32, left: 52 };

  function chartScales() {
    var values = revenueData.map(function (d) { return d.value; });
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    // Add breathing room + round to a nice step.
    var niceMax = Math.ceil((max * 1.08) / 5000) * 5000;
    var niceMin = Math.max(0, Math.floor((min * 0.9) / 5000) * 5000);

    var innerW = CHART_W - CHART_PAD.left - CHART_PAD.right;
    var innerH = CHART_H - CHART_PAD.top - CHART_PAD.bottom;

    function x(i) {
      return CHART_PAD.left + (i / (revenueData.length - 1)) * innerW;
    }
    function y(v) {
      return CHART_PAD.top + innerH - ((v - niceMin) / (niceMax - niceMin)) * innerH;
    }
    return { x: x, y: y, min: niceMin, max: niceMax, innerW: innerW, innerH: innerH };
  }

  function formatCurrency(v) {
    return '$' + Math.round(v).toLocaleString('en-US');
  }
  function formatCurrencyShort(v) {
    if (v >= 1000) return '$' + (v / 1000).toFixed(0) + 'k';
    return '$' + v;
  }

  var mainChartSvg, chartTooltip, mainChartWrap;

  function renderMainChart() {
    mainChartSvg = mainChartSvg || document.getElementById('mainChart');
    if (!mainChartSvg) return;

    var scale = chartScales();
    var steps = 5;
    var parts = [];

    // Gridlines + y-axis labels
    for (var s = 0; s <= steps; s++) {
      var val = scale.min + ((scale.max - scale.min) * s) / steps;
      var gy = scale.y(val);
      parts.push('<line class="chart-grid-line" x1="' + CHART_PAD.left + '" y1="' + gy.toFixed(1) + '" x2="' + (CHART_W - CHART_PAD.right) + '" y2="' + gy.toFixed(1) + '" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"></line>');
      parts.push('<text x="' + (CHART_PAD.left - 10) + '" y="' + (gy + 3).toFixed(1) + '" text-anchor="end" font-size="10.5" font-family="var(--font-mono)" fill="var(--text-tertiary)">' + formatCurrencyShort(val) + '</text>');
    }

    // X-axis labels
    revenueData.forEach(function (d, i) {
      var gx = scale.x(i);
      parts.push('<text x="' + gx.toFixed(1) + '" y="' + (CHART_H - 10) + '" text-anchor="middle" font-size="10.5" font-family="var(--font-mono)" fill="var(--text-tertiary)">' + d.label + '</text>');
    });

    // Area fill path
    var linePoints = revenueData.map(function (d, i) { return scale.x(i).toFixed(1) + ',' + scale.y(d.value).toFixed(1); });
    var areaPath = 'M' + linePoints.join(' L') +
      ' L' + scale.x(revenueData.length - 1).toFixed(1) + ',' + (CHART_H - CHART_PAD.bottom) +
      ' L' + scale.x(0).toFixed(1) + ',' + (CHART_H - CHART_PAD.bottom) + ' Z';

    parts.push(
      '<defs>' +
        '<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="var(--accent)" stop-opacity="0.28"></stop>' +
          '<stop offset="100%" stop-color="var(--accent)" stop-opacity="0"></stop>' +
        '</linearGradient>' +
      '</defs>'
    );
    parts.push('<path d="' + areaPath + '" fill="url(#areaGrad)"></path>');
    parts.push('<polyline points="' + linePoints.join(' ') + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></polyline>');

    // Data point dots
    revenueData.forEach(function (d, i) {
      parts.push('<circle class="chart-dot" cx="' + scale.x(i).toFixed(1) + '" cy="' + scale.y(d.value).toFixed(1) + '" r="3" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"></circle>');
    });

    // Hover guide line + marker (hidden by default, shown/positioned by JS on mousemove)
    parts.push('<line id="chartGuideLine" x1="0" y1="' + CHART_PAD.top + '" x2="0" y2="' + (CHART_H - CHART_PAD.bottom) + '" stroke="var(--text-tertiary)" stroke-width="1" stroke-dasharray="4,3" opacity="0"></line>');
    parts.push('<circle id="chartGuideDot" r="5" fill="var(--accent)" stroke="var(--bg-elevated)" stroke-width="2" opacity="0"></circle>');

    mainChartSvg.innerHTML = parts.join('');
  }

  function initMainChartHover() {
    mainChartWrap = document.getElementById('mainChartWrap');
    mainChartSvg = document.getElementById('mainChart');
    chartTooltip = document.getElementById('chartTooltip');
    if (!mainChartSvg || !mainChartWrap || !chartTooltip) return;

    var scale;

    function handleMove(clientX, clientY) {
      scale = chartScales();
      var rect = mainChartSvg.getBoundingClientRect();
      var relX = clientX - rect.left;
      // Map pixel X (in rendered CSS px) to viewBox units, then to nearest data index.
      var vbX = (relX / rect.width) * CHART_W;
      var innerW = scale.innerW;
      var ratio = (vbX - CHART_PAD.left) / innerW;
      ratio = Math.max(0, Math.min(1, ratio));
      var index = Math.round(ratio * (revenueData.length - 1));
      index = Math.max(0, Math.min(revenueData.length - 1, index));

      var d = revenueData[index];
      var px = scale.x(index);
      var py = scale.y(d.value);

      var guideLine = document.getElementById('chartGuideLine');
      var guideDot = document.getElementById('chartGuideDot');
      if (guideLine) {
        guideLine.setAttribute('x1', px.toFixed(1));
        guideLine.setAttribute('x2', px.toFixed(1));
        guideLine.setAttribute('opacity', '1');
      }
      if (guideDot) {
        guideDot.setAttribute('cx', px.toFixed(1));
        guideDot.setAttribute('cy', py.toFixed(1));
        guideDot.setAttribute('opacity', '1');
      }

      // Position tooltip in wrapper-pixel space (convert viewBox coords -> rendered px)
      var wrapRect = mainChartWrap.getBoundingClientRect();
      var svgRectInWrap = {
        left: rect.left - wrapRect.left,
        top: rect.top - wrapRect.top,
        width: rect.width,
        height: rect.height
      };
      var pxRendered = svgRectInWrap.left + (px / CHART_W) * svgRectInWrap.width;
      var pyRendered = svgRectInWrap.top + (py / CHART_H) * svgRectInWrap.height;

      chartTooltip.style.left = pxRendered + 'px';
      chartTooltip.style.top = (pyRendered - 12) + 'px';
      chartTooltip.innerHTML = '<span class="tt-label">' + d.label + '</span><span class="tt-value">' + formatCurrency(d.value) + '</span>';
      chartTooltip.classList.add('is-visible');
    }

    function handleLeave() {
      var guideLine = document.getElementById('chartGuideLine');
      var guideDot = document.getElementById('chartGuideDot');
      if (guideLine) guideLine.setAttribute('opacity', '0');
      if (guideDot) guideDot.setAttribute('opacity', '0');
      chartTooltip.classList.remove('is-visible');
    }

    mainChartSvg.addEventListener('mousemove', function (e) {
      handleMove(e.clientX, e.clientY);
    });
    mainChartSvg.addEventListener('mouseleave', handleLeave);

    // Basic touch support
    mainChartSvg.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    mainChartSvg.addEventListener('touchend', handleLeave);
  }

  /* ------------------------------------------------------------------ *
   * Donut chart — SVG arcs via stroke-dasharray on stacked circles,
   * with legend hover highlighting the matching slice.
   * ------------------------------------------------------------------ */
  var channelData = [
    { label: 'Direct', value: 38, color: 'var(--chan-1)' },
    { label: 'Organic Search', value: 29, color: 'var(--chan-2)' },
    { label: 'Referral', value: 19, color: 'var(--chan-3)' },
    { label: 'Social', value: 14, color: 'var(--chan-4)' }
  ];

  function renderDonutChart() {
    var svg = document.getElementById('donutChart');
    var legend = document.getElementById('donutLegend');
    if (!svg || !legend) return;

    var size = 180, cx = 90, cy = 90, r = 62, strokeW = 24;
    var circumference = 2 * Math.PI * r;
    var offsetAcc = 0;

    var slicesHtml = channelData.map(function (d, i) {
      var dash = (d.value / 100) * circumference;
      var gap = circumference - dash;
      var rotation = (offsetAcc / 100) * 360 - 90;
      offsetAcc += d.value;
      return '<circle class="donut-slice" data-index="' + i + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '" ' +
        'fill="none" stroke="' + d.color + '" stroke-width="' + strokeW + '" ' +
        'stroke-dasharray="' + dash.toFixed(2) + ' ' + gap.toFixed(2) + '" ' +
        'stroke-linecap="butt" ' +
        'transform="rotate(' + rotation.toFixed(2) + ' ' + cx + ' ' + cy + ')"></circle>';
    }).join('');

    var centerHtml =
      '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="20" font-weight="700" font-family="var(--font-mono)" fill="var(--text-primary)">' + channelData.length + '</text>' +
      '<text x="' + cx + '" y="' + (cy + 14) + '" text-anchor="middle" font-size="9.5" fill="var(--text-tertiary)">channels</text>';

    svg.innerHTML = slicesHtml + centerHtml;

    legend.innerHTML = channelData.map(function (d, i) {
      return '<li class="donut-legend-item" data-index="' + i + '">' +
        '<span class="donut-legend-dot" style="background:' + d.color + '"></span>' +
        '<span class="donut-legend-label">' + d.label + '</span>' +
        '<span class="donut-legend-value">' + d.value + '%</span>' +
      '</li>';
    }).join('');

    initDonutHover();
  }

  function initDonutHover() {
    var wrap = document.querySelector('.donut-wrap');
    var svg = document.getElementById('donutChart');
    var legend = document.getElementById('donutLegend');
    if (!wrap || !svg || !legend) return;

    function setHover(index) {
      var slices = svg.querySelectorAll('.donut-slice');
      var items = legend.querySelectorAll('.donut-legend-item');
      if (index === null) {
        wrap.classList.remove('has-hover');
        slices.forEach(function (s) { s.classList.remove('is-hovered'); });
        items.forEach(function (it) { it.classList.remove('is-hovered'); });
        return;
      }
      wrap.classList.add('has-hover');
      slices.forEach(function (s) {
        s.classList.toggle('is-hovered', s.getAttribute('data-index') === String(index));
      });
      items.forEach(function (it) {
        it.classList.toggle('is-hovered', it.getAttribute('data-index') === String(index));
      });
    }

    svg.querySelectorAll('.donut-slice').forEach(function (slice) {
      slice.addEventListener('mouseenter', function () { setHover(slice.getAttribute('data-index')); });
    });
    svg.addEventListener('mouseleave', function () { setHover(null); });

    legend.querySelectorAll('.donut-legend-item').forEach(function (item) {
      item.addEventListener('mouseenter', function () { setHover(item.getAttribute('data-index')); });
      item.addEventListener('mouseleave', function () { setHover(null); });
    });
  }

  /* ------------------------------------------------------------------ *
   * Recent Orders table — sortable columns + live customer-name filter
   * ------------------------------------------------------------------ */
  var ordersData = [
    { id: '#ORD-8841', customer: 'Maya Torres', email: 'maya.torres@brightloop.io', amount: 428.50, status: 'paid', date: '2026-08-18' },
    { id: '#ORD-8840', customer: 'Ethan Cole', email: 'ethan.cole@nordwork.co', amount: 129.00, status: 'pending', date: '2026-08-18' },
    { id: '#ORD-8839', customer: 'Priya Sharma', email: 'priya.sharma@vellum.app', amount: 892.15, status: 'paid', date: '2026-08-17' },
    { id: '#ORD-8838', customer: 'Lucas Mendes', email: 'lucas.mendes@ferra.dev', amount: 64.99, status: 'failed', date: '2026-08-17' },
    { id: '#ORD-8837', customer: 'Sofia Rossi', email: 'sofia.rossi@haloshop.com', amount: 315.20, status: 'paid', date: '2026-08-16' },
    { id: '#ORD-8836', customer: 'Noah Kim', email: 'noah.kim@studiobase.io', amount: 210.00, status: 'paid', date: '2026-08-15' },
    { id: '#ORD-8835', customer: 'Amara Johnson', email: 'amara.j@cinderco.com', amount: 1024.75, status: 'paid', date: '2026-08-15' },
    { id: '#ORD-8834', customer: 'Felix Wagner', email: 'felix.wagner@northbyte.de', amount: 76.40, status: 'pending', date: '2026-08-14' },
    { id: '#ORD-8833', customer: 'Isla MacLeod', email: 'isla.macleod@fernhill.io', amount: 458.00, status: 'paid', date: '2026-08-13' },
    { id: '#ORD-8832', customer: 'Diego Alvarez', email: 'diego.alvarez@rutaverde.com', amount: 39.99, status: 'failed', date: '2026-08-12' },
    { id: '#ORD-8831', customer: 'Hannah Reyes', email: 'hannah.reyes@pallete.co', amount: 682.30, status: 'paid', date: '2026-08-11' },
    { id: '#ORD-8830', customer: 'Ola Bergström', email: 'ola.b@nordframe.se', amount: 154.50, status: 'pending', date: '2026-08-10' }
  ];

  var tableState = { sortKey: 'date', sortDir: 'desc', filterTerm: '' };

  function initialsOf(name) {
    var parts = name.trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : '';
    var last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  function hueFromString(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash) % 360;
  }

  function formatDateLabel(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function statusPillHtml(status) {
    var map = { paid: ['pill-paid', 'Paid'], pending: ['pill-pending', 'Pending'], failed: ['pill-failed', 'Failed'] };
    var entry = map[status] || ['pill-pending', status];
    return '<span class="pill ' + entry[0] + '">' + entry[1] + '</span>';
  }

  function getFilteredSortedOrders() {
    var term = tableState.filterTerm.trim().toLowerCase();
    var rows = ordersData.filter(function (o) {
      return !term || o.customer.toLowerCase().indexOf(term) !== -1;
    });

    var key = tableState.sortKey;
    var dir = tableState.sortDir === 'asc' ? 1 : -1;

    rows = rows.slice().sort(function (a, b) {
      var av = a[key], bv = b[key];
      if (key === 'amount') {
        return (av - bv) * dir;
      }
      if (key === 'date') {
        return (new Date(av) - new Date(bv)) * dir;
      }
      // string compare (id, customer, status)
      av = String(av).toLowerCase();
      bv = String(bv).toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });

    return rows;
  }

  function renderOrdersTable() {
    var tbody = document.getElementById('ordersTableBody');
    var emptyEl = document.getElementById('tableEmpty');
    var emptyTermEl = document.getElementById('tableEmptyTerm');
    if (!tbody) return;

    var rows = getFilteredSortedOrders();

    if (rows.length === 0) {
      tbody.innerHTML = '';
      if (emptyEl) {
        emptyEl.hidden = false;
        if (emptyTermEl) emptyTermEl.textContent = tableState.filterTerm;
      }
    } else {
      if (emptyEl) emptyEl.hidden = true;
      tbody.innerHTML = rows.map(function (o) {
        var hue = hueFromString(o.customer);
        return (
          '<tr>' +
            '<td class="cell-id">' + o.id + '</td>' +
            '<td>' +
              '<div class="cell-customer">' +
                '<span class="avatar" style="--avatar-hue:' + hue + '">' + initialsOf(o.customer) + '</span>' +
                '<span>' +
                  '<span class="cell-customer-name">' + o.customer + '</span>' +
                  '<span class="cell-customer-email">' + o.email + '</span>' +
                '</span>' +
              '</div>' +
            '</td>' +
            '<td class="is-numeric">' + formatCurrency(o.amount) + '</td>' +
            '<td>' + statusPillHtml(o.status) + '</td>' +
            '<td class="cell-date">' + formatDateLabel(o.date) + '</td>' +
          '</tr>'
        );
      }).join('');
    }

    // Update header sort indicators
    document.querySelectorAll('#ordersTable th.sortable').forEach(function (th) {
      var key = th.getAttribute('data-key');
      th.classList.remove('is-sorted', 'sort-asc', 'sort-desc');
      if (key === tableState.sortKey) {
        th.classList.add('is-sorted', tableState.sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
      }
    });
  }

  function initOrdersTable() {
    var headerRow = document.querySelector('#ordersTable thead tr');
    var filterInput = document.getElementById('tableFilter');

    if (headerRow) {
      headerRow.addEventListener('click', function (e) {
        var th = e.target.closest('th.sortable');
        if (!th) return;
        var key = th.getAttribute('data-key');
        if (tableState.sortKey === key) {
          tableState.sortDir = tableState.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          tableState.sortKey = key;
          // Sensible default directions: amount/date start descending (biggest/most recent first)
          tableState.sortDir = (key === 'amount' || key === 'date') ? 'desc' : 'asc';
        }
        renderOrdersTable();
      });
    }

    if (filterInput) {
      filterInput.addEventListener('input', function () {
        tableState.filterTerm = filterInput.value;
        renderOrdersTable();
      });
    }

    renderOrdersTable();
  }

  /* ------------------------------------------------------------------ *
   * Top Products list
   * ------------------------------------------------------------------ */
  var topProductsData = [
    { name: 'Pulse Pro Plan', value: '$32,410', pct: 92 },
    { name: 'Analytics Add-on', value: '$18,760', pct: 68 },
    { name: 'Team Seats', value: '$14,220', pct: 54 },
    { name: 'API Overage', value: '$9,480', pct: 38 },
    { name: 'Onboarding Package', value: '$5,120', pct: 21 }
  ];

  function renderTopProducts() {
    var list = document.getElementById('topProducts');
    if (!list) return;
    list.innerHTML = topProductsData.map(function (p, i) {
      return (
        '<li class="top-product-item">' +
          '<span class="tp-rank">' + (i + 1) + '</span>' +
          '<span class="tp-info">' +
            '<span class="tp-name">' + p.name + '</span>' +
            '<span class="tp-bar-track"><span class="tp-bar-fill" style="width:' + p.pct + '%"></span></span>' +
          '</span>' +
          '<span class="tp-value">' + p.value + '</span>' +
        '</li>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------ *
   * Init
   * ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initSidebar();
    initUserBlock();
    initDateRange();
    renderSparklines();
    renderMainChart();
    initMainChartHover();
    renderDonutChart();
    initOrdersTable();
    renderTopProducts();

    // Re-render charts on resize so the hover mapping stays accurate
    // against the SVG's actual rendered size (viewBox scaling).
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        renderMainChart();
      }, 120);
    });
  });
})();
