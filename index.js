// TeaPlace: vanilla JS. Steep scene, nav, stamps, brew bench timer.

// PLACEHOLDER [STEEP TIME PER TEA]: not supplied by the owner, confirm before launch
// Seconds. The only supplied fact is "3 to 5 minutes". Drives the steep clock ticks,
// the cup labels and the collection TIME column.
const STEEP_TIMES = {
  sencha: 180,
  earl: 270,
  jasmine: 210,
  oolong: 240,
  matcha: 60,
  chamomile: 300,
}

const root = document.documentElement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const ease = (value) => value * value * (3 - 2 * value)
const formatTime = (seconds) => {
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}

for (const el of document.querySelectorAll('[data-steep-time]')) {
  const id = el.dataset.steepTime
  el.textContent = `${id === 'matcha' ? 'whisk ' : ''}${formatTime(STEEP_TIMES[id])}`
}
for (const cup of document.querySelectorAll('.cup[data-tea]')) {
  cup.dataset.ideal = String(STEEP_TIMES[cup.dataset.tea])
}

// ============================================
// Session date on the cupping sheet header
// ============================================
const sessionDate = document.getElementById('session-date')
if (sessionDate) {
  const today = new Date().toLocaleDateString('en-CA')
  sessionDate.textContent = today
  sessionDate.setAttribute('datetime', today)
}

// ============================================
// Nav: everything but the pill hides while scrolling down
// ============================================
const nav = document.getElementById('nav')
if (nav) {
  let lastY = window.scrollY
  const updateNav = () => {
    const y = window.scrollY
    if (y < 80) nav.classList.remove('is-condensed')
    else if (y > lastY + 4) nav.classList.add('is-condensed')
    else if (y < lastY - 4) nav.classList.remove('is-condensed')
    lastY = y
  }
  window.addEventListener('scroll', updateNav, { passive: true })
  nav.addEventListener('focusin', () => nav.classList.remove('is-condensed'))
  updateNav()
}

// ============================================
// The steep: a pinned scene driven by scroll progress.
// position: sticky pins the stage; scroll progress p (0 to 1) sets per-bowl
// CSS variables. No JS pin library is needed. Without JS, or under
// prefers-reduced-motion, the CSS shows six already-steeped bowls.
// ============================================
const steep = document.querySelector('[data-steep]')
if (steep) {
  const cups = Array.from(steep.querySelectorAll('.cup'))
  const clockEl = document.getElementById('steep-clock')
  const cueEl = steep.querySelector('.steep-cue')
  const STEEP_SECONDS = 300
  const GATHER_END = 0.1
  const CLOCK_START = 0.16
  const CLOCK_END = 0.94
  let queued = false

  const resetCups = () => {
    for (const cup of cups) {
      for (const name of ['--g', '--pour', '--b', '--vapor']) cup.style.removeProperty(name)
      cup.classList.remove('is-stamped')
    }
    steep.querySelector('.steep-cue')?.classList.remove('is-done')
  }

  const render = () => {
    queued = false
    if (!root.classList.contains('pin')) return
    const total = steep.offsetHeight - window.innerHeight
    const p = clamp(-steep.getBoundingClientRect().top / total)
    const t = clamp((p - CLOCK_START) / (CLOCK_END - CLOCK_START)) * STEEP_SECONDS
    const gather = ease(clamp(p / GATHER_END))
    cups.forEach((cup, i) => {
      const ideal = Number(cup.dataset.ideal)
      const pour = ease(clamp((p - GATHER_END - i * 0.008) / 0.05))
      const bloom = ease(clamp(t / ideal))
      cup.style.setProperty('--g', gather.toFixed(3))
      cup.style.setProperty('--pour', pour.toFixed(3))
      cup.style.setProperty('--b', (pour * bloom).toFixed(3))
      cup.style.setProperty('--vapor', (pour * 0.75).toFixed(3))
      cup.classList.toggle('is-stamped', t >= ideal)
    })
    if (clockEl) clockEl.textContent = formatTime(t)
    if (cueEl) cueEl.classList.toggle('is-done', p > 0.96)
  }

  const queue = () => {
    if (queued) return
    queued = true
    window.requestAnimationFrame(render)
  }

  const applyMode = () => {
    root.classList.toggle('pin', !reduceMotion.matches)
    if (reduceMotion.matches) resetCups()
    else render()
  }

  window.addEventListener('scroll', queue, { passive: true })
  window.addEventListener('resize', queue)
  reduceMotion.addEventListener('change', applyMode)
  applyMode()
}

// ============================================
// Scroll-driven fallbacks (contour draw, folded slip) where
// CSS animation-timeline is unsupported
// ============================================
if (!CSS.supports('animation-timeline', 'view()')) {
  root.classList.add('no-sda')
  const contour = document.getElementById('contour')
  const panels = document.querySelectorAll('.slip-panel')

  if (contour) {
    const draw = () => {
      if (reduceMotion.matches) {
        contour.style.setProperty('--draw', '1')
        return
      }
      const rect = contour.getBoundingClientRect()
      const progress = clamp((window.innerHeight * 0.7 - rect.top) / rect.height)
      contour.style.setProperty('--draw', progress.toFixed(3))
    }
    window.addEventListener('scroll', draw, { passive: true })
    window.addEventListener('resize', draw)
    draw()
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('is-open')
        }
      },
      { threshold: 0.3 }
    )
    for (const panel of panels) observer.observe(panel)
  } else {
    for (const panel of panels) panel.classList.add('is-open')
  }
}

