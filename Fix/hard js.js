const hardQuestion = {
    espionage: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/espionage--_gb_1.mp3',
    hazardous: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hazardous--_gb_1.mp3',
    facsimile: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/facsimile--_gb_1.mp3',
    magnanimous: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/magnanimous--_gb_1.mp3',
    nonchalance: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nonchalance--_gb_1.mp3',
    onomatopoeia: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/onomatopoeia--_gb_1.mp3',
    pandemonium: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/pandemonium--_gb_1.mp3',
    philanthropist: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/philanthropist--_gb_1.mp3',
    feasibility: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/feasibility--_gb_1.mp3',
    handkerchief: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/handkerchief--_gb_1.mp3',
    incandescent: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/incandescent--_gb_1.mp3',
    blasphemous: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/blasphemous--_gb_1.mp3',
    expediency: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/expediency--_gb_1.mp3',
    irreconcilable: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/irreconcilable--_gb_1.mp3',
    nausea: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nausea--_gb_1.mp3',
    notoriety: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/notoriety--_gb_1.mp3',
    omnipotent: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/omnipotent--_gb_1.mp3',
    patriarch: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/patriarch--_gb_1.mp3',
    idiosyncrasy: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/idiosyncrasy--_gb_1.mp3',
    fallacy: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fallacy--_gb_1.mp3',
}

const hardHint = {
    espionage :  'the systematic use of spies to get military or political secrets',
    hazardous : 'involving risk or danger',
    facsimile :  'a copy or reproduction of something',
    magnanimous : 'person has a generous spirit',
    nonchalance :  'a casual lack of concern, a relaxed state without anxiety or enthusiasm',
    onomatopoeia : 'using words that imitate the sound they denote',
    pandemonium : 'a state of extreme confusion and disorder',
    philanthropist : 'a person who gives money or gifts to charities, or helps needy people in other ways',
    feasibility : 'the quality of being doable',
    handkerchief : 'a square piece of cloth used for wiping the eyes or nose or as a costume accessory',
    incandescent: 'emitting light as a result of being heated',
    blasphemous : 'sacrilegious against God or sacred things; profane',
    expediency : 'the quality of being convenient and practical despite possibly being improper',
    irreconcilable : 'any of two or more ideas, facts, or statements that cannot be made compatible',
    nausea : 'a feeling of sickness with an inclination to vomit',
    notoriety : 'the state of being famous or well known for some bad quality or deed',
    omnipotent : 'having unlimited power; able to do anything', 
    patriarch : 'the male head of a family or tribe',
    idiosyncrasy : 'a mode of behaviour or way of thought peculiar to an individual',
    fallacy :  'mistaken belief, especially one based on unsound argument',
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
   * Handling hard button click
   */
  const handleHardBtn = () => {
    wrapper.removeChild(difficulty)
    wrapper.append(main)
    diff = 'hard'
  
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
      case 'hard': hint.innerHTML = `<b>Hint:</b> ${hardHint[currentQuestion]}`
    }
  }
  
  /**
   * Running quiz
   */
  const runQuiz = () => {
    const question = getDifficultyQuestion(diff)
    scoreInfo.innerText = `Your score: ${score}`
    switch(diff) {
      case 'hard': {
        currentQuestion = keys(hardQuestion)[question]
      }
    }
  }
  
  const random = () => {
    return Math.floor(Math.random() * keys(hardQuestion).length)
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
      case 'hard': {
        audio = new Audio(values(hardQuestion)[idx])
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