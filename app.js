const scenarioCatalog = [
  {
    id: 'after-hours-access',
    accent: 'orange',
    name: { tr: 'Gece Yarısı Kimlik Ele Geçirme', en: 'Midnight Credential Compromise' },
    summary: {
      tr: 'Kıdemli araştırmacının kimlik bilgileriyle BSL-2+ gain-of-function protokollerine gece yarısı erişim; MFA fatigue saldırısı, 218 MB\'lık staging artefaktı ve federal bildirim eşiği.',
      en: 'Senior researcher credentials used to access BSL-2+ gain-of-function protocols at 2 AM; MFA-fatigue attack, 218 MB staging artifact, and federal notification threshold.'
    },
    nodes: {
      start: stage({
        alert: ['SOC, Dr. Nilsson\'ın hesabıyla BSL-2+ patojenik araştırma sunucusunda 02:13-02:47 arasında şüpheli aktivite tespit etti — Dr. Nilsson şu an Cenevre\'de.', 'SOC detected suspicious activity on the BSL-2+ pathogen research server using Dr. Nilsson\'s credentials between 02:13 and 02:47 — Dr. Nilsson is currently in Geneva.'],
        title: ['Aşama 1 — İlk Alarm, Gain-of-Function Kapsamı ve Delil Penceresi', 'Stage 1 — Initial Alert, Gain-of-Function Scope, and the Evidence Window'],
        text: ['Enstitünün kıdemli viroloji araştırmacısı Dr. Nilsson, WHO toplantısı için Cenevre\'de olduğu pazar gecesi 02:13\'te Kuala Lumpur kaynaklı bir IP adresiyle VPN oturumu açılmış. On iki dakikada "H5N1_EnhancedTransmissibility_2025", "GainOfFunction_MouseStudies" ve "DSO_Kapsamı_Kısıtlı" klasörlerinde 847 dosyanın meta verisi taranmış; 11 dosya açılmış. Bu dosyalar Ulusal Bilim Akademisi Biyogüvenlik Kurulu\'na (NSABB) bildirilen ve onay süreci devam eden gain-of-function araştırmalarını içeriyor. VPN bağlantısından 6 saat önce Dr. Nilsson konferansın Wi-Fi ağında sunum hazırlarken art arda 4 MFA push bildirimi almış — üçüncüsü "yorgunluk" nedeniyle kabul edilmiş olabilir. DLP büyük indirim kaydetmemiş; ama oturum sırasında geçici bir arşiv oluşturulup silinmiş.', 'Senior virologist Dr. Nilsson is in Geneva for a WHO meeting. At 02:13 Sunday night, a VPN session opened using her credentials from a Kuala Lumpur IP. In twelve minutes, 847 file metadata items were enumerated across three folders including "H5N1_EnhancedTransmissibility_2025" and "DSO_Scope_Restricted"; 11 files were opened. These contain gain-of-function research submitted to the National Academies Biosecurity Board (NSABB) with approval still pending. Six hours earlier, Dr. Nilsson received four consecutive MFA push prompts on the conference Wi-Fi — the third may have been accepted due to fatigue. DLP recorded no large download, but a temporary archive was created and deleted during the session.'],
        setting: ['Pazar gecesi 02:13. Dr. Nilsson Cenevre\'de sabah 05:13. Nöbetçi sistem yöneticisi evde, IR lideri çağrılabilir. BSL-2+ veri sınıflandırması otomatik olay kaydı tetikledi — aynı zamanda federal bildirim yükümlülüğü doğabilir.', 'Sunday 02:13. Dr. Nilsson is in Geneva at 05:13 local. The duty sysadmin is home; the IR lead can be called in. The BSL-2+ classification triggered an automatic incident record — a federal notification obligation may also arise.'],
        current: ['VPN oturumu hâlâ açık. Erişilen 11 dosyadan 3\'ü NSABB onaylamamış gain-of-function protokollerini içeriyor. Kuala Lumpur IP\'si geçmiş 6 aylık tehdit akışında yok. Silinen geçici arşiv, staging davranışına işaret ediyor.', 'The VPN session is still open. Three of the 11 accessed files contain NSABB-pending gain-of-function protocols. The Kuala Lumpur IP is absent from six months of threat feeds. The deleted temp archive points to staging behavior.'],
        changed: ['Bu ilk aşama olduğu için önceki karar etkisi yok; ancak gain-of-function ve NSABB boyutu, ilk on dakikayı olağandışı biçimde kritik kılıyor.', 'This is the first stage; however, the gain-of-function and NSABB dimensions make the first ten minutes unusually critical.'],
        developments: [
          ['IAM paneli, Hollanda\'dan başarısız denemenin hemen ardından Kuala Lumpur\'dan başarılı bağlantı görüyor — iki lokasyon arasında 14 dakika; doğrusal seyahat imkânsız.', '"GF_Protocol_Archive_TEMP.7z" adlı 218 MB\'lık geçici dosya 02:19\'da oluşturulup 02:23\'te silinmiş; zaman damgası VPN oturumuyla örtüşüyor.', 'Dr. Nilsson\'ın araştırma grubundan iki başka hesap da aynı gece MFA fatigue saldırısı almış ama reddetmiş — koordineli bir kampanyaya işaret ediyor.'],
          ['IAM shows a successful Kuala Lumpur login immediately after a failed Netherlands attempt — 14-minute gap between locations; linear travel is impossible.', 'A temp file "GF_Protocol_Archive_TEMP.7z" (218 MB) was created at 02:19 and deleted at 02:23 — timestamp overlaps with the VPN session.', 'Two other accounts in Dr. Nilsson\'s research group received MFA fatigue pushes the same night but rejected them — suggesting a coordinated campaign targeting the group.']
        ],
        options: [
          ['Hesabı ve aktif VPN oturumunu kontrollü izole et, canlı artefaktları koru, NSABB kapsamı nedeniyle araştırma güvenliği liderliğini paralel uyar ve Dr. Nilsson\'a bağımsız kanal üzerinden ulaş.', 'Controlled-isolate the account and active VPN session, preserve live artifacts, simultaneously notify research security leadership due to NSABB scope, and reach Dr. Nilsson through an independent channel.'],
          ['Dr. Nilsson\'ı hemen ara, parolasını uzaktan sıfırlamasını söyle ve sabah teknik ekiple incele.', 'Call Dr. Nilsson immediately, ask her to reset her password remotely, and investigate with the technical team in the morning.'],
          ['Otomasyon false positive olabilir — iş saatlerinde incelemenin riski düşük; oturumu açık bırak, izle.', 'This may be an automated false positive — waiting for business hours seems low risk; leave the session open and monitor.']
        ],
        choices: [
          choice('positive', '⚡ Erken containment + NSABB uyarısı', '⚡ Early containment + NSABB alert', 'Mükemmel başlangıç. Gain-of-function protokollerine yetkisiz erişim riski kontrol altına alındı. Araştırma güvenliği liderliğinin paralel uyarılması NSABB bildirim penceresini açık tutuyor. Canlı artefakt korundu.', 'Excellent start. Risk to gain-of-function protocols was contained. Parallel notification of research security leadership keeps the NSABB notification window open. Live artifacts are preserved.', { score: 25, speed: 12, evidence: 15, coordination: 8, risk: 14 }, 'Containment Pro', 'comms'),
          choice('negative', '😢 Staging artefaktı ve NSABB penceresi kaybı', '😢 Staging artifact and NSABB window loss', 'İyi niyetli ama kritik hata. Uzaktan parola sıfırlaması staging artefaktını ve canlı oturum verisini bozuyor; NSABB bildirim yükümlülüğü gecikerek hukuki risk oluşturuyor.', 'Well-intentioned but critical error. A remote password reset destroys staging artifacts and live session data; the NSABB notification obligation is delayed creating legal exposure.', { score: -12, speed: 4, evidence: -18, coordination: -4, risk: -8 }, 'Evidence Lost', 'comms'),
          choice('negative', '😢 Aktif tehdit aktörüne pencere', '😢 Open window for active threat actor', 'Koordineli MFA fatigue kampanyasında "bekle ve izle" yaklaşımı, aktif tehdit aktörüne gain-of-function protokollerini staging ve aktarım için saatler kazandırıyor. Bu verinin kötü aktöre geçmesinin sonuçları tersine çevrilemez.', 'In a coordinated MFA-fatigue campaign, "wait and monitor" gives the active threat actor hours to stage and exfiltrate gain-of-function protocols. The consequences of this data reaching a bad actor are irreversible.', { score: -20, speed: -18, evidence: -6, coordination: -8, risk: -18 }, 'Late Response', 'comms')
        ]
      }),
      comms: stage({
        alert: ['NSABB kapsamlı araştırma etkilendi; araştırma güvenliği, hukuk ve kurumsal liderlik bildirim bekliyor.', 'NSABB-scoped research was accessed; research security, legal, and institutional leadership are awaiting notification.'],
        title: ['Aşama 2 — Eskalasyon, Federal Yükümlülük ve Paydaş Hizalaması', 'Stage 2 — Escalation, Federal Obligation, and Stakeholder Alignment'],
        text: ['İlk teknik inceleme, erişilen dosyalar arasında NSABB bildirimi gerektiren gain-of-function araştırmalarının bulunduğunu netleştirdi. Bu durum olayı standart bir kimlik bilgisi güvenlik açığından farklı bir seviyeye taşıyor: federal mevzuat kapsamında bildirim yükümlülüğü, Horizon Avrupa hibe sözleşmesi uyumluluk riskleri ve araştırmacı itibarı aynı anda yönetilmesi gereken boyutlar. Araştırma grubu, Cenevre\'den habersiz, sabah laboratuvara gelip ne olduğunu soruyor.', 'Initial technical review confirms gain-of-function files requiring NSABB notification were accessed. This elevates the incident beyond a standard credential compromise: federal reporting obligations, Horizon Europe grant compliance risks, and researcher reputation now all require simultaneous management. The research group is arriving at the lab in the morning unaware.'],
        setting: ['Pazar 04:30. Araştırma güvenliği DSO koordinatörünün hafta sonu hattı var. Hukuk birimi, dış bildirimlere dair sözleşme kontrolü için devreye alınabilir. Horizon Avrupa ortakları sabah veri güncellemesi bekliyor.', 'Sunday 04:30. The research security DSO coordinator has a weekend line. Legal can review external notification obligations. Horizon Europe partners are expecting a data update in the morning.'],
        current: ['NSABB bildirimi gerektiren 3 araştırma dosyasına yetkisiz erişim şüphesi. Hukuk birimi 72 saatlik federal bildirim penceresinin başlayıp başlamadığını sorgular durumda. Horizon Avrupa ortakları da etkilenebilir.', 'Suspected unauthorized access to 3 NSABB-reportable research files. Legal is questioning whether the 72-hour federal notification window has started. Horizon Europe partners may also be affected.'],
        changedByTone: {
          positive: ['Zamanlı izolasyon ve paralel NSABB uyarısı sayesinde koordinasyon zemini temiz. Eskalasyon zinciri bilgilendirilmiş bağlamda çalışıyor.', 'Timely isolation and parallel NSABB alert mean the coordination foundation is solid. The escalation chain has informed context to work with.'],
          negative: ['Önceki gecikmeli veya bozucu karar yüzünden olay penceresi bulanık; NSABB bildirim saati hem ne zaman başladığı hem de ne kadar kaldığı sorgulanıyor.', 'The prior delayed or disruptive decision has blurred the incident window; the NSABB notification clock\'s start time and remaining duration are now in question.']
        },
        developments: [
          ['Araştırma güvenliği ofisi, DSO kapsamındaki gain-of-function protokollerinin yetkisiz maruziyetinin 72 saatlik federal bildirim penceresi açabileceğini bildiriyor.', 'SOC, Kuala Lumpur IP\'sinin üç ay önce başka bir araştırma üniversitesinin VPN altyapısına karşı credential stuffing kampanyasında kullanıldığını belirledi.', 'Horizon Avrupa hibe sözleşmesi, ortakların paylaştığı veride güvenlik ihlali durumunda 48 saatlik bildirim yükümlülüğü öngörüyor.'],
          ['Research security warns that unauthorized exposure of DSO-scoped gain-of-function protocols may trigger a 72-hour federal notification window.', 'SOC identified the Kuala Lumpur IP as previously used in a credential-stuffing campaign against another research university\'s VPN three months ago.', 'The Horizon Europe grant agreement requires 48-hour notification if partner-shared data was compromised.']
        ],
        options: [
          ['IT/SOC, araştırma güvenliği, DSO koordinatörü, ilgili yönetici ve hukuk birimini dahil ederek yapılandırılmış eskalasyon yürüt; federal bildirim penceresini ve Horizon yükümlülüklerini takibe al.', 'Run structured escalation involving IT/SOC, research security, DSO coordinator, management, and legal; track the federal notification window and Horizon obligations.'],
          ['Teknik ekip önce kapsamı netleştirsin; DSO koordinatörünü ve hukuku yarına bırak.', 'Let the technical team clarify scope first; defer the DSO coordinator and legal until tomorrow.'],
          ['Tüm araştırma personeline "saldırı oldu" içerikli geniş duyuru geç.', 'Issue a broad "we were attacked" announcement to all research staff.']
        ],
        choices: [
          choice('positive', '🏅 Federal farkındalıklı eskalasyon', '🏅 Federally-aware escalation', 'Profesyonel yaklaşım. DSO boyutu tanındı, federal bildirim penceresi takibe alındı, doğru paydaşlar zamanında bilgilendirildi ve spekülasyon yerine kontrollü koordinasyon başladı.', 'Professional approach. DSO dimension was recognized, federal notification window tracked, right stakeholders timely informed, and controlled coordination replaced speculation.', { score: 22, speed: 10, evidence: 4, coordination: 20, risk: 10 }, 'Chain Commander', 'evidence'),
          choice('negative', '😢 Federal yükümlülük riski', '😢 Federal obligation risk', 'Teknik kapsamı önce netleştirme mantıklı görünse de DSO koordinatörü ve hukuku ertelemek federal bildirim penceresini farkında olmadan kaçırmaya neden olabilir.', 'Clarifying scope first seems logical, but deferring the DSO coordinator and legal may inadvertently miss the federal notification window.', { score: -10, speed: 0, evidence: 0, coordination: -18, risk: -8 }, 'Loose Comms', 'evidence'),
          choice('negative', '😢 Erken panik, delil kirliliği', '😢 Early panic, evidence contamination', 'Hedefsiz geniş duyuru gereksiz panik üretiyor, potansiyel diğer hesap sahiplerini uyararak tehdit aktörünün davranışını değiştirme riski doğuruyor ve analitik ekiplerin odağı dağılıyor.', 'A broad untargeted announcement creates unnecessary panic, risks alerting the threat actor by warning other account holders, and scatters analytical team focus.', { score: -6, speed: 4, evidence: 0, coordination: -8, risk: -4 }, 'Noise Burst', 'evidence')
        ]
      }),
      evidence: stage({
        alert: ['Forensik pencere daralıyor; staging artefaktının gerçekten dışarı çıkıp çıkmadığı netleştirilmeli.', 'The forensic window is narrowing; whether the staging artifact actually left the perimeter must be determined.'],
        title: ['Aşama 3 — MFT Rekonstrüksiyonu, Aktarım Analizi ve NSABB Kapsam Kararı', 'Stage 3 — MFT Reconstruction, Transfer Analysis, and NSABB Scope Decision'],
        text: ['Şimdi kritik soru: 218 MB\'lık geçici arşiv ne içeriyordu ve gerçekten dışarı çıktı mı? Bu sorunun cevabı federal bildirim eşiğinin aşılıp aşılmadığını belirleyecek. Forensik inceleme hem kapsam sınıflandırması hem de NSABB bildirim yükümlülüğünü netleştirecek. Aynı anda hizmet sürekliliği baskısı geliyor: araştırma grubu sabah deneyleri için dosyalara erişmek istiyor. Cihaz adli kopya için hazır; iki saatlik bakım penceresi var.', 'The critical question: what did the 218 MB temp archive contain and did it actually leave the perimeter? The answer determines whether the federal notification threshold was crossed. Forensic analysis will clarify both scope classification and NSABB reporting obligations. Simultaneously, the research group wants file access for morning experiments. The device is ready for forensic imaging; a two-hour maintenance window is available.'],
        setting: ['Cihaz adli kopya için hazır. İki saatlik bakım penceresi var. Dr. Nilsson Salı sabahı ofise dönüyor. Araştırma grubu dosya erişimi için sabah 07:00\'yi bekliyor.', 'The device is ready for forensic imaging. A two-hour maintenance window is available. Dr. Nilsson returns to the office Tuesday morning. The research group is waiting for file access at 07:00.'],
        current: ['Staging artefaktı silinmiş ama MFT ve VSS kayıtları kurtarılabilir. HTTPS trafiği DLP tarafından kaydedilmiş ama şifreli — boyut analizi mümkün.', 'The staging artifact was deleted but MFT and VSS records may be recoverable. HTTPS traffic was logged by DLP but is encrypted — size analysis is possible.'],
        changedByTone: {
          positive: ['Önceki aşamada koordinasyon iyi kurulduğu için veri sahipleri ve log kaynaklarına erişim düzenli. Chain-of-custody disiplini korunabilir.', 'Because the previous stage was well coordinated, access to data owners and log sources is orderly. Chain-of-custody discipline can be maintained.'],
          negative: ['Önceki aşamadaki boşluklar yüzünden bazı log talepleri gecikmişti; MFT kurtarma penceresi daralmış olabilir.', 'Because of earlier gaps, some log requests were delayed; the MFT recovery window may have narrowed.']
        },
        developments: [
          ['Dosya sunucusu MFT kaydı, arşivin oluşturulmasından 4 dakika sonra 190 MB HTTPS trafiği çıktığını gösteriyor — hedef IP, daha önce işaretlenen Kuala Lumpur adresi.', 'Silinen arşivin MFT izleri "GF_Protocol_H5N1_Enhanced.pdf" ve "Supplier_Contacts_DSO.xlsx" dosyalarını içerdiğine işaret ediyor — her ikisi de NSABB kapsamında.', 'Dr. Nilsson\'ın konferans e-posta trafiğinde, kimliği belirsiz bir adresten "teknik belgeler" isteyen mesaj var; Dr. Nilsson cevaplamamış ama eki açmış — muhtemel ilk kimlik bilgisi ele geçirme noktası.'],
          ['File server MFT records show 190 MB of HTTPS traffic leaving 4 minutes after archive creation — the destination IP matches the flagged Kuala Lumpur address.', 'MFT traces of the deleted archive point to "GF_Protocol_H5N1_Enhanced.pdf" and "Supplier_Contacts_DSO.xlsx" — both NSABB-scoped.', 'Dr. Nilsson\'s conference email traffic shows a message from an unknown address requesting "technical documents"; she did not reply but did open the attachment — the likely initial credential compromise vector.']
        ],
        options: [
          ['Uç nokta ve sunucu artefaktlarını kontrollü topla, MFT ve VSS kayıtlarını kurtarabildiğin kadar kurtar, HTTPS trafik boyutunu DLP kaydıyla karşılaştır ve chain-of-custody belgele.', 'Collect endpoint and server artifacts in a controlled way, recover MFT and VSS records, correlate HTTPS traffic volume against DLP records, and document chain of custody.'],
          ['Sistemi acilen kapat; forensik analiz daha sonra yapılır, önemli olan hizmeti durdurmak.', 'Shut the system down immediately; forensics can come later — the important thing is to stop the service.'],
          ['Hizmeti hızla geri ver; MFT ve VSS kayıtlarına bakmak zaman alır ve sabah deneylerini geciktirir.', 'Restore service quickly; examining MFT and VSS records is time-consuming and will delay morning experiments.']
        ],
        choices: [
          choice('positive', '🧠 Forensik bonus — NSABB eşiği netleşti', '🧠 Forensic bonus — NSABB threshold clarified', 'Mükemmel seçim. MFT kurtarma ve HTTPS boyut analizi, gain-of-function protokollerinin büyük olasılıkla dışarıya çıktığını ortaya koydu. NSABB bildirim eşiği artık savunulabilir kanıtla netleşebilir.', 'Excellent choice. MFT recovery and HTTPS size analysis established that gain-of-function protocols likely left the perimeter. The NSABB notification threshold can now be clarified with defensible evidence.', { score: 26, speed: 4, evidence: 22, coordination: 6, risk: 10 }, 'Forensic Guardian', 'decision'),
          choice('negative', '😢 Uçucu MFT verisi ve NSABB belirsizliği', '😢 Volatile MFT data lost and NSABB ambiguity', 'Plansız kapatma MFT, VSS ve aktif süreç verisini yok eder. NSABB bildirim kararı, aktarım gerçekleşip gerçekleşmediği belirsiz kalarak verilmek zorunda kalır.', 'An unplanned shutdown destroys MFT, VSS, and active process data. The NSABB notification decision must now be made without knowing whether transfer actually occurred.', { score: -16, speed: 0, evidence: -20, coordination: 0, risk: -6 }, 'Cold Shutdown', 'decision'),
          choice('negative', '😢 Forensik pencere kaçırıldı', '😢 Forensic window missed', 'Hizmet baskısı anlaşılır; ama normalleşmeden önce MFT kayıtları değişir, HTTPS boyut analizi imkânsızlaşır ve NSABB bildirimi savunulabilir kanıtsız yapılmak zorunda kalır.', 'Service pressure is understandable; but normalizing first changes MFT records, makes HTTPS size analysis impossible, and forces the NSABB decision without defensible evidence.', { score: -24, speed: -10, evidence: -24, coordination: -5, risk: -12 }, 'Missed Evidence', 'decision')
        ]
      }),
      decision: stage({
        alert: ['Yönetim; federal bildirim kararı, kapsam sınıflandırması, Dr. Nilsson\'ın konumu ve kurumsal güvenlik güçlendirme planı bekliyor.', 'Leadership is waiting for the federal notification decision, scope classification, Dr. Nilsson\'s position, and an institutional security hardening plan.'],
        title: ['Aşama 4 — NSABB Bildirimi, Kapsam Kararı ve Kurumsal Öğrenme', 'Stage 4 — NSABB Notification, Scope Decision, and Institutional Learning'],
        text: ['Forensik analiz, gain-of-function protokollerinin büyük olasılıkla dışarı çıktığını ortaya koydu. Şimdi üç kritik karar verilmeli: NSABB ve federal bildirim sürecinin başlatılıp başlatılmayacağı, Dr. Nilsson\'ın kurban olarak nasıl konumlandırılacağı ve MFA fatigue + credential compromise zincirini kapatan yapısal değişiklikler. Dr. Nilsson bir ihmalkar değil, sofistike bir hedef operasyonunun kurbanı — bu ayrımı karar sürecinde korumak kurumsal güven için kritik.', 'Forensic analysis established that gain-of-function protocols likely left the perimeter. Three critical decisions must now be made: whether to initiate NSABB and federal notification, how to position Dr. Nilsson as a victim rather than a culprit, and what structural changes close the MFA-fatigue plus credential-compromise chain. Dr. Nilsson is not negligent — she is the victim of a sophisticated targeting operation. Preserving this distinction in the decision process is critical for institutional trust.'],
        setting: ['Pazartesi 11:30. Yönetim kuruluna çıkacak tek sayfalık özet hazırlanıyor. DSO koordinatörü federal bildirim penceresi için soru soruyor. Dr. Nilsson uçuşta, yarın ofiste.', 'Monday 11:30. A one-page board brief is being prepared. The DSO coordinator is asking about the federal notification window. Dr. Nilsson is in transit and will be in the office tomorrow.'],
        current: ['NSABB kapsamlı dosyaların 190 MB aktarıma dahil edildiğine kuvvetle işaret eden forensik kanıt mevcut. Federal bildirim eşiği büyük olasılıkla aşılmış. MFA fatigue açığı hâlâ kapatılmadı.', 'Forensic evidence strongly indicates NSABB-scoped files were included in the 190 MB transfer. The federal notification threshold has likely been crossed. The MFA-fatigue vulnerability is still open.'],
        changedByTone: {
          positive: ['Önceki aşamalardaki disiplin sayesinde artık savunulabilir bir etki değerlendirmesi var. Federal bildirim ve Dr. Nilsson\'ın konumu net kanıtla desteklenebilir.', 'Because of prior-stage discipline, you now have a defensible impact assessment. The federal notification and Dr. Nilsson\'s victim status can both be supported with clear evidence.'],
          negative: ['Önceki eksikler nedeniyle hâlâ önemli belirsizlikler var. Federal bildirim kararı savunulabilir kanıtın tam olmadığı koşullarda verilmek zorunda kalınabilir.', 'Because of earlier gaps, significant uncertainties remain. The federal notification decision may need to be made without complete defensible evidence.']
        },
        developments: [
          ['Forensik, H5N1 gain-of-function protokollerini ve tedarikçi iletişimini içeren dosyaların 190 MB aktarımın içinde olduğuna kuvvetle işaret ediyor.', 'CERT paylaşımı: aynı Kuala Lumpur IP\'si aynı gece başka iki araştırma kurumuna MFA fatigue saldırısı yapmış; birinde başarılı olmuş.', 'NSABB kurallarına göre bu tür yetkisiz maruziyetin doğrulandıktan itibaren 72 saat içinde federal birime bildirilmesi gerekiyor; saat işliyor.'],
          ['Forensic analysis strongly indicates NSABB-scoped H5N1 gain-of-function protocols and supplier contacts were included in the 190 MB transfer.', 'CERT intelligence: the same Kuala Lumpur IP targeted two other research institutions the same night with MFA-fatigue attacks; one was successful.', 'NSABB rules require federal notification within 72 hours of confirmation of unauthorized exposure; the clock is running.']
        ],
        options: [
          ['Kanıtlara dayalı sınıflandırma yap, DSO koordinatörüyle federal bildirim sürecini başlat, Dr. Nilsson\'ı kurban olarak netleştir ve destekle, MFA politikasını ve NSABB erişim kontrollerini güçlendir.', 'Make an evidence-based classification, initiate federal notification with the DSO coordinator, clearly position and support Dr. Nilsson as a victim, and harden MFA policy and NSABB access controls.'],
          ['Kanıtlar güçlü ama federal bildirim mekanizmasını belirsizlik gerekçesiyle ertele; hukuki sonuçları önce tam değerlendir.', 'Evidence is strong but delay federal notification citing remaining uncertainty; fully evaluate legal consequences first.'],
          ['Olayı "muhtemelen iç hata" olarak sınıflandır; harici bildirimi ve DSO boyutunu dışarıda bırak.', 'Classify the incident as "likely internal error"; exclude external notification and the DSO dimension.']
        ],
        choices: [
          choice('positive', '🌟 Olgun kapanış + federal uyumluluk', '🌟 Mature closure + federal compliance', 'Mükemmel karar. Kanıta dayalı sınıflandırma, zamanında federal bildirim, Dr. Nilsson\'ın itibar koruması ve yapısal MFA güçlendirmesi — dört boyutu birlikte yöneten kurumsal olgunluk.', 'Excellent decision. Evidence-based classification, timely federal notification, protecting Dr. Nilsson\'s reputation, and structural MFA hardening — institutional maturity managing all four dimensions.', { score: 30, speed: 10, evidence: 6, coordination: 16, risk: 20 }, 'Response Strategist', 'end'),
          choice('negative', '😢 Federal bildirim gecikmesi riski', '😢 Federal notification delay risk', 'Hukuki gerekçe anlaşılır; ancak NSABB bildirimi için "tam kanıt" beklentisi belirsiz bir eşik. Bu süre içinde tehdit aktörü başka işlemler yapabilir ve kurumun teknik yetkinliği sorgulanır.', 'The legal rationale is understandable; but the NSABB notification standard does not require certainty before reporting. During the delay, the threat actor may act further and the institution\'s technical competence will be questioned.', { score: -18, speed: 4, evidence: -6, coordination: -10, risk: -18 }, 'Shallow Recovery', 'end'),
          choice('negative', '😢 Etik, hukuki ve kurumsal hata', '😢 Ethical, legal, and institutional failure', 'DSO boyutunu dışarıda bırakan "iç hata" sınıflandırması hem federal mevzuata hem araştırma etiğine aykırı. İlerideki denetimde kurumun koordineli bir örtbas yaptığı izlenimi doğar.', 'Classifying as "internal error" while excluding the DSO dimension violates both federal regulations and research ethics. In any future audit, the institution will appear to have coordinated a cover-up.', { score: -16, speed: 0, evidence: -8, coordination: -18, risk: -10 }, 'Blame Trap', 'end')
        ]
      })
    }
  },
  {
    id: 'usb-transfer',
    accent: 'purple',
    name: { tr: 'Ayrılan Araştırmacı ve Fikri Mülkiyet Riski', en: 'Departing Researcher and IP Risk' },
    summary: {
      tr: 'Son iş günü sabahı kısıtlı iş istasyonuna bağlanan USB cihaz, ayrılmak üzere olan postdok araştırmacının 3 yıllık yayımlanmamış mRNA taşıyıcı sistem verisini kopyalamış olabilir.',
      en: 'USB device connected to a restricted workstation on a departing postdoc\'s last morning may have copied three years of unpublished mRNA delivery-system data.'
    },
    nodes: buildUsbNodes()
  },
  {
    id: 'partner-email',
    accent: 'blue',
    name: { tr: 'Horizon Ortağı Kimliğiyle Sosyal Mühendislik', en: 'Social Engineering via Horizon Partner Identity' },
    summary: {
      tr: 'Horizon Avrupa ortağından geliyormuş gibi görünen ve "Avrupa Komisyonu denetimi" baskısı kullanan sahte e-posta; ham viral vektör verileri, BSL kayıtları ve tedarikçi sertifikaları talep ediyor.',
      en: 'Spoofed email posing as a Horizon Europe partner, using "European Commission audit" pressure to request raw viral vector data, BSL records, and supplier certificates.'
    },
    nodes: buildPartnerNodes()
  },
  {
    id: 'lab-device',
    accent: 'pink',
    name: { tr: 'NGS Cihazı Firmware Arka Kapısı', en: 'NGS Device Firmware Backdoor' },
    summary: {
      tr: 'SARS-CoV-2 varyant izleme programında kullanılan yeni nesil dizileme cihazı, üçüncü taraf servis ziyaretinin ardından hasta sekans verisini bilinmeyen dış IP adreslerine gönderiyor.',
      en: 'Next-generation sequencer used in SARS-CoV-2 variant surveillance is sending patient sequencing data to unknown external IPs after a third-party service visit.'
    },
    nodes: buildDeviceNodes()
  },
  {
    id: 'insider-sharing',
    accent: 'teal',
    name: { tr: 'Patent Baskısı Altında Gizli Veri Paylaşımı', en: 'Confidential Data Sharing Under Patent Pressure' },
    summary: {
      tr: 'Tez baskısı altındaki doktora öğrencisi, yayımlanmamış mRNA araştırma verisini aynı alanda patent başvurusu olan bir biyoteknoloji girişimiyle bağlantılı akademisyenle kişisel bulut üzerinden paylaştı.',
      en: 'PhD student under thesis pressure shared unpublished mRNA research data via personal cloud with an academic connected to a biotech startup actively filing patents in the same area.'
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
      alert: ['Son iş günü sabahı 09:47 — kısıtlı araştırma istasyonunda kayıt dışı USB cihaz bağlantısı tespit edildi.', 'Last workday morning 09:47 — an unregistered USB device was connected to a restricted research workstation.'],
      title: ['Aşama 1 — Ayrılış Günü, USB Bağlantısı ve 4,2 GB Staging Şüphesi', 'Stage 1 — Departure Day, USB Connection, and 4.2 GB Staging Suspicion'],
      text: ['Kurumdan ayrılarak Şanghay\'daki bir araştırma enstitüsünde pozisyon alan postdok araştırmacı Dr. Kaya\'nın son iş günü sabahı 09:47\'de, mRNA lipid nanopartikül formülasyon çalışmalarının tutulduğu kısıtlı istasyona beyaz listede olmayan bir USB cihaz bağlandı. Dr. Kaya "kişisel not ve sunumlarını almak için" kısa süre cihaz bağladığını söylüyor; ancak EDR, aynı dakikada "LNP_Formulation_2022-2025", "mRNA_Sequence_Library" ve "ClinicalTrialPrep_CONFIDENTIAL" klasörlerine ardışık erişim ve geçici bir .7z arşivi oluşturulup silindiğini kaydetti. Dr. Kaya\'nın öğleden sonra uçuşu var; HR ayrılış belgelerini imzalatmak için ofiste bekliyor. USB cihaz şu an Dr. Kaya\'nın çantasında.', 'Postdoc researcher Dr. Kaya, who is leaving for a position at a Shanghai research institute, connected an unwhitelisted USB device at 09:47 on their final workday to a restricted workstation holding mRNA lipid nanoparticle formulation studies. Dr. Kaya says they "briefly connected it for personal notes and presentations"; however, the EDR recorded sequential access to "LNP_Formulation_2022-2025," "mRNA_Sequence_Library," and "ClinicalTrialPrep_CONFIDENTIAL" folders simultaneously with the creation and deletion of a temporary .7z archive. Dr. Kaya has an afternoon flight; HR is waiting in the office to finalize departure paperwork. The USB device is currently in Dr. Kaya\'s bag.'],
      setting: ['Mesai saatlerinde, ofis kalabalık. Dr. Kaya HR ofisinde ayrılış belgelerini imzalamak üzere. Öğleden sonra 14:30 uçuşu var. İstasyon oturumu hâlâ açık ve kilitlenmemiş.', 'During working hours, the office is busy. Dr. Kaya is in the HR office about to sign departure documents. They have a 14:30 flight. The workstation session is still active and unlocked.'],
      current: ['Dr. Kaya bina içinde, HR ofisinde. USB cihaz yanında ve bina dışına çıkarsa kurtarımı hukuken komplike hale gelir. EDR, 4,2 GB geçici arşiv izleri gösteriyor — USB cihaz kapasitesiyle uyumlu.', 'Dr. Kaya is inside the building, in the HR office. The USB device is with them — once it leaves the building, recovery becomes legally complicated. The EDR shows traces of a 4.2 GB temp archive, consistent with the USB device capacity.'],
      changed: ['İlk aşama: önceki karar etkisi yok; ama her dakika Dr. Kaya\'nın binadan çıkma olasılığını artırıyor.', 'First stage: no previous-choice effect; but every minute increases the probability that Dr. Kaya leaves the building.'],
      developments: [
        ['EDR kayıtları, .7z arşivinin oluşturulması ile USB cihazın çıkarılması arasında yalnızca 38 saniye geçtiğini gösteriyor — manuel seçim yapmak için çok kısa bir süre.', 'Dr. Kaya\'nın kurumdan ayrılış e-postasını yazmadan 2 gün önce, aynı araştırma alanında faaliyet gösteren Şanghay\'daki yeni işvereniyle teknik içerikli yazışma yaptığı e-posta loglarında görünüyor.', 'Ayrılış sözleşmesinde fikri mülkiyet devir maddesi imzalanmış ancak veri transfer kısıtları açıkça belirtilmemiş — hukuki gri alan.'],
        ['EDR records show only 38 seconds between .7z archive creation and USB device removal — too brief for manual file selection.', 'Email logs show Dr. Kaya had technical content exchanges with their new Shanghai employer two days before writing a departure email — before formally notifying the institution.', 'The departure agreement includes an IP assignment clause but does not explicitly define data transfer restrictions — a legal gray area.']
      ],
      options: [
        ['İstasyonu kontrollü kısıtla, Dr. Kaya\'yı HR sürecinin parçası olarak IT güvenliğiyle görüşmeye yönlendir, USB cihazı hukuki gereklilik çerçevesinde koru ve olay kaydı aç.', 'Restrict the workstation in a controlled way, direct Dr. Kaya to a meeting with IT security as part of the HR process, preserve the USB device within legal requirements, and open an incident record.'],
        ['Dr. Kaya\'ya USB\'yi gönüllü olarak teslim etmesini söyle; vermezse serbest bırak.', 'Ask Dr. Kaya to voluntarily hand over the USB; if they refuse, let them leave.'],
        ['Ofis ortamında Dr. Kaya\'yı alenen sorgula ve ayrılışını engelle.', 'Publicly confront Dr. Kaya in the open office and block their departure.']
      ],
      choices: [
        choice('positive', '🔒 Kontrollü güvence + hukuki zemin', '🔒 Controlled security + legal grounding', 'Doğru yaklaşım. Hem transfer riski hem delil kaybı erkenden kontrol altına alındı. HR süreciyle entegrasyon gereksiz tırmanmayı önledi. Hukuki pozisyon korundu.', 'Correct approach. Both transfer risk and evidence loss were controlled early. Integration with the HR process prevented unnecessary escalation. Legal position is protected.', { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, 'Access Sentinel', 'comms'),
        choice('negative', '😢 Kurumsal fikri mülkiyet binadan çıkıyor', '😢 Institutional IP leaving the building', 'Gönüllü teslim çok az zorlayıcılık yaratır; 3 yıllık yayımlanmamış araştırma verisi, rakip bir enstitüde çalışmak üzere olan biyle birlikte binadan çıkıyor.', 'Voluntary surrender is barely coercive; three years of unpublished research data leaves the building with someone about to work at a competing institution.', { score: -8, speed: 2, evidence: -10, coordination: -4, risk: -8 }, 'Soft Control', 'comms'),
        choice('negative', '😢 Hukuki sorun ve güven tahribatı', '😢 Legal exposure and trust destruction', 'Aleni sorgulama haksız muamele davası riskini artırır, ofisteki tüm personelin moralini etkiler ve nesnel delil toplama imkânını bozar.', 'Public confrontation risks an unfair treatment lawsuit, affects the morale of all office staff, and compromises objective evidence collection.', { score: -22, speed: -12, evidence: -10, coordination: -8, risk: -20 }, 'Dismissal Risk', 'comms')
      ]
    }),
    comms: stage({
      alert: ['PI, veri yönetişimi sorumlusu ve hukuk birimi durumdan haberdar edilmeli.', 'The PI, data governance lead, and legal counsel need to be informed.'],
      title: ['Aşama 2 — Paydaşların Devreye Alınması: IP, Sözleşme ve Araştırma İlişkileri', 'Stage 2 — Stakeholder Engagement: IP, Contract, and Research Relationships'],
      text: ['Olay artık yalnızca bir USB güvenlik politikası ihlali değil. 3 yıllık yayımlanmamış mRNA taşıyıcı sistem verisi, aktif klinik araştırma hazırlıkları ve endüstriyel ortaklık yükümlülükleri tehdit altında. Şanghay bağlantısı, kurumun kendi alanındaki rakip yayın ve patent riskini de gündeme getiriyor. Hem teknik hem hukuki hem de araştırma ilişkileri boyutu aynı anda yönetilmeli.', 'The incident is no longer just a USB policy violation. Three years of unpublished mRNA delivery-system data, active clinical research preparations, and industrial partnership obligations are at risk. The Shanghai connection also raises the risk of competing publications and patents in the institution\'s own research area. Technical, legal, and research-relationship dimensions all require simultaneous management.'],
      setting: ['PI\'nın laboratuvar toplantısı var; veri yönetişimi sorumlusu başka binada. Hukuk birimi ayrılış sözleşmesi ve IP devir maddelerini inceliyor. Endüstriyel ortak, klinik araştırma takvimi hakkında bugün yanıt bekliyor.', 'The PI has a lab meeting; the data governance lead is in another building. Legal is reviewing the departure agreement and IP assignment clauses. The industrial partner is waiting today for a response about the clinical research timeline.'],
      current: ['Henüz hangi dosyaların gerçekten USB\'ye yazıldığı savunulabilir biçimde bilinmiyor. Bu belirsizlik hem hukuki hem araştırma yönetimi kararlarını engelliyor.', 'There is not yet a defensible picture of which files were actually written to the USB device. This uncertainty is blocking both legal and research management decisions.'],
      changedByTone: {
        positive: ['İlk kayıt düzgün tutulduğu için paydaşları aynı gerçeklik zemini üzerinde toplamak daha kolay.', 'Because the initial record is solid, aligning stakeholders around the same facts is easier.'],
        negative: ['İlk aşamadaki gevşeklik nedeniyle herkes farklı hikâye duydu; önce bilgi kirliliğini azaltman gerekiyor.', 'Because the first stage was loose, everyone heard a different story; you first need to reduce information noise.']
      },
      developments: [
        ['Dr. Kaya\'nın yeni işvereninin, kurumun önümüzdeki 6 ayda yayımlamayı planladığı mRNA formülasyon alanında bu hafta uluslararası patent başvurusu yaptığı saptandı.', 'Endüstriyel ortaklık sözleşmesinde, 3 yıllık araştırmanın çıktıları üzerinde kurumun öncelikli patent hakkı var; başka kuruma transferi sözleşme ihlali sayılabilir.', 'Güvenlik ekibi, Dr. Kaya\'nın istasyon erişimini paylaşan iki başka çalışan olduğunu tespit etti — kapsam sorusu genişliyor.'],
        ['Dr. Kaya\'s new employer filed an international patent application this week in the same mRNA formulation area where the institution plans to publish in the next six months.', 'The industrial partnership agreement gives the institution priority patent rights over three years of research outputs; transferring them to another institution may constitute a contract breach.', 'The security team identified two other employees who shared workstation access with Dr. Kaya — the scope question is widening.']
      ],
      options: [
        ['PI, veri yönetişimi, hukuk ve araştırma güvenliğini ortak response akışında birleştir; IP ve sözleşme boyutunu netleştir.', 'Bring the PI, data governance, legal, and research security into one shared response flow; clarify the IP and contract dimensions.'],
        ['Sadece teknik ekip ilgilensin; hukuk ve PI\'ı kapsam netleşince dahil et.', 'Let only the technical team handle it; bring in legal and the PI once scope is clear.'],
        ['Durumu laboratuvar içinde tut; üst yönetime çıkmasın, endüstriyel ortağa kesinlikle söylenmesin.', 'Keep the matter inside the lab; do not escalate upward and absolutely do not tell the industrial partner.']
      ],
      choices: [
        choice('positive', '🤝 IP-bilinçli çok paydaşlı koordinasyon', '🤝 IP-aware multi-stakeholder coordination', 'Çok iyi. Olayın hukuki, araştırma ve güvenlik boyutları birlikte tanındı; doğru paydaş seti ve ortak gerçeklik zemini kuruldu.', 'Very good. The incident\'s legal, research, and security dimensions were recognized together; the right stakeholder set and shared factual foundation were established.', { score: 20, speed: 8, evidence: 6, coordination: 20, risk: 10 }, 'Bridge Builder', 'evidence'),
        choice('negative', '😢 Hukuki ve IP boyutu boşta kalıyor', '😢 Legal and IP dimensions left unaddressed', 'Teknik yaklaşım tek başına yetmez; patent penceresi açık, sözleşmesel bildirim yükümlülükleri cevaplanmıyor.', 'A technical approach alone is insufficient; the patent window is open and contractual notification obligations go unanswered.', { score: -10, speed: 0, evidence: 0, coordination: -14, risk: -10 }, 'Governance Gap', 'evidence'),
        choice('negative', '😢 Endüstriyel ortak sürprizle karşılaşır', '😢 Industrial partner caught off guard', 'Durumu dar tutmak kısa vadeli baskıyı azaltır; ama sözleşme ihlali ve patent kaybı, endüstriyel ortağın olayı başka kanaldan öğrenmesi halinde çok daha büyük bir güven krizine dönüşür.', 'Keeping it contained reduces short-term pressure; but a contract breach and patent loss will turn into a far larger trust crisis if the industrial partner learns through another channel.', { score: -12, speed: 0, evidence: -2, coordination: -16, risk: -8 }, 'Silo Response', 'evidence')
      ]
    }),
    evidence: stage({
      alert: ['USB\'ye gerçekte ne yazıldığı — hangi dosyalar, ne kadar veri — savunulabilir biçimde netleştirilmeli.', 'What was actually written to the USB — which files, how much data — must be determined in a defensible way.'],
      title: ['Aşama 3 — Transfer Kapsamı: Cihaz Artefaktları, Dosya İzleri ve Patent Penceresi', 'Stage 3 — Transfer Scope: Device Artifacts, File Traces, and Patent Window'],
      text: ['Şimdi yapılması gereken, "USB takıldı" bilgisini hukuki ve araştırma yönetimi kararlarına zemin hazırlayacak kanıt zincirine dönüştürmek: hangi dosyalar açıldı, hangilerinin kopyası alındı, .7z arşivinin içeriği ne kadar rekonstrükte edilebilir? Bu analiz aynı zamanda endüstriyel ortağa yapılacak bildirim ve patent koruma stratejisi için de temel oluşturacak.', 'The task is to convert "a USB was inserted" into an evidence chain that can ground both legal and research management decisions: which files were opened, which were copied, how much of the .7z archive content can be reconstructed? This analysis also forms the foundation for the industrial partner notification and patent protection strategy.'],
      setting: ['İstasyon bu öğleden sonra başka araştırmacı tarafından kullanılmak isteniyor. Hukuk, IP değerlendirmesi için dosya listesi bekliyor. Patent birimi, önlem alınabilmesi için 48 saat penceresi olduğunu söylüyor.', 'The workstation is needed by another researcher this afternoon. Legal is waiting for a file list for IP assessment. The patent unit says there is a 48-hour window to take protective measures.'],
      current: ['Yanlış kapsam analizi gereksiz hukuki aksiyon veya eksik IP koruma stratejisiyle sonuçlanabilir. Patent penceresi daralıyor.', 'Poor scope analysis may result either in unnecessary legal action or in an incomplete IP protection strategy. The patent window is narrowing.'],
      changedByTone: {
        positive: ['Paydaşlar hizalı olduğu için log, kullanıcı ve veri sahibi bilgilerini daha rahat eşleştirebiliyorsunuz.', 'Because stakeholders are aligned, correlating logs, user details, and data-owner information is easier.'],
        negative: ['Önceki aşamadaki boşluklar nedeniyle kimin hangi veriye sahip olduğu net değil; rekonstrüksiyon daha zorlaştı.', 'Because of earlier gaps, data ownership is less clear; reconstruction is now harder.']
      },
      developments: [
        ['USB artefaktları, "LNP_Formulation" ve "mRNA_Sequence_Library" klasörlerinden gerçek kopyalama, "ClinicalTrialPrep" klasöründe ise yalnızca thumbnail/önizleme aktivitesi gösteriyor — klinik hazırlık belgelerinin kopyalanmadığına işaret ediyor.', '.7z arşivinin adlandırma deseni, Dr. Kaya\'nın Şanghay işverenine gönderdiği diğer teknik dosyalarla aynı — "ShTeam_[tarih]_[konu].7z".', 'Sistem, aynı sabah 09:31\'de 15 dakikalık kısa süreli kişisel bulut senkronizasyon denemesi de kaydetmiş — USB bağlantısından 16 dakika önce.'],
        ['USB artifacts indicate actual copying from "LNP_Formulation" and "mRNA_Sequence_Library" folders, but only thumbnail/preview activity for "ClinicalTrialPrep" — suggesting clinical prep documents were not copied.', 'The .7z archive naming pattern matches other technical files Dr. Kaya sent to their Shanghai employer — "ShTeam_[date]_[topic].7z".', 'The system also logged a 15-minute personal cloud sync attempt at 09:31 — 16 minutes before the USB connection.']
      ],
      options: [
        ['Cihaz kayıtları, dosya erişim logları, USB artefaktları ve ağ trafiğini birlikte değerlendir; transfer kapsamını rekonstrükte et.', 'Correlate device records, file-access logs, USB artifacts, and network traffic together; reconstruct the transfer scope.'],
        ['Önce kimin ne yaptığını belirle; teknik iz ikincil.', 'Determine who did what first; technical traces are secondary.'],
        ['Sadece temel erişim listesine bak; USB artefakt analizi gereksiz detay.', 'Check only the basic access list; USB artifact analysis is unnecessary detail.']
      ],
      choices: [
        choice('positive', '📊 Kapsam netleşti — patent koruması mümkün', '📊 Scope clarified — patent protection feasible', 'Mükemmel. Etkilenen veri kümeleri savunulabilir biçimde görünür oldu. Klinik hazırlık belgelerinin kopyalanmadığının belirlenmesi hukuki stratejiyi odaklıyor ve patent biriminin önlem alması için netlik sağlıyor.', 'Excellent. Affected datasets became defensibly visible. Determining that clinical prep documents were not copied focuses the legal strategy and gives the patent unit clarity to act.', { score: 25, speed: 4, evidence: 20, coordination: 4, risk: 10 }, 'Trail Mapper', 'decision'),
        choice('negative', '😢 Önyargılı analiz, hukuki zafiyet', '😢 Biased analysis, legal vulnerability', 'Kişi odaklı yaklaşım teknik kapsam analizinin önüne geçince, gerçekte kopyalanmayan dosyalar için de hukuki aksiyon riski doğar ve savunulabilir kanıt zinciri zayıflar.', 'When person-focused investigation overtakes scope analysis, there is a risk of legal action for files that were not actually copied, and the defensible evidence chain weakens.', { score: -14, speed: 0, evidence: -16, coordination: -6, risk: -8 }, 'Premature Blame', 'decision'),
        choice('negative', '😢 Hukuki ve patent stratejisi körleşiyor', '😢 Legal and patent strategy goes blind', 'Parçalı veriyle karar vermek hem fazla geniş (gereksiz dava) hem de fazla dar (kopyalanan veri gözden kaçıyor) response üretir. Patent penceresi körce harcanıyor.', 'Deciding on fragmented data produces either too broad (unnecessary litigation) or too narrow (missed copied data) a response. The patent window is spent blindly.', { score: -10, speed: 2, evidence: -12, coordination: 0, risk: -8 }, 'Thin Review', 'decision')
      ]
    }),
    decision: stage({
      alert: ['Yönetim, hukuki aksiyon, patent koruma stratejisi ve tekrar riskini önleyecek yapısal adımlar bekliyor.', 'Leadership expects a legal action decision, patent protection strategy, and structural steps to prevent recurrence.'],
      title: ['Aşama 4 — Hukuki Strateji, Patent Koruma ve Kurumsal Güçlendirme', 'Stage 4 — Legal Strategy, Patent Protection, and Institutional Strengthening'],
      text: ['Teknik kapsam netleşti. Şimdi üç karar verilmeli: hukuki aksiyon eşiği (IP ihlali iddiasıyla devam mı, uzlaşma yolu mu?), patent koruma aksiyonu (kurumun öncelik hakkını belgeleyen patent başvurusu hızlandırılmalı mı?), ve aynı durumun tekrarını önleyecek yapısal değişiklikler. "Sadece sözlü uyarı" seçeneği ne hukuki ne de araştırma koruması açısından yeterli.', 'The technical scope is now clear. Three decisions must be made: the legal action threshold (pursue IP infringement or seek a negotiated path?), patent protection action (should the institution accelerate its prior-rights patent filing?), and structural changes to prevent recurrence. A "verbal warning only" option is insufficient from both legal and research protection perspectives.'],
      setting: ['Patent birimi 48 saatlik koruma penceresinin yarısında. Endüstriyel ortak, "araştırma güvencesi" konusunda yazılı yanıt bekliyor. Dr. Kaya\'nın avukatı iletişime geçti.', 'The patent unit is at the midpoint of the 48-hour protection window. The industrial partner is waiting for a written "research assurance" response. Dr. Kaya\'s attorney has made contact.'],
      current: ['LNP formülasyon ve mRNA sekans verisi kopyalanmış büyük olasılıkla; klinik hazırlık belgeleri güvende. Patent penceresi yarı kapandı. Hukuki yol seçilecek.', 'LNP formulation and mRNA sequence data was likely copied; clinical prep documents appear safe. The patent window is half-closed. The legal path must be chosen.'],
      changedByTone: {
        positive: ['Önceki kapsamlı analiz sayesinde hukuk ve patent birimine net bir dosya listesi sunulabiliyor; strateji hedefli kurulabiliyor.', 'The prior comprehensive analysis allows a clear file list to be presented to legal and patent units; strategy can be built with precision.'],
        negative: ['Kapsam belirsizliği nedeniyle hukuk birimi daha savunmacı ve geniş kapsamlı bir yaklaşım öneriyor; bu daha pahalı ve daha az hedefli.', 'Because of scope ambiguity, legal is recommending a more defensive and broad approach; this is more expensive and less targeted.']
      },
      developments: [
        ['Şanghay\'daki yeni işverenin, kurumun araştırma alanında bu hafta yaptığı uluslararası patent başvurusunun Dr. Kaya\'nın verilerini doğrudan baz aldığına dair teknik benzerlik analizi yapılıyor.', 'Endüstriyel ortak, olayı öğrendikten sonra araştırma ortaklığını yenileme kararını askıya aldığını bildirdi.', 'Ayrılış sözleşmesinde veri transfer kısıtı açık olmadığı için hukuki yol komplike; ama IP devir maddesi güçlü bir zemin sağlıyor.'],
        ['Technical similarity analysis is underway comparing Dr. Kaya\'s data with the Shanghai employer\'s international patent filing — early indicators suggest direct use.', 'The industrial partner has suspended its partnership renewal decision after learning of the incident.', 'Because the departure agreement does not explicitly restrict data transfer, the legal path is complicated; however, the IP assignment clause provides strong grounding.']
      ],
      options: [
        ['IP devir maddesine dayalı resmi hukuki süreci başlat, patent biriminin öncelik başvurusunu hızlandır, endüstriyel ortağa şeffaf yazılı yanıt ver ve USB kısıtı + ayrılış protokolünü güncelle.', 'Initiate formal legal proceedings based on the IP assignment clause, accelerate the patent unit\'s priority filing, give the industrial partner a transparent written response, and update USB restrictions and departure protocols.'],
        ['Dr. Kaya\'yı sadece sözlü olarak uya; hukuki süreç başlatmak ilişkilere zarar verir.', 'Only warn Dr. Kaya verbally; starting legal proceedings damages relationships.'],
        ['Olay kapandı; endüstriyel ortağa ve hukuka bildirme.', 'The incident is over; do not notify the industrial partner or legal.']
      ],
      choices: [
        choice('positive', '🏆 Hukuki + araştırma + güçlendirme', '🏆 Legal + research + hardening', 'Güçlü kapanış. IP devir maddesi doğru kullanıldı, patent penceresi kapatıldı, endüstriyel ortak şeffaflıkla bilgilendirildi ve yapısal ayrılış protokolü güncellendi.', 'Strong closure. The IP assignment clause was used correctly, the patent window was closed, the industrial partner was transparently informed, and the structural departure protocol was updated.', { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, 'Prevention Architect', 'end'),
        choice('negative', '😢 Araştırma ve endüstriyel ilişki korumasız', '😢 Research and industrial relationship unprotected', 'Sözlü uyarı patent penceresini kapatmıyor; endüstriyel ortak belirsizlikte kalıyor. Şanghay patent başvurusu kurum aleyhine tescillenirse sonuç çok daha ağır olur.', 'A verbal warning does not close the patent window; the industrial partner remains in uncertainty. If the Shanghai patent filing is registered against the institution, the consequences will be far more severe.', { score: -12, speed: 2, evidence: 0, coordination: -8, risk: -12 }, 'Verbal Fix', 'end'),
        choice('negative', '😢 Tüm boyutlarda aktif kayıp', '😢 Active loss on all dimensions', 'Hareketsizlik patent hakkını, endüstriyel ortaklığı ve ayrılış protokolü reformunu birlikte kaybettirir. Tekrar riski yüksek.', 'Inaction simultaneously loses the patent right, the industrial partnership, and the opportunity for departure-protocol reform. Recurrence risk is high.', { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, 'No Lessons', 'end')
      ]
    })
  };
}

function buildPartnerNodes() {
  return {
    start: stage({
      alert: ['Horizon Avrupa ortağından geldiği iddia edilen SOP dışı acil veri talebi doğrulama incelemesine işaretlendi.', 'An out-of-SOP urgent data request allegedly from a Horizon Europe partner was flagged for authenticity review.'],
      title: ['Aşama 1 — Talebi Durdur, Kimliği Doğrula, Kayıt Aç', 'Stage 1 — Hold the Request, Verify Identity, Open a Record'],
      text: ['Cuma akşamı 17:45\'te proje koordinatörünün gelen kutusuna, 3 yıldır birlikte çalışılan Brüksel Biyomedikal Enstitüsü\'nün araştırma koordinatörü Dr. Erika Van den Berg\'den geldiği iddia edilen bir e-posta düştü. Mesajda "yarın sabah 09:00\'daki sürpriz Avrupa Komisyonu denetimi öncesinde bu gece" ham viral vektör dizileme çıktıları, GMP tedarikçi sertifikaları, Biyogüvenlik Kurulu protokol revizyonları ve BSL-2 kalibrasyon kayıtları isteniyor. E-posta şablonu tanıdık; ancak domain "ul-bioinstitute.eu" yerine "ul-bio-institute.eu" — tek tire farkı. Mesajda "güvenli portal erişimim şifre sıfırlama nedeniyle devre dışı, bu e-postaya doğrudan yanıt verin" yazıyor.', 'At 17:45 Friday, the project coordinator received an email allegedly from Dr. Erika Van den Berg, research coordinator at the Brussels Biomedical Institute with whom the institution has collaborated for three years. It requests raw viral vector sequencing outputs, GMP supplier certificates, Biosafety Board protocol revisions, and BSL-2 calibration records "tonight before tomorrow morning\'s 09:00 surprise European Commission audit." The email template looks familiar; however, the domain is "ul-bio-institute.eu" instead of "ul-bioinstitute.eu" — one hyphen difference. The message states "my secure portal access is down due to a password reset, please reply directly to this email."'],
      emailSample: {
        tr: 'Kimden: Dr. Erika Van den Berg <erika.vandenberg@ul-bio-institute.eu>\nKime: Proje Koordinatörü\nKonu: ACİL — Denetim Öncesi Eksik Belgeler [Referans: HEU-2024-BioVector-Grant]\n\nMerhaba,\n\nYarın sabah 09:00 Brüksel\'deki Avrupa Komisyonu denetçileri beklenmedik bir gözden geçirme yapacak. Konsorsiyum adına şu belgelere bu gece ihtiyacım var:\n\n- Son 6 aylık ham viral vektör dizileme çıktıları (FASTQ formatında)\n- GMP tedarikçi onay sertifikaları ve dağıtım kayıtları\n- Biyogüvenlik Kurulu\'na sunulan 14 Kasım protokol revizyonu (onaylı versiyon)\n- BSL-2 ekipman kalibrasyon kayıtları (son 12 ay)\n\nGüvenli portal erişimim bu hafta şifre sıfırlama nedeniyle devre dışı kaldı. Lütfen bu e-postaya doğrudan yanıt verin; dosyaları sıkıştırılmış klasör olarak gönderin, en geç gece 23:00\'e kadar almam gerekiyor.\n\nPI onayını pazartesi sistemde tamamlarız. Şu an sadece denetim için hız kazanmamız lazım.\n\nBu çok acil — Avrupa tarafında tüm konsorsiyum ortaklarına dönüyorum.\n\nTeşekkürler,\nDr. Erika Van den Berg\nAraştırma Koordinatörü, UL Bioinstitute\nHorizon Europe BIO-VECTOR-2024 Konsorsiyumu\nTel: +32 2 XXX XXXX',
        en: 'From: Dr. Erika Van den Berg <erika.vandenberg@ul-bio-institute.eu>\nTo: Project Coordinator\nSubject: URGENT — Pre-Audit Missing Documents [Ref: HEU-2024-BioVector-Grant]\n\nHello,\n\nTomorrow morning at 09:00 Brussels, European Commission auditors are conducting an unexpected review. On behalf of the consortium I urgently need the following documents tonight:\n\n- Last 6 months of raw viral vector sequencing outputs (FASTQ format)\n- GMP supplier approval certificates and distribution records\n- Biosafety Board protocol revision submitted November 14 (approved version)\n- BSL-2 equipment calibration records (last 12 months)\n\nMy secure portal access has been down this week due to a password reset. Please reply directly to this email; send the files as a compressed folder, I need them by 23:00 at the latest.\n\nWe can complete PI approval in the system on Monday. Right now we just need to move quickly for the audit.\n\nThis is very urgent — I am reaching out to all consortium partners on the European side.\n\nThanks,\nDr. Erika Van den Berg\nResearch Coordinator, UL Bioinstitute\nHorizon Europe BIO-VECTOR-2024 Consortium\nTel: +32 2 XXX XXXX'
      },
      setting: ['Cuma akşamı 17:45. PI hafta sonu için şehir dışında. Araştırma güvenliği ofisi pazartesiye kadar kapalı. Koordinatör, "üç yıllık iş birliğini riske atmamak" için hızlı dönmek istiyor.', 'Friday 17:45. The PI is out of town for the weekend. The research security office is closed until Monday. The coordinator wants to respond quickly to "avoid jeopardizing three years of collaboration."'],
      current: ['Talep edilen veriler: ham viral vektör dizileme çıktıları (FASTQ), GMP tedarikçi sertifikaları ve BSL-2 kalibrasyon kayıtları — hepsi kısıtlı sınıflandırmada. Doğrulama olmadan paylaşım ciddi bir research security ihlali.', 'Requested data: raw viral vector sequencing outputs (FASTQ), GMP supplier certificates, and BSL-2 calibration records — all restricted classification. Sharing without verification is a serious research security failure.'],
      changed: ['İlk aşama: önceki karar etkisi yok; ama sosyal mühendislik baskısı burada en yüksek seviyede — cuma akşamı, sürpriz denetim hikâyesi, 23:00 son dakika.', 'First stage: no previous-choice effect; but the social engineering pressure is at its peak here — Friday evening, surprise audit narrative, 23:00 deadline.'],
      developments: [
        ['E-posta\'nın gönderildiği "ul-bio-institute.eu" domaininin 3 hafta önce kaydedildiği, oysa gerçek partner domaininin "ul-bioinstitute.eu" olduğu ve 8 yıllık kayıt geçmişi bulunduğu tespit edildi.', 'Talep edilen ham FASTQ dosyaları, yürürlükteki Horizon ortaklık anlaşmasındaki rutin paylaşım matrisinde yer almıyor; her FASTQ transferi PI + araştırma güvenliği çift onayı gerektiriyor.', '"Sürpriz denetim" kurgusunun mesai saati dışında ve hafta sonunu kapsayan zamanlamaya denk gelmesi klasik sosyal mühendislik baskı taktiği — onay mekanizmalarını devre dışı bırakmayı hedefliyor.'],
        ['The sender domain "ul-bio-institute.eu" was registered 3 weeks ago; the real partner domain "ul-bioinstitute.eu" has an 8-year registration history.', 'The requested raw FASTQ files are not on the routine sharing matrix of the current Horizon partnership agreement; every FASTQ transfer requires dual approval from the PI and research security.', 'The "surprise audit" framing timed for after-hours and over a weekend is a classic social-engineering pressure tactic designed to bypass approval mechanisms.']
      ],
      options: [
        ['Talebi geçici olarak durdur, partner kurumun resmi telefon hattı üzerinden bağımsız doğrulama başlat ve ön değerlendirme kaydı aç.', 'Temporarily hold the request, start independent verification through the partner institution\'s official phone line, and open a preliminary assessment record.'],
        ['İlişkiyi zedelememek için talep edilen dosyaları hızlıca gönder; PI pazartesi onayını sisteme işler.', 'Send the requested files quickly to avoid harming the relationship; the PI can log the approval in the system on Monday.'],
        ['Talebi yanıtsız bırak; belki tekrar yazmalarsa o zaman değerlendirirsin.', 'Leave the request unanswered; if they write again you can evaluate then.']
      ],
      choices: [
        choice('positive', '✅ Verification bonusu — baskıya rağmen duruş', '✅ Verification bonus — standing firm under pressure', 'Mükemmel. "Trust but verify" refleksi en yüksek baskı anında bile çalıştı. Cuma akşamı + sürpriz denetim + 23:00 son dakika kombinasyonu klasik sosyal mühendislik baskısıdır — durmak doğru karardı.', 'Excellent. The "trust but verify" reflex worked even under peak pressure. Friday evening + surprise audit + 23:00 deadline is a classic social-engineering pressure combination — stopping was the right call.', { score: 24, speed: 10, evidence: 10, coordination: 10, risk: 16 }, 'Verifier', 'comms'),
        choice('negative', '😢 Sosyal mühendislik tuzağı', '😢 Social engineering trap', '"Üç yıllık ilişkiyi koruma" kaygısı anlaşılır; ama doğrulama olmadan ham FASTQ + GMP sertifikaları + BSL-2 kayıtlarını göndermek, araştırma güvenliğinin en temel çizgisini aşıyor. Buradaki asıl tehlike: başka konsorsiyum ortakları da aynı e-postayı almış olabilir.', 'The desire to "protect three years of collaboration" is understandable; but sending raw FASTQ + GMP certificates + BSL-2 records without verification crosses the most fundamental research security line. The real danger: other consortium partners may have received the same email.', { score: -20, speed: 6, evidence: -8, coordination: -4, risk: -20 }, 'Trust Trap', 'comms'),
        choice('negative', '😢 Pasif yanıt şüpheli talebi belgelemedendi', '😢 Passive response leaves suspicious request undocumented', 'Pasiflik güvenli yönetim değil. Şüpheli talep belgelenmeli ve değerlendirilmeli; sessiz kalmak hem kurumsal hem hukuki açıdan güvensiz bir pozisyon.', 'Passivity is not security management. The suspicious request must be documented and assessed; silence is institutionally and legally an insecure position.', { score: -8, speed: -6, evidence: -2, coordination: -6, risk: -8 }, 'Silent Drift', 'comms')
      ]
    }),
    comms: stage({
      alert: ['Kimlik, yetki ve iş ihtiyacı doğrulanmadan paylaşım yapılamaz — çok aktörlü due diligence gerekli.', 'Sharing before identity, authority, and business need are verified is not permissible — multi-actor due diligence required.'],
      title: ['Aşama 2 — Kurumsal Due Diligence: Kim Onaylayabilir, Hangi Koşulla?', 'Stage 2 — Institutional Due Diligence: Who Can Authorize, Under What Conditions?'],
      text: ['Talep artık sadece bir e-posta incelemesi değil. Kim onay verebilir, hangi veri hangi koşulla paylaşılabilir, Horizon sözleşmesi ne diyor, araştırma güvenliği açısından kırmızı çizgiler neler, ihracat kontrolü kapsamı var mı — tüm bu sorular birlikte ele alınmalı. PI\'ya ulaşmak gecikiyor, hukuk birimi mesai dışında.', 'The request is no longer just an email review. Who may authorize sharing, under what conditions, what the Horizon agreement says, where the research-security red lines are, and whether export-control scope applies — all these questions must be addressed together. The PI is slow to reach; legal is after hours.'],
      setting: ['PI\'ya ulaşmak gecikiyor. Hukuk birimi sınırlı mesai desteği veriyor. "Partner laboratuvar" bugün yanıt bekliyor — ama artık bunun gerçek partner olup olmadığı şüpheli.', 'The PI is slow to reach. Legal support is limited after hours. The "partner lab" expects a reply today — but whether it is actually the real partner is now in question.'],
      current: ['Tek aktörlü karar verme hem güvenlik hem hesap verebilirlik açısından riskli. Horizon sözleşmesindeki çift onay zorunluluğu, PI\'nın pazartesi onayı "sonradan" tamamlama seçeneğini ortadan kaldırıyor.', 'Single-actor decision-making is risky for both security and accountability. The Horizon agreement\'s dual-approval requirement eliminates the "PI approves retroactively on Monday" option.'],
      changedByTone: {
        positive: ['İlk durdurma kararı sayesinde zaman kazandınız; şimdi daha temiz due diligence yürütebilirsiniz.', 'Because you held the request early, you have bought time for cleaner due diligence.'],
        negative: ['Önceki zayıf karar nedeniyle şimdi hem ilişki baskısı hem güvenlik baskısı aynı anda arttı.', 'Because of the weak prior decision, relationship pressure and security pressure have both increased simultaneously.']
      },
      developments: [
        ['Araştırma güvenliği ofisinin hafta sonu nöbet hattına ulaşıldı; koordinatör, Horizon sözleşmesinde ham dizileme verisi paylaşımı için PI + araştırma güvenliği çift onayı şartı olduğunu doğruladı — bu transferin retroaktif onayı mümkün değil.', 'Brüksel Biyomedikal Enstitüsü\'nün resmi web sitesindeki iletişim sayfasından alınan numara üzerinden ulaşılan gerçek Dr. Van den Berg, böyle bir e-posta göndermediğini ve Avrupa Komisyonu denetiminden haberinin olmadığını söyledi.', 'Talep edilen GMP tedarikçi sertifikaları ve FASTQ dosyaları, ihracat kontrol mevzuatı (EAR Bölüm 734) kapsamında inceleme gerektirebilir; bu liste beklenmedik bir karmaşıklık katıyor.'],
        ['The research security weekend duty line confirmed that the Horizon agreement requires dual approval (PI + research security) for raw sequencing data — retroactive approval is not possible for this type of transfer.', 'The real Dr. Van den Berg, reached via the number on the Brussels Biomedical Institute\'s official website, confirmed she sent no such email and has no knowledge of any European Commission audit.', 'The requested GMP supplier certificates and FASTQ files may require review under export control regulations (EAR Section 734) — adding unexpected complexity to the authorization chain.']
      ],
      options: [
        ['Araştırma güvenliği, PI, hukuk/uyum ve partner kurumla bağımsız kanal doğrulamasını birlikte işlet; Horizon çift onay gerekliliklerini netleştir.', 'Run research security, the PI, legal/compliance, and independent-channel partner verification together; clarify the Horizon dual-approval requirements.'],
        ['Karar sadece PI\'ya bırakılsın; diğer aktörleri gereksiz yere dahil etme.', 'Leave the decision to the PI alone; do not involve other actors unnecessarily.'],
        ['Belirsizlik sürüyor; tekrar yazarlarsa o zaman karar ver.', 'Uncertainty continues; decide if they write again.']
      ],
      choices: [
        choice('positive', '🤝 Due diligence bonusu — gerçek kimlik ortaya çıktı', '🤝 Due diligence bonus — real identity revealed', 'Güçlü kurumsal çerçeve. Bağımsız telefon doğrulaması gerçek partner\'ın e-postadan haberinin olmadığını ortaya koydu — bu artık sosyal mühendislik girişimi olarak netleşti. Yetki, mevzuat ve güvenlik boyutu birlikte ele alındı.', 'Strong institutional framework. Independent phone verification revealed the real partner had no knowledge of the email — this is now clearly a social engineering attempt. Authority, compliance, and security were handled together.', { score: 22, speed: 8, evidence: 4, coordination: 18, risk: 10 }, 'Due Diligence Lead', 'evidence'),
        choice('negative', '😢 Tek karar vericinin riski', '😢 Single-decision-maker risk', 'PI\'nın tek başına karar vermesi, Horizon çift onay şartını karşılamaz ve kurumsal hesap verebilirliği zayıflatır. Ayrıca PI, domain farkını fark etmeyebilir.', 'PI deciding alone does not satisfy the Horizon dual-approval requirement and weakens institutional accountability. Also, the PI may not notice the domain difference.', { score: -12, speed: 0, evidence: 0, coordination: -16, risk: -10 }, 'Solo Governance', 'evidence'),
        choice('negative', '😢 Erteleme maliyeti', '😢 Cost of delay', 'Belirsizliği ertelemek hem güvenlik hem iş birliği güvenilirliği için maliyetlidir; gerçek partner\'ın uyarı alması gecikiyor.', 'Delaying ambiguity is costly for both security and collaboration credibility; notifying the real partner is also delayed.', { score: -8, speed: -8, evidence: 0, coordination: -8, risk: -8 }, 'Delayed Clarity', 'evidence')
      ]
    }),
    evidence: stage({
      alert: ['Teknik doğrulama: header analizi, SPF/DKIM ve iletişim örüntüsü birlikte okunmalı.', 'Technical verification: header analysis, SPF/DKIM status, and communication patterns must be read together.'],
      title: ['Aşama 3 — Teknik İz, Header Analizi ve Sosyal Mühendislik Anatomisi', 'Stage 3 — Technical Trace, Header Analysis, and Social Engineering Anatomy'],
      text: ['Gerçek partner\'ın e-postadan haberi olmadığı doğrulandı. Şimdi teknik iz analizi iki amaca hizmet ediyor: birincisi, saldırının tam anatomisini anlamak; ikincisi, aynı kampanyanın başka konsorsiyum ortaklarına da gitmiş olabileceğini değerlendirmek. E-posta header\'ları, SPF/DKIM durumu ve gönderici altyapısı bu soruları cevaplayacak.', 'The real partner confirmed no knowledge of the email. Technical trace analysis now serves two purposes: first, understanding the full anatomy of the attack; second, assessing whether the same campaign may have targeted other consortium partners. Email headers, SPF/DKIM status, and sender infrastructure will answer these questions.'],
      setting: ['Koordinatör, "üslup o kadar gerçekçiydi ki şüphelenmek zordu" diyor. Bu gözlem eğitim için önemli — ama teknik analizi değiştirmiyor.', 'The coordinator says "the tone was so realistic it was hard to doubt." This observation matters for training — but it does not change the technical analysis.'],
      current: ['Görünüşe dayalı güven ile doğrulamaya dayalı güven arasındaki fark bu anda en net biçimde görülüyor. Teknik analiz bu ayrımı somutlaştıracak.', 'The difference between appearance-based trust and verification-based trust is most visible right now. Technical analysis will make this distinction concrete.'],
      changedByTone: {
        positive: ['Önceki aşamada due diligence kurulduğu için teknik bulguları karar mekanizmasına hızla bağlayabiliyorsunuz.', 'Because due diligence was established in the previous stage, you can quickly connect technical findings to the decision chain.'],
        negative: ['Önceki aşamadaki boşluklar nedeniyle karar baskısı daha duygusal ve daha az yapısal ilerliyor.', 'Because of earlier gaps, the decision pressure is now more emotional and less structured.']
      },
      developments: [
        ['Header analizi, e-postanın gerçek partner\'ın MX altyapısı yerine bir Doğu Avrupa hosting sağlayıcısı üzerinden geçtiğini gösteriyor; SPF kontrolü "softfail", DKIM imzası yok.', 'Sahte domain "ul-bio-institute.eu" üzerinde barındırılan başka 6 domain daha var — hepsi Avrupa araştırma kurumlarını taklit eden isimlerle. Bu, organize bir spear-phishing kampanyasına işaret ediyor.', 'Aynı e-postanın konsorsiyumun diğer 4 üyesine de gittiği tespit edildi; bunlardan birinin "dosyaları gönderdi" haberi geldi — acil koordinasyon gerekiyor.'],
        ['Header analysis shows the email routed through an Eastern European hosting provider rather than the real partner\'s MX infrastructure; SPF check is "softfail" and there is no DKIM signature.', 'The fake domain "ul-bio-institute.eu" hosts six other domains — all mimicking European research institution names. This points to an organized spear-phishing campaign.', 'The same email was sent to the other four consortium members; one of them reportedly "sent the files" — urgent coordination is needed.']
      ],
      options: [
        ['Header/metadata, SPF/DKIM durumu, gönderici altyapısı ve önceki iletişim örüntüsünü birlikte incele; diğer konsorsiyum üyelerini uyar.', 'Analyze headers/metadata, SPF/DKIM status, sender infrastructure, and prior communication patterns together; alert other consortium members.'],
        ['Gönderici adı tanıdık ve üslup profesyonel; teknik doğrulamaya gerek yok, biz zaten paylaşmadık.', 'The sender name is familiar and the tone professional; no technical verification needed since we didn\'t share anyway.'],
        ['Profesyonel bir üslup kullanan e-posta saldırı olamaz; bu analiz aşırı temkinli.', 'An email with professional wording cannot be an attack; this analysis is overly cautious.']
      ],
      choices: [
        choice('positive', '🧬 Teknik doğrulama + konsorsiyum uyarısı', '🧬 Technical verification + consortium alert', 'Güçlü analiz seti. Spear-phishing altyapısı ve organize kampanya görünür oldu. Konsorsiyum ortaklarının uyarılması, birinin zaten gönderdiği bilgisini zamanında ortaya çıkardı — şimdi hasar sınırlaması başlayabilir.', 'Strong analysis set. Spear-phishing infrastructure and organized campaign became visible. Alerting consortium partners revealed that one already sent data — damage limitation can now begin.', { score: 24, speed: 4, evidence: 18, coordination: 6, risk: 10 }, 'Signal Analyst', 'decision'),
        choice('negative', '😢 Kampanya görünmez kalıyor', '😢 Campaign remains invisible', '"Biz paylaşmadık" rahatlaması konsorsiyumun geri kalanını tehlikeye bırakıyor. Spear-phishing kampanyasının anatomisi analiz edilmeden, aynı aktör farklı bir vektörle tekrar deneyebilir.', 'Comfort from "we didn\'t share" leaves the rest of the consortium at risk. Without analyzing the spear-phishing campaign\'s anatomy, the same actor may try again with a different vector.', { score: -16, speed: 0, evidence: -14, coordination: 0, risk: -14 }, 'Display Name Trap', 'decision'),
        choice('negative', '😢 Profesyonel üslup meşruiyet kanıtı değil', '😢 Professional wording is not proof of legitimacy', 'Bu senaryo tam olarak profesyonel üslubun neden yanıltıcı olduğunu gösteriyor. "Aşırı temkinli" değerlendirmesi güvenlik kültürünü zayıflatır ve bir sonraki saldırının önünü açar.', 'This scenario shows exactly why professional wording is misleading. Calling caution "overly cautious" weakens the security culture and opens the door for the next attack.', { score: -12, speed: 2, evidence: -10, coordination: 0, risk: -10 }, 'Style Bias', 'decision')
      ]
    }),
    decision: stage({
      alert: ['Kampanya doğrulandı; bir konsorsiyum üyesi veri gönderdi — koordineli yanıt ve hasar sınırlaması gerekiyor.', 'Campaign confirmed; one consortium member sent data — coordinated response and damage limitation needed.'],
      title: ['Aşama 4 — Güvenli Sonuçlandırma, Hasar Sınırlaması ve Kurumsal Öğrenme', 'Stage 4 — Safe Resolution, Damage Limitation, and Institutional Learning'],
      text: ['Artık bu yalnızca tek kurumun başarıyla engellediği bir sosyal mühendislik girişimi değil. Konsorsiyumun bir üyesi veri gönderdi; bu verinin ne olduğu, alıcı altyapısının kim kontrolünde olduğu ve veriyi geri almanın mümkün olup olmadığı soruları çözülmeli. Aynı zamanda tüm konsorsiyumun koordineli öğrenmesi ve SOP güncellemesi gerekiyor.', 'This is no longer just a social engineering attempt that one institution successfully blocked. A consortium member sent data; what data it was, who controls the receiving infrastructure, and whether retrieval is possible are all questions to resolve. The entire consortium also needs coordinated learning and SOP updates.'],
      setting: ['Gerçek partner kurum olayı öğrendi ve kendi incident kaydını açtı. Veri gönderen üyenin güvenlik ekibi alarma geçti. Horizon Avrupa proje yöneticisi koordineli yanıt için toplantı istiyor.', 'The real partner institution has learned of the incident and opened its own incident record. The consortium member that sent data has their security team on alert. The Horizon Europe project manager is requesting a coordinated response meeting.'],
      current: ['Veri gönderen üyenin gönderdiği veri analiz edilmeli. Spear-phishing altyapısı CERT\'e bildirilmeli. Tüm konsorsiyum için SOP güncellemesi gerekiyor.', 'The data sent by the member that shared must be analyzed. The spear-phishing infrastructure must be reported to CERT. An SOP update is needed for the entire consortium.'],
      changedByTone: {
        positive: ['Güçlü doğrulama seti ve erken konsorsiyum uyarısı sayesinde şimdi hasar sınırlaması için temiz bir platform var.', 'Because of the strong verification set and early consortium alert, there is now a clean platform for damage limitation.'],
        negative: ['Önceki eksikler nedeniyle hasar sınırlaması daha karmaşık; bazı konsorsiyum üyeleri geç uyarıldı.', 'Because of earlier gaps, damage limitation is more complex; some consortium members were warned late.']
      },
      developments: [
        ['Veri gönderen konsorsiyum üyesinin paylaştığı dosyaların alıcı sunucudan 40 dakika içinde indirildiği tespit edildi — tehdit aktörü aktif ve hızlı çalışıyor.', 'Spear-phishing domainleri CERT-EU\'ya bildirildi; aynı altyapının 3 ay içinde 7 Avrupa araştırma kurumunu hedef aldığı belirlendi — organize ve süregelen bir kampanya.', 'Partner kurum, sahte domain üzerinden gelen e-postanın kendilerinin e-posta sunucusundan sızdırılan şablon ve imza bilgisi kullanılarak hazırlandığını tespit etti.'],
        ['The consortium member\'s shared files were downloaded from the receiving server within 40 minutes of sending — the threat actor is active and fast.', 'Spear-phishing domains were reported to CERT-EU; the same infrastructure has targeted 7 European research institutions within 3 months — an organized, ongoing campaign.', 'The real partner institution determined that the fake email used a template and signature extracted from their own email server — suggesting prior compromise of the partner\'s email system.']
      ],
      options: [
        ['Doğrulanmış girişimi kayıt altına al, veri gönderen üyeyle koordineli hasar sınırlaması yürüt, spear-phishing altyapısını CERT-EU\'ya bildir ve tüm konsorsiyum için SOP güncellemesi başlat.', 'Record the confirmed attempt, run coordinated damage limitation with the member that sent data, report the spear-phishing infrastructure to CERT-EU, and initiate an SOP update for the entire consortium.'],
        ['Biz zaten paylaşmadık; veri gönderen üye kendi başının çaresine baksın.', 'We didn\'t share anything; the member that sent data can handle their own situation.'],
        ['Olayı kayıt altına al ama Horizon proje yöneticisini bilgilendirme; konsorsiyum ilişkilerini zorlaştırır.', 'Record the incident but do not inform the Horizon project manager; it complicates consortium relations.']
      ],
      choices: [
        choice('positive', '🌟 Konsorsiyum liderliği ve koordineli yanıt', '🌟 Consortium leadership and coordinated response', 'Mükemmel kapanış. Sadece kurumun kendi güvenliğini değil, tüm konsorsiyumun güvenlik kapasitesini güçlendirdi. Spear-phishing kampanyasının CERT-EU\'ya bildirilmesi başka kurumları da korudu.', 'Excellent closure. Not only the institution\'s own security, but the entire consortium\'s security capacity was strengthened. Reporting the spear-phishing campaign to CERT-EU also protected other institutions.', { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, 'Collaboration Guardian', 'end'),
        choice('negative', '😢 Konsorsiyum dayanışması yok', '😢 No consortium solidarity', '"Biz paylaşmadık" bakışı konsorsiyum sorumluluğunu görmezden geliyor. Hasar sınırlaması fırsatı kaçıyor ve Horizon proje yöneticisiyle güven kopuyor.', '"We didn\'t share" perspective ignores consortium responsibility. The damage-limitation opportunity is missed and trust with the Horizon project manager breaks down.', { score: -18, speed: 4, evidence: -4, coordination: -8, risk: -18 }, 'Relationship Overreach', 'end'),
        choice('negative', '😢 Kurumsal hafıza ve Horizon şeffaflığı kaybı', '😢 Loss of institutional memory and Horizon transparency', 'Kayıt tutmadan ve Horizon proje yöneticisini bilgilendirmeden kapatmak, hem denetim izini hem de konsorsiyumun koordineli öğrenme fırsatını yok eder.', 'Closing without a record and without informing the Horizon project manager destroys both the audit trail and the consortium\'s coordinated learning opportunity.', { score: -10, speed: 2, evidence: -8, coordination: -6, risk: -8 }, 'No Audit Trail', 'end')
      ]
    })
  };
}

function buildDeviceNodes() { return {
  start: stage({ 
    alert:['BSL-2 sertifikalı dizileme odasındaki NGS cihazı, üçüncü taraf servis ziyaretinin ardından bilinmeyen dış IP\'lere veri gönderiyor.','A BSL-2 certified sequencing room NGS device is sending data to unknown external IPs following a third-party service visit.'], 
    title:['Aşama 1 — NGS Cihazı Şüpheli Trafik: Operasyon mu Güvenlik mi?','Stage 1 — NGS Device Suspicious Traffic: Operations or Security?'], 
    text:['Kurumun SARS-CoV-2 varyant izleme programında kullanılan yeni nesil dizileme (NGS) cihazı, geçen hafta sözleşmeli üçüncü taraf teknik servis ekibinin bakım ziyaretinden bu yana anomalik davranış sergiliyor. Ağ izleme sistemi, cihazın 04:15-06:40 arasında normalde yalnızca kurumun dahili sunucusuna gönderdiği işlenmiş sekans verisini iki yabancı IP adresine de ilettiğini tespit etti. Bu IP\'lerden biri, Avrupa Siber Güvenlik Ajansı\'nın (ENISA) araştırma kurumlarını hedef alan tehdit aktörleriyle ilişkilendirdiği bir blokta yer alıyor. Cihaz günde 200-500 hasta örneği işliyor; aktif dizileme döngüsü kesintisiz devam ediyor. Kapatmak klinik karar süreçlerini sekteye uğratabilir.', 'The next-generation sequencer (NGS) used in the institution\'s SARS-CoV-2 variant surveillance program has been showing anomalous behavior since a contracted third-party service team\'s maintenance visit last week. The network monitoring system detected that the device sent processed sequencing data to two foreign IP addresses between 04:15 and 06:40. One of these IPs falls within a block that ENISA has linked to threat actors targeting research institutions. The device processes 200-500 patient samples daily; shutting it down could disrupt clinical decision processes.'], 
    setting:['BSL-2 sertifikalı dizileme odası, 7/24 aktif. Cihaz klinik karar süreçlerine bağlı hasta sekans analizleri yapıyor. Servis sözleşmesi 5 yıllık, firma kurumla uzun süreli ilişkide.','BSL-2 certified sequencing room, 24/7 active. The device performs patient sequencing analyses tied to clinical decision processes. Service contract is 5 years; the vendor has a long relationship with the institution.'], 
    current:['Şüpheli trafik devam ediyor. Hasta sekans verisi içeren dizileme çıktıları aktarımın bir parçası olabilir — GDPR ve klinik veri koruma yükümlülükleri soru işareti.','Suspicious traffic is continuing. Sequencing outputs containing patient data may be part of the transfer — GDPR and clinical data protection obligations are in question.'], 
    changed:['İlk aşama: önceki karar etkisi yok; ama her geçen saat hasta verisi dahil sekans çıktılarının dışarı sızma riskini artırıyor.','First stage: no previous-choice effect; but every passing hour increases the risk of patient data being exfiltrated.'], 
    developments:[ ['Servis ziyaretinde firma teknisyeninin "firmware güncellemesi" yaptığı, ancak bu değişikliğin BT değişiklik yönetim sistemine işlenmediği bildiriliyor.', 'Ağ trafiği analizi, dış IP\'ye gönderilen paketlerin boyut ve zamanlamasının cihazın aktif dizileme çıktı döngüleriyle birebir örtüştüğünü gösteriyor — rastgele durum bildirimi değil, gerçek veri aktarımı.', 'Aynı servis firmasının bu hafta başka iki araştırma kurumunda da benzer anomaliler yarattığı CERT-EU paylaşımı olarak geldi.'], 
    ['The service technician applied a "firmware update" during the visit — but this change was never logged in the IT change management system.', 'Network traffic analysis shows packet size and timing exactly correlates with active sequencing output cycles — real data transfer, not random status reporting.', 'CERT-EU shared intelligence that the same service firm created similar anomalies at two other research institutions this week.'] ], 
    options:[
      ['Cihazı kontrollü biçimde ağdan ayır, operasyonel etkiyi değerlendir, dahili dizileme kapasitesine geç ve teknik kayıtları koru.', 'Controlled-disconnect the device from the network, assess operational impact, switch to backup sequencing capacity, and preserve technical records.'],
      ['Cihazı kapat-aç yap; hata giderirse işe devam et.', 'Power-cycle the device; if the error clears, continue operations.'],
      ['İş akışı bozulmasın diye hiç müdahale etme; sahte alarm olabilir.', 'Do not intervene so the workflow is not disrupted; this may be a false alarm.']
    ], 
    choices:[ 
      choice('positive','🛡️ Kontrollü izolasyon + klinik geçiş planı','🛡️ Controlled isolation + clinical transition plan','Doğru yaklaşım. Hem hasta veri güvenliği hem klinik operasyon sürekliliği birlikte korundu. Firmware değişiklik kaydının yokluğu ve CERT-EU paylaşımı, bunun muhtemelen supply chain saldırısı olduğuna işaret ediyor.','Correct approach. Both patient data security and clinical operational continuity were protected. The missing firmware change record and CERT-EU intelligence suggest this is likely a supply chain attack.',{ score:24, speed:10, evidence:14, coordination:8, risk:16 },'Device Shield','comms'), 
      choice('negative','😢 Firmware backdoor aktif kalmaya devam ediyor','😢 Firmware backdoor continues active','Power-cycle semptomu geçici olarak maskeleyebilir; firmware seviyesindeki bir arka kapı reboot sonrası da aktif kalır. Hasta verisi sızmaya devam eder.','Power-cycle may temporarily mask the symptom; a firmware-level backdoor remains active after reboot. Patient data continues to be exfiltrated.',{ score:-14, speed:2, evidence:-16, coordination:-2, risk:-10 },'Reset Reflex','comms'), 
      choice('negative','😢 Hasta verisi sızmaya devam ediyor','😢 Patient data continues to exfiltrate','Pasiflik hem teknik riski hem hasta veri ihlali boyutunu büyütür. GDPR kapsamında veri ihlali bildirimi zorunlu olabilir — gecikme regülatif yaptırım riskini artırır.','Passivity increases both the technical risk and patient data breach dimensions. GDPR may require data breach notification — delay increases regulatory sanction risk.',{ score:-20, speed:-12, evidence:-4, coordination:-6, risk:-18 },'Passive Drift','comms') 
    ]
  }),
  comms: stage({ 
    alert:['Biyogüvenlik, klinik liderlik, IT güvenliği ve olası hasta veri ihlali için hukuk/uyum koordinasyonu gerekiyor.','Biosafety, clinical leadership, IT security, and legal/compliance coordination for potential patient data breach are needed.'], 
    title:['Aşama 2 — Üçlü Kriz Yönetimi: Klinik, Güvenlik ve GDPR','Stage 2 — Triple Crisis Management: Clinical, Security, and GDPR'], 
    text:['Bu olay artık tek başına teknik değil. Supply chain saldırısı şüphesi, hasta sekans verisinin GDPR kapsamında kişisel sağlık verisi olarak değerlendirilmesi ve klinik operasyonların sürekliliği — üç boyut aynı anda yönetilmeli. Servis firmasının diğer iki kurumda da benzer sorun yarattığı bilgisi, bunun koordineli saldırı olduğuna işaret ediyor.','This incident is no longer purely technical. A suspected supply chain attack, patient sequencing data classified as personal health data under GDPR, and clinical operation continuity — three dimensions must be managed simultaneously. Intelligence that the same service firm created similar issues at two other institutions suggests a coordinated attack.'], 
    setting:['Klinik liderlik cihazın geri dönmesini istiyor; güvenlik ekibi firmware\'i temizlemeden cihazı geri bağlamak istemiyor. Hukuk birimi GDPR 72 saatlik bildirim saatinin çalışıp çalışmadığını soruyor.','Clinical leadership wants the device back; the security team does not want to reconnect without cleaning the firmware. Legal is asking whether the GDPR 72-hour notification clock is running.'], 
    current:['Karar zinciri kurulmadan atılacak adımlar çatışma yaratabilir. GDPR 72 saatlik bildirim penceresi, hasta verisinin gerçekten sızdığı doğrulanırsa başlıyor.','Actions taken without a decision chain may create conflict. The GDPR 72-hour notification window starts once patient data exfiltration is confirmed.'], 
    changedByTone:{ 
      positive:['İlk aşamada kontrollü ayrım yapıldığı ve klinik geçiş planı devreye alındığı için ekipler daha sakin bir zeminde konuşuyor.','Because the first stage used controlled isolation with a clinical transition plan, teams are communicating from a calmer foundation.'], 
      negative:['İlk aşamadaki zayıf tercih nedeniyle güvenlik ve klinik ekipler birbirini suçlamaya başladı; hasta veri riski hâlâ aktif.','Because of the weak first-stage choice, security and clinical teams have started blaming each other; patient data risk is still active.'] 
    }, 
    developments:[ ['Biyogüvenlik sorumlusu, sıcaklık alarm zincirinin etkilenmediğini doğruladı; ama dizileme görüntüleme verisinde boşluklar var — bazı varyant tespitleri şüpheli.', 'Servis firması nihayet geri döndü; "planlanmış uzaktan teşhis bağlantısı" olduğunu söylüyor ama sistem üzerinde bu bağlantı için imzalı onay belgesi yok.', 'Aynı segmentteki iki başka laboratuvar cihazının da aynı servis firması tarafından bakımının yapıldığı belirlendi — potansiyel yayılım alanı.'], 
    ['The biosafety lead confirms the temperature alarm chain was unaffected, but there are gaps in sequencing imaging data — some variant detections are suspect.', 'The service firm responded, claiming a "scheduled remote diagnostic connection" — but no signed authorization document exists in the system.', 'Two other lab devices on the same segment were also serviced by the same firm — potential spread.'] ], 
    options:[
      ['IT güvenliği, klinik liderlik, biyogüvenlik, veri koruma sorumlusu (DPO) ve hukuku ortak karar akışında buluştur; servis firmasının açıklamasını belgele.', 'Bring IT security, clinical leadership, biosafety, the data protection officer (DPO), and legal into one shared decision flow; document the vendor\'s explanation.'],
      ['Sadece teknik ekip çözsün; klinik ve GDPR boyutunu sonra ele al.', 'Let only the technical team handle it; address clinical and GDPR dimensions later.'],
      ['Servis firmasının "planlanmış bağlantı" açıklamasını kabul et; operasyona dön.', 'Accept the vendor\'s "scheduled connection" explanation; return to operations.']
    ], 
    choices:[ 
      choice('positive','🤝 Üçlü koordinasyon: klinik + güvenlik + GDPR','🤝 Triple coordination: clinical + security + GDPR','Doğru yaklaşım. Klinik süreklilik, hasta veri güvenliği ve regülatif uyumluluk üç boyutu birlikte yönetildi. Servis firmasının açıklaması belgeli kanıtla karşılaştırılıyor.','Correct approach. Clinical continuity, patient data security, and regulatory compliance are managed together. The vendor\'s explanation is being compared against documented evidence.',{ score:22, speed:8, evidence:4, coordination:20, risk:10 },'Ops Aligner','evidence'), 
      choice('negative','😢 GDPR ve hasta verisi boyutu boşta','😢 GDPR and patient data dimension unaddressed','Teknik ekibin tek başına çözmesi GDPR bildirim yükümlülüğünü kaçırma riskini doğurur; DPO ve hukuk olmadan 72 saatlik pencere bilinçsizce kaçırılabilir.','The technical team handling it alone risks missing the GDPR notification obligation; without the DPO and legal, the 72-hour window may be unknowingly missed.',{ score:-10, speed:0, evidence:0, coordination:-14, risk:-8 },'Ops Blind Spot','evidence'), 
      choice('negative','😢 Supply chain saldırısı kapanmadan devam','😢 Supply chain attack continues unaddressed','Servis firmasının açıklamasını belgesiz olarak kabul etmek, firmware backdoor\'u aktif bırakır; hasta verisi sızmaya devam eder ve kurumun hukuki pozisyonu kötüleşir.','Accepting the vendor\'s explanation without documentation leaves a firmware backdoor active; patient data continues to exfiltrate and the institution\'s legal position worsens.',{ score:-10, speed:0, evidence:-4, coordination:-12, risk:-8 },'Tech Gap','evidence') 
    ]
  }),
  evidence: stage({ 
    alert:['Firmware analizi, ağ izleri ve servis günlükleri birlikte incelenerek saldırı teyit edilmeli ya da devre dışı bırakılmalı.','Firmware analysis, network traces, and service logs must be examined together to confirm or rule out the attack.'], 
    title:['Aşama 3 — Firmware Adli Analizi, Ağ İzleri ve Supply Chain Anatomisi','Stage 3 — Firmware Forensic Analysis, Network Traces, and Supply Chain Anatomy'], 
    text:['Cihaz arızası mı, supply chain saldırısı mı, yetkisiz uzaktan bakım mı, yoksa bunların kombinasyonu mu? Firmware imzası, ağ davranışı ve servis günlükleri birlikte okunmalı. "Servis firması yetkili bağlantı yaptı" iddiası şu an belgesiz; bunu reddetmek veya doğrulamak teknik kanıta bağlı. Hasta verisi maruziyeti kapsamının belirlenmesi, GDPR bildirim kararını doğrudan etkileyecek.','Was this a device malfunction, a supply chain attack, unauthorized remote maintenance, or a combination? Firmware signature, network behavior, and service logs must be read together. The "authorized connection" claim is currently undocumented; refuting or confirming it requires technical evidence.'], 
    setting:['Servis firması "yetkili bağlantı" iddiasını yazılı olarak iletmedi. Güvenlik ekibi firmware\'in hash değerini üreticinin orijinal sürümüyle karşılaştırmak istiyor.','The service firm has not provided the "authorized connection" claim in writing. The security team wants to compare the firmware hash against the manufacturer\'s original version.'], 
    current:['Tek kaynaklı analiz yanlış sınıflandırmaya açık. GDPR bildirim kararı için hasta verisi kapsam netliği şart.','Single-source analysis is vulnerable to misclassification. Patient data scope clarity is required for the GDPR notification decision.'], 
    changedByTone:{ 
      positive:['Koordinasyon iyi kurulduğu için klinik, güvenlik ve uyumluluk ekipleri log ve kayıtlara aynı çatı altında erişiyor.','Because coordination is solid, clinical, security, and compliance teams are accessing logs and records under one roof.'], 
      negative:['Önceki çatışmalar nedeniyle bazı servis günlükleri hâlâ farklı ekiplerin elinde; eşleştirme daha yavaş ilerliyor.','Because of earlier conflicts, some service logs are still held by different teams; correlation is progressing more slowly.'] 
    }, 
    developments:[ ['Firmware hash karşılaştırması: cihaz üzerindeki firmware imzası, üreticinin orijinal sürümünden farklı — "ul_diagnostic_agent_v2.1" adlı ek bir modül tespit edildi; bu modül üretici belgesinde yok.', 'Ağ izleri, "ul_diagnostic_agent" modülünün aktif dizileme döngüleri sırasında ham sekans okuma verisi de gönderdiğini gösteriyor — bu veride hasta tanımlayıcıları olabilir.', 'Servis firmasının sistem üzerindeki oturum kayıtları, çalışan bakım yetkisi süresi dışında 03:22\'de yetkisiz giriş yaptığını ortaya koyuyor.'], 
    ['Firmware hash comparison: the device firmware differs from the manufacturer\'s original — an additional module "ul_diagnostic_agent_v2.1" was found; this module does not exist in manufacturer documentation.', 'Network traces show the module transmitted raw sequencing read data during active cycles — this data may contain patient identifiers.', 'Service firm session logs show an unauthorized login at 03:22, outside working maintenance hours.'] ], 
    options:[
      ['Firmware imzası, ağ izleri ve servis günlükleri dahil tüm kaynakları birlikte analiz et; supply chain saldırısı anatomisini rekonstrükte et ve hasta veri kapsamını netleştir.', 'Analyze all sources including firmware signature, network traces, and service logs together; reconstruct the supply chain attack anatomy and clarify patient data scope.'],
      ['Sadece ağ trafiğine bak; firmware analizi zaman alır.', 'Review only network traffic; firmware analysis takes too long.'],
      ['"ul_diagnostic_agent" modülünü servis firmasının yetkili aracı varsay; ağ trafiği normaldir.', 'Assume "ul_diagnostic_agent" is an authorized vendor tool; network traffic is normal.']
    ], 
    choices:[ 
      choice('positive','🔬 Supply chain saldırısı teyit edildi + GDPR kararı netleşti','🔬 Supply chain attack confirmed + GDPR decision clarified','Kapsamlı analiz. Firmware backdoor anatomisi ortaya çıktı, hasta veri kapsamı belirlendi ve GDPR bildirim kararı savunulabilir kanıtla verilebilecek konuma geldi.','Comprehensive analysis. The firmware backdoor anatomy was revealed, patient data scope was determined, and the GDPR notification decision can now be made with defensible evidence.',{ score:24, speed:4, evidence:20, coordination:4, risk:10 },'Systems Thinker','decision'), 
      choice('negative','😢 Firmware backdoor görünmez kaldı','😢 Firmware backdoor remains invisible','Yüzeysel trafik analizi, firmware seviyesindeki arka kapının anatomisini ve tam hasta veri kapsamını görmez. GDPR bildirimi sağlam kanıt olmadan yapılmak zorunda kalınır.','Superficial traffic analysis misses the firmware-level backdoor anatomy and full patient data scope.',{ score:-12, speed:2, evidence:-12, coordination:0, risk:-8 },'Narrow Lens','decision'), 
      choice('negative','😢 Supply chain saldırısı örtbası riski','😢 Supply chain attack cover-up risk','Belgelenmemiş bir servis aracını yetkili varsaymak supply chain saldırısını aktif bırakır; hasta verisi sızmaya devam eder. Regülatif ve hukuki açıdan en riskli karar.','Assuming an undocumented vendor tool is authorized leaves the supply chain attack active; patient data continues to exfiltrate. The highest-risk decision from a regulatory perspective.',{ score:-14, speed:0, evidence:-14, coordination:-6, risk:-8 },'Assumption Bias','decision') 
    ]
  }),
  decision: stage({ 
    alert:['GDPR bildirimi, servis firması yönetimi, firmware temizleme ve ağ segmentasyonu kararları bekleniyor.','GDPR notification, vendor management, firmware remediation, and network segmentation decisions are awaited.'], 
    title:['Aşama 4 — GDPR Bildirimi, Servis Firması Yönetimi ve Altyapı Güçlendirme','Stage 4 — GDPR Notification, Vendor Management, and Infrastructure Hardening'], 
    text:['Supply chain saldırısı doğrulandı. Şimdi dört paralel karar verilmeli: GDPR kapsamında denetim otoritesine bildirim, servis firmasıyla sözleşme yönetimi (erişim iptali, delil koruma), firmware temizleme + yeni onaylı firmware kurulumu ve aynı firmadan bakım alan diğer cihazlar için segmentasyon planı.','The supply chain attack is confirmed. Four parallel decisions must now be made: GDPR notification to the supervisory authority, vendor contract management (access revocation, evidence preservation), firmware remediation plus new approved firmware installation, and a segmentation plan for other devices serviced by the same firm.'], 
    setting:['Klinik liderlik yeni kesinti istemiyor; güvenlik ekibi tüm firmadan bakım alan cihazları izole etmek istiyor. DPO 72 saatlik GDPR penceresinin yarısında olduğunu söylüyor.','Clinical leadership wants no new disruption; the security team wants to isolate all devices serviced by the firm. The DPO says they are at the midpoint of the 72-hour GDPR window.'], 
    current:['GDPR 72 saatlik pencere yarı kapandı. Firmware backdoor diğer cihazlara da sıçramış olabilir. Servis firmasının sisteme erişimi hâlâ aktif.','The GDPR 72-hour window is half-closed. The firmware backdoor may have spread to other devices. The vendor still has active system access.'], 
    changedByTone:{ 
      positive:['Kapsamlı analizin sağladığı netlik, GDPR bildirimi ve firmware temizleme kararlarının hedefli yapılmasını sağlıyor.','The clarity from comprehensive analysis enables targeted GDPR notification and firmware remediation decisions.'], 
      negative:['Belirsizlikler sürdüğünden daha geniş güvenlik marjı bırakmak ve daha pahalı kontroller uygulamak zorunda kalabilirsiniz.','Because uncertainty remains, you may need broader safety margins and more expensive controls.'] 
    }, 
    developments:[ ['ENISA, aynı servis firmasının Avrupa\'da 9 araştırma kurumunu etkilediğini ve bir supply chain kampanyasının parçası olduğunu doğruladı — Interpol soruşturması başlatıldı.', 'Denetim otoritesi, hasta sekans verisi ihlali bildiriminin 72 saat içinde yapılması gerektiğini teyit etti; süre 14 saat sonra dolacak.', 'Üretici, orijinal sertifikalı firmware kurulumu için uzak destek sağlamaya hazır; "ul_diagnostic_agent" modülünü kesinlikle tanımıyor.'], 
    ['ENISA confirmed the same service firm affected 9 research institutions across Europe as part of a supply chain campaign — Interpol launched an investigation.', 'The supervisory authority confirmed that patient sequencing data breach notification must be filed within 72 hours; the deadline is in 14 hours.', 'The manufacturer is ready to provide remote support for installing the original certified firmware; they do not recognize the "ul_diagnostic_agent" module.'] ], 
    options:[
      ['GDPR bildirimini yap, servis firmasının sistem erişimini iptal et, üretici destekli firmware temizleme + yeniden kurulum gerçekleştir ve aynı firmadan bakım alan tüm cihazlar için ağ segmentasyonu uygula.', 'File GDPR notification, revoke vendor system access, perform manufacturer-supported firmware reinstallation, and apply network segmentation to all devices serviced by the same firm.'],
      ['Sadece cihazı yeniden başlat; servis firmasının erişimini iptal etme, ilişkiyi bozmasın.', 'Just restart the device; do not revoke vendor access — avoid damaging the relationship.'],
      ['GDPR bildirimini ertele; hasta verisi kesin olarak doğrulandığında bildir.', 'Delay GDPR notification; notify only when patient data is definitively confirmed.']
    ], 
    choices:[ 
      choice('positive','🏆 Koordineli kapanış: GDPR + supply chain + dayanıklılık','🏆 Coordinated closure: GDPR + supply chain + resilience','Mükemmel kapanış. GDPR bildirimi zamanında yapıldı, servis firması erişimi güvenli biçimde iptal edildi, firmware temizlendi ve segmentasyon planı oluşturuldu.','Excellent closure. GDPR notification was timely, vendor access safely revoked, firmware cleaned, and a segmentation plan was created for all devices serviced by the same firm.',{ score:28, speed:8, evidence:4, coordination:16, risk:20 },'Resilience Builder','end'), 
      choice('negative','😢 Servis firması erişimi açık, firmware backdoor aktif','😢 Vendor access open, firmware backdoor active','Cihazı yeniden başlatmak firmware backdoor\'unu temizlemez. Servis firmasının erişimi açık kaldıkça supply chain saldırganı sisteme girmeye devam eder.','Restarting the device does not clean the firmware backdoor. With vendor access still open, the supply chain attacker can continue to access the system.',{ score:-10, speed:4, evidence:0, coordination:-6, risk:-10 },'Replace Only','end'), 
      choice('negative','😢 GDPR ihlali ve regülatif yaptırım riski','😢 GDPR violation and regulatory sanction risk','GDPR bildirimini ertelemek, denetim otoritesinin soruşturmasında kurumun ihlali örtbas etmeye çalıştığı izlenimini verir.','Delaying GDPR notification creates the impression the institution tried to cover up the breach. The delay penalty can be far heavier than the active breach penalty.',{ score:-18, speed:0, evidence:0, coordination:-8, risk:-18 },'Repeat Risk','end') 
    ]
  })
}; }

function buildInsiderNodes() { return {
  start: stage({ 
    alert:['Doktora öğrencisi, yayımlanmamış mRNA araştırma verisini kişisel bulut üzerinden kurumsal dışı kişiyle paylaştı — alıcının biyoteknoloji girişimiyle bağlantısı var.','A PhD student shared unpublished mRNA research data via personal cloud with someone outside the institution — the recipient has connections to a biotech startup.'], 
    title:['Aşama 1 — Paylaşımı Durdur, Bağlamı Koruyarak Kayıt Aç','Stage 1 — Stop the Sharing and Record It Without Losing Context'], 
    text:['Tez savunması iki ay kalan doktora öğrencisi Zara Kowalski, "mRNA tedavi protokolü optimizasyonu" alanında birlikte makale yazdığı başka bir üniversitedeki Doç. Dr. Chen ile ham deney verilerini ve laboratuvar defteri notlarını kişisel Dropbox hesabı üzerinden paylaşmış. Araştırma güvenliği ofisi bu paylaşımı rutin log incelemesinde fark etti. Paylaşılan veride kurumun 2 yıllık endüstriyel ortaklık projesinden çıkan ham LNP formülasyon sonuçları da var. Asıl endişe: Doç. Dr. Chen\'in aynı zamanda aynı mRNA formülasyon alanında aktif patent başvurusu yapan bir biyoteknoloji girişiminin bilimsel danışmanı olduğunun tespit edilmesi. Zara bu çakışmadan habersiz.', 'PhD student Zara Kowalski, two months from her thesis defense, shared raw experimental data and lab notebook entries with Assoc. Prof. Dr. Chen via her personal Dropbox. The research security office noticed the share in routine log review. The shared data includes raw LNP formulation results from the institution\'s two-year industrial partnership project. Key concern: Dr. Chen is a scientific advisor to a biotech startup actively filing patents in the same mRNA formulation area. Zara is unaware of this conflict.'], 
    setting:['Tez döneminin son aşaması, hibe başvuru sezonu. Makale revizyon süreci devam ediyor; editör revizyon deadline\'ı bu hafta. Danışman Prof. bu paylaşımdan haberdar değil.','Final stage of the thesis period, grant application season. Paper revision is ongoing; the editor\'s revision deadline is this week. Supervisor Prof. is unaware of this sharing.'], 
    current:['Paylaşılan Dropbox linki hâlâ aktif. Dr. Chen dosyalara erişmiş mi bilinmiyor. Endüstriyel ortak sözleşmesinde bu verilerin üçüncü tarafla paylaşımı kısıtlı.','The shared Dropbox link is still active. Whether Dr. Chen has accessed the files is unknown. The industrial partner agreement restricts sharing these data with third parties.'], 
    changed:['İlk aşama: önceki karar etkisi yok; ama paylaşım bağlantısı aktif kaldıkça endüstriyel ortak ve patent riski artıyor.','First stage: no previous-choice effect; but as long as the sharing link remains active, industrial partner and patent risk grows.'], 
    developments:[ ['Dropbox erişim logu, Dr. Chen\'in paylaşım bağlantısını 22 dakika önce açtığını gösteriyor — veri indirilmiş olabilir.', 'Dr. Chen\'in danışmanlık yaptığı biyoteknoloji girişiminin, paylaşılan LNP verisiyle doğrudan örtüşen iki patent başvurusunu geçen ay yaptığı patent veri tabanında tespit edildi.', 'Endüstriyel ortaklık sözleşmesi, bu verilerin başka kurumla paylaşılması için PI + sözleşme yöneticisi çift onayı gerektiriyor — Zara\'nın böyle bir onayı yok.'], 
    ['The Dropbox access log shows Dr. Chen opened the sharing link 22 minutes ago — the data may have been downloaded.', 'Patent database search revealed that the biotech startup Dr. Chen advises filed two patent applications last month directly overlapping with the shared LNP data.', 'The industrial partnership agreement requires dual approval (PI + contract manager) to share this data with another institution — Zara has no such approval.'] ], 
    options:[
      ['Dropbox bağlantısını hemen iptal et, Dr. Chen\'in erişim durumunu kaydet ve Zara\'ya suçlayıcı olmayan bir çerçevede durumu açıklayan yapılandırılmış olay kaydı aç.', 'Immediately revoke the Dropbox link, record Dr. Chen\'s access status, and open a structured incident record explaining the situation to Zara in a non-accusatory framework.'],
      ['Zara\'yı herkesin önünde ofiste sorgula — "neden böyle yaptın?"', 'Publicly question Zara in the office — "why did you do this?"'],
      ['Niyet iyi görünüyor, makale iş birliği normaldir; olayı görmezden gel.', 'The intent looks good and paper collaboration is normal; ignore the incident.']
    ], 
    choices:[ 
      choice('positive','📝 Anında eylem + bağlam koruyarak kayıt','📝 Immediate action + context-preserving record','Doğru yaklaşım. Endüstriyel ortak ve patent riski durduruldu. Zara\'ya suçlayıcı olmayan çerçeveyle yaklaşmak, sonraki aşamalar için bilgi verme isteğini koruyor.','Correct approach. The industrial partner and patent risk was stopped. Approaching Zara in a non-accusatory framework preserves her willingness to provide information for subsequent stages.',{ score:24, speed:10, evidence:14, coordination:8, risk:16 },'Governance Anchor','comms'), 
      choice('negative','😢 Tez öğrencisi savunmaya geçiyor, bilgi kapandı','😢 PhD student becomes defensive, information flow closed','Açık sorgulama Zara\'yı savunmaya iter; Dr. Chen bağlantısı ve patent çakışmasının tam boyutu gizlenir. Nesnel analiz imkânsızlaşır.','Public questioning pushes Zara into a defensive posture; the full extent of Dr. Chen\'s connection and the patent overlap is concealed. Objective analysis becomes impossible.',{ score:-16, speed:0, evidence:-6, coordination:-16, risk:-8 },'Public Blame','comms'), 
      choice('negative','😢 Patent penceresi açık, endüstriyel ortak korumasız','😢 Patent window open, industrial partner unprotected','İyi niyet veri ihlalini veya patent riskini ortadan kaldırmaz. Makale iş birliği normaldir; ama endüstriyel ortaklık verisini çıkar çatışması içinde olan biriyle paylaşmak için izin gerekmektedir.','Good intent does not eliminate the data breach or patent risk. Paper collaboration is normal; but sharing industrial partnership data with someone with a conflict of interest requires authorization.',{ score:-20, speed:-10, evidence:-6, coordination:-6, risk:-18 },'Intent Bias','comms') 
    ]
  }),
  comms: stage({ 
    alert:['Endüstriyel ortak ilişkisi, patent penceresi ve akademik etik boyutları aynı anda yönetilmeli.','The industrial partner relationship, patent window, and academic ethics dimensions must be managed simultaneously.'], 
    title:['Aşama 2 — Çıkar Çatışması, Endüstriyel Ortak ve Sistem Odaklı Analiz','Stage 2 — Conflict of Interest, Industrial Partner, and System-Focused Analysis'], 
    text:['Bu aşamada amaç Zara\'yı "suçlu" olarak etiketlemek değil; hangi süreç baskılarının, bilgi eksikliklerinin ve kurumsal görünürlük açıklarının bu durumu mümkün kıldığını anlamak. Zara gerçekten çıkar çatışmasından haberdar değildi; ama bu bilgisizliğin sistematik bir sebebi var mı? Aynı zamanda endüstriyel ortak sözleşmesindeki yükümlülükler ve patent penceresi acil karar gerektiriyor.','The goal here is not to label Zara as "guilty" but to understand which process pressures, knowledge gaps, and institutional visibility failures made this situation possible. At the same time, obligations in the industrial partner agreement and the patent window require urgent decisions.'], 
    setting:['Danışman Prof. olayı öğrenince "önce nasıl çözeceğimizi konuşalım" dedi — akademik etik süreci başlatmaktan kaçınıyor. Endüstriyel ortak ise sözleşmesel bildirim bekliyor.','The Supervisor Prof., upon learning of the incident, said "let\'s first talk about how to solve this" — avoiding initiating an academic ethics process. The industrial partner is awaiting contractual notification.'], 
    current:['Dr. Chen veriye 22 dakika önce erişti; biyoteknoloji girişiminin patent portföyüyle örtüşme var. Zara\'nın danışmanı olayı örtbas etmek istiyor gibi görünüyor.','Dr. Chen accessed the data 22 minutes ago; there is overlap with the biotech startup\'s patent portfolio. Zara\'s supervisor appears to want to cover up the incident.'], 
    changedByTone:{ 
      positive:['İlk aşama profesyonel yürütüldüğü için Zara daha açık konuşuyor; Dr. Chen\'in danışmanlık ilişkisi hakkında bilgi vermeye istekli.','Because the first stage was handled professionally, Zara is speaking more openly; she is willing to provide information about Dr. Chen\'s advisory relationship.'], 
      negative:['Önceki kararın yarattığı gerginlik Zara\'yı savunmaya itti; danışman Prof. da örtbas stratejisini destekler görünüyor.','Tension from the prior decision pushed Zara into a defensive posture; the supervisor also appears to be supporting a cover-up strategy.'] 
    }, 
    developments:[ ['Dr. Chen\'in danışmanlık yaptığı biyoteknoloji girişiminin son patent başvurularında kullandığı metodoloji, Zara\'nın paylaştığı LNP formülasyon verisiyle teknik olarak örtüşüyor — patent uzmanı "endişe verici" diyor.', 'Endüstriyel ortak sözleşmesi, bu tip paylaşım olaylarında 72 saat içinde bildirim zorunluluğu içeriyor; süre dolmak üzere.', 'Danışman Prof.\'un "önce kendimiz çözelim" yaklaşımı, akademik etik yönetmeliğinin zorunlu bildirim maddesiyle çelişiyor.'], 
    ['The methodology in the biotech startup\'s recent patent applications technically overlaps with the LNP formulation data Zara shared — the patent specialist says "concerning."', 'The industrial partnership agreement requires notification within 72 hours for this type of sharing event; the deadline is approaching.', 'The Supervisor Prof.\'s "let\'s solve it ourselves" approach conflicts with the mandatory notification clause in the academic ethics regulation.'] ], 
    options:[
      ['Danışman Prof., araştırma bütünlüğü ofisi, sözleşme yöneticisi ve endüstriyel ortakla yapılandırılmış değerlendirme yürüt; danışmanın örtbas girişimini kayıt altına al.', 'Run a structured review with the Supervisor Prof., research integrity office, contract manager, and industrial partner; document the supervisor\'s attempted cover-up.'],
      ['Süreci tamamen danışman Prof. ve HR\'a bırak.', 'Leave the process entirely to the Supervisor Prof. and HR.'],
      ['Sadece teknik boyuta odaklan; çıkar çatışması ve akademik etik boyutunu dışarıda bırak.', 'Focus only on the technical side; exclude the conflict of interest and academic ethics dimensions.']
    ], 
    choices:[ 
      choice('positive','⚖️ Sistem odaklı + çok aktörlü yanıt','⚖️ System-focused + multi-actor response','Güçlü yaklaşım. Olay kişisel suçlamadan sistem odaklı analize taşındı. Danışmanın örtbas girişiminin kayıt altına alınması hem kurumu korur hem kurumsal bütünlüğü destekler.','Strong approach. The event moved from personal blame to system-focused analysis. Documenting the supervisor\'s cover-up attempt both protects the institution and supports institutional integrity.',{ score:22, speed:8, evidence:4, coordination:18, risk:10 },'Fair Coordinator','evidence'), 
      choice('negative','😢 Çıkar çatışması ve örtbas görünmez kalıyor','😢 Conflict of interest and cover-up remain invisible','Sadece HR ve danışmana bırakmak, danışmanın çatışmalı pozisyonunu görmezden gelir; endüstriyel ortak sözleşme ihlali durumu çözümsüz kalır.','Leaving it to only HR and the supervisor ignores the supervisor\'s conflicted position; the industrial partner contract violation remains unresolved.',{ score:-10, speed:0, evidence:-2, coordination:-12, risk:-8 },'HR Only','evidence'), 
      choice('negative','😢 Akademik etik ve patent riski körleşiyor','😢 Academic ethics and patent risk go blind','Teknik boyuta odaklanmak, Dr. Chen\'in çıkar çatışmasını ve danışmanın örtbas girişimini analiz dışı bırakır. Bu yalnızca bir veri güvenliği sorunu değil; araştırma bütünlüğü ve IP sorunu.','Focusing only on the technical side excludes Dr. Chen\'s conflict of interest and the supervisor\'s cover-up attempt. This is not only a data security problem; it is a research integrity and IP problem.',{ score:-10, speed:0, evidence:0, coordination:-10, risk:-8 },'Human Blind Spot','evidence') 
    ]
  }),
  evidence: stage({ 
    alert:['İçerik, alıcı, patent örtüşmesi ve sistem sapması birlikte analiz edilmeli.','Content, recipient, patent overlap, and system deviation must be analyzed together.'], 
    title:['Aşama 3 — Paylaşım Kapsamı, Patent Örtüşmesi ve Zara\'nın Gerçek Bilgi Durumu','Stage 3 — Sharing Scope, Patent Overlap, and Zara\'s Actual Knowledge State'], 
    text:['Ne paylaşıldı, Dr. Chen gerçekten indirdi mi, patent örtüşmesinin teknik boyutu nedir ve Zara Dr. Chen\'in biyoteknoloji danışmanlığından ne kadar haberdardı? Bu sorular adil ve etkili bir karar için ayrıntılı cevaplanmalı. Zara\'nın bilgi durumu — çıkar çatışmasından gerçekten habersizdi mi, yoksa görmezden mi geldi? — hem akademik etik hem hukuki boyut için belirleyici.','What was shared, did Dr. Chen actually download it, what is the technical extent of the patent overlap, and how much did Zara know about Dr. Chen\'s biotech advisory role? These questions require detailed answers. Zara\'s knowledge state — genuinely unaware of the conflict, or did she ignore it? — is determinative for both academic ethics and legal dimensions.'], 
    setting:['Dr. Chen şu an ulaşılamıyor. Endüstriyel ortağın sözleşme yöneticisi sabah 10\'da arama istiyor. Biyoteknoloji girişiminin patent başvurusu son patent tarihinden 3 ay önce yapılmış.','Dr. Chen is currently unreachable. The industrial partner\'s contract manager wants a call at 10 AM. The biotech startup\'s patent application was filed 3 months before the latest patent date.'], 
    current:['Dropbox indirme logu Dr. Chen\'in veriyi indirdiğini gösteriyor; ama hangi dosyaları, tam olarak ne kadar indirdiği bilinmiyor. Biyoteknoloji girişiminin patent başvurusu tarihsel olarak endüstriyel ortaklık verisiyle örtüşüyor.','The Dropbox download log shows Dr. Chen downloaded data; but which files and exactly how much is unknown. The patent filing dates historically overlap with the industrial partnership data.'], 
    changedByTone:{ 
      positive:['Sistem odaklı yaklaşım sayesinde Zara ve süreç sahipleri daha açık bilgi veriyor.','Because of the system-focused approach, Zara and process owners are providing clearer information.'], 
      negative:['Önceki hatalar yüzünden bilgi verme isteği azaldı; Zara danışmanın etkisiyle kapalı tutum sergiliyor.','Because of earlier mistakes, willingness to share information has decreased; Zara is maintaining a closed posture.'] 
    }, 
    developments:[ ['Dropbox log analizi, Dr. Chen\'in 340 MB veri indirdiğini gösteriyor — bunların 180 MB\'ı endüstriyel ortaklık kapsamındaki ham LNP formülasyon dosyaları.', 'Zara\'nın Dr. Chen ile e-posta yazışması, Dr. Chen\'in "biyoteknoloji ortaklığı" hakkında önceki konuşmalarında bahsettiğini gösteriyor — Zara farkındaydı ama çıkar çatışması boyutunu anlamamış.', 'Biyoteknoloji girişiminin patent başvurusu, endüstriyel ortaklık projesinin başladığı tarihten 4 ay sonra yapılmış — zamansal çakışma soruşturma başlatmak için yeterli.'], 
    ['Dropbox log analysis shows Dr. Chen downloaded 340 MB — 180 MB of which are raw LNP formulation files within the industrial partnership scope.', 'Zara\'s email correspondence shows Dr. Chen mentioned a "biotech partnership" in previous conversations — Zara was aware of the advisory relationship but did not understand its conflict of interest dimension.', 'The biotech startup\'s patent application was filed 4 months after the industrial partnership project started — temporal overlap is sufficient to initiate investigation.'] ], 
    options:[
      ['İçerik, indirme kapsamı, patent örtüşmesi tarihseli ve Zara\'nın gerçek bilgi durumunu sistematik biçimde analiz et.', 'Systematically analyze content, download scope, patent overlap timeline, and Zara\'s actual knowledge state.'],
      ['Zara\'nın "iyi niyetli" olduğu açık; detaylı analiz gereksiz, süreci kapat.', 'Zara\'s "good intent" is obvious; detailed analysis is unnecessary — close the process.'],
      ['Konuyu normalleştir; akademik iş birlikleri bu tür veri paylaşımlarını içerir.', 'Normalize the situation; academic collaborations include this kind of data sharing.']
    ], 
    choices:[ 
      choice('positive','🧠 Adil + çok boyutlu bağlam analizi','🧠 Fair + multi-dimensional context analysis','Adil ve etkili karar için gereken görünürlük sağlandı. Zara\'nın nüanslı bilgi durumunun analizi — farkındaydı ama boyutunu anlamamıştı — hem akademik etik hem hukuki pozisyon için kritik.','The visibility needed for a fair and effective decision was established. The nuanced analysis of Zara\'s knowledge state is critical for both academic ethics and legal positioning.',{ score:24, speed:4, evidence:20, coordination:4, risk:10 },'Context Analyst','decision'), 
      choice('negative','😢 Eksik bağlam, haksız veya yetersiz karar riski','😢 Incomplete context, risk of unfair or insufficient decision','Detaysız kapanış iki yönde hatalı olabilir: Zara\'ya haksız sonuç veya endüstriyel ortağın maruziyetini görmezden gelen yetersiz yanıt.','A superficial closure can be wrong in two directions: an unfair outcome for Zara or an inadequate response ignoring the industrial partner\'s exposure.',{ score:-12, speed:2, evidence:-12, coordination:0, risk:-8 },'Thin Context','decision'), 
      choice('negative','😢 Araştırma bütünlüğü aşınması','😢 Research integrity erosion','Normalleştirme, endüstriyel ortaklık verisinin çıkar çatışması olan biriyle paylaşılmasını "normal akademik iş birliği" olarak kodlar. Bu kurumsal araştırma bütünlüğü standartlarını fiilen düşürür.','Normalization codes sharing industrial partnership data with a conflict-of-interest person as "normal academic collaboration." This effectively lowers the institution\'s research integrity standards.',{ score:-14, speed:0, evidence:-10, coordination:-4, risk:-10 },'Normalization Drift','decision') 
    ]
  }),
  decision: stage({ 
    alert:['Kurumdan üç ayrı boyutta yanıt bekleniyor: Zara, Dr. Chen ve sistem yapısal değişikliği.','The institution is expected to respond on three separate dimensions: Zara, Dr. Chen, and structural system change.'], 
    title:['Aşama 4 — Orantılı Yanıt, Endüstriyel Ortak Bildirimi ve Kültürel Dönüşüm','Stage 4 — Proportionate Response, Industrial Partner Notification, and Cultural Transformation'], 
    text:['Yanıt üç boyutu birlikte kapsamalı: Zara için orantılı ve öğrenme odaklı bir sonuç; Dr. Chen ve biyoteknoloji girişimi için kurumsal iletişim ve hukuki pozisyon netleştirme; ve bu olayı mümkün kılan sistem açıklarını kapatan yapısal değişiklikler. Danışmanın örtbas girişimi de kurumsal kayıt ve araştırma bütünlüğü değerlendirmesi gerektiriyor.','The response must cover three dimensions together: a proportionate, learning-focused outcome for Zara; institutional communication and legal position clarification for Dr. Chen and the biotech startup; and structural changes closing the system gaps. The supervisor\'s attempted cover-up also requires institutional documentation and a research integrity assessment.'], 
    setting:['Endüstriyel ortak bildirim için 4 saat kaldı. Patent uzmanı, biyoteknoloji girişimine karşı öncelik belgesi oluşturulması için haftanın sonuna kadar pencere olduğunu söylüyor. Zara tez savunmasına devam edebileceğini endişeyle soruyor.','4 hours remain for the industrial partner notification. The patent specialist says there is a window until end of week to establish a priority document. Zara is anxiously asking whether she can continue to her thesis defense.'], 
    current:['Endüstriyel ortak bildirim acil. Patent öncelik belgesi hafta sonuna kadar hazırlanabilir. Danışman Prof.\'un örtbas girişiminin kaydedilmesi kurumu korur.','Industrial partner notification is urgent. Patent priority document can be prepared by end of week. Documenting the supervisor\'s cover-up attempt protects the institution.'], 
    changedByTone:{ 
      positive:['Kapsamlı bağlam analizi sayesinde üç boyutu da kapsayan hedefli ve orantılı yanıt tasarlayabiliyorsunuz.','The comprehensive context analysis enables you to design a targeted and proportionate response covering all three dimensions.'], 
      negative:['Belirsizlikler ve Zara\'nın kapalı tutumu nedeniyle daha geniş ve daha pahalı önlemler almak zorunda kalabilirsiniz.','Because of uncertainties and Zara\'s closed posture, you may need to take broader and more expensive measures.'] 
    }, 
    developments:[ ['Endüstriyel ortak, olayı öğrendikten sonra araştırma ortaklığını askıya aldı; sözleşmede belirtilen 72 saatlik bildirim yükümlülüğü yerine getirilmezse tazminat talebi açabilir.', 'Patent uzmanı, endüstriyel ortakla birlikte öncelik belgesi hazırlanmasının biyoteknoloji girişiminin patent başvurularını zayıflatacağını söylüyor.', 'Araştırma bütünlüğü ofisi, danışman Prof.\'un örtbas girişimini bağımsız olarak değerlendirmek istiyor; bu Zara\'nın tez sürecinden bağımsız bir soruşturma.'], 
    ['The industrial partner suspended the research partnership upon learning of the incident; if the 72-hour notification obligation is not met, they can file a damages claim.', 'The patent specialist says preparing a priority document jointly with the industrial partner will weaken the biotech startup\'s patent applications.', 'The research integrity office wants to independently assess the Supervisor Prof.\'s cover-up attempt — separate from Zara\'s thesis process.'] ], 
    options:[
      ['Endüstriyel ortağa zamanında ve şeffaf bildirim yap, patent öncelik belgesini ortakla birlikte hazırla, Zara için öğrenme odaklı orantılı sonuç tasarla ve danışman Prof.\'un girişimini araştırma bütünlüğü ofisine ilet.', 'Make timely and transparent notification to the industrial partner, prepare the patent priority document jointly with them, design a learning-focused proportionate outcome for Zara, and refer the Supervisor Prof.\'s attempt to the research integrity office.'],
      ['Sadece Zara\'ya yazılı uyarı ver; diğer boyutları görmezden gel.', 'Give Zara only a written warning; ignore the other dimensions.'],
      ['Hiçbir resmi aksiyon alma; zaten zararın boyutu belli değil.', 'Take no formal action; the extent of damage is not yet certain anyway.']
    ], 
    choices:[ 
      choice('positive','🌟 Üç boyutlu orantılı ve yapısal yanıt','🌟 Three-dimensional proportionate and structural response','Mükemmel. Endüstriyel ortak bildirimi, patent koruması, Zara\'nın tezi için destek, danışmanın araştırma bütünlüğü değerlendirmesi ve kurumsal sistem güçlendirme — tüm boyutlar birlikte yönetildi.','Excellent. Industrial partner notification, patent protection, support for Zara\'s thesis, a research integrity assessment for the supervisor, and institutional system strengthening — all dimensions managed together.',{ score:28, speed:8, evidence:4, coordination:16, risk:20 },'Culture Builder','end'), 
      choice('negative','😢 Sistem öğrenmedi, endüstriyel ortak kaybediliyor','😢 System does not learn, industrial partner being lost','Kişisel uyarı tek başına endüstriyel ortaklık, patent riski veya akademik etik sorunlarını çözmez. Ortaklık askıda, patent penceresi kapanıyor.','A personal warning alone does not address the industrial partnership, patent risk, or academic ethics issues. The partnership is suspended, the patent window is closing.',{ score:-10, speed:2, evidence:0, coordination:-8, risk:-10 },'Personalized Fix','end'), 
      choice('negative','😢 Tüm boyutlarda aktif kayıp','😢 Active loss across all dimensions','Hareketsizlik endüstriyel ortaklık tazminat riskini, biyoteknoloji patent kayıplarını ve araştırma bütünlüğü eroziyonunu aynı anda büyütür.','Inaction simultaneously amplifies industrial partner damages risk, biotech patent losses, and research integrity erosion.',{ score:-18, speed:0, evidence:0, coordination:-8, risk:-18 },'Policy Erosion','end') 
    ]
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
    threatLevel: 'Threat Level', mode: 'Mode', scenarios: 'Scenarios', presenter: 'Presenter', dynamic: 'Dynamic', interactivePresentation: 'Interactive Presentation', branchingCases: '5 Branching Cases', presenterName: 'Prof. Dr. Ahmet Altun', openingSlide: 'Opening Slide', closingSlide: 'Closing Slide', scenarioSelection: 'Scenario Selection', chooseScenario: 'Bir senaryo seçin', chooseScenarioDesc: 'Her senaryo 4 aşamalı, çok adımlı ve gerçekçi bir incident simulation akışı içerir. Her aşamada önce bağlamı okur, sonra karar verirsiniz; puan, rozet, süre baskısı ve düzeltme mekanikleri korunur.', toneStandard: 'Standart', toneDramatic: 'Dramatik', toneAcademic: 'Akademik', howToPlay: 'How to Play', gameLogic: 'Oyun mantığı', axes: 'Değerlendirme eksenleri', expectedApproach: 'Beklenen yaklaşım', complete: 'Simulation Complete', completed: 'Senaryo Tamamlandı', shortDebrief: 'Kısa Debrief', branchProgress: 'Branch Progress', branchPath: 'Yol', stageSummaryTitle: 'Aşama Özeti', settingTitle: 'Ortam / Bağlam', currentTitle: 'Mevcut Durum', changedTitle: 'Önceki Kararın Etkisi', developmentsTitle: 'Yeni Gelişmeler ve Bulgular', optionsTitle: 'Şu Anki Seçenekler', score: 'Toplam Skor', stage: 'Aşama', speed: 'Hız', evidence: 'Kanıt Koruma', coordination: 'Koordinasyon', risk: 'Risk Kontrolü', progress: 'Response Progress', whatWouldYouDo: 'Ne yaparsınız?', keyboardHint: '⌨️ 1-5 ile seçim yapabilir, Enter ile ilerleyebilirsiniz.', bonusActive: '🏅 Bonus fırsatı aktif', positive: 'Pozitif Kazanım', negative: 'Riskli Sonuç', neutral: 'Ara Yol / Kısmi Sonuç', timeout: 'Süre Doldu', continue: 'Devam Et', retry: 'Geri dön, tekrar dene', retryPenalty: 'Puan değişmez — önceki ceza kalır, bonus kazanılamaz.', start: 'Senaryoyu Başlat', back: 'Geri Dön', backToSelection: 'Senaryo Seçimine Dön', fullscreen: '⛶ Sunum Modu', fullscreenExit: '🡼 Sunum Modundan Çık', presentation: '🎤 Projeksiyon Görünümü', presentationOff: '🧾 Normal Görünüm', soundOn: '🔊 Ses Açık', soundOff: '🔇 Ses Kapalı', lang: '🌐 EN', themeDark: '🌙 Dark', themeLight: '☀️ Light', timer: 'sn', scenarioMeta: '4 aşamalı • puanlamalı • rozetli', onboardingSummary: 'Her senaryo 4 aşamalıdır.|Her aşamada 1 karar verirsiniz.|Doğru seçimler puan ve rozet kazandırır.|Yanlış seçimler risk puanı ve kaliteyi düşürür.', onboardingAxes: 'Hız|Kanıt bütünlüğü|Kurumsal koordinasyon|Risk kontrolü', onboardingExpected: 'Containment + delil koruma dengesi|Doğru eskalasyon|SOP ve governance uyumu|Olaydan öğrenme ve debrief', debrief: ['Containment ile delil bütünlüğü arasında denge kurmak temel başarı ölçütüdür.','Doğru eskalasyon, teknik doğruluk kadar kurumsal güven üretir.','SOP, governance ve audit trail eksikliği iyi teknik kararları bile zayıflatabilir.','Her incident response süreci, debrief ile kurumsal öğrenmeye çevrilmelidir.'], tags: ['Containment', 'Evidence Integrity', 'Institutional Coordination'], noBadge: '😢 Bu turda rozet kazanılamadı', finalHigh: 'Çok güçlü bir performans. Hız, delil bütünlüğü, koordinasyon ve risk kontrolü dengeli ve profesyonel biçimde yönetildi.', finalMid: 'Genel olarak güçlü bir performans. Bazı karar noktalarında yönetişim ve olay sınıflandırması daha da rafine edilebilir.', finalLow: 'Bu senaryoda kritik zafiyetler oluştu. Gecikme, eksik koordinasyon veya delil kaybı olay etkisini büyütmüş olabilir.', elite: 'Elite Response Lead 🏆', mid: 'Operational Coordinator 🧠', low: 'High-Risk Path 😢', liveAlertPrefix: 'Canlı uyarı akışı:', infoPanel: 'Bilgi Paneli', expandPanel: 'Paneli aç', collapsePanel: 'Paneli kapat', exampleMessage: 'Örnek Mesaj', suspiciousEmailTitle: 'Örnek Şüpheli E-posta'
  },
  en: {
    eyebrow: 'Türkiye Biosecurity Workshop 2026 • Gamified Simulation', title: 'Incident Response: What Would You Do?', subtitle: 'A multi-scenario, scored workshop demo designed to make institutional decision quality, escalation accuracy, and evidence integrity visible at the intersection of biosecurity and cybersecurity.', threatLevel: 'Threat Level', mode: 'Mode', scenarios: 'Scenarios', presenter: 'Presenter', dynamic: 'Dynamic', interactivePresentation: 'Interactive Presentation', branchingCases: '5 Branching Cases', presenterName: 'Prof. Dr. Ahmet Altun', openingSlide: 'Opening Slide', closingSlide: 'Closing Slide', scenarioSelection: 'Scenario Selection', chooseScenario: 'Choose a scenario', chooseScenarioDesc: 'Each scenario is a 4-stage, realistic, multi-step incident simulation. At every step you first absorb the context, then make a decision; scoring, badges, time pressure, and retry mechanics are preserved.', toneStandard: 'Standard', toneDramatic: 'Dramatic', toneAcademic: 'Academic', howToPlay: 'How to Play', gameLogic: 'Game Logic', axes: 'Evaluation Axes', expectedApproach: 'Expected Approach', complete: 'Simulation Complete', completed: 'Scenario Complete', shortDebrief: 'Short Debrief', branchProgress: 'Branch Progress', branchPath: 'Path', stageSummaryTitle: 'Stage Summary', settingTitle: 'Setting / Context', currentTitle: 'Current Situation', changedTitle: 'What Changed From the Previous Choice', developmentsTitle: 'New Developments and Findings', optionsTitle: 'Current Options', score: 'Total Score', stage: 'Stage', speed: 'Speed', evidence: 'Evidence Integrity', coordination: 'Coordination', risk: 'Risk Control', progress: 'Response Progress', whatWouldYouDo: 'What would you do?', keyboardHint: '⌨️ Use 1-5 to select options and Enter to continue.', bonusActive: '🏅 Bonus opportunity active', positive: 'Positive Gain', negative: 'Risk Outcome', neutral: 'Partial / Mixed Outcome', timeout: 'Time Expired', continue: 'Continue', retry: 'Go back and try again', retryPenalty: 'Retry does not update your score — the previous penalty stays and no bonus can be earned.', start: 'Start Scenario', back: 'Back', backToSelection: 'Return to Scenarios', fullscreen: '⛶ Fullscreen', fullscreenExit: '🡼 Exit Fullscreen', presentation: '🎤 Projection View', presentationOff: '🧾 Normal View', soundOn: '🔊 Sound On', soundOff: '🔇 Sound Off', lang: '🌐 TR', themeDark: '🌙 Dark', themeLight: '☀️ Light', timer: 'sec', scenarioMeta: '4 stages • scored • badge-based', onboardingSummary: 'Each scenario has 4 stages.|You make 1 decision at each stage.|Correct choices earn points and badges.|Poor choices reduce risk performance and quality.', onboardingAxes: 'Speed|Evidence integrity|Institutional coordination|Risk control', onboardingExpected: 'Balance containment and evidence preservation|Correct escalation|SOP and governance alignment|Learning and debrief', debrief: ['Balancing containment and evidence integrity is a core success metric.','Correct escalation builds institutional trust as much as technical accuracy.','Weak SOP, governance, and audit trail design can undermine otherwise good technical decisions.','Every incident response process should be converted into institutional learning through debrief.'], tags: ['Containment', 'Evidence Integrity', 'Institutional Coordination'], noBadge: '😢 No badges were earned in this round', finalHigh: 'A very strong performance. Speed, evidence integrity, coordination, and risk control were managed in a balanced and professional way.', finalMid: 'Overall a strong performance. Governance and incident classification could be refined further at some decision points.', finalLow: 'Critical weaknesses emerged in this scenario. Delay, poor coordination, or evidence loss may have amplified the impact.', elite: 'Elite Response Lead 🏆', mid: 'Operational Coordinator 🧠', low: 'High-Risk Path 😢', liveAlertPrefix: 'Live alert feed:', infoPanel: 'Information Panel', expandPanel: 'Expand panel', collapsePanel: 'Collapse panel', exampleMessage: 'Example Message', suspiciousEmailTitle: 'Sample Suspicious Email'
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
const emailSamplePanel = $('email-sample-panel'), emailSampleChip = $('email-sample-chip'), emailSampleTitle = $('email-sample-title'), emailSampleContent = $('email-sample-content');
const accordionTriggers = [1,2,3].map((n)=>$(`accordion-trigger-${n}`)).filter(Boolean);
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
function setAccordionState(index, expanded){ const trigger = $(`accordion-trigger-${index}`); const panel = $(`accordion-panel-${index}`); if(!trigger || !panel) return; trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false'); trigger.setAttribute('aria-label', expanded ? t().collapsePanel : t().expandPanel); panel.classList.toggle('hidden', !expanded); }
function collapseAllAccordions(){ [1,2,3].forEach((index)=>setAccordionState(index, false)); }
function renderEmailSample(node){ const sample = node.emailSample ? tr(node.emailSample) : ''; if(!sample){ emailSamplePanel.classList.add('hidden'); emailSampleContent.textContent=''; return; } emailSamplePanel.classList.remove('hidden'); emailSampleContent.textContent = sample; }
function renderNode(){ const node=state.scenario.nodes[state.current]; nodeTitle.textContent = toneText(tr(node.title), 'title'); nodeText.textContent = toneText(tr(node.text), 'body'); alertText.textContent = toneText(`${t().liveAlertPrefix} ${tr(node.alert)}`, 'alert'); settingText.textContent = toneText(tr(node.setting), 'body'); currentText.textContent = toneText(tr(node.current), 'body'); changedText.textContent = changedTextForNode(node); developmentsList.innerHTML = tr(node.developments).map((item)=>`<li>${toneText(item, 'body')}</li>`).join(''); optionsList.innerHTML = tr(node.options).map((item)=>`<li>${toneText(item, 'option')}</li>`).join(''); renderEmailSample(node); collapseAllAccordions(); choicesEl.innerHTML=''; feedbackPanel.classList.add('hidden'); retryBtn.classList.add('hidden'); pendingNext=null; choicesEl.className = `choices choices-count-${Math.min(node.choices.length, 5)}`; node.choices.forEach((choice,index)=>{ const btn=document.createElement('button'); btn.className=`choice-btn ${choice.tone}`; btn.innerHTML=`<span class="choice-index">${String(index+1).padStart(2,'0')}</span><span class="choice-copy">${toneText(tr(choice.text), 'option')}</span>`; btn.addEventListener('click',()=>handleChoice(choice)); choicesEl.appendChild(btn); }); renderStats(); startTimer(); }
function handleChoice(choice, autoSelected=false){ clearInterval(timer); const rewardLocked = !!state.lockedRewardNodes[state.current]; const deltas = ['score','speed','evidence','coordination','risk'].reduce((acc,key)=>{ acc[key] = rewardLocked && choice.tone==='positive' ? 0 : (choice.effects[key]||0); return acc; },{}); state.score += deltas.score; state.speed=clamp(state.speed+deltas.speed); state.evidence=clamp(state.evidence+deltas.evidence); state.coordination=clamp(state.coordination+deltas.coordination); state.risk=clamp(state.risk+deltas.risk); if(choice.tone==='positive'){ if(!rewardLocked) state.trophies.push(choice.badge); feedbackEmoji.textContent = rewardLocked ? '👀✅' : '🏅✨😎'; feedbackHeading.textContent = t().positive; rewardStrip.className='reward-strip positive'; rewardStrip.innerHTML = rewardLocked ? `<span>+ ${currentLanguage==='tr'?'Yol düzeltildi':'Path corrected'}</span><strong>${t().retryPenalty}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>` : `<span>+ ${currentLanguage==='tr'?'Bonus':'Bonus'}</span><strong>${toneText(tr(choice.bonus), 'label')}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>`; beep('positive'); } else if(choice.tone==='neutral'){ feedbackEmoji.textContent = autoSelected ? '⏰🟡📌' : '🟡🤔📌'; feedbackHeading.textContent = autoSelected ? t().timeout : t().neutral; rewardStrip.className='reward-strip neutral'; rewardStrip.innerHTML = `<span>± ${currentLanguage==='tr'?'Ara sonuç':'Mixed result'}</span><strong>${autoSelected ? (currentLanguage==='tr'?'⏱ Süre aşımı nedeniyle otomatik seçim':'⏱ Auto-selected after timeout') : toneText(tr(choice.bonus), 'label')}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>`; if(!autoSelected) retryBtn.classList.remove('hidden'); state.lockedRewardNodes[state.current]=true; beep('negative'); } else { feedbackEmoji.textContent = autoSelected ? '⏰😢💧' : '😢🙃💧'; feedbackHeading.textContent = autoSelected ? t().timeout : t().negative; rewardStrip.className='reward-strip negative'; rewardStrip.innerHTML = `<span>− ${currentLanguage==='tr'?'Kayıp':'Loss'}</span><strong>${autoSelected ? (currentLanguage==='tr'?'⏱ Süre aşımı nedeniyle otomatik seçim':'⏱ Auto-selected after timeout') : toneText(tr(choice.bonus), 'label')}</strong><span class="reward-badge">${toneText(tr(choice.badge), 'label')}</span>`; if(!autoSelected) retryBtn.classList.remove('hidden'); state.lockedRewardNodes[state.current]=true; beep('negative'); }
  feedbackText.textContent = toneText(tr(choice.feedback), 'feedback'); feedbackPanel.classList.remove('hidden'); const idx=state.history.findIndex((x)=>x.node===state.current); const entry={ node:state.current, tone:choice.tone, badge:choice.badge, recovered:rewardLocked }; if(idx>=0) state.history[idx]=entry; else state.history.push(entry); pendingNext = choice.next; [...choicesEl.querySelectorAll('button')].forEach((btn)=>btn.disabled=true); renderStats(); }
function finishGame(){ showScreen(endScreen); const avg=Math.round((state.speed+state.evidence+state.coordination+state.risk)/4); let badge=t().low, verdict=t().finalLow; if(avg>=80 && state.score>=80){ badge=t().elite; verdict=t().finalHigh; } else if(avg>=60){ badge=t().mid; verdict=t().finalMid; } finalBadge.textContent=`${toneText(tr(state.scenario.name), 'title')} • ${badge}`; finalSummary.textContent=toneText(verdict, 'feedback'); finalScores.innerHTML=`<div class="meter"><span>${t().score}</span><strong>${state.score}</strong></div><div class="meter"><span>${t().speed}</span><strong>${state.speed}</strong></div><div class="meter"><span>${t().evidence}</span><strong>${state.evidence}</strong></div><div class="meter"><span>${t().coordination}</span><strong>${state.coordination}</strong></div><div class="meter"><span>${t().risk}</span><strong>${state.risk}</strong></div>`; debriefList.innerHTML = t().debrief.map((item)=>`<li>${toneText(item, 'body')}</li>`).join(''); trophyCase.innerHTML=''; if(state.trophies.length){ state.trophies.forEach((badge)=>{ const item=document.createElement('div'); item.className='trophy-item'; item.textContent=`🏅 ${toneText(tr(badge), 'label')}`; trophyCase.appendChild(item); }); } else { const item=document.createElement('div'); item.className='trophy-item muted'; item.textContent=t().noBadge; trophyCase.appendChild(item); } }
function applyStaticText(){ $('eyebrow').textContent=toneText(t().eyebrow, 'label'); $('hero-title').textContent=toneText(t().title, 'title'); $('hero-subtitle').textContent=toneText(t().subtitle, 'summary'); $('threat-label').textContent=t().threatLevel; $('mode-label').textContent=t().mode; $('scenarios-label').textContent=t().scenarios; $('presenter-label').textContent=t().presenter; $('threat-value').textContent=toneText(t().dynamic, 'label'); $('mode-value').textContent=toneText(t().interactivePresentation, 'label'); $('scenarios-value').textContent=t().branchingCases; $('presenter-value').textContent=t().presenterName; $('opening-slide-label').textContent=t().openingSlide; if ($('info-chip-1')) $('info-chip-1').textContent=t().infoPanel; if ($('info-chip-2')) $('info-chip-2').textContent=t().infoPanel; if ($('info-chip-3')) $('info-chip-3').textContent=t().infoPanel; if (emailSampleChip) emailSampleChip.textContent=t().exampleMessage; if (emailSampleTitle) emailSampleTitle.textContent=t().suspiciousEmailTitle; accordionTriggers.forEach((trigger, idx)=>{ const expanded = trigger.getAttribute('aria-expanded') === 'true'; trigger.setAttribute('aria-label', expanded ? t().collapsePanel : t().expandPanel); }); $('scenario-kicker').textContent=t().scenarioSelection; $('choose-scenario-title').textContent=t().chooseScenario; $('choose-scenario-desc').textContent=toneText(t().chooseScenarioDesc, 'summary'); $('onboarding-kicker').textContent=t().howToPlay; $('onboarding-logic-title').textContent=t().gameLogic; $('onboarding-axes-title').textContent=t().axes; $('onboarding-expected-title').textContent=t().expectedApproach; $('complete-kicker').textContent=t().complete; $('completed-title').textContent=t().completed; $('debrief-title').textContent=t().shortDebrief; $('branch-progress-label').textContent=t().branchProgress; $('branch-path-label').textContent=t().branchPath; $('stage-summary-title').textContent=t().stageSummaryTitle; $('setting-title').textContent=t().settingTitle; $('current-title').textContent=t().currentTitle; $('changed-title').textContent=t().changedTitle; $('developments-title').textContent=t().developmentsTitle; $('options-title').textContent=t().optionsTitle; $('score-label').textContent=t().score; $('stage-label').textContent=t().stage; $('speed-label').textContent=t().speed; $('evidence-label').textContent=t().evidence; $('coordination-label').textContent=t().coordination; $('risk-label').textContent=t().risk; $('progress-label').textContent=t().progress; $('choice-title').textContent=t().whatWouldYouDo; $('keyboard-hint').textContent=t().keyboardHint; $('feedback-tag-1').textContent=t().tags[0]; $('feedback-tag-2').textContent=t().tags[1]; $('feedback-tag-3').textContent=t().tags[2]; $('closing-slide-label').textContent=t().closingSlide; $('onboarding-logic-list').innerHTML=t().onboardingSummary.split('|').map((x)=>`<li>${toneText(x, 'body')}</li>`).join(''); $('onboarding-axes-list').innerHTML=t().onboardingAxes.split('|').map((x)=>`<li>${toneText(x, 'body')}</li>`).join(''); $('onboarding-expected-list').innerHTML=t().onboardingExpected.split('|').map((x)=>`<li>${toneText(x, 'body')}</li>`).join(''); nextBtn.textContent=t().continue; retryBtn.textContent=t().retry; onboardingStartBtn.textContent=t().start; onboardingBackBtn.textContent=t().back; restartBtn.textContent=t().backToSelection; fullscreenBtn.textContent=document.fullscreenElement?t().fullscreenExit:t().fullscreen; presentationBtn.textContent=document.body.classList.contains('presentation-mode')?t().presentationOff:t().presentation; soundBtn.textContent=soundEnabled?t().soundOn:t().soundOff; languageBtn.textContent=t().lang; toneBtn.textContent=toneButtonLabel(); updateTheme(); updateTimerBadge(); renderScenarioList(); if(state.scenario){ onboardingScenarioTitle.textContent=toneText(tr(state.scenario.name), 'title'); onboardingScenarioSummary.textContent=toneText(tr(state.scenario.summary), 'summary'); scenarioName.textContent=toneText(tr(state.scenario.name), 'title'); if(gameScreen.classList.contains('active')) renderNode(); if(endScreen.classList.contains('active')) finishGame(); } }
nextBtn.addEventListener('click',()=>{ if(!pendingNext) return; if(pendingNext==='end'){ finishGame(); return; } state.current=pendingNext; state.stage+=1; renderNode(); });
restartBtn.addEventListener('click',()=>{ state=initialState(); showScreen(scenarioScreen); applyStaticText(); }); onboardingStartBtn.addEventListener('click',startScenario); onboardingBackBtn.addEventListener('click',()=>{ state=initialState(); showScreen(scenarioScreen); applyStaticText(); }); fullscreenBtn.addEventListener('click', async()=>{ try{ if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); applyStaticText(); } catch{} }); document.addEventListener('fullscreenchange',applyStaticText); presentationBtn.addEventListener('click',()=>{ document.body.classList.toggle('presentation-mode'); applyStaticText(); }); languageBtn.addEventListener('click',()=>{ currentLanguage = currentLanguage==='tr'?'en':'tr'; applyStaticText(); }); toneBtn.addEventListener('click',()=>{ currentTone = currentTone==='standard' ? 'dramatic' : currentTone==='dramatic' ? 'academic' : 'standard'; applyStaticText(); }); soundBtn.addEventListener('click',()=>{ soundEnabled=!soundEnabled; applyStaticText(); }); themeBtn.addEventListener('click',()=>{ currentTheme = currentTheme==='dark'?'light':'dark'; applyStaticText(); }); retryBtn.addEventListener('click',()=>{ const node=state.scenario.nodes[state.current]; const positive=node.choices.find((c)=>c.tone==='positive')||node.choices[0]; handleChoice(positive); }); accordionTriggers.forEach((trigger, index)=>{ trigger.addEventListener('click',()=>{ const expanded = trigger.getAttribute('aria-expanded') === 'true'; [1,2,3].forEach((idx)=>setAccordionState(idx, false)); if(!expanded) setAccordionState(index + 1, true); }); }); document.addEventListener('keydown',(e)=>{ if(!gameScreen.classList.contains('active')) return; if(feedbackPanel.classList.contains('hidden')){ if(['1','2','3','4','5'].includes(e.key)){ const btns=[...choicesEl.querySelectorAll('button:not([disabled])')]; btns[Number(e.key)-1]?.click(); } } else if(e.key==='Enter'){ nextBtn.click(); } });
applyStaticText(); showScreen(scenarioScreen);
