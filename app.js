const scenarioCatalog = [
  {
    id: 'after-hours-access',
    accent: 'orange',
    name: { tr: 'Mesai Dışı Yetkisiz Erişim', en: 'After-Hours Unauthorized Access' },
    summary: {
      tr: 'Gen düzenleme ve tedarik kayıtları içeren paylaşımlarda gece erişimi, MFA yorgunluğu ve olası düşük hacimli veri dışa aktarımı şüphesi.',
      en: 'Night-time access to gene-editing and procurement shares, MFA-fatigue signals, and suspected low-volume data exfiltration.'
    },
    nodes: {
      start: stage({
        alert: ['SOC, CRISPR proje paylaşımlarında 02:13-02:41 arasında şüpheli erişim doğruladı.', 'SOC confirmed suspicious access to CRISPR project shares between 02:13 and 02:41.'],
        title: ['Aşama 1 — İlk Alarm, Hesap Koruma ve Delil Penceresi', 'Stage 1 — Initial Alert, Account Protection, and the Evidence Window'],
        text: ['Bir doktora araştırmacısı, gece boyunca art arda MFA bildirimleri aldığını sabah fark ediyor. Aynı hesapla kampüs dışından VPN oturumu açılmış, “GeneDrive_AnimalStudy”, “Vector_Design” ve kısıtlı tedarik klasörlerinde toplu dizin gezinmesi yapılmış. DLP aracı henüz yüksek hacimli indirme doğrulamadı, ancak dosya listeleme ve arşiv hazırlık hareketleri normalin 18 katına çıktı. İlk hedef; hesabı ve uç noktayı kontrollü biçimde izole etmek, aktif oturumu kesmek ve uçucu delili kaybetmemek.', 'A doctoral researcher notices in the morning that they received repeated MFA prompts overnight. The same account opened a VPN session from off campus and browsed the “GeneDrive_AnimalStudy,” “Vector_Design,” and restricted procurement folders at high volume. The DLP tool has not yet confirmed a large download, but directory listing activity is 18 times above baseline. The first goal is to isolate the account and endpoint in a controlled way, terminate the live session, and avoid losing volatile evidence.'],
        setting: ['Yer: Üniversite biyogüvenlik araştırma enstitüsü, pazar gecesi. Etkilenen kullanıcı pazartesi sabahı konferans için yolda. Ekipte nöbetçi bir sistem yöneticisi ve çağrılabilir IR lideri var.', 'Setting: A university biosecurity research institute on Sunday night. The affected user is traveling for a Monday conference. A duty sysadmin is available and the incident lead can be called in.'],
        current: ['Şüpheli VPN oturumu hâlâ açık olabilir. Paylaşımlarda sadece gezinme değil, dosya hazırlık hareketleri de görülüyor. Kullanıcının dizüstü bilgisayarı henüz kuruma getirilmedi.', 'The suspicious VPN session may still be active. The shares show not just browsing but possible staging behavior. The user’s laptop has not yet been brought back to campus.'],
        changed: ['Bu ilk aşama olduğu için önceki karar etkisi yok; ekibin şimdi kuracağı tempo sonraki tüm aşamaları belirleyecek.', 'This is the first stage, so there is no prior-choice impact yet; the pace set here will shape everything that follows.'],
        developments: [
          ['IAM paneli, iki ülkeden peş peşe oturum denemesi gösteriyor.', 'Araştırmacının hesabı, normalde kullanmadığı bir servis grubuna kısa süreli olarak dahil edilmiş görünüyor; bu durum kimlik sağlayıcı ya da ayrıcalık atama zincirinde kötüye kullanım olasılığı doğuruyor.', 'Yedekleme anlık görüntüsü 03:00’te alınmış; zaman çizelgesi kurulabilir.'],
          ['The IAM panel shows back-to-back session attempts from two countries.', 'The researcher account appears to have briefly inherited access to a service group it does not normally use on restricted shares.', 'A backup snapshot was captured at 03:00, so a timeline can be reconstructed.']
        ],
        options: [
          ['Hesabı ve ilgili uç noktayı kontrollü izole et, canlı oturumu sonlandır, log korumayı ve olay kaydını aynı anda başlat.', 'Controlled-isolate the account and endpoint, terminate the live session, and start log preservation and incident recording at the same time.'],
          ['Kullanıcıya hemen parola sıfırlatıp cihazı yeniden başlatmasını söyle; teknik incelemeyi sonra yap.', 'Tell the user to reset the password immediately and reboot the device; investigate later.'],
          ['Biraz daha izle; gerçekten veri çıkışı varsa o zaman müdahale et.', 'Watch a little longer; intervene only if actual data exfiltration becomes obvious.']
        ],
        choices: [
          choice('positive', '⚡ Erken containment bonusu', '⚡ Early containment bonus', 'Çok güçlü başlangıç. Canlı erişim kesildi, delil korunmaya başlandı ve olay kaydı kurumsal olarak başlatıldı.', 'Excellent start. Live access was cut off, evidence preservation began, and the institutional incident record was activated.', { score: 25, speed: 12, evidence: 15, coordination: 8, risk: 14 }, 'Containment Pro', 'comms'),
          choice('negative', '😢 Uçucu delil kaybı riski', '😢 Volatile evidence loss risk', 'İyi niyetli ama zayıf refleks. Plansız reboot ve anlık parola değişimi oturum, bellek ve korelasyon bilgisini bozabilir.', 'Well-intended but weak. An unplanned reboot and immediate password reset can disrupt session, memory, and correlation evidence.', { score: -12, speed: 4, evidence: -18, coordination: -4, risk: -8 }, 'Evidence Lost', 'comms'),
          choice('negative', '😢 Gecikme cezası', '😢 Delay penalty', 'Gecikme saldırgana ek keşif ve hazırlık zamanı verir. Bu tür olaylarda sessiz izleme, aktif containment olmadan pahalıya mal olabilir.', 'Delay gives the actor more time for discovery and staging. In cases like this, passive watching without active containment can be costly.', { score: -20, speed: -18, evidence: -6, coordination: -8, risk: -18 }, 'Late Response', 'comms')
        ]
      }),
      comms: stage({
        alert: ['Kapsam büyüdü: liderlik, araştırma güvenliği ve hukuk 30 dakikalık özet bekliyor.', 'Scope is expanding: leadership, research security, and legal want a 30-minute brief.'],
        title: ['Aşama 2 — Eskalasyon, Paydaş Yönetimi ve Kapsam Bildirimi', 'Stage 2 — Escalation, Stakeholder Management, and Scope Notification'],
        text: ['İlk teknik inceleme, olayın yalnızca tek bir kullanıcı oturumuyla sınırlı olmayabileceğini gösteriyor. Erişim verilen klasörler içinde yayımlanmamış deney planları, tedarik zinciri notları, dizin/meta veri kayıtları ve ortak kurumlarla NDA kapsamında paylaşılan çalışma paketleri var. Bu aşamada yanlış kişiyi eksik/erken bilgilendirmek de, gereksiz geniş duyuru yapmak da zararlı olabilir.', 'Initial technical review suggests the incident may not be limited to a single user account. The exposed folders contain unpublished experimental plans, supply-chain notes, and data shared under NDA with external collaborators. At this stage, both under-notifying the wrong people and broadcasting too widely can be harmful.'],
        setting: ['Nöbetçi IT ekibi kısa durum notu istedi. Enstitü yöneticisi 45 dakika içinde yönetim kuruluna geçecek. Dış ortaklardan biri sabah veri güncellemesi bekliyor.', 'The duty IT team wants a short situation note. The institute director is joining a board call in 45 minutes. One external partner expects a data update in the morning.'],
        current: ['Olay artık teknik + yönetsel + araştırma güvenliği boyutu taşıyor. İletişim zinciri kurumsal güven ve yasal hazırlık açısından belirleyici.', 'The incident now has technical, managerial, and research-security dimensions. The communication chain will determine institutional trust and legal readiness.'],
        changedByTone: {
          positive: ['İlk containment işe yaradı; elinizde daha temiz loglar ve daha net kapsam sinyalleri var. Bu, yapılandırılmış eskalasyon yapmayı kolaylaştırıyor.', 'Initial containment worked; you now have cleaner logs and clearer scope signals. That makes structured escalation easier.'],
          negative: ['Önceki karar nedeniyle olay penceresi bulanıklaştı. Paydaşlar hem ne olduğunu hem de neden geç kalındığını soruyor.', 'Because of the prior decision, the incident window is now blurrier. Stakeholders are asking both what happened and why the response was slow.']
        },
        developments: [
          ['Araştırma güvenliği ofisi, klasörlerde ihracat kontrolüne tabi sekans tasarım notları olabileceğini bildiriyor.', 'Hukuk birimi, dış ortak verileri etkilenmişse sözleşmesel bildirim sürelerinin başlayabileceğini söylüyor.', 'SOC, şüpheli IP’nin daha önce bir phishing kampanyasıyla ilişkilendirildiğini paylaşıyor.'],
          ['The research security office warns that the folders may contain sequence-design notes subject to export-control review.', 'Legal says contractual notification clocks may start if partner data was touched.', 'The SOC shares that the suspicious IP has previously been tied to a phishing campaign.']
        ],
        options: [
          ['IT/SOC, araştırma güvenliği, ilgili yönetici ve gerekiyorsa hukuk/uyum ekibini hedefli biçimde devreye al; kısa durum özeti dağıt.', 'Activate IT/SOC, research security, the relevant manager, and legal/compliance as needed through a targeted escalation chain; distribute a short brief.'],
          ['Önce gayriresmî olarak tanıdık birkaç kişiye danış; resmi süreci netleşince başlat.', 'First check informally with a few familiar people; launch the formal process once things are clearer.'],
          ['Tüm personele hemen geniş bir “saldırı oldu” duyurusu geç.', 'Send an immediate institution-wide “we were attacked” announcement to all staff.']
        ],
        choices: [
          choice('positive', '🏅 Eskalasyon bonusu', '🏅 Escalation bonus', 'Profesyonel yaklaşım. Doğru kişiler zamanında bilgilendirildi, rol netliği oluştu ve spekülasyon yerine kontrollü koordinasyon başladı.', 'Professional approach. The right people were informed on time, roles became clearer, and controlled coordination replaced speculation.', { score: 22, speed: 10, evidence: 4, coordination: 20, risk: 10 }, 'Chain Commander', 'evidence'),
          choice('negative', '😢 Koordinasyon kaybı', '😢 Coordination loss', 'Gayriresmî trafik hesap verebilirliği zayıflatır. Zaman kaybedilir, farklı sürümler oluşur ve olay yönetimi parçalanır.', 'Informal traffic weakens accountability. Time is lost, multiple versions emerge, and incident management fragments.', { score: -10, speed: 0, evidence: 0, coordination: -18, risk: -8 }, 'Loose Comms', 'evidence'),
          choice('negative', '😢 Erken panik etkisi', '😢 Early panic effect', 'Hedefsiz geniş duyuru gereksiz panik, telefon trafiği ve yanlış bildirimler üretir; analitik ekiplerin odağı dağılır.', 'A broad, untargeted announcement creates unnecessary panic, call traffic, and false reports; analytic teams lose focus.', { score: -6, speed: 4, evidence: 0, coordination: -8, risk: -4 }, 'Noise Burst', 'evidence')
        ]
      }),
      evidence: stage({
        alert: ['Forensik pencere daralıyor; erişilen dosyaların gerçekten açılıp dışa aktarıldığı doğrulanmalı.', 'The forensic window is narrowing; you must confirm whether touched files were actually opened and exported.'],
        title: ['Aşama 3 — Zaman Çizelgesi, Delil Zinciri ve Etki Analizi', 'Stage 3 — Timeline, Chain of Custody, and Impact Analysis'],
        text: ['Şimdi soru “erişim olmuş mu”dan “hangi veri, ne kadar süreyle, hangi kullanıcı bağlamında etkilenmiş” noktasına geldi. VPN, IdP, dosya sunucusu ve uç nokta kayıtlarının birlikte okunması gerekiyor. Aynı anda hizmet sürekliliği baskısı da artıyor; laboratuvar ekibi sabah deneyleri için dosyalara erişmek istiyor.', 'The question has now moved from “was there access?” to “which data was affected, for how long, and under what user context?” VPN, IdP, file-server, and endpoint records must be read together. At the same time, service continuity pressure is increasing; the lab team wants the files back for morning experiments.'],
        setting: ['Adli kopya alma için iki saatlik bakım penceresi var. Kullanıcının dizüstü bilgisayarı kampüse ulaştı ama henüz dokunulmadı.', 'There is a two-hour maintenance window for forensic capture. The user’s laptop has reached campus but has not yet been touched.'],
        current: ['Kapsamın doğru sınıflandırılması; dış bildirim, parola sıfırlama dalgası ve toparlanma planını doğrudan etkileyecek.', 'Correctly classifying scope will directly affect external notifications, password reset strategy, and the recovery plan.'],
        changedByTone: {
          positive: ['Önceki aşamada koordinasyon iyi kurulduğu için veri sahipleri ve log kaynaklarına erişiminiz daha düzenli. Bu, chain-of-custody disiplinini korumanızı kolaylaştırıyor.', 'Because the previous stage was well coordinated, access to data owners and log sources is more orderly. That makes chain-of-custody easier to maintain.'],
          negative: ['Önceki aşamadaki karışıklık yüzünden bazı log talepleri gecikti ve birkaç ekip farklı önceliklerle çalışıyor. Delil penceresi daha kırılgan hâlde.', 'Because of earlier confusion, some log requests were delayed and several teams are working at cross-purposes. The evidence window is now more fragile.']
        },
        developments: [
          ['Dosya sunucusu logları, üç klasörde toplu listeleme + iki arşiv dosyasında açma girişimi gösteriyor.', 'Uç noktada geçici sıkıştırma klasörü izleri var ama dosya boyutları henüz net değil.', 'DLP, kampüs dışına küçük hacimli ancak şifreli bir HTTPS aktarımı kaydetmiş; içerik görünmüyor fakat zaman damgası olay penceresiyle uyumlu.'],
          ['File-server logs show mass listing in three folders plus file-open attempts on two archives.', 'The endpoint shows traces of a temporary compression folder, though file sizes are still unclear.', 'The DLP platform recorded a small but encrypted HTTPS transfer leaving campus.']
        ],
        options: [
          ['Uç nokta ve sunucu loglarını kontrollü topla, adli kopya al, zaman çizelgesi kur ve chain-of-custody uygula.', 'Collect endpoint and server logs in a controlled way, acquire forensic images, build a timeline, and apply chain of custody.'],
          ['Sistemi hemen tamamen kapat; detaylı inceleme sonra yapılır.', 'Shut the system down immediately; detailed analysis can come later.'],
          ['Önce hizmeti hızla geri ver; delil toplama işini öğleden sonraya bırak.', 'Restore service quickly first; leave evidence collection until the afternoon.']
        ],
        choices: [
          choice('positive', '🧠 Forensik bonus', '🧠 Forensic bonus', 'Mükemmel seçim. Delil bütünlüğü korunurken kapsam ve kök neden analizi için savunulabilir bir temel kuruldu.', 'Excellent choice. Evidence integrity was preserved while a defensible basis for scope and root-cause analysis was built.', { score: 26, speed: 4, evidence: 22, coordination: 6, risk: 10 }, 'Forensic Guardian', 'decision'),
          choice('negative', '😢 Uçucu veri kaybı', '😢 Volatile data loss', 'Plansız kapatma bellek, aktif süreç ve ağ bağlamı bilgisini yok edebilir. İnceleme daha zor, sınıflandırma daha tartışmalı hâle gelir.', 'An unplanned shutdown can destroy memory, active process, and network-context evidence. Investigation becomes harder and classification more debatable.', { score: -16, speed: 0, evidence: -20, coordination: 0, risk: -6 }, 'Cold Shutdown', 'decision'),
          choice('negative', '😢 Kritik analitik kayıp', '😢 Critical analytical loss', 'Hizmet baskısı anlaşılır ama delil toplanmadan normalleşmek, olayın gerçek etkisini uzun süre karanlıkta bırakır.', 'Service pressure is understandable, but normalizing before evidence is collected leaves the true impact unclear for much longer.', { score: -24, speed: -10, evidence: -24, coordination: -5, risk: -12 }, 'Missed Evidence', 'decision')
        ]
      }),
      decision: stage({
        alert: ['Yönetim; olay sınıflandırması, dış bildirim ihtiyacı ve toparlanma planı bekliyor.', 'Leadership expects incident classification, a decision on external notification, and a recovery plan.'],
        title: ['Aşama 4 — Sınıflandırma, Toparlanma ve Kurumsal Öğrenme', 'Stage 4 — Classification, Recovery, and Institutional Learning'],
        text: ['İlk döngü tamamlandı. Şimdi olayın “credential compromise + restricted data exposure attempt” olarak mı sınıflandırılacağı, hangi düzeltici aksiyonların uygulanacağı ve ortak kurumlara bildirim gerekip gerekmediği kararlaştırılmalı. Teknik kapatma yeterli değil; tekrar riskini azaltan yönetişim kararları da bekleniyor.', 'The first response cycle is complete. You must now decide whether to classify the event as “credential compromise + attempted exposure of restricted data,” what corrective actions to implement, and whether partner notification is required. Technical closure is not enough; governance decisions that reduce recurrence risk are also expected.'],
        setting: ['Saat 11:30. Yönetim kuruluna çıkacak tek sayfalık özet hazırlanıyor. Araştırmacı ekibi ne zaman güvenli biçimde çalışmaya dönebileceğini soruyor.', 'It is 11:30. A one-page board brief is being prepared. The research team is asking when they can safely return to work.'],
        current: ['Sınıflandırma kararı; iletişim, parola/makine yenilemesi, ortak bildirimleri ve eğitim planını belirleyecek.', 'The classification decision will determine communications, credential/device reset actions, partner notices, and the training plan.'],
        changedByTone: {
          positive: ['Önceki aşamadaki disiplin sayesinde artık savunulabilir bir etki değerlendirmesi yapabiliyorsunuz. Bu, hem teknik hem yönetsel kapanışı güçlendiriyor.', 'Because the previous stage was handled with discipline, you can now make a defensible impact assessment. That strengthens both technical and managerial closure.'],
          negative: ['Önceki eksikler nedeniyle hâlâ belirsizlikler var. Kapanış kararı verirken temkin ve ek düzeltici kontroller daha önemli hâle geldi.', 'Because of earlier gaps, important uncertainties remain. Caution and additional corrective controls now matter even more in the closure decision.']
        },
        developments: [
          ['Kök neden büyük olasılıkla MFA yorgunluğu + oltalama ile başlayan hesap ele geçirme zinciri.', 'Kısıtlı klasörlerde tam dosya indirme doğrulanmamış olsa da meta veri maruziyeti, dosya görüntüleme ve kısmi staging riski mevcut.', 'Kimlik sağlayıcı ayarlarında şartlı erişim boşluğu saptandı.'],
          ['The likely root cause is a credential-compromise chain that began with phishing plus MFA fatigue.', 'Full download of restricted files does not appear complete, but metadata exposure and file-view risk remain.', 'A conditional-access gap has been identified in the identity provider.']
        ],
        options: [
          ['Olayı sınıflandır, etki alanını yazılılaştır, parola/cihaz/erişim düzeltmelerini başlat, gerekli debrief ve partner bildirim sürecini işlet.', 'Classify the incident, document impact scope, start credential/device/access corrections, and run the required debrief and partner-notification workflow.'],
          ['Sistemi normale döndür ve konuyu hızlıca kapat; fazla görünürlük yaratma.', 'Return systems to normal and close the matter quickly; avoid making it too visible.'],
          ['Kanıtlar tam netleşmeden bireysel suçlu belirle ve olayı kişiselleştir.', 'Name an individual culprit before the evidence is fully settled and personalize the incident.']
        ],
        choices: [
          choice('positive', '🌟 Mastery bonusu', '🌟 Mastery bonus', 'Olgun kapanış. Müdahale teknik containment’in ötesine geçerek sınıflandırma, düzeltici aksiyon ve kurumsal öğrenme ile tamamlandı.', 'Mature closure. The response went beyond technical containment and was completed with classification, corrective action, and institutional learning.', { score: 30, speed: 10, evidence: 6, coordination: 16, risk: 20 }, 'Response Strategist', 'end'),
          choice('negative', '😢 Tekrar riski', '😢 Recurrence risk', 'Yüzeysel kapanış görünür sakinlik sağlar ama aynı zafiyetleri yerinde bırakır ve sonradan daha zor sorular doğurur.', 'A superficial closure may create visible calm, but it leaves the same weaknesses in place and leads to harder questions later.', { score: -18, speed: 4, evidence: -6, coordination: -10, risk: -18 }, 'Shallow Recovery', 'end'),
          choice('negative', '😢 Etik ve operasyonel hata', '😢 Ethical and operational failure', 'Erken suçlama sistem odaklı analizi bozar, iş birliğini zedeler ve kurumsal güveni düşürür.', 'Premature blame damages system-focused analysis, undermines collaboration, and reduces institutional trust.', { score: -16, speed: 0, evidence: -8, coordination: -18, risk: -10 }, 'Blame Trap', 'end')
        ]
      })
    }
  },
  {
    id: 'usb-transfer',
    accent: 'purple',
    name: { tr: 'Yetkisiz USB / Veri Transferi', en: 'Unauthorized USB / Data Transfer' },
    summary: {
      tr: 'Kısıtlı deney ve tedarik dosyalarıyla çalışan bir istasyonda USB aygıt kullanımı, offline veri çıkarımı ve veri yönetişimi ihlali şüphesi.',
      en: 'USB use on a workstation handling restricted experiment and procurement files, with suspected offline data removal and data-governance issues.'
    },
    nodes: buildUsbNodes()
  },
  {
    id: 'partner-email',
    accent: 'blue',
    name: { tr: 'Şüpheli İş Birliği Talebi', en: 'Suspicious Collaboration Request' },
    summary: {
      tr: 'Dış partner gibi görünen bir aktörden SOP dışı veri talebi; kimlik doğrulama, partner due diligence ve güvenli sonuçlandırma gerektiriyor.',
      en: 'An out-of-SOP data request from what appears to be an external partner, requiring identity verification, due diligence, and safe resolution.'
    },
    nodes: buildPartnerNodes()
  },
  {
    id: 'lab-device',
    accent: 'pink',
    name: { tr: 'Laboratuvar Cihazı Anomalisi', en: 'Laboratory Device Anomaly' },
    summary: {
      tr: 'Ağa bağlı laboratuvar cihazında beklenmeyen dış trafik, olası üretici uzaktan erişimi ve operasyon-güvenlik çatışması.',
      en: 'Unexpected outbound traffic from a networked lab device, possible vendor remote access, and an operations-security conflict.'
    },
    nodes: buildDeviceNodes()
  },
  {
    id: 'insider-sharing',
    accent: 'teal',
    name: { tr: 'İç Kaynaklı SOP Dışı Paylaşım', en: 'Internal Out-of-SOP Sharing' },
    summary: {
      tr: 'İyi niyetle başlamış görünen fakat SOP dışına çıkan veri/paylaşım davranışı; adil, sistem odaklı ve öğrenmeye açık bir yanıt gerektiriyor.',
      en: 'An apparently well-intentioned but out-of-SOP sharing behavior that demands a fair, system-focused, learning-oriented response.'
    },
    nodes: buildInsiderNodes()
  }
];

