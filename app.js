const scenarioCatalog = [
  {
    id: "after-hours-access",
    accent: "orange",
    name: {
      tr: "Mesai Dışı Yetkisiz Erişim",
      en: "After-Hours Unauthorized Access"
    },
    summary: {
      tr: "Araştırmacı hesabında mesai dışı erişim, hassas proje klasörlerinde olağandışı gezinme ve olası veri açığa çıkışı riski.",
      en: "After-hours access to a researcher account, unusual navigation in sensitive project folders, and possible data exposure risk."
    },
    nodes: {
      start: {
        alert: {
          tr: "Paylaşılan araştırma sürücüsünde olağandışı hesap etkinliği doğrulandı.",
          en: "Unusual account activity confirmed on the shared research drive."
        },
        title: {
          tr: "Aşama 1 — İlk Alarm ve Başlangıç Containment",
          en: "Stage 1 — Initial Alert and Early Containment"
        },
        text: {
          tr: "Bir araştırmacının hesabından gece saatlerinde erişim yapıldığı ve hassas proje klasörlerinde yüksek hacimli gezinme olduğu saptandı. İlk hedef, olayın kapsamını büyütmeden containment sağlamak ve delil bütünlüğünü korumaktır.",
          en: "A researcher account was accessed during the night, with high-volume navigation across sensitive project folders. The first goal is to contain the incident without expanding its scope and to preserve evidence integrity."
        },
        choices: [
          {
            text: {
              tr: "Etkilenen hesabı ve ilgili sistemi kontrollü biçimde izole et; log koruma, oturum inceleme ve ilk olay kaydını eşzamanlı başlat.",
              en: "Controlled-isolate the affected account and system; begin log preservation, session review, and the initial incident record simultaneously."
            },
            tone: "positive",
            bonus: { tr: "⚡ Erken containment bonusu", en: "⚡ Early containment bonus" },
            feedback: {
              tr: "Çok güçlü başlangıç. Containment ile delil koruma aynı anda yürütüldü; bu yaklaşım incident response olgunluğunun temel göstergesidir.",
              en: "Excellent start. Containment and evidence preservation were performed together; this is a core indicator of incident response maturity."
            },
            effects: { score: 25, speed: 12, evidence: 15, coordination: 8, risk: 14 },
            badge: { tr: "Containment Pro", en: "Containment Pro" },
            next: "comms"
          },
          {
            text: {
              tr: "Kullanıcıya cihazı yeniden başlatmasını ve şifresini hemen değiştirmesini söyle.",
              en: "Tell the user to reboot the device and immediately change the password."
            },
            tone: "negative",
            bonus: { tr: "😢 Uçucu delil kaybı riski", en: "😢 Volatile evidence loss risk" },
            feedback: {
              tr: "İyi niyetli ancak zayıf bir refleks. Plansız yeniden başlatma, uçucu delilleri ve olay korelasyonunu bozabilir.",
              en: "Well-intentioned but weak. An unplanned reboot may destroy volatile evidence and break incident correlation."
            },
            effects: { score: -12, speed: 4, evidence: -18, coordination: -4, risk: -8 },
            badge: { tr: "Evidence Lost", en: "Evidence Lost" },
            next: "comms"
          },
          {
            text: {
              tr: "Bir süre gözlemle; olay belirgin şekilde büyürse müdahale et.",
              en: "Observe for a while; intervene only if the incident clearly escalates."
            },
            tone: "negative",
            bonus: { tr: "😢 Gecikme cezası", en: "😢 Delay penalty" },
            feedback: {
              tr: "Bu gecikme, yetkisiz erişimin sürmesine ve potansiyel veri açığa çıkışının artmasına neden olabilir.",
              en: "This delay may allow unauthorized access to continue and increase the likelihood of data exposure."
            },
            effects: { score: -20, speed: -18, evidence: -6, coordination: -8, risk: -18 },
            badge: { tr: "Late Response", en: "Late Response" },
            next: "comms"
          }
        ]
      },
      comms: {
        alert: {
          tr: "Eskalasyon eşiği aşıldı. Yönetim kısa durum özeti bekliyor.",
          en: "Escalation threshold reached. Leadership is awaiting a short brief."
        },
        title: {
          tr: "Aşama 2 — Eskalasyon ve Kurumsal Bildirim",
          en: "Stage 2 — Escalation and Institutional Notification"
        },
        text: {
          tr: "İlk teknik bulgular doğrulandı. Bu aşamada doğru eskalasyon zincirinin işletilmesi, hem teknik hem yönetsel yanıt kalitesini belirler.",
          en: "Initial technical findings are confirmed. At this stage, activating the correct escalation chain determines both technical and managerial response quality."
        },
        choices: [
          {
            text: {
              tr: "IR zincirini aktive et: IT/security, ilgili yönetici, araştırma güvenliği ve gerekli ise hukuk/uyum birimini bilgilendir.",
              en: "Activate the IR chain: notify IT/security, the relevant manager, research security, and legal/compliance if needed."
            },
            tone: "positive",
            bonus: { tr: "🏅 Eskalasyon bonusu", en: "🏅 Escalation bonus" },
            feedback: {
              tr: "Profesyonel bir yaklaşım. Yapılandırılmış eskalasyon, rol netliği ve koordinasyon kalitesi sağlar.",
              en: "A professional approach. Structured escalation creates role clarity and coordination quality."
            },
            effects: { score: 22, speed: 10, evidence: 4, coordination: 20, risk: 10 },
            badge: { tr: "Chain Commander", en: "Chain Commander" },
            next: "evidence"
          },
          {
            text: {
              tr: "Önce gayriresmî biçimde tanıdık bir kişiye danış; resmi süreci sonra düşün.",
              en: "First ask someone informally; think about the formal process later."
            },
            tone: "negative",
            bonus: { tr: "😢 Koordinasyon kaybı", en: "😢 Coordination loss" },
            feedback: {
              tr: "Gayriresmî iletişim, bilgi kirliliğine ve sorumluluk belirsizliğine yol açabilir. Kurumsal response mimarisi zayıflar.",
              en: "Informal communication may create noise and accountability ambiguity. The institutional response architecture weakens."
            },
            effects: { score: -10, speed: 0, evidence: 0, coordination: -18, risk: -8 },
            badge: { tr: "Loose Comms", en: "Loose Comms" },
            next: "evidence"
          },
          {
            text: {
              tr: "Tüm personele hemen geniş kapsamlı uyarı e-postası gönder.",
              en: "Immediately send a broad warning email to all staff."
            },
            tone: "negative",
            bonus: { tr: "😢 Erken panik etkisi", en: "😢 Early panic effect" },
            feedback: {
              tr: "Erken ve kontrolsüz duyuru, gereksiz panik ve spekülasyon üretebilir; hedefe yönelik iletişim daha uygundur.",
              en: "An early uncontrolled announcement may create unnecessary panic and speculation; targeted communication is more appropriate."
            },
            effects: { score: -6, speed: 4, evidence: 0, coordination: -8, risk: -4 },
            badge: { tr: "Noise Burst", en: "Noise Burst" },
            next: "evidence"
          }
        ]
      },
      evidence: {
        alert: {
          tr: "Forensik koruma penceresi daralıyor.",
          en: "The forensic preservation window is narrowing."
        },
        title: {
          tr: "Aşama 3 — Delil Bütünlüğü ve Forensik Yaklaşım",
          en: "Stage 3 — Evidence Integrity and Forensic Approach"
        },
        text: {
          tr: "Olayın etkilediği veri kümeleri ve erişim izi netleştirilmelidir. Delil zinciri bu aşamada kritik önemdedir.",
          en: "Affected data sets and access traces must be clarified. Chain-of-custody is critical at this stage."
        },
        choices: [
          {
            text: {
              tr: "Sistem imajı, loglar, erişim kayıtları ve zaman çizelgesini kontrollü biçimde topla; chain-of-custody yaklaşımını uygula.",
              en: "Collect system images, logs, access records, and the timeline in a controlled way; apply chain-of-custody."
            },
            tone: "positive",
            bonus: { tr: "🧠 Forensik bonus", en: "🧠 Forensic bonus" },
            feedback: {
              tr: "Mükemmel seçim. Delil bütünlüğü ve iz sürülebilirlik korunarak kök neden analizi için güçlü bir temel kuruldu.",
              en: "Excellent choice. Evidence integrity and traceability were preserved, creating a strong basis for root-cause analysis."
            },
            effects: { score: 26, speed: 4, evidence: 22, coordination: 6, risk: 10 },
            badge: { tr: "Forensic Guardian", en: "Forensic Guardian" },
            next: "decision"
          },
          {
            text: {
              tr: "Sistemi hemen kapat; ayrıntılı inceleme daha sonra yapılabilir.",
              en: "Shut the system down immediately; detailed investigation can come later."
            },
            tone: "negative",
            bonus: { tr: "😢 Uçucu veri kaybı", en: "😢 Volatile data loss" },
            feedback: {
              tr: "Plansız kapatma, bellek temelli verilerin ve aktif süreç izlerinin kaybına neden olabilir.",
              en: "An unplanned shutdown may destroy memory-based data and active process traces."
            },
            effects: { score: -16, speed: 0, evidence: -20, coordination: 0, risk: -6 },
            badge: { tr: "Cold Shutdown", en: "Cold Shutdown" },
            next: "decision"
          },
          {
            text: {
              tr: "Önce hizmet sürekliliğini sağla, delil toplama sonra yapılır.",
              en: "Restore service first; evidence collection can happen later."
            },
            tone: "negative",
            bonus: { tr: "😢 Kritik analitik kayıp", en: "😢 Critical analytical loss" },
            feedback: {
              tr: "Hizmet sürekliliği önemlidir; ancak delil toplama gecikirse olayın açıklanabilirliği ciddi biçimde zayıflar.",
              en: "Service continuity matters, but delayed evidence collection seriously weakens incident explainability."
            },
            effects: { score: -24, speed: -10, evidence: -24, coordination: -5, risk: -12 },
            badge: { tr: "Missed Evidence", en: "Missed Evidence" },
            next: "decision"
          }
        ]
      },
      decision: {
        alert: {
          tr: "Yönetim containment yol haritası ve toparlanma planı bekliyor.",
          en: "Leadership expects a containment roadmap and recovery plan."
        },
        title: {
          tr: "Aşama 4 — İyileştirme, Sınıflandırma ve Debrief",
          en: "Stage 4 — Recovery, Classification, and Debrief"
        },
        text: {
          tr: "Başlangıç yanıtı tamamlandı. Şimdi olay sınıflandırması, düzeltici aksiyonlar ve kurumsal öğrenme çerçevesi belirlenmelidir.",
          en: "The initial response is complete. Now incident classification, corrective actions, and an institutional learning framework must be established."
        },
        choices: [
          {
            text: {
              tr: "Olay sınıflandırması yap; etki alanını belirle, düzeltici aksiyon planı hazırla ve yapılandırılmış debrief başlat.",
              en: "Classify the incident; define impact scope, prepare a corrective action plan, and launch a structured debrief."
            },
            tone: "positive",
            bonus: { tr: "🌟 Mastery bonusu", en: "🌟 Mastery bonus" },
            feedback: {
              tr: "Olgun incident response yaklaşımı. Müdahale sadece teknik olarak değil, yönetişim ve kurumsal öğrenme açısından da tamamlandı.",
              en: "A mature incident response approach. The intervention was completed not only technically, but also in governance and institutional learning terms."
            },
            effects: { score: 30, speed: 10, evidence: 6, coordination: 16, risk: 20 },
            badge: { tr: "Response Strategist", en: "Response Strategist" },
            next: "end"
          },
          {
            text: {
              tr: "Sistemi normale döndür ve olayı hızlıca kapat.",
              en: "Return the system to normal and close the incident quickly."
            },
            tone: "negative",
            bonus: { tr: "😢 Tekrar riski", en: "😢 Recurrence risk" },
            feedback: {
              tr: "Yüzeysel kapanış, tekrarlayan olay riskini ve görünmeyen zafiyetleri artırır.",
              en: "A superficial closure increases recurrence risk and leaves hidden vulnerabilities unaddressed."
            },
            effects: { score: -18, speed: 4, evidence: -6, coordination: -10, risk: -18 },
            badge: { tr: "Shallow Recovery", en: "Shallow Recovery" },
            next: "end"
          },
          {
            text: {
              tr: "Kanıtlar tam netleşmeden bireysel suçlu ilan et.",
              en: "Declare an individual culprit before the evidence is fully clear."
            },
            tone: "negative",
            bonus: { tr: "😢 Etik ve operasyonel hata", en: "😢 Ethical and operational failure" },
            feedback: {
              tr: "Erken suçlama, sistem odaklı analizi bozar ve iş birliğini zedeler.",
              en: "Premature blame damages system-focused analysis and undermines collaboration."
            },
            effects: { score: -16, speed: 0, evidence: -8, coordination: -18, risk: -10 },
            badge: { tr: "Blame Trap", en: "Blame Trap" },
            next: "end"
          }
        ]
      }
    }
  },
  {
    id: "usb-transfer",
    accent: "purple",
    name: { tr: "Yetkisiz USB / Veri Transferi", en: "Unauthorized USB / Data Transfer" },
    summary: {
      tr: "Kritik araştırma dosyalarının harici ortama aktarılmış olabileceği ve material/data governance ihlali riski.",
      en: "Risk of critical research files being transferred to external media and a possible material/data governance breach."
    },
    nodes: {
      start: {
        alert: { tr: "Kısıtlı veri kümesi yakınında taşınabilir medya anomalisi tespit edildi.", en: "Portable media anomaly detected near a restricted dataset." },
        title: { tr: "Aşama 1 — Transfer Şüphesinin İlk Kontrolü", en: "Stage 1 — Initial Control of Transfer Suspicion" },
        text: { tr: "Yetkili olmayan bir taşınabilir medya cihazının kısıtlı araştırma verilerine yakın zamanda bağlandığı saptandı. İlk amaç, yayılımı durdurmak ve transfer izini korumaktır.", en: "An unauthorized portable media device was recently connected near restricted research data. The first objective is to stop propagation and preserve the transfer trail." },
        choices: [
          { text: { tr: "Erişimi sınırla, cihaz kaydını ve erişim izlerini koru, ilk olay kaydını oluştur.", en: "Restrict access, preserve the device record and access traces, and create the initial incident record." }, tone: "positive", bonus: { tr: "🔒 Access control bonusu", en: "🔒 Access control bonus" }, feedback: { tr: "Doğru yaklaşım. Hem transfer riski hem de delil kaybı erken aşamada kontrol altına alındı.", en: "Correct approach. Both transfer risk and evidence loss were controlled early." }, effects: { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, badge: { tr: "Access Sentinel", en: "Access Sentinel" }, next: "comms" },
          { text: { tr: "Sadece kullanıcıyı sözlü olarak uyar; resmi kayıt açma.", en: "Only warn the user verbally; do not open a formal record." }, tone: "negative", bonus: { tr: "😢 Yetersiz kontrol", en: "😢 Insufficient control" }, feedback: { tr: "Sözlü uyarı tek başına yeterli değildir. Olayın kurumsal izlenebilirliği ve governance değeri kaybolur.", en: "A verbal warning alone is not enough. Institutional traceability and governance value are lost." }, effects: { score: -8, speed: 2, evidence: -10, coordination: -4, risk: -8 }, badge: { tr: "Soft Control", en: "Soft Control" }, next: "comms" },
          { text: { tr: "Muhtemelen önemsizdir diyerek konuyu kapat.", en: "Dismiss the issue as probably insignificant." }, tone: "negative", bonus: { tr: "😢 Risk küçümsemesi", en: "😢 Risk minimization" }, feedback: { tr: "Bu tür transferler biyogüvenlik, fikri haklar ve veri yönetişimi açısından kritik olabilir; küçümsenmemelidir.", en: "Such transfers may be critical from biosecurity, IP, and data governance perspectives and should not be minimized." }, effects: { score: -22, speed: -12, evidence: -10, coordination: -8, risk: -20 }, badge: { tr: "Dismissal Risk", en: "Dismissal Risk" }, next: "comms" }
        ]
      },
      comms: {
        alert: { tr: "Veri yönetişimi paydaşlarının devreye girmesi gerekiyor.", en: "Data governance stakeholders should be engaged." },
        title: { tr: "Aşama 2 — Paydaşların Devreye Alınması", en: "Stage 2 — Stakeholder Engagement" },
        text: { tr: "Olay artık yalnızca teknik değil; research security, data governance ve olası teknoloji transferi boyutu taşımaktadır.", en: "The incident is no longer purely technical; it also carries research security, data governance, and possible technology transfer dimensions." },
        choices: [
          { text: { tr: "IT, araştırma güvenliği, veri yönetişimi ve ilgili yöneticileri ortak response akışında birleştir.", en: "Bring IT, research security, data governance, and relevant managers into a shared response flow." }, tone: "positive", bonus: { tr: "🤝 Multi-team bonusu", en: "🤝 Multi-team bonus" }, feedback: { tr: "Çok iyi. Bu olay disiplinler arası değerlendirme gerektirir ve doğru paydaş seti devreye alındı.", en: "Very good. This incident requires interdisciplinary review, and the correct stakeholder set was engaged." }, effects: { score: 20, speed: 8, evidence: 6, coordination: 20, risk: 10 }, badge: { tr: "Bridge Builder", en: "Bridge Builder" }, next: "evidence" },
          { text: { tr: "Sadece teknik ekip ilgilensin; yönetişim boyutunu sonra düşün.", en: "Let only the technical team handle it; think about governance later." }, tone: "negative", bonus: { tr: "😢 Governance gap", en: "😢 Governance gap" }, feedback: { tr: "Teknik çözüm tek başına yeterli değildir; policy ve kurumsal sorumluluk boyutu ihmal edilmiş olur.", en: "A technical solution alone is not enough; policy and institutional accountability are neglected." }, effects: { score: -10, speed: 0, evidence: 0, coordination: -14, risk: -10 }, badge: { tr: "Governance Gap", en: "Governance Gap" }, next: "evidence" },
          { text: { tr: "Durumu laboratuvar içinde tut; üst yönetime çıkmasın.", en: "Keep the issue within the lab; do not escalate it upward." }, tone: "negative", bonus: { tr: "😢 Silo response", en: "😢 Silo response" }, feedback: { tr: "Dar çevrede tutmak, kurumsal kapasiteyi ve olaydan öğrenme olasılığını sınırlar.", en: "Keeping it in a silo limits institutional capacity and the ability to learn from the incident." }, effects: { score: -12, speed: 0, evidence: -2, coordination: -16, risk: -8 }, badge: { tr: "Silo Response", en: "Silo Response" }, next: "evidence" }
        ]
      },
      evidence: {
        alert: { tr: "Transfer yolunun rekonstrüksiyonu gerekiyor.", en: "Transfer path reconstruction is required." },
        title: { tr: "Aşama 3 — Transfer Yolunun Rekonstrüksiyonu", en: "Stage 3 — Reconstruction of the Transfer Path" },
        text: { tr: "Hangi veri veya materyalin, hangi anda ve hangi kanal üzerinden etkilenmiş olabileceğini rekonstrükte etmeniz gerekiyor.", en: "You need to reconstruct which data or material may have been affected, when, and through which channel." },
        choices: [
          { text: { tr: "Cihaz kayıtları, dosya erişim logları ve zaman çizelgesini eşleştir; transfer kapsamını rekonstrükte et.", en: "Correlate device records, file access logs, and the timeline; reconstruct transfer scope." }, tone: "positive", bonus: { tr: "📊 Reconstruction bonusu", en: "📊 Reconstruction bonus" }, feedback: { tr: "Mükemmel. Olayın kapsamı ve etkilenmiş veri kümeleri analitik olarak görünür hale geldi.", en: "Excellent. The scope of the incident and affected data groups became analytically visible." }, effects: { score: 25, speed: 4, evidence: 20, coordination: 4, risk: 10 }, badge: { tr: "Trail Mapper", en: "Trail Mapper" }, next: "decision" },
          { text: { tr: "Önce kimin yaptığını bul; teknik iz sonra gelir.", en: "Find out who did it first; technical traces can come later." }, tone: "negative", bonus: { tr: "😢 Öncelik hatası", en: "😢 Priority failure" }, feedback: { tr: "Olay yönetimi önce kapsamı ve etkiyi anlamalıdır; kişileştirme erken aşamada zayıf bir reflekstir.", en: "Incident management must first understand scope and impact; personalization at this stage is a weak reflex." }, effects: { score: -14, speed: 0, evidence: -16, coordination: -6, risk: -8 }, badge: { tr: "Premature Blame", en: "Premature Blame" }, next: "decision" },
          { text: { tr: "Sadece basit erişim listesine bak; detaylı analiz gereksiz.", en: "Only check the basic access list; detailed analysis is unnecessary." }, tone: "negative", bonus: { tr: "😢 Eksik görünürlük", en: "😢 Limited visibility" }, feedback: { tr: "Parçalı veriyle karar vermek yanlış kapsam tahmini ve yetersiz response’a yol açar.", en: "Deciding on fragmented data leads to poor scope estimation and an inadequate response." }, effects: { score: -10, speed: 2, evidence: -12, coordination: 0, risk: -8 }, badge: { tr: "Thin Review", en: "Thin Review" }, next: "decision" }
        ]
      },
      decision: {
        alert: { tr: "Yönetim önleyici aksiyonlar bekliyor.", en: "Leadership is asking for prevention actions." },
        title: { tr: "Aşama 4 — Önleme ve Kurumsal Güçlendirme", en: "Stage 4 — Prevention and Institutional Strengthening" },
        text: { tr: "Olay incelendi. Şimdi tekrar riskini azaltacak kurumsal kapasite artırıcı adımlar belirlenmelidir.", en: "The incident has been reviewed. Now institutional capacity-building actions that reduce recurrence risk must be defined." },
        choices: [
          { text: { tr: "Politika güncelle, erişim kısıtlarını iyileştir, eğitim ve denetim planı oluştur.", en: "Update policy, improve access restrictions, and create training and audit plans." }, tone: "positive", bonus: { tr: "🏆 Prevention bonusu", en: "🏆 Prevention bonus" }, feedback: { tr: "Güçlü kapanış. Müdahale, sürdürülebilir önleme ve kurumsal dayanıklılığa dönüştürüldü.", en: "Strong closure. The intervention was transformed into sustainable prevention and institutional resilience." }, effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: { tr: "Prevention Architect", en: "Prevention Architect" }, next: "end" },
          { text: { tr: "Sadece sözlü uyarı ile yetin.", en: "Settle for a verbal warning only." }, tone: "negative", bonus: { tr: "😢 Zayıf kapanış", en: "😢 Weak closure" }, feedback: { tr: "Sözlü uyarı davranış değişikliği için genellikle yetersizdir; sistemik önlem gerekir.", en: "A verbal warning is usually insufficient for behavioral change; systemic controls are needed." }, effects: { score: -12, speed: 2, evidence: 0, coordination: -8, risk: -12 }, badge: { tr: "Verbal Fix", en: "Verbal Fix" }, next: "end" },
          { text: { tr: "Olay kapandı; ek aksiyon alma.", en: "The incident is over; take no further action." }, tone: "negative", bonus: { tr: "😢 Tekrar riski", en: "😢 Recurrence risk" }, feedback: { tr: "Düzeltici aksiyon olmadan aynı açık yeniden üretilebilir.", en: "Without corrective action, the same weakness may recur." }, effects: { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, badge: { tr: "No Lessons", en: "No Lessons" }, next: "end" }
        ]
      }
    }
  },
  {
    id: "partner-email",
    accent: "blue",
    name: { tr: "Şüpheli İş Birliği Talebi", en: "Suspicious Collaboration Request" },
    summary: { tr: "Dış partnerden gelen olağandışı veri talebi ve partner due diligence gerektiren kimlik/doğrulama belirsizliği.", en: "An unusual external partner data request with identity/authentication uncertainty requiring partner due diligence." },
    nodes: {
      start: {
        alert: { tr: "Dış partner talebi doğrulama incelemesine işaretlendi.", en: "External partner request flagged for authenticity review." },
        title: { tr: "Aşama 1 — Talebin Durdurulması ve Doğrulama Başlatılması", en: "Stage 1 — Hold the Request and Start Verification" },
        text: { tr: "Dış bir iş birliği partnerinden SOP dışı veri ve doküman talebi geldi. Gönderen meşruiyeti ve talebin bağlamı tam net değil.", en: "An external collaboration partner sent an out-of-SOP request for data and documents. Sender legitimacy and contextual validity are unclear." },
        choices: [
          { text: { tr: "Talebi geçici olarak durdur, bağımsız kanal üzerinden doğrulama başlat ve ön değerlendirme kaydı aç.", en: "Temporarily hold the request, initiate verification through an independent channel, and open a preliminary assessment record." }, tone: "positive", bonus: { tr: "✅ Verification bonusu", en: "✅ Verification bonus" }, feedback: { tr: "Çok iyi. Research security pratiğinde ‘trust but verify’ yaklaşımı tam olarak budur.", en: "Excellent. This is exactly the 'trust but verify' approach used in research security practice." }, effects: { score: 24, speed: 10, evidence: 10, coordination: 10, risk: 16 }, badge: { tr: "Verifier", en: "Verifier" }, next: "comms" },
          { text: { tr: "İlişkiyi zedelememek için talebi hızla karşıla.", en: "Fulfill the request quickly to avoid harming the relationship." }, tone: "negative", bonus: { tr: "😢 Sosyal mühendislik riski", en: "😢 Social engineering risk" }, feedback: { tr: "İlişki yönetimi önemlidir; ancak kimlik ve yetki doğrulanmadan paylaşım yapılması kritik bir güvenlik zafiyetidir.", en: "Relationship management matters, but sharing before identity and authority are verified is a critical security weakness." }, effects: { score: -20, speed: 6, evidence: -8, coordination: -4, risk: -20 }, badge: { tr: "Trust Trap", en: "Trust Trap" }, next: "comms" },
          { text: { tr: "Talebi yanıtsız bırak ve kendiliğinden sönmesini bekle.", en: "Leave the request unanswered and hope it fades away." }, tone: "negative", bonus: { tr: "😢 Pasif risk", en: "😢 Passive risk" }, feedback: { tr: "Pasiflik, güvenli yönetim değildir. Şüpheli talepler belgelenmeli ve değerlendirilmeliidir.", en: "Passivity is not secure management. Suspicious requests should be documented and assessed." }, effects: { score: -8, speed: -6, evidence: -2, coordination: -6, risk: -8 }, badge: { tr: "Silent Drift", en: "Silent Drift" }, next: "comms" }
        ]
      },
      comms: {
        alert: { tr: "Partner due diligence iş akışı öneriliyor.", en: "Partner due diligence workflow recommended." },
        title: { tr: "Aşama 2 — Due Diligence Çerçevesinin Kurulması", en: "Stage 2 — Build the Due Diligence Framework" },
        text: { tr: "Talebin teknik, etik, hukuki ve iş birliği boyutları birlikte değerlendirilmelidir.", en: "The technical, ethical, legal, and collaboration dimensions of the request must be assessed together." },
        choices: [
          { text: { tr: "Araştırma güvenliği, PI, hukuk/uyum ve ilgili doğrulama kanallarını birlikte devreye al.", en: "Engage research security, the PI, legal/compliance, and the relevant verification channels together." }, tone: "positive", bonus: { tr: "🤝 Due diligence bonusu", en: "🤝 Due diligence bonus" }, feedback: { tr: "Bu yaklaşım, partner due diligence için güçlü ve kurumsal bir çerçeve sunar.", en: "This creates a strong institutional framework for partner due diligence." }, effects: { score: 22, speed: 8, evidence: 4, coordination: 18, risk: 10 }, badge: { tr: "Due Diligence Lead", en: "Due Diligence Lead" }, next: "evidence" },
          { text: { tr: "Kararı sadece PI versin.", en: "Let the PI make the decision alone." }, tone: "negative", bonus: { tr: "😢 Tekil karar riski", en: "😢 Single-actor decision risk" }, feedback: { tr: "Bu tür kararların tek aktöre bırakılması, kurumsal görünürlüğü ve hesap verebilirliği zayıflatır.", en: "Leaving this type of decision to a single actor weakens institutional visibility and accountability." }, effects: { score: -12, speed: 0, evidence: 0, coordination: -16, risk: -10 }, badge: { tr: "Solo Governance", en: "Solo Governance" }, next: "evidence" },
          { text: { tr: "Kararı ertele; partner tekrar yazarsa bakarsın.", en: "Delay the decision; revisit it if the partner writes again." }, tone: "negative", bonus: { tr: "😢 Belirsizlik maliyeti", en: "😢 Cost of ambiguity" }, feedback: { tr: "Belirsizliği ertelemek, hem güvenlik hem de iş birliği güvenilirliği açısından maliyetlidir.", en: "Delaying ambiguity is costly for both security and collaboration credibility." }, effects: { score: -8, speed: -8, evidence: 0, coordination: -8, risk: -8 }, badge: { tr: "Delayed Clarity", en: "Delayed Clarity" }, next: "evidence" }
        ]
      },
      evidence: {
        alert: { tr: "Meta veri incelemesi gönderen meşruiyetini açıklığa kavuşturabilir.", en: "Metadata review can clarify sender legitimacy." },
        title: { tr: "Aşama 3 — Kimlik ve Bağlam Doğrulaması", en: "Stage 3 — Identity and Context Verification" },
        text: { tr: "Talebin meşruiyetini değerlendirmek için teknik ve bağlamsal kanıtları birlikte okumak gerekir.", en: "To evaluate legitimacy, technical and contextual evidence must be interpreted together." },
        choices: [
          { text: { tr: "Header/metadata, önceki yazışma örüntüsü ve resmi kanal çapraz doğrulamasını birlikte incele.", en: "Review headers/metadata, prior communication patterns, and official channel cross-verification together." }, tone: "positive", bonus: { tr: "🧬 Trust but verify bonusu", en: "🧬 Trust but verify bonus" }, feedback: { tr: "Çok güçlü bir doğrulama seti. Kimlik, niyet ve bağlam birlikte değerlendirildi.", en: "A very strong verification set. Identity, intent, and context were assessed together." }, effects: { score: 24, speed: 4, evidence: 18, coordination: 6, risk: 10 }, badge: { tr: "Signal Analyst", en: "Signal Analyst" }, next: "decision" },
          { text: { tr: "Gönderen adı tanıdık görünüyor; teknik doğrulamaya gerek yok.", en: "The sender name looks familiar; no technical verification is necessary." }, tone: "negative", bonus: { tr: "😢 Display-name tuzağı", en: "😢 Display-name trap" }, feedback: { tr: "Display name güvenilir doğrulama değildir; spoofing ve kimlik taklidi riski göz ardı edildi.", en: "A display name is not reliable verification; spoofing and impersonation risks were ignored." }, effects: { score: -16, speed: 0, evidence: -14, coordination: 0, risk: -14 }, badge: { tr: "Display Name Trap", en: "Display Name Trap" }, next: "decision" },
          { text: { tr: "E-posta üslubu profesyonel; bu yeterlidir.", en: "The email sounds professional; that is sufficient." }, tone: "negative", bonus: { tr: "😢 Biçim yanılgısı", en: "😢 Style illusion" }, feedback: { tr: "Profesyonel dil, meşruiyet kanıtı değildir. Karar, görünüşe değil doğrulamaya dayanmalıdır.", en: "Professional style is not proof of legitimacy. Decisions should rely on verification, not appearance." }, effects: { score: -12, speed: 2, evidence: -10, coordination: 0, risk: -10 }, badge: { tr: "Style Bias", en: "Style Bias" }, next: "decision" }
        ]
      },
      decision: {
        alert: { tr: "Veri paylaşımı ve partner yönetimi hakkında karar gerekiyor.", en: "A decision is required on data release and partner handling." },
        title: { tr: "Aşama 4 — Güvenli Sonuçlandırma ve Kayıt", en: "Stage 4 — Safe Resolution and Recordkeeping" },
        text: { tr: "Doğrulama sonrası paylaşımın SOP’ye uygun biçimde güvenli veya kontrollü biçimde reddedilmesi gerekir.", en: "After verification, sharing must either proceed safely under SOP or be formally denied in a controlled way." },
        choices: [
          { text: { tr: "Doğrulanmışsa kontrollü paylaşım yap; doğrulanmamışsa resmi ret ve kayıt mekanizmasını işlet.", en: "If verified, proceed with controlled sharing; if not, issue a formal refusal and activate recordkeeping." }, tone: "positive", bonus: { tr: "🌟 Governance mastery", en: "🌟 Governance mastery" }, feedback: { tr: "Mükemmel kapanış. Hem iş birliği sürekliliği hem güvenlik standardı birlikte korundu.", en: "Excellent closure. Collaboration continuity and security standards were preserved together." }, effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: { tr: "Collaboration Guardian", en: "Collaboration Guardian" }, next: "end" },
          { text: { tr: "Belirsizlik sürse de ilişkiyi korumak için paylaşım yap.", en: "Share anyway to preserve the relationship despite continuing uncertainty." }, tone: "negative", bonus: { tr: "😢 Güvenlikten taviz", en: "😢 Security compromise" }, feedback: { tr: "İş birliği, güvenlik ilkesinin önüne geçirilmemelidir; bu kurumsal güvenlik eşiğini aşındırır.", en: "Collaboration must not override security principles; doing so erodes the institutional security threshold." }, effects: { score: -18, speed: 4, evidence: -4, coordination: -8, risk: -18 }, badge: { tr: "Relationship Overreach", en: "Relationship Overreach" }, next: "end" },
          { text: { tr: "Talebi reddet ama kayıt oluşturma.", en: "Reject the request but do not document it." }, tone: "negative", bonus: { tr: "😢 Kurumsal hafıza kaybı", en: "😢 Institutional memory loss" }, feedback: { tr: "Belgelendirme olmadan audit trail oluşmaz; kurumsal öğrenme zayıflar.", en: "Without documentation, no audit trail exists and institutional learning weakens." }, effects: { score: -10, speed: 2, evidence: -8, coordination: -6, risk: -8 }, badge: { tr: "No Audit Trail", en: "No Audit Trail" }, next: "end" }
        ]
      }
    }
  },
  {
    id: "lab-device",
    accent: "pink",
    name: { tr: "Laboratuvar Cihazı Anomalisi", en: "Laboratory Device Anomaly" },
    summary: { tr: "Ağ bağlantılı laboratuvar cihazında olağandışı davranış, operasyonel etki ve siber-biyogüvenlik kesişimi.", en: "Irregular behavior in a network-connected laboratory device, with operational impact and a cyber-biosecurity intersection." },
    nodes: {
      start: {
        alert: { tr: "Bağlantılı laboratuvar cihazında düzensiz senkronizasyon davranışı görülüyor.", en: "A connected lab device is showing irregular sync behavior." },
        title: { tr: "Aşama 1 — Cihaz Davranışının Kontrol Altına Alınması", en: "Stage 1 — Bring Device Behavior Under Control" },
        text: { tr: "Ağ bağlantılı bir laboratuvar cihazı beklenmeyen şekilde dış sistemlerle senkronizasyon denemeleri yapıyor. İlk amaç, operasyonel etkiyi yönetirken yayılımı durdurmaktır.", en: "A network-connected laboratory device is unexpectedly attempting synchronization with external systems. The first goal is to stop propagation while managing operational impact." },
        choices: [
          { text: { tr: "Cihazı kontrollü biçimde ağdan ayır, operasyonel etkiyi değerlendir ve teknik kayıtları koru.", en: "Controlled-disconnect the device from the network, assess operational impact, and preserve technical records." }, tone: "positive", bonus: { tr: "🛡️ Device isolation bonusu", en: "🛡️ Device isolation bonus" }, feedback: { tr: "Çok iyi. Güvenlik ve operasyon dengesi birlikte gözetildi; bu olgun bir response davranışıdır.", en: "Very good. Security and operations were balanced together; this is a mature response behavior." }, effects: { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, badge: { tr: "Device Shield", en: "Device Shield" }, next: "comms" },
          { text: { tr: "Cihazı kapat-aç yap; düzelirse normal çalışmaya dön.", en: "Power-cycle the device; if it stabilizes, return to normal operations." }, tone: "negative", bonus: { tr: "😢 İnceleme kaybı", en: "😢 Investigation loss" }, feedback: { tr: "Reset refleksi, semptomu gizleyebilir ancak kök neden görünürlüğünü azaltır.", en: "The reset reflex may hide symptoms while reducing visibility into root cause." }, effects: { score: -14, speed: 2, evidence: -16, coordination: -2, risk: -10 }, badge: { tr: "Reset Reflex", en: "Reset Reflex" }, next: "comms" },
          { text: { tr: "İş akışı bozulmasın diye hiç müdahale etme.", en: "Do nothing so the workflow is not disrupted." }, tone: "negative", bonus: { tr: "😢 Yayılım riski", en: "😢 Propagation risk" }, feedback: { tr: "Pasiflik, hem teknik riskin hem de araştırma güvenliği etkisinin büyümesine neden olabilir.", en: "Passivity may enlarge both the technical risk and the research security impact." }, effects: { score: -20, speed: -12, evidence: -4, coordination: -6, risk: -18 }, badge: { tr: "Passive Drift", en: "Passive Drift" }, next: "comms" }
        ]
      },
      comms: {
        alert: { tr: "Operasyon ve güvenlik ekipleri hizalanmalı.", en: "Operational and safety/security teams should align." },
        title: { tr: "Aşama 2 — Operasyonel ve Güvenlik Koordinasyonu", en: "Stage 2 — Operational and Security Coordination" },
        text: { tr: "Cihazın araştırma sürecine etkisi vardır. Olay, yalnızca teknik bir sorun değil; güvenlik ve operasyon ortak konusu olarak ele alınmalıdır.", en: "The device affects the research workflow. The incident is not merely technical; it must be handled jointly as a security and operations issue." },
        choices: [
          { text: { tr: "IT, cihaz sorumlusu, laboratuvar yönetimi ve güvenlik ekibini ortak karar akışında buluştur.", en: "Bring IT, the device owner, lab management, and security into a shared decision flow." }, tone: "positive", bonus: { tr: "🤝 Alignment bonusu", en: "🤝 Alignment bonus" }, feedback: { tr: "Doğru yaklaşım. Operasyon sürekliliği ile güvenlik gereksinimi dengeli biçimde yönetildi.", en: "Correct approach. Operational continuity and security requirements were managed in balance." }, effects: { score: 22, speed: 8, evidence: 4, coordination: 20, risk: 10 }, badge: { tr: "Ops Aligner", en: "Ops Aligner" }, next: "evidence" },
          { text: { tr: "Sadece teknik ekip çözsün; laboratuvar sonra bilgilendirilsin.", en: "Let the technical team handle it alone; inform the lab later." }, tone: "negative", bonus: { tr: "😢 Operasyon körlüğü", en: "😢 Operational blind spot" }, feedback: { tr: "Laboratuvar etkisini dışarıda bırakmak, risk değerlendirmesini eksik kılar.", en: "Excluding the lab impact makes the risk assessment incomplete." }, effects: { score: -10, speed: 0, evidence: 0, coordination: -14, risk: -8 }, badge: { tr: "Ops Blind Spot", en: "Ops Blind Spot" }, next: "evidence" },
          { text: { tr: "Laboratuvar kendi içinde yönetsin; teknik ekibe gerek yok.", en: "Let the lab handle it internally; the technical team is unnecessary." }, tone: "negative", bonus: { tr: "😢 Teknik boşluk", en: "😢 Technical gap" }, feedback: { tr: "Teknik görünürlük olmadan olayın niteliği ve saldırı yüzeyi doğru tanımlanamaz.", en: "Without technical visibility, the nature of the incident and its attack surface cannot be defined accurately." }, effects: { score: -10, speed: 0, evidence: -4, coordination: -12, risk: -8 }, badge: { tr: "Tech Gap", en: "Tech Gap" }, next: "evidence" }
        ]
      },
      evidence: {
        alert: { tr: "Cihaz logları ve ağ izleri etkiyi açıklığa kavuşturabilir.", en: "Device logs and network traces can clarify impact." },
        title: { tr: "Aşama 3 — Çok Kaynaklı Teknik Analiz", en: "Stage 3 — Multi-Source Technical Analysis" },
        text: { tr: "Olayın cihaz, ağ veya kullanıcı akışı kaynaklı olup olmadığını ayırt etmek için çok kaynaklı analitik yaklaşım gerekir.", en: "A multi-source analytical approach is required to distinguish whether the issue is device-, network-, or user-flow-driven." },
        choices: [
          { text: { tr: "Cihaz logları, ağ izleri ve son kullanıcı işlemlerini birlikte değerlendir.", en: "Assess device logs, network traces, and end-user actions together." }, tone: "positive", bonus: { tr: "🔬 Multi-source analysis", en: "🔬 Multi-source analysis" }, feedback: { tr: "Mükemmel. Sistem düzeyinde düşünülerek olayın kaynağı ve etkisi daha net görünür hale geldi.", en: "Excellent. Thinking at the systems level made the source and impact of the incident much clearer." }, effects: { score: 24, speed: 4, evidence: 20, coordination: 4, risk: 10 }, badge: { tr: "Systems Thinker", en: "Systems Thinker" }, next: "decision" },
          { text: { tr: "Sadece ağ trafiğine bak; diğer veriler gereksiz.", en: "Only review network traffic; other data is unnecessary." }, tone: "negative", bonus: { tr: "😢 Dar analiz", en: "😢 Narrow analysis" }, feedback: { tr: "Tek kaynaklı analiz, yanlış sınıflandırma ve eksik cevap üretme riskini artırır.", en: "Single-source analysis increases the risk of misclassification and inadequate response." }, effects: { score: -12, speed: 2, evidence: -12, coordination: 0, risk: -8 }, badge: { tr: "Narrow Lens", en: "Narrow Lens" }, next: "decision" },
          { text: { tr: "Bir kullanıcıyı sorumlu varsay ve analizi buna göre yönlendir.", en: "Assume a user is responsible and direct the analysis around that assumption." }, tone: "negative", bonus: { tr: "😢 Varsayım yanlılığı", en: "😢 Assumption bias" }, feedback: { tr: "Varsayım temelli yaklaşım, nesnel teknik incelemeyi zayıflatır.", en: "An assumption-driven approach weakens objective technical analysis." }, effects: { score: -14, speed: 0, evidence: -14, coordination: -6, risk: -8 }, badge: { tr: "Assumption Bias", en: "Assumption Bias" }, next: "decision" }
        ]
      },
      decision: {
        alert: { tr: "Toparlanma ve dayanıklılık planı bekleniyor.", en: "A recovery and resilience plan is expected." },
        title: { tr: "Aşama 4 — Dayanıklılık ve Süreç Güçlendirme", en: "Stage 4 — Resilience and Process Strengthening" },
        text: { tr: "İlk müdahale sonrasında, tekrar riskini azaltacak sürdürülebilir dayanıklılık adımları seçilmelidir.", en: "After the initial intervention, sustainable resilience steps that reduce recurrence risk must be selected." },
        choices: [
          { text: { tr: "Ağ segmentasyonu, izleme, bakım SOP’si ve ekip eğitimi içeren dayanıklılık planı kur.", en: "Build a resilience plan including network segmentation, monitoring, maintenance SOPs, and team training." }, tone: "positive", bonus: { tr: "🏆 Resilience bonusu", en: "🏆 Resilience bonus" }, feedback: { tr: "Harika kapanış. Olay yalnızca kapatılmadı; kurumsal dayanıklılığa dönüştürüldü.", en: "Excellent closure. The incident was not merely closed; it was transformed into institutional resilience." }, effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: { tr: "Resilience Builder", en: "Resilience Builder" }, next: "end" },
          { text: { tr: "Sadece cihazı değiştir; süreçlere dokunma.", en: "Replace the device only; do not change the process." }, tone: "negative", bonus: { tr: "😢 Semptom çözümü", en: "😢 Symptom-only fix" }, feedback: { tr: "Donanım değişimi, süreç zafiyetini ve görünmeyen yönetişim açığını çözmez.", en: "Replacing hardware does not solve process weaknesses or invisible governance gaps." }, effects: { score: -10, speed: 4, evidence: 0, coordination: -6, risk: -10 }, badge: { tr: "Replace Only", en: "Replace Only" }, next: "end" },
          { text: { tr: "Aynı düzenle devam et.", en: "Continue as before." }, tone: "negative", bonus: { tr: "😢 Dayanıklılık kaybı", en: "😢 Loss of resilience" }, feedback: { tr: "Öğrenmeyen sistemler aynı olayları tekrar üretir.", en: "Systems that do not learn tend to reproduce the same incidents." }, effects: { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, badge: { tr: "Repeat Risk", en: "Repeat Risk" }, next: "end" }
        ]
      }
    }
  },
  {
    id: "insider-sharing",
    accent: "teal",
    name: { tr: "İç Kaynaklı SOP Dışı Paylaşım", en: "Internal SOP-External Sharing" },
    summary: { tr: "İyi niyetli görünen ancak SOP dışı doküman veya materyal paylaşımıyla ilişkili insan faktörü senaryosu.", en: "A human-factor scenario involving apparently well-intentioned but out-of-SOP document or material sharing." },
    nodes: {
      start: {
        alert: { tr: "SOP sınırları dışında iç paylaşım örüntüsü işaretlendi.", en: "An internal sharing pattern outside SOP boundaries has been flagged." },
        title: { tr: "Aşama 1 — Paylaşımın Durdurulması ve İlk Kayıt", en: "Stage 1 — Stop the Sharing and Create the Initial Record" },
        text: { tr: "Bir personelin iyi niyetle fakat SOP dışında araştırma dokümanı veya materyali paylaşmış olabileceği düşünülüyor. İlk adım, olayı kişiselleştirmeden kontrol altına almaktır.", en: "A staff member may have shared research documents or material outside SOP, apparently with good intent. The first step is to bring the situation under control without personalizing it." },
        choices: [
          { text: { tr: "Paylaşımı durdur, erişimi geçici sınırla ve yapılandırılmış olay kaydı oluştur.", en: "Stop the sharing, temporarily restrict access, and create a structured incident record." }, tone: "positive", bonus: { tr: "📝 Governance bonusu", en: "📝 Governance bonus" }, feedback: { tr: "Doğru yaklaşım. Olay, suçlayıcı değil sistematik response mantığıyla ele alınmaya başlandı.", en: "Correct approach. The event is being handled through systematic response logic rather than a blame-driven frame." }, effects: { score: 24, speed: 10, evidence: 14, coordination: 8, risk: 16 }, badge: { tr: "Governance Anchor", en: "Governance Anchor" }, next: "comms" },
          { text: { tr: "İlgili kişiyi herkesin önünde sorgula.", en: "Question the person publicly in front of everyone." }, tone: "negative", bonus: { tr: "😢 Güven kaybı", en: "😢 Trust loss" }, feedback: { tr: "Bu yaklaşım psikolojik güvenliği zedeler, savunmacı kültürü güçlendirir ve nesnel analizi bozar.", en: "This approach damages psychological safety, strengthens defensive culture, and distorts objective analysis." }, effects: { score: -16, speed: 0, evidence: -6, coordination: -16, risk: -8 }, badge: { tr: "Public Blame", en: "Public Blame" }, next: "comms" },
          { text: { tr: "Niyet iyi olduğu için olayı görmezden gel.", en: "Ignore the issue because the intention was good." }, tone: "negative", bonus: { tr: "😢 Politika aşınması", en: "😢 Policy erosion" }, feedback: { tr: "İyi niyet, kontrolsüz paylaşım riskini ortadan kaldırmaz; SOP’lerin anlamı zayıflar.", en: "Good intent does not eliminate the risk of uncontrolled sharing; it weakens the meaning of SOPs." }, effects: { score: -20, speed: -10, evidence: -6, coordination: -6, risk: -18 }, badge: { tr: "Intent Bias", en: "Intent Bias" }, next: "comms" }
        ]
      },
      comms: {
        alert: { tr: "Denge gözeten bir yanıt gerekli: suçlama sarmalı olmadan hesap verebilirlik.", en: "A balanced response is required: accountability without a blame spiral." },
        title: { tr: "Aşama 2 — Adil ve Sistem Odaklı Kurumsal Yaklaşım", en: "Stage 2 — Fair and System-Focused Institutional Response" },
        text: { tr: "Kurum, hem adil hem etkili bir yanıt vermelidir. İnsan faktörü, süreç ve güvenlik boyutu birlikte ele alınmalıdır.", en: "The institution must respond in a way that is both fair and effective. Human factors, process, and security must be addressed together." },
        choices: [
          { text: { tr: "Yönetici, güvenlik ve süreç sahipleriyle yapılandırılmış değerlendirme toplantısı yap.", en: "Hold a structured review meeting with management, security, and process owners." }, tone: "positive", bonus: { tr: "⚖️ Balanced response", en: "⚖️ Balanced response" }, feedback: { tr: "Güçlü yaklaşım. Olay, kişisel suçlama yerine sistem odaklı analiz çerçevesine taşındı.", en: "Strong approach. The event was reframed from personal blame to system-focused analysis." }, effects: { score: 22, speed: 8, evidence: 4, coordination: 18, risk: 10 }, badge: { tr: "Fair Coordinator", en: "Fair Coordinator" }, next: "evidence" },
          { text: { tr: "Süreci tamamen insan kaynaklarına bırak.", en: "Leave the process entirely to HR." }, tone: "negative", bonus: { tr: "😢 Tek boyutlu yaklaşım", en: "😢 One-dimensional response" }, feedback: { tr: "Bu olay yalnızca personel meselesi değildir; veri, süreç ve güvenlik boyutu birlikte değerlendirilmelidir.", en: "This is not merely a personnel issue; data, process, and security dimensions must be considered together." }, effects: { score: -10, speed: 0, evidence: -2, coordination: -12, risk: -8 }, badge: { tr: "HR Only", en: "HR Only" }, next: "evidence" },
          { text: { tr: "Sadece teknik tarafa odaklan; insan faktörünü dışarıda bırak.", en: "Focus only on the technical side; exclude the human factor." }, tone: "negative", bonus: { tr: "😢 İnsan faktörü körlüğü", en: "😢 Human-factor blindness" }, feedback: { tr: "İnsan davranışı incident response’un merkezi bileşenlerinden biridir; dışarıda bırakılamaz.", en: "Human behavior is a central component of incident response and cannot be excluded." }, effects: { score: -10, speed: 0, evidence: 0, coordination: -10, risk: -8 }, badge: { tr: "Human Blind Spot", en: "Human Blind Spot" }, next: "evidence" }
        ]
      },
      evidence: {
        alert: { tr: "Yargıya varmadan önce bağlam rekonstrüksiyonu gerekiyor.", en: "Context reconstruction is needed before judgment." },
        title: { tr: "Aşama 3 — Bağlam ve Etki Analizi", en: "Stage 3 — Context and Impact Analysis" },
        text: { tr: "Ne paylaşıldığı, kimle paylaşıldığı, hangi kanalın kullanıldığı ve SOP’den hangi noktalarda sapıldığı netleştirilmelidir.", en: "What was shared, with whom, through which channel, and how it diverged from SOP must be clarified." },
        choices: [
          { text: { tr: "İçerik, alıcı, kanal, zaman ve SOP farkını sistematik biçimde analiz et.", en: "Analyze the content, recipient, channel, timing, and SOP deviation systematically." }, tone: "positive", bonus: { tr: "🧠 Context bonusu", en: "🧠 Context bonus" }, feedback: { tr: "Çok iyi. Adil ve etkili karar için gereken bağlamsal görünürlük sağlandı.", en: "Excellent. The contextual visibility required for a fair and effective decision was established." }, effects: { score: 24, speed: 4, evidence: 20, coordination: 4, risk: 10 }, badge: { tr: "Context Analyst", en: "Context Analyst" }, next: "decision" },
          { text: { tr: "Niyet belli; detaylı analize gerek yok.", en: "The intent is obvious; detailed analysis is unnecessary." }, tone: "negative", bonus: { tr: "😢 Eksik bağlam", en: "😢 Incomplete context" }, feedback: { tr: "Bağlamı dışarıda bırakmak, yanlış sınıflandırma ve yetersiz düzeltici aksiyon riskini yükseltir.", en: "Excluding context raises the risk of misclassification and inadequate corrective action." }, effects: { score: -12, speed: 2, evidence: -12, coordination: 0, risk: -8 }, badge: { tr: "Thin Context", en: "Thin Context" }, next: "decision" },
          { text: { tr: "Benzer şeyler olur diyerek yüzeysel notla geç.", en: "Treat it as routine and move on with a superficial note." }, tone: "negative", bonus: { tr: "😢 Normalleştirme hatası", en: "😢 Normalization error" }, feedback: { tr: "Normalleştirme, güvenlik kültürünü aşındırır ve SOP disiplinini zayıflatır.", en: "Normalization erodes security culture and weakens SOP discipline." }, effects: { score: -14, speed: 0, evidence: -10, coordination: -4, risk: -10 }, badge: { tr: "Normalization Drift", en: "Normalization Drift" }, next: "decision" }
        ]
      },
      decision: {
        alert: { tr: "Kurum düzeltici ve kültürel yanıt bekliyor.", en: "The institution expects both corrective and cultural response." },
        title: { tr: "Aşama 4 — Düzeltici ve Kültürel Dönüşüm", en: "Stage 4 — Corrective and Cultural Transformation" },
        text: { tr: "Yanıtın amacı yalnızca olayı kapatmak değil; kurumsal kültürü ve kontrol mekanizmalarını güçlendirmektir.", en: "The goal is not only to close the incident, but to strengthen institutional culture and control mechanisms." },
        choices: [
          { text: { tr: "SOP netleştirme, eğitim, erişim sınırları ve öğrenme odaklı debrief uygula.", en: "Implement SOP clarification, training, access limits, and a learning-focused debrief." }, tone: "positive", bonus: { tr: "🌟 Culture + control bonusu", en: "🌟 Culture + control bonus" }, feedback: { tr: "Mükemmel. Olay, cezalandırıcı değil öğrenen ve güçlenen bir sisteme dönüştürüldü.", en: "Excellent. The incident was transformed into a system that learns and strengthens rather than merely punishes." }, effects: { score: 28, speed: 8, evidence: 4, coordination: 16, risk: 20 }, badge: { tr: "Culture Builder", en: "Culture Builder" }, next: "end" },
          { text: { tr: "Sadece ilgili kişiye uyarı ver ve süreci kapat.", en: "Warn the individual only and close the process." }, tone: "negative", bonus: { tr: "😢 Sistem öğrenmiyor", en: "😢 System does not learn" }, feedback: { tr: "Kişisel uyarı tek başına sistemik zafiyetleri çözmez.", en: "A personal warning alone does not resolve systemic weaknesses." }, effects: { score: -10, speed: 2, evidence: 0, coordination: -8, risk: -10 }, badge: { tr: "Personalized Fix", en: "Personalized Fix" }, next: "end" },
          { text: { tr: "Hiç aksiyon alma.", en: "Take no action." }, tone: "negative", bonus: { tr: "😢 Kültürel erozyon", en: "😢 Cultural erosion" }, feedback: { tr: "Aksiyon alınmaması, SOP’lerin ve güvenlik kültürünün aşınmasına yol açar.", en: "Failure to act erodes SOPs and the broader security culture." }, effects: { score: -18, speed: 0, evidence: 0, coordination: -8, risk: -18 }, badge: { tr: "Policy Erosion", en: "Policy Erosion" }, next: "end" }
        ]
      }
    }
  }
];

const staticText = {
  tr: {
    eyebrow: 'Türkiye Biosecurity Workshop 2026 • Gamified Simulation',
    title: 'Incident Response: What Would You Do?',
    subtitle: 'Biyogüvenlik ve siber güvenlik ekseninde, kurumsal karar kalitesini, eskalasyon doğruluğunu ve delil bütünlüğünü görünür kılmak için tasarlanmış çok senaryolu, puanlamalı profesyonel workshop demosu.',
    threatLevel: 'Threat Level',
    mode: 'Mode',
    scenarios: 'Scenarios',
    presenter: 'Presenter',
    dynamic: 'Dynamic',
    interactivePresentation: 'Interactive Presentation',
    branchingCases: '5 Branching Cases',
    presenterName: 'Prof. Dr. Ahmet Altun',
    openingSlide: 'Opening Slide',
    closingSlide: 'Closing Slide',
    scenarioSelection: 'Scenario Selection',
    chooseScenario: 'Bir senaryo seçin',
    chooseScenarioDesc: 'Her senaryo, araştırma güvenliği ve incident response pratiğinin farklı bir yönünü temsil eder. Katılımcılar seçtikleri senaryoda adım adım karar verir; doğru seçimler bonus puan, rozet ve pozitif geri bildirimlerle ödüllendirilir.',
    howToPlay: 'How to Play',
    gameLogic: 'Oyun mantığı',
    axes: 'Değerlendirme eksenleri',
    expectedApproach: 'Beklenen yaklaşım',
    complete: 'Simulation Complete',
    completed: 'Senaryo Tamamlandı',
    shortDebrief: 'Kısa Debrief',
    situationTitle: 'Durum Güncellemesi',
    findingTitle: 'Yeni Bulgular',
    pressureTitle: 'Anlık Baskılar',
    score: 'Toplam Skor',
    stage: 'Aşama',
    speed: 'Hız',
    evidence: 'Kanıt Koruma',
    coordination: 'Koordinasyon',
    risk: 'Risk Kontrolü',
    progress: 'Response Progress',
    whatWouldYouDo: 'Ne yaparsınız?',
    keyboardHint: '⌨️ 1-2-3 ile seçim yapabilir, Enter ile ilerleyebilirsiniz.',
    bonusActive: '🏅 Bonus fırsatı aktif',
    positive: 'Pozitif Kazanım',
    negative: 'Riskli Sonuç',
    timeout: 'Süre Doldu',
    continue: 'Devam Et',
    start: 'Senaryoyu Başlat',
    back: 'Geri Dön',
    backToSelection: 'Senaryo Seçimine Dön',
    fullscreen: '⛶ Sunum Modu',
    fullscreenExit: '🡼 Sunum Modundan Çık',
    presentation: '🎤 Projeksiyon Görünümü',
    presentationOff: '🧾 Normal Görünüm',
    soundOn: '🔊 Ses Açık',
    soundOff: '🔇 Ses Kapalı',
    lang: '🌐 EN',
    themeDark: '🌙 Dark',
    themeLight: '☀️ Light',
    timer: 'sn',
    scenarioMeta: '4 aşamalı • puanlamalı • rozetli',
    onboardingSummary: 'Her senaryo 4 aşamalıdır.|Her aşamada 1 karar verirsiniz.|Doğru seçimler puan ve rozet kazandırır.|Yanlış seçimler risk puanı ve kaliteyi düşürür.',
    onboardingAxes: 'Hız|Kanıt bütünlüğü|Kurumsal koordinasyon|Risk kontrolü',
    onboardingExpected: 'Containment + delil koruma dengesi|Doğru eskalasyon|SOP ve governance uyumu|Olaydan öğrenme ve debrief',
    debrief: [
      'Containment ile delil bütünlüğü arasında denge kurmak temel başarı ölçütüdür.',
      'Doğru eskalasyon, teknik doğruluk kadar kurumsal güven üretir.',
      'SOP, governance ve audit trail eksikliği iyi teknik kararları bile zayıflatabilir.',
      'Her incident response süreci, debrief ile kurumsal öğrenmeye çevrilmelidir.'
    ],
    tags: ['Containment', 'Evidence Integrity', 'Institutional Coordination'],
    noBadge: '😢 Bu turda rozet kazanılamadı',
    finalHigh: 'Çok güçlü bir performans. Hız, delil bütünlüğü, koordinasyon ve risk kontrolü dengeli ve profesyonel biçimde yönetildi.',
    finalMid: 'Genel olarak güçlü bir performans. Bazı karar noktalarında yönetişim ve olay sınıflandırması daha da rafine edilebilir.',
    finalLow: 'Bu senaryoda kritik zafiyetler oluştu. Gecikme, eksik koordinasyon veya delil kaybı olay etkisini büyütmüş olabilir.',
    elite: 'Elite Response Lead 🏆',
    mid: 'Operational Coordinator 🧠',
    low: 'High-Risk Path 😢'
  },
  en: {
    eyebrow: 'Türkiye Biosecurity Workshop 2026 • Gamified Simulation',
    title: 'Incident Response: What Would You Do?',
    subtitle: 'A multi-scenario, scored professional workshop demo designed to make institutional decision quality, escalation accuracy, and evidence integrity visible at the intersection of biosecurity and cybersecurity.',
    threatLevel: 'Threat Level',
    mode: 'Mode',
    scenarios: 'Scenarios',
    presenter: 'Presenter',
    dynamic: 'Dynamic',
    interactivePresentation: 'Interactive Presentation',
    branchingCases: '5 Branching Cases',
    presenterName: 'Prof. Dr. Ahmet Altun',
    openingSlide: 'Opening Slide',
    closingSlide: 'Closing Slide',
    scenarioSelection: 'Scenario Selection',
    chooseScenario: 'Choose a scenario',
    chooseScenarioDesc: 'Each scenario represents a different dimension of research security and incident response practice. Participants move step by step through decisions; correct choices are rewarded with bonus points, badges, and positive feedback.',
    howToPlay: 'How to Play',
    gameLogic: 'Game Logic',
    axes: 'Evaluation Axes',
    expectedApproach: 'Expected Approach',
    complete: 'Simulation Complete',
    completed: 'Scenario Complete',
    shortDebrief: 'Short Debrief',
    situationTitle: 'Situation Update',
    findingTitle: 'New Findings',
    pressureTitle: 'Active Pressures',
    score: 'Total Score',
    stage: 'Stage',
    speed: 'Speed',
    evidence: 'Evidence Integrity',
    coordination: 'Coordination',
    risk: 'Risk Control',
    progress: 'Response Progress',
    whatWouldYouDo: 'What would you do?',
    keyboardHint: '⌨️ Use 1-2-3 to select options and Enter to continue.',
    bonusActive: '🏅 Bonus opportunity active',
    positive: 'Positive Gain',
    negative: 'Risk Outcome',
    timeout: 'Time Expired',
    continue: 'Continue',
    start: 'Start Scenario',
    back: 'Back',
    backToSelection: 'Return to Scenarios',
    fullscreen: '⛶ Fullscreen',
    fullscreenExit: '🡼 Exit Fullscreen',
    presentation: '🎤 Projection View',
    presentationOff: '🧾 Normal View',
    soundOn: '🔊 Sound On',
    soundOff: '🔇 Sound Off',
    lang: '🌐 TR',
    themeDark: '🌙 Dark',
    themeLight: '☀️ Light',
    timer: 'sec',
    scenarioMeta: '4 stages • scored • badge-based',
    onboardingSummary: 'Each scenario has 4 stages.|You make 1 decision at each stage.|Correct choices earn points and badges.|Poor choices reduce risk performance and quality.',
    onboardingAxes: 'Speed|Evidence integrity|Institutional coordination|Risk control',
    onboardingExpected: 'Balance containment and evidence preservation|Correct escalation|SOP and governance alignment|Learning and debrief',
    debrief: [
      'Balancing containment and evidence integrity is a core success metric.',
      'Correct escalation builds institutional trust as much as technical accuracy.',
      'Weak SOP, governance, and audit trail design can undermine otherwise good technical decisions.',
      'Every incident response process should be converted into institutional learning through debrief.'
    ],
    tags: ['Containment', 'Evidence Integrity', 'Institutional Coordination'],
    noBadge: '😢 No badges were earned in this round',
    finalHigh: 'A very strong performance. Speed, evidence integrity, coordination, and risk control were managed in a balanced and professional way.',
    finalMid: 'Overall a strong performance. Governance and incident classification could be refined further at some decision points.',
    finalLow: 'Critical weaknesses emerged in this scenario. Delay, poor coordination, or evidence loss may have amplified the impact.',
    elite: 'Elite Response Lead 🏆',
    mid: 'Operational Coordinator 🧠',
    low: 'High-Risk Path 😢'
  }
};

const initialState = () => ({
  scenario: null,
  current: null,
  stage: 1,
  score: 0,
  speed: 50,
  evidence: 50,
  coordination: 50,
  risk: 50,
  trophies: [],
  history: []
});

let state = initialState();
let pendingNext = null;
let timer = null;
let timeLeft = 30;
let soundEnabled = true;
let currentLanguage = 'tr';
let currentTheme = 'dark';

const $ = (id) => document.getElementById(id);
const scenarioScreen = $('scenario-screen');
const onboardingScreen = $('onboarding-screen');
const gameScreen = $('game-screen');
const endScreen = $('end-screen');
const scenarioList = $('scenario-list');
const restartBtn = $('restart-btn');
const nextBtn = $('next-btn');
const fullscreenBtn = $('fullscreen-btn');
const presentationBtn = $('presentation-btn');
const languageBtn = $('language-btn');
const soundBtn = $('sound-btn');
const themeBtn = $('theme-btn');
const onboardingStartBtn = $('onboarding-start-btn');
const onboardingBackBtn = $('onboarding-back-btn');
const onboardingScenarioTitle = $('onboarding-scenario-title');
const onboardingScenarioSummary = $('onboarding-scenario-summary');
const nodeTitle = $('node-title');
const nodeText = $('node-text');
const choicesEl = $('choices');
const feedbackPanel = $('feedback-panel');
const feedbackText = $('feedback-text');
const feedbackEmoji = $('feedback-emoji');
const feedbackHeading = $('feedback-heading');
const rewardStrip = $('reward-strip');
const scoreEl = $('score');
const stageEl = $('stage');
const speedEl = $('speed');
const evidenceEl = $('evidence');
const coordinationEl = $('coordination');
const riskEl = $('risk');
const progressFill = $('progress-fill');
const progressText = $('progress-text');
const alertText = $('alert-text');
const streakBadge = $('streak-badge');
const scenarioName = $('scenario-name');
const timerBadge = $('timer-badge');
const finalSummary = $('final-summary');
const finalScores = $('final-scores');
const finalBadge = $('final-badge');
const trophyCase = $('trophy-case');
const debriefList = $('debrief-list');
const situationText = $('situation-text');
const findingList = $('finding-list');
const pressureList = $('pressure-list');

function t() { return staticText[currentLanguage]; }
function clamp(value) { return Math.max(0, Math.min(100, value)); }
function tr(value) { return value?.[currentLanguage] ?? value?.tr ?? value; }

function beep(type = 'positive') {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = type === 'positive' ? 880 : 220;
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

function showScreen(screen) {
  [scenarioScreen, onboardingScreen, gameScreen, endScreen].forEach((el) => el.classList.remove('active'));
  screen.classList.add('active');
}

function updateTheme() {
  document.body.classList.toggle('light-theme', currentTheme === 'light');
  themeBtn.textContent = currentTheme === 'dark' ? t().themeLight : t().themeDark;
}

function updateTimerBadge() {
  timerBadge.textContent = `⏱ ${timeLeft} ${t().timer}`;
  timerBadge.classList.toggle('warning', timeLeft <= 10);
}

function renderScenarioList() {
  scenarioList.innerHTML = '';
  scenarioCatalog.forEach((scenario, index) => {
    const card = document.createElement('button');
    card.className = `scenario-card accent-${scenario.accent}`;
    card.innerHTML = `
      <div class="scenario-card-top">
        <span class="scenario-pill">Scenario 0${index + 1}</span>
        <span class="scenario-arrow">→</span>
      </div>
      <h3>${tr(scenario.name)}</h3>
      <p>${tr(scenario.summary)}</p>
      <div class="scenario-meta">${t().scenarioMeta}</div>
    `;
    card.addEventListener('click', () => openOnboarding(scenario.id));
    scenarioList.appendChild(card);
  });
}

function openOnboarding(id) {
  const scenario = scenarioCatalog.find((s) => s.id === id);
  state = initialState();
  state.scenario = scenario;
  onboardingScenarioTitle.textContent = tr(scenario.name);
  onboardingScenarioSummary.textContent = tr(scenario.summary);
  showScreen(onboardingScreen);
}

function startScenario() {
  state.current = 'start';
  scenarioName.textContent = tr(state.scenario.name);
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
  streakBadge.textContent = state.trophies.length ? `🏅 ${tr(state.trophies[state.trophies.length - 1])}` : t().bonusActive;
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
      const node = state.scenario.nodes[state.current];
      const firstNegative = node.choices.find((c) => c.tone === 'negative') || node.choices[0];
      handleChoice(firstNegative, true);
    }
  }, 1000);
}

function buildNarrative(nodeKey) {
  const scenarioName = tr(state.scenario.name);
  const stageLabels = {
    tr: {
      start: {
        situation: `${scenarioName} senaryosu başladı. İlk işaretler artık somut bir olaya dönüştü ve ekip sizden ilk yanıtı yapılandırmanızı bekliyor.`,
        findings: [
          'Anormal erişim/zamanlama bilgisi doğrulandı.',
          'Olayın yalnızca teknik değil, yönetsel etkileri de olabilir.',
          'İlk 10-15 dakika karar kalitesini belirleyecek.'
        ],
        pressures: [
          'Hızlı containment baskısı',
          'Delil kaybı riski',
          'Yanlış erken karar verme riski'
        ]
      },
      comms: {
        situation: state.history.length
          ? `İlk kararınızdan sonra olay görünürlüğü arttı. ${state.history[state.history.length - 1].tone === 'positive' ? 'Başlangıç kontrolü kısmen sağlandı; şimdi kurumsal koordinasyon testi başlıyor.' : 'İlk yanıt zayıf kaldığı için iletişim yükü ve belirsizlik arttı; şimdi koordinasyon kritik.'}`
          : 'İlk müdahalenin ardından kurum içi iletişim ve eskalasyon kararı gerekiyor.',
        findings: [
          'Yönetim kısa durum özeti talep ediyor.',
          'IT/security tarafı rol dağılımı bekliyor.',
          'Yanlış kişi/kanal seçimi olay yönetimini bozabilir.'
        ],
        pressures: [
          'Bilgi kirliliğini önleme baskısı',
          'Doğru eskalasyon zinciri kurma ihtiyacı',
          'Kurumsal güven kaybı riski'
        ]
      },
      evidence: {
        situation: state.history.length
          ? `Olay artık daha görünür. ${state.history[state.history.length - 1].tone === 'positive' ? 'Ekip sizden delil bütünlüğünü bozmadan derin analiz yapmanızı bekliyor.' : 'Önceki kararlar nedeniyle delil penceresi daraldı; şimdi daha dikkatli hareket etmek zorundasınız.'}`
          : 'Delil toplama ve kapsam analizi aşaması başladı.',
        findings: [
          'Erişim kayıtları daha derin inceleme gerektiriyor.',
          'Kapsam tahmini için zaman çizelgesi kritik.',
          'Bu aşamadaki hata kök neden analizini zayıflatır.'
        ],
        pressures: [
          'Chain-of-custody baskısı',
          'Kök neden analizi ihtiyacı',
          'Hizmet sürekliliği ile analiz dengesi'
        ]
      },
      decision: {
        situation: state.history.length
          ? `İlk response döngüsü tamamlanmak üzere. ${state.history.filter((x) => x.tone === 'positive').length >= 2 ? 'Şimdi bunu kurumsal öğrenmeye çevirmek için güçlü bir fırsat var.' : 'Önceki eksiklikleri telafi etmek için stratejik kapanış çok önemli.'}`
          : 'Stratejik kapanış ve iyileştirme aşamasına geçildi.',
        findings: [
          'Yönetim düzeltici aksiyon çerçevesi bekliyor.',
          'Olay sınıflandırması ve debrief gündemde.',
          'Tekrarlama riskini azaltacak kararlar ön planda.'
        ],
        pressures: [
          'Reputasyon ve güven baskısı',
          'Sürdürülebilir önlem beklentisi',
          'Kurumsal öğrenmeyi gösterme ihtiyacı'
        ]
      }
    },
    en: {
      start: {
        situation: `The ${scenarioName} scenario has started. Early signals have now become a concrete incident, and the team expects you to structure the first response.`,
        findings: [
          'Abnormal access/timing has been confirmed.',
          'The event may have managerial as well as technical impact.',
          'The first 10–15 minutes will shape response quality.'
        ],
        pressures: [
          'Pressure for rapid containment',
          'Risk of evidence loss',
          'Risk of premature bad decisions'
        ]
      },
      comms: {
        situation: state.history.length
          ? `After your first decision, incident visibility increased. ${state.history[state.history.length - 1].tone === 'positive' ? 'Initial control is partly in place; now the institutional coordination test begins.' : 'Because the initial response was weak, communication load and ambiguity increased; coordination is now critical.'}`
          : 'Following the first intervention, an institutional communication and escalation decision is required.',
        findings: [
          'Leadership is requesting a short situation brief.',
          'IT/security expects role clarity.',
          'Choosing the wrong audience or channel may disrupt incident management.'
        ],
        pressures: [
          'Pressure to prevent information noise',
          'Need to activate the right escalation chain',
          'Risk of institutional trust loss'
        ]
      },
      evidence: {
        situation: state.history.length
          ? `The incident is now more visible. ${state.history[state.history.length - 1].tone === 'positive' ? 'The team expects deeper analysis without damaging evidence integrity.' : 'Earlier choices narrowed the evidence window; you now need to act more carefully.'}`
          : 'Evidence collection and scope analysis have begun.',
        findings: [
          'Access records require deeper review.',
          'Timeline reconstruction is critical for scope estimation.',
          'Mistakes here weaken root-cause analysis.'
        ],
        pressures: [
          'Chain-of-custody pressure',
          'Need for root-cause analysis',
          'Balancing service continuity and analysis'
        ]
      },
      decision: {
        situation: state.history.length
          ? `The first response cycle is nearing completion. ${state.history.filter((x) => x.tone === 'positive').length >= 2 ? 'There is now a strong opportunity to turn this into institutional learning.' : 'A strategic closure is essential to compensate for earlier weaknesses.'}`
          : 'The strategic closure and improvement phase has begun.',
        findings: [
          'Leadership expects a corrective action framework.',
          'Incident classification and debrief are now on the table.',
          'Decisions that reduce recurrence risk are central.'
        ],
        pressures: [
          'Reputation and trust pressure',
          'Expectation for sustainable controls',
          'Need to demonstrate institutional learning'
        ]
      }
    }
  };
  return stageLabels[currentLanguage][nodeKey];
}

function renderNode() {
  const node = state.scenario.nodes[state.current];
  const narrative = buildNarrative(state.current);
  nodeTitle.textContent = tr(node.title);
  nodeText.textContent = tr(node.text);
  alertText.textContent = `Live alert feed: ${tr(node.alert)}`;
  situationText.textContent = narrative.situation;
  findingList.innerHTML = narrative.findings.map((item) => `<li>${item}</li>`).join('');
  pressureList.innerHTML = narrative.pressures.map((item) => `<li>${item}</li>`).join('');
  choicesEl.innerHTML = '';
  feedbackPanel.classList.add('hidden');
  pendingNext = null;
  node.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = `choice-btn ${choice.tone}`;
    btn.innerHTML = `<span class="choice-index">0${index + 1}</span><span class="choice-copy">${tr(choice.text)}</span>`;
    btn.addEventListener('click', () => handleChoice(choice));
    choicesEl.appendChild(btn);
  });
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

  if (choice.tone === 'positive') {
    state.trophies.push(choice.badge);
    feedbackEmoji.textContent = '🏅✨😎';
    feedbackHeading.textContent = t().positive;
    rewardStrip.className = 'reward-strip positive';
    rewardStrip.innerHTML = `<span>+ Bonus</span><strong>${tr(choice.bonus)}</strong><span class="reward-badge">${tr(choice.badge)}</span>`;
    beep('positive');
  } else {
    feedbackEmoji.textContent = autoSelected ? '⏰😢💧' : '😢🙃💧';
    feedbackHeading.textContent = autoSelected ? t().timeout : t().negative;
    rewardStrip.className = 'reward-strip negative';
    rewardStrip.innerHTML = `<span>− Kayıp</span><strong>${autoSelected ? (currentLanguage === 'tr' ? '⏱ Süre aşımı nedeniyle otomatik seçim' : '⏱ Auto-selected after timeout') : tr(choice.bonus)}</strong><span class="reward-badge">${tr(choice.badge)}</span>`;
    beep('negative');
  }

  feedbackText.textContent = tr(choice.feedback);
  feedbackPanel.classList.remove('hidden');
  state.history.push({ node: state.current, tone: choice.tone, badge: choice.badge });
  pendingNext = choice.next;
  [...choicesEl.querySelectorAll('button')].forEach((btn) => (btn.disabled = true));
  renderStats();
}

