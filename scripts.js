(() => {
  'use strict';
  const products = [
    {id:'t01',category:'terrace',label:'ТЕРАСНА ДОШКА',name:'Terra Oak',description:'ДПК · теплий дуб · 140 × 25 мм',price:1850,unit:'м²',image:'deck.svg'},
    {id:'f01',category:'facade',label:'ФАСАДНА ДОШКА',name:'Linea Walnut',description:'ДПК · горіх · 156 × 21 мм',price:1620,unit:'м²',image:'facade.svg'},
    {id:'w01',category:'windows',label:'ВІКНА',name:'Frame Graphite',description:'Ілюстрація віконного блока · 1200 × 1400 мм',price:12900,unit:'шт.',image:'window.svg'},
    {id:'d01',category:'doors',label:'ДВЕРІ',name:'Forma Natural',description:'Міжкімнатне полотно · 800 × 2000 мм',price:7400,unit:'шт.',image:'door.svg'},
    {id:'h01',category:'hardware',label:'ФУРНІТУРА',name:'Arc Black',description:'Комплект дверних ручок · чорний матовий',price:1250,unit:'компл.',image:'handle.svg'},
    {id:'t02',category:'terrace',label:'ТЕРАСНА ДОШКА',name:'Terra Ash',description:'ДПК · попелястий · 140 × 25 мм',price:1790,unit:'м²',image:'ash.svg'}
  ];
  let cart = {};
  try {
    const saved = JSON.parse(localStorage.getItem('terra-cart') || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      for (const product of products) if (Number.isInteger(saved[product.id]) && saved[product.id] > 0 && saved[product.id] <= 999) cart[product.id] = saved[product.id];
    }
  } catch { /* Corrupt or unavailable storage starts a clean session. */ }
  let filter = 'all';
  const money = amount => new Intl.NumberFormat('uk-UA').format(amount) + ' ₴';
  const grid = document.getElementById('products');
  const dialog = document.getElementById('cart-dialog');
  const track = (...args) => window.terraTrack?.(...args);
  let toastTimer;
  function notify(message) { const toast=document.getElementById('toast'); toast.textContent=message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('visible'),3000); }
  function save() { try { localStorage.setItem('terra-cart',JSON.stringify(cart)); } catch { /* In-memory cart remains usable. */ } }
  function item(product, quantity=1) { return { item_id: product.id, item_name: product.name, item_category: product.category, price: product.price, quantity }; }
  function renderProducts() {
    const visible = products.filter(p => filter === 'all' || p.category === filter);
    const sort = document.getElementById('sort').value;
    if (sort !== 'default') visible.sort((a,b)=>sort==='asc'?a.price-b.price:b.price-a.price);
    grid.innerHTML = visible.map(p=>`<article class="product box"><div class="product-image img-box"><img src="images/${p.image}" alt="Ілюстрація ${p.name}" width="640" height="500" loading="lazy"><span class="tag">${p.label}</span></div><div class="detail-box"><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom price_box"><span class="price">${money(p.price)} <small>/ ${p.unit}</small></span><button class="add-button" data-add="${p.id}" aria-label="Додати ${p.name} до кошика">До кошика +</button></div></div></article>`).join('');
  }
  function renderCart() {
    const chosen = products.filter(p=>cart[p.id]);
    document.getElementById('cart-count').textContent=Object.values(cart).reduce((a,b)=>a+b,0);
    document.getElementById('cart-items').innerHTML=chosen.length?chosen.map(p=>`<div class="cart-line"><div><strong>${p.name}</strong><small>${money(p.price)} / ${p.unit}</small></div><div class="quantity"><button data-change="${p.id}" data-delta="-1" aria-label="Зменшити кількість ${p.name}">−</button><span>${cart[p.id]} ${p.unit}</span><button data-change="${p.id}" data-delta="1" aria-label="Збільшити кількість ${p.name}" ${cart[p.id]>=999?'disabled':''}>+</button></div></div>`).join(''):'<p>Кошик порожній. Оберіть матеріали в каталозі.</p>';
    document.getElementById('cart-total').textContent=money(chosen.reduce((sum,p)=>sum+p.price*cart[p.id],0));
    document.getElementById('download-request').disabled=!chosen.length;
  }
  function change(id, delta) {
    const product=products.find(p=>p.id===id); if(!product) return;
    const old=cart[id]||0;
    const next=Math.max(0,Math.min(999,old+delta));
    if(next===old) { notify('Максимальна кількість — 999 одиниць.'); return; }
    if(next) cart[id]=next; else delete cart[id];
    save(); renderCart();
    track(delta>0?'add_to_cart':'remove_from_cart',{currency:'UAH',value:product.price,items:[item(product)]});
    if(delta>0) notify(product.name+' додано до кошика');
  }
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    renderProducts(); track('select_content',{content_type:'category',item_id:filter});
  }));
  document.getElementById('sort').addEventListener('change',renderProducts);
  grid.addEventListener('click',event=>{const button=event.target.closest('[data-add]');if(button)change(button.dataset.add,1);});
  document.getElementById('cart-items').addEventListener('click',event=>{const button=event.target.closest('[data-change]');if(button)change(button.dataset.change,Number(button.dataset.delta));});
  function openCart(){renderCart();dialog.showModal();}
  document.getElementById('open-cart').addEventListener('click',openCart);
  document.getElementById('contact-cart').addEventListener('click',openCart);
  document.getElementById('close-cart').addEventListener('click',()=>dialog.close());
  document.getElementById('request-form').addEventListener('submit',event=>{
    event.preventDefault();
    const chosen=products.filter(p=>cart[p.id]);if(!chosen.length)return;
    const data=new FormData(event.target);
    const total=chosen.reduce((sum,p)=>sum+p.price*cart[p.id],0);
    const text=['TERRA — навчальна заявка','Дата: '+new Date().toLocaleString('uk-UA'), 'Ім’я: '+data.get('customer'),'Телефон: '+data.get('phone'),'','Обрані матеріали:',...chosen.map(p=>`${p.name}: ${cart[p.id]} ${p.unit} × ${money(p.price)} = ${money(p.price*cart[p.id])}`),'','Умовна сума: '+money(total),'Коментар: '+(data.get('comment')||'—'),'','Це демонстраційна заявка. Вона не надіслана продавцю.'].join('\n');
    const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='Terra-zayavka.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
    track('generate_lead',{currency:'UAH',value:total});
    notify('Заявку сформовано. Збережіть завантажений файл.');
  });
  renderProducts();renderCart();
})();
