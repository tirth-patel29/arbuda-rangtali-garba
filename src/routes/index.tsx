import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  Minus,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import kumkum from "@/assets/kumkum.png";
import royal from "@/assets/royal.png";
import swastik from "@/assets/swastik.png";
import heroImage from "@/assets/rangtali-hero.jpg";
import artist1 from "@/assets/1.png";
import artist2 from "@/assets/2.png";
import artist3 from "@/assets/3.png";
import artist4 from "@/assets/4.png";
import artist5 from "@/assets/5.png";
import artist6 from "@/assets/6.png";
import artist7 from "@/assets/7.png";
import artist8 from "@/assets/8.png";
import artist9 from "@/assets/9.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arbuda Rangtali — Navratri Mahotsav" },
      {
        name: "description",
        content:
          "Nine unforgettable nights of garba, music and Gujarati culture in Modasa. 11–20 October 2026 at KumKum Party Plot.",
      },
      { property: "og:title", content: "Arbuda Rangtali — Navratri Mahotsav" },
      {
        property: "og:description",
        content: "મોડાસાની નવરાત્રી, એક નવી રંગતાળીમાં. 11–20 October 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RangtaliPage,
});

const artists = [
  ["01", "રાહુલ આંજણા", "Rahul Anjana", "11 OCT", "portrait-amber", artist1],
  ["02", "ભારતી પ્રજાપતિ", "Bharti Prajapati", "12 OCT", "portrait-rose", artist2],
  ["03", "હેતલ સાધુ", "Hetal Sadhu", "13 OCT", "portrait-clay", artist3],
  ["04", "પિન્કી ચૌધરી", "Pinky Chaudhary", "14 OCT", "portrait-plum", artist4],
  ["05", "સ્નેહ પટેલ", "Sneh Patel", "15 OCT", "portrait-gold", artist5],
  ["06", "જૈમિની લિમ્બચીયા", "Jaimini Limbachiya", "16 OCT", "portrait-ink", artist6],
  ["07", "રાકેશ બારોટ", "Rakesh Barot", "17 OCT", "portrait-ruby", artist7],
  ["08", "સ્મિતા મકવાણા", "Smita Makwana", "18 OCT", "portrait-saffron", artist8],
  ["09", "કમલેશ બારોટ", "Kamlesh Barot", "19 OCT", "portrait-wine", artist9],
];

const nights = [
  ["11", "રાહુલ આંજણા", "RAHUL ANJANA"],
  ["12", "ભારતી પ્રજાપતિ", "BHARTI PRAJAPATI"],
  ["13", "હેતલ સાધુ", "HETAL SADHU"],
  ["14", "પિન્કી ચૌધરી", "PINKY CHAUDHARY"],
  ["15", "સ્નેહ પટેલ", "SNEH PATEL"],
  ["16", "જૈમિની લિમ્બચીયા", "JAIMINI LIMBACHIYA"],
  ["17", "રાકેશ બારોટ", "RAKESH BAROT"],
  ["18", "સ્મિતા મકવાણા", "SMITA MAKWANA"],
  ["19", "કમલેશ બારોટ", "KAMLESH BAROT"],
];

function useCountdown() {
  const target = new Date("2026-10-11T19:00:00+05:30").getTime();
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(target - Date.now(), 0));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const safeRemaining = remaining ?? 0;
  const days = Math.floor(safeRemaining / 86400000);
  const hours = Math.floor((safeRemaining / 3600000) % 24);
  const minutes = Math.floor((safeRemaining / 60000) % 60);
  const seconds = Math.floor((safeRemaining / 1000) % 60);
  return { days, hours, minutes, seconds, live: remaining === 0 };
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className={`wordmark ${compact ? "wordmark-compact" : ""}`} aria-label="Arbuda Rangtali home">
      <img src={logo} alt="Arbuda Rangtali" className="wordmark-symbol" />
      <span className="wordmark-copy">
        <span className="wordmark-gujarati">અર્બુદા રંગતાળી</span>
        {!compact && <span className="wordmark-subtitle">નવરાત્રી મહોત્સવ · મોડાસા</span>}
      </span>
    </a>
  );
}

function Countdown() {
  const countdown = useCountdown();
  const units = [
    [countdown.days, "DAYS"],
    [countdown.hours, "HOURS"],
    [countdown.minutes, "MINUTES"],
    [countdown.seconds, "SECONDS"],
  ];

  if (countdown.live) return <div className="countdown-live">NAVRATRI IS LIVE <Sparkles size={16} /></div>;
  return (
    <div className="countdown" aria-label="Countdown to Arbuda Rangtali">
      {units.map(([value, label], index) => (
        <div className="countdown-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
          {index < units.length - 1 && <Minus className="countdown-divider" size={12} />}
        </div>
      ))}
    </div>
  );
}

