import * as THREE from 'three';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE = matchMedia('(max-width:900px)').matches;

/* ---------- i18n ---------- */
const EN={skip:"Skip to content",brand:"Mujassam",nWorks:"Work",nProcess:"Process",nServices:"Services",nPricing:"Pricing",nContact:"Contact",
eyebrow:"3D sculpting & rendering studio · demo",h1a:"We turn your idea",h1b:"into a living 3D form",lead:"Products, architecture, characters and jewelry — modeled, textured and rendered to stop the scroll.",
ctaWorks:"See our work",ctaQuote:"Get a quote",mat:"Material:",mChrome:"Chrome",mGold:"Gold",mClay:"Clay",mGlass:"Glass",hint:"Drag the model & move your mouse ↻",
worksT:"Selected work",worksS:"All projects are procedurally generated samples. Click any piece to spin it yourself.",fAll:"All",fProducts:"Products",fArch:"Architecture",fChar:"Characters",fJewel:"Jewelry",
s1:"models delivered",s2:"clients (sample)",s3:"specialties",s4:"hrs avg. turnaround",procT:"From idea to final render",
p1:"Sculpt",p1d:"We block out the form, then refine proportions and fine detail.",p2:"Texture",p2d:"Metal, wood, fabric, glass — every surface gets a real material.",p3:"Light & render",p3d:"Studio lighting and high-res images ready for campaigns.",p4:"Deliver",p4d:"GLB/OBJ/STL files, stills and 360° video.",
servT:"Services",sv1:"Product rendering",sv1d:"Store & ad imagery without a photo shoot.",sv2:"Architectural viz",sv2d:"Exteriors, interiors and scale models before you build.",sv3:"Characters & figures",sv3d:"Characters for games, brands and 3D printing.",sv4:"Jewelry",sv4d:"Precise models for casting and interactive store display.",sv5:"Web 3D viewer",sv5d:"Your model spinning on your site, just like here.",sv6:"3D motion",sv6d:"Short videos for social and product launches.",
caseE:"Case study · sample",caseT:"“Najd” fragrance launch — a fictional project",caseD:"Instead of a photo shoot, we modeled the bottle in 3D and delivered 24 stills plus a 360° video in one week.",m1:"production cost",m2:"days to deliver",m3:"final images",
testT:"What they say",testS:"Illustrative quotes from fictional clients.",t1:"“The renders looked better than a real shoot, and edits were fast.”",t1c:"— Shop owner (sample)",t2:"“The architectural model made pitching investors easy.”",t2c:"— Engineering office (sample)",t3:"“The character became our brand mascot — we even printed it.”",t3c:"— Game studio (sample)",
priceT:"Clear packages",pk1:"Starter",pk1p:"SAR 1,500",pk1a:"1 model",pk1b:"3 renders",pk1c:"1 revision",pop:"Most popular",pk2:"Pro",pk2p:"SAR 4,500",pk2a:"3 models",pk2b:"10 renders + 360° video",pk2c:"Web-ready GLB",pk3:"Custom",pk3p:"On request",pk3a:"Architecture or full campaign",pk3b:"Animation & motion",pk3c:"Project manager",choose:"Choose",talk:"Talk to us",priceNote:"Prices are illustrative.",
contT:"Ready to build your model?",contD:"Tell us your idea and we'll reply with a quote within one business day.",fName:"Name",fEmail:"Email",fType:"Project type",fMsg:"Idea details",send:"Send request",
foot:"© 2026 Mujassam Studio — demo site, all work is procedurally generated.",up:"Back to top ↑",drag:"Drag to rotate · scroll to zoom"};
const AR={};document.querySelectorAll('[data-i18n]').forEach(e=>AR[e.dataset.i18n]=e.textContent);
Object.assign(AR,{formOk:"وصلنا طلبك! نرجع لك قريب (نموذج تجريبي، ما انرسل شيء).",formErr:"فضلاً عبّ الحقول المطلوبة بشكل صحيح."});
Object.assign(EN,{formOk:"Got it! We'll be in touch (demo form — nothing was sent).",formErr:"Please fill the required fields correctly."});
let lang=new URLSearchParams(location.search).get('l')||localStorage.getItem('lang')||'ar';
const t=k=>(lang==='en'?EN:AR)[k]||k;
function applyLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
 document.getElementById('lang').textContent=lang==='ar'?'EN':'ع';document.title=lang==='ar'?'مجسّم ستوديو — استوديو مجسمات 3D':'Mujassam — 3D Studio';
 buildGridCaptions();}
