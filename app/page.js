"use client";

import { useState } from "react";

const ADMIN_PASS = "unscroll2025";

const TEAM = [
  { name:"Aykut İlbey Yürek",  email:"aykutilbey@gmail.com",       github:"https://github.com/aykutilbey",      initials:"AY" },
  { name:"Ece Melisa Aksoy",    email:"ecemelisaaksoy@icloud.com",  github:"https://github.com/ecemelisaaksoy", initials:"EA" },
];

const QUESTIONS = [
  {id:1,cat:1,emoji:"🧠",label:"Zihinsel Meşguliyet",text:"Telefon elinde değilken bile 'Acaba şu an kim ne paylaştı?' diye düşünüyor musun?"},
  {id:2,cat:2,emoji:"📈",label:"Tolerans",           text:"Eskiden 5–10 dakika bakmak yeterken aynı tatmini almak için saatlerce bakman gerekiyor mu?"},
  {id:3,cat:3,emoji:"📉",label:"Yoksunluk",          text:"Telefonun şarjı bittiğinde veya internet çekmediğinde huzursuz ve sinirli oluyor musun?"},
  {id:4,cat:4,emoji:"🛑",label:"Israr",              text:"'Bugün sadece yarım saat bakacağım' deyip kendini yine 2 saat sonunda ekran başında bulduğun oluyor mu?"},
  {id:5,cat:5,emoji:"⏳",label:"İlgi Kaybı",         text:"Eskiden severek yaptığın hobilerine artık sosyal medya yüzünden vakit ayıramadığın oluyor mu?"},
  {id:6,cat:6,emoji:"⚠️",label:"Sorunlar",           text:"Sosyal medya yüzünden derslerinin aksadığı, işlerinin yetişmediği veya performansının düştüğü oldu mu?"},
  {id:7,cat:7,emoji:"🎭",label:"Aldatma",            text:"Yakınlarına 'Sadece 5 dakika baktım' deyip aslında çok daha fazla vakit geçirdiğini gizlediğin oluyor mu?"},
  {id:8,cat:8,emoji:"🏃",label:"Kaçış",              text:"Canın sıkkınken veya stresliyken gerçeklerden kaçmak için uygulamalara sığınıyor musun?"},
  {id:9,cat:9,emoji:"💥",label:"Çatışma",            text:"Telefonu elinden bırakmadığın için ailenle veya sevdiklerinle gerginlik ya da tartışma çıktı mı?"},
];