function finishGame() {
  showScreen(endScreen);
  const avg = Math.round((state.speed + state.evidence + state.coordination + state.risk) / 4);
  let badge = t().low;
  let verdict = t().finalLow;
  if (avg >= 80 && state.score >= 80) {
    badge = t().elite;
    verdict = t().finalHigh;
  } else if (avg >= 60) {
    badge = t().mid;
    verdict = t().finalMid;
  }

  finalBadge.textContent = `${tr(state.scenario.name)} • ${badge}`;
  finalSummary.textContent = verdict;
  finalScores.innerHTML = `
    <div class="meter"><span>${t().score}</span><strong>${state.score}</strong></div>
    <div class="meter"><span>${t().speed}</span><strong>${state.speed}</strong></div>
    <div class="meter"><span>${t().evidence}</span><strong>${state.evidence}</strong></div>
    <div class="meter"><span>${t().coordination}</span><strong>${state.coordination}</strong></div>
    <div class="meter"><span>${t().risk}</span><strong>${state.risk}</strong></div>
  `;
  debriefList.innerHTML = t().debrief.map((item) => `<li>${item}</li>`).join('');
  trophyCase.innerHTML = '';
  if (state.trophies.length) {
    state.trophies.forEach((badge) => {
      const item = document.createElement('div');
      item.className = 'trophy-item';
      item.textContent = `🏅 ${tr(badge)}`;
      trophyCase.appendChild(item);
    });
  } else {
    const item = document.createElement('div');
    item.className = 'trophy-item muted';
    item.textContent = t().noBadge;
    trophyCase.appendChild(item);
  }
}