document.getElementById('lang').onclick=()=>{lang=lang==='ar'?'en':'ar';localStorage.setItem('lang',lang);applyLang()};

/* ---------- materials ---------- */
function envTex(renderer){const pm=new THREE.PMREMGenerator(renderer);const s=new THREE.Scene();
 const g=new THREE.SphereGeometry(10,32,16);const m=new THREE.MeshBasicMaterial({side:THREE.BackSide,vertexColors:true});
 const c=[];const p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i)/10,x=p.getX(i)/10;
  const col=new THREE.Color().setHSL(x>0?0.05:0.7,0.35,0.15+Math.max(0,y)*0.8);c.push(col.r,col.g,col.b)}
 g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));s.add(new THREE.Mesh(g,m));
 const l=new THREE.Mesh(new THREE.PlaneGeometry(6,2),new THREE.MeshBasicMaterial({color:0xffffff}));l.position.set(0,6,3);l.lookAt(0,0,0);s.add(l);
 return pm.fromScene(s,0.04).texture}
const MATS={chrome:()=>new THREE.MeshStandardMaterial({color:0xdddde8,metalness:1,roughness:.12}),
 gold:()=>new THREE.MeshStandardMaterial({color:0xffc46b,metalness:1,roughness:.22}),
 clay:()=>new THREE.MeshStandardMaterial({color:0xe07a5f,metalness:0,roughness:.85}),
 glass:()=>new THREE.MeshPhysicalMaterial({color:0xa9c7ff,metalness:0,roughness:.05,transmission:.9,thickness:1.2,ior:1.4,transparent:true}),
 stone:()=>new THREE.MeshStandardMaterial({color:0xd8d2c4,roughness:.7}),
 mint:()=>new THREE.MeshStandardMaterial({color:0x6be3a4,roughness:.4}),
 violet:()=>new THREE.MeshStandardMaterial({color:0x8b7bff,roughness:.3,metalness:.3})};
function setMat(obj,name){obj.traverse(o=>{if(o.isMesh&&!o.userData.keep){o.material=MATS[name]()}})}