function choice(tone, trBonus, enBonus, trFeedback, enFeedback, effects, badge, next) {
  return { tone, bonus: { tr: trBonus, en: enBonus }, feedback: { tr: trFeedback, en: enFeedback }, effects, badge: { tr: badge, en: badge }, next };
}

function stage(config) {
  return {
    alert: { tr: config.alert[0], en: config.alert[1] },
    title: { tr: config.title[0], en: config.title[1] },
    text: { tr: config.text[0], en: config.text[1] },
    setting: { tr: config.setting[0], en: config.setting[1] },
    current: { tr: config.current[0], en: config.current[1] },
    changed: config.changed ? { tr: config.changed[0], en: config.changed[1] } : null,
    changedByTone: config.changedByTone ? {
      positive: { tr: config.changedByTone.positive[0], en: config.changedByTone.positive[1] },
      negative: { tr: config.changedByTone.negative[0], en: config.changedByTone.negative[1] }
    } : null,
    developments: { tr: config.developments[0], en: config.developments[1] },
    options: { tr: config.options.map((item) => item[0]), en: config.options.map((item) => item[1]) },
    choices: config.choices.map((item, idx) => ({ ...item, text: { tr: config.options[idx][0], en: config.options[idx][1] } }))
  };
}

function buildUsbNodes() {
  return {
    start: stage({
      alert: ['Kısıtlı çalışma istasyonunda yeni USB seri numarası görüldü.', 'A new USB serial number was observed on a restricted workstation.'],
      title: ['Aşama 1 — İlk Kontrol, İstasyon İzolasyonu ve Transfer Şüphesi', 'Stage 1 — Initial Control, Workstation Isolation, and Transfer Suspicion'],
      text: ['Biyosentez sipariş kayıtları, deney sonuç özetleri ve tedarik dokümantasyonu tutulan bir istasyonda, beyaz listede olmayan taşınabilir medya sabah 06:52’de takılıp çıkarılmış görünüyor. Kullanıcı, “sunum kopyası almak için” kısa süre cihaz bağladığını söylüyor; ancak aynı dakikalarda kısıtlı klasörlerde ardışık dosya açma ve arşiv oluşturma izleri var. Offline veri çıkarımı ihtimali nedeniyle ilk saat kritik.', 'On a workstation storing biosynthesis order records and experiment result summaries, a non-whitelisted portable device appears to have been inserted and removed at 06:52. The user says it was connected briefly “to grab a presentation copy,” but the same minute includes sequential file opens and archive-creation traces in restricted folders. Because offline data removal is possible, the first hour is critical.'],
      setting: ['Yer: ortak laboratuvar ofisi. Sabah vardiyası yeni başlıyor; cihaz gün içinde üç farklı kişi tarafından kullanılıyor.', 'Setting: a shared lab office. The morning shift is starting, and the workstation is used by three different people during the day.'],
      current: ['USB cihaz kurumda değil; kullanıcı yanında götürmüş olabilir. İstasyonda oturum hâlâ açık.', 'The USB device is not on site; the user may have taken it. The workstation session is still active.'],
      changed: ['İlk aşama: önceki karar etkisi yok.', 'First stage: no previous-choice effect.'],
      developments: [
        ['EDR, geçici bir ZIP dosyasının oluşturulup silindiğini gösteriyor.', 'Dosya erişim loglarında sunum klasörü dışında kısıtlı alt klasörlere de dokunulmuş.', 'USB aygıtın daha önce bu ağa ya da aynı OU altındaki istasyonlara hiç bağlanmadığı doğrulandı.'],
        ['The EDR shows that a temporary ZIP file was created and then deleted.', 'File-access logs show that restricted subfolders were touched, not just the presentation directory.', 'The USB device has never been seen on this network before.']
      ],
      options: [
        ['İstasyonu kontrollü sınırla, cihaz kayıtlarını ve erişim izlerini koru, ilk olay kaydını aç.', 'Restrict the workstation in a controlled way, preserve device and access records, and open the initial incident record.'],
        ['Kullanıcıyı sözlü uyar ve USB’yi geri getirmesini bekle; resmi kayıt açma.', 'Warn the user verbally and wait for the USB to be returned; do not open a formal record.'],
        ['Muhtemelen önemsiz diyerek konuyu kapat.', 'Dismiss it as probably insignificant.']
      ],
      choices: [
        choice('positive', '🔒 Access control bonusu', '🔒 Access control bonus', 'Doğru yaklaşım. Hem transfer riski hem delil kaybı erkenden kontrol altına alındı.', 'Correct approach. Both transfer risk and evidence loss were controlled early.', { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, 'Access Sentinel', 'comms'),
        choice('negative', '😢 Yetersiz kontrol', '😢 Insufficient control', 'Sözlü uyarı tek başına yetmez; kurumsal izlenebilirlik ve kapsam analizi zayıflar.', 'A verbal warning alone is not enough; institutional traceability and scope analysis weaken.', { score: -8, speed: 2, evidence: -10, coordination: -4, risk: -8 }, 'Soft Control', 'comms'),
        choice('negative', '😢 Risk küçümsemesi', '😢 Risk minimization', 'Bu tür fiziksel veri çıkışları küçük görünse de yüksek etkili olabilir. Küçümseme pahalıya mal olur.', 'These physical data-removal events may look small but can have high impact. Minimizing them is costly.', { score: -22, speed: -12, evidence: -10, coordination: -8, risk: -20 }, 'Dismissal Risk', 'comms')
      ]
    }),
    comms: stage({
      alert: ['Veri yönetişimi ve laboratuvar liderliği devreye girmeli.', 'Data-governance and lab leadership should be engaged.'],
      title: ['Aşama 2 — Paydaşların Devreye Alınması ve Kapsam Çerçevesi', 'Stage 2 — Stakeholder Engagement and Scope Framing'],
      text: ['Olay artık sadece bir USB kullanımı meselesi değil. İçerikte kısıtlı veri, olası fikri hak, ortak proje yükümlülükleri ve laboratuvar iş akışı etkisi olabilir. Hem teknik hem yönetsel görünürlük kurulmalı.', 'The incident is no longer just about a USB insertion. The content may involve restricted data, potential IP issues, partner obligations, and lab workflow impact. Both technical and managerial visibility are required.'],
      setting: ['PI, laboratuvar müdürü ve veri yönetişimi sorumlusu farklı öncelikler taşıyor: deneyler, mevzuat, ortaklıklar.', 'The PI, lab director, and data-governance lead have different priorities: experiments, compliance, and partnerships.'],
      current: ['Henüz hangi dosyaların gerçekten harici ortama yazıldığını gösteren tek, savunulabilir bir kapsam listesi yok.', 'No one yet has a single clean list showing which files were actually copied.'],
      changedByTone: {
        positive: ['İlk kayıt düzgün tutulduğu için paydaşları aynı gerçeklik zemini üzerinde toplamak daha kolay.', 'Because the initial record is solid, it is easier to align stakeholders around the same facts.'],
        negative: ['İlk aşamadaki gevşeklik nedeniyle herkes farklı hikâye duydu; şimdi önce bilgi kirliliğini azaltmanız gerekiyor.', 'Because the first stage was loose, everyone heard a different story; you now need to reduce information noise first.']
      },
      developments: [
        ['Bir dış sanayi ortağıyla paylaşılan deney setlerinden bazılarının aynı istasyonda tutulduğu anlaşıldı.', 'USB kullanım politikası laboratuvar içinde biliniyor ama istisna talepleri sık yapılmış.', 'Güvenlik ekibi, cihazı kullanan kişi dışında başka oturum izleri de buldu.'],
        ['Some datasets shared with an external industry partner are stored on the same workstation.', 'The USB policy is known in the lab, but exceptions have frequently been requested.', 'The security team found traces suggesting more than one user may have interacted with the workstation.']
      ],
      options: [
        ['IT, araştırma güvenliği, veri yönetişimi ve ilgili yöneticileri ortak response akışında birleştir.', 'Bring IT, research security, data governance, and the relevant managers into one shared response flow.'],
        ['Sadece teknik ekip ilgilensin; yönetişim boyutunu sonra düşün.', 'Let only the technical team handle it; deal with governance later.'],
        ['Durumu laboratuvar içinde tut; üst yönetime çıkmasın.', 'Keep the matter inside the lab and do not escalate upward.']
      ],
      choices: [
        choice('positive', '🤝 Multi-team bonusu', '🤝 Multi-team bonus', 'Çok iyi. Olayın disiplinler arası niteliği tanındı ve doğru paydaş seti kuruldu.', 'Very good. The interdisciplinary nature of the incident was recognized and the right stakeholder set was activated.', { score: 20, speed: 8, evidence: 6, coordination: 20, risk: 10 }, 'Bridge Builder', 'evidence'),
        choice('negative', '😢 Governance gap', '😢 Governance gap', 'Teknik yaklaşım tek başına yetmez; politik ve kurumsal sorumluluk boyutu boşta kalır.', 'A technical approach alone is not enough; policy and institutional accountability are left uncovered.', { score: -10, speed: 0, evidence: 0, coordination: -14, risk: -10 }, 'Governance Gap', 'evidence'),
        choice('negative', '😢 Silo response', '😢 Silo response', 'Dar çevrede kalmak kurumsal kapasiteyi ve olayı öğrenme fırsatını sınırlar.', 'Keeping the matter siloed limits institutional capacity and the opportunity to learn from the incident.', { score: -12, speed: 0, evidence: -2, coordination: -16, risk: -8 }, 'Silo Response', 'evidence')
      ]
    }),
    evidence: stage({
      alert: ['Transfer yolunun rekonstrüksiyonu gerekiyor.', 'Transfer-path reconstruction is required.'],
      title: ['Aşama 3 — Transfer Kapsamı, Kanal Rekonstrüksiyonu ve Etki', 'Stage 3 — Transfer Scope, Channel Reconstruction, and Impact'],
      text: ['Şimdi yapılması gereken, “USB takıldı” bilgisini gerçeğe dönüştürmek: hangi dosyalar açıldı, hangileri arşivlendi, kopya gerçekten harici ortama yazıldı mı, başka kanal kullanıldı mı? Basit erişim listesi yetmez; cihaz, kullanıcı, zaman ve içerik korelasyonu kurulmalı.', 'The task now is to turn “a USB was connected” into defensible fact: which files were opened, which were archived, was data actually written to removable media, and was another channel used? A simple access list is not enough; you need device, user, time, and content correlation.'],
      setting: ['Günün ilerleyen saatlerinde aynı istasyon tekrar kullanılmak isteniyor. Ekip zaman baskısı altında.', 'Later in the day the workstation is needed again. The team is under time pressure.'],
      current: ['Yanlış kapsam analizi, gereksiz bildirim veya eksik containment ile sonuçlanabilir.', 'Poor scope analysis may lead either to unnecessary notification or to incomplete containment.'],
      changedByTone: {
        positive: ['Paydaşlar hizalı olduğu için log, kullanıcı ve veri sahibi bilgilerini daha rahat eşleştirebiliyorsunuz.', 'Because stakeholders are aligned, you can more easily correlate logs, user details, and data-owner information.'],
        negative: ['Önceki aşamadaki boşluklar nedeniyle kim hangi veriye sahip net değil; rekonstrüksiyon daha zorlaştı.', 'Because of earlier gaps, ownership of the data is less clear; reconstruction is now harder.']
      },
      developments: [
        ['USB artefaktları, iki klasörden gerçek kopyalama hacmi ve bir klasörde yalnızca önizleme/thumbnail etkinliği olduğunu düşündürüyor.', 'Arşiv dosyasının adı dış kuruma giden bir toplantı başlığıyla benzerlik taşıyor.', 'Sistem, aynı sabah kısa süreli bulut senkronizasyon denemesi de kaydetmiş.'],
        ['USB artifacts suggest full copying from two folders and preview-only activity in one.', 'The archive filename resembles the title of a meeting with an external organization.', 'The system also recorded a brief cloud-sync attempt the same morning.']
      ],
      options: [
        ['Cihaz kayıtları, dosya erişim logları ve zaman çizelgesini eşleştir; transfer kapsamını rekonstrükte et.', 'Correlate device records, file-access logs, and the timeline; reconstruct transfer scope.'],
        ['Önce kimin yaptığını bul; teknik iz sonra gelir.', 'Figure out who did it first; technical traces can come later.'],
        ['Sadece temel erişim listesine bak; detaylı analiz gereksiz.', 'Check only the basic access list; detailed analysis is unnecessary.']
      ],
      choices: [
        choice('positive', '📊 Reconstruction bonusu', '📊 Reconstruction bonus', 'Mükemmel. Olayın kapsamı ve etkilenmiş veri kümeleri savunulabilir biçimde görünür oldu.', 'Excellent. The incident scope and affected data groups became defensible and visible.', { score: 25, speed: 4, evidence: 20, coordination: 4, risk: 10 }, 'Trail Mapper', 'decision'),
        choice('negative', '😢 Öncelik hatası', '😢 Priority failure', 'Kişi arayışı, kapsam analizinin önüne geçince kararlar kolayca önyargılı hale gelir.', 'Once blame-seeking overtakes scope analysis, decisions become easily biased.', { score: -14, speed: 0, evidence: -16, coordination: -6, risk: -8 }, 'Premature Blame', 'decision'),
        choice('negative', '😢 Eksik görünürlük', '😢 Limited visibility', 'Parçalı veriyle karar vermek ya fazla dar ya da fazla geniş response üretir.', 'Deciding on fragmented data leads either to too narrow or too broad a response.', { score: -10, speed: 2, evidence: -12, coordination: 0, risk: -8 }, 'Thin Review', 'decision')
      ]
    }),
    decision: stage({
      alert: ['Yönetim önleyici aksiyonlar ve politika iyileştirmesi bekliyor.', 'Leadership expects preventive actions and policy improvement.'],
      title: ['Aşama 4 — Önleme, Politika ve Kurumsal Güçlendirme', 'Stage 4 — Prevention, Policy, and Institutional Strengthening'],
      text: ['Olayın teknik bölümü anlaşılmaya başladı. Şimdi tekrar riskini azaltacak yapısal adımlar seçilmeli: USB kontrolü, istisna süreçleri, eğitim, denetim ve gerekiyorsa ortak bildirimleri. Güçlü kapanış, sadece uyarı vermekten ibaret olmamalı.', 'The technical part of the incident is now better understood. You must choose structural steps that reduce recurrence risk: removable-media control, exception handling, training, auditing, and partner notices if needed. A strong closure cannot stop at a verbal warning.'],
      setting: ['Laboratuvar ekibi işlerin yavaşlamasından endişeli; yönetim ise aynı olayın tekrarını istemiyor.', 'The lab team worries about slowing down work; leadership does not want a repeat.'],
      current: ['Kararınız, güvenlik ile bilimsel iş akışı arasında nasıl denge kurulacağını gösterecek.', 'Your decision will show how the institution balances security with scientific workflow.'],
      changedByTone: {
        positive: ['Önceki analiz güçlü olduğu için hedefli önlem tasarlayabiliyorsunuz; bu, gereksiz kısıtlamaları önler.', 'Because earlier analysis was strong, you can design targeted controls and avoid unnecessary restrictions.'],
        negative: ['Kapsam tam net olmadığı için kapanışta daha geniş ama daha pahalı kontroller düşünmeniz gerekebilir.', 'Because scope is still uncertain, closure may require broader and more expensive controls.']
      },
      developments: [
        ['USB istisna taleplerinin yazılı onay süreci olmadığı anlaşıldı.', 'Bazı kullanıcılar dosya paylaşım için kişisel depolama yöntemlerine yönelmiş.', 'Dış ortak sözleşmesinde veri dışa taşıma kayıt zorunluluğu var.'],
        ['It turns out there is no written approval path for USB exceptions.', 'Some users have drifted toward personal storage methods for file sharing.', 'The external partner contract requires recordkeeping for data movement events.']
      ],
      options: [
        ['Politikayı güncelle, USB kısıtlarını iyileştir, istisna sürecini yazılılaştır, eğitim ve denetim planı oluştur.', 'Update policy, improve USB restrictions, formalize the exception process, and create training and audit plans.'],
        ['Sadece sözlü uyarı ile yetin.', 'Settle for a verbal warning only.'],
        ['Olay kapandı; ek aksiyon alma.', 'The incident is over; take no further action.']
      ],
      choices: [
        choice('positive', '🏆 Prevention bonusu', '🏆 Prevention bonus', 'Güçlü kapanış. Müdahale sürdürülebilir önleme ve kurumsal dayanıklılığa çevrildi.', 'Strong closure. The intervention was turned into sustainable prevention and institutional resilience.', { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, 'Prevention Architect', 'end'),
        choice('negative', '😢 Zayıf kapanış', '😢 Weak closure', 'Sözlü uyarı kısa vadede rahatlatır ama davranış ve süreç değişikliğini garanti etmez.', 'A verbal warning may create short-term relief but does not guarantee behavioral or process change.', { score: -12, speed: 2, evidence: 0, coordination: -8, risk: -12 }, 'Verbal Fix', 'end'),
        choice('negative', '😢 Tekrar riski', '😢 Recurrence risk', 'Düzeltici aksiyon olmadan aynı açık yeniden üretilebilir.', 'Without corrective action, the same weakness can easily recur.', { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, 'No Lessons', 'end')
      ]
    })
  };
}

function buildPartnerNodes() { /* simplified but rich */
  return {
    start: stage({
      alert: ['Dış partner talebi doğrulama incelemesine işaretlendi.', 'External partner request flagged for authenticity review.'],
      title: ['Aşama 1 — Talebi Durdur, Kimliği Doğrula, Kayıt Aç', 'Stage 1 — Hold the Request, Verify Identity, Open a Record'],
      text: ['Uzun süredir birlikte çalışılan bir Avrupa laboratuvarından geliyormuş gibi görünen e-postada, SOP dışı olarak ham dizileme verisi, tedarikçi listesi ve örnek sevkiyat planı isteniyor. Mesaj dili profesyonel; ancak gönderici alanı benzer görünümlü yeni bir alan adı kullanıyor ve talep mevcut proje takvimine uymuyor.', 'An email appearing to come from a long-term European partner requests raw sequencing data, supplier lists, and sample-shipment plans outside SOP. The wording is professional, but the sender uses a look-alike domain and the request does not match the current project timeline.'],
      setting: ['Talep cuma akşamı geldi. PI seyahatte; proje koordinatörü hızlı cevap verilmesini istiyor.', 'The request arrived on a Friday evening. The PI is traveling, and the project coordinator wants a quick reply.'],
      current: ['Kimlik, yetki ve iş ihtiyacı doğrulanmadan paylaşım yapılması ciddi bir research security hatası olabilir.', 'Sharing before identity, authority, and business need are verified could be a major research-security failure.'],
      changed: ['İlk aşama: önceki karar etkisi yok.', 'First stage: no previous-choice effect.'],
      developments: [[ 'E-posta zincirindeki son mesaj mevcut iş akışındaki alışılmış imza şablonundan sapıyor.', 'Talep edilen veri, yürürlükteki ortaklık anlaşmasındaki rutin paylaşım matrisinde yer almıyor.', 'Mesaj, “çok acil” diyerek mesai dışı baskı kuruyor.' ], [ 'The last message in the thread deviates from the partner’s usual signature pattern.', 'The requested data is not on the routine sharing list in the collaboration agreement.', 'The message creates after-hours pressure by labeling the request “urgent.”' ]],
      options: [[ 'Talebi geçici olarak durdur, bağımsız kanal üzerinden doğrulama başlat ve ön değerlendirme kaydı aç.', 'Temporarily hold the request, start verification through an independent channel, and open a preliminary assessment record.' ], [ 'İlişkiyi zedelememek için talebi hızlıca karşıla.', 'Fulfill the request quickly to avoid harming the relationship.' ], [ 'Talebi yanıtsız bırak ve sönmesini bekle.', 'Leave the request unanswered and hope it fades away.' ]],
      choices: [
        choice('positive','✅ Verification bonusu','✅ Verification bonus','Çok iyi. “Trust but verify” refleksi kurumsal olarak doğru çalıştı.','Excellent. The institutional “trust but verify” reflex worked correctly.',{ score:24, speed:10, evidence:10, coordination:10, risk:16 },'Verifier','comms'),
        choice('negative','😢 Sosyal mühendislik riski','😢 Social engineering risk','İlişkiyi koruma kaygısı anlaşılır ama doğrulama olmadan paylaşım kritik zafiyettir.','Protecting the relationship is understandable, but sharing without verification is a critical weakness.',{ score:-20, speed:6, evidence:-8, coordination:-4, risk:-20 },'Trust Trap','comms'),
        choice('negative','😢 Pasif risk','😢 Passive risk','Pasiflik güvenli yönetim değildir; şüpheli talepler belgelenmeli ve değerlendirilmelidir.','Passivity is not secure management; suspicious requests must be documented and assessed.',{ score:-8, speed:-6, evidence:-2, coordination:-6, risk:-8 },'Silent Drift','comms')
      ]
    }),
    comms: stage({
      alert: ['Partner due diligence iş akışı öneriliyor.', 'Partner due diligence workflow recommended.'],
      title: ['Aşama 2 — Due Diligence Çerçevesi ve Yetki Kontrolü', 'Stage 2 — Due Diligence Framework and Authority Check'],
      text: ['Talep artık sadece teknik bir e-posta incelemesi değil. Kim onay verebilir, hangi veri hangi koşulla paylaşılabilir, sözleşme ne diyor, araştırma güvenliği açısından kırmızı çizgiler neler — hepsi birlikte ele alınmalı.', 'The request is no longer just a technical email review. Who may authorize it, what data may be shared under which conditions, what the contract says, and where the research-security red lines are all need to be considered together.'],
      setting: ['PI’ye ulaşmak gecikiyor. Hukuk birimi sınırlı mesai desteği veriyor. Ortak laboratuvar “bugün dönüş” bekliyor.', 'The PI is slow to reach. Legal support is limited after hours. The partner lab expects a reply today.'],
      current: ['Tek aktörlü karar verme burada hem güvenlik hem hesap verebilirlik açısından riskli.', 'Single-actor decision-making is risky here both for security and accountability.'],
      changedByTone: { positive: ['İlk durdurma kararı sayesinde zaman kazandınız; şimdi daha temiz due diligence yürütebilirsiniz.', 'Because you held the request early, you have bought time for cleaner due diligence.'], negative: ['Önceki zayıf karar nedeniyle şimdi hem ilişki baskısı hem güvenlik baskısı aynı anda arttı.', 'Because of the weak prior decision, relationship pressure and security pressure have both increased.'] },
      developments: [[ 'Araştırma güvenliği ofisi, alıcı kurumun bir alt yükleniciyi daha önce bildirmediğini fark ediyor.', 'Sözleşmede ham veri paylaşımı için PI + veri sahibi çift onayı isteniyor.', 'İstenen dosya tiplerinden biri ihracat kontrolü incelemesi gerektirebilir.' ], [ 'The research security office notices that the recipient institution previously failed to disclose a subcontractor.', 'The contract requires dual approval from the PI and data owner for raw data sharing.', 'One requested file type may require export-control review.' ]],
      options: [[ 'Araştırma güvenliği, PI, hukuk/uyum ve doğrulama kanallarını birlikte devreye al.', 'Engage research security, the PI, legal/compliance, and the verification channels together.' ], [ 'Kararı sadece PI versin.', 'Let the PI decide alone.' ], [ 'Kararı ertele; tekrar yazarlarsa bakarsın.', 'Delay the decision; deal with it if they write again.' ]],
      choices: [ choice('positive','🤝 Due diligence bonusu','🤝 Due diligence bonus','Güçlü kurumsal çerçeve kuruldu. Yetki, mevzuat ve güvenlik boyutu birlikte ele alındı.','A strong institutional framework was established. Authority, compliance, and security were handled together.',{ score:22, speed:8, evidence:4, coordination:18, risk:10 },'Due Diligence Lead','evidence'), choice('negative','😢 Tekil karar riski','😢 Single-actor decision risk','Bu tür kararları tek kişiye bırakmak kurumsal görünürlüğü ve hesabı zayıflatır.','Leaving this type of decision to one person weakens institutional visibility and accountability.',{ score:-12, speed:0, evidence:0, coordination:-16, risk:-10 },'Solo Governance','evidence'), choice('negative','😢 Belirsizlik maliyeti','😢 Cost of ambiguity','Belirsizliği ertelemek hem güvenlik hem iş birliği güvenilirliği için maliyetlidir.','Delaying ambiguity is costly for both security and collaboration credibility.',{ score:-8, speed:-8, evidence:0, coordination:-8, risk:-8 },'Delayed Clarity','evidence') ]
    }),
    evidence: stage({
      alert: ['Header, metadata ve bağlamsal doğrulama sonucu belirleyecek.', 'Headers, metadata, and contextual verification will determine the outcome.'],
      title: ['Aşama 3 — Kimlik, Teknik İz ve Bağlam Doğrulaması', 'Stage 3 — Identity, Technical Trace, and Context Verification'],
      text: ['Burada iyi bir response, teknik kanıt ile ilişki bağlamını birlikte okur: e-posta header’ları, SPF/DKIM durumu, önceki yazışma örüntüsü, resmi telefon/portal doğrulaması ve talebin proje bağlamı.', 'A good response here reads technical evidence and collaboration context together: email headers, SPF/DKIM status, prior communication patterns, official phone/portal verification, and the request’s fit with the project context.'],
      setting: ['Koordinatör, “tonu çok normal” diyerek paylaşım için sizi ikna etmeye çalışıyor.', 'The coordinator is trying to persuade you to share because “the tone feels normal.”'],
      current: ['Görünüşe dayalı güven ile doğrulamaya dayalı güven arasında karar vermek zorundasınız.', 'You must choose between appearance-based trust and verification-based trust.'],
      changedByTone: { positive: ['Önceki aşamada due diligence kurulduğu için teknik bulguları karar mekanizmasına hızla bağlayabiliyorsunuz.', 'Because due diligence was built in the previous stage, you can quickly connect technical findings to the decision chain.'], negative: ['Önceki aşamadaki boşluklar nedeniyle şimdi karar baskısı daha duygusal ve daha az yapısal ilerliyor.', 'Because of earlier gaps, decision pressure is now more emotional and less structured.'] },
      developments: [[ 'Header analizi, iletim yolunun beklenen partner MX altyapısı yerine üçüncü taraf bir relay üzerinden geçtiğini gösteriyor.', 'Display name tanıdık olsa da alan adı bir karakter farklı.', 'Bağımsız telefon doğrulamasında talebin partner kurumda bilinmediği ortaya çıkıyor.' ], [ 'Header analysis shows the message routed through a third-party relay.', 'The display name is familiar, but the domain differs by one character.', 'An independent phone check shows the request is unknown to the partner institution.' ]],
      options: [[ 'Header/metadata, önceki yazışma örüntüsü ve resmi kanal çapraz doğrulamasını birlikte incele.', 'Review headers/metadata, prior communication patterns, and official-channel cross-verification together.' ], [ 'Gönderen adı tanıdık görünüyor; teknik doğrulamaya gerek yok.', 'The sender name looks familiar; no technical verification is necessary.' ], [ 'Üslup profesyonel; bu yeterlidir.', 'The tone sounds professional; that is enough.' ]],
      choices: [ choice('positive','🧬 Trust but verify bonusu','🧬 Trust but verify bonus','Çok güçlü doğrulama seti. Kimlik, niyet ve bağlam birlikte değerlendirildi.','A very strong verification set. Identity, intent, and context were assessed together.',{ score:24, speed:4, evidence:18, coordination:6, risk:10 },'Signal Analyst','decision'), choice('negative','😢 Display-name tuzağı','😢 Display-name trap','Tanıdık isim güvenilir doğrulama değildir; spoofing riski göz ardı edildi.','A familiar name is not reliable verification; spoofing risk was ignored.',{ score:-16, speed:0, evidence:-14, coordination:0, risk:-14 },'Display Name Trap','decision'), choice('negative','😢 Biçim yanılgısı','😢 Style illusion','Profesyonel üslup meşruiyet kanıtı değildir.','Professional wording is not proof of legitimacy.',{ score:-12, speed:2, evidence:-10, coordination:0, risk:-10 },'Style Bias','decision') ]
    }),
    decision: stage({
      alert: ['Veri paylaşımı ve partner yönetimi hakkında sonuç kararı gerekiyor.', 'A final decision is required on data sharing and partner handling.'],
      title: ['Aşama 4 — Güvenli Sonuçlandırma, Kayıt ve İlişki Yönetimi', 'Stage 4 — Safe Resolution, Recordkeeping, and Relationship Management'],
      text: ['Doğrulama sonuçlandıktan sonra iki meşru yol vardır: SOP’ye uygun kontrollü paylaşım veya kayıtlı ve gerekçeli reddetme. Her iki durumda da kararın izi, açıklaması ve öğrenme çıktısı olmalıdır.', 'After verification there are two legitimate paths: controlled sharing under SOP or a documented, justified refusal. In either case, the decision needs traceability, explanation, and learning output.'],
      setting: ['Dış partnerle uzun vadeli ilişki korunmak isteniyor ama kurumsal güvenlik standardından taviz verilmemeli.', 'The long-term relationship with the external partner matters, but the institutional security standard cannot be traded away.'],
      current: ['Kararınız, “güvenli iş birliği”nin pratikte ne anlama geldiğini gösterecek.', 'Your choice will define what “secure collaboration” means in practice.'],
      changedByTone: { positive: ['Elde ettiğiniz doğrulama seti sayesinde artık güvenli, savunulabilir bir sonuç üretebiliyorsunuz.', 'Because you built a strong verification set, you can now produce a safe and defensible outcome.'], negative: ['Önceki eksikler nedeniyle kapanışta daha çok belgelendirme ve temkin gerekebilir.', 'Because of earlier gaps, closure now requires extra documentation and caution.'] },
      developments: [[ 'Partner kurum sahte alan adı üzerinden yapılan girişim için teşekkür ederek resmi olay kaydı açtı.', 'İç ekibiniz, benzer talepler için SOP’nin daha görünür hale getirilmesini istiyor.', 'Bu vakada paylaşım yapılmaması, ilişkiyi değil güvenlik standardını güçlendirdi.' ], [ 'The partner institution thanked you and opened its own incident record for the spoofed-domain attempt.', 'Your internal team wants the SOP made more visible for future requests.', 'Not sharing in this case protected the security standard rather than harming the relationship.' ]],
      options: [[ 'Doğrulanmışsa kontrollü paylaşım yap; doğrulanmamışsa resmi ret ve kayıt mekanizmasını işlet.', 'If verified, proceed with controlled sharing; if not, issue a formal refusal and activate recordkeeping.' ], [ 'Belirsizlik sürse de ilişkiyi korumak için paylaşım yap.', 'Share anyway to preserve the relationship despite continuing uncertainty.' ], [ 'Talebi reddet ama kayıt oluşturma.', 'Reject the request but do not document it.' ]],
      choices: [ choice('positive','🌟 Governance mastery','🌟 Governance mastery','Mükemmel kapanış. İş birliği sürekliliği ile güvenlik standardı birlikte korundu.','Excellent closure. Collaboration continuity and security standards were preserved together.',{ score:28, speed:8, evidence:4, coordination:16, risk:20 },'Collaboration Guardian','end'), choice('negative','😢 Güvenlikten taviz','😢 Security compromise','İlişkiyi koruma adına belirsizlik altında paylaşım yapmak güvenlik eşiğini aşındırır.','Sharing under uncertainty to preserve the relationship erodes the institutional security threshold.',{ score:-18, speed:4, evidence:-4, coordination:-8, risk:-18 },'Relationship Overreach','end'), choice('negative','😢 Kurumsal hafıza kaybı','😢 Institutional memory loss','Belgelendirme olmadan audit trail ve öğrenme zayıflar.','Without documentation, the audit trail and institutional learning are weakened.',{ score:-10, speed:2, evidence:-8, coordination:-6, risk:-8 },'No Audit Trail','end') ]
    })
  };
}

function buildDeviceNodes() { return {
  start: stage({ alert:['Bağlantılı laboratuvar cihazında düzensiz senkronizasyon davranışı görülüyor.','A connected lab device is showing irregular sync behavior.'], title:['Aşama 1 — Cihaz Davranışını Kontrol Altına Al','Stage 1 — Bring Device Behavior Under Control'], text:['Ağa bağlı dondurucu izleme/görüntüleme sistemi, normalde yalnızca kurum içi sunucuya veri gönderirken gece boyunca üretici alanlarına ve bilinmeyen iki IP adresine dış bağlantı denemeleri yapmış. Aynı saatlerde cihaz kısa süreli kalibrasyon hataları üretmiş ve laboratuvar ekibi sabah veri bütünlüğünden emin değil.', 'A networked freezer monitoring/imaging device that normally reports only to an internal server attempted outbound connections overnight to vendor domains and two unknown IPs. At the same time, the device produced short calibration errors, and the lab team is no longer confident in data integrity.'], setting:['Cihaz kritik örnekleri izliyor; kapatırsanız operasyon etkilenebilir.','The device monitors critical samples; shutting it down may affect operations.'], current:['Hem güvenlik hem laboratuvar sürekliliği aynı anda yönetilmeli.','Security and lab continuity must be managed simultaneously.'], changed:['İlk aşama: önceki karar etkisi yok.','First stage: no previous-choice effect.'], developments:[[ 'Üretici uzaktan bakım penceresinin planlanmadığı görülüyor.', 'Cihaz firmware sürümü iki yıl geride.', 'Aynı ağ segmentinde üç başka laboratuvar cihazı daha var.' ], [ 'No scheduled vendor maintenance window is recorded.', 'The device firmware is two years behind.', 'Three more lab devices sit on the same network segment.' ]], options:[[ 'Cihazı kontrollü biçimde ağdan ayır, operasyonel etkiyi değerlendir ve teknik kayıtları koru.', 'Controlled-disconnect the device from the network, assess operational impact, and preserve technical records.' ], [ 'Cihazı kapat-aç yap; düzelirse normale dön.', 'Power-cycle the device; if it looks stable, return to normal work.' ], [ 'İş akışı bozulmasın diye hiç müdahale etme.', 'Do nothing so the workflow is not disrupted.' ]], choices:[ choice('positive','🛡️ Device isolation bonusu','🛡️ Device isolation bonus','Güvenlik ve operasyon dengesi birlikte gözetildi; olgun bir response davranışı.','Security and operations were balanced together; a mature response behavior.',{ score:24, speed:10, evidence:14, coordination:8, risk:16 },'Device Shield','comms'), choice('negative','😢 İnceleme kaybı','😢 Investigation loss','Reset refleksi semptomu saklayabilir ve kök neden görünürlüğünü azaltır.','The reset reflex can hide symptoms and reduce visibility into root cause.',{ score:-14, speed:2, evidence:-16, coordination:-2, risk:-10 },'Reset Reflex','comms'), choice('negative','😢 Yayılım riski','😢 Propagation risk','Pasiflik hem teknik riski hem de araştırma etkisini büyütebilir.','Passivity may increase both technical risk and research impact.',{ score:-20, speed:-12, evidence:-4, coordination:-6, risk:-18 },'Passive Drift','comms') ]
  }),
  comms: stage({ alert:['Operasyon, biyogüvenlik ve IT ekipleri hizalanmalı.','Operations, biosafety, and IT teams must align.'], title:['Aşama 2 — Operasyonel Koordinasyon ve Roller','Stage 2 — Operational Coordination and Roles'], text:['Cihaz olayı artık tek başına teknik değil; numune güvenliği, deney sürekliliği, üretici ilişkisi ve laboratuvar sorumluluğu da işin içinde. Ortak karar akışı kurulmazsa ya güvenlik ya operasyon kör kalır.', 'This device issue is no longer purely technical; sample safety, experimental continuity, vendor relations, and lab accountability are all involved. Without a shared decision flow, either security or operations will go blind.'], setting:['Lab yöneticisi cihazın hemen geri dönmesini istiyor; güvenlik ekibi segmenti geniş taramak istiyor.','The lab manager wants the device back quickly; the security team wants to scan the wider segment.'], current:['Karar zinciri kurulmadan atılacak adımlar çatışma yaratabilir.','Actions taken without a decision chain may create conflict.'], changedByTone:{ positive:['İlk aşamada kontrollü ayrım yapıldığı için ekipler daha sakin bir zeminde konuşuyor.','Because the first stage used controlled isolation, teams are now talking on calmer ground.'], negative:['İlk aşamadaki zayıf tercih nedeniyle güvenlik ve lab ekipleri birbirini suçlamaya başladı.','Because of the weak first-stage choice, security and lab teams have started blaming each other.'] }, developments:[[ 'Biosafety sorumlusu sıcaklık alarm zincirinin etkilenmediğini doğruladı ama görüntüleme verisinde boşluklar var.', 'Üretici, uzaktan teşhis için cihazın internete yeniden çıkarılmasını istiyor.', 'Aynı segmentte eski kimlik doğrulama kullanan iki cihaz daha bulundu.' ], [ 'The biosafety lead confirms the temperature alarm chain was not affected, but there are gaps in imaging data.', 'The vendor wants the device re-exposed to the internet for remote diagnostics.', 'Two more devices on the same segment were found using legacy authentication.' ]], options:[[ 'IT, cihaz sorumlusu, laboratuvar yönetimi ve güvenlik ekibini ortak karar akışında buluştur.', 'Bring IT, the device owner, lab management, and security into one shared decision flow.' ], [ 'Sadece teknik ekip çözsün; laboratuvar sonra bilgilendirilsin.', 'Let the technical team solve it alone; inform the lab later.' ], [ 'Laboratuvar kendi içinde yönetsin; teknik ekibe gerek yok.', 'Let the lab manage it internally; the technical team is unnecessary.' ]], choices:[ choice('positive','🤝 Alignment bonusu','🤝 Alignment bonus','Doğru yaklaşım. Operasyon sürekliliği ile güvenlik gereksinimi dengeli yönetildi.','Correct approach. Operational continuity and security requirements were managed in balance.',{ score:22, speed:8, evidence:4, coordination:20, risk:10 },'Ops Aligner','evidence'), choice('negative','😢 Operasyon körlüğü','😢 Operational blind spot','Laboratuvar etkisini dışarıda bırakmak risk değerlendirmesini eksik kılar.','Excluding lab impact makes the risk assessment incomplete.',{ score:-10, speed:0, evidence:0, coordination:-14, risk:-8 },'Ops Blind Spot','evidence'), choice('negative','😢 Teknik boşluk','😢 Technical gap','Teknik görünürlük olmadan olayın niteliği doğru sınıflandırılamaz.','Without technical visibility, the incident cannot be classified accurately.',{ score:-10, speed:0, evidence:-4, coordination:-12, risk:-8 },'Tech Gap','evidence') ]
  }),
  evidence: stage({ alert:['Çok kaynaklı analiz etkiyi açıklığa kavuşturabilir.','Multi-source analysis can clarify impact.'], title:['Aşama 3 — Cihaz, Ağ ve Kullanıcı Akışı Analizi','Stage 3 — Device, Network, and User-Flow Analysis'], text:['Bu olayın cihaz arızası mı, güvenlik olayı mı, üretici bakım hatası mı, yoksa bunların birleşimi mi olduğunu ayırmanız gerekiyor. Cihaz logları, ağ izleri, bakım geçmişi ve son kullanıcı işlemleri birlikte okunmalı.', 'You need to determine whether this was a device failure, a security incident, a vendor-maintenance error, or a combination. Device logs, network traces, maintenance history, and end-user actions have to be analyzed together.'], setting:['Üretici, “önce internet erişimi verin sonra anlayalım” diyor; güvenlik ekibi buna itiraz ediyor.', 'The vendor says, “restore internet access first and then we’ll understand it”; the security team objects.'], current:['Tek kaynaklı analiz yanlış sınıflandırmaya açık.', 'Single-source analysis is vulnerable to misclassification.'], changedByTone:{ positive:['Koordinasyon iyi olduğu için log ve bakım kayıtlarını aynı çatı altında inceleyebiliyorsunuz.','Because coordination is good, you can review logs and maintenance records under one roof.'], negative:['Önceki aşamadaki çatışmalar nedeniyle veri toplama talepleri gecikti.','Because of earlier conflict, evidence collection requests were delayed.'] }, developments:[[ 'Ağ izleri, cihazın gece boyunca düşük hacimli fakat periyodik DNS sorguları ürettiğini gösteriyor; örüntü tünelleme benzeri olsa da henüz kesin değil.', 'Üretici portalında bu cihaza ait planlanmamış bir giriş görünmüyor.', 'Bir teknisyenin önceki gün USB üzerinden firmware paketi taşıdığı, ancak değişiklik kaydına işlemediği düşünülüyor.' ], [ 'Network traces suggest short, tunnel-like DNS queries overnight.', 'The vendor portal shows no scheduled remote session for this device.', 'A technician may have carried firmware files by USB the day before.' ]], options:[[ 'Cihaz logları, ağ izleri ve son kullanıcı/teknisyen işlemlerini birlikte değerlendir.', 'Assess device logs, network traces, and end-user/technician actions together.' ], [ 'Sadece ağ trafiğine bak; diğer veriler gereksiz.', 'Review network traffic only; the rest is unnecessary.' ], [ 'Bir kullanıcıyı sorumlu varsay ve analizi buna göre yönlendir.', 'Assume a user is responsible and steer the analysis around that assumption.' ]], choices:[ choice('positive','🔬 Multi-source analysis','🔬 Multi-source analysis','Sistem düzeyi düşünme olayın kaynağını ve etkisini netleştirdi.','Systems-level thinking clarified the source and impact of the incident.',{ score:24, speed:4, evidence:20, coordination:4, risk:10 },'Systems Thinker','decision'), choice('negative','😢 Dar analiz','😢 Narrow analysis','Tek kaynaklı inceleme eksik ve yanıltıcı olabilir.','A single-source review can be incomplete and misleading.',{ score:-12, speed:2, evidence:-12, coordination:0, risk:-8 },'Narrow Lens','decision'), choice('negative','😢 Varsayım yanlılığı','😢 Assumption bias','Varsayım temelli yaklaşım nesnel teknik incelemeyi zayıflatır.','An assumption-driven approach weakens objective technical analysis.',{ score:-14, speed:0, evidence:-14, coordination:-6, risk:-8 },'Assumption Bias','decision') ]
  }),
  decision: stage({ alert:['Toparlanma ve dayanıklılık planı bekleniyor.','A recovery and resilience plan is expected.'], title:['Aşama 4 — Dayanıklılık, Segmentasyon ve Süreç Güçlendirme','Stage 4 — Resilience, Segmentation, and Process Strengthening'], text:['İlk müdahale sonrasında tekrar riskini azaltacak kalıcı adımlar seçilmelidir: segmentasyon, bakım SOP’leri, üretici erişim kuralları, firmware yaşam döngüsü ve olay sonrası debrief. Sadece cihazı değiştirip ilerlemek cazip ama yetersiz olabilir.', 'After the initial intervention, you need durable steps that reduce recurrence risk: segmentation, maintenance SOPs, vendor-access rules, firmware lifecycle control, and post-incident debrief. Simply replacing the device and moving on may be tempting but inadequate.'], setting:['Laboratuvar yeni kesinti istemiyor; güvenlik ise istisna bırakmak istemiyor.', 'The lab wants no new disruption; security wants no new exceptions.'], current:['Dayanıklılık planı hem güvenli hem uygulanabilir olmalı.', 'The resilience plan has to be both secure and operationally workable.'], changedByTone:{ positive:['Elinizde artık hedefli iyileştirme yapmaya yetecek kadar kanıt var.','You now have enough evidence to implement targeted improvements.'], negative:['Belirsizlikler sürdüğü için daha geniş güvenlik marjı bırakmak zorunda kalabilirsiniz.','Because uncertainty remains, you may need broader safety margins.'] }, developments:[[ 'Segmentteki iki cihazın daha güncel olmayan kimlik doğrulama kullandığı doğrulandı.', 'Üretici sözleşmesinde uzaktan erişim penceresi tanımı eksik.', 'Bakım personeli için değişiklik kaydı zorunlu değil.' ], [ 'Two more devices on the segment are confirmed to use outdated authentication.', 'The vendor contract lacks a clear definition for remote-access windows.', 'Maintenance staff are not required to keep change records.' ]], options:[[ 'Ağ segmentasyonu, izleme, bakım SOP’si ve ekip eğitimi içeren dayanıklılık planı kur.', 'Build a resilience plan including network segmentation, monitoring, maintenance SOPs, and team training.' ], [ 'Sadece cihazı değiştir; süreçlere dokunma.', 'Replace the device only; do not change the process.' ], [ 'Aynı düzenle devam et.', 'Continue as before.' ]], choices:[ choice('positive','🏆 Resilience bonusu','🏆 Resilience bonus','Harika kapanış. Olay kurumsal dayanıklılığa çevrildi.','Excellent closure. The incident was turned into institutional resilience.',{ score:28, speed:8, evidence:4, coordination:16, risk:20 },'Resilience Builder','end'), choice('negative','😢 Semptom çözümü','😢 Symptom-only fix','Donanım değişimi süreç zafiyetini çözmez.','Replacing hardware does not resolve process weakness.',{ score:-10, speed:4, evidence:0, coordination:-6, risk:-10 },'Replace Only','end'), choice('negative','😢 Dayanıklılık kaybı','😢 Loss of resilience','Öğrenmeyen sistemler aynı olayları tekrar üretir.','Systems that do not learn tend to reproduce the same incidents.',{ score:-18, speed:0, evidence:0, coordination:-8, risk:-18 },'Repeat Risk','end') ]
  })
}; }

function buildInsiderNodes() { return {
  start: stage({ alert:['SOP sınırları dışında iç paylaşım örüntüsü işaretlendi.','An internal sharing pattern outside SOP boundaries has been flagged.'], title:['Aşama 1 — Paylaşımı Durdur, Bağlamı Koruyarak Kayda Al','Stage 1 — Stop the Sharing and Record It Without Losing Context'], text:['Bir araştırma koordinatörü, dış ortakla toplantıya yetişmek için kurumsal onay sürecini beklemeden deney protokolü özetleri, tedarikçi karşılaştırma tablosu ve bazı ön analiz çıktıları kişisel dosya paylaşım hesabından göndermiş olabilir; olay kötü niyetli görünmese de kurumsal kontrol dışına taşmış durumda. Niyet kötü görünmüyor; ancak kanal, yetki ve kapsam SOP dışında.', 'A research coordinator may have sent protocol summaries, a supplier comparison sheet, and some preliminary analysis outputs from a personal file-sharing account to make an external meeting on time, without waiting for institutional approval. The intent does not look malicious, but the channel, authority, and scope are outside SOP.'], setting:['Ekip yoğun bir hibe başvuru döneminde ve herkes hız baskısı altında.', 'The team is in a heavy grant-submission period and everyone is under time pressure.'], current:['İlk hedef kişiyi damgalamak değil; paylaşımı durdurmak, kapsamı korumak ve güvenli kayıt açmak.', 'The first goal is not to stigmatize the person; it is to stop the sharing, preserve scope, and open a safe record.'], changed:['İlk aşama: önceki karar etkisi yok.','First stage: no previous-choice effect.'], developments:[[ 'Paylaşım bağlantısının herkese açık değil ama kurumsal dışı olduğu görülüyor.', 'Dosya listesinde taslak SOP notları ve dış ortakla henüz paylaşılmaması gereken yorumlar var.', 'Koordinatör, “zaten birkaç saat içinde resmi olarak da paylaşılacaktı” savunması yapıyor.' ], [ 'The share link is not public, but it is outside institutional control.', 'The file list includes draft SOP notes and comments that were not yet meant for the external partner.', 'The coordinator says, “it would have been shared officially in a few hours anyway.”' ]], options:[[ 'Paylaşımı durdur, erişimi geçici sınırla ve yapılandırılmış olay kaydı oluştur.', 'Stop the sharing, temporarily restrict access, and create a structured incident record.' ], [ 'İlgili kişiyi herkesin önünde sorgula.', 'Question the person publicly in front of everyone.' ], [ 'Niyet iyi olduğu için olayı görmezden gel.', 'Ignore the issue because the intention was good.' ]], choices:[ choice('positive','📝 Governance bonusu','📝 Governance bonus','Doğru yaklaşım. Olay suçlayıcı değil sistematik response mantığıyla ele alındı.','Correct approach. The event was handled through systematic response logic rather than blame.',{ score:24, speed:10, evidence:14, coordination:8, risk:16 },'Governance Anchor','comms'), choice('negative','😢 Güven kaybı','😢 Trust loss','Bu yaklaşım psikolojik güvenliği zedeler ve nesnel analizi bozar.','This damages psychological safety and distorts objective analysis.',{ score:-16, speed:0, evidence:-6, coordination:-16, risk:-8 },'Public Blame','comms'), choice('negative','😢 Politika aşınması','😢 Policy erosion','İyi niyet, kontrolsüz paylaşım riskini ortadan kaldırmaz; SOP’nin anlamı aşınır.','Good intent does not remove the risk of uncontrolled sharing; the meaning of the SOP erodes.',{ score:-20, speed:-10, evidence:-6, coordination:-6, risk:-18 },'Intent Bias','comms') ]
  }),
  comms: stage({ alert:['Adil ama hesap verebilir bir yanıt gerekli.','A fair but accountable response is required.'], title:['Aşama 2 — Adil, Sistem Odaklı Kurumsal Yaklaşım','Stage 2 — A Fair, System-Focused Institutional Response'], text:['Bu aşamada amaç kişisel savunma döngüsüne girmek değil; hangi süreç baskılarının, yetki belirsizliklerinin ve kültürel normların bu davranışı mümkün kıldığını anlamak. İnsan faktörü, süreç ve güvenlik birlikte ele alınmalı.', 'The goal here is not to enter a personal-defensiveness loop, but to understand which process pressures, authority ambiguities, and cultural norms made the behavior possible. Human factors, process, and security must be examined together.'], setting:['Yönetici hızlı çözüm isterken ekip arkadaşları koordinatörü korumaya çalışıyor.', 'Management wants a quick fix while teammates are trying to protect the coordinator.'], current:['Hesap verebilirlik ile suçlayıcılık arasındaki çizgi dikkatle yönetilmeli.', 'The line between accountability and blame must be handled carefully.'], changedByTone:{ positive:['İlk aşama profesyonel yürütüldüğü için görüşme ortamı daha güvenli.','Because the first stage was handled professionally, the review environment is safer.'], negative:['Önceki kararın yarattığı gerginlik savunmacı davranışları artırdı.','Tension from the prior decision has increased defensive behavior.'] }, developments:[[ 'Benzer “hız kazanmak için kısayol” davranışlarının geçmişte de tolere edildiği söyleniyor.', 'Onay süreci bazı kullanıcılarca yavaş ve belirsiz bulunuyor.', 'HR, hukuki riskten çok ekip iklimi hasarı konusunda endişeli.' ], [ 'People report that similar “shortcut for speed” behaviors were tolerated in the past.', 'Some users see the approval process as slow and unclear.', 'HR is less worried about legal risk than about damage to the team climate.' ]], options:[[ 'Yönetici, güvenlik ve süreç sahipleriyle yapılandırılmış değerlendirme toplantısı yap.', 'Hold a structured review meeting with management, security, and process owners.' ], [ 'Süreci tamamen insan kaynaklarına bırak.', 'Leave the process entirely to HR.' ], [ 'Sadece teknik tarafa odaklan; insan faktörünü dışarıda bırak.', 'Focus only on the technical side; leave out the human factor.' ]], choices:[ choice('positive','⚖️ Balanced response','⚖️ Balanced response','Güçlü yaklaşım. Olay kişisel suçlamadan sistem odaklı analize taşındı.','Strong approach. The event was moved from personal blame to system-focused analysis.',{ score:22, speed:8, evidence:4, coordination:18, risk:10 },'Fair Coordinator','evidence'), choice('negative','😢 Tek boyutlu yaklaşım','😢 One-dimensional response','Bu olay yalnızca personel meselesi değildir; veri, süreç ve güvenlik birlikte değerlendirilmelidir.','This is not merely a personnel matter; data, process, and security must be assessed together.',{ score:-10, speed:0, evidence:-2, coordination:-12, risk:-8 },'HR Only','evidence'), choice('negative','😢 İnsan faktörü körlüğü','😢 Human-factor blindness','İnsan davranışı incident response’un merkezindedir; dışarıda bırakılamaz.','Human behavior sits at the center of incident response and cannot be excluded.',{ score:-10, speed:0, evidence:0, coordination:-10, risk:-8 },'Human Blind Spot','evidence') ]
  }),
  evidence: stage({ alert:['Bağlam rekonstrüksiyonu yargıdan önce gelmeli.','Context reconstruction should come before judgment.'], title:['Aşama 3 — İçerik, Kanal, Alıcı ve SOP Sapması Analizi','Stage 3 — Analysis of Content, Channel, Recipient, and SOP Deviation'], text:['Ne paylaşıldı, kime gitti, bağlantı kimlerle açıldı, hangi versiyonlar gönderildi ve SOP’den hangi noktada sapıldı? Adil ve etkili bir karar için bu sorular ayrıntılı cevaplanmalı.', 'What exactly was shared, to whom, who opened the link, which versions were sent, and where did the process diverge from SOP? These questions need detailed answers for a fair and effective decision.'], setting:['Dış ortak dosyaları henüz açmamış olabilir; ama bunun garantisi yok.', 'The external partner may not have opened the files yet, but there is no guarantee.'], current:['Kapsam analizi, düzeltici aksiyonun tonunu ve büyüklüğünü belirleyecek.', 'Scope analysis will determine the tone and scale of corrective action.'], changedByTone:{ positive:['Önceki sistem odaklı yaklaşım sayesinde tanıklar ve süreç sahipleri daha açık bilgi veriyor.','Because the previous stage was system-focused, witnesses and process owners are providing clearer information.'], negative:['Önceki hatalar yüzünden bilgi verme isteği azaldı; bağlam toplamak zorlaşıyor.','Because of earlier mistakes, willingness to share information has dropped; collecting context is harder.'] }, developments:[[ 'Bağlantının iki harici alıcıya gittiği, bunlardan birinin alt yüklenici olduğu anlaşıldı.', 'Paylaşılan dosyalardan biri “taslak” değil, üzerinde aktif çalışılan güncel sürüm.', 'Kişisel dosya paylaşım hesabında erişim kayıtları sınırlı ama mevcut.' ], [ 'The link went to two external recipients, one of whom is a subcontractor.', 'One of the shared files was not a draft but the current working version.', 'Access logs in the personal file-sharing account are limited but available.' ]], options:[[ 'İçerik, alıcı, kanal, zaman ve SOP farkını sistematik biçimde analiz et.', 'Analyze content, recipient, channel, timing, and SOP divergence systematically.' ], [ 'Niyet belli; detaylı analize gerek yok.', 'The intent is obvious; no detailed analysis is needed.' ], [ 'Benzer şeyler olur diyerek yüzeysel notla geç.', 'Treat it as routine and move on with a superficial note.' ]], choices:[ choice('positive','🧠 Context bonusu','🧠 Context bonus','Adil ve etkili karar için gereken bağlamsal görünürlük sağlandı.','The contextual visibility needed for a fair and effective decision was established.',{ score:24, speed:4, evidence:20, coordination:4, risk:10 },'Context Analyst','decision'), choice('negative','😢 Eksik bağlam','😢 Incomplete context','Bağlamı dışarıda bırakmak yanlış sınıflandırma riskini artırır.','Leaving out context increases the risk of misclassification.',{ score:-12, speed:2, evidence:-12, coordination:0, risk:-8 },'Thin Context','decision'), choice('negative','😢 Normalleştirme hatası','😢 Normalization error','Normalleştirme güvenlik kültürünü ve SOP disiplinini aşındırır.','Normalization erodes security culture and SOP discipline.',{ score:-14, speed:0, evidence:-10, coordination:-4, risk:-10 },'Normalization Drift','decision') ]
  }),
  decision: stage({ alert:['Kurum düzeltici ve kültürel yanıt bekliyor.','The institution expects both corrective and cultural response.'], title:['Aşama 4 — Düzeltici Aksiyon ve Kültürel Güçlendirme','Stage 4 — Corrective Action and Cultural Strengthening'], text:['Yanıtın amacı sadece olayı kapatmak değil; aynı davranışı doğuran kültürel ve süreçsel boşlukları azaltmak. Eğitim, onay akışının sadeleştirilmesi, görünür SOP, erişim sınırları ve öğrenme odaklı debrief masada.', 'The aim is not only to close the incident but to reduce the cultural and procedural gaps that enabled the behavior. Training, simpler approval flows, visible SOPs, access boundaries, and a learning-focused debrief are all on the table.'], setting:['Ekip, ceza merkezli değil ama ciddiyeti gösteren bir sonuç bekliyor.', 'The team expects an outcome that is not purely punitive but still demonstrates seriousness.'], current:['Buradaki karar güvenlik kültürünün geleceğini etkileyecek.', 'The decision here will influence the future of the security culture.'], changedByTone:{ positive:['Kapsam net olduğu için daha hedefli ve adil bir kapanış yapabilirsiniz.', 'Because scope is clearer, you can produce a more targeted and fair closure.'], negative:['Belirsizlikler sürdüğünden hem koruyucu hem eğitici adımları daha geniş tutmanız gerekebilir.', 'Because uncertainty remains, you may need broader protective and educational measures.'] }, developments:[[ 'Onay sürecinde net bir “acil paylaşım” yolu olmadığı ortaya çıktı.', 'Bazı ekip üyeleri kişisel hesapları iş için kullanmayı normal görüyor.', 'Dış ortak, resmi güvenli paylaşım kanalını tercih edeceğini bildirdi.' ], [ 'There is no clearly defined “urgent sharing” path in the approval process.', 'Some team members view personal accounts for work as normal.', 'The external partner says it would prefer an official secure sharing channel.' ]], options:[[ 'SOP netleştirme, eğitim, erişim sınırları ve öğrenme odaklı debrief uygula.', 'Implement SOP clarification, training, access limits, and a learning-focused debrief.' ], [ 'Sadece ilgili kişiye uyarı ver ve süreci kapat.', 'Warn the individual only and close the process.' ], [ 'Hiç aksiyon alma.', 'Take no action.' ]], choices:[ choice('positive','🌟 Culture + control bonusu','🌟 Culture + control bonus','Mükemmel. Olay cezalandırıcı değil, öğrenen ve güçlenen bir sisteme dönüştürüldü.','Excellent. The incident was transformed into a system that learns and strengthens rather than merely punishes.',{ score:28, speed:8, evidence:4, coordination:16, risk:20 },'Culture Builder','end'), choice('negative','😢 Sistem öğrenmiyor','😢 System does not learn','Kişisel uyarı tek başına sistemik zafiyetleri çözmez.','A personal warning alone does not fix systemic weaknesses.',{ score:-10, speed:2, evidence:0, coordination:-8, risk:-10 },'Personalized Fix','end'), choice('negative','😢 Kültürel erozyon','😢 Cultural erosion','Aksiyon alınmaması SOP’leri ve güvenlik kültürünü aşındırır.','Failure to act erodes SOPs and the broader security culture.',{ score:-18, speed:0, evidence:0, coordination:-8, risk:-18 },'Policy Erosion','end') ]
  })
}; }

const supplementalStageChoices = {
  'after-hours-access': {
    start: [
      extraOption(
        'VPN oturumunu kontrollü askıya al, kullanıcının cihazına dokunmadan önce canlı artefakt toplama ve çağrı zincirini başlat.',
        'Suspend the VPN session in a controlled way, initiate live-artifact collection, and start the call chain before touching the user device.',
        'neutral',
        '🟡 Kısmi containment',
        '🟡 Partial containment',
        'Aktif oturumu kısmen sınırlar ama hesap/uç nokta izolasyonu kadar güçlü değildir; yine de düşünülmüş bir ara adımdır.',
        'This partly constrains the live session but is not as strong as full account/endpoint isolation; still, it is a considered intermediate move.',
        { score: 6, speed: 6, evidence: 8, coordination: 4, risk: 2 },
        'Measured Hold'
      )
    ],
    comms: [
      extraOption(
        'Önce yalnızca enstitü yöneticisini bilgilendir; diğer paydaşları teknik kapsam netleşince dahil et.',
        'Inform only the institute director first; bring in other stakeholders once the technical scope is clearer.',
        'neutral',
        '🟡 Dar eskalasyon',
        '🟡 Narrow escalation',
        'Bazı liderlik görünürlüğü sağlar ama hukuk, araştırma güvenliği ve veri sahibi boyutlarını geciktirebilir.',
        'This creates some leadership visibility but may delay legal, research-security, and data-owner involvement.',
        { score: 4, speed: 4, evidence: 0, coordination: -2, risk: 0 },
        'Leader First'
      )
    ],
    evidence: [
      extraOption(
        'Önce paylaşım erişimini daraltıp kritik dosyaları salt okunur korumaya al; adli kopyayı hemen ardından planlı pencerede al.',
        'Tighten share access and place critical files under read-only protection first; then take forensic images in the planned window.',
        'neutral',
        '🟡 Korumalı bekletme',
        '🟡 Protected holding pattern',
        'Hizmet baskısını azaltır ve bazı kanıtları korur; yine de tam zincir-of-custody yaklaşımı kadar güçlü değildir.',
        'This reduces service pressure and protects some evidence, though it is not as strong as a full chain-of-custody approach.',
        { score: 8, speed: 2, evidence: 10, coordination: 2, risk: 4 },
        'Access Freeze'
      )
    ],
    decision: [
      extraOption(
        'Sınıflandırmayı “muhtemel maruziyet” olarak geçici tut, genişletilmiş izleme ve hızlandırılmış düzeltmeleri başlat, dış bildirimi kısa süreli yeniden değerlendirme koşuluna bağla.',
        'Keep the classification temporarily at “probable exposure,” launch expanded monitoring and accelerated remediation, and tie any external notice to a near-term reassessment.',
        'neutral',
        '🟡 Temkinli kapanış',
        '🟡 Cautious closure',
        'Belirsizlik varsa savunulabilir olabilir; ancak karar netliğini ve paydaş beklentilerini bir miktar geciktirir.',
        'This can be defensible under uncertainty, but it delays decisiveness and may slow stakeholder closure.',
        { score: 8, speed: 0, evidence: 4, coordination: 4, risk: 6 },
        'Guarded Classifier'
      )
    ]
  },
  'usb-transfer': {
    start: [
      extraOption(
        'Kullanıcıdan USB’yi hemen fiziksel teslim etmesini iste, istasyonu açık bırak ama gözlem altına al; kayıt açmayı kullanıcı gelene kadar ertele.',
        'Require the user to surrender the USB immediately, keep the workstation powered but monitored, and delay formal recording until the user arrives.',
        'neutral',
        '🟡 Gecikmeli kontrol',
        '🟡 Delayed control',
        'Fiziksel medyayı geri çağırmaya çalışır ama resmi kayıt ve erken kurumsal görünürlük gecikir.',
        'This tries to recover the physical media, but formal recording and early institutional visibility are delayed.',
        { score: 4, speed: 2, evidence: 4, coordination: 0, risk: 2 },
        'USB Recall'
      )
    ],
    comms: [
      extraOption(
        'Önce yalnızca PI ve veri sahibini bilgilendir; governance ekibini transfer kapsamı netleşirse çağır.',
        'Inform only the PI and data owner first; involve governance teams if transfer scope becomes clearer.',
        'neutral',
        '🟡 Kısmi paydaş seti',
        '🟡 Partial stakeholder set',
        'Bazı iş bağlamını korur ama olayın sözleşme ve politika boyutunu eksik bırakabilir.',
        'This preserves some business context but may underserve the contractual and policy dimensions of the event.',
        { score: 4, speed: 4, evidence: 0, coordination: -2, risk: 0 },
        'PI First'
      )
    ],
    evidence: [
      extraOption(
        'Önce USB artefaktları ve arşiv adlarını inceleyip hızlı bir ön kapsam çıkar; tam rekonstrüksiyonu gün sonuna yetiştir.',
        'Review USB artifacts and archive names first for a quick preliminary scope, then complete the full reconstruction by end of day.',
        'neutral',
        '🟡 Ön kapsam bonusu',
        '🟡 Preliminary scoping bonus',
        'Hızlı bir yön verir ama tam korelasyon yapılmadan alınan kararları kısmen zayıf bırakabilir.',
        'It gives direction quickly, but decisions made before full correlation remain somewhat weaker.',
        { score: 6, speed: 6, evidence: 6, coordination: 2, risk: 2 },
        'Fast Scope'
      )
    ],
    decision: [
      extraOption(
        'Sadece yüksek riskli klasörler için USB engeli ve ek denetim getir; laboratuvar genelinde sert kısıtları ikinci faza bırak.',
        'Introduce USB blocking and extra auditing only for high-risk folders, while leaving stricter lab-wide controls for a second phase.',
        'neutral',
        '🟡 Hedefli sıkılaştırma',
        '🟡 Targeted tightening',
        'Operasyonu daha az zorlar; ancak kültürel ve süreçsel boşluklar tamamen kapanmayabilir.',
        'This is less disruptive operationally, though cultural and process gaps may remain only partly addressed.',
        { score: 10, speed: 6, evidence: 2, coordination: 4, risk: 8 },
        'Scoped Controls'
      )
    ]
  },
  'partner-email': {
    start: [
      extraOption(
        'Talebe kısa bir “resmi doğrulama sonrası döneceğiz” yanıtı ver ve hiçbir veri paylaşmadan bağımsız teyit sürecini başlat.',
        'Reply briefly that you will respond after formal verification, without sharing any data, and start the independent confirmation process.',
        'neutral',
        '🟡 Kontrollü gecikme',
        '🟡 Controlled delay',
        'İlişki tonunu korurken veri riskini azaltır; yine de tam kayıt açma kadar kurumsal güç sağlamaz.',
        'This preserves relationship tone while reducing data risk, though it is not as institutionally strong as opening the full record immediately.',
        { score: 10, speed: 8, evidence: 4, coordination: 4, risk: 8 },
        'Verified Reply'
      )
    ],
    comms: [
      extraOption(
        'Araştırma güvenliği ve veri sahibini hemen dahil et; hukuk/uyum birimini ise ihracat kontrolü veya sözleşme etkisi doğrulanırsa ekle.',
        'Bring in research security and the data owner immediately; add legal/compliance if export-control or contractual impact is confirmed.',
        'neutral',
        '🟡 Aşamalı due diligence',
        '🟡 Staged due diligence',
        'Mantıklı bir orta yol olabilir, ancak bazı kurumsal kontrolleri biraz geç devreye sokar.',
        'This can be a sensible middle path, though some institutional controls are activated a bit later.',
        { score: 8, speed: 6, evidence: 2, coordination: 6, risk: 4 },
        'Phased Review'
      )
    ],
    evidence: [
      extraOption(
        'Önce resmi telefon doğrulamasını tamamla, ardından header analizini ikinci adımda derinleştir.',
        'Complete the official phone verification first, then deepen the header analysis as a second step.',
        'neutral',
        '🟡 Bağlamsal doğrulama',
        '🟡 Context-first verification',
        'Bağımsız doğrulama açısından güçlüdür ama teknik kanıtı gecikmeli tamamladığı için bütüncül yaklaşım kadar iyi değildir.',
        'This is strong from an independent-verification angle, but because technical evidence comes later, it is weaker than the fully integrated approach.',
        { score: 8, speed: 4, evidence: 8, coordination: 4, risk: 6 },
        'Phone Verify'
      )
    ],
    decision: [
      extraOption(
        'Talebi resmi kanaldan yeniden göndermelerini iste, bu vakayı kayıt altına al ve SOP görünürlüğünü artıran kısa bir iç duyuru yap.',
        'Ask them to resubmit through an official channel, record the case, and publish a short internal note that reinforces SOP visibility.',
        'neutral',
        '🟡 Güvenli yeniden yönlendirme',
        '🟡 Safe redirection',
        'İlişkiyi koruyan iyi bir pratik yanıt üretir; ancak tam doğrulanmış paylaşım/ret ayrımı kadar net değildir.',
        'This produces a practical, relationship-preserving response, though it is not as crisp as the full verified-share vs. formal-refusal decision.',
        { score: 12, speed: 6, evidence: 4, coordination: 8, risk: 8 },
        'Channel Reset'
      )
    ]
  },
  'lab-device': {
    start: [
      extraOption(
        'Cihazı internete kapatıp yalnızca yerel laboratuvar ağına bırak, operasyonun etkisini izlerken log toplamayı sürdür.',
        'Block the device from the internet but leave it on the local lab network while monitoring operational impact and continuing log collection.',
        'neutral',
        '🟡 Sınırlı izolasyon',
        '🟡 Limited isolation',
        'Dış trafiği azaltır ama segment içi yayılım ihtimalini tamamen ortadan kaldırmaz.',
        'This reduces outbound risk but does not fully eliminate the possibility of segment-level spread.',
        { score: 10, speed: 8, evidence: 8, coordination: 2, risk: 6 },
        'Vendor Cutoff'
      )
    ],
    comms: [
      extraOption(
        'Biosafety ve cihaz sahibini hemen dahil et; geniş segment taramasını kısa teknik triyaj sonrası başlat.',
        'Involve biosafety and the device owner immediately, then begin the wider segment scan after a short technical triage.',
        'neutral',
        '🟡 Kademeli koordinasyon',
        '🟡 Phased coordination',
        'Operasyonel hassasiyeti tanır; ancak tam ortak karar akışı kadar güçlü bir rol netliği sağlamaz.',
        'This recognizes operational sensitivity, though it does not provide role clarity as strongly as a full shared decision flow.',
        { score: 8, speed: 6, evidence: 2, coordination: 8, risk: 4 },
        'Triage Council'
      )
    ],
    evidence: [
      extraOption(
        'Ağ izi ve bakım geçmişini önce eşleştir, son kullanıcı/teknisyen akışını ikinci dalga incelemeye bırak.',
        'Correlate network traces and maintenance history first, leaving end-user/technician flow to the second wave of review.',
        'neutral',
        '🟡 Kısmi çok kaynaklı analiz',
        '🟡 Partial multi-source review',
        'İyi bir başlangıçtır ama kullanıcı ve değişiklik yönetimi boyutunu geciktirdiği için tam resmi biraz geç tamamlar.',
        'This is a solid start, but it delays the user and change-management dimensions and thus completes the full picture later.',
        { score: 8, speed: 4, evidence: 10, coordination: 2, risk: 4 },
        'Network First'
      )
    ],
    decision: [
      extraOption(
        'Önce vendor erişim kuralları ve değişiklik kaydı zorunluluğunu uygula; segmentasyonu bakım penceresine bağlayarak aşamalı tamamla.',
        'Implement vendor-access rules and mandatory change logging first, then complete segmentation in phases tied to maintenance windows.',
        'neutral',
        '🟡 Aşamalı dayanıklılık',
        '🟡 Phased resilience',
        'Gerçekçi uygulanabilirlik sağlar ama riski daha uzun bir döneme yayarak kapatır.',
        'This improves practical deployability, but it closes risk over a longer period.',
        { score: 12, speed: 6, evidence: 2, coordination: 8, risk: 8 },
        'Phased Hardening'
      )
    ]
  },
  'insider-sharing': {
    start: [
      extraOption(
        'Koordinatörle özel görüşüp paylaşımı dondur, bağlantı alıcılarını kayda geçir ve resmi kaydı toplantı sonrasına bırak.',
        'Meet privately with the coordinator, freeze the share, record the recipient set, and postpone the formal record until after the meeting.',
        'neutral',
        '🟡 Yumuşak fren',
        '🟡 Soft brake',
        'Psikolojik güvenliği korur ama resmi görünürlük ve zaman damgalı kayıt biraz gecikir.',
        'This preserves psychological safety, but formal visibility and time-stamped recording are delayed somewhat.',
        { score: 8, speed: 6, evidence: 6, coordination: 4, risk: 4 },
        'Private Freeze'
      )
    ],
    comms: [
      extraOption(
        'Yönetici, süreç sahibi ve koordinatör arasında küçük bir çekirdek görüşme yap; HR’yi yalnızca ekip iklimi belirgin zarar görürse ekle.',
        'Hold a small core review with management, the process owner, and the coordinator; involve HR only if team climate shows clear damage.',
        'neutral',
        '🟡 Çekirdek değerlendirme',
        '🟡 Core review',
        'Savunmacılığı azaltabilir ama kurum çapındaki öğrenme ve çok boyutlu görünürlük biraz sınırlı kalır.',
        'This may reduce defensiveness, but broader institutional learning and multidimensional visibility remain somewhat limited.',
        { score: 8, speed: 6, evidence: 2, coordination: 6, risk: 4 },
        'Core Circle'
      )
    ],
    evidence: [
      extraOption(
        'Önce alıcı kapsamı ve link erişimlerini doğrula, içerik versiyon analizini ikinci dalga incelemeye bırak.',
        'Confirm recipient scope and link opens first, leaving content-version analysis for a second review wave.',
        'neutral',
        '🟡 Sınırlı bağlam toplama',
        '🟡 Limited context gathering',
        'Kritik maruziyet yönünü hızla netleştirir ama SOP sapmasının tam mekanizmasını daha geç açıklar.',
        'This clarifies the exposure side quickly, but explains the full SOP divergence mechanism later.',
        { score: 8, speed: 6, evidence: 8, coordination: 2, risk: 4 },
        'Recipient Scope'
      )
    ],
    decision: [
      extraOption(
        'Kısa vadede güvenli paylaşım kanalı zorunluluğu getir, ardından acil paylaşım yolu ve eğitim paketini 30 gün içinde tamamla.',
        'Mandate the secure sharing channel in the short term, then finish the urgent-sharing path and training package within 30 days.',
        'neutral',
        '🟡 Aşamalı kültürel düzeltme',
        '🟡 Phased cultural remediation',
        'Pratik ve uygulanabilir bir kapanıştır; ancak tam, eşzamanlı kültürel güçlendirme kadar etkili değildir.',
        'This is practical and deployable, though not as strong as a full simultaneous cultural-strengthening package.',
        { score: 12, speed: 6, evidence: 2, coordination: 8, risk: 8 },
        '30-Day Reset'
      )
    ]
  }
};

function extraOption(trText, enText, tone, trBonus, enBonus, trFeedback, enFeedback, effects, badge) {
  return {
    text: { tr: trText, en: enText },
    tone,
    bonus: { tr: trBonus, en: enBonus },
    feedback: { tr: trFeedback, en: enFeedback },
    effects,
    badge: { tr: badge, en: badge }
  };
}

function enrichScenarioOptions(catalog) {
  catalog.forEach((scenario) => {
    const stageMap = supplementalStageChoices[scenario.id];
    if (!stageMap) return;
    Object.entries(stageMap).forEach(([nodeKey, extras]) => {
      const node = scenario.nodes[nodeKey];
      if (!node || !Array.isArray(node.choices)) return;
      extras.forEach((extra) => node.choices.push(extra));
      node.options.tr = node.choices.map((choice) => choice.text.tr);
      node.options.en = node.choices.map((choice) => choice.text.en);
    });
  });
}

enrichScenarioOptions(scenarioCatalog);

const staticText = {
  tr: {
    eyebrow: 'Türkiye Biosecurity Workshop 2026 • Gamified Simulation',
    title: 'Incident Response: What Would You Do?',
    subtitle: 'Biyogüvenlik ve siber güvenlik ekseninde; kurumsal karar kalitesini, eskalasyon doğruluğunu ve delil bütünlüğünü görünür kılmak için tasarlanmış çok senaryolu, puanlamalı profesyonel workshop demosu.',
    threatLevel: 'Threat Level', mode: 'Mode', scenarios: 'Scenarios', presenter: 'Presenter', dynamic: 'Dynamic', interactivePresentation: 'Interactive Presentation', branchingCases: '5 Branching Cases', presenterName: 'Prof. Dr. Ahmet Altun', openingSlide: 'Opening Slide', closingSlide: 'Closing Slide', scenarioSelection: 'Scenario Selection', chooseScenario: 'Bir senaryo seçin', chooseScenarioDesc: 'Her senaryo 4 aşamalı, çok adımlı ve gerçekçi bir incident simulation akışı içerir. Her aşamada önce bağlamı okur, sonra karar verirsiniz; puan, rozet, süre baskısı ve düzeltme mekanikleri korunur.', toneStandard: 'Standart', toneDramatic: 'Dramatik', toneAcademic: 'Akademik', howToPlay: 'How to Play', gameLogic: 'Oyun mantığı', axes: 'Değerlendirme eksenleri', expectedApproach: 'Beklenen yaklaşım', complete: 'Simulation Complete', completed: 'Senaryo Tamamlandı', shortDebrief: 'Kısa Debrief', branchProgress: 'Branch Progress', branchPath: 'Yol', stageSummaryTitle: 'Aşama Özeti', settingTitle: 'Ortam / Bağlam', currentTitle: 'Mevcut Durum', changedTitle: 'Önceki Kararın Etkisi', developmentsTitle: 'Yeni Gelişmeler ve Bulgular', optionsTitle: 'Şu Anki Seçenekler', score: 'Toplam Skor', stage: 'Aşama', speed: 'Hız', evidence: 'Kanıt Koruma', coordination: 'Koordinasyon', risk: 'Risk Kontrolü', progress: 'Response Progress', whatWouldYouDo: 'Ne yaparsınız?', keyboardHint: '⌨️ 1-5 ile seçim yapabilir, Enter ile ilerleyebilirsiniz.', bonusActive: '🏅 Bonus fırsatı aktif', positive: 'Pozitif Kazanım', negative: 'Riskli Sonuç', neutral: 'Ara Yol / Kısmi Sonuç', timeout: 'Süre Doldu', continue: 'Devam Et', retry: 'Bu aşamayı düzelt', retryPenalty: 'Puan cezası kalır; doğru yolu görürsünüz ama bonus alamazsınız.', start: 'Senaryoyu Başlat', back: 'Geri Dön', backToSelection: 'Senaryo Seçimine Dön', fullscreen: '⛶ Sunum Modu', fullscreenExit: '🡼 Sunum Modundan Çık', presentation: '🎤 Projeksiyon Görünümü', presentationOff: '🧾 Normal Görünüm', soundOn: '🔊 Ses Açık', soundOff: '🔇 Ses Kapalı', lang: '🌐 EN', themeDark: '🌙 Dark', themeLight: '☀️ Light', timer: 'sn', scenarioMeta: '4 aşamalı • puanlamalı • rozetli', onboardingSummary: 'Her senaryo 4 aşamalıdır.|Her aşamada 1 karar verirsiniz.|Doğru seçimler puan ve rozet kazandırır.|Yanlış seçimler risk puanı ve kaliteyi düşürür.', onboardingAxes: 'Hız|Kanıt bütünlüğü|Kurumsal koordinasyon|Risk kontrolü', onboardingExpected: 'Containment + delil koruma dengesi|Doğru eskalasyon|SOP ve governance uyumu|Olaydan öğrenme ve debrief', debrief: ['Containment ile delil bütünlüğü arasında denge kurmak temel başarı ölçütüdür.','Doğru eskalasyon, teknik doğruluk kadar kurumsal güven üretir.','SOP, governance ve audit trail eksikliği iyi teknik kararları bile zayıflatabilir.','Her incident response süreci, debrief ile kurumsal öğrenmeye çevrilmelidir.'], tags: ['Containment', 'Evidence Integrity', 'Institutional Coordination'], noBadge: '😢 Bu turda rozet kazanılamadı', finalHigh: 'Çok güçlü bir performans. Hız, delil bütünlüğü, koordinasyon ve risk kontrolü dengeli ve profesyonel biçimde yönetildi.', finalMid: 'Genel olarak güçlü bir performans. Bazı karar noktalarında yönetişim ve olay sınıflandırması daha da rafine edilebilir.', finalLow: 'Bu senaryoda kritik zafiyetler oluştu. Gecikme, eksik koordinasyon veya delil kaybı olay etkisini büyütmüş olabilir.', elite: 'Elite Response Lead 🏆', mid: 'Operational Coordinator 🧠', low: 'High-Risk Path 😢', liveAlertPrefix: 'Canlı uyarı akışı:'
  },
  en: {
    eyebrow: 'Türkiye Biosecurity Workshop 2026 • Gamified Simulation', title: 'Incident Response: What Would You Do?', subtitle: 'A multi-scenario, scored workshop demo designed to make institutional decision quality, escalation accuracy, and evidence integrity visible at the intersection of biosecurity and cybersecurity.', threatLevel: 'Threat Level', mode: 'Mode', scenarios: 'Scenarios', presenter: 'Presenter', dynamic: 'Dynamic', interactivePresentation: 'Interactive Presentation', branchingCases: '5 Branching Cases', presenterName: 'Prof. Dr. Ahmet Altun', openingSlide: 'Opening Slide', closingSlide: 'Closing Slide', scenarioSelection: 'Scenario Selection', chooseScenario: 'Choose a scenario', chooseScenarioDesc: 'Each scenario is a 4-stage, realistic, multi-step incident simulation. At every step you first absorb the context, then make a decision; scoring, badges, time pressure, and retry mechanics are preserved.', toneStandard: 'Standard', toneDramatic: 'Dramatic', toneAcademic: 'Academic', howToPlay: 'How to Play', gameLogic: 'Game Logic', axes: 'Evaluation Axes', expectedApproach: 'Expected Approach', complete: 'Simulation Complete', completed: 'Scenario Complete', shortDebrief: 'Short Debrief', branchProgress: 'Branch Progress', branchPath: 'Path', stageSummaryTitle: 'Stage Summary', settingTitle: 'Setting / Context', currentTitle: 'Current Situation', changedTitle: 'What Changed From the Previous Choice', developmentsTitle: 'New Developments and Findings', optionsTitle: 'Current Options', score: 'Total Score', stage: 'Stage', speed: 'Speed', evidence: 'Evidence Integrity', coordination: 'Coordination', risk: 'Risk Control', progress: 'Response Progress', whatWouldYouDo: 'What would you do?', keyboardHint: '⌨️ Use 1-5 to select options and Enter to continue.', bonusActive: '🏅 Bonus opportunity active', positive: 'Positive Gain', negative: 'Risk Outcome', neutral: 'Partial / Mixed Outcome', timeout: 'Time Expired', continue: 'Continue', retry: 'Correct this stage', retryPenalty: 'The score penalty stays; you can see the correct path, but you cannot earn the bonus anymore.', start: 'Start Scenario', back: 'Back', backToSelection: 'Return to Scenarios', fullscreen: '⛶ Fullscreen', fullscreenExit: '🡼 Exit Fullscreen', presentation: '🎤 Projection View', presentationOff: '🧾 Normal View', soundOn: '🔊 Sound On', soundOff: '🔇 Sound Off', lang: '🌐 TR', themeDark: '🌙 Dark', themeLight: '☀️ Light', timer: 'sec', scenarioMeta: '4 stages • scored • badge-based', onboardingSummary: 'Each scenario has 4 stages.|You make 1 decision at each stage.|Correct choices earn points and badges.|Poor choices reduce risk performance and quality.', onboardingAxes: 'Speed|Evidence integrity|Institutional coordination|Risk control', onboardingExpected: 'Balance containment and evidence preservation|Correct escalation|SOP and governance alignment|Learning and debrief', debrief: ['Balancing containment and evidence integrity is a core success metric.','Correct escalation builds institutional trust as much as technical accuracy.','Weak SOP, governance, and audit trail design can undermine otherwise good technical decisions.','Every incident response process should be converted into institutional learning through debrief.'], tags: ['Containment', 'Evidence Integrity', 'Institutional Coordination'], noBadge: '😢 No badges were earned in this round', finalHigh: 'A very strong performance. Speed, evidence integrity, coordination, and risk control were managed in a balanced and professional way.', finalMid: 'Overall a strong performance. Governance and incident classification could be refined further at some decision points.', finalLow: 'Critical weaknesses emerged in this scenario. Delay, poor coordination, or evidence loss may have amplified the impact.', elite: 'Elite Response Lead 🏆', mid: 'Operational Coordinator 🧠', low: 'High-Risk Path 😢', liveAlertPrefix: 'Live alert feed:'
  }
};

const initialState = () => ({ scenario:null, current:null, stage:1, score:0, speed:50, evidence:50, coordination:50, risk:50, trophies:[], history:[], lockedRewardNodes:{} });
let state = initialState(); let pendingNext = null; let timer = null; let timeLeft = 30; let soundEnabled = true; let currentLanguage = 'tr'; let currentTheme = 'dark'; let currentTone = 'standard';
const $ = (id) => document.getElementById(id);
const scenarioScreen = $('scenario-screen'), onboardingScreen = $('onboarding-screen'), gameScreen = $('game-screen'), endScreen = $('end-screen');
const scenarioList = $('scenario-list'), restartBtn = $('restart-btn'), nextBtn = $('next-btn'), retryBtn = $('retry-btn'), fullscreenBtn = $('fullscreen-btn'), presentationBtn = $('presentation-btn'), languageBtn = $('language-btn'), toneBtn = $('tone-btn'), soundBtn = $('sound-btn'), themeBtn = $('theme-btn'), onboardingStartBtn = $('onboarding-start-btn'), onboardingBackBtn = $('onboarding-back-btn');
const onboardingScenarioTitle = $('onboarding-scenario-title'), onboardingScenarioSummary = $('onboarding-scenario-summary'), nodeTitle = $('node-title'), nodeText = $('node-text'), choicesEl = $('choices'), feedbackPanel = $('feedback-panel'), feedbackText = $('feedback-text'), feedbackEmoji = $('feedback-emoji'), feedbackHeading = $('feedback-heading'), rewardStrip = $('reward-strip');
const scoreEl = $('score'), stageEl = $('stage'), speedEl = $('speed'), evidenceEl = $('evidence'), coordinationEl = $('coordination'), riskEl = $('risk'), progressFill = $('progress-fill'), progressText = $('progress-text'), branchProgress = $('branch-progress'), alertText = $('alert-text'), streakBadge = $('streak-badge'), scenarioName = $('scenario-name'), timerBadge = $('timer-badge'), finalSummary = $('final-summary'), finalScores = $('final-scores'), finalBadge = $('final-badge'), trophyCase = $('trophy-case'), debriefList = $('debrief-list');
const settingText = $('setting-text'), currentText = $('current-text'), changedText = $('changed-text'), developmentsList = $('developments-list'), optionsList = $('options-list');
function t(){ return staticText[currentLanguage]; } function clamp(v){ return Math.max(0, Math.min(100, v)); } function tr(v){ return v?.[currentLanguage] ?? v?.tr ?? v; }
function toneText(value, type='body'){ if(value == null) return value; if(Array.isArray(value)) return value.map((item)=>toneText(item, type)); if(typeof value !== 'string' || currentTone === 'standard') return value; const isTr = currentLanguage === 'tr'; if(currentTone === 'dramatic'){ const prefixMap = isTr ? { title:'⚠️ ', summary:'Gerilim yükseliyor: ', alert:'ACİL // ', feedback:'Sahadaki sonuç: ', option:'Karar noktası: ', label:'Dramatik • ', body:'Baskı artıyor: ' } : { title:'⚠️ ', summary:'Tension rising: ', alert:'URGENT // ', feedback:'Field outcome: ', option:'Decision point: ', label:'Dramatic • ', body:'Pressure is building: ' }; return `${prefixMap[type] || prefixMap.body}${value}`; } const prefixMap = isTr ? { title:'Analitik çerçeve — ', summary:'Akademik özet: ', alert:'Operasyonel sinyal // ', feedback:'Değerlendirme: ', option:'Yanıt seçeneği: ', label:'Akademik • ', body:'Analitik not: ' } : { title:'Analytical framing — ', summary:'Academic summary: ', alert:'Operational signal // ', feedback:'Assessment: ', option:'Response option: ', label:'Academic • ', body:'Analytical note: ' }; return `${prefixMap[type] || prefixMap.body}${value}`; }
function toneButtonLabel(){ const key = currentTone === 'dramatic' ? 'toneDramatic' : currentTone === 'academic' ? 'toneAcademic' : 'toneStandard'; return `${currentLanguage === 'tr' ? '🎭 Ton:' : '🎭 Tone:'} ${t()[key]}`; }
function beep(type='positive'){ if(!soundEnabled) return; try{ const ctx = new (window.AudioContext||window.webkitAudioContext)(); const osc=ctx.createOscillator(); const gain=ctx.createGain(); osc.type='sine'; osc.frequency.value=type==='positive'?880:220; gain.gain.value=0.03; osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+0.12);}catch{} }
function showScreen(screen){ [scenarioScreen,onboardingScreen,gameScreen,endScreen].forEach((el)=>el.classList.remove('active')); screen.classList.add('active'); }
function updateTheme(){ document.body.classList.toggle('light-theme', currentTheme==='light'); themeBtn.textContent = currentTheme==='dark' ? t().themeLight : t().themeDark; }
function updateTimerBadge(){ timerBadge.textContent = `⏱ ${timeLeft} ${t().timer}`; timerBadge.classList.toggle('warning', timeLeft<=10); }
function renderScenarioList(){ scenarioList.innerHTML=''; scenarioCatalog.forEach((scenario,index)=>{ const card=document.createElement('button'); card.className=`scenario-card accent-${scenario.accent}`; card.innerHTML=`<div class="scenario-card-top"><span class="scenario-pill">Scenario 0${index+1}</span><span class="scenario-arrow">→</span></div><h3>${toneText(tr(scenario.name), 'title')}</h3><p>${toneText(tr(scenario.summary), 'summary')}</p><div class="scenario-meta">${toneText(t().scenarioMeta, 'label')}</div>`; card.addEventListener('click',()=>openOnboarding(scenario.id)); scenarioList.appendChild(card); }); }
function openOnboarding(id){ state = initialState(); state.scenario = scenarioCatalog.find((s)=>s.id===id); onboardingScenarioTitle.textContent = toneText(tr(state.scenario.name), 'title'); onboardingScenarioSummary.textContent = toneText(tr(state.scenario.summary), 'summary'); showScreen(onboardingScreen); }
function startScenario(){ state.current='start'; scenarioName.textContent = toneText(tr(state.scenario.name), 'title'); showScreen(gameScreen); renderNode(); }
function renderBranchProgress(){ const labels={ tr:['İlk Alarm','Eskalasyon','Delil','Stratejik Kapanış'], en:['Initial Alert','Escalation','Evidence','Strategic Closure'] }; branchProgress.innerHTML=''; labels[currentLanguage].forEach((label,idx)=>{ const step=document.createElement('div'); const stepNumber=idx+1; let cls='branch-step'; let note=currentLanguage==='tr'?'Henüz işlenmedi':'Not reached yet'; if(stepNumber<state.stage){ cls+=' done'; const hist=state.history[idx]; const positive=hist?.tone==='positive'; if(!positive) cls+=' bad'; note = hist?.recovered ? (currentLanguage==='tr'?'Düzeltildi, bonus kilitli':'Recovered, bonus locked') : positive ? (currentLanguage==='tr'?'Olumlu yol seçildi':'Positive path selected') : (currentLanguage==='tr'?'Riskli yol seçildi':'Risk path selected'); } else if(stepNumber===state.stage){ cls+=' active'; note=currentLanguage==='tr'?'Şu an bu aşamadasınız':'You are here now'; } step.className=cls; step.innerHTML=`<span class="branch-step-title">${stepNumber}. ${label}</span><span class="branch-step-note">${note}</span>`; branchProgress.appendChild(step); }); }
function renderStats(){ scoreEl.textContent=state.score; stageEl.textContent=state.stage; speedEl.textContent=state.speed; evidenceEl.textContent=state.evidence; coordinationEl.textContent=state.coordination; riskEl.textContent=state.risk; progressFill.style.width=`${Math.min((state.stage/4)*100,100)}%`; progressText.textContent=`${state.stage} / 4`; streakBadge.textContent = state.trophies.length ? `🏅 ${toneText(tr(state.trophies[state.trophies.length-1]), 'label')}` : toneText(t().bonusActive, 'label'); renderBranchProgress(); }
function startTimer(){ clearInterval(timer); timeLeft=30; updateTimerBadge(); timer=setInterval(()=>{ timeLeft-=1; updateTimerBadge(); if(timeLeft<=0){ clearInterval(timer); const node=state.scenario.nodes[state.current]; const firstNegative=node.choices.find((c)=>c.tone==='negative')||node.choices[0]; handleChoice(firstNegative,true); } },1000); }
function changedTextForNode(node){ if(node.changedByTone && state.history.length){ const prior = state.history[state.history.length-1].tone === 'positive' ? 'positive':'negative'; return toneText(tr(node.changedByTone[prior]), 'body'); } return toneText(tr(node.changed) || (currentLanguage==='tr'?'Önceki aşama kararı sonrasındaki etkiler bu noktada görünür hale gelecek.':'The impact of the previous-stage choice will become visible at this point.'), 'body'); }
function renderNode(){ const node=state.scenario.nodes[state.current]; nodeTitle.textContent = toneText(tr(node.title), 'title'); nodeText.textContent = toneText(tr(node.text), 'body'); alertText.textContent = toneText(`${t().liveAlertPrefix} ${tr(node.alert)}`, 'alert'); settingText.textContent = toneText(tr(node.setting), 'body'); currentText.textContent = toneText(tr(node.current), 'body'); changedText.textContent = changedTextForNode(node); developmentsList.innerHTML = tr(node.developments).map((item)=>`<li>${toneText(item, 'body')}</li>`).join(''); optionsList.innerHTML = tr(node.options).map((item)=>`<li>${toneText(item, 'option')}</li>`).join(''); choicesEl.innerHTML=''; feedbackPanel.classList.add('hidden'); retryBtn.classList.add('hidden'); pendingNext=null; choicesEl.className = `choices choices-count-${Math.min(node.choices.length, 5)}`; node.choices.forEach((choice,index)=>{ const btn=document.createElement('button'); btn.className=`choice-btn ${choice.tone}`; btn.innerHTML=`<span class="choice-index">${String(index+1).padStart(2,'0')}</span><span class="choice-copy">${toneText(tr(choice.text), 'option')}</span>`; btn.addEventListener('click',()=>handleChoice(choice)); choicesEl.appendChild(btn); }); renderStats(); startTimer(); }
function handleChoice(choice, autoSelected=false){ clearInterval(timer); const rewardLocked = !!state.lockedRewardNodes[state.current]; const deltas = ['score','speed','evidence','coordination','risk'].reduce((acc,key)=>{ acc[key] = rewardLocked && choice.tone==='positive' ? 0 : (choice.effects[key]||0); return acc; },{}); state.score += deltas.score; state.speed=clamp(state.speed+deltas.speed); state.evidence=clamp(state.evidence+deltas.evidence); state.coordination=clamp(state.coordination+deltas.coordination); state.risk=clamp(state.risk+deltas.risk); if(choice.tone==='positive'){ if(!rewardLocked) state.trophies.push(choice.badge); feedbackEmoji.textContent = rewardLocked ? '👀✅' : '🏅✨😎'; feedbackHeading.textContent = t().positive; rewardStrip.className='reward-strip positive'; rewardStrip.innerHTML = rewardLocked ? `<span>+ ${currentLanguage==='tr'?'Yol düzeltildi':'Path corrected'}</span><strong>${t().retryPenalty}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>` : `<span>+ ${currentLanguage==='tr'?'Bonus':'Bonus'}</span><strong>${toneText(tr(choice.bonus), 'label')}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>`; beep('positive'); } else if(choice.tone==='neutral'){ feedbackEmoji.textContent = autoSelected ? '⏰🟡📌' : '🟡🤔📌'; feedbackHeading.textContent = autoSelected ? t().timeout : t().neutral; rewardStrip.className='reward-strip neutral'; rewardStrip.innerHTML = `<span>± ${currentLanguage==='tr'?'Ara sonuç':'Mixed result'}</span><strong>${autoSelected ? (currentLanguage==='tr'?'⏱ Süre aşımı nedeniyle otomatik seçim':'⏱ Auto-selected after timeout') : toneText(tr(choice.bonus), 'label')}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>`; if(!autoSelected) retryBtn.classList.remove('hidden'); state.lockedRewardNodes[state.current]=true; beep('negative'); } else { feedbackEmoji.textContent = autoSelected ? '⏰😢💧' : '😢🙃💧'; feedbackHeading.textContent = autoSelected ? t().timeout : t().negative; rewardStrip.className='reward-strip negative'; rewardStrip.innerHTML = `<span>− ${currentLanguage==='tr'?'Kayıp':'Loss'}</span><strong>${autoSelected ? (currentLanguage==='tr'?'⏱ Süre aşımı nedeniyle otomatik seçim':'⏱ Auto-selected after timeout') : toneText(tr(choice.bonus), 'label')}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>`; if(!autoSelected) retryBtn.classList.remove('hidden'); state.lockedRewardNodes[state.current]=true; beep('negative'); }
  feedbackText.textContent = toneText(tr(choice.feedback), 'feedback'); feedbackPanel.classList.remove('hidden'); const idx=state.history.findIndex((x)=>x.node===state.current); const entry={ node:state.current, tone:choice.tone, badge:choice.badge, recovered:rewardLocked }; if(idx>=0) state.history[idx]=entry; else state.history.push(entry); pendingNext = choice.next; [...choicesEl.querySelectorAll('button')].forEach((btn)=>btn.disabled=true); renderStats(); }
function finishGame(){ showScreen(endScreen); const avg=Math.round((state.speed+state.evidence+state.coordination+state.risk)/4); let badge=t().low, verdict=t().finalLow; if(avg>=80 && state.score>=80){ badge=t().elite; verdict=t().finalHigh; } else if(avg>=60){ badge=t().mid; verdict=t().finalMid; } finalBadge.textContent=`${toneText(tr(state.scenario.name), 'title')} • ${badge}`; finalSummary.textContent=toneText(verdict, 'feedback'); finalScores.innerHTML=`<div class="meter"><span>${t().score}</span><strong>${state.score}</strong></div><div class="meter"><span>${t().speed}</span><strong>${state.speed}</strong></div><div class="meter"><span>${t().evidence}</span><strong>${state.evidence}</strong></div><div class="meter"><span>${t().coordination}</span><strong>${state.coordination}</strong></div><div class="meter"><span>${t().risk}</span><strong>${state.risk}</strong></div>`; debriefList.innerHTML = t().debrief.map((item)=>`<li>${toneText(item, 'body')}</li>`).join(''); trophyCase.innerHTML=''; if(state.trophies.length){ state.trophies.forEach((badge)=>{ const item=document.createElement('div'); item.className='trophy-item'; item.textContent=`🏅 ${toneText(tr(badge), 'label')}`; trophyCase.appendChild(item); }); } else { const item=document.createElement('div'); item.className='trophy-item muted'; item.textContent=t().noBadge; trophyCase.appendChild(item); } }
function applyStaticText(){ $('eyebrow').textContent=toneText(t().eyebrow, 'label'); $('hero-title').textContent=toneText(t().title, 'title'); $('hero-subtitle').textContent=toneText(t().subtitle, 'summary'); $('threat-label').textContent=t().threatLevel; $('mode-label').textContent=t().mode; $('scenarios-label').textContent=t().scenarios; $('presenter-label').textContent=t().presenter; $('threat-value').textContent=toneText(t().dynamic, 'label'); $('mode-value').textContent=toneText(t().interactivePresentation, 'label'); $('scenarios-value').textContent=t().branchingCases; $('presenter-value').textContent=t().presenterName; $('opening-slide-label').textContent=t().openingSlide; if ($('info-chip-1')) $('info-chip-1').textContent=currentLanguage==='tr'?'Bilgi Paneli':'Information Panel'; if ($('info-chip-2')) $('info-chip-2').textContent=currentLanguage==='tr'?'Bilgi Paneli':'Information Panel'; if ($('info-chip-3')) $('info-chip-3').textContent=currentLanguage==='tr'?'Bilgi Paneli':'Information Panel'; $('scenario-kicker').textContent=t().scenarioSelection; $('choose-scenario-title').textContent=t().chooseScenario; $('choose-scenario-desc').textContent=toneText(t().chooseScenarioDesc, 'summary'); $('onboarding-kicker').textContent=t().howToPlay; $('onboarding-logic-title').textContent=t().gameLogic; $('onboarding-axes-title').textContent=t().axes; $('onboarding-expected-title').textContent=t().expectedApproach; $('complete-kicker').textContent=t().complete; $('completed-title').textContent=t().completed; $('debrief-title').textContent=t().shortDebrief; $('branch-progress-label').textContent=t().branchProgress; $('branch-path-label').textContent=t().branchPath; $('stage-summary-title').textContent=t().stageSummaryTitle; $('setting-title').textContent=t().settingTitle; $('current-title').textContent=t().currentTitle; $('changed-title').textContent=t().changedTitle; $('developments-title').textContent=t().developmentsTitle; $('options-title').textContent=t().optionsTitle; $('score-label').textContent=t().score; $('stage-label').textContent=t().stage; $('speed-label').textContent=t().speed; $('evidence-label').textContent=t().evidence; $('coordination-label').textContent=t().coordination; $('risk-label').textContent=t().risk; $('progress-label').textContent=t().progress; $('choice-title').textContent=t().whatWouldYouDo; $('keyboard-hint').textContent=t().keyboardHint; $('feedback-tag-1').textContent=t().tags[0]; $('feedback-tag-2').textContent=t().tags[1]; $('feedback-tag-3').textContent=t().tags[2]; $('closing-slide-label').textContent=t().closingSlide; $('onboarding-logic-list').innerHTML=t().onboardingSummary.split('|').map((x)=>`<li>${toneText(x, 'body')}</li>`).join(''); $('onboarding-axes-list').innerHTML=t().onboardingAxes.split('|').map((x)=>`<li>${toneText(x, 'body')}</li>`).join(''); $('onboarding-expected-list').innerHTML=t().onboardingExpected.split('|').map((x)=>`<li>${toneText(x, 'body')}</li>`).join(''); nextBtn.textContent=t().continue; retryBtn.textContent=t().retry; onboardingStartBtn.textContent=t().start; onboardingBackBtn.textContent=t().back; restartBtn.textContent=t().backToSelection; fullscreenBtn.textContent=document.fullscreenElement?t().fullscreenExit:t().fullscreen; presentationBtn.textContent=document.body.classList.contains('presentation-mode')?t().presentationOff:t().presentation; soundBtn.textContent=soundEnabled?t().soundOn:t().soundOff; languageBtn.textContent=t().lang; toneBtn.textContent=toneButtonLabel(); updateTheme(); updateTimerBadge(); renderScenarioList(); if(state.scenario){ onboardingScenarioTitle.textContent=toneText(tr(state.scenario.name), 'title'); onboardingScenarioSummary.textContent=toneText(tr(state.scenario.summary), 'summary'); scenarioName.textContent=toneText(tr(state.scenario.name), 'title'); if(gameScreen.classList.contains('active')) renderNode(); if(endScreen.classList.contains('active')) finishGame(); } }
nextBtn.addEventListener('click',()=>{ if(!pendingNext) return; if(pendingNext==='end'){ finishGame(); return; } state.current=pendingNext; state.stage+=1; renderNode(); });
restartBtn.addEventListener('click',()=>{ state=initialState(); showScreen(scenarioScreen); applyStaticText(); }); onboardingStartBtn.addEventListener('click',startScenario); onboardingBackBtn.addEventListener('click',()=>{ state=initialState(); showScreen(scenarioScreen); applyStaticText(); }); fullscreenBtn.addEventListener('click', async()=>{ try{ if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); applyStaticText(); } catch{} }); document.addEventListener('fullscreenchange',applyStaticText); presentationBtn.addEventListener('click',()=>{ document.body.classList.toggle('presentation-mode'); applyStaticText(); }); languageBtn.addEventListener('click',()=>{ currentLanguage = currentLanguage==='tr'?'en':'tr'; applyStaticText(); }); toneBtn.addEventListener('click',()=>{ currentTone = currentTone==='standard' ? 'dramatic' : currentTone==='dramatic' ? 'academic' : 'standard'; applyStaticText(); }); soundBtn.addEventListener('click',()=>{ soundEnabled=!soundEnabled; applyStaticText(); }); themeBtn.addEventListener('click',()=>{ currentTheme = currentTheme==='dark'?'light':'dark'; applyStaticText(); }); retryBtn.addEventListener('click',()=>{ const node=state.scenario.nodes[state.current]; const positive=node.choices.find((c)=>c.tone==='positive')||node.choices[0]; handleChoice(positive); }); document.addEventListener('keydown',(e)=>{ if(!gameScreen.classList.contains('active')) return; if(feedbackPanel.classList.contains('hidden')){ if(['1','2','3','4','5'].includes(e.key)){ const btns=[...choicesEl.querySelectorAll('button:not([disabled])')]; btns[Number(e.key)-1]?.click(); } } else if(e.key==='Enter'){ nextBtn.click(); } });
applyStaticText(); showScreen(scenarioScreen);