const TASKS = [
  {id:"1-1",cat:1,lvl:"kolay",title:"Sabah 30 Dakika Telefonsuz",desc:"Sabah uyandığında ilk 30 dakika telefona hiç dokunma."},
  {id:"1-2",cat:1,lvl:"orta", title:"Yemekte Telefon Yok",       desc:"Yemek yerken telefonu başka bir odaya bırak ve sadece yemeğin tadına odaklan."},
  {id:"1-3",cat:1,lvl:"zor",  title:"Grayscale Modu",            desc:"Telefonun ekranını tamamen siyah-beyaz (grayscale) moda al. Görsel cazibeyi azaltır."},
  {id:"1-4",cat:1,lvl:"zor",  title:"Telefonsuz Çıkış",          desc:"Kısa bir yürüyüşe veya markete giderken telefonu evde bırakmayı dene."},
  {id:"2-1",cat:2,lvl:"kolay",title:"15 Dakika Kısıtlama",       desc:"En çok vakit geçirdiğin uygulamanın günlük kullanımına 15 dakikalık bir kısıtlama koy."},
  {id:"2-2",cat:2,lvl:"orta", title:"Sonsuz Kaydırmayı Kır",     desc:"'Infinite Scroll' özelliğini fark ettiğin an uygulamayı kapat ve 10 dakika ara ver."},
  {id:"2-3",cat:2,lvl:"zor",  title:"Süreyi Yarıya İndir",       desc:"Sosyal medya kullanım süreni normalin yarısına indir ve kalan süreyi kronometre ile ölç."},
  {id:"2-4",cat:2,lvl:"zor",  title:"Akış Yasağı Günü",          desc:"Bir tam gün boyunca sadece mesajlaşma uygulamalarını kullan, akışlara hiç girme."},
  {id:"3-1",cat:3,lvl:"kolay",title:"%20 Kuralı",                desc:"Telefonun şarjı %20'nin altına düştüğünde şarja tak ve dolana kadar bakma."},
  {id:"3-2",cat:3,lvl:"orta", title:"Gece Bildirimsiz",           desc:"Akşam saat 21:00'den sonra tüm bildirimleri kapat (Rahatsız Etme modu)."},
  {id:"3-3",cat:3,lvl:"zor",  title:"Öğleden Sonra Kapalı",      desc:"Hafta sonu bir öğleden sonrayı (3–4 saat) telefonu tamamen kapatarak geçir."},
  {id:"3-4",cat:3,lvl:"zor",  title:"Doğada Bağlantısız",        desc:"Telefon çekmez bir ortamda (doğa yürüyüşü vb.) bilinçli vakit geçir."},
  {id:"4-1",cat:4,lvl:"kolay",title:"Uygulamaları Gizle",        desc:"Sosyal medya uygulamalarını ana ekrandan kaldırıp bir klasörün içine gizle."},
  {id:"4-2",cat:4,lvl:"orta", title:"Sadece Web'den Gir",        desc:"Sosyal medya uygulamalarını sil ve web tarayıcısı üzerinden kullan."},
  {id:"4-3",cat:4,lvl:"zor",  title:"3 Günlük Silme Denemesi",   desc:"Bir uygulamayı sil ve 3 gün boyunca yüklemeden durmayı dene."},
  {id:"5-1",cat:5,lvl:"kolay",title:"10 Dakika Hobi",            desc:"Eskiden sevdiğin bir hobine (kitap, çizim, müzik) günde sadece 10 dakika ayır."},
  {id:"5-2",cat:5,lvl:"orta", title:"30 Dakika Hareket",         desc:"Telefonu sessize al ve kesintisiz 30 dakika fiziksel bir aktivite (spor, yürüyüş) yap."},
  {id:"5-3",cat:5,lvl:"zor",  title:"Süre Takası",               desc:"'Ekran Süresi' raporundaki süren kadar, sevdiğin bir hobinle ilgilenerek 'takas' yap."},
  {id:"5-4",cat:5,lvl:"zor",  title:"Yeni Beceri Haftası",       desc:"Sosyal medyada geçirdiğin toplam süreyi bir hafta boyunca yeni bir beceri öğrenmeye aktar."},
  {id:"6-1",cat:6,lvl:"kolay",title:"Telefonu Ters Çevir",       desc:"Çalışırken telefonu 'ekranı aşağı bakacak' şekilde uzağına koy."},
  {id:"6-2",cat:6,lvl:"orta", title:"Bildirimleri Kapat",        desc:"En çok vaktini çalan uygulamanın bildirimlerini tamamen kapat."},
  {id:"6-3",cat:6,lvl:"zor",  title:"Pomodoro Tekniği",          desc:"25 dakika odaklanmış çalışma, 5 dakika telefonsuz mola şeklinde çalış."},
  {id:"6-4",cat:6,lvl:"zor",  title:"İş Saati Yasağı",           desc:"Bir gün boyunca okul veya iş saatleri içinde sosyal medyaya hiç giriş yapma."},
  {id:"7-1",cat:7,lvl:"kolay",title:"Ekran Süresi Görüntüsü",    desc:"Bugün kaç saat sosyal medyada vakit geçirdiğine dair ekran görüntüsünü çek."},
  {id:"7-2",cat:7,lvl:"orta", title:"Widget Ekle",                desc:"Telefonundaki 'Ekran Süresi' widget'ını ana ekranına ekle, her an gör."},
  {id:"7-3",cat:7,lvl:"zor",  title:"Sorumluluk Ortağı",         desc:"Bir arkadaşını sorumluluk ortağı belirle: sosyal medyada çok vakit geçirirsen seni uyarsın."},
  {id:"8-1",cat:8,lvl:"kolay",title:"'Neden?' Klasörü",          desc:"Uygulamaları bir klasöre taşı ve adını 'neden?' koy."},
  {id:"8-2",cat:8,lvl:"orta", title:"Duygu Günlüğü",             desc:"Olumsuz hissettiğinde telefona sarılmak yerine düşüncelerini kağıda yaz."},
  {id:"8-3",cat:8,lvl:"zor",  title:"Sesli Arama",                desc:"Olumsuz hissettiğinde sosyal medyaya girmek yerine bir arkadaşını sesli olarak ara."},
  {id:"8-4",cat:8,lvl:"zor",  title:"Tam Dinlenme Akşamı",       desc:"Bir akşam telefonunu kapat ve vaktini sadece rahatlamaya ayır."},
  {id:"9-1",cat:9,lvl:"kolay",title:"Konuşurken Uzaklaştır",     desc:"Birisiyle konuşurken telefonunu ortamdan uzaklaştır."},
  {id:"9-2",cat:9,lvl:"orta", title:"Yemek Masası Yasağı",       desc:"Akşam yemeği masasına telefon getirmeyi tamamen yasakla."},
  {id:"9-3",cat:9,lvl:"zor",  title:"Telefonsuz Pazar",           desc:"Sevdiklerinle bir tam günü (örn. Pazar) 'Telefonsuz Gün' ilan et."},
  {id:"9-4",cat:9,lvl:"zor",  title:"Telefon Üst Üste Oyunu",    desc:"Arkadaş buluşmalarında telefonları üst üste koyun; ilk dokunan hesabı öder!"},
];

const ANALYSES = {
  1:"Sosyal medya zihninin bir köşesinde sürekli çalışan bir arka plan programı gibi. Telefon elinde değilken bile merak, odaklanmanı zorlaştırıyor.",
  2:"Beynin dijital uyarana karşı bağışıklık kazanmış. Aynı keyfi almak için süreyi sürekli artırmak zorunda kalıyorsun.",
  3:"Sosyal medya senin için duygusal bir emzik haline gelmiş. Giriş yapamadığındaki huzursuzluk, beyninin ne kadar bağımlı olduğunun somut işareti.",
  4:"Direksiyonun başında sen yoksun, algoritmalar var. Azaltmak istesen de parmakların senden bağımsız hareket ediyor.",
  5:"Sosyal medya senin 'zaman hırsızın'. Potansiyelini gerçekleştirebileceğin hobileri bu hırsıza kurban ediyorsun.",
  6:"Bu durum artık sadece senin içinde kalmamış. Okuldaki notların veya işindeki verimin zarar görüyor.",
  7:"İçten içe durumun farkındasın ve bu sende bir suçluluk duygusu yaratıyor. Süreyi saklama ihtiyacı, bağımlılığınla yüzleşmekten korktuğunun işareti.",
  8:"Sosyal medyayı bir 'duygusal yara bandı' gibi kullanıyorsun. Stresli hissettiğinde sorun çözmek yerine telefonun ışığına sığınıyorsun.",
  9:"En büyük zararı sevdiklerin görüyor. Telefon ekranı, seninle sevdiklerin arasına örülmüş bir duvar gibi.",
};