/* ---------- procedural models ---------- */
const B={
 knot(){return new THREE.Mesh(new THREE.TorusKnotGeometry(1,.34,220,32,2,3))},
 bottle(){const g=new THREE.Group();const pts=[];for(let i=0;i<=20;i++){const y=i/20*2.6;pts.push(new THREE.Vector2(y<1.8?0.9+0.12*Math.sin(y*2):0.9-((y-1.8)/.8)*0.6,y-1.3))}
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts,64)));const cap=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.6,32));cap.position.y=1.6;g.add(cap);return g},
 speaker(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CapsuleGeometry(.9,1.4,12,40)));const r=new THREE.Mesh(new THREE.TorusGeometry(.6,.08,16,60));r.position.z=.9;g.add(r);return g},
 vase(){const pts=[];for(let i=0;i<=40;i++){const y=i/40;pts.push(new THREE.Vector2(.3+.7*Math.sin(y*Math.PI)*(1-.3*y)+.1*Math.sin(y*14)*.3,y*3-1.5))}return new THREE.Mesh(new THREE.LatheGeometry(pts,80))},
 tower(){const g=new THREE.Group();for(let i=0;i<14;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(1.4-i*.05,.18,1.4-i*.05));m.position.y=i*.22-1.5;m.rotation.y=i*.12;g.add(m)}return g},
 pavilion(){const g=new THREE.Group();const base=new THREE.Mesh(new THREE.BoxGeometry(3,.15,2));base.position.y=-1;g.add(base);
  for(let i=0;i<9;i++){const a=new THREE.Mesh(new THREE.TorusGeometry(1,.06,12,48,Math.PI));a.position.set(-1.2+i*.3,-1,0);a.rotation.y=Math.PI/2;a.scale.setScalar(.8+.2*Math.sin(i));g.add(a)}return g},
 arches(){const g=new THREE.Group();for(let i=0;i<5;i++){const s=new THREE.Shape();s.moveTo(-.4,0);s.lineTo(-.4,1.2);s.absarc(0,1.2,.4,Math.PI,0,true);s.lineTo(.4,0);s.lineTo(.55,0);s.lineTo(.55,1.9);s.lineTo(-.55,1.9);s.lineTo(-.55,0);
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:.5,bevelEnabled:false}));m.position.set(i*1.1-2.2,-1,0);g.add(m)}return g},
 bot(){const g=new THREE.Group();const head=new THREE.Mesh(new THREE.SphereGeometry(.9,48,32));head.position.y=.6;g.add(head);
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.6,.6,8,24));body.position.y=-.8;g.add(body);
  for(const x of[-.32,.32]){const e=new THREE.Mesh(new THREE.SphereGeometry(.14,16,16),new THREE.MeshBasicMaterial({color:0x111111}));e.userData.keep=1;e.position.set(x,.7,.8);g.add(e);
   const ear=new THREE.Mesh(new THREE.ConeGeometry(.25,.6,24));ear.position.set(x*2,1.5,0);ear.rotation.z=-x*1.5;g.add(ear)}return g},
 blob(){const g=new THREE.IcosahedronGeometry(1.3,40);const p=g.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const n=1+.18*Math.sin(v.x*3)*Math.cos(v.y*3)+.1*Math.sin(v.z*5);v.multiplyScalar(n);p.setXYZ(i,v.x,v.y,v.z)}g.computeVertexNormals();return new THREE.Mesh(g)},
 ring(){const g=new THREE.Group();const band=new THREE.Mesh(new THREE.TorusGeometry(1,.16,32,100));g.add(band);
  const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.42,0),MATS.glass());gem.userData.keep=1;gem.position.y=1.25;gem.scale.y=1.3;g.add(gem);g.rotation.x=.3;return g},
 pendant(){const g=new THREE.Group();const s=new THREE.Shape();for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=i%2?.55:1.1;s.lineTo(Math.cos(a)*r,Math.sin(a)*r)}
  g.add(new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:.2,bevelEnabled:true,bevelSize:.06,bevelThickness:.06,bevelSegments:4}).center()));
  const loop=new THREE.Mesh(new THREE.TorusGeometry(.18,.05,12,32));loop.position.y=1.25;g.add(loop);return g},
 earring(){const g=new THREE.Group();for(let i=0;i<4;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(.9-i*.2,.05,16,80));m.rotation.y=i*.5;g.add(m)}
  const p=new THREE.Mesh(new THREE.SphereGeometry(.22,32,32),new THREE.MeshStandardMaterial({color:0xfff6ea,roughness:.2}));p.userData.keep=1;p.position.y=-1.1;g.add(p);return g}
};
const PROJECTS=[
 {id:'bottle',cat:'products',mat:'glass',ar:["زجاجة عطر «نجد»","زجاجة بخطوط ناعمة وغطاء معدني — تصيير للإعلان."],en:["“Najd” perfume bottle","Soft-curved bottle with metal cap — ad render."]},
 {id:'speaker',cat:'products',mat:'clay',ar:["سمّاعة «نغمة»","مفهوم منتج بخامة مطفية ولون دافئ."],en:["“Nagham” speaker","Product concept in a warm matte finish."]},
 {id:'vase',cat:'products',mat:'stone',ar:["مزهرية «رمل»","شكل مستوحى من كثبان الرمل."],en:["“Raml” vase","A form inspired by desert dunes."]},
 {id:'tower',cat:'architecture',mat:'stone',ar:["برج «التوائي»","برج يلتف طابق بعد طابق — مجسّم مفاهيمي."],en:["Twist Tower","A tower rotating floor by floor — concept model."]},
 {id:'arches',cat:'architecture',mat:'clay',ar:["رواق الأقواس","واجهة بأقواس مستوحاة من العمارة النجدية."],en:["Arcade facade","Arches inspired by Najdi architecture."]},
 {id:'pavilion',cat:'architecture',mat:'chrome',ar:["جناح «الموج»","جناح معارض بإطارات منحنية."],en:["Wave Pavilion","Exhibition pavilion of curved frames."]},
 {id:'bot',cat:'characters',mat:'mint',ar:["شخصية «فنّوس»","شخصية لطيفة لعلامة تجارية افتراضية."],en:["“Fanoos” mascot","A friendly mascot for a fictional brand."]},
 {id:'blob',cat:'characters',mat:'violet',ar:["كائن «سديم»","مخلوق عضوي للألعاب."],en:["“Sadeem” creature","An organic creature for games."]},
 {id:'ring',cat:'jewelry',mat:'gold',ar:["خاتم «لؤلؤة الصحراء»","خاتم ذهب بحجر ماسي مقصوص."],en:["Desert Gem ring","Gold ring with a cut gemstone."]},
 {id:'pendant',cat:'jewelry',mat:'gold',ar:["قلادة «نجمة»","تعليقة نجمة بحواف ناعمة."],en:["Star pendant","Soft-edged star pendant."]},
 {id:'earring',cat:'jewelry',mat:'chrome',ar:["حلق «مدار»","حلقات متداخلة مع لؤلؤة."],en:["Orbit earring","Interlocking hoops with a pearl."]},
 {id:'knot',cat:'products',mat:'violet',ar:["منحوتة «عقدة»","قطعة ديكور معدنية."],en:["Knot sculpture","A metallic decor piece."]}];
