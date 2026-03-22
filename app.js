const scenarioCatalog = [
  {
    id: "after-hours-access",
    name: "Mesai Dışı Yetkisiz Erişim",
    summary: "Araştırmacı hesabında mesai dışı erişim, hassas proje klasörlerinde olağandışı gezinme ve olası veri açığa çıkışı riski.",
    accent: "orange",
    nodes: {
      start: {
        alert: "Unusual account activity confirmed on shared research drive.",
        title: "Aşama 1 — İlk Alarm ve Başlangıç Containment",
        text: "Bir araştırmacının hesabından gece saatlerinde erişim yapıldığı ve hassas proje klasörlerinde yüksek hacimli gezinme olduğu saptandı. İlk hedef, olayın kapsamını büyütmeden containment sağlamak ve delil bütünlüğünü korumaktır.",
        choices: [
          { text: "Etkilenen hesabı ve ilgili sistemi kontrollü biçimde izole et; log koruma, oturum inceleme ve ilk olay kaydını eşzamanlı başlat.", tone: "positive", bonus: "⚡ Erken containment bonusu", feedback: "Çok güçlü başlangıç. Containment ile delil koruma aynı anda yürütüldü; bu yaklaşım incident response olgunluğunun temel göstergesidir.", effects: { score: 25, speed: 12, evidence: 15, coordination: 8, risk: 14 }, badge: "Containment Pro", next: "comms" },
          { text: "Kullanıcıya cihazı yeniden başlatmasını ve şifresini hemen değiştirmesini söyle.", tone: "negative", bonus: "😢 Uçucu delil kaybı riski", feedback: "İyi niyetli ancak zayıf bir refleks. Plansız yeniden başlatma, uçucu delilleri ve olay korelasyonunu bozabilir.", effects: { score: -12, speed: 4, evidence: -18, coordination: -4, risk: -8 }, badge: "Evidence Lost", next: "comms" },
          { text: "Bir süre gözlemle; olay belirgin şekilde büyürse müdahale et.", tone: "negative", bonus: "😢 Gecikme cezası", feedback: "Bu gecikme, yetkisiz erişimin sürmesine ve potansiyel veri açığa çıkışının artmasına neden olabilir.", effects: { score: -20, speed: -18, evidence: -6, coordination: -8, risk: -18 }, badge: "Late Response", next: "comms" }
        ]
      },
      comms: {
        alert: "Escalation threshold reached. Leadership awaiting brief.",
        title: "Aşama 2 — Eskalasyon ve Kurumsal Bildirim",
        text: "İlk teknik bulgular doğrulandı. Bu aşamada doğru eskalasyon zincirinin işletilmesi, hem teknik hem yönetsel yanıt kalitesini belirler.",
        choices: [
          { text: "IR zincirini aktive et: IT/security, ilgili yönetici, araştırma güvenliği ve gerekli ise hukuk/uyum birimini bilgilendir.", tone: "positive", bonus: "🏅 Eskalasyon bonusu", feedback: "Profesyonel bir yaklaşım. Yapılandırılmış eskalasyon, rol netliği ve koordinasyon kalitesi sağlar.", effects: { score: 22, speed: 10, evidence: 4, coordination: 20, risk: 10 }, badge: "Chain Commander", next: "evidence" },
          { text: "Önce gayriresmî biçimde tanıdık bir kişiye danış; resmi süreci sonra düşün.", tone: "negative", bonus: "😢 Koordinasyon kaybı", feedback: "Gayriresmî iletişim, bilgi kirliliğine ve sorumluluk belirsizliğine yol açabilir. Kurumsal response mimarisi zayıflar.", effects: { score: -10, speed: 0, evidence: 0, coordination: -18, risk: -8 }, badge: "Loose Comms", next: "evidence" },
          { text: "Tüm personele hemen geniş kapsamlı uyarı e-postası gönder.", tone: "negative", bonus: "😢 Erken panik etkisi", feedback: "Erken ve kontrolsüz duyuru, gereksiz panik ve spekülasyon üretebilir; hedefe yönelik iletişim daha uygundur.", effects: { score: -6, speed: 4, evidence: 0, coordination: -8, risk: -4 }, badge: "Noise Burst", next: "evidence" }
        ]
      },
      evidence: {
        alert: "Forensic preservation window narrowing.",
        title: "Aşama 3 — Delil Bütünlüğü ve Forensik Yaklaşım",
        text: "Olayın etkilediği veri kümeleri ve erişim izi netleştirilmelidir. Delil zinciri bu aşamada kritik önemdedir.",
        choices: [
          { text: "Sistem imajı, loglar, erişim kayıtları ve zaman çizelgesini kontrollü biçimde topla; chain-of-custody yaklaşımını uygula.", tone: "positive", bonus: "🧠 Forensik bonus", feedback: "Mükemmel seçim. Delil bütünlüğü ve iz sürülebilirlik korunarak kök neden analizi için güçlü bir temel kuruldu.", effects: { score: 26, speed: 4, evidence: 22, coordination: 6, risk: 10 }, badge: "Forensic Guardian", next: "decision" },
          { text: "Sistemi hemen kapat; ayrıntılı inceleme daha sonra yapılabilir.", tone: "negative", bonus: "😢 Uçucu veri kaybı", feedback: "Plansız kapatma, bellek temelli verilerin ve aktif süreç izlerinin kaybına neden olabilir.", effects: { score: -16, speed: 0, evidence: -20, coordination: 0, risk: -6 }, badge: "Cold Shutdown", next: "decision" },
          { text: "Önce hizmet sürekliliğini sağla, delil toplama sonra yapılır.", tone: "negative", bonus: "😢 Kritik analitik kayıp", feedback: "Hizmet sürekliliği önemlidir; ancak delil toplama gecikirse olayın açıklanabilirliği ciddi biçimde zayıflar.", effects: { score: -24, speed: -10, evidence: -24, coordination: -5, risk: -12 }, badge: "Missed Evidence", next: "decision" }
        ]
      },
      decision: {
        alert: "Leadership expects containment roadmap and recovery plan.",
        title: "Aşama 4 — İyileştirme, Sınıflandırma ve Debrief",
        text: "Başlangıç yanıtı tamamlandı. Şimdi olay sınıflandırması, düzeltici aksiyonlar ve kurumsal öğrenme çerçevesi belirlenmelidir.",
        choices: [
          { text: "Olay sınıflandırması yap; etki alanını belirle, düzeltici aksiyon planı hazırla ve yapılandırılmış debrief başlat.", tone: "positive", bonus: "🌟 Mastery bonusu", feedback: "Olgun incident response yaklaşımı. Müdahale sadece teknik olarak değil, yönetişim ve kurumsal öğrenme açısından da tamamlandı.", effects: { score: 30, speed: 10, evidence: 6, coordination: 16, risk: 20 }, badge: "Response Strategist", next: "end" },
          { text: "Sistemi normale döndür ve olayı hızlıca kapat.", tone: "negative", bonus: "😢 Tekrar riski", feedback: "Yüzeysel kapanış, tekrarlayan olay riskini ve görünmeyen zafiyetleri artırır.", effects: { score: -18, speed: 4, evidence: -6, coordination: -10, risk: -18 }, badge: "Shallow Recovery", next: "end" },
          { text: "Kanıtlar tam netleşmeden bireysel suçlu ilan et.", tone: "negative", bonus: "😢 Etik ve operasyonel hata", feedback: "Erken suçlama, sistem odaklı analizi bozar ve iş birliğini zedeler.", effects: { score: -16, speed: 0, evidence: -8, coordination: -18, risk: -10 }, badge: "Blame Trap", next: "end" }
        ]
      }
    }
  },
  {
    id: "usb-transfer",
    name: "Yetkisiz USB / Veri Transferi",
    summary: "Kritik araştırma dosyalarının harici ortama aktarılmış olabileceği ve material/data governance ihlali riski.",
    accent: "purple",
    nodes: {
      start: {
        alert: "Portable media anomaly detected near restricted dataset.",
        title: "Aşama 1 — Transfer Şüphesinin İlk Kontrolü",
        text: "Yetkili olmayan bir taşınabilir medya cihazının kısıtlı araştırma verilerine yakın zamanda bağlandığı saptandı. İlk amaç, yayılımı durdurmak ve transfer izini korumaktır.",
        choices: [
          { text: "Erişimi sınırla, cihaz kaydını ve erişim izlerini koru, ilk olay kaydını oluştur.", tone: "positive", bonus: "🔒 Access control bonusu", feedback: "Doğru yaklaşım. Hem transfer riski hem de delil kaybı erken aşamada kontrol altına alındı.", effects: { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, badge: "Access Sentinel", next: "comms" },
          { text: "Sadece kullanıcıyı sözlü olarak uyar; resmi kayıt açma.", tone: "negative", bonus: "😢 Yetersiz kontrol", feedback: "Sözlü uyarı tek başına yeterli değildir. Olayın kurumsal izlenebilirliği ve governance değeri kaybolur.", effects: { score: -8, speed: 2, evidence: -10, coordination: -4, risk: -8 }, badge: "Soft Control", next: "comms" },
          { text: "Muhtemelen önemsizdir diyerek konuyu kapat.", tone: "negative", bonus: "😢 Risk küçümsemesi", feedback: "Bu tür transferler biyogüvenlik, fikri haklar ve veri yönetişimi açısından kritik olabilir; küçümsenmemelidir.", effects: { score: -22, speed: -12, evidence: -10, coordination: -8, risk: -20 }, badge: "Dismissal Risk", next: "comms" }
        ]
      },
      comms: {
        alert: "Data governance stakeholders should be engaged.",
        title: "Aşama 2 — Paydaşların Devreye Alınması",
        text: "Olay artık yalnızca teknik değil; research security, data governance ve olası teknoloji transferi boyutu taşımaktadır.",
        choices: [
          { text: "IT, araştırma güvenliği, veri yönetişimi ve ilgili yöneticileri ortak response akışında birleştir.", tone: "positive", bonus: "🤝 Multi-team bonusu", feedback: "Çok iyi. Bu olay disiplinler arası değerlendirme gerektirir ve doğru paydaş seti devreye alındı.", effects: { score: 20, speed: 8, evidence: 6, coordination: 20, risk: 10 }, badge: "Bridge Builder", next: "evidence" },
          { text: "Sadece teknik ekip ilgilensin; yönetişim boyutunu sonra düşün.", tone: "negative", bonus: "😢 Governance gap", feedback: "Teknik çözüm tek başına yeterli değildir; policy ve kurumsal sorumluluk boyutu ihmal edilmiş olur.", effects: { score: -10, speed: 0, evidence: 0, coordination: -14, risk: -10 }, badge: "Governance Gap", next: "evidence" },
          { text: "Durumu laboratuvar içinde tut; üst yönetime çıkmasın.", tone: "negative", bonus: "😢 Silo response", feedback: "Dar çevrede tutmak, kurumsal kapasiteyi ve olaydan öğrenme olasılığını sınırlar.", effects: { score: -12, speed: 0, evidence: -2, coordination: -16, risk: -8 }, badge: "Silo Response", next: "evidence" }
        ]
      },
      evidence: {
        alert: "Transfer path reconstruction required.",
        title: "Aşama 3 — Transfer Yolunun Rekonstrüksiyonu",
        text: "Hangi veri veya materyalin, hangi anda ve hangi kanal üzerinden etkilenmiş olabileceğini rekonstrükte etmeniz gerekiyor.",
        choices: [
          { text: "Cihaz kayıtları, dosya erişim logları ve zaman çizelgesini eşleştir; transfer kapsamını rekonstrükte et.", tone: "positive", bonus: "📊 Reconstruction bonusu", feedback: "Mükemmel. Olayın kapsamı ve etkilenmiş veri kümeleri analitik olarak görünür hale geldi.", effects: { score: 25, speed: 4, evidence: 20, coordination: 4, risk: 10 }, badge: "Trail Mapper", next: "decision" },
          { text: "Önce kimin yaptığını bul; teknik iz sonra gelir.", tone: "negative", bonus: "😢 Öncelik hatası", feedback: "Olay yönetimi önce kapsamı ve etkiyi anlamalıdır; kişileştirme erken aşamada zayıf bir reflekstir.", effects: { score: -14, speed: 0, evidence: -16, coordination: -6, risk: -8 }, badge: "Premature Blame", next: "decision" },
          { text: "Sadece basit erişim listesine bak; detaylı analiz gereksiz.", tone: "negative", bonus: "😢 Eksik görünürlük", feedback: "Parçalı veriyle karar vermek yanlış kapsam tahmini ve yetersiz response’a yol açar.", effects: { score: -10, speed: 2, evidence: -12, coordination: 0, risk: -8 }, badge: "Thin Review", next: "decision" }
        ]
      },
      decision: {
        alert: "Leadership asks for prevention actions.",
        title: "Aşama 4 — Önleme ve Kurumsal Güçlendirme",
        text: "Olay incelendi. Şimdi tekrar riskini azaltacak kurumsal kapasite artırıcı adımlar belirlenmelidir.",
        choices: [
          { text: "Politika güncelle, erişim kısıtlarını iyileştir, eğitim ve denetim planı oluştur.", tone: "positive", bonus: "🏆 Prevention bonusu", feedback: "Güçlü kapanış. Müdahale, sürdürülebilir önleme ve kurumsal dayanıklılığa dönüştürüldü.", effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: "Prevention Architect", next: "end" },
          { text: "Sadece sözlü uyarı ile yetin.", tone: "negative", bonus: "😢 Zayıf kapanış", feedback: "Sözlü uyarı davranış değişikliği için genellikle yetersizdir; sistemik önlem gerekir.", effects: { score: -12, speed: 2, evidence: 0, coordination: -8, risk: -12 }, badge: "Verbal Fix", next: "end" },
          { text: "Olay kapandı; ek aksiyon alma.", tone: "negative", bonus: "😢 Tekrar riski", feedback: "Düzeltici aksiyon olmadan aynı açık yeniden üretilebilir.", effects: { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, badge: "No Lessons", next: "end" }
        ]
      }
    }
  },
  {
    id: "partner-email",
    name: "Şüpheli İş Birliği Talebi",
    summary: "Dış partnerden gelen olağandışı veri talebi ve partner due diligence gerektiren kimlik/doğrulama belirsizliği.",
    accent: "blue",
    nodes: {
      start: {
        alert: "External partner request flagged for authenticity review.",
        title: "Aşama 1 — Talebin Durdurulması ve Doğrulama Başlatılması",
        text: "Dış bir iş birliği partnerinden SOP dışı veri ve doküman talebi geldi. Gönderen meşruiyeti ve talebin bağlamı tam net değil.",
        choices: [
          { text: "Talebi geçici olarak durdur, bağımsız kanal üzerinden doğrulama başlat ve ön değerlendirme kaydı aç.", tone: "positive", bonus: "✅ Verification bonusu", feedback: "Çok iyi. Research security pratiğinde ‘trust but verify’ yaklaşımı tam olarak budur.", effects: { score: 24, speed: 10, evidence: 10, coordination: 10, risk: 16 }, badge: "Verifier", next: "comms" },
          { text: "İlişkiyi zedelememek için talebi hızla karşıla.", tone: "negative", bonus: "😢 Sosyal mühendislik riski", feedback: "İlişki yönetimi önemlidir; ancak kimlik ve yetki doğrulanmadan paylaşım yapılması kritik bir güvenlik zafiyetidir.", effects: { score: -20, speed: 6, evidence: -8, coordination: -4, risk: -20 }, badge: "Trust Trap", next: "comms" },
          { text: "Talebi yanıtsız bırak ve kendiliğinden sönmesini bekle.", tone: "negative", bonus: "😢 Pasif risk", feedback: "Pasiflik, güvenli yönetim değildir. Şüpheli talepler belgelenmeli ve değerlendirilmeliidir.", effects: { score: -8, speed: -6, evidence: -2, coordination: -6, risk: -8 }, badge: "Silent Drift", next: "comms" }
        ]
      },
      comms: {
        alert: "Partner due diligence workflow recommended.",
        title: "Aşama 2 — Due Diligence Çerçevesinin Kurulması",
        text: "Talebin teknik, etik, hukuki ve iş birliği boyutları birlikte değerlendirilmelidir.",
        choices: [
          { text: "Araştırma güvenliği, PI, hukuk/uyum ve ilgili doğrulama kanallarını birlikte devreye al.", tone: "positive", bonus: "🤝 Due diligence bonusu", feedback: "Bu yaklaşım, partner due diligence için güçlü ve kurumsal bir çerçeve sunar.", effects: { score: 22, speed: 8, evidence: 4, coordination: 18, risk: 10 }, badge: "Due Diligence Lead", next: "evidence" },
          { text: "Kararı sadece PI versin.", tone: "negative", bonus: "😢 Tekil karar riski", feedback: "Bu tür kararların tek aktöre bırakılması, kurumsal görünürlüğü ve hesap verebilirliği zayıflatır.", effects: { score: -12, speed: 0, evidence: 0, coordination: -16, risk: -10 }, badge: "Solo Governance", next: "evidence" },
          { text: "Kararı ertele; partner tekrar yazarsa bakarsın.", tone: "negative", bonus: "😢 Belirsizlik maliyeti", feedback: "Belirsizliği ertelemek, hem güvenlik hem de iş birliği güvenilirliği açısından maliyetlidir.", effects: { score: -8, speed: -8, evidence: 0, coordination: -8, risk: -8 }, badge: "Delayed Clarity", next: "evidence" }
        ]
      },
      evidence: {
        alert: "Metadata review can clarify sender legitimacy.",
        title: "Aşama 3 — Kimlik ve Bağlam Doğrulaması",
        text: "Talebin meşruiyetini değerlendirmek için teknik ve bağlamsal kanıtları birlikte okumak gerekir.",
        choices: [
          { text: "Header/metadata, önceki yazışma örüntüsü ve resmi kanal çapraz doğrulamasını birlikte incele.", tone: "positive", bonus: "🧬 Trust but verify bonusu", feedback: "Çok güçlü bir doğrulama seti. Kimlik, niyet ve bağlam birlikte değerlendirildi.", effects: { score: 24, speed: 4, evidence: 18, coordination: 6, risk: 10 }, badge: "Signal Analyst", next: "decision" },
          { text: "Gönderen adı tanıdık görünüyor; teknik doğrulamaya gerek yok.", tone: "negative", bonus: "😢 Display-name tuzağı", feedback: "Display name güvenilir doğrulama değildir; spoofing ve kimlik taklidi riski göz ardı edildi.", effects: { score: -16, speed: 0, evidence: -14, coordination: 0, risk: -14 }, badge: "Display Name Trap", next: "decision" },
          { text: "E-posta üslubu profesyonel; bu yeterlidir.", tone: "negative", bonus: "😢 Biçim yanılgısı", feedback: "Profesyonel dil, meşruiyet kanıtı değildir. Karar, görünüşe değil doğrulamaya dayanmalıdır.", effects: { score: -12, speed: 2, evidence: -10, coordination: 0, risk: -10 }, badge: "Style Bias", next: "decision" }
        ]
      },
      decision: {
        alert: "Decision required on data release and partner handling.",
        title: "Aşama 4 — Güvenli Sonuçlandırma ve Kayıt",
        text: "Doğrulama sonrası paylaşımın SOP’ye uygun biçimde güvenli veya kontrollü biçimde reddedilmesi gerekir.",
        choices: [
          { text: "Doğrulanmışsa kontrollü paylaşım yap; doğrulanmamışsa resmi ret ve kayıt mekanizmasını işlet.", tone: "positive", bonus: "🌟 Governance mastery", feedback: "Mükemmel kapanış. Hem iş birliği sürekliliği hem güvenlik standardı birlikte korundu.", effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: "Collaboration Guardian", next: "end" },
          { text: "Belirsizlik sürse de ilişkiyi korumak için paylaşım yap.", tone: "negative", bonus: "😢 Güvenlikten taviz", feedback: "İş birliği, güvenlik ilkesinin önüne geçirilmemelidir; bu kurumsal güvenlik eşiğini aşındırır.", effects: { score: -18, speed: 4, evidence: -4, coordination: -8, risk: -18 }, badge: "Relationship Overreach", next: "end" },
          { text: "Talebi reddet ama kayıt oluşturma.", tone: "negative", bonus: "😢 Kurumsal hafıza kaybı", feedback: "Belgelendirme olmadan audit trail oluşmaz; kurumsal öğrenme zayıflar.", effects: { score: -10, speed: 2, evidence: -8, coordination: -6, risk: -8 }, badge: "No Audit Trail", next: "end" }
        ]
      }
    }
  },
  {
    id: "lab-device",
    name: "Laboratuvar Cihazı Anomalisi",
    summary: "Ağ bağlantılı laboratuvar cihazında olağandışı davranış, operasyonel etki ve siber-biyogüvenlik kesişimi.",
    accent: "pink",
    nodes: {
      start: {
        alert: "Connected lab device showing irregular sync behavior.",
        title: "Aşama 1 — Cihaz Davranışının Kontrol Altına Alınması",
        text: "Ağ bağlantılı bir laboratuvar cihazı beklenmeyen şekilde dış sistemlerle senkronizasyon denemeleri yapıyor. İlk amaç, operasyonel etkiyi yönetirken yayılımı durdurmaktır.",
        choices: [
          { text: "Cihazı kontrollü biçimde ağdan ayır, operasyonel etkiyi değerlendir ve teknik kayıtları koru.", tone: "positive", bonus: "🛡️ Device isolation bonusu", feedback: "Çok iyi. Güvenlik ve operasyon dengesi birlikte gözetildi; bu olgun bir response davranışıdır.", effects: { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, badge: "Device Shield", next: "comms" },
          { text: "Cihazı kapat-aç yap; düzelirse normal çalışmaya dön.", tone: "negative", bonus: "😢 İnceleme kaybı", feedback: "Reset refleksi, semptomu gizleyebilir ancak kök neden görünürlüğünü azaltır.", effects: { score: -14, speed: 2, evidence: -16, coordination: -2, risk: -10 }, badge: "Reset Reflex", next: "comms" },
          { text: "İş akışı bozulmasın diye hiç müdahale etme.", tone: "negative", bonus: "😢 Yayılım riski", feedback: "Pasiflik, hem teknik riskin hem de araştırma güvenliği etkisinin büyümesine neden olabilir.", effects: { score: -20, speed: -12, evidence: -4, coordination: -6, risk: -18 }, badge: "Passive Drift", next: "comms" }
        ]
      },
      comms: {
        alert: "Operational and safety teams should align.",
        title: "Aşama 2 — Operasyonel ve Güvenlik Koordinasyonu",
        text: "Cihazın araştırma sürecine etkisi vardır. Olay, yalnızca teknik bir sorun değil; güvenlik ve operasyon ortak konusu olarak ele alınmalıdır.",
        choices: [
          { text: "IT, cihaz sorumlusu, laboratuvar yönetimi ve güvenlik ekibini ortak karar akışında buluştur.", tone: "positive", bonus: "🤝 Alignment bonusu", feedback: "Doğru yaklaşım. Operasyon sürekliliği ile güvenlik gereksinimi dengeli biçimde yönetildi.", effects: { score: 22, speed: 8, evidence: 4, coordination: 20, risk: 10 }, badge: "Ops Aligner", next: "evidence" },
          { text: "Sadece teknik ekip çözsün; laboratuvar sonra bilgilendirilsin.", tone: "negative", bonus: "😢 Operasyon körlüğü", feedback: "Laboratuvar etkisini dışarıda bırakmak, risk değerlendirmesini eksik kılar.", effects: { score: -10, speed: 0, evidence: 0, coordination: -14, risk: -8 }, badge: "Ops Blind Spot", next: "evidence" },
          { text: "Laboratuvar kendi içinde yönetsin; teknik ekibe gerek yok.", tone: "negative", bonus: "😢 Teknik boşluk", feedback: "Teknik görünürlük olmadan olayın niteliği ve saldırı yüzeyi doğru tanımlanamaz.", effects: { score: -10, speed: 0, evidence: -4, coordination: -12, risk: -8 }, badge: "Tech Gap", next: "evidence" }
        ]
      },
      evidence: {
        alert: "Device logs and network traces can clarify impact.",
        title: "Aşama 3 — Çok Kaynaklı Teknik Analiz",
        text: "Olayın cihaz, ağ veya kullanıcı akışı kaynaklı olup olmadığını ayırt etmek için çok kaynaklı analitik yaklaşım gerekir.",
        choices: [
          { text: "Cihaz logları, ağ izleri ve son kullanıcı işlemlerini birlikte değerlendir.", tone: "positive", bonus: "🔬 Multi-source analysis", feedback: "Mükemmel. Sistem düzeyinde düşünülerek olayın kaynağı ve etkisi daha net görünür hale geldi.", effects: { score: 24, speed: 4, evidence: 20, coordination: 4, risk: 10 }, badge: "Systems Thinker", next: "decision" },
          { text: "Sadece ağ trafiğine bak; diğer veriler gereksiz.", tone: "negative", bonus: "😢 Dar analiz", feedback: "Tek kaynaklı analiz, yanlış sınıflandırma ve eksik cevap üretme riskini artırır.", effects: { score: -12, speed: 2, evidence: -12, coordination: 0, risk: -8 }, badge: "Narrow Lens", next: "decision" },
          { text: "Bir kullanıcıyı sorumlu varsay ve analizi buna göre yönlendir.", tone: "negative", bonus: "😢 Varsayım yanlılığı", feedback: "Varsayım temelli yaklaşım, nesnel teknik incelemeyi zayıflatır.", effects: { score: -14, speed: 0, evidence: -14, coordination: -6, risk: -8 }, badge: "Assumption Bias", next: "decision" }
        ]
      },
      decision: {
        alert: "Recovery and resilience plan expected.",
        title: "Aşama 4 — Dayanıklılık ve Süreç Güçlendirme",
        text: "İlk müdahale sonrasında, tekrar riskini azaltacak sürdürülebilir dayanıklılık adımları seçilmelidir.",
        choices: [
          { text: "Ağ segmentasyonu, izleme, bakım SOP’si ve ekip eğitimi içeren dayanıklılık planı kur.", tone: "positive", bonus: "🏆 Resilience bonusu", feedback: "Harika kapanış. Olay yalnızca kapatılmadı; kurumsal dayanıklılığa dönüştürüldü.", effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: "Resilience Builder", next: "end" },
          { text: "Sadece cihazı değiştir; süreçlere dokunma.", tone: "negative", bonus: "😢 Semptom çözümü", feedback: "Donanım değişimi, süreç zafiyetini ve görünmeyen yönetişim açığını çözmez.", effects: { score: -10, speed: 4, evidence: 0, coordination: -6, risk: -10 }, badge: "Replace Only", next: "end" },
          { text: "Aynı düzenle devam et.", tone: "negative", bonus: "😢 Dayanıklılık kaybı", feedback: "Öğrenmeyen sistemler aynı olayları tekrar üretir.", effects: { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, badge: "Repeat Risk", next: "end" }
        ]
      }
    }
  },
  {
    id: "insider-sharing",
    name: "İç Kaynaklı SOP Dışı Paylaşım",
    summary: "İyi niyetli görünen ancak SOP dışı doküman veya materyal paylaşımıyla ilişkili insan faktörü senaryosu.",
    accent: "teal",
    nodes: {
      start: {
        alert: "Internal sharing pattern flagged outside SOP boundaries.",
        title: "Aşama 1 — Paylaşımın Durdurulması ve İlk Kayıt",
        text: "Bir personelin iyi niyetle fakat SOP dışında araştırma dokümanı veya materyali paylaşmış olabileceği düşünülüyor. İlk adım, olayı kişiselleştirmeden kontrol altına almaktır.",
        choices: [
          { text: "Paylaşımı durdur, erişimi geçici sınırla ve yapılandırılmış olay kaydı oluştur.", tone: "positive", bonus: "📝 Governance bonusu", feedback: "Doğru yaklaşım. Olay, suçlayıcı değil sistematik response mantığıyla ele alınmaya başlandı.", effects: { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, badge: "Governance Anchor", next: "comms" },
          { text: "İlgili kişiyi herkesin önünde sorgula.", tone: "negative", bonus: "😢 Güven kaybı", feedback: "Bu yaklaşım psikolojik güvenliği zedeler, savunmacı kültürü güçlendirir ve nesnel analizi bozar.", effects: { score: -16, speed: 0, evidence: -6, coordination: -16, risk: -8 }, badge: "Public Blame", next: "comms" },
          { text: "Niyet iyi olduğu için olayı görmezden gel.", tone: "negative", bonus: "😢 Politika aşınması", feedback: "İyi niyet, kontrolsüz paylaşım riskini ortadan kaldırmaz; SOP’lerin anlamı zayıflar.", effects: { score: -20, speed: -10, evidence: -6, coordination: -6, risk: -18 }, badge: "Intent Bias", next: "comms" }
        ]
      },
      comms: {
        alert: "Balanced response required: accountability without blame spiral.",
        title: "Aşama 2 — Adil ve Sistem Odaklı Kurumsal Yaklaşım",
        text: "Kurum, hem adil hem etkili bir yanıt vermelidir. İnsan faktörü, süreç ve güvenlik boyutu birlikte ele alınmalıdır.",
        choices: [
          { text: "Yönetici, güvenlik ve süreç sahipleriyle yapılandırılmış değerlendirme toplantısı yap.", tone: "positive", bonus: "⚖️ Balanced response", feedback: "Güçlü yaklaşım. Olay, kişisel suçlama yerine sistem odaklı analiz çerçevesine taşındı.", effects: { score: 22, speed: 8, evidence: 4, coordination: 18, risk: 10 }, badge: "Fair Coordinator", next: "evidence" },
          { text: "Süreci tamamen insan kaynaklarına bırak.", tone: "negative", bonus: "😢 Tek boyutlu yaklaşım", feedback: "Bu olay yalnızca personel meselesi değildir; veri, süreç ve güvenlik boyutu birlikte değerlendirilmelidir.", effects: { score: -10, speed: 0, evidence: -2, coordination: -12, risk: -8 }, badge: "HR Only", next: "evidence" },
          { text: "Sadece teknik tarafa odaklan; insan faktörünü dışarıda bırak.", tone: "negative", bonus: "😢 İnsan faktörü körlüğü", feedback: "İnsan davranışı incident response’un merkezi bileşenlerinden biridir; dışarıda bırakılamaz.", effects: { score: -10, speed: 0, evidence: 0, coordination: -10, risk: -8 }, badge: "Human Blind Spot", next: "evidence" }
        ]
      },
      evidence: {
        alert: "Context reconstruction needed before judgment.",
        title: "Aşama 3 — Bağlam ve Etki Analizi",
        text: "Ne paylaşıldığı, kimle paylaşıldığı, hangi kanalın kullanıldığı ve SOP’den hangi noktalarda sapıldığı netleştirilmelidir.",
        choices: [
          { text: "İçerik, alıcı, kanal, zaman ve SOP farkını sistematik biçimde analiz et.", tone: "positive", bonus: "🧠 Context bonusu", feedback: "Çok iyi. Adil ve etkili karar için gereken bağlamsal görünürlük sağlandı.", effects: { score: 24, speed: 4, evidence: 20, coordination: 4, risk: 10 }, badge: "Context Analyst", next: "decision" },
          { text: "Niyet belli; detaylı analize gerek yok.", tone: "negative", bonus: "😢 Eksik bağlam", feedback: "Bağlamı dışarıda bırakmak, yanlış sınıflandırma ve yetersiz düzeltici aksiyon riskini yükseltir.", effects: { score: -12, speed: 2, evidence: -12, coordination: 0, risk: -8 }, badge: "Thin Context", next: "decision" },
          { text: "Benzer şeyler olur diyerek yüzeysel notla geç.", tone: "negative", bonus: "😢 Normalleştirme hatası", feedback: "Normalleştirme, güvenlik kültürünü aşındırır ve SOP disiplinini zayıflatır.", effects: { score: -14, speed: 0, evidence: -10, coordination: -4, risk: -10 }, badge: "Normalization Drift", next: "decision" }
        ]
      },
      decision: {
        alert: "Institution expects corrective and cultural response.",
        title: "Aşama 4 — Düzeltici ve Kültürel Dönüşüm",
        text: "Yanıtın amacı yalnızca olayı kapatmak değil; kurumsal kültürü ve kontrol mekanizmalarını güçlendirmektir.",
        choices: [
          { text: "SOP netleştirme, eğitim, erişim sınırları ve öğrenme odaklı debrief uygula.", tone: "positive", bonus: "🌟 Culture + control bonusu", feedback: "Mükemmel. Olay, cezalandırıcı değil öğrenen ve güçlenen bir sisteme dönüştürüldü.", effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: "Culture Builder", next: "end" },
          { text: "Sadece ilgili kişiye uyarı ver ve süreci kapat.", tone: "negative", bonus: "😢 Sistem öğrenmiyor", feedback: "Kişisel uyarı tek başına sistemik zafiyetleri çözmez.", effects: { score: -10, speed: 2, evidence: 0, coordination: -8, risk: -10 }, badge: "Personalized Fix", next: "end" },
          { text: "Hiç aksiyon alma.", tone: "negative", bonus: "😢 Kültürel erozyon", feedback: "Aksiyon alınmaması, SOP’lerin ve güvenlik kültürünün aşınmasına yol açar.", effects: { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, badge: "Policy Erosion", next: "end" }
        ]
      }
    }
  }
];

const initialState = () => ({
  scenario: null,
  current: null,
  stage: 1,
  score: 0,
  speed: 50,
  evidence: 50,
  coordination: 50,
  risk: 50,
  trophies: []
});

let state = initialState();
let pendingNext = null;
let timer = null;
let timeLeft = 30;

const scenarioScreen = document.getElementById("scenario-screen");
const onboardingScreen = document.getElementById("onboarding-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const scenarioList = document.getElementById("scenario-list");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const presentationBtn = document.getElementById("presentation-btn");
const onboardingStartBtn = document.getElementById("onboarding-start-btn");
const onboardingBackBtn = document.getElementById("onboarding-back-btn");
const onboardingScenarioTitle = document.getElementById("onboarding-scenario-title");
const onboardingScenarioSummary = document.getElementById("onboarding-scenario-summary");
const nodeTitle = document.getElementById("node-title");
const nodeText = document.getElementById("node-text");
const choicesEl = document.getElementById("choices");
const feedbackPanel = document.getElementById("feedback-panel");
const feedbackText = document.getElementById("feedback-text");
const feedbackEmoji = document.getElementById("feedback-emoji");
const feedbackHeading = document.getElementById("feedback-heading");
const rewardStrip = document.getElementById("reward-strip");
const scoreEl = document.getElementById("score");
const stageEl = document.getElementById("stage");
const speedEl = document.getElementById("speed");
const evidenceEl = document.getElementById("evidence");
const coordinationEl = document.getElementById("coordination");
const riskEl = document.getElementById("risk");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const alertText = document.getElementById("alert-text");
const streakBadge = document.getElementById("streak-badge");
const scenarioName = document.getElementById("scenario-name");
const timerBadge = document.getElementById("timer-badge");
const finalSummary = document.getElementById("final-summary");
const finalScores = document.getElementById("final-scores");
const finalBadge = document.getElementById("final-badge");
const trophyCase = document.getElementById("trophy-case");
const debriefList = document.getElementById("debrief-list");

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function showScreen(screen) {
  [scenarioScreen, onboardingScreen, gameScreen, endScreen].forEach((el) => el.classList.remove("active"));
  screen.classList.add("active");
}

function renderScenarioList() {
  scenarioList.innerHTML = "";
  scenarioCatalog.forEach((scenario, index) => {
    const card = document.createElement("button");
    card.className = `scenario-card accent-${scenario.accent}`;
    card.innerHTML = `
      <div class="scenario-card-top">
        <span class="scenario-pill">Scenario 0${index + 1}</span>
        <span class="scenario-arrow">→</span>
      </div>
      <h3>${scenario.name}</h3>
      <p>${scenario.summary}</p>
      <div class="scenario-meta">4 aşamalı • puanlamalı • rozetli</div>
    `;
    card.addEventListener("click", () => openOnboarding(scenario.id));
    scenarioList.appendChild(card);
  });
}

function openOnboarding(id) {
  const scenario = scenarioCatalog.find((s) => s.id === id);
  state = initialState();
  state.scenario = scenario;
  onboardingScenarioTitle.textContent = scenario.name;
  onboardingScenarioSummary.textContent = scenario.summary;
  showScreen(onboardingScreen);
}

function startScenario() {
  state.current = "start";
  scenarioName.textContent = state.scenario.name;
  showScreen(gameScreen);
  renderNode();
}

function renderStats() {
  scoreEl.textContent = state.score;
  stageEl.textContent = state.stage;
  speedEl.textContent = state.speed;
  evidenceEl.textContent = state.evidence;
  coordinationEl.textContent = state.coordination;
  riskEl.textContent = state.risk;
  const progress = Math.min((state.stage / 4) * 100, 100);
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${state.stage} / 4`;
  streakBadge.textContent = state.trophies.length ? `🏅 ${state.trophies[state.trophies.length - 1]}` : "🏅 Bonus fırsatı aktif";
}

function updateTimerBadge() {
  timerBadge.textContent = `⏱ ${timeLeft} sn`;
  timerBadge.classList.toggle('warning', timeLeft <= 10);
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimerBadge();
  timer = setInterval(() => {
    timeLeft -= 1;
    updateTimerBadge();
    if (timeLeft <= 0) {
      clearInterval(timer);
      const firstNegative = state.scenario.nodes[state.current].choices.find((c) => c.tone === 'negative') || state.scenario.nodes[state.current].choices[0];
      handleChoice(firstNegative, true);
    }
  }, 1000);
}

function renderNode() {
  const node = state.scenario.nodes[state.current];
  nodeTitle.textContent = node.title;
  nodeText.textContent = node.text;
  alertText.textContent = `Live alert feed: ${node.alert}`;
  choicesEl.innerHTML = "";
  feedbackPanel.classList.add("hidden");
  pendingNext = null;

  node.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = `choice-btn ${choice.tone}`;
    btn.innerHTML = `<span class="choice-index">0${index + 1}</span><span class="choice-copy">${choice.text}</span>`;
    btn.addEventListener("click", () => handleChoice(choice));
    choicesEl.appendChild(btn);
  });

  gameScreen.animate([
    { opacity: 0.85, transform: 'translateY(10px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 280, easing: 'ease-out' });

  renderStats();
  startTimer();
}

function handleChoice(choice, autoSelected = false) {
  clearInterval(timer);
  state.score += choice.effects.score || 0;
  state.speed = clamp(state.speed + (choice.effects.speed || 0));
  state.evidence = clamp(state.evidence + (choice.effects.evidence || 0));
  state.coordination = clamp(state.coordination + (choice.effects.coordination || 0));
  state.risk = clamp(state.risk + (choice.effects.risk || 0));

  if (choice.tone === "positive") {
    state.trophies.push(choice.badge);
    feedbackEmoji.textContent = "🏅✨😎";
    feedbackHeading.textContent = "Pozitif Kazanım";
    rewardStrip.className = "reward-strip positive";
    rewardStrip.innerHTML = `<span>+ Bonus</span><strong>${choice.bonus}</strong><span class="reward-badge">${choice.badge}</span>`;
  } else {
    feedbackEmoji.textContent = autoSelected ? "⏰😢💧" : "😢🙃💧";
    feedbackHeading.textContent = autoSelected ? "Süre Doldu" : "Riskli Sonuç";
    rewardStrip.className = "reward-strip negative";
    rewardStrip.innerHTML = `<span>− Kayıp</span><strong>${autoSelected ? '⏱ Süre aşımı nedeniyle otomatik seçim' : choice.bonus}</strong><span class="reward-badge">${choice.badge}</span>`;
  }

  feedbackText.textContent = choice.feedback;
  feedbackPanel.classList.remove("hidden");
  feedbackPanel.animate([
    { opacity: 0.5, transform: 'scale(0.98)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 260, easing: 'ease-out' });

  pendingNext = choice.next;
  [...choicesEl.querySelectorAll("button")].forEach((btn) => (btn.disabled = true));
  renderStats();
}

function finishGame() {
  showScreen(endScreen);
  const avg = Math.round((state.speed + state.evidence + state.coordination + state.risk) / 4);
  let verdict = "Karmaşık ama öğretici bir performans sergilendi.";
  let badge = "Adaptive Responder";

  if (avg >= 80 && state.score >= 80) {
    badge = "Elite Response Lead 🏆";
    verdict = "Çok güçlü bir performans. Hız, delil bütünlüğü, koordinasyon ve risk kontrolü dengeli ve profesyonel biçimde yönetildi.";
  } else if (avg >= 60) {
    badge = "Operational Coordinator 🧠";
    verdict = "Genel olarak güçlü bir performans. Bazı karar noktalarında yönetişim ve olay sınıflandırması daha da rafine edilebilir.";
  } else {
    badge = "High-Risk Path 😢";
    verdict = "Bu senaryoda kritik zafiyetler oluştu. Gecikme, eksik koordinasyon veya delil kaybı olay etkisini büyütmüş olabilir.";
  }

  finalBadge.textContent = `${state.scenario.name} • ${badge}`;
  finalSummary.textContent = verdict;
  finalScores.innerHTML = `
    <div class="meter"><span>Toplam Skor</span><strong>${state.score}</strong></div>
    <div class="meter"><span>Hız</span><strong>${state.speed}</strong></div>
    <div class="meter"><span>Kanıt Koruma</span><strong>${state.evidence}</strong></div>
    <div class="meter"><span>Koordinasyon</span><strong>${state.coordination}</strong></div>
    <div class="meter"><span>Risk Kontrolü</span><strong>${state.risk}</strong></div>
  `;

  trophyCase.innerHTML = "";
  debriefList.innerHTML = `
    <li>Containment ile delil bütünlüğü arasında denge kurmak temel başarı ölçütüdür.</li>
    <li>Doğru eskalasyon, teknik doğruluk kadar kurumsal güven üretir.</li>
    <li>SOP, governance ve audit trail eksikliği iyi teknik kararları bile zayıflatabilir.</li>
    <li>Her incident response süreci, debrief ile kurumsal öğrenmeye çevrilmelidir.</li>
  `;
  if (state.trophies.length) {
    state.trophies.forEach((trophy) => {
      const item = document.createElement("div");
      item.className = "trophy-item";
      item.textContent = `🏅 ${trophy}`;
      trophyCase.appendChild(item);
    });
  } else {
    const item = document.createElement("div");
    item.className = "trophy-item muted";
    item.textContent = "😢 Bu turda rozet kazanılamadı";
    trophyCase.appendChild(item);
  }
}

nextBtn.addEventListener("click", () => {
  if (!pendingNext) return;
  if (pendingNext === "end") {
    finishGame();
    return;
  }
  state.current = pendingNext;
  state.stage += 1;
  renderNode();
});

restartBtn.addEventListener("click", () => {
  state = initialState();
  showScreen(scenarioScreen);
  renderScenarioList();
});

onboardingStartBtn.addEventListener("click", () => startScenario());
onboardingBackBtn.addEventListener("click", () => {
  state = initialState();
  showScreen(scenarioScreen);
});

fullscreenBtn.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      fullscreenBtn.textContent = '🡼 Sunum Modundan Çık';
    } else {
      await document.exitFullscreen();
      fullscreenBtn.textContent = '⛶ Sunum Modu';
    }
  } catch (err) {
    console.error('Fullscreen error:', err);
  }
});

presentationBtn.addEventListener('click', () => {
  document.body.classList.toggle('presentation-mode');
  presentationBtn.textContent = document.body.classList.contains('presentation-mode')
    ? '🧾 Normal Görünüm'
    : '🎤 Projeksiyon Görünümü';
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = '⛶ Sunum Modu';
  }
});

renderScenarioList();