// ============================================
// Collection: "Add" is a red stamp that presses in on click
// ============================================
const stamps = document.querySelectorAll('.stamp')
const tally = document.getElementById('tally')

const updateTally = () => {
  const count = document.querySelectorAll('.stamp[aria-pressed="true"]').length
  if (tally) tally.textContent = `${count} of ${stamps.length} stamped on your sheet.`
}

for (const stamp of stamps) {
  const label = stamp.querySelector('.stamp-label')
  stamp.addEventListener('click', () => {
    const on = stamp.getAttribute('aria-pressed') !== 'true'
    stamp.setAttribute('aria-pressed', String(on))
    if (label) label.textContent = on ? 'Stamped' : 'Add'
    stamp.classList.remove('is-pressing')
    void stamp.offsetWidth
    stamp.classList.add('is-pressing')
    updateTally()
  })
  stamp.addEventListener('animationend', () => stamp.classList.remove('is-pressing'))
}

// ============================================
// Newsletter (demo: no list is connected)
// ============================================
const newsForm = document.getElementById('news-form')
const newsStatus = document.getElementById('news-status')
if (newsForm && newsStatus) {
  newsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const email = newsForm.querySelector('input')
    if (!email.checkValidity()) {
      newsStatus.textContent = 'Enter a valid email address.'
      email.focus()
      return
    }
    newsStatus.textContent = 'Noted. This demo has no mailing list connected.'
    newsForm.reset()
  })
}

// ============================================
// Brew bench: tea picker, leaf ratio and steep timer.
// Ratio (2g per 8oz), temperatures and the 3-5 minute steep come from the
// brewing guide; teas, prices and descriptions mirror the collection.
// ============================================
const benchRoot = document.getElementById('bench-root')

if (benchRoot) {
  const GRAMS_PER_8OZ = 2
  const STEEP_SECONDS = 300
  const WINDOW_OPEN_SECONDS = 180
  const RING = 2 * Math.PI * 100

  const teaInputs = benchRoot.querySelectorAll('input[name="bench-tea"]')
  const nameEl = document.getElementById('bench-name')
  const descEl = document.getElementById('bench-desc')
  const tempEl = document.getElementById('bench-temp')
  const gramsEl = document.getElementById('bench-grams')
  const ozEl = document.getElementById('bench-oz')
  const ozNoteEl = document.getElementById('bench-oz-note')
  const cupInput = document.getElementById('bench-cup')
  const statusEl = document.getElementById('bench-status')
  const timeEl = document.getElementById('dial-time')
  const ringEl = document.getElementById('dial-progress')
  const startBtn = document.getElementById('dial-start')
  const resetBtn = document.getElementById('dial-reset')

  let elapsed = 0
  let startedAt = 0
  let timer = null
  let announced = 0

  const renderRatio = () => {
    const oz = Number(cupInput.value)
    const grams = (oz / 8) * GRAMS_PER_8OZ
    gramsEl.textContent = String(Number(grams.toFixed(2)))
    ozEl.textContent = `${oz} oz`
    ozNoteEl.textContent = String(oz)
  }

  const renderTea = () => {
    const picked = benchRoot.querySelector('input[name="bench-tea"]:checked')
    if (!picked) return
    nameEl.textContent = picked.value
    descEl.textContent = picked.dataset.desc
    tempEl.textContent = picked.dataset.temp
  }

  const renderTimer = () => {
    timeEl.textContent = formatTime(elapsed)
    ringEl.style.strokeDashoffset = String(RING * (1 - Math.min(elapsed / STEEP_SECONDS, 1)))
  }

  function stop() {
    if (timer) window.clearInterval(timer)
    timer = null
  }

  const tick = () => {
    elapsed = Math.min((performance.now() - startedAt) / 1000, STEEP_SECONDS)
    renderTimer()
    if (elapsed >= WINDOW_OPEN_SECONDS && announced < 1) {
      announced = 1
      statusEl.textContent = 'Steep window open: 3 to 5 minutes.'
    }
    if (elapsed >= STEEP_SECONDS) {
      announced = 2
      stop()
      statusEl.textContent = 'Five minutes. Strain and serve warm.'
      startBtn.textContent = 'Start'
      startBtn.disabled = true
    }
  }

  startBtn.addEventListener('click', () => {
    if (timer) {
      stop()
      startBtn.textContent = 'Resume'
      return
    }
    startedAt = performance.now() - elapsed * 1000
    timer = window.setInterval(tick, 250)
    startBtn.textContent = 'Pause'
    if (announced === 0) statusEl.textContent = 'Steeping.'
  })

  resetBtn.addEventListener('click', () => {
    stop()
    elapsed = 0
    announced = 0
    startBtn.disabled = false
    startBtn.textContent = 'Start'
    statusEl.textContent = '2g of leaves per 8oz water. Press start to steep.'
    renderTimer()
  })

  for (const input of teaInputs) input.addEventListener('change', renderTea)
  cupInput.addEventListener('input', renderRatio)

  renderTea()
  renderRatio()
  renderTimer()
}
