// Branching, choice-based job simulations. Every player-facing string is stored
// bilingually as { en, zu } and resolved at render time via the L() helper.
//
// Model: each simulation has an ordered list of `scenes`. A scene shows what an
// NPC (guest / caller / customer) says, then offers 3 `choices`. Each choice has
// a point value (10 = ideal, 5 = acceptable, 0 = poor), an in-character `reaction`
// from the NPC, and a coaching `tip`. Scenes are scored and run in order; the
// running total drives a satisfaction meter and the end-of-shift debrief.

export const TRACKS = {
  HOSPITALITY: 'Hospitality',
  CALL_CENTER: 'Call Center',
  RETAIL: 'Retail',
  JOB_HUNT: 'Job Hunting',
}

export const TRACK_META = {
  [TRACKS.HOSPITALITY]: {
    emoji: '🍽️',
    labelKey: 'track.hospitality',
    color: 'bg-amber-500',
    tint: 'bg-amber-50 text-amber-700',
  },
  [TRACKS.CALL_CENTER]: {
    emoji: '🎧',
    labelKey: 'track.callcenter',
    color: 'bg-blue-500',
    tint: 'bg-blue-50 text-blue-700',
  },
  [TRACKS.RETAIL]: {
    emoji: '🛍️',
    labelKey: 'track.retail',
    color: 'bg-violet-500',
    tint: 'bg-violet-50 text-violet-700',
  },
  [TRACKS.JOB_HUNT]: {
    emoji: '🛡️',
    labelKey: 'track.jobhunt',
    color: 'bg-red-500',
    tint: 'bg-red-50 text-red-700',
  },
}

const YOU = { en: 'You', zu: 'Wena' }
const GUEST = { en: 'Guest', zu: 'Isivakashi' }
const CALLER = { en: 'Caller', zu: 'Ikhasimende' }
const CUSTOMER = { en: 'Customer', zu: 'Ikhasimende' }
const INTERVIEWER = { en: 'Interviewer', zu: 'Umhloli' }