const GROUP = {
  1:{emoji:"🟢",label:"Farkındalıklı Kullanıcı",zone:"Güvenli Bölge", color:"emerald",
     analysis:"Sosyal medya senin hayatını yönetmiyor, sen onu yönetiyorsun. Dijital dünyayı bir araç olarak kullanmayı başarıyorsun.",
     suggestion:"Mevcut dengeni koru. Haftada bir gün 'Dijital Detoks Saati' belirleyerek bu kontrolü kalıcı hale getirebilirsin."},
  2:{emoji:"🟡",label:"Riskli Kullanıcı",        zone:"Uyarı Bölgesi",color:"amber",
     analysis:"Sosyal medya yavaş yavaş kontrolü ele almaya başlamış. Henüz 'bağımlı' değilsin ama alışkanlıkların seni o yöne sürüklüyor.",
     suggestion:"Evet dediğin alanlara yönelik görevler seç. Müdahale etmek için en ideal zaman şu an!"},
  3:{emoji:"🔴",label:"Bozukluk Riski",          zone:"Kritik Bölge", color:"red",
     analysis:"Bilimsel kriterlere göre sosyal medya kullanımın bir 'bozukluk' seviyesine ulaşmış olabilir.",
     suggestion:"Bu uygulama senin için bir rehber olacak. Adım adım görevlerle bu döngüyü kırman gerekiyor. Gerekirse profesyonel destek almayı da düşün."},
};

const LVL_COLOR = {kolay:"bg-emerald-100 text-emerald-700",orta:"bg-amber-100 text-amber-700",zor:"bg-red-100 text-red-700"};
const GRP_BAR   = {emerald:"bg-emerald-500",amber:"bg-amber-500",red:"bg-red-500"};
const GRP_BADGE = {emerald:"text-emerald-700 bg-emerald-100",amber:"text-amber-700 bg-amber-100",red:"text-red-700 bg-red-100"};

const INIT_STORIES = [
  {id:1,name:"Ayşe K.",  date:"Ocak 2025",  story:"3 aylık program sonunda günlük 4 saatlik ekran süremin 45 dakikaya düştüğünü gördüm. Artık kitap okumaya vakit buluyorum!",approved:true},
  {id:2,name:"Mert T.",  date:"Şubat 2025", story:"Pomodoro tekniği hayatımı değiştirdi. Hem derslerimde çok daha başarılı oldum hem de ailemle kaliteli zaman geçiriyorum.",approved:true},
  {id:3,name:"Zeynep A.",date:"Mart 2025",  story:"Sorumluluk ortağı görevini arkadaşımla birlikte uyguladık. Birbirimizi motive ettik ve ikimiz de detoksumuzu tamamladık!",approved:true},
];

/* ── E-POSTA (mailto) ────────────────────────────────────────
   Gerçek Next.js projesinde EmailJS ile tam otomatik olur:
   emailjs.send("SERVICE","TEMPLATE",{to_email, to_name, program})
   Şimdilik mailto ile kullanıcının mail uygulaması açılır.
──────────────────────────────────────────────────────────── */
import emailjs from "@emailjs/browser";

const sendEmail = (toEmail, toName, myTasks, grp) => {
  const programText = buildProgramText(
    {name: toName, email: toEmail, group: grp, 
     score: Object.values(answers).filter(Boolean).length,
     date: new Date().toLocaleDateString("tr-TR")},
    myTasks
  );
  return emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
    to_email: toEmail,
    to_name:  toName,
    program:  programText,
  }, "PUBLIC_KEY");
};