const CAT={products:['منتجات','Products'],architecture:['معمار','Architecture'],characters:['شخصيات','Characters'],jewelry:['مجوهرات','Jewelry']};
function build(id,mat){const o=B[id]();setMat(o,mat);const box=new THREE.Box3().setFromObject(o);const s=2.6/box.getSize(new THREE.Vector3()).length()*1.6;o.scale.multiplyScalar(s);
 box.setFromObject(o);o.position.sub(box.getCenter(new THREE.Vector3()));const g=new THREE.Group();g.add(o);return g}
function lights(scene){scene.add(new THREE.HemisphereLight(0xffffff,0x332244,1.2));const d=new THREE.DirectionalLight(0xffffff,2.5);d.position.set(3,5,4);scene.add(d);
 const r=new THREE.DirectionalLight(0xff7a45,2);r.position.set(-4,-1,-3);scene.add(r)}
function mkRenderer(canvas){const r=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:!canvas});r.setPixelRatio(Math.min(devicePixelRatio,MOBILE?1.5:2));r.toneMapping=THREE.ACESFilmicToneMapping;return r}

/* ---------- orbit (lightweight) ---------- */
function orbit(el,target,cam,opts={}){let down=false,px=0,py=0;target.userData.vx=0;target.userData.vy=0;
 el.addEventListener('pointerdown',e=>{down=true;px=e.clientX;py=e.clientY;el.setPointerCapture(e.pointerId)});
 el.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;target.rotation.y+=dx*.01;target.rotation.x=Math.max(-1.2,Math.min(1.2,target.rotation.x+dy*.01));target.userData.vx=dx*.01});
 el.addEventListener('pointerup',()=>down=false);
 if(opts.zoom)el.addEventListener('wheel',e=>{e.preventDefault();cam.position.z=Math.max(3,Math.min(10,cam.position.z+e.deltaY*.005))},{passive:false});
 return()=>down}