export const simulations = [
  // ══════════════════════════════════════════════════════════════════════════
  // HOSPITALITY 1 — The Dinner Rush
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-hosp-1',
    track: TRACKS.HOSPITALITY,
    emoji: '🍽️',
    difficulty: 'beginner',
    title: { en: 'The Dinner Rush', zu: 'Ukuxina Kwesidlo Sakusihlwa' },
    role: { en: 'You are a waiter on a full Friday night.', zu: 'Ungumphakeli wokudla ngobusuku bangoLwesihlanu obuxinene.' },
    meterLabel: { en: 'Guest Satisfaction', zu: 'Ukwaneliseka Kwesivakashi' },
    setting: {
      en: 'The restaurant is packed. A couple has just been seated at table 4. You walk over to greet them.',
      zu: 'Indawo yokudlela igcwele. Kunesithandani esisanda kuhlaliswa etafuleni 4. Uyaqonda kubo ukuze ubabingelele.',
    },
    scenes: [
      {
        speaker: GUEST,
        speakerEmoji: '🧑‍🤝‍🧑',
        says: {
          en: 'The couple settles in and glances up at you as you approach.',
          zu: 'Isithandani siyahlala bese sikubuka njengoba usondela.',
        },
        choices: [
          {
            text: { en: 'Good evening, welcome! Have you dined with us before?', zu: 'Sanibonani, siyanamukela! Nake nadla nathi ngaphambili?' },
            points: 10,
            reaction: { en: 'They smile. "First time, actually — it looks lovely in here."', zu: 'Bayamamatheka. "Okokuqala nje — kubukeka kuhle lapha."' },
            tip: { en: 'A warm greeting within 30 seconds sets the tone for the whole meal.', zu: 'Ukubingelela ngomusa ngaphakathi kwemizuzwana engu-30 kubeka isimo sesidlo sonke.' },
          },
          {
            text: { en: 'Table for two?', zu: 'Itafula labantu ababili?' },
            points: 5,
            reaction: { en: 'They nod politely, but the greeting felt a little flat.', zu: 'Bayavuma ngenhlonipho, kodwa ukubingelela bekungenampilo kangako.' },
            tip: { en: "It works, but leading with warmth beats leading with logistics.", zu: 'Kuyasebenza, kodwa ukuqala ngomusa kungcono kunokuqala ngezinhlelo.' },
          },
          {
            text: { en: 'Give me a minute, I\'m very busy right now.', zu: 'Nginikeni umzuzu, ngimatasa kakhulu njengamanje.' },
            points: 0,
            reaction: { en: 'Their smiles fade. They feel unwelcome already.', zu: 'Ukumamatheka kwabo kuyanyamalala. Sebezizwa bengamukelekile.' },
            tip: { en: 'Never make a guest feel like a burden. A quick "I\'ll be right with you" is enough.', zu: 'Ungalokothi wenze isivakashi sizizwe singumthwalo. Ukuthi "Ngizoba nani manje" kwanele.' },
          },
        ],
      },
      {
        speaker: GUEST,
        speakerEmoji: '🧑‍🤝‍🧑',
        says: {
          en: '"We\'re ready to order. I\'ll have the grilled chicken — but I\'m allergic to nuts. Is that safe?"',
          zu: '"Sesikulungele ukuoda. Ngizothatha inkukhu eyosiwe — kodwa nginokungezwani namantongomane. Kuphephile lokho?"',
        },
        choices: [
          {
            text: { en: "That\'s important — let me check with the kitchen to be completely sure before you order.", zu: 'Lokho kubalulekile — ake ngihlole nasekhishini ukuze ngiqiniseke ngokugcwele ngaphambi kokuba uode.' },
            points: 10,
            reaction: { en: '"Thank you, I really appreciate you taking it seriously."', zu: '"Ngiyabonga, ngiyakwazisa ngempela ukuthi ukuthathe ngokungathi sína."' },
            tip: { en: 'Allergies are a safety issue. Always verify — never guess.', zu: 'Ukungezwani nokudla kuyindaba yokuphepha. Hlola njalo — ungaqagelí.' },
          },
          {
            text: { en: "I think the chicken is fine, you should be okay.", zu: 'Ngicabanga ukuthi inkukhu ilungile, kufanele ube right.' },
            points: 0,
            reaction: { en: 'They look worried. "You think? I could get very sick."', zu: 'Babukeka bekhathazekile. "Ucabanga? Ngingagula kakhulu."' },
            tip: { en: 'Guessing about an allergy can send someone to hospital. Always confirm with the kitchen.', zu: 'Ukuqagela ngokungezwani nokudla kungathumela umuntu esibhedlela. Qinisekisa njalo ekhishini.' },
          },
          {
            text: { en: "We can\'t guarantee anything, order at your own risk.", zu: 'Asikwazi ukuqinisekisa lutho, oda ngengozi yakho.' },
            points: 5,
            reaction: { en: '"Oh... okay." They seem uneasy and a bit put off.', zu: '"O... kulungile." Babonakala bengakhululekile futhi bexwayile.' },
            tip: { en: 'Honesty is good, but check the facts first instead of pushing the risk onto the guest.', zu: 'Ukwethembeka kuhle, kodwa hlola amaqiniso kuqala esikhundleni sokubeka ingozi phezu kwesivakashi.' },
          },
        ],
      },
      {
        speaker: GUEST,
        speakerEmoji: '😠',
        says: {
          en: 'At table 7, another guest waves you over. "Excuse me — my food has been sitting here cold for ten minutes."',
          zu: 'Etafuleni 7, esinye isivakashi siyakubiza. "Uxolo — ukudla kwami sekuhlezi lapha kubanda imizuzu eyishumi."',
        },
        choices: [
          {
            text: { en: "I\'m so sorry — let me take this back and get you a hot plate right away.", zu: 'Ngiyaxolisa kakhulu — ake ngikususe lokhu ngikulethele okushisayo ngokushesha.' },
            points: 10,
            reaction: { en: 'They relax a little. "Thank you, I appreciate that."', zu: 'Bayakhululeka kancane. "Ngiyabonga, ngiyakwazisa lokho."' },
            tip: { en: 'Apologise first, act fast. Do not explain why the kitchen was slow — just fix it.', zu: 'Xolisa kuqala, usheshe wenze. Ungachazi ukuthi kungani ikhishi belihamba kancane — kulungise nje.' },
          },
          {
            text: { en: 'The kitchen is really busy tonight, everyone is waiting.', zu: 'Ikhishi limatasa kakhulu namuhla ebusuku, wonke umuntu ulindile.' },
            points: 0,
            reaction: { en: '"That\'s not my problem — I\'m the one with cold food."', zu: '"Leyo akuyona inkinga yami — yimi enginokudla okubandayo."' },
            tip: { en: 'Excuses make the guest feel dismissed. Own it and act.', zu: 'Amazaba enza isivakashi sizizwe singanakiwe. Kwamukele bese wenza.' },
          },
          {
            text: { en: "I\'ll let the manager know when I get a chance.", zu: 'Ngizazisa umphathi lapho ngithola ithuba.' },
            points: 5,
            reaction: { en: '"When you get a chance? I\'ve waited long enough."', zu: '"Lapho uthola ithuba? Sengilinde isikhathi eside ngokwanele."' },
            tip: { en: 'Do not delay a fix. Take direct action now, then inform the manager.', zu: 'Ungabambezeli isixazululo. Thatha isinyathelo manje, bese wazisa umphathi.' },
          },
        ],
      },
      {
        speaker: GUEST,
        speakerEmoji: '🧑‍🤝‍🧑',
        says: {
          en: 'Back at table 4, the couple has finished. "Everything was great. Can we get the bill?"',
          zu: 'Sekubuyelwa etafuleni 4, isithandani sesiqedile. "Konke bekukuhle. Singasithola isikweletu?"',
        },
        choices: [
          {
            text: { en: "Wonderful to hear! I\'ll bring it right over. I hope we see you again soon.", zu: 'Kuhle ukuzwa lokho! Ngizoyiletha manje. Ngithemba sizonibona futhi maduze.' },
            points: 10,
            reaction: { en: 'They beam. "We\'ll definitely be back — thank you!"', zu: 'Bayajabula. "Sizobuya nakanjani — siyabonga!"' },
            tip: { en: 'A warm close turns a good meal into a returning customer.', zu: 'Ukuvala ngomusa kwenza isidlo esihle sibe yikhasimende elibuyayo.' },
          },
          {
            text: { en: 'Sure. One second.', zu: 'Kulungile. Umzuzwana.' },
            points: 5,
            reaction: { en: 'They nod. The ending felt a bit rushed.', zu: 'Bayavuma. Isiphetho besizwakala sisheshiswa kancane.' },
            tip: { en: 'The last impression lasts. A friendly send-off costs nothing.', zu: 'Umbono wokugcina uyahlala. Ukuvalelisa ngomusa akubizi lutho.' },
          },
          {
            text: { en: 'Finally — I mean, yes, coming up.', zu: 'Ekugcineni — ngisho ukuthi, yebo, iyeza.' },
            points: 0,
            reaction: { en: 'Their smile drops. That comment stung.', zu: 'Ukumamatheka kwabo kuyawa. Lawo mazwi abalimazile.' },
            tip: { en: 'Never let your stress show to a guest, even at the very end.', zu: 'Ungalokothi ukhombise ingcindezi yakho esivakashini, ngisho nasekugcineni.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Greet every guest warmly within 30 seconds.', zu: 'Bingelela sonke isivakashi ngomusa ngaphakathi kwemizuzwana engu-30.' },
      { en: 'Always verify allergies with the kitchen — never guess.', zu: 'Hlola njalo ukungezwani nokudla ekhishini — ungaqagelí.' },
      { en: 'When something goes wrong, apologise first and fix it fast — no excuses.', zu: 'Uma kukhona okungahambi kahle, xolisa kuqala ukulungise ngokushesha — ngaphandle kwamazaba.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HOSPITALITY 2 — The Regulars
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-hosp-2',
    track: TRACKS.HOSPITALITY,
    emoji: '🍷',
    difficulty: 'intermediate',
    title: { en: 'Recommending the Specials', zu: 'Ukuncoma Ukudla Okukhethekile' },
    role: { en: 'You are a waiter. A regular guest wants your advice.', zu: 'Ungumphakeli wokudla. Isivakashi esivamile sidinga iseluleko sakho.' },
    meterLabel: { en: 'Guest Satisfaction', zu: 'Ukwaneliseka Kwesivakashi' },
    setting: {
      en: 'A guest who comes in often sits down. Tonight they want to try something new and trust your recommendation.',
      zu: 'Isivakashi esivame ukuza siyahlala. Namuhla ebusuku sifuna ukuzama okuthile okusha futhi sithemba isincomo sakho.',
    },
    scenes: [
      {
        speaker: GUEST,
        speakerEmoji: '😊',
        says: {
          en: '"Good to see you again! I\'m in the mood for something different tonight. What\'s good?"',
          zu: '"Kuhle ukukubona futhi! Nginesifiso sokuzama okuthile okwehlukile namuhla. Yini enhle?"',
        },
        choices: [
          {
            text: { en: "Great to see you! The grilled line-fish is fresh today and it\'s my personal favourite.", zu: 'Kuhle ukukubona! Inhlanzi eyosiwe intsha namuhla futhi yiyona engiyithanda kakhulu.' },
            points: 10,
            reaction: { en: '"Ooh, that sounds perfect. Tell me more."', zu: '"Hawu, lokho kuzwakala kukuhle. Ngitshele kabanzi."' },
            tip: { en: 'A specific, honest recommendation builds trust and often increases the order.', zu: 'Isincomo esiqondile nesiqotho sakha ukwethenjwa futhi ngokuvamile sikhulisa i-oda.' },
          },
          {
            text: { en: 'Everything on the menu is good, really.', zu: 'Konke okusemenyu kuhle, ngempela.' },
            points: 5,
            reaction: { en: '"That doesn\'t really help me decide though."', zu: '"Lokho akungisizi ukuthi ngenze isinqumo."' },
            tip: { en: 'Guests ask because they want guidance. Give a real answer.', zu: 'Izivakashi zibuza ngoba zifuna ukuqondiswa. Nikeza impendulo yangempela.' },
          },
          {
            text: { en: "I don\'t really know, I haven\'t tried much of it.", zu: 'Angazi ncamashi, angikaze ngizame okuningi kwakho.' },
            points: 0,
            reaction: { en: 'They look disappointed. "Oh. Okay then."', zu: 'Babukeka bedumele. "O. Kulungile-ke."' },
            tip: { en: 'Know your menu. Guests rely on you to guide them.', zu: 'Yazi imenyu yakho. Izivakashi zithembele kuwe ukuthi uziqondise.' },
          },
        ],
      },
      {
        speaker: GUEST,
        speakerEmoji: '😊',
        says: {
          en: '"The fish it is! Should I get a starter too, or is that too much food?"',
          zu: '"Ngizothatha inhlanzi-ke! Kufanele ngithathe nesiqalo, noma lokho kudla okuningi kakhulu?"',
        },
        choices: [
          {
            text: { en: "The soup is light and won\'t fill you up — a lovely way to start without overdoing it.", zu: 'Isobho lilula futhi ngeke likugcwalise — indlela enhle yokuqala ngaphandle kokweqisa.' },
            points: 10,
            reaction: { en: '"Perfect, I\'ll have the soup then. You know your stuff!"', zu: '"Kuhle, ngizothatha isobho-ke. Uyakwazi lokho okwenzayo!"' },
            tip: { en: 'Helpful upselling matches the guest\'s needs — it never just pushes the priciest item.', zu: 'Ukwengeza okuwusizo kuhambisana nezidingo zesivakashi — akulokothi kuphushe into ebiza kakhulu nje.' },
          },
          {
            text: { en: 'Yes, get the most expensive platter, it\'s the best.', zu: 'Yebo, thatha ipuleti elibiza kakhulu, yilona elihle kunawo wonke.' },
            points: 0,
            reaction: { en: 'They raise an eyebrow. "That feels like you\'re just upselling me."', zu: 'Baphakamisa ishiya. "Lokho kuzwakala sengathi umane ungidayisela okudulile."' },
            tip: { en: 'Pushing the priciest option damages trust. Recommend what actually fits.', zu: 'Ukuphusha into edulile kulimaza ukwethenjwa. Ncoma okufaneleká ngempela.' },
          },
          {
            text: { en: "Up to you, whatever you feel like.", zu: 'Kukuwe, noma yini oyizwayo.' },
            points: 5,
            reaction: { en: '"I was hoping for a suggestion, but okay."', zu: '"Bengithemba isiphakamiso, kodwa kulungile."' },
            tip: { en: 'When a guest asks, guide them — that is the service they are paying for.', zu: 'Uma isivakashi sibuza, siqondise — yilokho okusizo abakukhokhelayo.' },
          },
        ],
      },
      {
        speaker: GUEST,
        speakerEmoji: '😐',
        says: {
          en: '"Actually, last time I was here the service was really slow. I hope tonight is better."',
          zu: '"Empeleni, ngokungakanani ngesikhathi ngilapha isevisi ibihamba kancane kakhulu. Ngithemba namuhla kuzoba ngcono."',
        },
        choices: [
          {
            text: { en: "I\'m sorry that happened. I\'ll personally keep an eye on your table tonight to make sure it\'s smooth.", zu: 'Ngiyaxolisa ngokwenzekile. Ngizozibhekela mina itafula lakho namuhla ukuze ngiqinisekise ukuthi kuhamba kahle.' },
            points: 10,
            reaction: { en: '"Thank you, that means a lot. I appreciate it."', zu: '"Ngiyabonga, lokho kusho lukhulu. Ngiyakwazisa."' },
            tip: { en: 'Acknowledge past problems and take personal ownership of the fix.', zu: 'Yamukela izinkinga zangaphambili bese uthatha umthwalo wokuzilungisa wena ngokwakho.' },
          },
          {
            text: { en: "That probably wasn\'t my table.", zu: 'Cishe lelo bekungesilona itafula lami.' },
            points: 0,
            reaction: { en: '"That\'s not really the point, is it."', zu: '"Akuyona leyo indaba, akunjalo."' },
            tip: { en: 'Never deflect blame. The guest wants reassurance, not excuses.', zu: 'Ungalokothi ususe icala. Isivakashi sifuna ukuqinisekiswa, hhayi amazaba.' },
          },
          {
            text: { en: "We\'re always busy, so it happens.", zu: 'Sihlala simatasa, ngakho kuyenzeka.' },
            points: 5,
            reaction: { en: '"So it might be slow again? That\'s not reassuring."', zu: '"Ngakho kungahamba kancane futhi? Lokho akungiqinisekisi."' },
            tip: { en: 'Do not normalise poor service — commit to doing better.', zu: 'Ungakwenzi kube yinto evamile isevisi engemihle — zibophezele ukwenza ngcono.' },
          },
        ],
      },
      {
        speaker: GUEST,
        speakerEmoji: '😊',
        says: {
          en: 'The meal went perfectly. "That was excellent — some of the best service I\'ve had here. Thank you!"',
          zu: 'Isidlo sihambe kahle ngokuphelele. "Bekukuhle kakhulu — enye yesevisi engcono kunazo zonke engike ngayithola lapha. Ngiyabonga!"',
        },
        choices: [
          {
            text: { en: "It was my pleasure. Come back soon and ask for me — I\'ll look after you.", zu: 'Bekuyinjabulo yami. Buya maduze ubize mina — ngizokunakekela.' },
            points: 10,
            reaction: { en: '"I definitely will. See you next time!"', zu: '"Ngizokwenza nakanjani. Sizobonana ngokuzayo!"' },
            tip: { en: 'Inviting a guest to ask for you by name builds loyalty and can grow your tips.', zu: 'Ukumema isivakashi ukuthi sikubize ngegama kwakha ukwethembeka futhi kungakhulisa amathiphu akho.' },
          },
          {
            text: { en: 'Thanks. Have a good night.', zu: 'Ngiyabonga. Ube nobusuku obuhle.' },
            points: 5,
            reaction: { en: 'They smile and leave content.', zu: 'Bayamamatheka bahambe beneliseka.' },
            tip: { en: 'Polite, but a personal touch turns a happy guest into a regular.', zu: 'Kunenhlonipho, kodwa ukuthinta komuntu siqu kwenza isivakashi esijabulayo sibe esivamile.' },
          },
          {
            text: { en: 'No problem, that\'s the job.', zu: 'Ayikho inkinga, umsebenzi lowo.' },
            points: 0,
            reaction: { en: 'The warmth of the moment fades a little.', zu: 'Umusa walowo mzuzu uyaphela kancane.' },
            tip: { en: 'Receive praise graciously — it is a chance to deepen the relationship.', zu: 'Yamukela udumo ngomusa — kuyithuba lokujulisa ubudlelwano.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Know your menu so you can give real, confident recommendations.', zu: 'Yazi imenyu yakho ukuze unikeze izincomo zangempela nangokuzethemba.' },
      { en: 'Upsell to fit the guest\'s needs, not just to raise the bill.', zu: 'Yengeza ngokuhambisana nezidingo zesivakashi, hhayi nje ukukhulisa isikweletu.' },
      { en: 'Own past problems and make a personal commitment to do better.', zu: 'Yamukela izinkinga zangaphambili wenze isibophezelo somuntu siqu sokwenza ngcono.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CALL CENTER 1 — The Billing Complaint
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-call-1',
    track: TRACKS.CALL_CENTER,
    emoji: '💳',
    difficulty: 'beginner',
    title: { en: 'The Billing Complaint', zu: 'Isikhalazo Sesikweletu' },
    role: { en: 'You are a call centre agent. An upset customer is on the line.', zu: 'Ungumsebenzi wesikhungo samakholi. Ikhasimende elicasukile lisocingweni.' },
    meterLabel: { en: 'Call Quality', zu: 'Izinga Lekholi' },
    setting: {
      en: 'You answer an incoming call. The customer sounds frustrated before you even finish your greeting.',
      zu: 'Uphendula ikholi engenayo. Ikhasimende lizwakala licasukile ungakaqedi ngisho nokubingelela kwakho.',
    },
    scenes: [
      {
        speaker: CALLER,
        speakerEmoji: '😤',
        says: {
          en: '"Finally! I\'ve been charged twice this month and nobody can explain why. This is ridiculous."',
          zu: '"Ekugcineni! Ngikhokhisiwe kabili kule nyanga futhi akekho ongachaza ukuthi kungani. Lokhu kuyihlaya."',
        },
        choices: [
          {
            text: { en: "I\'m sorry for the frustration. Let\'s sort this out together — can I take your account number to look into it?", zu: 'Ngiyaxolisa ngokucasuka. Ake sikulungise ndawonye — ngingayithatha inombolo yakho ye-akhawunti ukuze ngihlole?' },
            points: 10,
            reaction: { en: 'The customer exhales. "Okay. Thank you. It\'s 4471."', zu: 'Ikhasimende liyaphefumula. "Kulungile. Ngiyabonga. Ithi 4471."' },
            tip: { en: 'Acknowledge the emotion first, then move to action. It calms the caller.', zu: 'Yamukela imizwa kuqala, bese ushintshela esenzweni. Kuyalidambisa ikhasimende.' },
          },
          {
            text: { en: 'Calm down, sir. Shouting won\'t help.', zu: 'Yehlisa umoya, mnumzane. Ukumemeza ngeke kusize.' },
            points: 0,
            reaction: { en: '"Don\'t tell me to calm down!" They\'re angrier now.', zu: '"Ungangitsheli ukuthi ngehlise umoya!" Sebethukuthele kakhulu manje.' },
            tip: { en: 'Telling someone to calm down almost always makes it worse. Acknowledge instead.', zu: 'Ukutshela umuntu ukuthi ehlise umoya cishe njalo kwenza kube kubi kakhulu. Kunalokho yamukela.' },
          },
          {
            text: { en: 'That\'s not really my department.', zu: 'Lowo akuwona umnyango wami.' },
            points: 5,
            reaction: { en: '"So you\'re passing me on again? I\'ve been transferred three times!"', zu: '"Ngakho ungidlulisela futhi? Sengidluliselwe izikhathi ezintathu!"' },
            tip: { en: 'Avoid bouncing the customer around. Take ownership even if you must escalate later.', zu: 'Gwema ukudlulisa ikhasimende. Thatha umthwalo ngisho noma kufanele udlulisele kamuva.' },
          },
        ],
      },
      {
        speaker: CALLER,
        speakerEmoji: '😐',
        says: {
          en: '"So can you see the double charge? I want my money back."',
          zu: '"Ngakho uyakubona ukukhokhisa kabili? Ngifuna imali yami ibuye."',
        },
        choices: [
          {
            text: { en: "I can see it here. You\'re right — you were charged twice. I\'ll process the refund now and confirm by SMS.", zu: 'Ngiyakubona lapha. Uqinisile — ukhokhiswe kabili. Ngizoyenza imali ebuyayo manje ngiqinisekise nge-SMS.' },
            points: 10,
            reaction: { en: '"Oh thank goodness. Thank you for actually helping."', zu: '"O ngiyabonga Nkulunkulu. Ngiyabonga ngokungisiza ngempela."' },
            tip: { en: 'Confirm the facts, admit the error clearly, and state the exact next step.', zu: 'Qinisekisa amaqiniso, vuma iphutha ngokucacile, bese usho isinyathelo esilandelayo esiqondile.' },
          },
          {
            text: { en: "There might be a charge, I\'m not sure. Try calling back tomorrow.", zu: 'Kungenzeka kube nenkokhelo, angiqinisekile. Zama ukushayela kusasa.' },
            points: 0,
            reaction: { en: '"Call back? No! Deal with it now, please."', zu: '"Ngishayele futhi? Cha! Yenza manje, ngicela."' },
            tip: { en: 'Do not push the problem to another day. Resolve it on this call if you can.', zu: 'Ungayidluliseli inkinga kolunye usuku. Yixazulule kulolu kholi uma ukwazi.' },
          },
          {
            text: { en: "Yes there\'s a double charge, but refunds take a while and I can\'t promise anything.", zu: 'Yebo kukhona ukukhokhisa kabili, kodwa ukubuyiselwa kwemali kuthatha isikhathi futhi angikwazi ukuthembisa lutho.' },
            points: 5,
            reaction: { en: '"That\'s not very reassuring, but okay, do what you can."', zu: '"Lokho akungiqinisekisi kangako, kodwa kulungile, yenza okusemandleni akho."' },
            tip: { en: 'Be honest about timing, but frame it with confidence and a clear plan.', zu: 'Yiba qotho ngesikhathi, kodwa kubeke ngokuzethemba nangohlelo olucacile.' },
          },
        ],
      },
      {
        speaker: CALLER,
        speakerEmoji: '🤔',
        says: {
          en: '"Okay. How long until the money is back in my account?"',
          zu: '"Kulungile. Kuzothatha isikhathi esingakanani ngaphambi kokuba imali ibuyele ku-akhawunti yami?"',
        },
        choices: [
          {
            text: { en: 'It usually takes 3 to 5 working days. I\'ll note your account so you don\'t have to explain again if you call.', zu: 'Ngokuvamile kuthatha izinsuku ezingu-3 kuya ku-5 zokusebenza. Ngizobhala ku-akhawunti yakho ukuze ungaphinde uchaze uma ushayela.' },
            points: 10,
            reaction: { en: '"That\'s really helpful, thank you."', zu: '"Lokho kuwusizo ngempela, ngiyabonga."' },
            tip: { en: 'Give a clear timeframe and reduce their future effort. That builds real trust.', zu: 'Nikeza isikhathi esicacile bese wehlisa umzamo wabo wesikhathi esizayo. Lokho kwakha ukwethenjwa kwangempela.' },
          },
          {
            text: { en: 'I don\'t know exactly, these things vary.', zu: 'Angazi kahle, lezi zinto ziyahluka.' },
            points: 5,
            reaction: { en: '"Can you at least give me a rough idea?"', zu: '"Ungangipha okungenani umqondo ongaphelele?"' },
            tip: { en: 'Give your best honest estimate rather than leaving them with nothing.', zu: 'Nikeza isilinganiso sakho esihle nesiqotho kunokubashiya bengenalutho.' },
          },
          {
            text: { en: 'It\'ll be back soon, don\'t worry about it.', zu: 'Izobuya maduze, ungakhathazeki ngayo.' },
            points: 0,
            reaction: { en: '"\'Soon\' isn\'t a real answer. I need to plan my money."', zu: '"\'Maduze\' akuyona impendulo yangempela. Ngidinga ukuhlela imali yami."' },
            tip: { en: 'Vague promises undermine trust. Specifics reassure.', zu: 'Izithembiso ezingacacile ziphundla ukwethenjwa. Imininingwane iyaqinisekisa.' },
          },
        ],
      },
      {
        speaker: CALLER,
        speakerEmoji: '🙂',
        says: {
          en: '"Alright, thanks for sorting it out. Sorry I was short with you earlier."',
          zu: '"Kulungile, ngiyabonga ngokuyilungisa. Uxolo ngokuba nolaka nawe ekuqaleni."',
        },
        choices: [
          {
            text: { en: "No need to apologise — I\'d be frustrated too. Is there anything else I can help you with today?", zu: 'Akudingeki uxolise — nami bengizocasuka. Ingabe kukhona okunye engingakusiza ngakho namuhla?' },
            points: 10,
            reaction: { en: '"No, that\'s everything. You\'ve been great."', zu: '"Cha, yikho konke. Ubungcono kakhulu."' },
            tip: { en: 'End graciously and always offer further help. It leaves a strong final impression.', zu: 'Vala ngomusa bese uhlala unikeza usizo olwengeziwe. Kushiya umbono wokugcina oqinile.' },
          },
          {
            text: { en: 'It\'s fine. Bye.', zu: 'Kulungile. Sala kahle.' },
            points: 5,
            reaction: { en: 'The call ends politely but abruptly.', zu: 'Ikholi iphela ngenhlonipho kodwa ngokushesha.' },
            tip: { en: 'A quick close is fine, but offering further help shows you care.', zu: 'Ukuvala ngokushesha kulungile, kodwa ukunikeza usizo olwengeziwe kukhombisa ukuthi uyakhathalela.' },
          },
          {
            text: { en: 'Yeah, you were pretty rude honestly.', zu: 'Yebo, bewungahloniphi ngempela.' },
            points: 0,
            reaction: { en: 'The goodwill vanishes instantly. "Wow. Okay."', zu: 'Umusa unyamalala ngokushesha. "Hhawu. Kulungile."' },
            tip: { en: 'Never scold a customer, even when they apologise. Stay professional to the end.', zu: 'Ungalokothi ukhuze ikhasimende, ngisho noma lixolisa. Hlala unobuchwepheshe kuze kube sekugcineni.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Acknowledge the customer\'s emotion before jumping to the fix.', zu: 'Yamukela imizwa yekhasimende ngaphambi kokweqela esixazululweni.' },
      { en: 'Never tell an angry customer to "calm down".', zu: 'Ungalokothi utshele ikhasimende elithukuthele ukuthi "lehlise umoya".' },
      { en: 'Give specific timeframes and next steps — vagueness destroys trust.', zu: 'Nikeza izikhathi ezithize nezinyathelo ezilandelayo — ukungacaci kubhubhisa ukwethenjwa.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CALL CENTER 2 — Technical Support
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-call-2',
    track: TRACKS.CALL_CENTER,
    emoji: '📶',
    difficulty: 'intermediate',
    title: { en: 'Technical Support', zu: 'Usizo Lobuchwepheshe' },
    role: { en: 'You are a support agent. A customer\'s internet is down.', zu: 'Ungumsebenzi wosizo. I-inthanethi yekhasimende ayisebenzi.' },
    meterLabel: { en: 'Call Quality', zu: 'Izinga Lekholi' },
    setting: {
      en: 'A customer calls because their internet has stopped working. They are not very tech-savvy and a little stressed.',
      zu: 'Ikhasimende liyashayela ngoba i-inthanethi yalo iyekile ukusebenza. Alilazi kahle ubuchwepheshe futhi likhathazeke kancane.',
    },
    scenes: [
      {
        speaker: CALLER,
        speakerEmoji: '😟',
        says: {
          en: '"My internet just stopped and I work from home. I don\'t really understand all the technical stuff."',
          zu: '"I-inthanethi yami imane yema futhi ngisebenzela ekhaya. Angizazi kahle zonke lezi zinto zobuchwepheshe."',
        },
        choices: [
          {
            text: { en: "No problem at all — I\'ll guide you step by step in plain language. We\'ll get you back online.", zu: 'Ayikho neze inkinga — ngizokuqondisa isinyathelo ngesinyathelo ngolimi olulula. Sizokubuyisela online.' },
            points: 10,
            reaction: { en: '"Oh good, thank you. I appreciate that."', zu: '"O kuhle, ngiyabonga. Ngiyakwazisa lokho."' },
            tip: { en: 'Reassure nervous customers and promise plain language. It lowers their stress.', zu: 'Qinisekisa amakhasimende akhathazekile bese uthembisa ulimi olulula. Kwehlisa ingcindezi yabo.' },
          },
          {
            text: { en: 'Have you checked the DNS settings on your router config?', zu: 'Uke wahlola izilungiselelo ze-DNS kwi-config ye-router yakho?' },
            points: 0,
            reaction: { en: '"I... have no idea what any of that means."', zu: '"Mina... angazi lokho kusho ukuthini."' },
            tip: { en: 'Match your language to the customer. Jargon makes non-technical callers feel lost.', zu: 'Fanisa ulimi lwakho nekhasimende. Amagama obuchwepheshe enza amakhasimende angazi abhode.' },
          },
          {
            text: { en: 'It\'s probably just load-shedding or a network issue, nothing I can do.', zu: 'Cishe yi-load-shedding noma inkinga yenethiwekhi nje, akukho engingakwenza.' },
            points: 5,
            reaction: { en: '"So you can\'t help me at all?"', zu: '"Ngakho awukwazi nhlobo ukungisiza?"' },
            tip: { en: 'Do not dismiss the issue before troubleshooting. Rule things out step by step.', zu: 'Ungayeqi inkinga ngaphambi kokuyihlola. Susa izinto isinyathelo ngesinyathelo.' },
          },
        ],
      },
      {
        speaker: CALLER,
        speakerEmoji: '🙂',
        says: {
          en: '"Okay, I\'m ready. What should I do first?"',
          zu: '"Kulungile, sengilungile. Kufanele ngenzeni kuqala?"',
        },
        choices: [
          {
            text: { en: 'Let\'s start simple: find the router — the box with the lights — and tell me which lights are on.', zu: 'Ake siqale ngokulula: thola i-router — ibhokisi elinezibani — bese ungitshela ukuthi yiziphi izibani ezivulekile.' },
            points: 10,
            reaction: { en: '"Okay, there\'s a red light flashing here."', zu: '"Kulungile, kunesibani esibomvu esicwazimulayo lapha."' },
            tip: { en: 'Start with the simplest check and use everyday words like "the box with the lights".', zu: 'Qala ngokuhlola okulula bese usebenzisa amagama ansuku zonke afana "nebhokisi elinezibani".' },
          },
          {
            text: { en: 'Reboot the modem, flush the cache, and reset your IP.', zu: 'Qala kabusha i-modem, sula i-cache, bese usetha kabusha i-IP yakho.' },
            points: 0,
            reaction: { en: '"You\'ve completely lost me already."', zu: '"Usungilahlile nya kakade."' },
            tip: { en: 'Break it into one small, clear action at a time.', zu: 'Kuhlukanise kube yisenzo esisodwa esilula nesicacile ngesikhathi.' },
          },
          {
            text: { en: 'Just turn everything off and on again.', zu: 'Vele ucishe konke uphinde ukuvule.' },
            points: 5,
            reaction: { en: '"Turn what off? Which thing exactly?"', zu: '"Ngicishe ini? Iyiphi into ngempela?"' },
            tip: { en: 'Even good advice needs to be specific — tell them exactly what to touch.', zu: 'Ngisho neseluleko esihle sidinga ukucaciswa — batshele kahle ukuthi bathinte ini.' },
          },
        ],
      },
      {
        speaker: CALLER,
        speakerEmoji: '😧',
        says: {
          en: '"I\'ve been on the phone 20 minutes and I\'m getting really frustrated now. Can you just send someone?"',
          zu: '"Sekuyimizuzu engu-20 ngisocingweni futhi sengicasuka ngempela manje. Ungavele uthumele umuntu?"',
        },
        choices: [
          {
            text: { en: 'I hear you — you\'ve been patient. Let\'s try one last quick step, and if it fails I\'ll book a technician right away.', zu: 'Ngiyakuzwa — ube nesineke. Ake sizame isinyathelo esisodwa sokugcina esisheshayo, uma sehluleka ngizobhukha unjiniyela ngokushesha.' },
            points: 10,
            reaction: { en: '"Okay, one more try. Thank you for understanding."', zu: '"Kulungile, umzamo owodwa futhi. Ngiyabonga ngokuqonda."' },
            tip: { en: 'Validate their patience, offer one clear next step, and give a real fallback.', zu: 'Yamukela isineke sabo, unikeze isinyathelo esisodwa esicacile, bese unikeza indlela yokugcina yangempela.' },
          },
          {
            text: { en: 'A technician could take a week to reach you.', zu: 'Unjiniyela angathatha isonto ukufika kuwe.' },
            points: 5,
            reaction: { en: '"A week?! That\'s useless to me."', zu: '"Isonto?! Lokho akungisizi ngalutho."' },
            tip: { en: 'Lead with a solution, not the worst-case delay.', zu: 'Qala ngesixazululo, hhayi ngokubambezeleka okubi kakhulu.' },
          },
          {
            text: { en: 'There\'s nothing more I can do over the phone, sorry.', zu: 'Akukho okunye engingakwenza ocingweni, uxolo.' },
            points: 0,
            reaction: { en: '"So this whole call was a waste of time?"', zu: '"Ngakho lonke leli kholi belichitha isikhathi?"' },
            tip: { en: 'Never end on a dead end. Always give the customer a path forward.', zu: 'Ungalokothi uvale endaweni evimbekile. Hlala unikeza ikhasimende indlela eya phambili.' },
          },
        ],
      },
      {
        speaker: CALLER,
        speakerEmoji: '😀',
        says: {
          en: '"Wait — the lights are green now and it\'s working! You did it. Thank you so much."',
          zu: '"Ake ngime — izibani sesiluhlaza manje futhi kuyasebenza! Ukwenzile. Ngiyabonga kakhulu."',
        },
        choices: [
          {
            text: { en: "Wonderful! I\'m so glad. If it drops again, note down error lights and we\'ll get you sorted fast.", zu: 'Kuhle kakhulu! Ngiyajabula. Uma iphinda iwe, bhala phansi izibani zephutha bese sizokulungisa ngokushesha.' },
            points: 10,
            reaction: { en: '"Will do. You\'ve been so patient, thank you."', zu: '"Ngizokwenza. Ube nesineke kakhulu, ngiyabonga."' },
            tip: { en: 'End on a high, and equip them for next time. It reduces repeat calls.', zu: 'Vala ngendlela enhle, bese ubahlomisela isikhathi esizayo. Kunciphisa amakholi aphindaphindayo.' },
          },
          {
            text: { en: 'Great. Bye.', zu: 'Kuhle. Sala kahle.' },
            points: 5,
            reaction: { en: 'The call ends fine, if a little flat.', zu: 'Ikholi iphela kahle, noma ngabe ayinampilo kangako.' },
            tip: { en: 'Solid, but a warmer close and a tip for next time adds real value.', zu: 'Kuqinile, kodwa ukuvala ngomusa neseluleko sesikhathi esizayo kwengeza inani langempela.' },
          },
          {
            text: { en: 'Finally. That took forever.', zu: 'Ekugcineni. Lokho kuthathe isikhathi eside.' },
            points: 0,
            reaction: { en: 'The customer goes quiet. The good mood is gone.', zu: 'Ikhasimende liyathula. Umoya omuhle usuphelile.' },
            tip: { en: 'Never show your own frustration to the customer, even at the finish.', zu: 'Ungalokothi ukhombise ukucasuka kwakho ekhasimendeni, ngisho nasekugcineni.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Match your language to the customer — avoid jargon with non-technical callers.', zu: 'Fanisa ulimi lwakho nekhasimende — gwema amagama obungcweti kubashayeli abangenalwazi lobuchwepheshe.' },
      { en: 'Give one small, clear step at a time.', zu: 'Nikeza isinyathelo esisodwa esilula nesicacile ngesikhathi.' },
      { en: 'Validate frustration and always offer a path forward — never a dead end.', zu: 'Yamukela ukucasuka bese uhlala unikeza indlela eya phambili — hhayi indawo evimbekile.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETAIL 1 — The Browsing Customer
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-retail-1',
    track: TRACKS.RETAIL,
    emoji: '👟',
    difficulty: 'beginner',
    title: { en: 'The Browsing Customer', zu: 'Ikhasimende Elibukelayo' },
    role: { en: 'You work on a shop floor. A customer is browsing the shelves.', zu: 'Usebenza ophahleni lwesitolo. Ikhasimende libukela emashalofini.' },
    meterLabel: { en: 'Customer Experience', zu: 'Isipiliyoni Sekhasimende' },
    setting: {
      en: 'A customer has been looking at running shoes for a few minutes. They seem a little unsure. You approach.',
      zu: 'Ikhasimende belibukele izicathulo zokugijima imizuzu embalwa. Libukeka lingaqiniseki kancane. Uyasondela.',
    },
    scenes: [
      {
        speaker: CUSTOMER,
        speakerEmoji: '🤔',
        says: {
          en: 'The customer picks up a shoe, turns it over, and puts it back down, frowning slightly.',
          zu: 'Ikhasimende lithatha isicathulo, liyasiphenya, bese liyasibuyisela phansi, lihwaqabele kancane.',
        },
        choices: [
          {
            text: { en: 'Hi there! Are you looking for something for everyday wear or for running?', zu: 'Sawubona! Ingabe ufuna okokugqoka nsuku zonke noma okokugijima?' },
            points: 10,
            reaction: { en: '"Running, actually. I\'m starting to train for a race."', zu: '"Ukugijima, empeleni. Ngiqala ukuzilolongela umjaho."' },
            tip: { en: 'An open, specific question invites the customer to share what they need.', zu: 'Umbuzo ovulekile noqondile umema ikhasimende ukuthi labelane ngalokho elikudingayo.' },
          },
          {
            text: { en: 'Can I help you or are you just looking?', zu: 'Ngingakusiza noma umane ubukela nje?' },
            points: 5,
            reaction: { en: '"Um, just looking I guess." They close off a little.', zu: '"Hmm, ngibukela nje engathi." Bavaleka kancane.' },
            tip: { en: '"Just looking?" invites a no. Ask about their goal instead.', zu: '"Ubukela nje?" imema u-cha. Kunalokho buza ngenhloso yabo.' },
          },
          {
            text: { en: 'Let me know if you need anything.', zu: 'Ungazise uma udinga noma yini.' },
            points: 0,
            reaction: { en: 'You walk off. The customer stays lost and unhelped.', zu: 'Uyahamba. Ikhasimende lisala lididekile lingasizakalanga.' },
            tip: { en: 'Leaving too soon means missing the sale. Engage warmly first.', zu: 'Ukuhamba ngokushesha kakhulu kusho ukuphuthelwa ukudayisa. Xhumana ngomusa kuqala.' },
          },
        ],
      },
      {
        speaker: CUSTOMER,
        speakerEmoji: '🙂',
        says: {
          en: '"I need something comfortable but I\'m on a bit of a budget. These ones looked nice but I\'m not sure."',
          zu: '"Ngidinga okunethezekile kodwa nginemali elinganiselwe. Lezi bezibukeka zizinhle kodwa angiqiniseki."',
        },
        choices: [
          {
            text: { en: 'Totally understand. These are great value, and this pair here gives similar comfort for less — want to compare?', zu: 'Ngiyaqonda ngokugcwele. Lezi zinhle ngentengo, futhi lezi lapha zinikeza ukunethezeka okufanayo ngentengo ephansi — ufuna ukuqhathanisa?' },
            points: 10,
            reaction: { en: '"Yes please, that would be helpful!"', zu: '"Yebo ngiyacela, lokho kungasiza!"' },
            tip: { en: 'Respect their budget and offer a real option that fits it. That earns trust.', zu: 'Hlonipha imali yabo bese unikeza okungakhethwa okuyifanele. Lokho kuzuza ukwethenjwa.' },
          },
          {
            text: { en: 'If you want quality you have to spend more, honestly.', zu: 'Uma ufuna ikhwalithi kufanele usebenzise okwengeziwe, ngempela.' },
            points: 0,
            reaction: { en: 'They feel judged. "I said I\'m on a budget."', zu: 'Bazizwa behlulelwa. "Ngithe nginemali elinganiselwe."' },
            tip: { en: 'Never make a budget-conscious customer feel small. Work with what they have.', zu: 'Ungalokothi wenze ikhasimende elibheka imali lizizwe lincane. Sebenza ngalokho elinakho.' },
          },
          {
            text: { en: 'They\'re all pretty similar, just pick one.', zu: 'Zonke ziyafana nje, khetha eyodwa.' },
            points: 5,
            reaction: { en: '"I was hoping for a bit more help than that."', zu: '"Bengithemba usizo olwengeziwe kunalokho."' },
            tip: { en: 'Customers came in for guidance. Help them choose with confidence.', zu: 'Amakhasimende angenela ukuqondiswa. Basize bakhethe ngokuzethemba.' },
          },
        ],
      },
      {
        speaker: CUSTOMER,
        speakerEmoji: '😊',
        says: {
          en: '"These feel good! Okay, I think I\'ll take them. Is there anything else I\'d need?"',
          zu: '"Lezi zizwakala zizinhle! Kulungile, ngicabanga ukuthi ngizozithatha. Ingabe kukhona okunye engingakudinga?"',
        },
        choices: [
          {
            text: { en: 'Good running socks prevent blisters and these are on special — want me to add a pair?', zu: 'Amasokisi amahle okugijima avimbela amabhamuza futhi la asentengweni ekhethekile — ufuna ngengeze ipheya?' },
            points: 10,
            reaction: { en: '"Oh good idea, yes add some. Thanks for thinking of that."', zu: '"O umqondo omuhle, yebo faka amanye. Ngiyabonga ngokucabanga ngalokho."' },
            tip: { en: 'A helpful add-on that solves a real problem is good service, not pushy selling.', zu: 'Into eyengezwayo ewusizo exazulula inkinga yangempela iyisevisi enhle, hhayi ukudayisa okuphoqayo.' },
          },
          {
            text: { en: 'You should buy our most expensive insoles and a cleaning kit and a spare pair too.', zu: 'Kufanele uthenge ama-insoles ethu adulile kakhulu ne-cleaning kit nepheya elilodwa elilekelelayo.' },
            points: 0,
            reaction: { en: 'They pull back. "That\'s a lot... maybe just the shoes."', zu: 'Bayahlehla. "Lokho kuningi... mhlawumbe izicathulo kuphela."' },
            tip: { en: 'Over-selling scares customers off. Suggest one relevant item, not a pile.', zu: 'Ukudayisa ngokweqile kwesabisa amakhasimende. Phakamisa into eyodwa efanele, hhayi inqwaba.' },
          },
          {
            text: { en: 'Nope, that\'s it.', zu: 'Cha, yikho lokho.' },
            points: 5,
            reaction: { en: 'They head to the till. A small chance was missed.', zu: 'Baya ekhawunta. Ithuba elincane liphuthelwe.' },
            tip: { en: 'A quick, genuine suggestion helps the customer and grows the sale.', zu: 'Isiphakamiso esisheshayo nesiqotho sisiza ikhasimende futhi sikhulisa ukudayisa.' },
          },
        ],
      },
      {
        speaker: CUSTOMER,
        speakerEmoji: '😀',
        says: {
          en: 'At the till, they say: "Thanks, you made that really easy. I nearly walked out without buying anything."',
          zu: 'Ekhawunta, bathi: "Ngiyabonga, ukwenze kwaba lula ngempela. Bengicishe ngiphume ngingathenganga lutho."',
        },
        choices: [
          {
            text: { en: 'So glad I could help! Enjoy the training, and come back if you need anything for the race.', zu: 'Ngijabule kakhulu ukuthi ngikwazile ukusiza! Ujabulele ukuzilolonga, ubuye uma udinga noma yini yomjaho.' },
            points: 10,
            reaction: { en: '"I will, thank you so much!" They leave happy.', zu: '"Ngizokwenza, ngiyabonga kakhulu!" Bahamba bejabule.' },
            tip: { en: 'A warm, personal send-off makes customers come back and ask for you.', zu: 'Ukuvalelisa ngomusa nangobuqotho kwenza amakhasimende abuye acele wena.' },
          },
          {
            text: { en: 'Cool. Next customer, please.', zu: 'Kuhle. Ikhasimende elilandelayo, ngicela.' },
            points: 0,
            reaction: { en: 'They feel rushed out. The warm moment is lost.', zu: 'Bazizwa bexoshwa ngokushesha. Umzuzu omuhle uyalahleka.' },
            tip: { en: 'Never rush a happy customer out the door. Close warmly.', zu: 'Ungalokothi uxoshe ikhasimende elijabulayo ngokushesha. Vala ngomusa.' },
          },
          {
            text: { en: 'Yeah, no problem.', zu: 'Yebo, ayikho inkinga.' },
            points: 5,
            reaction: { en: 'Polite enough, but the moment could have been warmer.', zu: 'Kunenhlonipho ngokwanele, kodwa umzuzu ubungaba nomusa ongaphezulu.' },
            tip: { en: 'Match the customer\'s warmth — they just praised you. Give it back.', zu: 'Fanisa umusa wekhasimende — lisanda kukuncoma. Kubuyisele.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Open with a question about the customer\'s goal, not "just looking?"', zu: 'Qala ngombuzo mayelana nenhloso yekhasimende, hhayi "ubukela nje?"' },
      { en: 'Respect the customer\'s budget and work within it.', zu: 'Hlonipha imali yekhasimende bese usebenza ngaphakathi kwayo.' },
      { en: 'Suggest one genuinely useful add-on — never a pile of extras.', zu: 'Phakamisa into eyodwa engezwayo ewusizo ngempela — hhayi inqwaba yezengezo.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETAIL 2 — The Return
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-retail-2',
    track: TRACKS.RETAIL,
    emoji: '📦',
    difficulty: 'intermediate',
    title: { en: 'The Difficult Return', zu: 'Ukubuyisa Okunzima' },
    role: { en: 'You work at the returns counter. A customer is unhappy with a product.', zu: 'Usebenza ekhawunta yokubuyisa. Ikhasimende alijabulanga ngomkhiqizo.' },
    meterLabel: { en: 'Customer Experience', zu: 'Isipiliyoni Sekhasimende' },
    setting: {
      en: 'A customer marches up to the counter holding a kettle and a receipt, clearly annoyed.',
      zu: 'Ikhasimende liqonda ekhawunta liphethe iketulo nerisidi, licasukile ngokusobala.',
    },
    scenes: [
      {
        speaker: CUSTOMER,
        speakerEmoji: '😠',
        says: {
          en: '"I bought this kettle three days ago and it\'s already broken. I want my money back."',
          zu: '"Ngithenge leli ketulo ezinsukwini ezintathu ezedlule futhi selonakele. Ngifuna imali yami ibuye."',
        },
        choices: [
          {
            text: { en: 'I\'m sorry to hear that — that\'s frustrating. Let\'s have a look and sort it out for you.', zu: 'Ngiyaxolisa ukuzwa lokho — kuyacasula. Ake sibheke sikulungisele.' },
            points: 10,
            reaction: { en: 'They soften slightly. "Thank you. Here\'s the receipt."', zu: 'Bathamba kancane. "Ngiyabonga. Nansi irisidi."' },
            tip: { en: 'Empathy first, then move to solving. It defuses the anger.', zu: 'Uzwelo kuqala, bese ushintshela ekuxazululeni. Kudambisa ulaka.' },
          },
          {
            text: { en: 'Do you have the receipt? No receipt, no refund.', zu: 'Unayo irisidi? Ayikho irisidi, ayikho imali ebuyayo.' },
            points: 5,
            reaction: { en: '"I have it, but you don\'t have to be so cold about it."', zu: '"Nginayo, kodwa akudingeki ube nolaka kanjena ngayo."' },
            tip: { en: 'Rules matter, but lead with empathy — not a wall of policy.', zu: 'Imithetho ibalulekile, kodwa qala ngozwelo — hhayi udonga lwenqubomgomo.' },
          },
          {
            text: { en: 'You probably used it wrong.', zu: 'Cishe ulisebenzise ngendlela engalungile.' },
            points: 0,
            reaction: { en: '"Excuse me? I want to speak to a manager."', zu: '"Uxolo? Ngifuna ukukhuluma nomphathi."' },
            tip: { en: 'Never blame the customer before you know the facts.', zu: 'Ungalokothi usole ikhasimende ungakawazi amaqiniso.' },
          },
        ],
      },
      {
        speaker: CUSTOMER,
        speakerEmoji: '😐',
        says: {
          en: '"So can I get a refund? I really just want my money back, not another one."',
          zu: '"Ngakho ngingayithola imali ebuyayo? Empeleni ngifuna nje imali yami ibuye, hhayi elinye."',
        },
        choices: [
          {
            text: { en: 'Since it\'s within our return window and clearly faulty, yes — I can refund you now. Card or cash?', zu: 'Njengoba kusesikhathini sethu sokubuyisa futhi konakele ngokusobala, yebo — ngingakubuyisela imali manje. Ikhadi noma ukheshi?' },
            points: 10,
            reaction: { en: '"Oh, that easy? Card please. Thank you."', zu: '"O, kulula kanjalo? Ikhadi ngiyacela. Ngiyabonga."' },
            tip: { en: 'Know the policy so you can act with confidence when the customer is in the right.', zu: 'Yazi inqubomgomo ukuze wenze ngokuzethemba lapho ikhasimende liqinisile.' },
          },
          {
            text: { en: 'We only do exchanges, not refunds.', zu: 'Senza ukushintsha kuphela, hhayi ukubuyisa imali.' },
            points: 0,
            reaction: { en: '"That\'s not what your policy says on the wall!"', zu: '"Akukhona lokho okushiwo yinqubomgomo yenu odongeni!"' },
            tip: { en: 'Do not invent rules. Know the real policy and apply it fairly.', zu: 'Ungaqambi imithetho. Yazi inqubomgomo yangempela bese uyisebenzisa ngokulungile.' },
          },
          {
            text: { en: 'I\'ll have to ask my manager, hold on a long time.', zu: 'Kuzomele ngibuze umphathi wami, linda isikhathi eside.' },
            points: 5,
            reaction: { en: '"Okay, but please be quick, I\'m in a hurry."', zu: '"Kulungile, kodwa ngicela usheshe, ngijahile."' },
            tip: { en: 'Escalate only when needed, and keep the wait short and clear.', zu: 'Dlulisela kuphela lapho kudingeka, bese wenza ukulinda kube kufushane nokucacile.' },
          },
        ],
      },
      {
        speaker: CUSTOMER,
        speakerEmoji: '🤨',
        says: {
          en: '"While I\'m here — I\'m a bit worried the next one will break too. Are they all this bad?"',
          zu: '"Njengoba ngilapha — ngikhathazeke kancane ukuthi elilandelayo lizophuka nalo. Ingabe wonke mabi kanje?"',
        },
        choices: [
          {
            text: { en: 'Honestly this is rare — but if you\'d prefer, this other brand has a longer guarantee. Want to see it?', zu: 'Ngeqiniso lokhu akuvamile — kodwa uma ukhetha, lolu olunye uhlobo lunesiqinisekiso eside. Ufuna ukulubona?' },
            points: 10,
            reaction: { en: '"Yes, that would make me feel better. Thanks."', zu: '"Yebo, lokho kungangenza ngizizwe ngcono. Ngiyabonga."' },
            tip: { en: 'Be honest, and offer a solution that eases their worry. That wins loyalty.', zu: 'Yiba qotho, bese unikeza isixazululo esidambisa ukukhathazeka kwabo. Lokho kuzuza ukwethembeka.' },
          },
          {
            text: { en: 'Nothing we sell ever breaks, that was a one-off.', zu: 'Akukho esikuthengisayo okuke kophuke, lokho bekukanye nje.' },
            points: 0,
            reaction: { en: 'They give you a sceptical look. "Right..."', zu: 'Bakubuka ngokungabaza. "Kulungile..."' },
            tip: { en: 'Do not over-promise or dismiss their concern. Honesty builds trust.', zu: 'Ungathembisi ngokweqile noma weqe ukukhathazeka kwabo. Ukwethembeka kwakha ukwethenjwa.' },
          },
          {
            text: { en: 'Everything breaks eventually, that\'s just how it is.', zu: 'Yonke into iyaphuka ekugcineni, kunjalo nje.' },
            points: 5,
            reaction: { en: '"That doesn\'t exactly fill me with confidence."', zu: '"Lokho akungigcwalisi ngokuzethemba."' },
            tip: { en: 'Reassure the customer with options, don\'t leave them uneasy.', zu: 'Qinisekisa ikhasimende ngezinketho, ungabashiyi bengakhululekile.' },
          },
        ],
      },
      {
        speaker: CUSTOMER,
        speakerEmoji: '🙂',
        says: {
          en: '"Okay, I\'ll take the refund and think about the other brand. Thanks for handling that well."',
          zu: '"Kulungile, ngizothatha imali ebuyayo bese ngicabanga ngolunye uhlobo. Ngiyabonga ngokukuphatha kahle lokho."',
        },
        choices: [
          {
            text: { en: 'Of course — sorry again for the trouble. Come find me if you decide on the other kettle.', zu: 'Impela — uxolo futhi ngenkinga. Ungithole uma unquma ngeketulo elinye.' },
            points: 10,
            reaction: { en: '"I appreciate that. You turned a bad day around."', zu: '"Ngiyakwazisa lokho. Ushintshe usuku olubi lwaba luhle."' },
            tip: { en: 'A gracious close can turn a complaint into a loyal customer.', zu: 'Ukuvala ngomusa kungaguqula isikhalazo sibe yikhasimende elithembekile.' },
          },
          {
            text: { en: 'Here\'s your money. Bye.', zu: 'Nayi imali yakho. Sala kahle.' },
            points: 5,
            reaction: { en: 'The refund is done, but the recovery felt incomplete.', zu: 'Imali ebuyayo iqediwe, kodwa ukubuyisana bekungaphelele.' },
            tip: { en: 'You resolved it — now finish warmly to rebuild the relationship.', zu: 'Ukuxazululile — manje vala ngomusa ukuze wakhe kabusha ubudlelwano.' },
          },
          {
            text: { en: 'Next time keep your receipt or I can\'t help you.', zu: 'Ngokuzayo gcina irisidi yakho ngoba angeke ngikwazi ukukusiza.' },
            points: 0,
            reaction: { en: 'The goodwill evaporates. "Wow, okay."', zu: 'Umusa uyanyamalala. "Hhawu, kulungile."' },
            tip: { en: 'Never end on a lecture. Leave the customer feeling looked after.', zu: 'Ungalokothi uvale ngokufundisa. Shiya ikhasimende lizizwa linakekelwe.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Lead with empathy before quoting policy.', zu: 'Qala ngozwelo ngaphambi kokusho inqubomgomo.' },
      { en: 'Know your returns policy so you can act confidently and fairly.', zu: 'Yazi inqubomgomo yakho yokubuyisa ukuze wenze ngokuzethemba nangokulunga.' },
      { en: 'Never blame the customer — turn the complaint into loyalty.', zu: 'Ungalokothi usole ikhasimende — guqula isikhalazo sibe ukwethembeka.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HOSPITALITY 3 — The Restaurant Interview (VOICE)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-hosp-3',
    track: TRACKS.HOSPITALITY,
    emoji: '🎤',
    difficulty: 'intermediate',
    voice: true,
    title: { en: 'The Restaurant Interview (Voice)', zu: 'Inhlolokhono Yendawo Yokudlela (Ngezwi)' },
    role: { en: 'You are interviewing for a waiter position. Answer OUT LOUD.', zu: 'Usenhlolokhono yomsebenzi wokuphakela. Phendula NGOKUZWAKALAYO.' },
    meterLabel: { en: 'Interview Performance', zu: 'Ukusebenza Kwenhlolokhono' },
    setting: {
      en: 'You arrive at a busy restaurant for a waiter interview. The manager will ask you real questions — and you will answer by SPEAKING out loud, like in a real interview. Find a quiet place and allow microphone access.',
      zu: 'Ufika endaweni yokudlela exinene ngenhlolokhono yomphakeli. Umphathi uzokubuza imibuzo yangempela — futhi uzophendula NGOKUKHULUMA ngokuzwakalayo, njengasenhlolokhonweni yangempela. Thola indawo ethulile uvumele ukufinyelela kwemakrofoni.',
    },
    scenes: [
      {
        speaker: INTERVIEWER,
        speakerEmoji: '👔',
        says: {
          en: 'The manager comes out, offers a handshake, and says: "Thanks for coming in. Please, have a seat."',
          zu: 'Umphathi uyaphuma, welule isandla, athi: "Siyabonga ngokuza. Ngicela uhlale phansi."',
        },
        choices: [
          {
            text: { en: 'Shake firmly, make eye contact, smile: "Thank you for making the time to see me."', zu: 'Xhawula ngokuqinile, ubuke emehlweni, umamatheke: "Ngiyabonga ngokungibona."' },
            points: 10,
            reaction: { en: 'The manager smiles back. "Great to meet you. Let\'s begin."', zu: 'Umphathi uyamamatheka naye. "Kuhle ukukwazi. Ake siqale."' },
            tip: { en: 'A firm handshake, eye contact and a thank-you set the tone before you say anything else.', zu: 'Ukuxhawula okuqinile, ukubuka emehlweni nokubonga kubeka isimo ngaphambi kokuba usho okunye.' },
          },
          {
            text: { en: 'Sit down quietly and wait for the questions.', zu: 'Hlala phansi ngokuthula ulinde imibuzo.' },
            points: 5,
            reaction: { en: 'The manager nods. The start feels a little cold.', zu: 'Umphathi uyavuma. Isiqalo sizwakala sibanda kancane.' },
            tip: { en: 'Silence reads as nerves. Greet the interviewer and thank them for the opportunity.', zu: 'Ukuthula kubukeka njengokwesaba. Bingelela umhloli umbonge ngethuba.' },
          },
          {
            text: { en: '"Sorry I\'m a bit late, the taxis were a nightmare."', zu: '"Uxolo ngokufika sekwephuzile kancane, amatekisi abeyinkinga."' },
            points: 0,
            reaction: { en: 'The manager checks their watch and frowns slightly.', zu: 'Umphathi ubheka iwashi lakhe ahwaqabale kancane.' },
            tip: { en: 'Never open with an excuse. Plan to arrive 15 minutes early so this sentence never happens.', zu: 'Ungalokothi uqale ngezaba. Hlela ukufika imizuzu engu-15 ngaphambi kwesikhathi ukuze lomusho ungenzeki.' },
          },
        ],
      },
      {
        type: 'speak',
        speaker: INTERVIEWER,
        speakerEmoji: '👔',
        says: {
          en: '"So — tell me about yourself, and why you want to work here."',
          zu: '"Manje — ngitshele ngawe, nokuthi kungani ufuna ukusebenza lapha."',
        },
        speak: {
          goal: {
            en: 'Answer out loud: introduce yourself by name, mention any experience (work, volunteering, school), and say why you want the job.',
            zu: 'Phendula ngokuzwakalayo: zethule ngegama, usho noma yiluphi ulwazi (umsebenzi, ukuvolontiya, isikole), bese usho ukuthi kungani ufuna lo msebenzi.',
          },
          example: {
            en: 'Good morning, my name is Thando. I have experience helping customers at my uncle\'s spaza shop, and I volunteer at my church serving meals. I love working with people and I would be excited to grow here.',
            zu: 'Sawubona, igama lami nginguThando. Nginolwazi lokusiza amakhasimende esitolo sikamalume, futhi ngivolontiya esontweni lami ngiphakela ukudla. Ngiyathanda ukusebenza nabantu futhi ngingajabula ukukhula lapha.',
          },
          keywords: [
            { any: ['my name is', 'i am', "i'm", 'name is', 'call me'], label: { en: 'Introduce yourself by name', zu: 'Zethule ngegama' } },
            { any: ['experience', 'worked', 'work', 'working', 'volunteer', 'volunteering', 'school', 'matric', 'helped', 'helping', 'spaza', 'church'], label: { en: 'Mention experience', zu: 'Sho ulwazi onalo' } },
            { any: ['people', 'customers', 'customer', 'guests', 'guest', 'service', 'serving'], label: { en: 'Talk about serving people', zu: 'Khuluma ngokusiza abantu' } },
            { any: ['love', 'enjoy', 'excited', 'passionate', 'keen', 'want to', 'would like', 'would love', 'really want'], label: { en: 'Show enthusiasm', zu: 'Khombisa intshisekelo' } },
          ],
          minMatches: 3,
          reactionPass: { en: 'The manager nods, impressed. "Clear, confident, and personal. I like that."', zu: 'Umphathi uyavuma, ehlabekile umxhwele. "Kucacile, kunokuzethemba, futhi kungokwakho. Ngiyakuthanda lokho."' },
          reactionPartial: { en: '"Okay — but tell me more about YOU. Who are you, what have you done?"', zu: '"Kulungile — kodwa ngitshele okwengeziwe NGAWE. Ungubani, wenzeni?"' },
          reactionFail: { en: 'The manager waits, then says: "Take a breath and try that again — start with your name."', zu: 'Umphathi uyalinda, bese ethi: "Phefumula bese uzama futhi — qala ngegama lakho."' },
        },
      },
      {
        type: 'speak',
        speaker: INTERVIEWER,
        speakerEmoji: '👔',
        says: {
          en: '"Last question. Imagine I\'m a guest and my food arrived cold. I\'m upset. What do you say to me? Go ahead — say it as if I\'m the guest."',
          zu: '"Umbuzo wokugcina. Cabanga ukuthi ngiyisivakashi futhi ukudla kwami kufike kubanda. Ngicasukile. Uthini kimi? Qhubeka — kusho sengathi ngiyisivakashi."',
        },
        speak: {
          goal: {
            en: 'Speak to the upset guest: apologise, offer to fix it right away, and stay courteous.',
            zu: 'Khuluma nesivakashi esicasukile: xolisa, unikeze ukukulungisa ngokushesha, uhlale unenhlonipho.',
          },
          example: {
            en: 'I am so sorry about that — you\'re right, that\'s not good enough. Let me take this back to the kitchen and bring you a fresh, hot plate right away. Thank you for your patience.',
            zu: 'Ngiyaxolisa kakhulu ngalokho — uqinisile, lokho akwanele. Ake ngikubuyisele ekhishini ngikulethele ipuleti elisha nelishisayo ngokushesha. Ngiyabonga ngesineke sakho.',
          },
          keywords: [
            { any: ['sorry', 'apologise', 'apologize', 'apologies', 'my apologies'], label: { en: 'Apologise sincerely', zu: 'Xolisa ngobuqotho' } },
            { any: ['right away', 'immediately', 'straight away', 'right now', 'fresh', 'new plate', 'new one', 'another one', 'kitchen', 'replace', 'remake', 'fix', 'sort it out', 'make it right', 'hot plate', 'warm it'], label: { en: 'Offer a fast fix', zu: 'Nikeza isixazululo esisheshayo' } },
            { any: ['thank', 'thanks', 'please', 'understand', 'of course', 'patience', 'no problem'], label: { en: 'Stay courteous', zu: 'Hlala unenhlonipho' } },
          ],
          minMatches: 2,
          reactionPass: { en: 'The manager smiles broadly. "That\'s exactly how we handle it here. Well done."', zu: 'Umphathi umamatheka kakhulu. "Yileyo ndlela esikuphatha ngayo lapha. Wenze kahle."' },
          reactionPartial: { en: '"Not bad — but remember: apologise first, then fix it fast."', zu: '"Akukubi — kodwa khumbula: xolisa kuqala, bese ukulungisa ngokushesha."' },
          reactionFail: { en: '"Hmm. The guest is still upset. What are the two things they need to hear from you?"', zu: '"Hmm. Isivakashi sisacasukile. Yiziphi izinto ezimbili esidinga ukuzizwa kuwe?"' },
        },
      },
    ],
    takeaways: [
      { en: 'Practising answers OUT LOUD builds real interview confidence — thinking it is not the same as saying it.', zu: 'Ukuzilolonga izimpendulo NGOKUZWAKALAYO kwakha ukuzethemba kwangempela — ukukucabanga akufani nokukusho.' },
      { en: 'Structure your self-introduction: name, experience, why this job.', zu: 'Hlela ukuzethula kwakho: igama, ulwazi, kungani lo msebenzi.' },
      { en: 'For any complaint: apologise, fix it fast, stay courteous.', zu: 'Kunoma yisiphi isikhalazo: xolisa, kulungise ngokushesha, uhlale unenhlonipho.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CALL CENTER 3 — The Call Centre Audition (VOICE)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-call-3',
    track: TRACKS.CALL_CENTER,
    emoji: '🎤',
    difficulty: 'intermediate',
    voice: true,
    title: { en: 'The Call Centre Audition (Voice)', zu: 'Ukuhlolwa Kwesikhungo Samakholi (Ngezwi)' },
    role: { en: 'A call centre interview where they test your phone voice. Answer OUT LOUD.', zu: 'Inhlolokhono yesikhungo samakholi lapho behlola izwi lakho locingo. Phendula NGOKUZWAKALAYO.' },
    meterLabel: { en: 'Audition Score', zu: 'Amaphuzu Okuhlolwa' },
    setting: {
      en: 'Call centres hire for one thing above all: how you sound on the phone. In this interview the recruiter will ask you to role-play live calls. Speak clearly and confidently — your voice IS the interview.',
      zu: 'Izikhungo zamakholi ziqasha into eyodwa ngaphezu kwakho konke: indlela ozwakala ngayo ocingweni. Kule nhlolokhono umqashi uzokucela ukuthi ulingise amakholi bukhoma. Khuluma ngokucacile nangokuzethemba — izwi lakho LIYINHLOLOKHONO.',
    },
    scenes: [
      {
        speaker: INTERVIEWER,
        speakerEmoji: '🧑‍💼',
        says: {
          en: 'The recruiter says: "We take hundreds of calls a day. Before we role-play, tell me — what do you think makes a great call centre agent?"',
          zu: 'Umqashi uthi: "Sithatha amakholi angamakhulu ngosuku. Ngaphambi kokulingisa, ngitshele — ucabanga ukuthi yini eyenza umsebenzi wesikhungo samakholi omuhle?"',
        },
        choices: [
          {
            text: { en: '"Listening properly, staying calm, and solving the problem on the first call if possible."', zu: '"Ukulalela kahle, ukuhlala uzolile, nokuxazulula inkinga ekholini yokuqala uma kwenzeka."' },
            points: 10,
            reaction: { en: '"Exactly. First-call resolution — you\'ve done your homework."', zu: '"Yikho kanye. Ukuxazulula ekholini yokuqala — wenze umsebenzi wakho wasekhaya."' },
            tip: { en: 'Call centres measure listening, calm, and first-call resolution. Naming these shows you understand the job.', zu: 'Izikhungo zamakholi zilinganisa ukulalela, ukuzola, nokuxazulula ekholini yokuqala. Ukuzisho kukhombisa ukuthi uyawuqonda umsebenzi.' },
          },
          {
            text: { en: '"Being able to talk a lot."', zu: '"Ukukwazi ukukhuluma kakhulu."' },
            points: 0,
            reaction: { en: 'The recruiter raises an eyebrow. "Actually, listening matters more than talking."', zu: 'Umqashi uphakamisa ishiya. "Empeleni, ukulalela kubaluleke ngaphezu kokukhuluma."' },
            tip: { en: 'The best agents listen more than they speak. Talking a lot is not the skill.', zu: 'Abasebenzi abangcono kakhulu balalela ngaphezu kokukhuluma. Ukukhuluma kakhulu akulona ikhono.' },
          },
          {
            text: { en: '"Patience, I guess."', zu: '"Isineke, mhlawumbe."' },
            points: 5,
            reaction: { en: '"Patience is part of it, yes. What else?" They wait for more.', zu: '"Isineke siyingxenye yakho, yebo. Yini enye?" Balinda okwengeziwe.' },
            tip: { en: 'Right idea, but "I guess" sounds unsure. Answer with confidence and detail.', zu: 'Umqondo ulungile, kodwa "mhlawumbe" kuzwakala ungaqiniseki. Phendula ngokuzethemba nangemininingwane.' },
          },
        ],
      },
      {
        type: 'speak',
        speaker: INTERVIEWER,
        speakerEmoji: '🧑‍💼',
        says: {
          en: '"Let\'s role-play. Ring ring — I\'m a customer calling in. Answer my call professionally. Go!"',
          zu: '"Ake silingise. Ring ring — ngiyikhasimende elishayelayo. Phendula ikholi yami ngobungcweti. Qhubeka!"',
        },
        speak: {
          goal: {
            en: 'Answer the call out loud: greet the caller, give your name, and offer to help.',
            zu: 'Phendula ikholi ngokuzwakalayo: bingelela oshayayo, usho igama lakho, unikeze usizo.',
          },
          example: {
            en: 'Good morning, thank you for calling. My name is Thando — how can I help you today?',
            zu: 'Sawubona, siyabonga ngokushayela. Igama lami nginguThando — ngingakusiza ngani namuhla?',
          },
          keywords: [
            { any: ['good morning', 'good afternoon', 'good evening', 'good day', 'hello', 'hi', 'greetings', 'thank you for calling', 'thanks for calling', 'welcome'], label: { en: 'Professional greeting', zu: 'Ukubingelela kobungcweti' } },
            { any: ['my name is', 'name is', 'this is', 'i am', "i'm", 'speaking', 'you are speaking'], label: { en: 'Give your name', zu: 'Sho igama lakho' } },
            { any: ['how can i help', 'how may i help', 'how can i assist', 'can i help', 'may i help', 'help you', 'assist you', 'what can i do'], label: { en: 'Offer to help', zu: 'Nikeza usizo' } },
          ],
          minMatches: 3,
          reactionPass: { en: '"Perfect phone manner — warm, clear, professional. You\'d pass our call audit."', zu: '"Indlela ephelele yocingo — ifudumele, icacile, inobungcweti. Ubuzophumelela ukuhlolwa kwethu kwamakholi."' },
          reactionPartial: { en: '"Good start — but a full opening has three parts: greeting, your name, and an offer to help."', zu: '"Isiqalo esihle — kodwa ukuvula okugcwele kunezingxenye ezintathu: ukubingelela, igama lakho, nokunikeza usizo."' },
          reactionFail: { en: '"Hmm — imagine you\'re the customer. What would YOU want to hear when someone answers?"', zu: '"Hmm — cabanga ukuthi uyikhasimende. Yini WENA ongathanda ukuyizwa uma umuntu ephendula?"' },
        },
      },
      {
        type: 'speak',
        speaker: INTERVIEWER,
        speakerEmoji: '🧑‍💼',
        says: {
          en: '"Now the hard one. I\'m furious: \'You people charged me twice and I want my money back NOW!\' — What do you say first? Speak."',
          zu: '"Manje okunzima. Ngithukuthele: \'Nina bantu ningikhokhise kabili futhi ngifuna imali yami MANJE!\' — Uthini kuqala? Khuluma."',
        },
        speak: {
          goal: {
            en: 'Calm the angry caller out loud: show you understand, apologise, and promise to look into it.',
            zu: 'Dambisa oshayayo othukuthele ngokuzwakalayo: khombisa ukuthi uyaqonda, xolisa, uthembise ukukuhlola.',
          },
          example: {
            en: 'I completely understand your frustration, and I\'m sorry about this. Let me look into your account right now and sort this out for you.',
            zu: 'Ngiyakuqonda ngokuphelele ukucasuka kwakho, futhi ngiyaxolisa ngalokhu. Ake ngihlole i-akhawunti yakho njengamanje ngikulungisele lokhu.',
          },
          keywords: [
            { any: ['understand', 'i hear you', 'i hear', 'frustrating', 'frustration', 'frustrated', 'i know', 'i see why', 'must be'], label: { en: 'Acknowledge the emotion', zu: 'Yamukela imizwa' } },
            { any: ['sorry', 'apologise', 'apologize', 'apologies', 'my apologies'], label: { en: 'Apologise', zu: 'Xolisa' } },
            { any: ['look into', 'look at', 'check', 'sort this', 'sort it', 'fix', 'resolve', 'help you', 'right now', 'right away', 'make this right', 'refund', 'account'], label: { en: 'Promise action', zu: 'Thembisa isenzo' } },
          ],
          minMatches: 2,
          reactionPass: { en: 'The recruiter drops the act and smiles. "That\'s textbook de-escalation. When can you start?"', zu: 'Umqashi uyeka ukulingisa amamatheke. "Lokho ukudambisa okusezingeni. Ungaqala nini?"' },
          reactionPartial: { en: '"Decent — but never skip the apology. It\'s the fastest way to lower the temperature."', zu: '"Kuhle — kodwa ungakweqi ukuxolisa. Kuyindlela esheshayo yokwehlisa ukushisa."' },
          reactionFail: { en: '"The customer just got angrier. Remember: understand, apologise, act. Try that order."', zu: '"Ikhasimende livele lathukuthela kakhulu. Khumbula: qonda, xolisa, yenza. Zama lolo hlelo."' },
        },
      },
    ],
    takeaways: [
      { en: 'In call centre interviews, your voice is the product — practise answering out loud.', zu: 'Ezinhlolokhonweni zesikhungo samakholi, izwi lakho liwumkhiqizo — zilolonge ukuphendula ngokuzwakalayo.' },
      { en: 'A full phone opening: greeting + your name + offer to help.', zu: 'Ukuvula ucingo okugcwele: ukubingelela + igama lakho + ukunikeza usizo.' },
      { en: 'With angry callers: acknowledge, apologise, act — in that order.', zu: 'Nabashayayo abathukuthele: yamukela, xolisa, yenza — ngalolo hlelo.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETAIL 3 — The Store Floor Try-Out (VOICE)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-retail-3',
    track: TRACKS.RETAIL,
    emoji: '🎤',
    difficulty: 'beginner',
    voice: true,
    title: { en: 'The Store Floor Try-Out (Voice)', zu: 'Ukuzanywa Ophahleni Lwesitolo (Ngezwi)' },
    role: { en: 'A retail interview with a live floor test. Answer OUT LOUD.', zu: 'Inhlolokhono yezokuthengisa nokuhlolwa bukhoma ophahleni. Phendula NGOKUZWAKALAYO.' },
    meterLabel: { en: 'Try-Out Score', zu: 'Amaphuzu Okuzanywa' },
    setting: {
      en: 'The store manager likes your CV, but wants to see you in action. She takes you onto the shop floor for a live try-out: you\'ll speak to "customers" (played by her) out loud.',
      zu: 'Umphathi wesitolo uyayithanda i-CV yakho, kodwa ufuna ukukubona usebenza. Ukuyisa ophahleni lwesitolo ukuze uzanywe bukhoma: uzokhuluma "namakhasimende" (alingiswa nguye) ngokuzwakalayo.',
    },
    scenes: [
      {
        speaker: INTERVIEWER,
        speakerEmoji: '🧑‍💼',
        says: {
          en: 'On the floor, she asks: "Before we start — a customer walks in looking around. When do you approach them?"',
          zu: 'Ophahleni, uyabuza: "Ngaphambi kokuqala — ikhasimende lingena libukabuka. Ulisondela nini?"',
        },
        choices: [
          {
            text: { en: '"Greet them right away, then give them space and check back when they seem to need help."', zu: '"Ngibabingelela ngokushesha, bese ngibanika isikhala ngibuye ngibheke uma bebonakala bedinga usizo."' },
            points: 10,
            reaction: { en: '"That\'s the balance we want — present but not pushy."', zu: '"Yilokho kulinganisela esikufunayo — ukhona kodwa awuphoqi."' },
            tip: { en: 'Greet immediately, hover never. Customers buy more when they feel welcomed but not watched.', zu: 'Bingelela ngokushesha, ungabazungezi. Amakhasimende athenga kakhulu uma ezizwa amukelekile kodwa engabhekwe njalo.' },
          },
          {
            text: { en: '"Follow them around the store so they don\'t steal anything."', zu: '"Ngibalandele esitolo sonke ukuze bangebi lutho."' },
            points: 0,
            reaction: { en: 'She frowns. "That makes honest customers feel accused. Security handles that."', zu: 'Uyahwaqabala. "Lokho kwenza amakhasimende athembekile azizwe esolwa. Ezokuphepha zibhekana nalokho."' },
            tip: { en: 'Shadowing customers drives them away. Your job is welcome and help, not surveillance.', zu: 'Ukulandela amakhasimende kuyawaxosha. Umsebenzi wakho ukwamukela nokusiza, hhayi ukugada.' },
          },
          {
            text: { en: '"Wait until they come to me at the till."', zu: '"Ngilinde baze beze kimi ekhawunta."' },
            points: 5,
            reaction: { en: '"Then half of them walk out without finding what they came for."', zu: '"Ngakho ingxenye yabo iphuma ingakutholanga ebikuzele."' },
            tip: { en: 'Passive service loses sales. A warm early greeting opens the door to helping.', zu: 'Isevisi engenzi lutho ilahlekelwa ukudayisa. Ukubingelela kwasekuqaleni okufudumele kuvula umnyango wokusiza.' },
          },
        ],
      },
      {
        type: 'speak',
        speaker: INTERVIEWER,
        speakerEmoji: '🧑‍💼',
        says: {
          en: '"Role-play time. I\'m a customer who just walked in. Greet me and offer to help — out loud, like you would on the floor."',
          zu: '"Isikhathi sokulingisa. Ngiyikhasimende elisanda kungena. Ngibingelele unginikeze usizo — ngokuzwakalayo, njengoba ubungenza ophahleni."',
        },
        speak: {
          goal: {
            en: 'Greet the customer out loud: welcome them warmly and offer your help.',
            zu: 'Bingelela ikhasimende ngokuzwakalayo: lamukele ngemfudumalo ulinikeze usizo lwakho.',
          },
          example: {
            en: 'Good afternoon, welcome to the store! Is there anything I can help you find today?',
            zu: 'Sawubona, wamukelekile esitolo! Ingabe kukhona engingakusiza ukukuthola namuhla?',
          },
          keywords: [
            { any: ['good morning', 'good afternoon', 'good evening', 'good day', 'hello', 'hi', 'hi there', 'welcome'], label: { en: 'Warm greeting', zu: 'Ukubingelela okufudumele' } },
            { any: ['help you', 'can i help', 'may i help', 'how can i help', 'assist', 'looking for', 'help you find', 'need any help', 'need help'], label: { en: 'Offer to help', zu: 'Nikeza usizo' } },
            { any: ['today', 'anything', 'welcome', 'please', 'find', 'store', 'looking'], label: { en: 'Friendly, open tone', zu: 'Ithoni enobungane nevulekile' } },
          ],
          minMatches: 2,
          reactionPass: { en: '"See, that\'s a natural welcome. Customers would warm to you immediately."', zu: '"Uyabona, lokho ukwamukela kwemvelo. Amakhasimende angakuthanda ngokushesha."' },
          reactionPartial: { en: '"Almost — add an offer to help after the greeting. That\'s what opens the conversation."', zu: '"Cishe — engeza ukunikeza usizo ngemva kokubingelela. Yilokho okuvula inkulumo."' },
          reactionFail: { en: '"Too quiet! On a busy floor no one will hear that. Big smile, clear voice — again."', zu: '"Kuthule kakhulu! Ophahleni oluxinene akekho ozokuzwa lokho. Ukumamatheka okukhulu, izwi elicacile — futhi."' },
        },
      },
      {
        type: 'speak',
        speaker: INTERVIEWER,
        speakerEmoji: '🧑‍💼',
        says: {
          en: '"Now I\'m a customer and I\'m annoyed: \'I\'ve looked everywhere and I can\'t find the bread!\' — Respond to me out loud."',
          zu: '"Manje ngiyikhasimende futhi ngicasukile: \'Ngibheke yonke indawo futhi angisitholi isinkwa!\' — Ngiphendule ngokuzwakalayo."',
        },
        speak: {
          goal: {
            en: 'Help the frustrated customer out loud: be courteous, and offer to take or show them to the item.',
            zu: 'Siza ikhasimende elicasukile ngokuzwakalayo: yiba nenhlonipho, unikeze ukubayisa noma ukubakhombisa impahla.',
          },
          example: {
            en: 'I\'m sorry about that! No problem at all — come with me, I\'ll show you exactly where the bread is.',
            zu: 'Ngiyaxolisa ngalokho! Ayikho neze inkinga — woza nami, ngizokukhombisa kahle ukuthi isinkwa sikuphi.',
          },
          keywords: [
            { any: ['sorry', 'apologise', 'apologize', 'no problem', 'of course', 'sure', 'let me help', 'i can help', 'happy to'], label: { en: 'Courteous response', zu: 'Impendulo enenhlonipho' } },
            { any: ['show you', 'come with me', 'come with', 'follow me', 'take you', 'walk you', 'this way', "i'll show", 'i will show', 'let me show'], label: { en: 'Walk them there — don\'t point', zu: 'Bahambise — ungakhombi nje' } },
            { any: ['bread', 'aisle', 'right here', 'over here', 'section', 'shelf', 'where it is'], label: { en: 'Name the item or place', zu: 'Sho impahla noma indawo' } },
          ],
          minMatches: 2,
          reactionPass: { en: 'She claps once. "Walking the customer there instead of pointing — that\'s exactly it. You\'re hired for the trial shift."', zu: 'Ushaya izandla kanye. "Ukuhambisa ikhasimende esikhundleni sokukhomba — yikho kanye. Uqashiwe kushifthi yokuzama."' },
          reactionPartial: { en: '"Good instinct. One rule here: we never point — we walk the customer to the shelf."', zu: '"Umuzwa omuhle. Umthetho owodwa lapha: asikhombi — sihambisa ikhasimende eshalofini."' },
          reactionFail: { en: '"The customer is still lost. Help them feel helped: apologise, then take them there yourself."', zu: '"Ikhasimende lisadidekile. Lisize lizizwe lisiziwe: xolisa, bese ulihambisa wena uqobo."' },
        },
      },
    ],
    takeaways: [
      { en: 'Retail interviews often include live try-outs — practise speaking to customers out loud.', zu: 'Izinhlolokhono zezokuthengisa zivame ukuba nokuzanywa bukhoma — zilolonge ukukhuluma namakhasimende ngokuzwakalayo.' },
      { en: 'Greet immediately, offer help, then give space.', zu: 'Bingelela ngokushesha, unikeze usizo, bese unika isikhala.' },
      { en: 'Never point — walk the customer to what they need.', zu: 'Ungalokothi ukhombe — hambisa ikhasimende kulokho elikudingayo.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JOB HUNTING 1 — Spot the Job Scam
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sim-scam-1',
    track: TRACKS.JOB_HUNT,
    emoji: '🛡️',
    difficulty: 'beginner',
    title: { en: 'Spot the Job Scam', zu: 'Bona Umkhonyovu Womsebenzi' },
    role: { en: 'You are job hunting. Not every "opportunity" is real.', zu: 'Ufuna umsebenzi. Akuwona wonke "amathuba" angempela.' },
    meterLabel: { en: 'Scam Radar', zu: 'Irada Yomkhonyovu' },
    setting: {
      en: 'You have been applying for jobs for months. This week, four "opportunities" come your way. Real recruiters never ask you to pay — let\'s see if you can tell which of these are real and which are traps.',
      zu: 'Sekuyizinyanga ufaka izicelo zomsebenzi. Kuleli sonto, kufika "amathuba" amane kuwe. Abaqashi bangempela abalokothi bakucele ukuthi ukhokhe — ake sibone ukuthi uyakwazi yini ukubona ukuthi yimaphi angempela nokuthi yimaphi ayizingibe.',
    },
    scenes: [
      {
        speaker: { en: 'WhatsApp message', zu: 'Umlayezo we-WhatsApp' },
        speakerEmoji: '📱',
        says: {
          en: '"CONGRATULATIONS! You have been selected for a position at a top retail company. Salary R8,500/month. To secure your position, send R150 registration fee to this number today."',
          zu: '"HALALA! Ukhethiwe esikhundleni enkampanini ephezulu yezokuthengisa. Umholo ongu-R8,500 ngenyanga. Ukuze uvikele isikhundla sakho, thumela imali yokubhalisa engu-R150 kule nombolo namuhla."',
        },
        choices: [
          {
            text: { en: 'Delete and block. A real employer NEVER asks you to pay for a job.', zu: 'Sula futhi uvimbe. Umqashi wangempela AKALOKOTHI akucele ukuthi ukhokhele umsebenzi.' },
            points: 10,
            reaction: { en: 'Scam avoided. That R150 would have vanished — there was never a job.', zu: 'Umkhonyovu ugwenyiwe. Leyo R150 ibizonyamalala — bekungekho msebenzi kusukela ekuqaleni.' },
            tip: { en: 'The registration fee scam is the most common job scam in South Africa. Any request for money = scam. Every time.', zu: 'Umkhonyovu wemali yokubhalisa yiwona ovame kakhulu eNingizimu Afrika. Noma yisiphi isicelo semali = umkhonyovu. Njalo.' },
          },
          {
            text: { en: 'R150 is small compared to R8,500 a month — send it, it\'s worth the risk.', zu: 'U-R150 mncane uma uqhathaniswa no-R8,500 ngenyanga — yithumele, kufanele ingozi.' },
            points: 0,
            reaction: { en: 'The money is gone. The number stops replying. There was never a job.', zu: 'Imali ihambile. Inombolo iyeka ukuphendula. Bekungekho msebenzi kusukela ekuqaleni.' },
            tip: { en: 'Scammers price the "fee" low on purpose so it feels worth the gamble. Thousands of people send it every month.', zu: 'Abakhonyovu babeka "imali" phansi ngamabomu ukuze kuzwakale kufanele ukuzama. Izinkulungwane zabantu ziyithumela nyanga zonke.' },
          },
          {
            text: { en: 'Ask them which company it is first.', zu: 'Babuze kuqala ukuthi iyiphi inkampani.' },
            points: 5,
            reaction: { en: 'They name a real company — scammers always do. Then they ask for the money again, "urgently".', zu: 'Basho inkampani yangempela — abakhonyovu bahlala benza njalo. Bese becela imali futhi, "ngokushesha".' },
            tip: { en: 'Asking questions is smart, but scammers have smooth answers ready. The fee itself is all the proof you need.', zu: 'Ukubuza imibuzo kuhlakaniphile, kodwa abakhonyovu banezimpendulo ezishelelayo ezilungile. Imali ngokwayo iwubufakazi obanele.' },
          },
        ],
      },
      {
        speaker: { en: 'Email', zu: 'I-imeyili' },
        speakerEmoji: '📧',
        says: {
          en: 'An email offers you an interview — but asks you to first reply with your ID number, bank account details, and a photo of your bank card "for the payroll system".',
          zu: 'I-imeyili ikunikeza inhlolokhono — kodwa icela ukuthi uqale uphendule ngenombolo yakho kamazisi, imininingwane ye-akhawunti yasebhange, nesithombe sekhadi lakho lasebhange "ohlelweni lwamaholo".',
        },
        choices: [
          {
            text: { en: 'Never send bank details before you have a signed job offer. Delete it.', zu: 'Ungalokothi uthumele imininingwane yasebhange ungakatholi isithembiso somsebenzi esisayiniwe. Yisule.' },
            points: 10,
            reaction: { en: 'Good call. That was an identity theft attempt — they wanted your account, not your CV.', zu: 'Isinqumo esihle. Lokho bekuwumzamo wokweba ubunikazi — bebefuna i-akhawunti yakho, hhayi i-CV yakho.' },
            tip: { en: 'Employers only need bank details AFTER you are hired, on official paperwork. ID + bank card photo = identity theft kit.', zu: 'Abaqashi badinga imininingwane yasebhange NGEMVA kokuqashwa kwakho kuphela, emaphepheni asemthethweni. Umazisi + isithombe sekhadi = amathuluzi okweba ubunikazi.' },
          },
          {
            text: { en: 'Send everything — you don\'t want to seem difficult before the interview.', zu: 'Thumela konke — awufuni ukubonakala unzima ngaphambi kwenhlolokhono.' },
            points: 0,
            reaction: { en: 'Within a week there are loans taken out in your name. Cleaning this up takes years.', zu: 'Ngaphakathi kwesonto sekunezikweletu ezithathwe ngegama lakho. Ukukulungisa lokhu kuthatha iminyaka.' },
            tip: { en: 'Your ID number plus bank details is everything a criminal needs. No interview is worth it.', zu: 'Inombolo yakho kamazisi kanye nemininingwane yasebhange yikho konke isigebengu esikudingayo. Ayikho inhlolokhono efanele lokho.' },
          },
          {
            text: { en: 'Send only your ID number, keep the bank details back.', zu: 'Thumela inombolo kamazisi kuphela, ugodle imininingwane yasebhange.' },
            points: 5,
            reaction: { en: 'Better than everything — but your ID number alone can still be used for fraud in your name.', zu: 'Kungcono kunakho konke — kodwa inombolo yakho kamazisi yodwa isengasetshenziswa ekukhwabaniseni ngegama lakho.' },
            tip: { en: 'Before an interview, a recruiter needs your CV — nothing else. Documents come later, in person, at a real office.', zu: 'Ngaphambi kwenhlolokhono, umqashi udinga i-CV yakho — akukho okunye. Amaphepha eza kamuva, mathupha, ehhovisi langempela.' },
          },
        ],
      },
      {
        speaker: { en: 'Phone call', zu: 'Ucingo' },
        speakerEmoji: '📞',
        says: {
          en: 'A "recruiter" calls: "The interview is tomorrow at 7pm. Come alone to the taxi rank behind the garage, my colleague will meet you there and take you to the office."',
          zu: 'Umuntu ozibiza "umqashi" uyashaya: "Inhlolokhono ikusasa ngo-7 ebusuku. Woza wedwa erenki yamatekisi ngemva kwegaraji, uzohlangana nozakwethu lapho akuyise ehhovisi."',
        },
        choices: [
          {
            text: { en: 'Refuse. Real interviews happen at business premises during business hours. Tell someone about this call.', zu: 'Yenqaba. Izinhlolokhono zangempela zenzeka ezindaweni zebhizinisi ngamahora omsebenzi. Tshela othile ngalolu cingo.' },
            points: 10,
            reaction: { en: 'You trusted your gut. Meetings like that one are how people get robbed — or worse.', zu: 'Uthembe umuzwa wakho. Imihlangano efana naleyo yindlela abantu ababanjwa inkunzi ngayo — noma okubi nakakhulu.' },
            tip: { en: 'A real interview: business address, business hours, and you can bring someone who waits outside. Anything else, walk away.', zu: 'Inhlolokhono yangempela: ikheli lebhizinisi, amahora ebhizinisi, futhi ungaphelezelwa umuntu ozokulinda ngaphandle. Noma yini enye, hamba.' },
          },
          {
            text: { en: 'Go — you can\'t afford to miss any chance at a job.', zu: 'Hamba — awukwazi ukuphuthelwa yinoma yiliphi ithuba lomsebenzi.' },
            points: 0,
            reaction: { en: 'This is exactly how robbery and kidnapping setups work. Desperation is what they are counting on.', zu: 'Yile ndlela kanye amacebo okubamba inkunzi nokuthumba asebenza ngayo. Ukuphelelwa yithemba yikho kanye abakulindele.' },
            tip: { en: 'Scammers target job seekers because they know you will take risks for work. Your safety comes before any opportunity.', zu: 'Abakhonyovu baqondisa kubafuna-msebenzi ngoba bayazi ukuthi uzothatha izingozi ngenxa yomsebenzi. Ukuphepha kwakho kuza ngaphambi kwanoma yiliphi ithuba.' },
          },
          {
            text: { en: 'Ask a friend to come with you and go together.', zu: 'Cela umngane akuphelezele nihambe ndawonye.' },
            points: 5,
            reaction: { en: 'Safer — but you are still meeting a stranger at night behind a garage. The "job" doesn\'t exist.', zu: 'Kuphephile kancane — kodwa usahlangana nomuntu ongamazi ebusuku ngemva kwegaraji. "Umsebenzi" awukho.' },
            tip: { en: 'Bringing a friend helps, but the real answer is refusing meetings that don\'t look like business. 7pm at a taxi rank is not an interview.', zu: 'Ukuphelezelwa umngane kuyasiza, kodwa impendulo yangempela ukwenqaba imihlangano engabukeki njengebhizinisi. U-7 ebusuku erenki yamatekisi akuyona inhlolokhono.' },
          },
        ],
      },
      {
        speaker: { en: 'Job advert', zu: 'Isikhangiso somsebenzi' },
        speakerEmoji: '📋',
        says: {
          en: 'You find an advert: a named company, a street address, a landline number, a detailed job description, and it says "No fees. Apply via our website or hand in your CV at reception." What do you do?',
          zu: 'Uthola isikhangiso: inkampani enegama, ikheli lomgwaqo, inombolo yocingo lwasehhovisi, incazelo yomsebenzi enemininingwane, futhi sithi "Ayikho imali ekhokhwayo. Faka isicelo kuwebhusayithi yethu noma ulethe i-CV yakho emahhovisi." Wenzenjani?',
        },
        choices: [
          {
            text: { en: 'This one has the signs of a real job — verify the company, then apply properly.', zu: 'Lesi sinezimpawu zomsebenzi wangempela — qinisekisa inkampani, bese ufaka isicelo ngendlela efanele.' },
            points: 10,
            reaction: { en: 'Correct! Real address, landline, no fees, an official way to apply — this is what legitimate looks like.', zu: 'Kulungile! Ikheli langempela, ucingo lwasehhovisi, ayikho imali, indlela esemthethweni yokufaka isicelo — yile ndlela okusemthethweni okubukeka ngayo.' },
            tip: { en: 'Green flags: physical address, landline, no fees, applications through official channels, and the company exists when you search it.', zu: 'Izimpawu ezinhle: ikheli langempela, ucingo lwasehhovisi, ayikho imali, izicelo ngezindlela ezisemthethweni, futhi inkampani iyatholakala uma uyisesha.' },
          },
          {
            text: { en: 'Assume it\'s also a scam — trust nothing, apply to nothing.', zu: 'Cabanga ukuthi nawo umkhonyovu — ungathembi lutho, ungafaki sicelo ndawo.' },
            points: 5,
            reaction: { en: 'Caution is good, but this one checks out. Total distrust means missing real opportunities too.', zu: 'Ukuqapha kuhle, kodwa lesi siyavivinyeka. Ukungathembi nhlobo kusho ukuphuthelwa amathuba angempela futhi.' },
            tip: { en: 'The goal is a radar, not a wall. Learn the red flags so you can act on the real ones with confidence.', zu: 'Inhloso irada, hhayi udonga. Funda izimpawu ezibomvu ukuze wenze ngokuzethemba kwezangempela.' },
          },
          {
            text: { en: 'Apply, but send them your bank details upfront to speed things up.', zu: 'Faka isicelo, kodwa bathumelele imininingwane yasebhange kusengaphambili ukusheshisa izinto.' },
            points: 0,
            reaction: { en: 'The advert is real — but you just volunteered information nobody asked for. Never do that.', zu: 'Isikhangiso singesangempela — kodwa usanda kunikela ngolwazi obungacelwanga muntu. Ungalokothi ukwenze lokho.' },
            tip: { en: 'Even with real employers: share sensitive details only when asked, after hiring, through official paperwork.', zu: 'Ngisho nakubaqashi bangempela: yabelana ngemininingwane ebucayi kuphela lapho icelwa, ngemva kokuqashwa, ngamaphepha asemthethweni.' },
          },
        ],
      },
    ],
    takeaways: [
      { en: 'Any job that asks for money — registration, training, uniform "deposits" — is a scam. No exceptions.', zu: 'Noma yimuphi umsebenzi ocela imali — ukubhalisa, ukuqeqeshwa, "amadiphozithi" omfaniswano — umkhonyovu. Azikho izaphulelo.' },
      { en: 'Never share your ID number or bank details before a real, signed job offer.', zu: 'Ungalokothi wabelane ngenombolo kamazisi noma imininingwane yasebhange ngaphambi kwesithembiso somsebenzi sangempela esisayiniwe.' },
      { en: 'Real interviews happen at business premises, in business hours. Your safety beats any opportunity.', zu: 'Izinhlolokhono zangempela zenzeka ezindaweni zebhizinisi, ngamahora ebhizinisi. Ukuphepha kwakho kudlula noma yiliphi ithuba.' },
    ],
  },
]

// Score band thresholds (as a percentage of the maximum possible score).
export const SCORE_BANDS = { great: 0.8, ok: 0.5 }

export class Simulation {
  static getAll() {
    return simulations
  }

  static getById(id) {
    return simulations.find((s) => s.id === id)
  }

  static getByTrack(track) {
    return simulations.filter((s) => s.track === track)
  }

  static getTracks() {
    return [...new Set(simulations.map((s) => s.track))]
  }

  static maxScore(sim) {
    return sim.scenes.length * 10
  }

  static band(sim, score) {
    const pct = score / Simulation.maxScore(sim)
    if (pct >= SCORE_BANDS.great) return 'great'
    if (pct >= SCORE_BANDS.ok) return 'ok'
    return 'poor'
  }
}
