(()=>{"use strict";const e=e=>{const t=[];JSON.parse(localStorage.getItem("users"));let n=JSON.parse(localStorage.getItem("auth"))||"";const l=document.getElementById("text-email"),a=document.getElementById("text-date"),o=document.querySelector("tbody"),i=document.getElementById("popup"),r=document.getElementById("popup_close"),s=document.getElementById("popup__email"),d=document.getElementById("popup__password"),c=document.getElementById("popup__password-check"),h=document.getElementById("popup__btn-save"),u=document.getElementById("popup__email-err"),m=document.getElementById("popup__password-err"),w=document.getElementById("text-err");class g{constructor(e,t,n,l,a=""){this.index=e,this.email=t,this.password=n,this.auth=a,this.dateNow=l}start(){this.show(),this.auth&&(o.querySelector("#btn-cahge").addEventListener("click",this.openChange.bind(this)),r.addEventListener("click",this.closeChange.bind(this)),h.addEventListener("click",this.change.bind(this)),c.addEventListener("input",(()=>{c.value!==d.value?w.innerText="Пароли не совпадают":w.innerText=""})),d.addEventListener("input",(()=>{c.value!==d.value&&c.value.length>0?w.innerText="Пароли не совпадают":w.innerText=""})))}show(){this.auth&&(l.innerText=this.email,a.innerText=this.dateNow),o.insertAdjacentHTML("beforeend",`<tr>\n      <td>${this.index+1}</td>\n      <td>${this.email}</td>\n      <td>${this.auth?'<button class="btn" id="btn-cahge">Редактировать данные</button>':""}</td>\n      </tr>`)}openChange(e){e.preventDefault(),s.value="",d.value="",c.value="",s.placeholder="Введите новый email",d.placeholder="Введите новый пароль",c.placeholder="Повторите пароль",u.innerText="",m.innerText="",w.innerText="",i.style.zIndex="3",i.style.visibility="visible",s.addEventListener("focus",(()=>{const e=s.placeholder;s.placeholder="",u.innerText="",s.addEventListener("blur",(()=>{s.placeholder=e}))})),d.addEventListener("focus",(()=>{const e=d.placeholder;d.placeholder="",m.innerText="",d.addEventListener("blur",(()=>{d.placeholder=e}))})),c.addEventListener("focus",(()=>{const e=c.placeholder;c.placeholder="",w.innerText="",c.addEventListener("blur",(()=>{c.placeholder=e}))}))}closeChange(e){e.preventDefault(),i.style.zIndex="1",i.style.visibility="hidden"}change(e){e.preventDefault();let l=!0,a=!0,r=!0;const h=JSON.parse(localStorage.getItem("users"))||[];t.length>0&&(h.forEach(((e,n)=>{t.push(new g(n,e.email,e.password,e.dateNow,e.auth))})),localStorage.setItem("users",JSON.stringify(t))),this.email===n&&(""!==s.value.trim()&&(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(s.value.trim())||(l=!1,u.innerText="Введите корректный eMail"),t.forEach((e=>{e.email!==this.email&&e.email===s.value.trim()&&(l=!1,alert("Пользователь с таким eMail уже зарегистрирован!"))}))),""!==d.value&&d.value.length<6&&(l=!1,m.innerText="Пароль должен содержать не менее 6 символов!"),l&&(a&&""!==s.value.trim()&&(this.email=s.value,n=s.value,a=!1),r&&""!==d.value&&(d.value===c.value?(this.password=d.value,r=!1):w.innerText="Пароли не совпадают"),""===s.value.trim()&&""===d.value||(i.style.zIndex="1",i.style.visibility="hidden",console.log(t),localStorage.setItem("users",JSON.stringify(t)),localStorage.setItem("auth",JSON.stringify(n)),o.innerHTML='<tr><th>№ п/п</th><th>E-Mail</th><th class="td-btn"></th></tr>',t.forEach((e=>{e.start()}))),a||alert("EMail успешно изменен!"),r||alert("Пароль успешно изменен!")))}}return g},t=e=>{const t=JSON.parse(localStorage.getItem("users"))||[],n=[];return t.length>0&&(t.forEach(((t,l)=>{n.push(new e(l,t.email,t.password,t.dateNow,t.auth))})),localStorage.setItem("users",JSON.stringify(n))),n};(e=>{const t=window.location.href.slice(0,window.location.href.lastIndexOf("/")),n=t+"/index.html",l=t+"/home.html",a=e||[];let o=JSON.parse(localStorage.getItem("auth"))||"";const i=document.querySelector("tbody");window.location.href===n&&""!==o&&(window.location.href=l),window.location.href===l&&(""!==o?(i.innerHTML='<tr><th>№ п/п</th><th>E-Mail</th><th class="td-btn"></th></tr>',a.forEach((e=>{e.start()}))):window.location.href=n)})(t(e())),(e=>{const t=window.location.href.slice(0,window.location.href.lastIndexOf("/")),n=t+"/index.html",l=t+"/home.html",a=e||[];let o=JSON.parse(localStorage.getItem("auth"))||"";const i=document.getElementById("btn-exit");window.location.href===l&&i.addEventListener("click",(e=>{e.preventDefault(),a.forEach((e=>{e.auth&&(e.auth="",o="",localStorage.setItem("users",JSON.stringify(a)),localStorage.setItem("auth",JSON.stringify("")),window.location.href=n)}))}))})(t(e())),(()=>{const e=window.location.href.slice(0,window.location.href.lastIndexOf("/"))+"/index.html";if(window.location.href===e){const e=document.getElementById("email"),t=document.getElementById("email-err"),n=document.getElementById("password"),l=document.getElementById("password-err");e.addEventListener("focus",(()=>{const n=e.placeholder;e.placeholder="",t.innerText="",e.addEventListener("blur",(()=>{e.placeholder=n}))})),n.addEventListener("focus",(()=>{const e=n.placeholder;n.placeholder="",l.innerText="",n.addEventListener("blur",(()=>{n.placeholder=e}))}))}})(),((e,t)=>{const n=window.location.href.slice(0,window.location.href.lastIndexOf("/"))+"/index.html";let l=t||[];const a=document.getElementById("btn-reg"),o=document.getElementById("email"),i=document.getElementById("email-err"),r=document.getElementById("password"),s=document.getElementById("password-err");window.location.href===n&&a.addEventListener("click",(n=>{n.preventDefault(),console.log(1);let a=!0;if(""!==o.value.trim()?(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(o.value.trim())||(a=!1,i.innerText="Введите корректный eMail"),l.length>0&&l.forEach((e=>{e.email===o.value.trim()&&(a=!1,alert("Пользователь с таким eMail уже зарегистрирован!"))}))):(a=!1,i.innerText="Введите eMail",o.value=""),""!==r.value?r.value.length<6&&(a=!1,s.innerText="Пароль должен содержать не менее 6 символов!"):(a=!1,s.innerText="Введите пароль"),a){const n=new Date,a=(new Intl.DateTimeFormat).format(n);if(l>0)l.push(new e(l.length,o.value,r.value,a));else{const t=0;l.push(new e(t,o.value,r.value,a))}o.value="",r.value="",l=t,alert("Вы успешно зарегистрировались"),localStorage.setItem("users",JSON.stringify(l))}}))})(e(),t(e())),(e=>{const t=window.location.href.slice(0,window.location.href.lastIndexOf("/")),n=t+"/index.html",l=t+"/home.html",a=e||[],o=document.getElementById("btn-auth"),i=document.getElementById("email"),r=document.getElementById("email-err"),s=document.getElementById("password"),d=document.getElementById("password-err");window.location.href===n&&o.addEventListener("click",(e=>{e.preventDefault();let t=!0;""!==i.value.trim()?/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(i.value.trim())||(t=!1,r.innerText="Введите корректный eMail"):(t=!1,r.innerText="Введите eMail",i.value=""),""!==s.value?s.value.length<6&&(t=!1,d.innerText="Пароль должен содержать не менее 6 символов!"):(t=!1,d.innerText="Введите пароль"),t&&(a.length>0?(a.forEach((e=>{e.email===i.value.trim()&&(t=!1,e.password===s.value?(e.auth="1",localStorage.setItem("auth",JSON.stringify(e.email)),localStorage.setItem("users",JSON.stringify(a)),window.location.href=l):(s.value="",alert("Вы ввели неверный пароль! Попробуйте снова!")))})),t&&alert("Пользователя с таким eMail не существует! Зарегистрируйтесь!")):alert("Пользователя с таким eMail не существует! Зарегистрируйтесь!"))}))})(t(e()))})();