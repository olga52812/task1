(() => {
  'use strict';
  // Каталог TERRA: дерево (category → attrs.sub) + фільтри за характеристиками (attrs).
  // Набір фільтрів побудовано за результатами кластеризації пошукових запитів (лабораторна робота №3).
  const products = [
    {id:'t01',category:'terrace',label:'ТЕРАСНА ДОШКА',name:'Terra Oak',description:'ДПК · теплий дуб · 140 × 25 мм',price:1850,unit:'м²',image:'deck.svg',attrs:{sub:'Терасна дошка',material:'ДПК (композит)',color:'Дуб',purpose:['Тераса','Балкон'],size:'140 × 25 мм',install:'Доступний монтаж'}},
    {id:'t02',category:'terrace',label:'ТЕРАСНА ДОШКА',name:'Terra Ash',description:'ДПК · попелястий · 140 × 25 мм',price:1790,unit:'м²',image:'ash.svg',attrs:{sub:'Терасна дошка',material:'ДПК (композит)',color:'Сірий',purpose:['Тераса','Сходи'],size:'140 × 25 мм',install:'Доступний монтаж'}},
    {id:'t03',category:'terrace',label:'ТЕРАСНА ДОШКА',name:'Larix Natural',description:'Модрина · олія · 145 × 28 мм',price:1490,unit:'м²',image:'deck.svg',attrs:{sub:'Терасна дошка',material:'Модрина',color:'Натуральне дерево',purpose:['Тераса'],size:'145 × 28 мм',install:'Доступний монтаж'}},
    {id:'t04',category:'terrace',label:'ТЕРАСНА ДОШКА',name:'Pine Classic',description:'Сосна · просочення · 120 × 28 мм',price:690,unit:'м²',image:'ash.svg',attrs:{sub:'Терасна дошка',material:'Сосна',color:'Натуральне дерево',purpose:['Тераса','Паркан'],size:'120 × 28 мм'}},
    {id:'t05',category:'terrace',label:'КОМПЛЕКТУЮЧІ',name:'Clip Set',description:'Кліпси для терасної дошки · 100 шт.',price:450,unit:'уп.',image:'deck.svg',attrs:{sub:'Комплектуючі',kind:'Кліпси та кріплення',material:'Метал'}},
    {id:'t06',category:'terrace',label:'КОМПЛЕКТУЮЧІ',name:'Lag Base',description:'Лага під терасну дошку · 40 × 30 мм',price:260,unit:'м.п.',image:'ash.svg',attrs:{sub:'Комплектуючі',kind:'Лаги',material:'ДПК (композит)'}},
    {id:'f01',category:'facade',label:'ФАСАДНА ДОШКА',name:'Linea Walnut',description:'ДПК · горіх · 156 × 21 мм',price:1620,unit:'м²',image:'facade.svg',attrs:{sub:'Фасадна дошка',material:'ДПК (композит)',color:'Горіх',texture:'Під дерево',insulation:'Без утеплювача',install:'Доступний монтаж'}},
    {id:'f02',category:'facade',label:'ФАСАДНІ ПАНЕЛІ',name:'Brick Red',description:'Вінілова панель під цеглу',price:520,unit:'м²',image:'facade.svg',attrs:{sub:'Фасадні панелі',material:'Вініл',color:'Коричневий',texture:'Під цеглу',insulation:'Без утеплювача',install:'Доступний монтаж'}},
    {id:'f03',category:'facade',label:'ФАСАДНІ ПАНЕЛІ',name:'Rock Grey',description:'Фіброцементна панель під камінь',price:890,unit:'м²',image:'facade.svg',attrs:{sub:'Фасадні панелі',material:'Фіброцемент',color:'Сірий',texture:'Під камінь',insulation:'Без утеплювача',install:'Доступний монтаж'}},
    {id:'f04',category:'facade',label:'ТЕРМОПАНЕЛІ',name:'Thermo Clinker',description:'Клінкерна термопанель · утеплювач 50 мм',price:1950,unit:'м²',image:'facade.svg',attrs:{sub:'Фасадні панелі',material:'Клінкер',color:'Коричневий',texture:'Під цеглу',insulation:'З утеплювачем',install:'Доступний монтаж'}},
    {id:'f05',category:'facade',label:'ФАСАДНА ДОШКА',name:'Acryl Line',description:'Акрилова фасадна дошка · білий',price:1180,unit:'м²',image:'facade.svg',attrs:{sub:'Фасадна дошка',material:'Акрил',color:'Білий',texture:'Гладка',insulation:'Без утеплювача'}},
    {id:'f06',category:'facade',label:'ЦОКОЛЬНІ ПАНЕЛІ',name:'Base Stone',description:'Цокольна панель ПВХ під камінь',price:640,unit:'м²',image:'facade.svg',attrs:{sub:'Цокольні панелі',material:'ПВХ',color:'Сірий',texture:'Під камінь',insulation:'Без утеплювача'}},
    {id:'w01',category:'windows',label:'ВІКНА',name:'Frame Graphite',description:'Металопластик · антрацит · 1200 × 1400 мм',price:12900,unit:'шт.',image:'window.svg',attrs:{sub:'Металопластикові вікна',material:'ПВХ (металопластик)',brand:'Rehau',color:'Сірий',glazing:'Двокамерний',construction:'Двостулкові',purpose:['Будинок','Квартира'],install:'Доступний монтаж'}},
    {id:'w02',category:'windows',label:'ВІКНА',name:'Frame White',description:'Металопластик · білий · 800 × 1200 мм',price:6900,unit:'шт.',image:'window.svg',attrs:{sub:'Металопластикові вікна',material:'ПВХ (металопластик)',brand:'WDS',color:'Білий',glazing:'Однокамерний',construction:'Одностулкові',purpose:['Квартира'],install:'Доступний монтаж'}},
    {id:'w03',category:'windows',label:'ПАНОРАМНІ ВІКНА',name:'Panorama Slide',description:'Розсувна система · 3000 × 2200 мм',price:38500,unit:'шт.',image:'window.svg',attrs:{sub:'Панорамні вікна',material:'ПВХ (металопластик)',brand:'Veka',color:'Білий',glazing:'Енергозберігаючий',construction:'Розсувні',purpose:['Будинок','Тераса'],install:'Доступний монтаж'}},
    {id:'w04',category:'windows',label:'МАНСАРДНІ ВІКНА',name:'Roof Light',description:'Мансардне вікно · сосна · 780 × 1180 мм',price:15400,unit:'шт.',image:'window.svg',attrs:{sub:'Мансардні вікна',material:'Дерево',brand:'Fakro',color:'Натуральне дерево',glazing:'Двокамерний',construction:'Одностулкові',purpose:['Мансарда'],install:'Доступний монтаж'}},
    {id:'w05',category:'windows',label:'БАЛКОННІ БЛОКИ',name:'Balcony Set',description:'Вікно + балконні двері · коричневий',price:18900,unit:'компл.',image:'window.svg',attrs:{sub:'Балконні блоки',material:'ПВХ (металопластик)',brand:'Steko',color:'Коричневий',glazing:'Двокамерний',construction:'Двостулкові',purpose:['Балкон'],install:'Доступний монтаж'}},
    {id:'w06',category:'windows',label:'КОМПЛЕКТУЮЧІ',name:'Net Fit',description:'Москітна сітка на раму · до 1200 мм',price:950,unit:'шт.',image:'window.svg',attrs:{sub:'Комплектуючі',kind:'Москітні сітки',color:'Білий'}},
    {id:'d01',category:'doors',label:'МІЖКІМНАТНІ ДВЕРІ',name:'Forma Natural',description:'Шпон дуба · 800 × 2000 мм · з коробкою',price:7400,unit:'шт.',image:'door.svg',attrs:{sub:'Міжкімнатні двері',material:'Шпон',color:'Дуб',construction:'Розпашні',size:'800 × 2000 мм',purpose:['Кімната'],install:'Доступний монтаж'}},
    {id:'d02',category:'doors',label:'МІЖКІМНАТНІ ДВЕРІ',name:'Forma White',description:'МДФ · білі · глухе полотно',price:4200,unit:'шт.',image:'door.svg',attrs:{sub:'Міжкімнатні двері',material:'МДФ',color:'Білий',construction:'Глухі',size:'700 × 2000 мм',purpose:['Кімната','Ванна'],install:'Доступний монтаж'}},
    {id:'d03',category:'doors',label:'РОЗСУВНІ СИСТЕМИ',name:'Glass Slide',description:'Скло в чорному профілі · 900 × 2000 мм',price:11800,unit:'шт.',image:'door.svg',attrs:{sub:'Розсувні системи',material:'Скло',color:'Чорний',construction:'Розсувні',size:'900 × 2000 мм',purpose:['Кімната','Гардеробна'],install:'Доступний монтаж'}},
    {id:'d04',category:'doors',label:'ПРИХОВАНИЙ МОНТАЖ',name:'Hidden Line',description:'Під фарбування · прихована коробка',price:9600,unit:'шт.',image:'door.svg',attrs:{sub:'Двері прихованого монтажу',material:'МДФ',color:'Білий',construction:'Розпашні',size:'800 × 2000 мм',purpose:['Кімната'],install:'Доступний монтаж'}},
    {id:'d05',category:'doors',label:'ВХІДНІ ДВЕРІ',name:'Guard Pro',description:'Металеві броньовані · 960 × 2050 мм',price:24500,unit:'шт.',image:'door.svg',attrs:{sub:'Вхідні двері',material:'Метал',brand:'Страж',color:'Сірий',protection:'Броньовані',construction:'Одностулкові',size:'960 × 2050 мм',purpose:['Квартира'],insulation:'Утеплені',install:'Доступний монтаж'}},
    {id:'d06',category:'doors',label:'ВХІДНІ ДВЕРІ',name:'Thermo House',description:'Метал з терморозривом · полуторні',price:31800,unit:'шт.',image:'door.svg',attrs:{sub:'Вхідні двері',material:'Метал',brand:'Термінус',color:'Чорний',protection:'Броньовані',construction:'Полуторні',size:'1200 × 2050 мм',purpose:['Будинок'],insulation:'З терморозривом',install:'Доступний монтаж'}},
    {id:'d07',category:'doors',label:'ВХІДНІ ДВЕРІ',name:'Steko Entry',description:'Металопластик · вставка зі склом',price:19500,unit:'шт.',image:'door.svg',attrs:{sub:'Вхідні двері',material:'ПВХ (металопластик)',brand:'Steko',color:'Білий',protection:'Стандартні',construction:'Зі склом',size:'900 × 2050 мм',purpose:['Будинок'],insulation:'Утеплені',install:'Доступний монтаж'}},
    {id:'h01',category:'hardware',label:'ФУРНІТУРА',name:'Arc Black',description:'Комплект дверних ручок · чорний матовий',price:1250,unit:'компл.',image:'handle.svg',attrs:{sub:'Для дверей',kind:'Ручки',color:'Чорний'}},
    {id:'h02',category:'hardware',label:'ФУРНІТУРА',name:'Hinge Pro',description:'Петля дверна прихована · хром',price:380,unit:'шт.',image:'handle.svg',attrs:{sub:'Для дверей',kind:'Петлі',color:'Хром'}},
    {id:'h03',category:'hardware',label:'ФУРНІТУРА',name:'Seal Tape',description:'Ущільнювач для дверей · чорний',price:85,unit:'м.п.',image:'handle.svg',attrs:{sub:'Для дверей',kind:'Ущільнювачі',color:'Чорний'}},
    {id:'h04',category:'hardware',label:'ФУРНІТУРА',name:'Window Grip',description:'Ручка для пластикових вікон · біла',price:290,unit:'шт.',image:'handle.svg',attrs:{sub:'Для вікон',kind:'Ручки',color:'Білий'}}
  ];
  const facetLabels = {purpose:'Призначення',material:'Матеріал',brand:'Виробник',color:'Колір',construction:'Конструкція',kind:'Тип',texture:'Фактура',glazing:'Склопакет',protection:'Клас захисту',insulation:'Утеплення',size:'Розмір',install:'Монтаж'};
  const facetOrder = Object.keys(facetLabels);
  let sub = 'all';
  let selected = {};
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
  const values = (p, key) => { const v = p.attrs && p.attrs[key]; return v == null ? [] : (Array.isArray(v) ? v : [v]); };
  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const inCategory = () => products.filter(p => (filter === 'all' || p.category === filter) && (sub === 'all' || p.attrs.sub === sub));
  function priceLimits() {
    const min = Number(document.getElementById('price-min').value) || 0;
    const max = Number(document.getElementById('price-max').value) || Infinity;
    return [min, max];
  }
  function matches(p, skipKey) {
    const [min, max] = priceLimits();
    if (p.price < min || p.price > max) return false;
    return Object.entries(selected).every(([key, set]) => key === skipKey || !set.size || values(p, key).some(v => set.has(v)));
  }
  function renderSubcats() {
    const box = document.getElementById('subcats');
    if (filter === 'all') { box.innerHTML = ''; box.hidden = true; return; }
    const subs = [...new Set(products.filter(p => p.category === filter).map(p => p.attrs.sub))];
    box.hidden = false;
    box.innerHTML = ['all', ...subs].map(s => `<button type="button" data-sub="${esc(s)}" class="${s === sub ? 'active' : ''}" aria-pressed="${s === sub}">${s === 'all' ? 'Усі підкатегорії' : esc(s)}</button>`).join('');
  }
  function renderFacets() {
    const base = inCategory();
    document.getElementById('facet-list').innerHTML = facetOrder.map(key => {
      const all = [...new Set(base.flatMap(p => values(p, key)))];
      if (all.length < 2 && !(key === 'install' && all.length)) return '';
      const set = selected[key] || new Set();
      const items = all.sort((x, y) => x.localeCompare(y, 'uk')).map(v => {
        const count = base.filter(p => matches(p, key) && values(p, key).includes(v)).length;
        return `<label class="facet-option${count ? '' : ' empty'}"><input type="checkbox" data-facet="${key}" value="${esc(v)}" ${set.has(v) ? 'checked' : ''}> <span>${esc(v)}</span> <small>${count}</small></label>`;
      }).join('');
      return `<fieldset class="facet"><legend>${facetLabels[key]}</legend>${items}</fieldset>`;
    }).join('');
    const priceSet = document.getElementById('price-min').value || document.getElementById('price-max').value;
    const active = Object.values(selected).reduce((n, s) => n + s.size, 0) + (priceSet ? 1 : 0);
    document.getElementById('facet-count').textContent = active ? `(${active})` : '';
  }
  function renderProducts() {
    const visible = inCategory().filter(p => matches(p));
    const sort = document.getElementById('sort').value;
    if (sort !== 'default') visible.sort((a,b)=>sort==='asc'?a.price-b.price:b.price-a.price);
    renderSubcats(); renderFacets();
    document.getElementById('found').textContent = `Знайдено товарів: ${visible.length}`;
    grid.innerHTML = visible.length ? visible.map(p=>`<article class="product box"><div class="product-image img-box"><img src="images/${p.image}" alt="Ілюстрація ${p.name}" width="640" height="500" loading="lazy"><span class="tag">${p.label}</span></div><div class="detail-box"><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom price_box"><span class="price">${money(p.price)} <small>/ ${p.unit}</small></span><button class="add-button" data-add="${p.id}" aria-label="Додати ${p.name} до кошика">До кошика +</button></div></div></article>`).join('') : '<p class="no-results">За цими фільтрами нічого не знайдено. Спробуйте прибрати частину фільтрів.</p>';
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
    filter=button.dataset.filter; sub='all'; selected={};
    document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    renderProducts(); track('select_content',{content_type:'category',item_id:filter});
  }));
  document.getElementById('sort').addEventListener('change',renderProducts);
  document.getElementById('subcats').addEventListener('click',event=>{const button=event.target.closest('[data-sub]');if(!button)return;sub=button.dataset.sub;selected={};renderProducts();track('select_content',{content_type:'subcategory',item_id:sub});});
  document.getElementById('facet-list').addEventListener('change',event=>{const box=event.target.closest('[data-facet]');if(!box)return;const key=box.dataset.facet;selected[key]=selected[key]||new Set();if(box.checked)selected[key].add(box.value);else selected[key].delete(box.value);renderProducts();if(box.checked)track('select_content',{content_type:'filter_'+key,item_id:box.value});});
  ['price-min','price-max'].forEach(id=>document.getElementById(id).addEventListener('input',renderProducts));
  document.getElementById('reset-filters').addEventListener('click',()=>{selected={};document.getElementById('price-min').value='';document.getElementById('price-max').value='';renderProducts();});
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
  if(window.matchMedia&&window.matchMedia('(max-width: 900px)').matches) document.getElementById('facets').open=false;
  renderProducts();renderCart();
})();
