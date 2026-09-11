# Suntalam Dolap Ustası 🪚📏

> Amatör imalatçılar, hobi marangozları ve kendin-yap (DIY) tutkunları için tarayıcı üzerinde çalışan, kurulum gerektirmeyen interaktif dolap tasarım, net kesim ve donanım hesaplayıcı.

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://knigdelioglu.github.io/dolap/)
[![HTML5 / JS](https://img.shields.io/badge/Frontend-HTML5%20%2F%20Vanilla%20JS-orange?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Genel Bakış

**Suntalam Dolap Ustası**, kendi evine veya atölyesine gardırop, yüklük, kiler veya çok amaçlı dolap yapmak isteyenlerin en çok zorlandığı matematiksel hesaplamaları sıfır hatayla gerçekleştiren açık kaynaklı bir web uygulamasıdır.

İstediğiniz dış ölçüleri, malzeme kalınlığını ve kapak mekanizmasını girmeniz yeterlidir. Sistem:
- Gövde, baza, arkalık, dikme, raf, çekmece ve kapak ebatlarını milimetrik hesaplar.
- Seçilen PVC kenar bandı kalınlığını (0.4 mm, 1 mm, 2 mm) kenar başına otomatik olarak testere ölçüsünden düşer.
- Ebatlama merkezine (Opticut, Kesimhane vb.) doğrudan teslim edilebilecek **Net Kesim Tablosu** üretir.
- Gerekli tüm vida, menteşe, ray, kulp ve hırdavat listesini çıkartır.
- Dolabın iç yerleşimini dinamik bir **2D SVG Şeması** üzerinde anlık olarak çizer.

---

## ✨ Öne Çıkan Özellikler

### 1. 🎛️ Hassas Malzeme & Gövde Geometrisi
- **Suntalam / MDF Kalınlığı:** 18 mm standart veya dilediğiniz özel kalınlık.
- **PVC Kenar Bandı Düşümü:** 0.4 mm, 1 mm veya 2 mm PVC bantlar için kenar bantlama sayısına göre testere kesim ebatlarını otomatik düzeltir.
- **Arkalık Düşümü:** Arkalık kanalına veya arkadan çakmaya uygun arkalık payı düşümü; gövde derinliğinin arkalık kalınlığı kadar otomatik revize edilmesi.
- **Baza (Süpürgelik) Kontrolü:** Yere sıfır veya istenen yükseklikte süpürgelik/baza payı.

### 2. 🚪 Çoklu Kapak & Mekanizma Desteği
- **Menteşeli Kapaklar:** Dıştan bini, tek veya çok kanatlı kapak hesaplaması; standart çevre ve ara fuga boşlukları.
- **Sürgülü Ray Sistemleri:** Çift raylı içten kayar kapaklar için üst/alt makara payları, bindirme mesafeleri ve iç raf derinliği emniyet boşlukları.
- **Açık Dolap / Giyinme Odası:** Kapaksız modül tasarımı.

### 3. 📐 Esnek İç Düzen & Modüler Alanlar
- **Bölme & Dikme Mimarisi:** 1, 2 veya 3 dikey ana bölme; sehim (esneme) önleyici orta dikme mantığı.
- **Üst Yüklük / Valiz Katı:** Boydan boya kesintisiz valiz ve yorgan bölmesi.
- **Dikey Süpürge / Ütü Masası Yuvası:** Dikey temizlik aletleri için özel ayrılmış rafız koridor.
- **Bölme Başına Özelleştirilebilir Raflar ve Askılıklar:** Her bölmeye bağımsız raf sayısı ve elbise askılık borusu tanımlayabilme.

### 4. 🗄️ Teleskopik Çekmece Modülü
- Dolap altına boydan boya veya bağımsız bölme altına çekmece yerleşimi.
- Teleskopik bilyalı raylar için standart **13 mm/yan (toplam 26 mm)** montaj payı düşümü.
- Kutu derinliği, kutu yüksekliği ve sığ aksesuar çekmecesi (saat, takı vb.) seçeneği.

### 5. 🪚 Net Ebatlama / Testere Kesim Listesi
- Kesimhaneye verilecek net parçaların adı, adedi, kesim boyu, kesim eni, kenar bantlama detayları ve konum açıklamaları.
- **Tek Tıkla Kopyalama:** Tabloyu panoya kopyalayıp Excel veya Google E-Tablolar'a yapıştırma imkânı.

### 6. 🔩 Hırdavat & Nalburiye Metrajı
- Parça ve birleşim sayısına göre **4x50 mm gövde vidası** hesabı.
- Arkalık montaj çivisi veya 3.5x18 mm arkalık vidası adedi.
- Kapak yüksekliği ve ağırlığına bağlı olarak belirlenen **menteşe sayısı** (2, 3, 4 veya 5 menteşe).
- Ray montaj vidaları, raf pimleri, kulp ve oval askı borusu metrajı.

### 7. 🖥️ Canlı 2D Görselleştirme & Yazdırma
- Parametreler değiştikçe anında güncellenen ölçekli **2D SVG Kesit Çizimi**.
- Atölyede referans almak için yazdırmaya optimize edilmiş temiz çıktı düzeni (`Ctrl+P` / `Cmd+P`).

---

## 🚀 Kurulum ve Kullanım

Bu proje tamamen **istemci tarafında (Client-Side)** çalışır. Herhangi bir Node.js, Python, derleme (build) aracı veya veritabanı gerektirmez.

### Yerel Olarak Çalıştırma
1. Depoyu klonlayın veya zip olarak indirin:
   ```bash
   git clone https://github.com/knigdelioglu/dolap.git
   cd dolap
   ```
2. `index.html` dosyasını herhangi bir modern web tarayıcısında (Chrome, Firefox, Safari, Edge) çift tıklayarak açın.

### GitHub Pages Üzerinde Canlı Yayınlama
Projeyi doğrudan web üzerinden kullanmak için:
1. GitHub deponuzun **Settings** sekmesine gidin.
2. Sol menüden **Pages** seçeneğine tıklayın.
3. **Branch** olarak `main`, klasör olarak `/ (root)` seçin ve **Save** butonuna basın.
4. Birkaç dakika içinde `https://knigdelioglu.github.io/dolap/` adresinden siteniz yayına girecektir.

---

## 🛠️ Kullanılan Teknolojiler

- **HTML5 & Vanilla JavaScript (ES6+):** Yüksek performanslı hesaplama algoritması ve dinamik DOM yönetimi.
- **Tailwind CSS (CDN):** Modern, esnek ve duyarlı (responsive) kullanıcı arayüzü.
- **FontAwesome 6:** Zengin vektörel ikon seti.
- **SVG:** Milimetrik ölçekli canlı dolap çizimi.

---

## 💡 Amatör İmalatçı İçin Püf Noktaları

1. **Çatlatmama Kuralı:** Suntalam veya MDF'nin cumbasına (kenarına) vida atmadan önce mutlaka **2.5 mm matkap ucuyla** kılavuz delik delin.
2. **Ray Montaj Boşluğu:** Standart teleskopik ray montajında her iki yanda 13 mm (toplam 26 mm) pay bırakılmalıdır.
3. **Diyagonal Gönye Kontrolü:** Arkalığı çakmadan önce dolabın iki çapraz köşesi arasındaki mesafeyi metreyle ölçün; iki çapraz eşit değilse dolabınız gönyede değildir.

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında sunulmaktadır. Dilediğiniz gibi geliştirebilir, kişisel veya ticari işlerinizde kullanabilirsiniz.
