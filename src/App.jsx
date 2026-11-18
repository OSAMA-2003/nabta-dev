

import { useState } from 'react'

const crops = ['قمح', 'ذرة', 'طماطم', 'فراولة']
const cities = ['القاهرة', 'الإسكندرية', 'المنيا', 'أسيوط', 'قنا']

function App() {
  const [screen, setScreen] = useState(() => window.location.hash === '#login' ? 'login' : 'signup')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const account = Object.fromEntries(formData.entries())
    localStorage.setItem('nabta-account', JSON.stringify(account))
    setSubmitted(true)
  }

  function openScreen(nextScreen) {
    setScreen(nextScreen)
    setSubmitted(false)
    window.history.replaceState(null, '', `#${nextScreen}`)
  }

  return (
    <main className="page-shell">
      <section className={`registration-card ${screen === 'login' ? 'login-card' : ''}`} dir="rtl">
        <div className="hero-panel">
          <div className="hero-overlay" />
          <header className="hero-header">
            <span className="hero-logo">
              <span className="leaf-mark">ن</span>
              <span>نبتة</span>
            </span>
            <button className="language-button" type="button" aria-label="تغيير اللغة">
              <span>AR</span>
              <span className="chevron">⌄</span>
            </button>
          </header>

          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              منصة المزارعين الذكية
            </div>
            <h1>ازرع بثقة، وتسوق أفضل المحاصيل الزراعية</h1>
            <p>
              نعمل لتطوير القطاع الزراعي في مصر من خلال تقديم حلول مبتكرة تساعد
              المزارع وتحسن جودة المحاصيل وتسهل الوصول للأسواق المستهدفة
            </p>

            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">◉</div>
                <strong>نبتة الذكية</strong>
                <span>تساعدك ببناء مزرعتك رقمياً</span>
              </div>
              <div className="feature">
                <div className="feature-icon">⌁</div>
                <strong>مزارع ومشاتل</strong>
                <span>نلتقي بك بأفضل الموردين</span>
              </div>
              <div className="feature">
                <div className="feature-icon">◎</div>
                <strong>أسواق مميزة</strong>
                <span>توصيل مباشر للسوق</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-panel">
          {screen === 'login' ? (
            <LoginForm onOpenSignup={() => openScreen('signup')} />
          ) : submitted ? (
            <div className="success-message" role="status">
              <div className="success-icon">✓</div>
              <h3>تم إنشاء حسابك بنجاح</h3>
              <p>يمكنك الآن تسجيل الدخول باستخدام رقم هاتفك وكلمة المرور.</p>
              <button type="button" onClick={() => openScreen('login')}>تسجيل الدخول</button>
            </div>
          ) : (
            <SignupForm onSubmit={handleSubmit} onOpenLogin={() => openScreen('login')} />
          )}
        </div>
      </section>
    </main>
  )
}

function LoginForm({ onOpenSignup }) {
  const [loggedIn, setLoggedIn] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoggedIn(true)
  }

  if (loggedIn) {
    return (
      <div className="success-message" role="status">
        <div className="success-icon">✓</div>
        <h3>مرحباً بك في نبتة</h3>
        <p>تم تسجيل دخولك بنجاح.</p>
        <button type="button" onClick={() => setLoggedIn(false)}>تسجيل الخروج</button>
      </div>
    )
  }

  return (
    <>
      <div className="form-heading">
        <h2>تسجيل الدخول</h2>
        <p>مرحباً بعودتك إلى نبتة</p>
      </div>
      <form onSubmit={handleLogin}>
        <label className="field">
          <span>رقم الهاتف المحمول</span>
          <input name="phone" type="tel" placeholder="01XXXXXXXXX" required />
        </label>
        <label className="field">
          <span>كلمة المرور</span>
          <input name="password" type="password" placeholder="أدخل كلمة المرور" required />
        </label>
        <div className="login-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>تذكرني</span>
          </label>
          <a href="#forgot-password">نسيت كلمة المرور؟</a>
        </div>
        <button className="submit-button" type="submit">تسجيل الدخول</button>
        <p className="login-link">ليس لديك حساب؟ <button type="button" className="text-link" onClick={onOpenSignup}>إنشاء حساب جديد</button></p>
      </form>
    </>
  )
}

function SignupForm({ onSubmit, onOpenLogin }) {
  return (
    <>
      <div className="form-heading">
        <h2>إنشاء حساب جديد</h2>
        <p>ابدأ رحلتك معنا في عالم الزراعة الذكية بسهولة</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="type-switch" role="radiogroup" aria-label="نوع الحساب">
          <label>
            <input type="radio" name="accountType" value="farmer" defaultChecked />
            <span>مزارع</span>
          </label>
          <label>
            <input type="radio" name="accountType" value="company" />
            <span>شركة أو مصنع</span>
          </label>
        </div>

        <label className="field">
          <span>الاسم الكامل</span>
          <input name="name" type="text" placeholder="اكتب اسمك" required />
        </label>

        <label className="field">
          <span>رقم الهاتف المحمول</span>
          <input name="phone" type="tel" placeholder="01XXXXXXXXX" required />
        </label>

        <label className="field">
          <span>الرقم القومي</span>
          <input name="nationalId" type="text" inputMode="numeric" placeholder="أدخل الرقم القومي" required />
        </label>

        <label className="field">
          <span>كلمة المرور</span>
          <input name="password" type="password" placeholder="أدخل كلمة المرور" required />
        </label>

        <div className="field-row">
          <label className="field">
            <span>المحافظة</span>
            <select name="city" required defaultValue="">
              <option value="" disabled>اختر المحافظة</option>
              {cities.map((city) => <option key={city}>{city}</option>)}
            </select>
          </label>
          <label className="field">
            <span>المحصول الرئيسي</span>
            <select name="crop" required defaultValue="">
              <option value="" disabled>اختر المحصول</option>
              {crops.map((crop) => <option key={crop}>{crop}</option>)}
            </select>
          </label>
        </div>

        <label className="terms">
          <input type="checkbox" required />
          <span>
            الموافقة على <a href="#terms">الشروط والأحكام</a> و<span className="privacy">سياسة الخصوصية</span>
          </span>
        </label>

        <button className="submit-button" type="submit">إنشاء حساب جديد</button>
        <p className="login-link">هل لديك حساب؟ <button type="button" className="text-link" onClick={onOpenLogin}>تسجيل الدخول</button></p>
      </form>
    </>
  )
}

export default App