/* ── PDF PRINT ───────────────────────────────────────────────
   Harici kütüphane gerektirmez. Yeni sekmede şık HTML açar,
   tarayıcının Yazdır → PDF Olarak Kaydet akışını tetikler.
──────────────────────────────────────────────────────────── */
const printPDF = (user, myTasks) => {
  const g = GROUP[user.group];
  const lvlTR = {kolay:"Kolay",orta:"Orta",zor:"Zor"};
  const lvlColor = {kolay:"#059669",orta:"#d97706",zor:"#dc2626"};

  const rows = myTasks.map((t,i) => {
    const q = QUESTIONS.find(q=>q.cat===t.cat);
    return `
      <tr style="border-bottom:1px solid #f3f4f6;">
        <td style="padding:12px 8px;color:#6b7280;font-size:13px;">${i+1}</td>
        <td style="padding:12px 8px;">
          <div style="font-weight:600;color:#111827;font-size:14px;">${t.title}</div>
          <div style="color:#9ca3af;font-size:12px;margin-top:3px;">${q.emoji} ${q.label}</div>
          <div style="color:#6b7280;font-size:12px;margin-top:4px;">${t.desc}</div>
        </td>
        <td style="padding:12px 8px;">
          <span style="background:${lvlColor[t.lvl]}20;color:${lvlColor[t.lvl]};
            font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px;">
            ${lvlTR[t.lvl]}
          </span>
        </td>
        <td style="padding:12px 8px;text-align:center;">
          <div style="width:20px;height:20px;border:2px solid #d1fae5;border-radius:5px;margin:auto;"></div>
        </td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html><html lang="tr"><head>
    <meta charset="UTF-8"/>
    <title>unscroll — Detoks Programım</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#111827;padding:40px;}
      @media print{body{padding:20px;} .no-print{display:none!important;}}
    </style>
  </head><body>
    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;border-bottom:2px solid #f3f4f6;padding-bottom:24px;">
      <div>
        <div style="font-size:26px;font-weight:800;letter-spacing:-0.5px;">
          <span style="color:#10b981;">un</span><span style="color:#111827;">scroll</span>
        </div>
        <div style="color:#9ca3af;font-size:12px;margin-top:4px;">Algoritmayı değil, hayatını yönet.</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:13px;font-weight:600;color:#111827;">${user.name}</div>
        <div style="font-size:12px;color:#9ca3af;">${user.email}</div>
        <div style="font-size:12px;color:#9ca3af;">${user.date}</div>
      </div>
    </div>
    <!-- Result badge -->
    <div style="background:#f9fafb;border-radius:16px;padding:20px 24px;margin-bottom:28px;display:flex;align-items:center;gap:16px;">
      <div style="font-size:36px;">${g.emoji}</div>
      <div>
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#10b981;margin-bottom:4px;">${g.zone}</div>
        <div style="font-size:18px;font-weight:700;color:#111827;">${g.label}</div>
        <div style="font-size:12px;color:#6b7280;margin-top:3px;">${user.score}/9 evet cevabı</div>
      </div>
    </div>
    <!-- Tasks table -->
    <div style="font-size:13px;font-weight:700;color:#374151;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px;">
      Görev Listesi — ${myTasks.length} görev
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #f3f4f6;border-radius:12px;overflow:hidden;">
      <thead>
        <tr style="background:#f9fafb;">
          <th style="padding:10px 8px;text-align:left;font-size:11px;color:#9ca3af;font-weight:600;">#</th>
          <th style="padding:10px 8px;text-align:left;font-size:11px;color:#9ca3af;font-weight:600;">GÖREV</th>
          <th style="padding:10px 8px;text-align:left;font-size:11px;color:#9ca3af;font-weight:600;">SEVİYE</th>
          <th style="padding:10px 8px;text-align:center;font-size:11px;color:#9ca3af;font-weight:600;">✓</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <!-- Footer -->
    <div style="margin-top:28px;text-align:center;color:#d1d5db;font-size:11px;">
      unscroll.app · Kişisel Detoks Programı
    </div>
    <!-- Auto print -->
    <script>window.onload=()=>{window.print();}<\/script>
  </body></html>`;

  const w = window.open("","_blank");
  if(w){ w.document.write(html); w.document.close(); }
};

const Logo = () => (
  <span className="text-xl font-bold tracking-tight">
    <span className="text-emerald-500">un</span><span className="text-gray-900">scroll</span>
  </span>
);

export default function App() {
  const [screen,    setScreen]    = useState("landing");
  const [answers,   setAnswers]   = useState({});
  const [curQ,      setCurQ]      = useState(0);
  const [selTasks,  setSelTasks]  = useState([]);
  const [email,     setEmail]     = useState("");
  const [name,      setName]      = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [users,     setUsers]     = useState([]);
  const [stories,   setStories]   = useState(INIT_STORIES);
  const [nextId,    setNextId]    = useState(4);
  const [loginEmail,setLoginEmail]= useState("");
  const [loginErr,  setLoginErr]  = useState("");
  const [curUser,   setCurUser]   = useState(null);
  const [confirm,   setConfirm]   = useState(false);
  const [storyTxt,  setStoryTxt]  = useState("");
  const [tipId,     setTipId]     = useState(null);
  const [lvlFilt,   setLvlFilt]   = useState("tümü");
  const [adminPass, setAdminPass] = useState("");
  const [adminErr,  setAdminErr]  = useState("");
  const [editStory, setEditStory] = useState(null);

  const score   = Object.values(answers).filter(Boolean).length;
  const group   = score<=2?1:score<=5?2:3;
  const yesCats = Object.entries(answers).filter(([,v])=>v).map(([k])=>+k);
  const go      = s => setScreen(s);
  const approvedStories = stories.filter(s=>s.approved);

  const resetTest = () => { setAnswers({}); setCurQ(0); setSelTasks([]); setEmail(""); setName(""); setEmailSent(false); };

  /* ── LANDING ─────────────────────────────────────────────── */
  if (screen==="landing") return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="px-8 py-5 flex justify-between items-center border-b border-gray-100">
        <Logo/>
        <div className="flex gap-5 items-center">
          <button onClick={()=>go("admin-login")} className="text-xs text-gray-300 hover:text-gray-400 transition">⚙</button>
          <button onClick={()=>go("login")} className="text-sm text-gray-400 hover:text-gray-700 transition">Oturum Aç</button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="text-6xl mb-5">📵</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Sosyal Medya<br/>Bağımlılık Testi</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-sm">9 soru · kişisel analiz · özel detoks programı</p>
        <button onClick={()=>{resetTest();go("test");}}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold px-12 py-4 rounded-2xl shadow-lg transition mb-6">
          Testi Başlat
        </button>
        <div className="flex gap-6 text-sm text-gray-400">
          <button onClick={()=>go("login")} className="hover:text-gray-600 transition">Oturum Aç</button>
          <span>·</span>
          <button onClick={()=>go("about")} className="hover:text-gray-600 transition">Hakkımızda</button>
          <span>·</span>
          <button onClick={()=>go("contact")} className="hover:text-gray-600 transition">İletişim</button>
        </div>
      </main>
      {approvedStories.length>0 && (
        <section className="bg-gray-50 px-6 py-12">
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-8">✨ Başarı Hikayeleri</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {approvedStories.slice(0,3).map(s=>(
              <div key={s.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-4 italic">"{s.story}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">{s.name[0]}</div>
                  <div><p className="text-sm font-medium text-gray-800">{s.name}</p><p className="text-xs text-gray-400">{s.date}</p></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  /* ── ABOUT ───────────────────────────────────────────────── */
  if (screen==="about") return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center gap-4">
        <button onClick={()=>go(curUser?"dashboard":"landing")} className="text-gray-400 hover:text-gray-700 transition text-lg">←</button>
        <Logo/>
      </div>
      <div className="max-w-lg mx-auto px-6 pt-12 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hakkımızda</h2>
        <p className="text-gray-400 text-sm mb-10">
          unscroll, sosyal medya bağımlılığını bilimsel kriterlerle ölçen ve kişiye özel detoks programları oluşturan bir araçtır.
          Algoritmayı değil, hayatını yönetmeni hedefliyoruz.
        </p>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Ekip</h3>
        <div className="space-y-4">
          {TEAM.map(m=>(
            <div key={m.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm flex-shrink-0">
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{m.name}</p>
                <a href={`mailto:${m.email}`} className="text-sm text-gray-400 hover:text-emerald-500 transition block truncate">{m.email}</a>
                <a href={m.github} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-emerald-500 transition block truncate">{m.github}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── CONTACT ─────────────────────────────────────────────── */
  if (screen==="contact") return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center gap-4">
        <button onClick={()=>go(curUser?"dashboard":"landing")} className="text-gray-400 hover:text-gray-700 transition text-lg">←</button>
        <Logo/>
      </div>
      <div className="max-w-lg mx-auto px-6 pt-12 pb-16 flex flex-col items-center text-center">
        <div className="text-5xl mb-6">✉️</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">İletişim</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">Bize ulaşmak, öneri iletmek veya destek almak için aşağıdaki adresi kullanabilirsin.</p>
        <a href="mailto:unscrollhelp@gmail.com"
          className="bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl px-8 py-5 transition group">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">E-posta</p>
          <p className="text-lg font-semibold text-emerald-600 group-hover:text-emerald-700 transition">unscrollhelp@gmail.com</p>
        </a>
      </div>
    </div>
  );

  /* ── LOGIN ───────────────────────────────────────────────── */
  if (screen==="login") return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <Logo/>
        <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-1">Hoş geldin</h2>
        <p className="text-gray-400 text-sm mb-6">E-posta adresinle programına devam et.</p>
        <input value={loginEmail} onChange={e=>{setLoginEmail(e.target.value);setLoginErr("");}}
          placeholder="E-posta adresin" type="email"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 mb-2"/>
        {loginErr && <p className="text-red-500 text-xs mb-2">{loginErr}</p>}
        <button onClick={()=>{
            const u=users.find(u=>u.email===loginEmail);
            if(!u){setLoginErr("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");return;}
            setCurUser(u);go("dashboard");
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition mt-2">
          Giriş Yap
        </button>
        <button onClick={()=>go("landing")} className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition">← Geri dön</button>
      </div>
    </div>
  );

  /* ── TEST ────────────────────────────────────────────────── */
  if (screen==="test") {
    const q=QUESTIONS[curQ], answered=answers[q.id]!==undefined, isLast=curQ===QUESTIONS.length-1;
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-100">
          <Logo/><span className="text-sm text-gray-400">{curQ+1} / {QUESTIONS.length}</span>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-1 bg-emerald-500 transition-all duration-300" style={{width:`${((curQ+1)/QUESTIONS.length)*100}%`}}/>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-xl mx-auto w-full">
          <div className="text-5xl mb-4">{q.emoji}</div>
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-3">{q.label}</p>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-10 leading-relaxed">{q.text}</h2>
          <div className="flex gap-4 w-full">
            {[{val:true,label:"Evet"},{val:false,label:"Hayır"}].map(opt=>(
              <button key={opt.label} onClick={()=>setAnswers(a=>({...a,[q.id]:opt.val}))}
                className={`flex-1 py-4 rounded-2xl font-semibold text-lg border-2 transition
                  ${answers[q.id]===opt.val
                    ? opt.val?"border-emerald-500 bg-emerald-50 text-emerald-700":"border-gray-400 bg-gray-100 text-gray-700"
                    :"border-gray-200 text-gray-400 hover:border-gray-300"}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="px-8 py-5 flex justify-between border-t border-gray-100">
          <button onClick={()=>setCurQ(q=>Math.max(0,q-1))} disabled={curQ===0}
            className="px-6 py-3 rounded-xl text-gray-400 hover:text-gray-700 disabled:opacity-30 transition font-medium">
            ← Önceki
          </button>
          <button disabled={!answered} onClick={()=>{if(isLast)go("results");else setCurQ(q=>q+1);}}
            className={`px-8 py-3 rounded-xl font-semibold transition
              ${answered?"bg-emerald-500 hover:bg-emerald-600 text-white":"bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
            {isLast?"Testi Bitir ✓":"Sonraki →"}
          </button>
        </div>
      </div>
    );
  }

  /* ── RESULTS ─────────────────────────────────────────────── */
  if (screen==="results") {
    const g=GROUP[group];
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-5xl mb-4">{g.emoji}</div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${GRP_BADGE[g.color]} mb-3`}>{g.zone}</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{g.label}</h2>
            <p className="text-gray-500 text-sm mb-6">{g.analysis}</p>
            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Evet cevapları: {score} / 9</span><span>%{Math.round((score/9)*100)}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-3 rounded-full transition-all ${GRP_BAR[g.color]}`} style={{width:`${(score/9)*100}%`}}/>
              </div>
            </div>
            <p className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3">{g.suggestion}</p>
          </div>
          {yesCats.length>0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Dikkat Gerektiren Alanlar</h3>
              <div className="space-y-3">
                {yesCats.map(cat=>{
                  const q=QUESTIONS.find(q=>q.cat===cat);
                  return (
                    <div key={cat} className="flex gap-3 p-3 rounded-xl bg-gray-50">
                      <span className="text-xl">{q.emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{q.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{ANALYSES[cat]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <button onClick={()=>go("tasks")} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl transition">
            {group===1?"Görev Havuzuna Göz At →":"Görev Havuzuna Git →"}
          </button>
          {group===1 && <p className="text-center text-xs text-gray-400">Harika! Zorunlu görevin yok ama istersen göz atabilirsin.</p>}
        </div>
      </div>
    );
  }

  /* ── TASKS ───────────────────────────────────────────────── */
  if (screen==="tasks") {
    const sorted  = [...TASKS].sort((a,b)=>{const ay=yesCats.includes(a.cat),by=yesCats.includes(b.cat);return ay===by?0:ay?-1:1;});
    const filtered= lvlFilt==="tümü"?sorted:sorted.filter(t=>t.lvl===lvlFilt);
    const toggle  = id=>setSelTasks(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="px-8 py-5 bg-white flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
          <Logo/><span className="text-sm font-medium text-emerald-600">{selTasks.length} görev seçildi</span>
        </div>
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Görev Havuzu</h2>
          <p className="text-gray-400 text-sm mb-6">{group>1?"Senin sorunlarına uygun görevler önce listelendi.":"İstediğin görevleri seçebilirsin."}</p>
          <div className="flex gap-2 mb-6 flex-wrap">
            {["tümü","kolay","orta","zor"].map(l=>(
              <button key={l} onClick={()=>setLvlFilt(l)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition capitalize
                  ${lvlFilt===l?"bg-gray-900 text-white":"bg-white border border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="space-y-3 mb-8">
            {filtered.map(task=>{
              const q=QUESTIONS.find(q=>q.cat===task.cat),isSel=selTasks.includes(task.id),isHigh=group>1&&yesCats.includes(task.cat);
              return (
                <div key={task.id} onClick={()=>toggle(task.id)}
                  className={`bg-white rounded-2xl p-4 border-2 cursor-pointer transition
                    ${isSel?"border-emerald-400 shadow-sm":isHigh?"border-emerald-100 hover:border-emerald-300":"border-gray-100 hover:border-gray-200"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 mt-0.5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition
                      ${isSel?"bg-emerald-500 border-emerald-500":"border-gray-300"}`}>
                      {isSel && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{task.title}</span>
                        {isHigh && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Önerilen</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{q.emoji}</span>
                        <span className="text-xs text-gray-400">{q.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LVL_COLOR[task.lvl]}`}>{task.lvl}</span>
                      </div>
                    </div>
                    <button onClick={e=>{e.stopPropagation();setTipId(tipId===task.id?null:task.id);}}
                      className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0 flex items-center justify-center text-gray-400 hover:border-gray-400 text-xs font-bold transition">
                      ?
                    </button>
                  </div>
                  {tipId===task.id && (
                    <div className="mt-3 ml-8 p-3 bg-gray-50 rounded-xl text-sm text-gray-600 border border-gray-100">{task.desc}</div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Programını Kaydet</h3>
            <p className="text-sm text-gray-400 mb-4">Bilgilerini gir, programın e-posta ile gelsin.</p>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Adın"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 mb-3"/>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-posta adresin" type="email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 mb-4"/>
            <button
              disabled={selTasks.length===0||!email||!name}
              onClick={async()=>{
                const u={name,email,tasks:selTasks,group,score,date:new Date().toLocaleDateString("tr-TR")};
                setUsers(us=>[...us.filter(x=>x.email!==email),u]);
                setCurUser(u);
                sendViaMailto(email, name, TASKS.filter(t=>selTasks.includes(t.id)), group);
                setEmailSent(true);
                go("program");
              }}
              className={`w-full py-4 rounded-2xl font-semibold transition
                ${selTasks.length>0&&email&&name?"bg-emerald-500 hover:bg-emerald-600 text-white":"bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
              Programımı Oluştur →
            </button>
            {selTasks.length===0 && <p className="text-center text-xs text-gray-400 mt-2">En az 1 görev seçmelisin.</p>}
          </div>
        </div>
      </div>
    );
  }

  /* ── PROGRAM ─────────────────────────────────────────────── */
  if (screen==="program") {
    const u=curUser, myTasks=TASKS.filter(t=>(u?.tasks||[]).includes(t.id)), g=GROUP[u?.group||group];
    return (
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="px-8 py-5 bg-white border-b border-gray-100"><Logo/></div>
        <div className="max-w-2xl mx-auto px-6 pt-8 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Programın Hazır!</h2>
            <p className="text-gray-400 text-sm">
              {emailSent
                ? <>Programın <span className="font-medium text-gray-700">{u?.email||email}</span> adresine gönderildi.</>
                : "Programın hazırlandı."}
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">Seçilen Görevler</h3>
                <p className="text-xs text-gray-400 mt-0.5">{g.emoji} {g.label} · {u?.score||score}/9 evet</p>
              </div>
              <span className="text-sm text-gray-400">{myTasks.length} görev</span>
            </div>
            <div className="divide-y divide-gray-50">
              {myTasks.map(task=>{
                const q=QUESTIONS.find(q=>q.cat===task.cat);
                return (
                  <div key={task.id} className="p-4 flex items-start gap-3">
                    <span className="text-lg mt-0.5">{q.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{task.desc}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${LVL_COLOR[task.lvl]}`}>{task.lvl}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={()=>downloadHTML(u||{name,email,group,score,date:new Date().toLocaleDateString("tr-TR")}, myTasks)}
            className="w-full border-2 border-emerald-500 text-emerald-600 font-semibold py-4 rounded-2xl hover:bg-emerald-50 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Programımı PDF Olarak İndir
          </button>
          <button onClick={()=>go("dashboard")} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl transition">
            Ana Sayfaya Git →
          </button>
        </div>
      </div>
    );
  }

  /* ── DASHBOARD ───────────────────────────────────────────── */
  if (screen==="dashboard") return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="px-8 py-5 bg-white border-b border-gray-100 flex justify-between items-center">
        <Logo/>
        <button onClick={()=>{setCurUser(null);go("landing");}} className="text-sm text-gray-400 hover:text-gray-600 transition">Çıkış</button>
      </div>
      <div className="max-w-lg mx-auto px-6 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Hoş geldin{curUser?`, ${curUser.name.split(" ")[0]}`:""}! 👋</h2>
        <p className="text-gray-400 text-sm mb-8">Programına devam et ya da yeni bir program oluştur.</p>
        <div className="space-y-3 mb-8">
          {[
            {icon:"📋",label:"Programım",   action:()=>go("program")},
            {icon:"✨",label:"Yeni Program",action:()=>{resetTest();go("test");}},
            {icon:"🏆",label:"Başaranlar",  action:()=>go("stories")},
            {icon:"ℹ️", label:"Hakkımızda", action:()=>go("about")},
            {icon:"✉️",label:"İletişim",    action:()=>go("contact")},
          ].map(item=>(
            <button key={item.label} onClick={item.action}
              className="w-full bg-white border border-gray-100 hover:border-emerald-200 rounded-2xl p-4 flex items-center gap-4 text-left transition shadow-sm hover:shadow">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-800">{item.label}</span>
              <span className="ml-auto text-gray-300 text-lg">→</span>
            </button>
          ))}
        </div>
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
          <p className="text-sm font-semibold text-emerald-800 mb-1">🎊 Bağımlılığını Yendin mi?</p>
          <p className="text-xs text-emerald-600 mb-4">Detoks serüvenini tamamladıysan, topluluğumuzla paylaş!</p>
          <button onClick={()=>setConfirm(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition text-sm">
            Bağımlılıktan Kurtuldum! 🎉
          </button>
        </div>
      </div>
      {confirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Emin misin?</h3>
            <p className="text-gray-500 text-sm mb-6">Gerçekten bağımlılığından kurtulduğuna emin misin?</p>
            <button onClick={()=>{setConfirm(false);go("story");}} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl mb-2 transition">
              Evet, serüvenimi paylaşayım!
            </button>
            <button onClick={()=>setConfirm(false)} className="w-full py-3 text-gray-400 hover:text-gray-600 text-sm transition">Henüz değil</button>
          </div>
        </div>
      )}
    </div>
  );

  /* ── STORY WRITE ─────────────────────────────────────────── */
  if (screen==="story") return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tebrikler!</h2>
          <p className="text-gray-400 text-sm">Serüvenini anlat, başkalarına ilham ver.</p>
          <p className="text-xs text-amber-500 mt-2 bg-amber-50 rounded-xl px-3 py-2 inline-block">Hikayen admin onayından sonra yayınlanacak ✓</p>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <textarea value={storyTxt} onChange={e=>setStoryTxt(e.target.value)}
            placeholder="Detoks yolculuğunda neler yaşadın? Hangi görevler işine yaradı? Neler değişti?"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400 resize-none h-36 mb-4"/>
          <button disabled={storyTxt.length<10}
            onClick={()=>{
              setStories(s=>[...s,{id:nextId,name:curUser?.name||name||"Anonim",
                date:new Date().toLocaleDateString("tr-TR",{month:"long",year:"numeric"}),
                story:storyTxt,approved:false}]);
              setNextId(n=>n+1);setStoryTxt("");go("dashboard");
            }}
            className={`w-full py-4 rounded-2xl font-semibold transition
              ${storyTxt.length>=10?"bg-emerald-500 hover:bg-emerald-600 text-white":"bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
            Hikayemi Gönder ✓
          </button>
        </div>
      </div>
    </div>
  );

  /* ── STORIES LIST ────────────────────────────────────────── */
  if (screen==="stories") return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center gap-4">
        <button onClick={()=>go("dashboard")} className="text-gray-400 hover:text-gray-700 transition text-lg">←</button>
        <Logo/>
      </div>
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">🏆 Başaranlar</h2>
        <p className="text-gray-400 text-sm mb-8">Detoks serüvenini tamamlayanların hikayeleri.</p>
        {approvedStories.length===0
          ? <p className="text-center text-gray-400 py-16">Henüz onaylanmış hikaye yok.</p>
          : <div className="space-y-4">
              {approvedStories.map(s=>(
                <div key={s.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-gray-600 text-sm mb-4 italic">"{s.story}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">{s.name[0]}</div>
                    <div><p className="text-sm font-medium text-gray-800">{s.name}</p><p className="text-xs text-gray-400">{s.date}</p></div>
                  </div>
                </div>
              ))}
            </div>}
      </div>
    </div>
  );

  /* ── ADMIN LOGIN ─────────────────────────────────────────── */
  if (screen==="admin-login") return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6">
      <div className="bg-gray-800 rounded-3xl p-8 w-full max-w-sm border border-gray-700">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Admin Girişi</p>
        <h2 className="text-xl font-bold text-white mb-6">unscroll yönetim paneli</h2>
        <input value={adminPass} onChange={e=>{setAdminPass(e.target.value);setAdminErr("");}}
          placeholder="Şifre" type="password"
          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-400 mb-2"/>
        {adminErr && <p className="text-red-400 text-xs mb-2">{adminErr}</p>}
        <button onClick={()=>{if(adminPass===ADMIN_PASS){setAdminPass("");go("admin");}else setAdminErr("Hatalı şifre.");}}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition mt-2">
          Giriş Yap
        </button>
        <button onClick={()=>go("landing")} className="w-full mt-3 text-sm text-gray-500 hover:text-gray-300 transition">← Geri dön</button>
      </div>
    </div>
  );

  /* ── ADMIN PANEL ─────────────────────────────────────────── */
  if (screen==="admin") {
    const pending=stories.filter(s=>!s.approved), approved=stories.filter(s=>s.approved);
    const approve=id=>setStories(s=>s.map(x=>x.id===id?{...x,approved:true}:x));
    const reject =id=>setStories(s=>s.filter(x=>x.id!==id));
    const saveEdit=()=>{if(!editStory)return;setStories(s=>s.map(x=>x.id===editStory.id?{...x,story:editStory.text}:x));setEditStory(null);};
    const GRP_LABEL={1:"🟢 Farkındalıklı",2:"🟡 Riskli",3:"🔴 Bozukluk Riski"};

    const StoryCard=({s,actions})=>(
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
        {editStory?.id===s.id
          ? <textarea value={editStory.text} onChange={e=>setEditStory({...editStory,text:e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-sm text-white outline-none resize-none h-24 mb-3"/>
          : <p className="text-gray-300 text-sm mb-3 italic">"{s.story}"</p>}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-400 font-bold text-xs">{s.name[0]}</div>
          <div><p className="text-sm font-medium text-gray-200">{s.name}</p><p className="text-xs text-gray-500">{s.date}</p></div>
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${s.approved?"bg-emerald-900 text-emerald-400":"bg-amber-900 text-amber-400"}`}>
            {s.approved?"Yayında":"Beklemede"}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {actions}
          {editStory?.id===s.id
            ? <button onClick={saveEdit} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition">Kaydet</button>
            : <button onClick={()=>setEditStory({id:s.id,text:s.story})} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition">Düzenle</button>}
          <button onClick={()=>reject(s.id)} className="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1.5 rounded-lg transition">Sil</button>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-900 pb-12">
        <div className="px-8 py-5 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo/><span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <button onClick={()=>go("landing")} className="text-sm text-gray-400 hover:text-gray-200 transition">Çıkış</button>
        </div>

        <div className="max-w-2xl mx-auto px-6 pt-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              {label:"Kullanıcı",     val:users.length},
              {label:"Bekleyen",      val:pending.length, warn:pending.length>0},
              {label:"Yayında",       val:approved.length},
              {label:"Toplam Hikaye", val:stories.length},
            ].map(s=>(
              <div key={s.label} className={`rounded-2xl p-4 text-center border ${s.warn?"bg-amber-900 border-amber-700":"bg-gray-800 border-gray-700"}`}>
                <p className={`text-2xl font-bold ${s.warn?"text-amber-300":"text-white"}`}>{s.val}</p>
                <p className={`text-xs mt-1 ${s.warn?"text-amber-400":"text-gray-400"}`}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Users */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">👥 Kayıtlı Kullanıcılar</h3>
            {users.length===0
              ? <p className="text-gray-500 text-sm">Henüz kayıtlı kullanıcı yok.</p>
              : <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase">Ad</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase">E-posta</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase">Sonuç</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase">Görev</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase">Tarih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u,i)=>(
                        <tr key={i} className="border-b border-gray-700 last:border-0 hover:bg-gray-750">
                          <td className="px-4 py-3 text-gray-200 font-medium">{u.name}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-gray-300">{GRP_LABEL[u.group]}</span>
                            <span className="text-gray-500 text-xs ml-1">({u.score}/9)</span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{u.tasks?.length||0} görev</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{u.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>}
          </div>

          {/* Pending stories */}
          {pending.length>0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">⏳ Onay Bekleyenler</h3>
              <div className="space-y-3">
                {pending.map(s=><StoryCard key={s.id} s={s} actions={
                  <button onClick={()=>approve(s.id)} className="text-xs bg-emerald-700 hover:bg-emerald-600 text-emerald-200 px-3 py-1.5 rounded-lg transition">✓ Onayla</button>
                }/>)}
              </div>
            </div>
          )}

          {/* Approved stories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">✅ Yayında</h3>
            {approved.length===0
              ? <p className="text-gray-500 text-sm">Henüz yayında hikaye yok.</p>
              : <div className="space-y-3">{approved.map(s=><StoryCard key={s.id} s={s} actions={null}/>)}</div>}
          </div>
        </div>
      </div>
    );
  }

  return null;
}