

import { useState } from 'react'

const crops = ['قمح', 'ذرة', 'طماطم', 'فراولة']
const cities = ['القاهرة', 'الإسكندرية', 'المنيا', 'أسيوط', 'قنا']

function App() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page-shell">
      <section className="registration-card" dir="rtl">
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
          <div className="form-heading">
            <h2>إنشاء حساب جديد</h2>
            <p>ابدأ رحلتك معنا في عالم الزراعة الذكية بسهولة</p>
          </div>

          {submitted ? (
            <div className="success-message" role="status">
              <div className="success-icon">✓</div>
              <h3>تم إنشاء حسابك بنجاح</h3>
              <p>سيتم التواصل معك قريباً لإكمال الخطوات.</p>
              <button type="button" onClick={() => setSubmitted(false)}>إنشاء حساب آخر</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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

              <p className="login-link">هل لديك حساب؟ <a href="#login">تسجيل الدخول</a></p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
