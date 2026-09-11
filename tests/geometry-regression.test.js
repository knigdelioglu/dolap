const fs=require('fs'),vm=require('vm');
const path=require('path').join(__dirname,'..','suntalam_dolap_hesaplay_c_ve_kesim_planlay_c.html');
const html=fs.readFileSync(path,'utf8');
const script=html.slice(html.lastIndexOf('<script>')+8,html.lastIndexOf('</script>'));
function dummy(){return {value:'',checked:false,innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},appendChild(){},removeChild(){},select(){},querySelectorAll(){return []}}}
const context={document:{getElementById(){return dummy()},querySelectorAll(){return []},addEventListener(){},createElement(){return dummy()},body:{appendChild(){},removeChild(){}},execCommand(){return true}},window:{},console,Math,Number,parseFloat,parseInt,setTimeout(){},module:{exports:{}},exports:{}};
vm.createContext(context);vm.runInContext(script,context);
const {hesaplaGeometri}=context.module.exports;
function base(o={}){return Object.assign({t:18,b:.4,arkalikT:3,cekmeceTabanT:3,W:1400,H:2000,D:550,H_baza:80,kapakTipi:'1',kanatSayisi:2,bolmeSayisi:2,yuklukVar:false,H_yukluk:400,supurgeVar:false,W_supurge:220,cekmeceKonum:'yok',cekmeceAdet:3,rayBoyu:450,rayYanBosluk:13,kutuH:130,cekmeceToplamH:560,sigCekmece:false,surguProfili:{rafOnBosluk:85,yukseklikPayi:40,kapakBindirme:30},bolmeAyarlari:[{rafSayisi:2,askilik:'0'},{rafSayisi:1,askilik:'1'},{rafSayisi:1,askilik:'0'}]},o)}
let pass=0,fail=0;
function assert(x,m){if(!x)throw new Error(m)}
function test(n,fn){try{fn();console.log('PASS',n);pass++}catch(e){console.error('FAIL',n,e.message);fail++}}
function positive(m){assert(m.kesimler.every(x=>Number.isFinite(x.kesimBoy)&&x.kesimBoy>0&&Number.isFinite(x.kesimEn)&&x.kesimEn>0),'invalid cut'); assert(m.kapaklar.every(x=>Number.isFinite(x.x)&&Number.isFinite(x.y)&&x.w>0&&x.h>0&&x.x>=-1e-6&&x.y>=-1e-6&&x.x+x.w<=m.kasa.W+1e-6&&x.y+x.h<=m.kasa.H+1e-6),'door out of bounds')}

