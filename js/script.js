const toastEl=document.getElementById('appToast');
function notify(message){document.getElementById('toastMessage').textContent=message;bootstrap.Toast.getOrCreateInstance(toastEl).show();}
document.getElementById('donationForm').addEventListener('submit',function(e){
 e.preventDefault();e.stopPropagation();
 if(!this.checkValidity()){this.classList.add('was-validated');return;}
 const data=new FormData(this);const name=data.get('food');const category=data.get('category');const quantity=data.get('quantity');
 const card=document.createElement('div');card.className='col-md-6 col-lg-4 donation-item';card.dataset.category=category;card.dataset.name=name.toLowerCase();
 card.innerHTML=`<div class="food-card"><div class="p-4 bg-success-subtle text-success text-center"><i class="bi bi-box-seam display-4"></i></div><div class="p-3"><span class="badge text-bg-success-subtle">${category}</span><h5 class="mt-2"></h5><p class="text-secondary small"><i class="bi bi-geo-alt"></i> ${escapeHTML(data.get('address'))}</p><div class="small">${escapeHTML(quantity)} • ${escapeHTML(data.get('people')||'—')} people</div><button class="btn btn-outline-success w-100 mt-3 request-btn">Request pickup</button></div></div>`;
 card.querySelector('h5').textContent=name;document.getElementById('donationCards').prepend(card);
 this.reset();this.classList.remove('was-validated');notify('Your donation has been added to the demo listings.');document.getElementById('donations').scrollIntoView({behavior:'smooth'});
});
function escapeHTML(value){return String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function filterCards(){const q=document.getElementById('searchDonation').value.toLowerCase();const cat=document.getElementById('categoryFilter').value;let shown=0;document.querySelectorAll('.donation-item').forEach(card=>{const ok=card.dataset.name.includes(q)&&(!cat||card.dataset.category===cat);card.classList.toggle('d-none',!ok);if(ok)shown++;});document.getElementById('noResults').classList.toggle('d-none',shown>0);}
document.getElementById('searchDonation').addEventListener('input',filterCards);document.getElementById('categoryFilter').addEventListener('change',filterCards);
document.getElementById('donationCards').addEventListener('click',e=>{if(e.target.classList.contains('request-btn')){e.target.textContent='Request sent';e.target.classList.replace('btn-outline-success','btn-success');e.target.disabled=true;notify('Pickup request submitted in this demo.');}});
document.getElementById('loginBtn').addEventListener('click',()=>{bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();notify('Demo login successful. Welcome to AnnaSetu!');});
document.getElementById('registerBtn').addEventListener('click',()=>{bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();notify('Demo account created. You can now explore AnnaSetu.');});
let stage=2;document.getElementById('advanceTracking').addEventListener('click',()=>{const stages=document.querySelectorAll('.timeline>div');stages[stage].classList.add('done');stages[stage].classList.remove('current');stage=Math.min(stage+1,3);stages[stage].classList.add('current');notify(stage===3?'Pickup completed in this demo.':'Pickup status updated.');});
