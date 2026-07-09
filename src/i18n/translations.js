// UI string dictionary. Rich lesson/simulation content is stored bilingually
// in the entities themselves; this covers the app "chrome" (nav, buttons, headings).
// Use flat dotted keys. Access via the `t(key, vars)` helper from useLanguage().

export const translations = {
  en: {
    // App
    'app.name': 'Ready4Work',
    'app.tagline': 'Practice real job skills',

    // Nav
    'nav.home': 'Home',
    'nav.simulator': 'Practice',
    'nav.lessons': 'Lessons',
    'nav.interview': 'Interview',
    'nav.speaking': 'Speaking',
    'nav.tracks': 'Tracks',

    // Language selector
    'lang.label': 'Language',

    // Home
    'home.welcome': 'Welcome back, {name} 👋',
    'home.subtitle': 'Ready to practice for work today?',
    'home.jobReadiness': 'Job Readiness',
    'home.dayStreak': 'Day Streak',
    'home.quickStart': 'Quick Start',
    'home.jobSimulator': 'Job Simulator',
    'home.jobSimulatorDesc': 'Step into a real shift and make the calls',
    'home.todaysLesson': "Today's Lesson",
    'home.interviewPrep': 'Interview Prep',
    'home.speakingPractice': 'Speaking',
    'home.tryASimulation': 'Try a Simulation',
    'home.chooseAScenario': 'Pick a scenario and practice on the job',
    'home.yourJobTrack': 'Your Job Track',
    'home.seeAll': 'See All',
    'home.keepGoing': 'Keep Going',
    'home.continueLessons': 'Continue your lessons →',
    'home.lessonsComplete': '{done} of {total} lessons complete',

    // Readiness labels
    'readiness.startingOut': 'Starting Out',
    'readiness.building': 'Building Foundations',
    'readiness.growing': 'Growing Confidence',
    'readiness.nearly': 'Nearly Ready',
    'readiness.ready': 'Interview Ready',
    'readiness.jobReady': 'Job Ready!',

    // Simulator
    'sim.title': 'Job Simulator',
    'sim.subtitle': 'Real workplace scenarios. Your choices, real consequences.',
    'sim.allTracks': 'All',
    'sim.scenarios': 'scenarios',
    'sim.startScenario': 'Start Scenario',
    'sim.replay': 'Try Again',
    'sim.backToScenarios': 'Back to Scenarios',
    'sim.chooseResponse': 'Choose your response',
    'sim.you': 'You',
    'sim.scene': 'Step {current} of {total}',
    'sim.continue': 'Continue',
    'sim.finish': 'See Results',
    'sim.completed': 'Completed',
    'sim.newBadge': 'NEW',
    'sim.voiceBadge': 'Voice',

    // Speaking challenges
    'sim.speakChallenge': 'Say it out loud',
    'sim.tapToSpeak': 'Tap to speak',
    'sim.listening': 'Listening… tap to stop',
    'sim.heardYou': 'What we heard',
    'sim.checkAnswer': 'Check my answer',
    'sim.retrySpeak': 'Try again',
    'sim.speakPass': 'Pass — great answer!',
    'sim.speakPartial': 'Almost — you covered some of it',
    'sim.speakFail': 'Not yet — give it another go',
    'sim.youCovered': 'You covered: {items}',
    'sim.youMissed': 'Still missing: {items}',
    'sim.showExample': 'Example answer',
    'sim.micError': "We couldn't hear you. Check your microphone permission and try again.",
    'sim.speechUnsupported': 'Voice practice needs Chrome',
    'sim.speechUnsupportedBody': "This browser can't listen to your voice. Read the example answer out loud to practise, then continue.",
    'sim.iPractised': 'I said it out loud',
    'sim.practisedAloud': 'Practised out loud',

    // Difficulty
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',

    // Results
    'result.title': 'Shift Complete',
    'result.yourScore': 'Your Score',
    'result.rating.great': 'Outstanding!',
    'result.rating.ok': 'Good effort',
    'result.rating.poor': 'Keep practising',
    'result.takeaways': 'Key Takeaways',
    'result.tryAgain': 'Try Again',
    'result.nextScenario': 'Next Scenario',
    'result.tipLabel': 'Coach',

    // Tracks
    'track.hospitality': 'Hospitality',
    'track.callcenter': 'Call Center',
    'track.retail': 'Retail',
    'track.jobhunt': 'Stay Safe',

    // Listening
    'listen.play': 'Listen',
    'listen.stop': 'Stop',

    // Confidence meter
    'confidence.title': 'How confident do you feel?',
    'confidence.1': 'Not yet',
    'confidence.2': 'Getting there',
    'confidence.3': 'Okay',
    'confidence.4': 'Confident',
    'confidence.5': 'Nailed it',

    // Quiz
    'quiz.correct': '✓ Correct!',
    'quiz.wrong': '✗ Not quite.',
    'quiz.tryAgain': 'Try Again',

    // Certificate
    'cert.back': 'Back',
    'cert.certTitle': 'Certificate of Completion',
    'cert.programme': 'Job Readiness Programme',
    'cert.awardedTo': 'This certifies that',
    'cert.completedText': 'has completed the Ready4Work job readiness programme: workplace lessons, interview practice, live job simulations and speaking practice.',
    'cert.signature': 'Programme Facilitator',
    'cert.lockedTitle': 'Your certificate is waiting',
    'cert.lockedBody': 'Reach {target}% Job Readiness to unlock your certificate. You are at {current}%. Keep practising!',
    'cert.keepPractising': 'Keep Practising',
    'cert.unlockedTitle': 'You earned your certificate!',
    'cert.unlockedBody': 'Save it, share it, or show it to your counsellor.',
    'cert.download': 'Save as Image',
    'cert.share': 'Share',
    'cert.homeUnlocked': 'Your certificate is ready! 🎉',
    'cert.homeUnlockedSub': 'Tap to view, save and share it',
    'cert.homeLocked': 'Certificate',
    'cert.homeLockedSub': 'Reach {target}% Job Readiness to unlock it',

    // Registration
    'register.title': 'Welcome to Ready4Work',
    'register.subtitle': 'Practice job skills and interviews — no data, no WiFi needed.',
    'register.namePlaceholder': 'Enter your first name',
    'register.button': 'Start Learning',
  },

  zu: {
    // App
    'app.name': 'Ready4Work',
    'app.tagline': 'Zilolonge amakhono omsebenzi',

    // Nav
    'nav.home': 'Ikhaya',
    'nav.simulator': 'Ukuzilolonga',
    'nav.lessons': 'Izifundo',
    'nav.interview': 'Inhlolokhono',
    'nav.speaking': 'Ukukhuluma',
    'nav.tracks': 'Imikhakha',

    // Language selector
    'lang.label': 'Ulimi',

    // Home
    'home.welcome': 'Siyakwamukela futhi, {name} 👋',
    'home.subtitle': 'Ulungele ukuzilolongela umsebenzi namuhla?',
    'home.jobReadiness': 'Ukulungela Umsebenzi',
    'home.dayStreak': 'Izinsuku Ngokulandelana',
    'home.quickStart': 'Qala Ngokushesha',
    'home.jobSimulator': 'Isimo Somsebenzi',
    'home.jobSimulatorDesc': 'Ngena eshifthini yangempela wenze izinqumo',
    'home.todaysLesson': 'Isifundo Sanamuhla',
    'home.interviewPrep': 'Ukulungiselela Inhlolokhono',
    'home.speakingPractice': 'Ukukhuluma',
    'home.tryASimulation': 'Zama Isimo',
    'home.chooseAScenario': 'Khetha isimo uzilolongele umsebenzi',
    'home.yourJobTrack': 'Umkhakha Wakho Womsebenzi',
    'home.seeAll': 'Bona Konke',
    'home.keepGoing': 'Qhubeka',
    'home.continueLessons': 'Qhubeka nezifundo zakho →',
    'home.lessonsComplete': 'Izifundo ezingu-{done} kwezingu-{total} ziqediwe',

    // Readiness labels
    'readiness.startingOut': 'Uyaqala',
    'readiness.building': 'Wakha Isisekelo',
    'readiness.growing': 'Ukhula Ngokuzethemba',
    'readiness.nearly': 'Usucishe Walungela',
    'readiness.ready': 'Ulungele Inhlolokhono',
    'readiness.jobReady': 'Ulungele Umsebenzi!',

    // Simulator
    'sim.title': 'Isimo Somsebenzi',
    'sim.subtitle': 'Izimo zangempela zomsebenzi. Izinqumo zakho, imiphumela yangempela.',
    'sim.allTracks': 'Konke',
    'sim.scenarios': 'izimo',
    'sim.startScenario': 'Qala Isimo',
    'sim.replay': 'Zama Futhi',
    'sim.backToScenarios': 'Buyela Ezimeni',
    'sim.chooseResponse': 'Khetha impendulo yakho',
    'sim.you': 'Wena',
    'sim.scene': 'Isinyathelo {current} kwezingu-{total}',
    'sim.continue': 'Qhubeka',
    'sim.finish': 'Bona Imiphumela',
    'sim.completed': 'Kuqediwe',
    'sim.newBadge': 'OKUSHA',
    'sim.voiceBadge': 'Izwi',

    // Speaking challenges
    'sim.speakChallenge': 'Kusho ngokuzwakalayo',
    'sim.tapToSpeak': 'Thepha ukuze ukhulume',
    'sim.listening': 'Siyalalela… thepha ukuze ume',
    'sim.heardYou': 'Esikuzwile',
    'sim.checkAnswer': 'Hlola impendulo yami',
    'sim.retrySpeak': 'Zama futhi',
    'sim.speakPass': 'Uphumelele — impendulo enhle!',
    'sim.speakPartial': 'Cishe — ukhavule okunye kwakho',
    'sim.speakFail': 'Hhayi okwamanje — zama futhi',
    'sim.youCovered': 'Ukhavule: {items}',
    'sim.youMissed': 'Okusasilele: {items}',
    'sim.showExample': 'Impendulo eyisibonelo',
    'sim.micError': 'Asikuzwanga. Hlola imvume yemakrofoni yakho bese uzama futhi.',
    'sim.speechUnsupported': 'Ukuzilolonga ngezwi kudinga i-Chrome',
    'sim.speechUnsupportedBody': 'Lesi siphequluli asikwazi ukulalela izwi lakho. Funda impendulo eyisibonelo ngokuzwakalayo ukuze uzilolonge, bese uqhubeka.',
    'sim.iPractised': 'Ngikushilo ngokuzwakalayo',
    'sim.practisedAloud': 'Kuzilolongwe ngokuzwakalayo',

    // Difficulty
    'difficulty.beginner': 'Osaqalayo',
    'difficulty.intermediate': 'Ophakathi',
    'difficulty.advanced': 'Osethuthukile',

    // Results
    'result.title': 'Ishifthi Iqediwe',
    'result.yourScore': 'Amaphuzu Akho',
    'result.rating.great': 'Uhambe kahle kakhulu!',
    'result.rating.ok': 'Umzamo omuhle',
    'result.rating.poor': 'Qhubeka nokuzilolonga',
    'result.takeaways': 'Izifundo Ezibalulekile',
    'result.tryAgain': 'Zama Futhi',
    'result.nextScenario': 'Isimo Esilandelayo',
    'result.tipLabel': 'Umeluleki',

    // Tracks
    'track.hospitality': 'Ezokungenisa Izivakashi',
    'track.callcenter': 'Isikhungo Samakholi',
    'track.retail': 'Ezokuthengisa',
    'track.jobhunt': 'Hlala Uphephile',

    // Listening
    'listen.play': 'Lalela',
    'listen.stop': 'Misa',

    // Confidence meter
    'confidence.title': 'Uzizwa uzethemba kangakanani?',
    'confidence.1': 'Hhayi okwamanje',
    'confidence.2': 'Ngisendleleni',
    'confidence.3': 'Kulungile',
    'confidence.4': 'Ngizethemba',
    'confidence.5': 'Ngikwazile!',

    // Quiz
    'quiz.correct': '✓ Kulungile!',
    'quiz.wrong': '✗ Akulona ncamashi.',
    'quiz.tryAgain': 'Zama Futhi',

    // Certificate
    'cert.back': 'Emuva',
    'cert.certTitle': 'Isitifiketi Sokuqedela',
    'cert.programme': 'Uhlelo Lokulungela Umsebenzi',
    'cert.awardedTo': 'Lokhu kuqinisekisa ukuthi',
    'cert.completedText': 'uqedele uhlelo lwe-Ready4Work lokulungela umsebenzi: izifundo zasemsebenzini, ukuzilolongela inhlolokhono, izimo zomsebenzi bukhoma nokuzilolonga ukukhuluma.',
    'cert.signature': 'Umgqugquzeli Wohlelo',
    'cert.lockedTitle': 'Isitifiketi sakho silindile',
    'cert.lockedBody': 'Finyelela ku-{target}% Wokulungela Umsebenzi ukuze uvule isitifiketi sakho. Uku-{current}%. Qhubeka nokuzilolonga!',
    'cert.keepPractising': 'Qhubeka Nokuzilolonga',
    'cert.unlockedTitle': 'Usizuzile isitifiketi sakho!',
    'cert.unlockedBody': 'Sigcine, sabelane ngaso, noma usikhombise umeluleki wakho.',
    'cert.download': 'Gcina Njengesithombe',
    'cert.share': 'Yabelana',
    'cert.homeUnlocked': 'Isitifiketi sakho sesilungile! 🎉',
    'cert.homeUnlockedSub': 'Thepha ukuze usibone, usigcine futhi wabelane ngaso',
    'cert.homeLocked': 'Isitifiketi',
    'cert.homeLockedSub': 'Finyelela ku-{target}% Wokulungela Umsebenzi ukuze usivule',

    // Registration
    'register.title': 'Siyakwamukela ku-Ready4Work',
    'register.subtitle': 'Zilolonge amakhono omsebenzi nezinhlolokhono — akudingeki idatha noma i-WiFi.',
    'register.namePlaceholder': 'Faka igama lakho lokuqala',
    'register.button': 'Qala Ukufunda',
  },
}