/* ---------- hero ---------- */
let heroObj,heroMat='chrome';
(function hero(){const c=document.getElementById('hero3d');let r;try{r=mkRenderer(c)}catch(e){c.style.background='radial-gradient(circle at 70% 50%,#8b7bff55,transparent 50%)';return}
 const scene=new THREE.Scene();scene.environment=envTex(r);lights(scene);const cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.z=6.5;
 const holder=new THREE.Group();scene.add(holder);heroObj=build('knot',heroMat);holder.add(heroObj);
 const parts=new THREE.Group();for(let i=0;i<14;i++){const m=new THREE.Mesh(i%2?new THREE.IcosahedronGeometry(.12,0):new THREE.BoxGeometry(.15,.15,.15),MATS[i%3?'gold':'violet']());
  m.userData.keep=1;m.position.setFromSphericalCoords(2.4+Math.random(),Math.random()*Math.PI,Math.random()*Math.PI*2);parts.add(m)}scene.add(parts);
 const dragging=orbit(c,holder,cam);let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
 function size(){const w=c.clientWidth,h=c.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();const rtl=document.documentElement.dir==='rtl';holder.position.x=MOBILE?0:(rtl?-1.6:1.6)*Math.min(1,cam.aspect/1.6);parts.position.x=holder.position.x}
 size();addEventListener('resize',size);new MutationObserver(size).observe(document.documentElement,{attributes:true,attributeFilter:['dir']});
 let vis=true;new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(c);
 const clock=new THREE.Clock();(function loop(){requestAnimationFrame(loop);if(!vis)return;const t=clock.getElapsedTime();
  if(!RM&&!dragging()){holder.rotation.y+=.004+holder.userData.vx;holder.userData.vx*=.95;holder.rotation.x+=(my*.6-holder.rotation.x)*.03}
  heroObj.rotation.z=RM?0:Math.sin(t*.5)*.2;heroObj.position.y=RM?0:Math.sin(t)*.1;parts.rotation.y=RM?0:t*.1+mx*.5;parts.rotation.x=my*.3;r.render(scene,cam)})();
 document.querySelectorAll('.hero [data-mat]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.hero [data-mat]').forEach(x=>x.classList.toggle('on',x===b));heroMat=b.dataset.mat;setMat(heroObj,heroMat)});
})();

/* ---------- gallery thumbnails (single offscreen renderer → images) ---------- */
const grid=document.getElementById('grid');
function buildGridCaptions(){grid.querySelectorAll('.item').forEach(el=>{const p=PROJECTS[el.dataset.i];el.querySelector('b').textContent=p[lang][0];
 el.querySelector('small').textContent=CAT[p.cat][lang==='ar'?0:1];el.querySelector('.tag').textContent=lang==='ar'?'عيّنة':'Sample';el.setAttribute('aria-label',p[lang][0])})}
(function thumbs(){let r,scene,cam;try{const cv=document.createElement('canvas');r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,preserveDrawingBuffer:true});r.setSize(480,600);r.toneMapping=THREE.ACESFilmicToneMapping;
  scene=new THREE.Scene();scene.environment=envTex(r);lights(scene);cam=new THREE.PerspectiveCamera(38,.8,.1,100);cam.position.set(0,.6,6.4);cam.lookAt(0,0,0)}catch(e){}
 PROJECTS.forEach((p,i)=>{const b=document.createElement('button');b.className='item reveal';b.dataset.i=i;b.dataset.cat=p.cat;
  let src='';if(r){const o=build(p.id,p.mat);o.rotation.set(.25,-.6,0);scene.add(o);r.render(scene,cam);src=r.domElement.toDataURL('image/webp',.85);scene.remove(o)}
  b.innerHTML=`<img alt="" src="${src}" loading="lazy"><span class="tag"></span><span class="cap"><small></small><b></b></span>`;
  b.onclick=()=>openModal(i);grid.appendChild(b)});
 if(r)r.dispose();
})();
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});
 grid.querySelectorAll('.item').forEach(it=>{const show=b.dataset.f==='all'||it.dataset.cat===b.dataset.f;it.classList.toggle('hide',!show);if(show&&!RM)it.animate([{opacity:0,transform:'scale(.92)'},{opacity:1,transform:'none'}],{duration:450,easing:'cubic-bezier(.2,.8,.2,1)'})})});

