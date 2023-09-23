const medQuestions = {
    courtesy: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/courtesy--_gb_1.mp3',
    influence: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/influence--_gb_1.mp3',
    exhibit: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/exhibit--_gb_1.mp3',
    chrysanthemum: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/chrysanthemum--_gb_1.mp3',
    bureau: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bureau--_gb_1.mp3',
    havoc: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/havoc--_gb_1.mp3',
    foreknowledge:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/foreknowledge--_gb_1.mp3',
    scrimmage: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/scrimmage--_gb_1.mp3',
    polytheism: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/polytheism--_gb_1.mp3',
    decathlon: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/decathlon--_gb_1.mp3',
    parallel: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/parallel--_gb_1.mp3',
    exercise: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/exercise--_gb_1.mp3',
    slippery:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/slippery--_gb_1.mp3',
    muffin: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/muffin--_gb_1.mp3',
    management: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/managemnet--_gb_1.mp3',
    scenery: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/scenery--_gb_1.mp3',
    slumber: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/slumber--_gb_1.mp3',
    spacious: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/spacious--_gb_1.mp3',
    unknown: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/unknown--_gb_1.mp3',
    guarantee: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/guarantee--_gb_1.mp3',
}

const medHint = {
    courtesy : 'a polite speech or action, especially one required by convention',
    influence : 'the power to have an important effect on someone or something',
    exhibit : 'something presented formally and in a public setting',
    chrysanthemum : 'any of numerous perennial Old World herbs having showy brightly colored flower heads of the genera',
    bureau : 'an administrative unit of government',
    havoc : 'violent and needless disturbance',
    foreknowledge : 'knowledge of an event before it occurs',
    scrimmage : '(American football) practice play between a football teams squads',
    polytheism : 'belief in multiple gods',
    decathlon : 'an athletic contest consisting of ten different events',
    parallel : 'parallel means two lines that never intersect think of an equal sign',
    exercise : 'physical activity, like an exercise class, or the act of practicing anything',
    slippery : 'causing or tending to cause things to slip or slide',
    muffin : 'a sweet quick bread baked in a cup-shaped pan',
    management : 'the act of directing or controlling things',
    scenery : 'a word for how a place looks, especially a beautiful, outdoorsy place',
    slumber : 'be asleep',
    spacious : '(of buildings and rooms) having ample space',
    unknown : 'not known',
    guarantee : 'an unconditional commitment that something will happen or that something is true',
}


// Initializing element
const wrapper = document.getElementById('wrapper')
const main = document.getElementById('main')
const difficulty = document.getElementById('difficulty')
const audioSource = document.getElementById('audioSource')
const input = document.getElementById('answers')
const hintWrapper = document.getElementById('hintWrapper')
const hintBtn = document.getElementById('hint')
const hint = document.getElementById('showHint')
const scoreInfo = document.getElementById('scoreInfo')
let isLookAtHint = false

// init variable
const { values, keys } = Object
let audio
let currentQuestion = ''
let answers = ''
let diff = ''
let page = 1
let score = 0
const answered = []

// for the begining
wrapper.removeChild(main)

// For timer
let time = 5 // You can change the time here
let timeInMinutes = time * 60
let interval = null

/**
 * To start the timer
 */
const startTimer = () => {
  const timer = document.getElementById('timer')

  const minutes = Math.floor(timeInMinutes / 60)
  let seconds = timeInMinutes % 60

  timeInMinutes--
  timer.innerText = `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`

  if (timeInMinutes < 0) {
    clearInterval(interval)
  }
}

/**
 * Handling easy button click
 */
const handleMediumBtn = () => {
  wrapper.removeChild(difficulty)
  wrapper.append(main)
  diff = 'medium'

  runQuiz()
  interval = setInterval(startTimer, 1000)
}

/**
 * Handling show hint
 */
const showHint = () => {
  isLookAtHint = true
  hintWrapper.removeChild(hintBtn)
  switch(diff) {
    case 'medium': hint.innerHTML = `<b>Hint:</b> ${medHint[currentQuestion]}`
  }
}

/**
 * Running quiz
 */
const runQuiz = () => {
  const question = getDifficultyQuestion(diff)
  scoreInfo.innerText = `Your score: ${score}`
  switch(diff) {
    case 'medium': {
      currentQuestion = keys(medQuestions)[question]
    }
  }
}

const random = () => {
  return Math.floor(Math.random() * keys(medQuestions).length)
}
/**
 * Handling get question by difficulty
 * @returns {number}
 */
const getDifficultyQuestion = () => {
  let idx = random()

  // Filtering is the current question has passed yet
  const filterQuestion = answered.find(index => index === idx)
  if (page > 1 && filterQuestion !== undefined) {
    idx = random()
  }
  answered.push(idx)
  console.log(answered)

  switch(diff) {
    case 'medium': {
      audio = new Audio(values(medQuestions)[idx])
    }
  }

  return idx
}

/**
 * Handle play audio
 */
const playAudio = () => {
  audio.play()
}

/**
 * To handle on change
 * @param {Event} e
 */
const handleChange = (e) => {
  answers = e.target.value
}

/**
 * Handling submit
 * @param {Event} e
 */
const handleSubmit = (e) => {
  e.preventDefault()
  if (page < 10) {
    if (answers.toLowerCase() === currentQuestion.toLowerCase()) {
      alert('Bener cuy')
      score += 10
    } else {
      alert('Salah bro')
    }

    input.value = ''

    if (isLookAtHint) { // If user took a look at hint
      hintWrapper.removeChild(hint)
      hintWrapper.append(hintBtn)
      isLookAtHint = false
    }

    page++
    runQuiz()
    console.log(page, `Hasil score: ${score}`)
  }
}