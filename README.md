# Suntalam Dolap Ustası 🪚📏

> Amatör imalatçılar, hobi marangozları ve kendin-yap (DIY) kullanıcıları için tarayıcıda çalışan interaktif dolap geometri, net kesim ve donanım hesaplayıcı.

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://knigdelioglu.github.io/dolap/)
[![HTML5 / JS](https://img.shields.io/badge/Frontend-HTML5%20%2F%20Vanilla%20JS-orange?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tests](https://img.shields.io/badge/Geometry-Regression%20Tests-success)](tests/geometry-regression.test.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Genel Bakış

**Suntalam Dolap Ustası**, dış ölçüler ve seçilen konstrüksiyon varsayımlarından gövde, raf, dikme, çekmece ve kapak kesimlerini üretir. Hesap motoru fiziksel olarak imkânsız ölçüleri, negatif/sonlu olmayan kesimleri ve bilinen kapak–çekmece çakışmalarını kesim listesi oluşmadan durdurur.

Uygulama:
- Gövde, baza, arkadan bindirme arkalık, dikme, sabit raf, çekmece ve kapak ölçülerini hesaplar.
- PVC kenar bandını bitmiş ölçüden düşerek testere ölçüsü üretir.
- Net kesim tablosu, yaklaşık vida listesi ve seçilen donanıma ilişkin yardımcı metrajlar üretir.
- Aynı geometri modelinden ölçekli 2D SVG önizleme oluşturur.
- Hatalı veya fiziksel olarak erişilemeyen bazı kombinasyonlarda üretim listesini bloke eder; ergonomik riskleri ayrıca uyarı olarak gösterir.

## Desteklenen Yapılar

- **Gövde:** 1–3 ana dikey bölme, baza, üst yüklük ve isteğe bağlı süpürge/ütü koridoru.
- **Menteşeli kapak:** 1–4 ana bölüm kanadı. Süpürge koridorunun ayrı kapağı ana kanat sayısına dahil değildir.
- **Çift raylı sürgü kapak:** raf ön boşluğu, yükseklik payı ve bindirme kullanıcı tarafından profile göre ayarlanabilir.
- **Çekmece:** ana bölümler boyunca dış çekmece veya tek bir bölmede çekmece. Sürgü arkasındaki bölme çekmeceleri iç çekmece olarak modellenir.
- **Raf / askılık:** bölüm başına 0–8 sabit raf ve tek/çift kat askılık seçimi.

### Sürgü + iç çekmece güvenliği

İki kanatlı bypass sürgüde bir çekmecenin yalnızca kutu önü kapakların uç konumunda tamamen açığa çıkabiliyorsa kullanılmasına izin verilir. Örneğin üç bölmeli dolabın orta bölmesindeki geniş iç çekmece çoğu standart iki kanatlı düzende tam açılamadığı için hesap motoru bu kombinasyonu engeller.

## Kesim Varsayımları

- `Dış Derinlik`, arkalık dahil bitmiş fiziksel derinliktir.
- Arkalık **arkadan bindirme/çakma** olarak modellenir; kanal açılmış arkalık geometrisi ayrı bir profil olarak uygulanmaz.
- Raflar `Sabit Raf` olarak hesaplanır; sökülebilir raf için istenen montaj toleransı ayrıca verilmelidir.
- Yan montaj teleskopik ray için varsayılan boşluk 13 mm/yan olup kullanılan rayın teknik föyü esas alınmalıdır.
- Sürgü sistemindeki 85/40/30 mm varsayılanları evrensel değildir; gerçek ray sistemine göre değiştirilebilir.
- Menteşe sayısı uygulamada **tahmindir**. Nihai menteşe sayısı, bindirme tipi, taban sacı ve taşıma kapasitesi kullanılan üreticinin teknik tablosuyla doğrulanmalıdır.
- Vida listesi montaj için yaklaşık ihtiyaç listesidir; bağlantı yöntemi ve atölye standardına göre değişebilir.

## Kurulum ve Kullanım

Projenin hesaplama mantığı istemci tarafında çalışır; uygulama sunucu veya veritabanı gerektirmez.

```bash
git clone https://github.com/knigdelioglu/dolap.git
cd dolap
```

Ardından `index.html` dosyasını açabilirsiniz. `index.html`, hesaplayıcının kanonik tek HTML dosyasına yönlendirir.

Arayüz Tailwind CSS, Font Awesome ve Google Fonts'u CDN üzerinden yüklediği için internet bağlantısı olmadan hesaplama JavaScript'i çalışsa da tam görsel stil/ikon/fontlar yüklenmeyebilir.

### GitHub Pages

Repo `main` / `/ (root)` üzerinden Pages'e bağlandığında uygulama şu adreste çalışır:

`https://knigdelioglu.github.io/dolap/`

## Testler

Geometri motorunun regresyon paketi Node ile doğrudan çalışır:

```bash
node tests/geometry-regression.test.js
```

Testler; pozitif kesim invariantlarını, kapak/klapa sınırlarını, dış çekmece çakışmalarını, ham girdi doğrulamasını, sürgü profil sınırlarını ve sürgü arkasındaki iç çekmece erişimini kapsar. Pull request ve `main` push'larında aynı paket GitHub Actions tarafından çalıştırılır.

## Teknolojiler

- HTML5 + Vanilla JavaScript
- SVG
- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Google Fonts (CDN)

## İmalat Notları

1. Suntalam/MDF cumbasına vida atılacaksa uygun çapta kılavuz delik açılması çatlama riskini azaltır.
2. Ray yan boşluğu ve sürgü profil değerleri mutlaka satın alınan donanımın teknik föyüyle karşılaştırılmalıdır.
3. Arkalık sabitlenmeden önce kasanın iki diyagonali ölçülerek gönye kontrolü yapılmalıdır.
4. Kesim listesi üretim yardımcısıdır; duvar eğriliği, zemin terazisi, bağlantı elemanının gerçek ölçüsü ve donanım üreticisi toleransları uygulama dışında sahada doğrulanmalıdır.

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında sunulmaktadır.