function applyStaticText() {
  $('eyebrow').textContent = t().eyebrow;
  $('hero-title').textContent = t().title;
  $('hero-subtitle').textContent = t().subtitle;
  $('threat-label').textContent = t().threatLevel;
  $('mode-label').textContent = t().mode;
  $('scenarios-label').textContent = t().scenarios;
  $('presenter-label').textContent = t().presenter;
  $('threat-value').textContent = t().dynamic;
  $('mode-value').textContent = t().interactivePresentation;
  $('scenarios-value').textContent = t().branchingCases;
  $('presenter-value').textContent = t().presenterName;
  $('opening-slide-label').textContent = t().openingSlide;
  $('scenario-kicker').textContent = t().scenarioSelection;
  $('choose-scenario-title').textContent = t().chooseScenario;
  $('choose-scenario-desc').textContent = t().chooseScenarioDesc;
  $('onboarding-kicker').textContent = t().howToPlay;
  $('onboarding-logic-title').textContent = t().gameLogic;
  $('onboarding-axes-title').textContent = t().axes;
  $('onboarding-expected-title').textContent = t().expectedApproach;
  $('complete-kicker').textContent = t().complete;
  $('completed-title').textContent = t().completed;
  $('debrief-title').textContent = t().shortDebrief;
  $('situation-title').textContent = t().situationTitle;
  $('finding-title').textContent = t().findingTitle;
  $('pressure-title').textContent = t().pressureTitle;
  $('score-label').textContent = t().score;
  $('stage-label').textContent = t().stage;
  $('speed-label').textContent = t().speed;
  $('evidence-label').textContent = t().evidence;
  $('coordination-label').textContent = t().coordination;
  $('risk-label').textContent = t().risk;
  $('progress-label').textContent = t().progress;
  $('choice-title').textContent = t().whatWouldYouDo;
  $('keyboard-hint').textContent = t().keyboardHint;
  $('feedback-tag-1').textContent = t().tags[0];
  $('feedback-tag-2').textContent = t().tags[1];
  $('feedback-tag-3').textContent = t().tags[2];
  $('closing-slide-label').textContent = t().closingSlide;

  $('onboarding-logic-list').innerHTML = t().onboardingSummary.split('|').map((x) => `<li>${x}</li>`).join('');
  $('onboarding-axes-list').innerHTML = t().onboardingAxes.split('|').map((x) => `<li>${x}</li>`).join('');
  $('onboarding-expected-list').innerHTML = t().onboardingExpected.split('|').map((x) => `<li>${x}</li>`).join('');

  nextBtn.textContent = t().continue;
  onboardingStartBtn.textContent = t().start;
  onboardingBackBtn.textContent = t().back;
  restartBtn.textContent = t().backToSelection;
  fullscreenBtn.textContent = document.fullscreenElement ? t().fullscreenExit : t().fullscreen;
  presentationBtn.textContent = document.body.classList.contains('presentation-mode') ? t().presentationOff : t().presentation;
  soundBtn.textContent = soundEnabled ? t().soundOn : t().soundOff;
  languageBtn.textContent = t().lang;
  updateTheme();
  updateTimerBadge();
  renderScenarioList();
  if (state.scenario) {
    onboardingScenarioTitle.textContent = tr(state.scenario.name);
    onboardingScenarioSummary.textContent = tr(state.scenario.summary);
    scenarioName.textContent = tr(state.scenario.name);
    if (gameScreen.classList.contains('active')) renderNode();
    if (endScreen.classList.contains('active')) finishGame();
  }
}

