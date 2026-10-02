import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  RotateCw,
  LayoutDashboard,
  LogIn
} from 'lucide-react';
import './App.css';
import Dashboard from './components/Dashboard';

export type PrayerName = 'Subuh' | 'Dzuhur' | 'Ashar' | 'Maghrib' | 'Isya';

interface FormErrors {
  email: string;
  passkey: string;
  general: string;
}

export default function App(): React.JSX.Element {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'dashboard' | 'login'>('dashboard');

  // Form State
  const [email, setEmail] = useState<string>('maryam.alzahra@khazanah.id');
  const [passkey, setPasskey] = useState<string>('KhazanahCorpus#2025');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Validation & Auth States
  const [errors, setErrors] = useState<FormErrors>({ email: '', passkey: '', general: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Live DKI Jakarta Clock & Prayer status
  const [currentTime, setCurrentTime] = useState<string>('15:18');
  const [currentPrayer, setCurrentPrayer] = useState<PrayerName>('Ashar');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
      
      const hourNum = now.getHours();
      if (hourNum >= 4 && hourNum < 12) setCurrentPrayer('Subuh');
      else if (hourNum >= 12 && hourNum < 15) setCurrentPrayer('Dzuhur');
      else if (hourNum >= 15 && hourNum < 18) setCurrentPrayer('Ashar');
      else if (hourNum >= 18 && hourNum < 19) setCurrentPrayer('Maghrib');
      else setCurrentPrayer('Isya');
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { email: '', passkey: '', general: '' };

    // Validasi Email
    if (!email.trim()) {
      newErrors.email = 'Editorial email address wajib diisi.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid (contoh: name@khazanah.id).';
      isValid = false;
    }

    // Validasi Passkey
    if (!passkey) {
      newErrors.passkey = 'Secure passkey wajib diisi.';
      isValid = false;
    } else if (passkey.length < 6) {
      newErrors.passkey = 'Secure passkey minimal 6 karakter.';
      isValid = false;
    }

    if (!isValid) {
      newErrors.general = 'Silakan periksa kembali email dan passkey Anda.';
      setErrors(newErrors);
      return false;
    }

    // Cek kredensial registry terverifikasi
    if (passkey !== 'KhazanahCorpus#2025') {
      setErrors({
        email: '',
        passkey: 'Passkey does not match our verified registry for this account.',
        general: 'Invalid credentials. Please verify your email and passkey or contact the chief editor.'
      });
      return false;
    }

    setErrors({ email: '', passkey: '', general: '' });
    return true;
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 600);
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (errors.email || errors.general) {
      setErrors(prev => ({ ...prev, email: '', general: '' }));
    }
  };

  const handlePasskeyChange = (val: string) => {
    setPasskey(val);
    if (errors.passkey || errors.general) {
      setErrors(prev => ({ ...prev, passkey: '', general: '' }));
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setPasskey('');
    setErrors({ email: '', passkey: '', general: '' });
  };

  return (
    <>
      {/* ================= FLOATING VIEW SWITCHER ================= */}
      <aside 
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(6, 43, 32, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(198, 162, 94, 0.35)',
          borderRadius: '30px',
          padding: '4px 6px',
          display: 'flex',
          gap: '4px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentView('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11.5px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: currentView === 'dashboard' ? '#10b981' : 'transparent',
            color: currentView === 'dashboard' ? '#041f17' : '#92b5a6',
            transition: 'all 0.2s ease'
          }}
        >
          <LayoutDashboard size={14} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentView('login')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11.5px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: currentView === 'login' ? '#10b981' : 'transparent',
            color: currentView === 'login' ? '#041f17' : '#92b5a6',
            transition: 'all 0.2s ease'
          }}
        >
          <LogIn size={14} />
          <span>Login Page</span>
        </button>
      </aside>

      {/* ================= CONDITIONAL VIEW ================= */}
      {currentView === 'dashboard' ? (
        <Dashboard 
          onSignOut={() => {
            handleSignOut();
            setCurrentView('login');
          }}
          userEmail={email}
        />
      ) : (
        <div className="khazanah-layout">
          {/* ================= LEFT HERO PANEL ================= */}
          <section className="hero-panel">
            {/* Subtle Islamic Sacred Geometric Watermark */}
            <div className="geometric-bg-overlay" aria-hidden="true">
              <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="#c6a25e" strokeWidth="0.8">
                <circle cx="200" cy="200" r="160" strokeDasharray="3 3" />
                <circle cx="200" cy="200" r="110" />
                <circle cx="200" cy="200" r="50" />
                <rect x="100" y="100" width="200" height="200" strokeWidth="1" />
                <rect x="100" y="100" width="200" height="200" strokeWidth="1" transform="rotate(45 200 200)" />
                <line x1="200" y1="20" x2="200" y2="380" strokeDasharray="2 4" />
                <line x1="20" y1="200" x2="380" y2="200" strokeDasharray="2 4" />
                <circle cx="200" cy="40" r="3" fill="#c6a25e" />
                <circle cx="200" cy="360" r="3" fill="#c6a25e" />
                <circle cx="40" cy="200" r="3" fill="#c6a25e" />
                <circle cx="360" cy="200" r="3" fill="#c6a25e" />
              </svg>
            </div>

            <div className="hero-content-wrapper">
              <header className="hero-header">
                <div className="brand-wrapper">
                  <div className="brand-icon-box" title="Khazanah Islamic Knowledge Engine">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="#c6a25e" />
                      <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="#c6a25e" transform="rotate(45 12 12)" />
                      <circle cx="12" cy="12" r="3.2" stroke="#c6a25e" />
                      <circle cx="12" cy="12" r="1.1" fill="#c6a25e" />
                    </svg>
                  </div>
                  <span className="brand-title">Khazanah</span>
                  <span className="version-badge">CMS v1.0</span>
                </div>

                <div className="system-status">
                  <span className="status-dot"></span>
                  <span>SYSTEM ENCRYPTED</span>
                </div>
              </header>

              <div className="hero-body">
                <div className="authority-tag">
                  <div className="authority-line"></div>
                  <span>AL-QUR'AN &amp; CORPUS AUTHORITY</span>
                </div>

                <h1 className="hero-headline">
                  The sovereign sanctuary for sacred texts, verified knowledge, and editorial craft.
                </h1>

                <p className="hero-desc">
                  An uncompromised editorial back-office curating the Medina Uthmani Mushaf, Kemenag Indonesian translations, Hadith sanad indexes, and astronomical prayer engines.
                </p>

                <div className="verse-quote-box">
                  <div className="arabic-verse" lang="ar">
                    اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
                  </div>
                  <div className="verse-surah-tag">
                    SURAH AL-'ALAQ • 96:1
                  </div>
                </div>
              </div>

              <footer className="hero-footer">
                <span>Jakarta Core Cluster</span>
                <span className="footer-bullet">•</span>
                <span>LPMQ Certified Rasm</span>
                <span className="footer-bullet">•</span>
                <span>© 2025 Khazanah Islamic Knowledge Engine</span>
              </footer>
            </div>
          </section>

          {/* ================= RIGHT FORM PANEL ================= */}
          <main className="form-panel">
            <div className="form-top-bar">
              <div className="prayer-indicator">
                <span className="prayer-dot"></span>
                <span>DKI Jakarta • {currentTime} ({currentPrayer})</span>
              </div>
            </div>

            <div className="form-center-container">
              {isAuthenticated ? (
                /* ================= CARD HIJAU BERHASIL LOGIN ================= */
                <div className="success-login-card" role="status">
                  <div className="success-badge-circle">
                    <Check size={32} strokeWidth={2.8} />
                  </div>
                  <h2 className="success-heading">Berhasil Masuk</h2>
                  <p className="success-paragraph">
                    Autentikasi kredensial terverifikasi. Selamat datang kembali di Khazanah Editorial Portal.
                  </p>

                  <div className="success-meta-box">
                    <div className="success-meta-row">
                      <span className="meta-label">Akun Editor:</span>
                      <span className="meta-val">{email}</span>
                    </div>
                    <div className="success-meta-row">
                      <span className="meta-label">Klaster Otoritas:</span>
                      <span className="meta-val">Medina Mushaf &amp; LPMQ Rasm</span>
                    </div>
                    <div className="success-meta-row">
                      <span className="meta-label">Tingkat Akses:</span>
                      <span className="meta-val">Admin Certified • Level 1</span>
                    </div>
                  </div>

                  <div className="success-actions">
                    <button 
                      type="button" 
                      className="dashboard-btn"
                      onClick={() => setCurrentView('dashboard')}
                    >
                      <span>Buka Corpus Dashboard</span>
                      <ArrowRight size={16} strokeWidth={2} />
                    </button>
                    <button 
                      type="button" 
                      className="logout-reset-btn"
                      onClick={handleSignOut}
                    >
                      Keluar / Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                /* ================= FORM LOGIN DENGAN VALIDASI ================= */
                <>
                  <div className="portal-tag">EDITORIAL PORTAL</div>
                  <h2 className="portal-heading">Sign in to Khazanah</h2>
                  <p className="portal-subtitle">
                    Enter your authenticated credentials to access the corpus editor and publishing pipeline.
                  </p>

                  {errors.general && (
                    <div className="alert-banner" role="alert">
                      <AlertCircle className="alert-icon" size={18} strokeWidth={2} />
                      <div className="alert-content">
                        <div className="alert-title">Authentication failed</div>
                        <div className="alert-desc">{errors.general}</div>
                      </div>
                      <div className="alert-indicator-bar" aria-hidden="true"></div>
                    </div>
                  )}

                  <form onSubmit={handleSignIn} noValidate>
                    <div className="form-group">
                      <div className={`input-container ${errors.email ? 'has-error' : ''}`}>
                        <label 
                          className={`input-label ${errors.email ? 'error-label' : ''}`} 
                          htmlFor="email-input"
                        >
                          Editorial Email Address
                        </label>
                        <div className="input-field-row">
                          <input
                            id="email-input"
                            type="email"
                            className="text-input"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(e.target.value)}
                            placeholder="name@khazanah.id"
                            autoComplete="email"
                            required
                          />
                          <div className="input-icon-btn" aria-hidden="true">
                            <Mail size={17} strokeWidth={1.8} />
                          </div>
                        </div>
                      </div>
                      {errors.email && (
                        <div className="field-error-text" role="alert">
                          <span>• {errors.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group passkey-group">
                      <div className={`input-container ${errors.passkey ? 'has-error' : ''}`}>
                        <label 
                          className={`input-label ${errors.passkey ? 'error-label' : ''}`} 
                          htmlFor="passkey-input"
                        >
                          Secure Passkey
                        </label>
                        <div className="input-field-row">
                          <input
                            id="passkey-input"
                            type={showPassword ? 'text' : 'password'}
                            className="text-input"
                            value={passkey}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasskeyChange(e.target.value)}
                            placeholder="Enter your security passkey"
                            autoComplete="current-password"
                            required
                          />
                          <button
                            type="button"
                            className="input-icon-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Hide passkey" : "Show passkey"}
                            aria-label={showPassword ? "Hide passkey" : "Show passkey"}
                          >
                            {showPassword ? (
                              <EyeOff size={17} strokeWidth={1.8} />
                            ) : (
                              <Eye size={17} strokeWidth={1.8} />
                            )}
                          </button>
                        </div>
                      </div>

                      {errors.passkey && (
                        <div className="field-error-text" role="alert">
                          <span>• {errors.passkey}</span>
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="submit-btn" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RotateCw size={16} className="animate-spin" />
                          <span>Verifying credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign in</span>
                          <ArrowRight size={16} strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="security-disclaimer">
                    <div className="security-pill">
                      <ShieldCheck size={14} strokeWidth={2.2} />
                      <span>Restricted: Admin access only</span>
                    </div>
                    <p className="disclaimer-text">
                      This terminal monitors certified religious corpus assets. All IP addresses, login attempts, and sessions are cryptographically logged.
                    </p>
                  </div>
                </>
              )}
            </div>

            <footer className="form-footer">
              <div className="footer-nav">
                <a href="#guidelines" className="footer-link" onClick={(e: React.MouseEvent) => e.preventDefault()}>Editorial Guidelines</a>
                <span>•</span>
                <a href="#it-desk" className="footer-link" onClick={(e: React.MouseEvent) => e.preventDefault()}>IT Desk</a>
              </div>

              <div className="app-version-tag">
                <span className="prayer-dot"></span>
                <span>v1.0</span>
              </div>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}