test('default',()=>{let m=hesaplaGeometri(base());assert(m.gecerli,m.hatalar);positive(m)});
test('invalid door type rejected',()=>assert(!hesaplaGeometri(base({kapakTipi:'x'})).gecerli));
test('invalid drawer loc rejected',()=>assert(!hesaplaGeometri(base({cekmeceKonum:'banana'})).gecerli));
test('NaN vacuum rejected',()=>assert(!hesaplaGeometri(base({supurgeVar:true,W_supurge:NaN})).gecerli));
test('NaN luggage rejected',()=>assert(!hesaplaGeometri(base({yuklukVar:true,H_yukluk:NaN})).gecerli));
test('negative shelves rejected',()=>assert(!hesaplaGeometri(base({bolmeAyarlari:[{rafSayisi:-1,askilik:'0'},{rafSayisi:1,askilik:'0'}]})).gecerli));
test('too many shelves rejected',()=>assert(!hesaplaGeometri(base({bolmeAyarlari:[{rafSayisi:9,askilik:'0'},{rafSayisi:1,askilik:'0'}]})).gecerli));
test('invalid hanger rejected',()=>assert(!hesaplaGeometri(base({bolmeAyarlari:[{rafSayisi:1,askilik:'wat'},{rafSayisi:1,askilik:'0'}]})).gecerli));
test('huge slide overlap rejected',()=>assert(!hesaplaGeometri(base({kapakTipi:'2',surguProfili:{rafOnBosluk:85,yukseklikPayi:40,kapakBindirme:5000}})).gecerli));
test('NaN slide profile rejected',()=>assert(!hesaplaGeometri(base({kapakTipi:'2',surguProfili:{rafOnBosluk:85,yukseklikPayi:40,kapakBindirme:NaN}})).gecerli));
test('3-section middle inner drawer behind slider rejected',()=>assert(!hesaplaGeometri(base({W:1800,D:650,rayBoyu:450,kapakTipi:'2',bolmeSayisi:3,cekmeceKonum:'bolme2'})).gecerli));
test('3-section left inner drawer behind slider valid',()=>{let m=hesaplaGeometri(base({W:1800,D:650,rayBoyu:450,kapakTipi:'2',bolmeSayisi:3,cekmeceKonum:'bolme1'}));assert(m.gecerli,m.hatalar);positive(m)});
test('3-section right inner drawer behind slider valid',()=>{let m=hesaplaGeometri(base({W:1800,D:650,rayBoyu:450,kapakTipi:'2',bolmeSayisi:3,cekmeceKonum:'bolme3'}));assert(m.gecerli,m.hatalar);positive(m)});
test('single-section full inner drawer behind slider rejected',()=>assert(!hesaplaGeometri(base({kapakTipi:'2',bolmeSayisi:1,cekmeceKonum:'bolme1'})).gecerli));
test('2-section left inner drawer behind slider valid',()=>{let m=hesaplaGeometri(base({kapakTipi:'2',bolmeSayisi:2,cekmeceKonum:'bolme1'}));assert(m.gecerli,m.hatalar);positive(m)});
test('2-section right inner drawer behind slider valid',()=>{let m=hesaplaGeometri(base({kapakTipi:'2',bolmeSayisi:2,cekmeceKonum:'bolme2'}));assert(m.gecerli,m.hatalar);positive(m)});
test('wide template remains valid',()=>{let m=hesaplaGeometri(base({W:1800,H:2200,D:650,H_baza:80,kapakTipi:'2',bolmeSayisi:2,yuklukVar:true,H_yukluk:450,supurgeVar:true,W_supurge:250,cekmeceKonum:'bolme2',rayBoyu:450}));assert(m.gecerli,m.hatalar);positive(m)});
test('slider + vacuum includes hinge hardware',()=>{let m=hesaplaGeometri(base({W:1800,D:650,kapakTipi:'2',supurgeVar:true,W_supurge:250,cekmeceKonum:'yok'}));assert(m.gecerli,m.hatalar);assert(m.nalburiye.some(x=>x.includes('Süpürge koridoru kapağı için tahmini')),'hinge hardware missing');assert(m.vidalar.some(x=>x.includes('Süpürge Koridoru Menteşe')),'hinge screws missing')});
test('tiny hanger section cannot yield zero/negative rod',()=>{let m=hesaplaGeometri(base({W:85,bolmeSayisi:3,kapakTipi:'3',bolmeAyarlari:[{rafSayisi:0,askilik:'1'},{rafSayisi:0,askilik:'0'},{rafSayisi:0,askilik:'0'}]}));assert(!m.gecerli,'tiny hanger accepted')});
test('previous external drawer overlap stays rejected',()=>assert(!hesaplaGeometri(base({bolmeSayisi:3,kanatSayisi:2,cekmeceKonum:'bolme1'})).gecerli));
test('2 sections 4 hinged leaves + external drawer valid',()=>{let m=hesaplaGeometri(base({bolmeSayisi:2,kanatSayisi:4,cekmeceKonum:'bolme1'}));assert(m.gecerli,m.hatalar);assert(m.kapaklar.length===4);positive(m)});
test('negative raw values rejected',()=>{for(const o of [{b:-1},{t:-1},{arkalikT:-1},{H_baza:-1},{cekmeceKonum:'bolme1',rayYanBosluk:-1},{cekmeceKonum:'bolme1',rayBoyu:-1}])assert(!hesaplaGeometri(base(o)).gecerli,JSON.stringify(o))});

let matrix=0;
for(const kapakTipi of ['1','2','3']) for(const bolmeSayisi of [1,2,3]) for(const supurgeVar of [false,true]) for(const yuklukVar of [false,true]) {
  const locs=['yok','tam',...Array.from({length:bolmeSayisi},(_,i)=>`bolme${i+1}`)];
  for(const cekmeceKonum of locs) for(const kanatSayisi of [1,2,3,4]) {
    const m=hesaplaGeometri(base({W:1800,H:2200,D:650,kapakTipi,bolmeSayisi,kanatSayisi,supurgeVar,W_supurge:220,yuklukVar,H_yukluk:400,cekmeceKonum,rayBoyu:450}));
    if(m.gecerli){positive(m);matrix++;}
  }
}
console.log('Matrix valid models checked:',matrix);
console.log(`RESULT ${pass} passed ${fail} failed`);process.exit(fail?1:0);