/* ---------- modal 3D viewer ---------- */
const dlg=document.getElementById('modal'),mc=document.getElementById('m3d');let M=null;
function openModal(i){const p=PROJECTS[i];document.getElementById('mTitle').textContent=p[lang][0];document.getElementById('mDesc').textContent=p[lang][1];
 document.getElementById('mCat').textContent=CAT[p.cat][lang==='ar'?0:1]+(lang==='ar'?' · عيّنة':' · Sample');dlg.showModal();
 if(!M){try{const r=mkRenderer(mc),scene=new THREE.Scene();scene.environment=envTex(r);lights(scene);const cam=new THREE.PerspectiveCamera(38,1,.1,100);cam.position.z=6;
  const holder=new THREE.Group();scene.add(holder);M={r,scene,cam,holder,drag:orbit(mc,holder,cam,{zoom:true})};
  (function loop(){requestAnimationFrame(loop);if(!dlg.open)return;const w=mc.clientWidth,h=mc.clientHeight;if(mc.width!==Math.floor(w*r.getPixelRatio())){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
   if(!RM&&!M.drag()){holder.rotation.y+=.005+holder.userData.vx;holder.userData.vx*=.95}r.render(scene,cam)})()}catch(e){mc.replaceWith(Object.assign(document.createElement('img'),{src:grid.children[i].querySelector('img').src,alt:''}));return}}
 M.holder.clear();M.holder.rotation.set(.2,0,0);M.cam.position.z=6;const o=build(p.id,p.mat);M.holder.add(o);
 const sw=document.getElementById('mSw');sw.innerHTML='';['chrome','gold','clay','glass','violet'].forEach(m=>{const b=document.createElement('button');b.textContent=({chrome:['كروم','Chrome'],gold:['ذهب','Gold'],clay:['صلصال','Clay'],glass:['زجاج','Glass'],violet:['بنفسجي','Violet']})[m][lang==='ar'?0:1];
  b.className=m===p.mat?'on':'';b.onclick=()=>{setMat(o,m);sw.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b))};sw.appendChild(b)})}
dlg.querySelector('.close').onclick=()=>dlg.close();dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});

/* ---------- reveal, counters, tilt, cursor ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.count;co.unobserve(el);
 if(RM){el.textContent=n+'+';return}let s=null;const f=ts=>{s??=ts;const k=Math.min(1,(ts-s)/1400);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+(k===1?'+':'');if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}));
document.querySelectorAll('[data-count]').forEach(e=>co.observe(e));
if(!RM&&matchMedia('(hover:hover)').matches){
 document.addEventListener('pointermove',e=>{const el=e.target.closest('.item,.tilt');document.querySelectorAll('.item,.tilt').forEach(x=>{if(x!==el)x.style.transform=''});
  if(!el)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`});
 const cur=document.querySelector('.cursor');let cx=0,cy=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cur.classList.toggle('big',!!e.target.closest('a,button,.item,canvas'))});
 (function l(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.left=cx+'px';cur.style.top=cy+'px';requestAnimationFrame(l)})()}

/* ---------- form ---------- */
document.getElementById('form').addEventListener('submit',e=>{e.preventDefault();const f=e.target;let ok=true;
 f.querySelectorAll('[required]').forEach(i=>{const v=i.checkValidity()&&i.value.trim();i.setAttribute('aria-invalid',!v);if(!v)ok=false});
 const m=document.getElementById('formMsg');m.style.color=ok?'#6be3a4':'#ff4d6d';m.textContent=t(ok?'formOk':'formErr');if(ok)f.reset()});
applyLang();
const _s=new URLSearchParams(location.search).get('s');if(_s)setTimeout(()=>{document.getElementById(_s)?.scrollIntoView({behavior:'instant'});document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))},300);
