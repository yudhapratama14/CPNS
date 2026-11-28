const V='saku-cpns-v3',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;const u=new URL(r.url);
 if(u.origin!==location.origin)return; /* Apps Script (ranking) dan font tidak dicache */
 /* no-cache: selalu cek versi terbaru ke server (GitHub Pages menahan file ~10 menit di cache HTTP), cache SW hanya untuk offline */
 e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))))});
