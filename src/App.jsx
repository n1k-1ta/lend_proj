import { useEffect, useState, useRef } from 'react'
import ThemeSwitcher from './components/theme-switcher/ThemeSwitcher'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const sloganList = [
    'Учёба без лишнего стресса',
    'Объяснения понятным языком',
    'Индивидуальный подход к каждому',
    'Математика без барьеров'
  ];
  const [sloganIdx, setSloganIdx] = useState(0);
  const [slogan, setSlogan] = useState('');
  const [erase, setErase] = useState(false);
  const [looping, setLooping] = useState(false);
  const sloganTimeout = useRef();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light');
    document.body.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    let current = sloganList[sloganIdx];
    if (!erase) {
      if (slogan.length < current.length) {
        sloganTimeout.current = setTimeout(() => {
          setSlogan(current.slice(0, slogan.length + 1));
        }, 45);
      } else {
        sloganTimeout.current = setTimeout(() => {
          setErase(true);
        }, 1500);
      }
    } else {
      if (slogan.length > 0) {
        sloganTimeout.current = setTimeout(() => {
          setSlogan(current.slice(0, slogan.length - 1));
        }, 35);
      } else {
        sloganTimeout.current = setTimeout(() => {
          setErase(false);
          setSloganIdx((idx) => (idx + 1) % sloganList.length);
        }, 350);
      }
    }
    return () => clearTimeout(sloganTimeout.current);
  }, [slogan, erase, sloganIdx]);

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.2 }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => {
      nodes.forEach((node) => observer.unobserve(node))
      observer.disconnect()
    }
  }, [])

  function handleScroll(e, id) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Введите корректный email')
      return
    }
    setSubmitting(true)
    try {
      window.analytics && window.analytics.track('cta_subscribe', { email })
      setTimeout(() => {
        alert('Спасибо! Мы свяжемся с вами.')
        setEmail('')
        setSubmitting(false)
      }, 600)
    } catch(_) {
      setSubmitting(false)
    }
  }

  return (
    <>
      <header className="header" data-animate>
        <div className="container header-inner">
          <div className="brand">
            <img src="/src/assets/koda.png" className="brand-logo" alt="Логотип" />

          </div>
          <nav className="nav">
            <a href="#features" onClick={(e) => handleScroll(e, 'features')}>Возможности</a>
            <a href="#how" onClick={(e) => handleScroll(e, 'how')}>Как работает</a>
            <a href="#audience" onClick={(e) => handleScroll(e, 'audience')}>Для кого</a>
            <a href="#contacts" onClick={(e) => handleScroll(e, 'contacts')}>Контакты</a>
          </nav>
          <button className="btn btn_header" onClick={(e) => handleScroll(e, 'cta')}>Попробовать бесплатно</button>
          <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
        </div>
      </header>

      <main className="main">
        <section className="hero" data-animate>
          <div className="container hero-grid modern-center">
            <div className="hero-glass" style={{ width: '100%' }}>
              <div className="typewriter">
                <span className="eyebrow-dot" />
                <span>{slogan}<span className="cursor-blink">|</span></span>
              </div>
              <h1 className="title" data-animate style={{ '--delay': '0.1s', textAlign: 'center' }}>Персональный ИИ-репетитор для школьников</h1>
              <p className="subtitle" data-animate style={{ '--delay': '0.15s', textAlign: 'center' }}>Мгновенная проверка решений, детальный разбор ошибок и персонализированные объяснения</p>
              <div className="actions hero-actions" data-animate style={{ '--delay': '0.22s', justifyContent: 'center' }}>
                <button className="btn btn-hero" onClick={(e) => handleScroll(e, 'cta')}>Начать обучение</button>
                <a className="btn btn-hero" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">Демо-видео</a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section section-top-indent" data-animate>
          <div className="container">
            <h2>Преимущества</h2>
            <div className="grid-3">
              <div className="card card-hover-violet" data-animate style={{ '--delay': '0.05s' }}>
                <h3>✅ Проверка решений по фотографии</h3>
                <p>Загрузите фото handwritten решения и получите анализ</p>
              </div>
              <div className="card card-hover-orange" data-animate style={{ '--delay': '0.1s' }}>
                <h3>🎯 Точная классификация ошибок</h3>
                <p>Арифметика, логика, формулы, знаки</p>
              </div>
              <div className="card card-hover-yellow" data-animate style={{ '--delay': '0.15s' }}>
                <h3>📚 Персональные рекомендации</h3>
                <p>Подсказки и объяснения на основе ваших ошибок</p>
              </div>
              <div className="card card-hover-orange" data-animate style={{ '--delay': '0.2s' }}>
                <h3>💬 Удобный чат-формат</h3>
                <p>Диалог с ИИ и история сессий</p>
              </div>
              <div className="card card-hover-violet" data-animate style={{ '--delay': '0.25s' }}>
                <h3>📊 Отслеживание прогресса</h3>
                <p>Метрики и улучшения со временем</p>
              </div>
              <div className="card card-hover-yellow" data-animate style={{ '--delay': '0.29s' }}>
                <h3>⚡ Автоматическое уведомление об ошибках</h3>
                <p>Получайте мгновенные подсказки во время работы с задачами</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="section" data-animate>
          <div className="container">
            <h2>Как это работает</h2>
            <div className="steps">
              <div className="step" data-animate style={{ '--delay': '0.05s' }}>
                <div className="step-num">1</div>
                <div>Загрузите фото решения</div>
              </div>
              <div className="step" data-animate style={{ '--delay': '0.12s' }}>
                <div className="step-num">2</div>
                <div>ИИ анализирует и находит ошибки</div>
              </div>
              <div className="step" data-animate style={{ '--delay': '0.19s' }}>
                <div className="step-num">3</div>
                <div>Получите детальное объяснение</div>
              </div>
              <div className="step" data-animate style={{ '--delay': '0.26s' }}>
                <div className="step-num">4</div>
                <div>Улучшайте результаты</div>
              </div>
            </div>
          </div>
        </section>

        <section id="audience" className="section" data-animate>
          <div className="container">
            <h2>Для кого</h2>
            <div className="audience">
              <div className="card" data-animate style={{ '--delay': '0.06s' }}>
                <h3>Школьники</h3>
                <p>Самостоятельное обучение и практика</p>
              </div>
              <div className="card" data-animate style={{ '--delay': '0.14s' }}>
                <h3>Учителя</h3>
                <p>Инструмент для индивидуальной работы</p>
              </div>
              <div className="card" data-animate style={{ '--delay': '0.22s' }}>
                <h3>Родители</h3>
                <p>Контроль успеваемости ребёнка</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" data-animate>
          <div className="container">
            <h2>Технологии</h2>
            <div className="tech-list">
              <div className="card" data-animate style={{ '--delay': '0.06s' }}>
                <h3>Искусственный интеллект и компьютерное зрение</h3>
                <p>Классификация ошибок и анализ рукописных решений</p>
              </div>
              <div className="card" data-animate style={{ '--delay': '0.14s' }}>
                <h3>Адаптивный веб-интерфейс</h3>
                <p>Удобно на десктопе, планшете и мобильном</p>
              </div>
              <div className="card" data-animate style={{ '--delay': '0.22s' }}>
                <h3>Безопасное хранение данных</h3>
                <p>Конфиденциальность и защита персональной информации</p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="section" data-animate>
          <div className="container">
            <div className="cta" data-animate style={{ '--delay': '0.12s' }}>
              <div className="cta-content">
                <div>
                  <h2>Готовы улучшить знания по математике?</h2>
                  <p className="subtitle">Оставьте email, чтобы получить ранний доступ</p>
                </div>
                <div className="cta-highlights">
                  <span>⚡ Мгновенный доступ к разбору</span>
                  <span>🧠 Персональная траектория</span>
                  <span>🗂️ История прогресса</span>
                </div>
              </div>

              <form className="cta-form" onSubmit={handleSubmit}>
                <input
                  className="input"
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
                <button className="btn btn-accent" type="submit" disabled={submitting}>
                  {submitting ? 'Отправка...' : 'Начать сейчас'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="footer" data-animate>
        <div className="container footer-row">
          <div>© {new Date().getFullYear()} ИИ-репетитор</div>
          <div>
            <a href="#">Политика конфиденциальности</a> · <a href="#">Связаться</a> · <a href="#">Мы в соцсетях</a>
          </div>
      </div>
      </footer>
    </>
  )
}

export default App
