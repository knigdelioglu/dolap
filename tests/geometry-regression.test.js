const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = path.join(__dirname, '..', 'suntalam_dolap_hesaplay_c_ve_kesim_planlay_c.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const scriptStart = html.lastIndexOf('<script>') + '<script>'.length;
const scriptEnd = html.lastIndexOf('</script>');
const script = html.slice(scriptStart, scriptEnd);

function dummyElement() {
  return {
    value: '', checked: false, innerHTML: '', textContent: '', style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, appendChild() {}, removeChild() {}, select() {},
    querySelectorAll() { return []; }
  };
}

const document = {
  getElementById() { return dummyElement(); },
  querySelectorAll() { return []; },
  addEventListener() {},
  createElement() { return dummyElement(); },
  body: { appendChild() {}, removeChild() {} },
  execCommand() { return true; }
};

const context = {
  document,
  window: {},
  console,
  Math,
  Number,
  parseFloat,
  parseInt,
  setTimeout() {},
  module: { exports: {} },
  exports: {}
};

vm.createContext(context);
vm.runInContext(script, context);
const { hesaplaGeometri } = context.module.exports;

function base(overrides = {}) {
  return Object.assign({
    t: 18, b: 0.4, arkalikT: 3, cekmeceTabanT: 3,
    W: 1400, H: 2000, D: 550, H_baza: 80,
    kapakTipi: '1', kanatSayisi: 2, bolmeSayisi: 2,
    yuklukVar: false, H_yukluk: 400,
    supurgeVar: false, W_supurge: 220,
    cekmeceKonum: 'yok', cekmeceAdet: 3,
    rayBoyu: 450, rayYanBosluk: 13,
    kutuH: 130, cekmeceToplamH: 560, sigCekmece: false,
    surguProfili: { rafOnBosluk: 85, yukseklikPayi: 40, kapakBindirme: 30 },
    bolmeAyarlari: [
      { rafSayisi: 2, askilik: '0' },
      { rafSayisi: 1, askilik: '1' },
      { rafSayisi: 1, askilik: '0' }
    ]
  }, overrides);
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
    passed += 1;
  } catch (error) {
    console.error(`FAIL ${name}: ${error.message}`);
    failed += 1;
  }
}

function assertPositiveCuts(model) {
  assert(model.kesimler.every(item =>
    Number.isFinite(item.kesimBoy) && item.kesimBoy > 0 &&
    Number.isFinite(item.kesimEn) && item.kesimEn > 0
  ), 'geçerli modelde sıfır/negatif/NaN kesim bulundu');
}

test('varsayılan model geçerli ve tüm kesimler pozitif', () => {
  const model = hesaplaGeometri(base());
  assert(model.gecerli, (model.hatalar || []).join(' | '));
  assertPositiveCuts(model);
});

test('3 bölme + 2 kapak + dış çekmece bloke edilir', () => {
  const model = hesaplaGeometri(base({ bolmeSayisi: 3, kanatSayisi: 2, cekmeceKonum: 'bolme1' }));
  assert(!model.gecerli, 'çakışmalı facade düzeni geçerli kabul edildi');
});

test('2 bölme + 1 kapak + dış çekmece bloke edilir', () => {
  const model = hesaplaGeometri(base({ bolmeSayisi: 2, kanatSayisi: 1, cekmeceKonum: 'bolme2' }));
  assert(!model.gecerli, 'çakışmalı facade düzeni geçerli kabul edildi');
});

test('3 bölme + 2 kapak + çekmecesiz model uyarıyla geçebilir', () => {
  const model = hesaplaGeometri(base({ bolmeSayisi: 3, kanatSayisi: 2, cekmeceKonum: 'yok' }));
  assert(model.gecerli, (model.hatalar || []).join(' | '));
  assert(model.uyarilar.length > 0, 'dikme/kapak hizası uyarısı bekleniyordu');
  assertPositiveCuts(model);
});

test('1 bölme + 3 standart menteşeli kanat bloke edilir', () => {
  const model = hesaplaGeometri(base({ bolmeSayisi: 1, kanatSayisi: 3 }));
  assert(!model.gecerli, 'taşıyıcısız 3 kanat geçerli kabul edildi');
});

test('negatif kenar bandı bloke edilir', () => {
  assert(!hesaplaGeometri(base({ b: -5 })).gecerli, 'negatif bant geçerli kabul edildi');
});

test('negatif panel kalınlığı bloke edilir', () => {
  assert(!hesaplaGeometri(base({ t: -18 })).gecerli, 'negatif panel kalınlığı geçerli kabul edildi');
});

test('negatif ray yan boşluğu bloke edilir', () => {
  const model = hesaplaGeometri(base({ cekmeceKonum: 'bolme1', rayYanBosluk: -20 }));
  assert(!model.gecerli, 'negatif ray yan boşluğu geçerli kabul edildi');
});

test('aşırı kalın kenar bandı negatif kesim üretemez', () => {
  const model = hesaplaGeometri(base({ b: 400 }));
  assert(!model.gecerli, 'negatif kesim üretecek bant kalınlığı geçerli kabul edildi');
  assert(model.kesimler.length === 0, 'geçersiz model kesim listesi döndürdü');
});

test('2 bölme + 4 kapak + dış çekmece geçerli ve 4 ana kanat üretir', () => {
  const model = hesaplaGeometri(base({ bolmeSayisi: 2, kanatSayisi: 4, cekmeceKonum: 'bolme1' }));
  assert(model.gecerli, (model.hatalar || []).join(' | '));
  assert(model.kapaklar.length === 4, `4 kapak beklenirken ${model.kapaklar.length} üretildi`);
  assertPositiveCuts(model);
});

test('süpürge koridoru kapağı ana kanat sayısından ayrıdır', () => {
  const model = hesaplaGeometri(base({ supurgeVar: true, W_supurge: 220, kanatSayisi: 2 }));
  assert(model.gecerli, (model.hatalar || []).join(' | '));
  assert(model.kapaklar.length === 3, '2 ana kapak + 1 süpürge kapağı bekleniyordu');
});

test('sürgü altında bölme çekmecesi iç çekmece olarak kalır', () => {
  const model = hesaplaGeometri(base({ kapakTipi: '2', cekmeceKonum: 'bolme1' }));
  assert(model.gecerli, (model.hatalar || []).join(' | '));
  assert(model.cekmeceModul.isIcCekmece === true, 'iç çekmece bekleniyordu');
  assert(model.cekmeceModul.klapalar.length === 0, 'iç çekmecede dış klapa olmamalı');
  assertPositiveCuts(model);
});

console.log(`\nGeometry regression: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);

// Trigger marker for the one-shot geometry patch workflow.