function ArtistCarousel({ artists }: { artists: (string | any)[][] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    skipSnaps: false,
    startIndex: 4,
    duration: 60
  }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: false })
  ]);

  const [activeIndex, setActiveIndex] = useState(4);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Wheel Scroll Handoff
  useEffect(() => {
    if (!emblaApi) return;

    let wheelTimeout: any;
    let accumulatedDelta = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Let horizontal swipes through

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if ((isScrollingDown && emblaApi.canScrollNext()) || (isScrollingUp && emblaApi.canScrollPrev())) {
        e.preventDefault();
        accumulatedDelta += e.deltaY;

        if (Math.abs(accumulatedDelta) > 50) {
          if (accumulatedDelta > 0) emblaApi.scrollNext();
          else emblaApi.scrollPrev();
          accumulatedDelta = 0;
        }

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => { accumulatedDelta = 0; }, 50);
      }
    };

    const node = emblaApi.rootNode();
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi]);

  // Tween styling for 3D effect based on drag progress
  const tweenScale = useCallback((emblaApi: any) => {
    const scrollProgress = emblaApi.scrollProgress();
    const slides = emblaApi.slideNodes();
    if (!slides.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    slides.forEach((slideNode: HTMLElement, index: number) => {
      // scrollProgress goes from 0 to 1 over the track.
      const slideProgress = index / (slides.length - 1 || 1);
      const offsetInSlides = (slideProgress - scrollProgress) * (slides.length - 1);
      const absOffset = Math.abs(offsetInSlides);

      if (prefersReducedMotion) {
        const isCenter = absOffset < 0.5;
        slideNode.style.setProperty('--abs-offset', String(isCenter ? 0 : 1));
        slideNode.style.zIndex = String(10 - (isCenter ? 0 : 1));
      } else {
        slideNode.style.setProperty('--abs-offset', String(absOffset));
        slideNode.style.zIndex = String(Math.max(0, Math.round(10 - absOffset)));
      }
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      tweenScale(emblaApi);
    });
    emblaApi.on('scroll', tweenScale);

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    tweenScale(emblaApi);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", tweenScale);
      emblaApi.off("scroll", tweenScale);
    };
  }, [emblaApi, tweenScale]);

  return (
    <div className="artists-carousel-wrapper" ref={emblaRef}>
      <div className="carousel-track">
        {artists.map((artist, index) => {
          const [number, gujarati, english, date, tone, image] = artist;
          const isActive = index === activeIndex;

          return (
            <article
              key={number}
              className={`carousel-card ${tone} ${isActive ? "active" : ""}`}
              onClick={() => emblaApi?.scrollTo(index)}
            >
              <div className="card-badge">DAY {number}</div>
              <div className="card-image-wrap">
                <img src={image as string} alt={english as string} className="carousel-photo" loading="lazy" />
                <div className="card-gradient" />
              </div>
              <div className="card-info-strip">
                <span className="card-gujarati">{gujarati}</span>
                <span className="card-english">{english}</span>
              </div>
            </article>
          );
        })}
      </div>
      <div className="carousel-dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function RangtaliPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="festival-page">
      <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
        <Wordmark compact />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">અમારા વિશે</a><a href="#nights">૯ રાત</a><a href="#artists">કલાકારો</a><a href="#venue">સ્થળ</a><a href="#sponsors">સ્પોન્સર્સ</a>
        </nav>
        <a className="nav-instagram" href="https://instagram.com/arbuda_rangtali" target="_blank" rel="noreferrer"><Instagram size={15} /> @ARBUDARANGTALI</a>
        <Button variant="ghost" size="icon" className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top"><Wordmark compact /><Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu"><X /></Button></div>
          <div className="mobile-menu-links">
            {[["01", "અમારા વિશે", "#about"], ["02", "૯ રાત", "#nights"], ["03", "કલાકારો", "#artists"], ["04", "સ્થળ", "#venue"], ["05", "સ્પોન્સર્સ", "#sponsors"]].map(([number, label, href]) => <a href={href} onClick={closeMenu} key={label}><small>{number}</small>{label}<ArrowUpRight size={22} /></a>)}
          </div>
          <div className="mobile-menu-foot"><span>11—20 OCT 2026</span><span>MODASA, GUJARAT</span></div>
        </div>
      )}

      <section className="hero-section">
        <img className="hero-image" src={heroImage} alt="A glowing diya beside a Gujarati textile and mandala" width={1440} height={1800} />
        <div className="hero-shade" />
        <div className="hero-mandala mandala-large" aria-hidden="true"><span>તાળ · રાસ · રંગ · તાલી</span></div>
        <div className="hero-content">
          <h1 className="sr-only">Arbuda Rangtali — Navratri Mahotsav</h1>
          <div className="hero-kicker"><span className="eyebrow-line" /> <span>ROYAL EVENTS PRESENTS</span></div>
          <Wordmark />
          <p className="hero-line adhipurush-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.2 }}>મોડાસાની નવરાત્રી,<br /><span>એક નવી રંગતાળીમાં.</span></p>
          <div className="hero-meta"><span>11—20 OCTOBER 2026</span><span className="meta-dot" /><span>KUMKUM PARTY PLOT · MODASA</span></div>
          <Countdown />
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO ENTER THE RANGTALI</span><i /></a>
        <div className="hero-corner-note"><span>09</span><span>NIGHTS OF<br />LIVE GARBA</span></div>
      </section>

      <section id="about" className="intro-section section-dark">
        <div className="section-marker">01 <span>THE BEGINNING</span></div>
        <div className="intro-grid">
          <div className="intro-lead">
            <p className="eyebrow">A FESTIVAL IN MOTION</p>
            <h2 className="adhipurush-font animate-fade-in-up intro-custom-title">
              <span className="intro-h2-small">માં અંબા અને માં અર્બુદાની અસીમ કૃપાથી…</span>
              <span className="intro-h2-large">રંગતાળી ફરી જામશે.</span>
            </h2>
          </div>
          <div className="intro-copy animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="gujarati-copy">અને મોડાસા ફરી એકવાર ગરબે રમશે.</p>
            <p>Nine nights. One circle. A thousand stories told in rhythm, colour, and the energy of a city that knows how to celebrate.</p>
            <a className="text-link" href="#nights">ENTER THE NIGHTS <ArrowDownRight size={18} /></a>
          </div>
        </div>
        <div className="intro-bottom"><span>ARBUDA RANGTALI / 2026</span><span>GUJARAT’S NEWEST GARBA RITUAL</span></div>
      </section>

      <section id="nights" className="nights-section section-ivory">
        <div className="section-heading"><div><p className="eyebrow eyebrow-dark">THE RANGTALI CALENDAR</p><h2>The<br /><em>Nights</em></h2></div><div className="heading-aside"><span>11—19</span><p>OCTOBER<br />2026</p></div></div>
        <div className="nights-list">
          {nights.map(([date, gujarati, english]) => <a className="night-row" href="#artists" key={date}><span className="night-date">{date}<small>OCT</small></span><span className="night-artist"><strong>{gujarati}</strong><small>{english}</small></span><span className="night-arrow"><ArrowUpRight size={20} /></span></a>)}
        </div>
        <div className="calendar-note"><CalendarDays size={18} /><span>Every night, the circle gets bigger.</span><span className="note-line" /></div>
      </section>

      <div className="statement-band"><div className="statement-ring" aria-hidden="true">✳</div><p>મોડાસા શહેર<br /><em>આંજણા ચૌધરી સમાજ આયોજિત</em></p><span>02 / THE RHYTHM</span></div>

      <section id="artists" className="artists-section section-dark">
        <div className="section-heading artists-heading"><div><p className="eyebrow">VOICES OF THE RANGTALI</p><h2>Live<br /><em>Garba</em></h2></div><p className="artists-intro">The voices that will carry Modasa through nine nights of rhythm, togetherness, and pure rang.</p></div>
        <ArtistCarousel artists={artists} />
        <p className="lineup-note">* Day 10 closing celebration to be announced.</p>
      </section>

      <section className="experience-section section-clay"><div className="experience-layout"><div><p className="eyebrow eyebrow-dark">MORE THAN A NIGHT OUT</p><h2>The<br /><em>Experience</em></h2></div><div className="experience-intro"><p className="gujarati-copy">રંગ, રાસ અને રિવાજ.</p><p>Come for the music. Stay for the feeling. Rangtali is a living room for Modasa — open, electric, and deeply ours.</p></div></div><div className="experience-grid"><div><span>01</span><h3>LIVE<br /><em>GARBA</em></h3><p>Nine nights of voices that make the circle move.</p></div><div><span>02</span><h3>RAAS<br /><em>& DANDIYA</em></h3><p>Every beat finds two sticks, every hand finds a friend.</p></div><div><span>03</span><h3>GUJARATI<br /><em>CULTURE</em></h3><p>Our colours, our rituals, our way of coming together.</p></div><div><span>04</span><h3>MODASA<br /><em>NIGHTS</em></h3><p>When the whole city steps out under one sky.</p></div></div></section>

      <section id="venue" className="venue-section section-dark"><div className="section-marker">03 <span>FIND THE CIRCLE</span></div><div className="venue-grid"><div><p className="eyebrow">THE PLACE TO BE</p><h2>KumKum<br /><em>Party Plot</em></h2><p className="venue-address"><MapPin size={18} /> Meghraj Road, Bypass Chowkdi,<br />Modasa, Gujarat</p><Button asChild className="venue-button"><a href="https://www.google.com/maps/search/?api=1&query=KumKum+Party+Plot+Modasa" target="_blank" rel="noreferrer">GET DIRECTIONS <MoveUpRight size={16} /></a></Button></div><div className="map-embed"><iframe src="https://www.google.com/maps?q=23.4704765,73.310548&z=16&output=embed" loading="lazy" title="Venue Map" /><div className="map-overlay-card"><h4>KumKum Party Plot</h4><p>Meghraj Road, Bypass Chowkdi, Modasa, Gujarat 383315</p><div className="map-actions"><a href="https://www.google.com/maps/dir/?api=1&destination=23.4704765,73.310548" target="_blank" rel="noreferrer" aria-label="Get Directions"><MoveUpRight size={16} /></a></div></div></div></div><div className="venue-footer"><span><CalendarDays size={16} /> 11—20 OCTOBER 2026</span><span><Clock3 size={16} /> DOORS OPEN 7 PM</span></div></section>

      <section id="sponsors" className="sponsors-section section-dark">
        <div className="section-heading"><div><p className="eyebrow">સહયોગથી સાકાર</p><h2 className="adhipurush-font">અમારા સ્પોન્સર્સ અને<br /><em>પાર્ટનર્સ</em></h2><p className="sponsors-subtext">જેમના વિશ્વાસ અને સહયોગથી અર્બુદા રંગતાળી બને છે વધુ ભવ્ય, વધુ યાદગાર.</p></div></div>
        <div className="sponsors-grid">
          {[
            { img: kumkum, name: "Kum Kum Party Plot" },
            { img: royal, name: "Royal Events" },
            { img: swastik, name: "Swastik Sound" }
          ].map((sponsor, i) => (
            <div className="sponsor-card" key={i}>
              <div className="sponsor-frame">
                <div className="sponsor-corner tl" />
                <div className="sponsor-corner tr" />
                <div className="sponsor-corner bl" />
                <div className="sponsor-corner br" />
                <img src={sponsor.img} alt={sponsor.name} className="sponsor-logo" />
              </div>
              <p className="sponsor-name">{sponsor.name}</p>
            </div>
          ))}
          {[1, 2, 3].map((i) => (
            <div className="sponsor-card coming-soon" key={i + 3}>
              <div className="sponsor-frame">
                <span>COMING SOON</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="social-section section-ivory"><div className="social-copy"><Instagram size={22} /><p className="eyebrow eyebrow-dark">FOLLOW THE RANGTALI</p><h2>Keep the<br /><em>circle close.</em></h2><a className="social-handle" href="https://instagram.com/arbuda_rangtali" target="_blank" rel="noreferrer">@ARBUDARANGTALI <ArrowUpRight size={17} /></a></div><div className="social-stamp"><div className="stamp-ring">ARBUDA · RANGTALI · MODASA · 2026 · </div><span>✳</span></div></section>

      <section className="final-section"><div className="final-backdrop" /><div className="final-content"><p className="eyebrow">THE NIGHT IS YOURS</p><h2 className="adhipurush-font">મળીએ<br /><em>ગરબાની રાતે.</em></h2><p>See you where the dandiya meet.</p><a className="final-link" href="#top">BACK TO TOP <ChevronDown size={17} /></a></div></section>

      <footer className="site-footer"><div><Wordmark compact /><p>© 2026 Arbuda Rangtali. All rights reserved.</p></div><div className="footer-details"><span>ROYAL EVENTS</span><span>IN ASSOCIATION WITH SWASTIK SOUND</span></div><a href="https://instagram.com/arbuda_rangtali" target="_blank" rel="noreferrer"><Instagram size={18} /> INSTAGRAM</a></footer>
    </main>
  );
}