import React, { useState } from 'react';
import {
  LayoutGrid,
  BookOpen,
  Library,
  Sparkles,
  Clock,
  Radio,
  Share2,
  Search,
  Plus,
  Moon,
  Bell,
  CheckCircle2,
  RefreshCw,
  Sun,
  Sunrise,
  Download,
  Check,
  ChevronDown,
  Play,
  Pause,
  Copy,
  Bookmark,
  Activity,
  Layers,
  FileText,
  FilePlus,
  BookPlus,
  LogOut,
  Calendar,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  onSignOut: () => void;
  userEmail?: string;
}

export default function Dashboard({ onSignOut, userEmail = 'maryam.alzahra@khazanah.id' }: DashboardProps): React.JSX.Element {
  const [activeNav, setActiveNav] = useState('overview');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState(false);

  const handlePurgeCache = () => {
    setIsPurging(true);
    setTimeout(() => {
      setIsPurging(false);
      alert('Edge CDN Cache Purged successfully! (Singapore & Jakarta IDC clusters synced)');
    }, 800);
  };

  const handleCopyAyah = () => {
    navigator.clipboard.writeText('رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ');
    setCopiedAyah(true);
    setTimeout(() => setCopiedAyah(false), 2000);
  };

  return (
    <div className="dashboard-layout">
      {/* ================= 1. SIDEBAR ================= */}
      <aside className="dash-sidebar">
        <div>
          {/* Brand Header */}
          <div className="sidebar-brand">
            <div className="brand-icon-box" title="Khazanah">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="#c6a25e" />
                <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="#c6a25e" transform="rotate(45 12 12)" />
                <circle cx="12" cy="12" r="3.2" stroke="#c6a25e" />
                <circle cx="12" cy="12" r="1.1" fill="#c6a25e" />
              </svg>
            </div>
            <span className="sidebar-brand-title">Khazanah</span>
            <span className="sidebar-version-badge">CMS v1.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            <div 
              className={`nav-item ${activeNav === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveNav('overview')}
            >
              <div className="nav-item-left">
                <LayoutGrid size={17} />
                <span>Overview</span>
              </div>
            </div>

            <div 
              className={`nav-item ${activeNav === 'quran' ? 'active' : ''}`}
              onClick={() => setActiveNav('quran')}
            >
              <div className="nav-item-left">
                <BookOpen size={17} />
                <span>Al-Qur'an</span>
              </div>
            </div>

            <div 
              className={`nav-item ${activeNav === 'hadith' ? 'active' : ''}`}
              onClick={() => setActiveNav('hadith')}
            >
              <div className="nav-item-left">
                <Library size={17} />
                <span>Hadith Collections</span>
              </div>
            </div>

            <div 
              className={`nav-item ${activeNav === 'doa' ? 'active' : ''}`}
              onClick={() => setActiveNav('doa')}
            >
              <div className="nav-item-left">
                <Sparkles size={17} />
                <span>Doa &amp; Wirid</span>
              </div>
            </div>

            <div 
              className={`nav-item ${activeNav === 'prayer' ? 'active' : ''}`}
              onClick={() => setActiveNav('prayer')}
            >
              <div className="nav-item-left">
                <Clock size={17} />
                <span>Prayer Schedule</span>
              </div>
              <span className="nav-indicator-dot" title="Active Calculation Engine"></span>
            </div>

            <div 
              className={`nav-item ${activeNav === 'media' ? 'active' : ''}`}
              onClick={() => setActiveNav('media')}
            >
              <div className="nav-item-left">
                <Radio size={17} />
                <span>Media &amp; Audio</span>
              </div>
            </div>

            <div 
              className={`nav-item ${activeNav === 'api' ? 'active' : ''}`}
              onClick={() => setActiveNav('api')}
            >
              <div className="nav-item-left">
                <Share2 size={17} />
                <span>Publishing &amp; API</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-prayer-pill">
            <span className="sidebar-prayer-label">JADWAL SHOLAT DKI</span>
            <span className="sidebar-prayer-val">Ashar in 42m</span>
          </div>

          <div className="user-profile-widget" title={`Logged in as ${userEmail}`}>
            {/* Elegant avatar representation */}
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" 
              alt="Maryam Al-Zahra" 
              className="user-avatar-img"
            />
            <div className="user-info">
              <span className="user-name">Maryam Al-Zahra</span>
              <span className="user-role">Chief Content Editor</span>
            </div>
            <button 
              type="button" 
              className="logout-icon-btn" 
              onClick={onSignOut}
              title="Keluar / Sign Out ke Login"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= 2. MAIN DASHBOARD ================= */}
      <div className="dash-main">
        {/* Top Navbar */}
        <header className="dash-navbar">
          {/* Search Bar */}
          <div className="search-box-container">
            <Search size={16} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search surah, hadith narrators, doa..." 
              className="search-input"
            />
            <span className="kbd-shortcut">⌘K</span>
          </div>

          {/* Prayer Timeline Strip */}
          <div className="prayer-timeline-strip">
            <div className="prayer-time-item">
              <span className="prayer-time-name">FAJR</span>
              <span className="prayer-time-val">04:36</span>
            </div>
            <div className="prayer-time-item">
              <span className="prayer-time-name">DHUHR</span>
              <span className="prayer-time-val">12:02</span>
            </div>
            <div className="prayer-time-item active-prayer">
              <span className="prayer-time-name">ASR</span>
              <span className="prayer-time-val">15:18</span>
            </div>
            <div className="prayer-time-item">
              <span className="prayer-time-name">MAGHRIB</span>
              <span className="prayer-time-val">18:08</span>
            </div>
            <div className="prayer-time-item">
              <span className="prayer-time-name">ISHA</span>
              <span className="prayer-time-val">19:20</span>
            </div>
          </div>

          {/* Right Action Icons & Avatar */}
          <div className="navbar-actions">
            <button 
              type="button" 
              className="btn-new-entry"
              onClick={() => alert("Membuka Modal Pembuatan Entri Baru Khazanah...")}
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>New Entry</span>
            </button>

            <button type="button" className="icon-action-btn" title="Toggle Theme" aria-label="Toggle Theme">
              <Moon size={17} />
            </button>

            <button type="button" className="icon-action-btn" title="Notifications" aria-label="Notifications">
              <Bell size={17} />
            </button>

            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" 
              alt="Avatar" 
              className="nav-avatar-mini"
            />
          </div>
        </header>

        {/* Content Area */}
        <main className="dash-content">
          {/* Section Header */}
          <div className="dash-page-header">
            <div>
              <div className="editorial-desk-kicker">
                EDITORIAL DESK • Cluster Jakarta-1 • Latency 18ms
              </div>
              <h1 className="dash-main-title">
                Katalog Khazanah &amp; Hadith Hub
              </h1>
            </div>

            <div className="header-badges-row">
              <div className="pill-badge-sync">
                <span className="dot-green"></span>
                <span>SYNC NODE: ACTIVE</span>
              </div>

              <div className="pill-badge-certified">
                <ShieldCheck size={14} />
                <span>Kemenag RI Certified Engine</span>
              </div>

              <button 
                type="button" 
                className="btn-purge-cache"
                onClick={handlePurgeCache}
                disabled={isPurging}
              >
                <RefreshCw size={13} className={isPurging ? 'animate-spin' : ''} />
                <span>{isPurging ? 'Purging...' : 'Purge Edge Cache'}</span>
              </button>
            </div>
          </div>

          {/* ================= ROW 1 ================= */}
          <div className="dash-row-1">
            {/* Left Card: Welcome & Approaching Prayer */}
            <div className="card-white greeting-card">
              <div className="greeting-date-row">
                <span className="date-pill-gregorian">KAMIS, 27 FEBRUARI 2025</span>
                <span className="date-pill-hijri">
                  <Calendar size={12} />
                  <span>28 Sya'ban 1446 H</span>
                </span>
              </div>

              <div className="greeting-arabic-calligraphy" lang="ar">
                السَّلَامُ عَلَيْكُمْ
              </div>
              <h2 className="greeting-headline">
                Assalamu'alaikum,<br />
                Maryam
              </h2>
              <p className="greeting-subrole">
                Executive Content &amp; Islamic Corpus Lead
              </p>

              {/* Approaching Prayer Inner Box */}
              <div className="approaching-prayer-box">
                <div className="approaching-top">
                  <span className="approaching-label">APPROACHING PRAYER</span>
                  <span className="approaching-countdown-pill">• in 38m 14s</span>
                </div>

                <div className="approaching-main-row">
                  <div>
                    <span className="prayer-big-name">Ashar</span>
                    <span className="prayer-big-time">15:24</span>
                    <span className="prayer-big-tz">WIB</span>
                  </div>

                  <div className="dki-selector">
                    <span>DKI JAKARTA</span>
                    <ChevronDown size={14} />
                  </div>
                </div>

                <div className="approaching-specs">
                  <span>Kemenag RI Method (-6.2088°, 106.8456°)</span>
                  <span className="qibla-spec">Qibla: 295.1° NW</span>
                </div>
              </div>
            </div>

            {/* Right Card: Astronomical Timetable */}
            <div className="card-white astro-card">
              <div className="astro-header">
                <div>
                  <h3 className="astro-title">
                    <span>Today's Astronomical Timetable</span>
                    <Sun size={18} color="#eab308" />
                  </h3>
                  <p className="astro-subtitle">
                    Calculated standard: Ephemeris Kemenag RI • Shafi'i Asr ratio
                  </p>
                </div>
                <div className="day-length-pill">
                  <span className="dot-green"></span>
                  <span>Day Length: 12h 06m</span>
                </div>
              </div>

              {/* 6 Timetable Slots */}
              <div className="timetable-grid">
                <div className="timetable-item">
                  <span className="tt-name">IMSAK</span>
                  <span className="tt-time">04:26</span>
                  <CheckCircle2 size={14} className="tt-icon" />
                </div>
                <div className="timetable-item">
                  <span className="tt-name">SUBUH</span>
                  <span className="tt-time">04:36</span>
                  <CheckCircle2 size={14} className="tt-icon" />
                </div>
                <div className="timetable-item">
                  <span className="tt-name">SYURUQ</span>
                  <span className="tt-time">05:51</span>
                  <Sunrise size={14} className="tt-icon" />
                </div>
                <div className="timetable-item">
                  <span className="tt-name">DZUHUR</span>
                  <span className="tt-time">12:08</span>
                  <CheckCircle2 size={14} className="tt-icon" />
                </div>
                <div className="timetable-item active-slot">
                  <span className="tt-name next-indicator">ASHAR • NEXT</span>
                  <span className="tt-time">15:24</span>
                  <span className="tt-badge-current">• CURRENT</span>
                </div>
                <div className="timetable-item">
                  <span className="tt-name">MAGHRIB</span>
                  <span className="tt-time">18:14</span>
                  <Moon size={14} className="tt-icon" />
                </div>
              </div>

              <div className="astro-footer-row">
                <div>
                  <span>⚖️ Ikhtiyat: +2 Menit</span>
                  <span style={{ margin: '0 8px', color: '#cbd5e1' }}>•</span>
                  <span>🌡️ Sun Alt: +48.2°</span>
                </div>
                <a 
                  href="#pdf-sheet" 
                  className="download-sheet-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Mengunduh Lembar Hisab Astronomis Bulanan Khazanah PDF...");
                  }}
                >
                  <span>Monthly PDF Sheet</span>
                  <Download size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="dash-row-2">
            {/* Left Section: Corpus Library & Indices */}
            <div className="card-white corpus-lib-card">
              <div className="corpus-lib-header">
                <h3 className="corpus-lib-title">
                  <BookOpen size={19} color="#0f6c4f" />
                  <span>Corpus Library &amp; Indices</span>
                </h3>
                <span className="corpus-tag">v1.0 Production Catalog</span>
              </div>

              <div className="corpus-quad-grid">
                {/* 1. Al-Qur'an */}
                <div className="corpus-quad-item">
                  <div className="quad-top">
                    <span className="quad-title">AL-QUR'AN AL-KARIM</span>
                    <CheckCircle2 size={14} color="#059669" />
                  </div>
                  <div className="quad-stat-row">
                    <div>
                      <span className="quad-number">114</span>
                      <span className="quad-unit">Surahs</span>
                    </div>
                    {/* SVG Sparkline */}
                    <svg className="quad-sparkline" viewBox="0 0 60 20" fill="none">
                      <path d="M2 15 Q 15 5, 30 14 T 58 4" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="quad-bottom">
                    <span>6,236 Ayahs verified</span>
                    <span className="quad-action-link">+ Surah</span>
                  </div>
                </div>

                {/* 2. Kutubus Sittah */}
                <div className="corpus-quad-item">
                  <div className="quad-top">
                    <span className="quad-title">KUTUBUS SITTAH + 3</span>
                    <Bookmark size={14} color="#d97706" />
                  </div>
                  <div className="quad-stat-row">
                    <div>
                      <span className="quad-number">9</span>
                      <span className="quad-unit">Kitab</span>
                    </div>
                    <svg className="quad-sparkline" viewBox="0 0 60 20" fill="none">
                      <path d="M2 12 Q 18 18, 35 9 T 58 6" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="quad-bottom">
                    <span>38,412 Matan indexed</span>
                    <span className="quad-action-link">+ Hadith</span>
                  </div>
                </div>

                {/* 3. Doa Harian */}
                <div className="corpus-quad-item">
                  <div className="quad-top">
                    <span className="quad-title">DOA HARIAN</span>
                    <Sparkles size={14} color="#0284c7" />
                  </div>
                  <div className="quad-stat-row">
                    <div>
                      <span className="quad-number">28</span>
                      <span className="quad-unit">Kategori</span>
                    </div>
                    <svg className="quad-sparkline" viewBox="0 0 60 20" fill="none">
                      <path d="M2 16 Q 15 8, 30 15 T 58 7" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="quad-bottom">
                    <span>412 Invocations</span>
                    <span className="quad-action-link">+ Doa</span>
                  </div>
                </div>

                {/* 4. Wirid & Ratib */}
                <div className="corpus-quad-item">
                  <div className="quad-top">
                    <span className="quad-title">WIRID &amp; RATIB</span>
                    <Layers size={14} color="#059669" />
                  </div>
                  <div className="quad-stat-row">
                    <div>
                      <span className="quad-number">14</span>
                      <span className="quad-unit">Manuskrip</span>
                    </div>
                    <svg className="quad-sparkline" viewBox="0 0 60 20" fill="none">
                      <path d="M2 14 Q 20 5, 38 16 T 58 10" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="quad-bottom">
                    <span>Complete audio tracks</span>
                    <span className="quad-action-link">+ Wirid</span>
                  </div>
                </div>
              </div>

              <div className="corpus-footer-row">
                <span>Corpus Database: UTF-8 Arabic Unicode 15.1</span>
                <a href="#indexes" className="explore-indexes-link" onClick={(e) => e.preventDefault()}>
                  <span>Explore All Indexes</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Section: Featured Ayat */}
            <div className="card-white featured-ayat-card">
              <div className="ayat-header">
                <span className="ayat-kicker">FEATURED AYAT OF THE DAY • ROTATING 06:00 WIB</span>
                <span className="uthmani-badge">
                  <Check size={12} />
                  <span>Uthmani LPMQ</span>
                </span>
              </div>

              <div className="surah-meta-title">
                <span>Surah Al-Baqarah</span>
                <span className="surah-ayah-badge">Ayah 201</span>
                <span className="surah-juz-badge">Juz 2</span>
              </div>

              {/* Calligraphy Ayah */}
              <div className="arabic-calligraphy-block" lang="ar">
                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
              </div>

              {/* Translation Quote Box */}
              <div className="translation-quote-box">
                <div className="translation-tag-row">
                  <span>TERJEMAHAN KEMENAG RI</span>
                  <span>ID: T-201-BQH</span>
                </div>
                <p className="translation-body-text">
                  "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."
                </p>

                {/* Audio Recitation Player */}
                <div className="audio-recitation-player">
                  <div className="player-left">
                    <button 
                      type="button" 
                      className="btn-play-circle" 
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      title={isPlayingAudio ? "Pause Audio" : "Play Recitation"}
                      aria-label="Play Recitation"
                    >
                      {isPlayingAudio ? <Pause size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" />}
                    </button>
                    <div className="reciter-info">
                      <span className="reciter-name">Syekh Mishari Rashid Al-Afasy</span>
                      <span className="audio-specs">
                        {isPlayingAudio ? '▶ Playing Audio Stream • Lossless 24-bit FLAC' : 'Lossless 24-bit / 96kHz FLAC • 00:18'}
                      </span>
                    </div>
                  </div>

                  <div className="player-right-actions">
                    <button 
                      type="button" 
                      className="icon-action-btn" 
                      onClick={handleCopyAyah}
                      title={copiedAyah ? "Copied!" : "Copy Arabic Ayah"}
                      aria-label="Copy Ayat"
                    >
                      {copiedAyah ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                    </button>
                    <button type="button" className="icon-action-btn" title="Bookmark Ayah" aria-label="Bookmark">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ROW 3 ================= */}
          <div className="dash-row-3">
            {/* Card 1: Catalog Distribution */}
            <div className="card-white">
              <div className="distribution-header">
                <h4 className="distribution-title">
                  <Activity size={18} color="#0f6c4f" />
                  <span>Catalog Distribution</span>
                </h4>
                <div className="dist-ratio-label">
                  Verified<br />Ratio
                </div>
              </div>

              <div className="corpus-count-summary">
                <span>CANONICAL HADITH CORPUS</span>
                <span className="corpus-count-val">24,251 of 29,800</span>
              </div>

              <div className="progress-list">
                {/* 1. Shahih Bukhari */}
                <div>
                  <div className="progress-row-header">
                    <span>Shahih Bukhari</span>
                    <span className="progress-pct" style={{ color: '#062b20' }}>7,563 (94%)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '94%', backgroundColor: '#062b20' }}></div>
                  </div>
                </div>

                {/* 2. Shahih Muslim */}
                <div>
                  <div className="progress-row-header">
                    <span>Shahih Muslim</span>
                    <span className="progress-pct" style={{ color: '#059669' }}>7,458 (88%)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '88%', backgroundColor: '#059669' }}></div>
                  </div>
                </div>

                {/* 3. Sunan Abu Dawud */}
                <div>
                  <div className="progress-row-header">
                    <span>Sunan Abu Dawud</span>
                    <span className="progress-pct" style={{ color: '#d97706' }}>5,274 (76%)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '76%', backgroundColor: '#d97706' }}></div>
                  </div>
                </div>

                {/* 4. Jami' At-Tirmidhi */}
                <div>
                  <div className="progress-row-header">
                    <span>Jami' At-Tirmidhi</span>
                    <span className="progress-pct" style={{ color: '#64748b' }}>3,956 (62%)</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '62%', backgroundColor: '#64748b' }}></div>
                  </div>
                </div>
              </div>

              {/* Doa Classification row */}
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.8px', marginBottom: '8px' }}>
                DOA CLASSIFICATION
              </div>
              <div className="doa-class-row">
                <div className="doa-pill-box">
                  <div className="doa-pill-num">48</div>
                  <div className="doa-pill-label">Pagi-Petang</div>
                </div>
                <div className="doa-pill-box">
                  <div className="doa-pill-num">64</div>
                  <div className="doa-pill-label">Perlindungan</div>
                </div>
                <div className="doa-pill-box">
                  <div className="doa-pill-num">36</div>
                  <div className="doa-pill-label">Shalat &amp; Wudhu</div>
                </div>
              </div>
            </div>

            {/* Card 2: Core Engine API Health */}
            <div className="card-white">
              <div className="api-health-header">
                <h4 className="api-health-title">
                  <SlidersHorizontal size={18} color="#0f6c4f" />
                  <span>Core Engine API Health</span>
                </h4>
                <div className="uptime-badge">
                  <span className="dot-green"></span>
                  <span>99.98%</span>
                </div>
              </div>

              <p className="api-subtext">
                All 5 cluster services operational in Jakarta IDC 32 &amp; Singapore Edge CDN.
              </p>

              <div className="api-endpoint-list">
                <div className="endpoint-item">
                  <div className="endpoint-left">
                    <span className="method-badge method-get">GET</span>
                    <span className="endpoint-path">/v2/quran/surah/&#123;id&#125;</span>
                  </div>
                  <div className="endpoint-right">
                    <span>28ms</span>
                    <span className="dot-green"></span>
                  </div>
                </div>

                <div className="endpoint-item">
                  <div className="endpoint-left">
                    <span className="method-badge method-get">GET</span>
                    <span className="endpoint-path">/v2/prayer-times/today</span>
                  </div>
                  <div className="endpoint-right">
                    <span style={{ color: '#059669', fontWeight: 600 }}>14ms (CF)</span>
                    <span className="dot-green"></span>
                  </div>
                </div>

                <div className="endpoint-item">
                  <div className="endpoint-left">
                    <span className="method-badge method-post">POST</span>
                    <span className="endpoint-path">/v2/content/audit-sync</span>
                  </div>
                  <div className="endpoint-right">
                    <span>42ms</span>
                    <span className="dot-green"></span>
                  </div>
                </div>

                <div className="endpoint-item">
                  <div className="endpoint-left">
                    <span className="method-badge method-get">GET</span>
                    <span className="endpoint-path">/v2/audio/stream/lossless</span>
                  </div>
                  <div className="endpoint-right">
                    <span>64ms</span>
                    <span className="dot-green"></span>
                  </div>
                </div>
              </div>

              <div className="api-footer-row">
                <span>Last pinged 12s ago</span>
                <span 
                  className="run-probe-link"
                  onClick={() => alert("Menjalankan probe diagnosa diagnostik jaringan cluster IDC Jakarta & Singapore...")}
                >
                  <span>Run Probe Diagnostic</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Card 3: Editorial Directives */}
            <div className="card-white">
              <div className="directives-header">
                <h4 className="directives-title">
                  <Sparkles size={18} color="#0f6c4f" />
                  <span>Editorial Directives</span>
                </h4>
                <span className="shortcuts-tag">Shortcuts</span>
              </div>

              <div className="shortcut-buttons-grid">
                <div 
                  className="shortcut-btn"
                  onClick={() => alert("Membuka Editor Tafsir Ayah Baru...")}
                >
                  <FilePlus size={16} className="shortcut-icon" />
                  <div className="shortcut-text-wrap">
                    <span className="shortcut-label">New Ayah Tafsir</span>
                    <span className="shortcut-desc">Tafsir commentary</span>
                  </div>
                </div>

                <div 
                  className="shortcut-btn"
                  onClick={() => alert("Membuka Form Tambah Hadits Sanad & Matan...")}
                >
                  <BookPlus size={16} className="shortcut-icon" />
                  <div className="shortcut-text-wrap">
                    <span className="shortcut-label">Add Hadith</span>
                    <span className="shortcut-desc">Sanad &amp; Matan</span>
                  </div>
                </div>

                <div 
                  className="shortcut-btn"
                  onClick={() => alert("Membuka Editor Doa & Munajat...")}
                >
                  <Sparkles size={16} className="shortcut-icon" />
                  <div className="shortcut-text-wrap">
                    <span className="shortcut-label">Draft Doa</span>
                    <span className="shortcut-desc">Supplication</span>
                  </div>
                </div>

                <div 
                  className="shortcut-btn"
                  onClick={() => alert("Membuka Konfigurasi Siklus Wirid...")}
                >
                  <RefreshCw size={16} className="shortcut-icon" />
                  <div className="shortcut-text-wrap">
                    <span className="shortcut-label">Wirid Sequence</span>
                    <span className="shortcut-desc">Config dhikr cycle</span>
                  </div>
                </div>
              </div>

              <div className="awaiting-banner">
                <div className="awaiting-left">
                  <FileText size={15} color="#ca8a04" />
                  <span>3 drafts awaiting senior edit</span>
                </div>
                <span 
                  className="review-link"
                  onClick={() => alert("Membuka antrean 3 draf editorial yang menunggu review...")}
                >
                  Review
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