nextBtn.addEventListener('click', () => {
  if (!pendingNext) return;
  if (pendingNext === 'end') {
    finishGame();
    return;
  }
  state.current = pendingNext;
  state.stage += 1;
  renderNode();
});

restartBtn.addEventListener('click', () => {
  state = initialState();
  showScreen(scenarioScreen);
  applyStaticText();
});

onboardingStartBtn.addEventListener('click', startScenario);
onboardingBackBtn.addEventListener('click', () => {
  state = initialState();
  showScreen(scenarioScreen);
  applyStaticText();
});

fullscreenBtn.addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
    applyStaticText();
  } catch {}
});

document.addEventListener('fullscreenchange', applyStaticText);

presentationBtn.addEventListener('click', () => {
  document.body.classList.toggle('presentation-mode');
  applyStaticText();
});

languageBtn.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
  applyStaticText();
});

soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  applyStaticText();
});

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  updateTheme();
});

document.addEventListener('keydown', (e) => {
  if (gameScreen.classList.contains('active')) {
    const buttons = [...choicesEl.querySelectorAll('button:not(:disabled)')];
    if (['1', '2', '3'].includes(e.key)) {
      const idx = Number(e.key) - 1;
      if (buttons[idx]) buttons[idx].click();
    }
    if (e.key === 'Enter' && !feedbackPanel.classList.contains('hidden')) nextBtn.click();
  }
});

applyStaticText();
