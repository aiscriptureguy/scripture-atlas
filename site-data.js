window.ScriptureAtlasData = (() => {
  const storageKey = "scripture-atlas.current-topic";
  const defaultTopicId = "hope-healing";

  const topics = [
    {
      id: "hope-healing",
      name: "Hope and Healing",
      color: "#e2b85b",
      teaser: "For grief, weariness, and needing Christ's help now.",
      summary: "Start here when someone feels burdened, discouraged, or wounded. These passages point to the Savior's power to succor, strengthen, and restore.",
    },
    {
      id: "repentance",
      name: "Repentance and Purity",
      color: "#d97b76",
      teaser: "For guilt, shame, temptation, and coming back to the Lord.",
      summary: "These scriptures teach that repentance is real, cleansing is possible through Jesus Christ, and holiness is worth protecting.",
    },
    {
      id: "guidance",
      name: "Guidance and Revelation",
      color: "#7cc2d3",
      teaser: "For answers, direction, and hearing the Lord.",
      summary: "Use this set when you need help choosing, understanding, or receiving spiritual direction through prayer, scripture, and the Holy Ghost.",
    },
    {
      id: "faith",
      name: "Faith and Testimony",
      color: "#f2a97b",
      teaser: "For trusting Christ before the whole answer is visible.",
      summary: "These passages strengthen testimony in Jesus Christ and help people act in faith while they are still learning and growing.",
    },
    {
      id: "agency",
      name: "Agency and Covenants",
      color: "#88b070",
      teaser: "For obedience, commitment, and enduring discipleship.",
      summary: "This topic gathers scriptures about choosing the Lord, honoring covenants, and moving forward with willing, faithful action.",
    },
    {
      id: "identity",
      name: "Worth and Divine Identity",
      color: "#c78fe3",
      teaser: "For remembering whose child you are and what you can become.",
      summary: "These references teach divine nature, eternal worth, and the joyful purpose Heavenly Father has for His children.",
    },
    {
      id: "service",
      name: "Service and Charity",
      color: "#73c7a6",
      teaser: "For ministering, gratitude, and Christlike love.",
      summary: "Come here when the need is to love more deeply, serve more freely, and let discipleship bless other people.",
    },
    {
      id: "home",
      name: "Home and Daily Habits",
      color: "#9ab0ff",
      teaser: "For family life, youth habits, and steady discipleship.",
      summary: "This set supports prayer, forgiveness, wholesome routines, and faithful living in the home and in everyday choices.",
    },
    {
      id: "restoration",
      name: "Restoration and Priesthood",
      color: "#f0bb67",
      teaser: "For understanding the Church, keys, and restored authority.",
      summary: "These scriptures help explain the Restoration, priesthood authority, and how the Lord leads His Church today.",
    },
    {
      id: "eternal",
      name: "Ordinances and Eternal Perspective",
      color: "#7fa3d9",
      teaser: "For seeing mortality in light of eternity.",
      summary: "These passages connect ordinances, judgment, resurrection, and eternal glory so present choices stay tied to God's larger plan.",
    },
  ];

  const rawPassageGroups = {
    "hope-healing": [
      ["He Understands", "Alma 7:11-13"],
      ["Healed Wounds", "Isaiah 53:3-5"],
      ["Come Rest", "Matthew 11:28-30"],
      ["Hope Christ", "Moroni 7:41"],
      ["Strength Christ", "Philippians 4:13"],
      ["Look Christ", "Doctrine and Covenants 6:36"],
      ["Learn Listen", "Doctrine and Covenants 19:23"],
      ["Weak Strong", "Ether 12:27"],
      ["Risen Body", "Luke 24:36-39"],
      ["All Rise", "1 Corinthians 15:20-22"],
    ],
    repentance: [
      ["Scarlet White", "Isaiah 1:18"],
      ["Repent Baptize", "Acts 2:36-38"],
      ["Forsake Confess", "Doctrine and Covenants 58:42-43"],
      ["He Suffered", "Doctrine and Covenants 19:16-19"],
      ["Watch Self", "Mosiah 4:30"],
      ["Flee Lust", "Alma 39:9"],
      ["Sin Not Happy", "Alma 41:10"],
      ["Resist Sin", "Genesis 39:9"],
      ["Clean Hands", "Psalm 24:3-4"],
      ["Body Temple", "1 Corinthians 6:19-20"],
    ],
    guidance: [
      ["Feast Words", "2 Nephi 32:3"],
      ["Pray Always", "2 Nephi 32:8-9"],
      ["Lamp Word", "Psalm 119:105"],
      ["Trust Lord", "Proverbs 3:5-6"],
      ["Ask Wisdom", "James 1:5-6"],
      ["Ask God", "Moroni 10:4-5"],
      ["Mind Heart", "Doctrine and Covenants 8:2-3"],
      ["Prophets Speak", "Amos 3:7"],
      ["Words Fulfilled", "Doctrine and Covenants 1:37-38"],
      ["Scripture Helps", "2 Timothy 3:15-17"],
    ],
    faith: [
      ["Faith Unseen", "Alma 32:21"],
      ["After Trial", "Ether 12:6"],
      ["He Lives", "Doctrine and Covenants 76:22-24"],
      ["First Vision", "Joseph Smith-History 1:15-20"],
      ["Only Way", "John 14:6"],
      ["Know God", "John 17:3"],
      ["Glad Tidings", "Doctrine and Covenants 76:40-41"],
      ["Love Obey", "John 14:15"],
      ["Grace After", "2 Nephi 25:23, 26"],
      ["Christ Foundation", "Helaman 5:12"],
    ],
    agency: [
      ["Go-Do", "1 Nephi 3:7"],
      ["Choose Liberty", "2 Nephi 2:27"],
      ["Choose Serve", "Joshua 24:15"],
      ["Ten Commands", "Exodus 20:3-17"],
      ["Covenant People", "Exodus 19:5-6"],
      ["Endure", "2 Nephi 31:19-20"],
      ["Bound Obey", "Doctrine and Covenants 82:10"],
      ["Cleave Covenants", "Doctrine and Covenants 25:13"],
      ["Anxious Good", "Doctrine and Covenants 58:27"],
      ["Cease Idle", "Doctrine and Covenants 88:124"],
    ],
    identity: [
      ["Work Glory", "Moses 1:39"],
      ["Foreordained", "Abraham 3:22-23"],
      ["God Image", "Genesis 1:26-27"],
      ["Known Before", "Jeremiah 1:4-5"],
      ["Father Spirits", "Hebrews 12:9"],
      ["Worth Souls", "Doctrine and Covenants 18:10-11"],
      ["Heart Matters", "1 Samuel 16:7"],
      ["Become Like", "3 Nephi 12:48"],
      ["Yield Spirit", "Mosiah 3:19"],
      ["Joy Purpose", "2 Nephi 2:25"],
    ],
    service: [
      ["Serve God", "Mosiah 2:17"],
      ["Charity Love", "Moroni 7:45, 47-48"],
      ["True Fast", "Isaiah 58:6-7"],
      ["Great Command", "Matthew 22:36-39"],
      ["Shine Light", "Matthew 5:14-16"],
      ["Spirit Fruit", "Galatians 5:22-23"],
      ["Save Joy", "Doctrine and Covenants 18:15-16"],
      ["Thankful", "Doctrine and Covenants 78:19"],
      ["Zion Unity", "Moses 7:18"],
      ["Do Faith", "James 2:17-18"],
    ],
    home: [
      ["One Flesh", "Genesis 2:24"],
      ["Gift Children", "Psalm 127:3"],
      ["Learn Young", "Alma 37:35"],
      ["Watch Pray", "3 Nephi 18:15, 20-21"],
      ["Forgive All", "Doctrine and Covenants 64:9-11"],
      ["WoW Blessings", "Doctrine and Covenants 89:18-21"],
      ["Keep Sabbath", "Isaiah 58:13-14"],
      ["Turn Hearts", "Malachi 4:5-6"],
      ["Celestial Marriage", "Doctrine and Covenants 131:1-4"],
      ["Pray Always", "Doctrine and Covenants 10:5"],
    ],
    restoration: [
      ["Marvelous Work", "Isaiah 29:13-14"],
      ["Two Sticks", "Ezekiel 37:15-17"],
      ["Keys Given", "Matthew 16:15-19"],
      ["Restoration", "Acts 3:19-21"],
      ["Leaders Given", "Ephesians 4:11-14"],
      ["Apostasy First", "2 Thessalonians 2:1-3"],
      ["Aaronic Keys", "Doctrine and Covenants 13:1"],
      ["Melchizedek", "Doctrine and Covenants 107:8"],
      ["Priesthood Power", "Doctrine and Covenants 121:36, 41-42"],
      ["Godhead Bodies", "Doctrine and Covenants 130:22-23"],
    ],
    eternal: [
      ["Learn Humbly", "2 Nephi 9:28-29"],
      ["No Small", "2 Nephi 28:7-9"],
      ["Moral Confusion", "Isaiah 5:20"],
      ["Windows Heaven", "Malachi 3:8-10"],
      ["Go Teach", "Matthew 28:19-20"],
      ["Born Again", "John 3:5"],
      ["Gospel Dead", "1 Peter 4:6"],
      ["Judged Works", "Revelation 20:12"],
      ["Glory Degrees", "1 Corinthians 15:40-42"],
      ["Practice Virtue", "Doctrine and Covenants 46:33"],
    ],
  };

  function inferBook(ref) {
    const directMatches = [
      ["Doctrine and Covenants", "Doctrine and Covenants"],
      ["Joseph Smith-History", "Joseph Smith-History"],
      ["1 Corinthians", "1 Corinthians"],
      ["2 Corinthians", "2 Corinthians"],
      ["1 Thessalonians", "1 Thessalonians"],
      ["2 Thessalonians", "2 Thessalonians"],
      ["1 Timothy", "1 Timothy"],
      ["2 Timothy", "2 Timothy"],
      ["1 Peter", "1 Peter"],
      ["2 Peter", "2 Peter"],
      ["1 Samuel", "1 Samuel"],
      ["2 Samuel", "2 Samuel"],
      ["1 Nephi", "1 Nephi"],
      ["2 Nephi", "2 Nephi"],
      ["3 Nephi", "3 Nephi"],
    ];

    for (const [prefix, book] of directMatches) {
      if (ref.startsWith(prefix)) return book;
    }

    return ref.split(/\d/)[0].trim().replace(/-$/, "") || ref;
  }

  function inferCollection(ref) {
    if (/Moses|Abraham/.test(ref)) return "Pearl of Great Price";
    if (/Doctrine and Covenants|Joseph Smith-History/.test(ref)) return "Restoration Scripture";
    if (/Nephi|Alma|Mosiah|Moroni|Helaman|Ether/.test(ref)) return "Book of Mormon";
    if (/Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Thessalonians|Timothy|Peter|James|Revelation/.test(ref)) return "New Testament";
    return "Old Testament";
  }

  const passageDetails = {
    "Alma 7:11-13": {
      quote: "\"he will take upon him the pains and the sicknesses of his people\"",
      note: "Alma is preaching to the faithful people in Gideon and testifying of Christ before His mortal ministry. He explains the Atonement in deeply personal terms, showing that the Savior understands suffering from the inside and can actually succor people in grief, sickness, weakness, and sin.",
    },
    "Isaiah 53:3-5": {
      quote: "\"he was wounded for our transgressions\"",
      note: "Isaiah is speaking prophetically of the Messiah centuries before Jesus Christ's birth. These verses matter because they frame the Savior's suffering as redemptive, teaching that His rejection, sorrow, and wounds are directly tied to our healing and peace.",
    },
    "Matthew 11:28-30": {
      quote: "\"Come unto me, all ye that labour and are heavy laden\"",
      note: "Jesus speaks this invitation during His earthly ministry while opposition against Him is growing and many people are burdened. He offers more than comfort; He calls people into discipleship with Him, promising rest that comes from trusting His yoke and learning His meekness.",
    },
    "Moroni 7:41": {
      quote: "\"hope through the atonement of Christ\"",
      note: "Moroni records words originally spoken by Mormon to church members about faith, hope, and charity. The verse teaches that hope is not vague optimism but confidence in resurrection and eternal life through Jesus Christ, which gives steadiness to believers now.",
    },
    "Philippians 4:13": {
      quote: "\"I can do all things through Christ which strengtheneth me\"",
      note: "Paul writes to the Saints in Philippi from a place of sacrifice and limitation, not ease. He is teaching that strength in Christ is the enabling power to endure, serve, and remain faithful in changing circumstances rather than a promise of effortless success.",
    },
    "Doctrine and Covenants 6:36": {
      quote: "\"Look unto me in every thought; doubt not, fear not\"",
      note: "This revelation comes through Joseph Smith to Oliver Cowdery as Oliver seeks assurance in the work of the Restoration. The Lord answers uncertainty by redirecting attention to Himself, making the verse especially powerful for anxiety, indecision, and fear.",
    },
    "Doctrine and Covenants 19:23": {
      quote: "\"Learn of me, and listen to my words\"",
      note: "The Lord speaks here to Martin Harris in a revelation about repentance, sacrifice, and the infinite cost of redemption. In the middle of hard demands, Christ offers peace through discipleship, showing that relief comes by learning of Him and walking in meek obedience.",
    },
    "Ether 12:27": {
      quote: "\"my grace is sufficient for all men that humble themselves before me\"",
      note: "Moroni records the Lord's answer about weakness near the end of the Jaredite record. Instead of removing weakness automatically, the Lord explains that weakness can tutor humility and become a setting where His grace makes the weak strong.",
    },
    "Luke 24:36-39": {
      quote: "\"a spirit hath not flesh and bones, as ye see me have\"",
      note: "The resurrected Christ appears to His disciples after His crucifixion and calms their fear by showing that He is truly risen. This moment grounds Christian hope in a literal resurrection and gives assurance that Christ's victory over death is physical and real.",
    },
    "1 Corinthians 15:20-22": {
      quote: "\"in Christ shall all be made alive\"",
      note: "Paul is correcting confusion in Corinth about resurrection and insists that Christ's rising is the pattern and guarantee for all humanity. The passage gives hope by placing death inside a larger redemptive order shaped by Jesus Christ.",
    },
    "Isaiah 1:18": {
      quote: "\"though your sins be as scarlet, they shall be as white as snow\"",
      note: "Isaiah is calling covenant Israel to repentance after exposing serious spiritual corruption. The verse is striking because the Lord does not minimize sin, but He does declare that through turning to Him cleansing is real and complete.",
    },
    "Acts 2:36-38": {
      quote: "\"Repent, and be baptized every one of you\"",
      note: "Peter speaks at Pentecost after boldly witnessing of the risen Christ, and his hearers are cut to the heart. His answer shows the first covenant response to conviction: repentance, baptism, and receiving the Holy Ghost through Christ's name.",
    },
    "Doctrine and Covenants 58:42-43": {
      quote: "\"he who has repented of his sins, the same is forgiven\"",
      note: "The Lord gives this revelation to early Saints in Zion while correcting, instructing, and calling them to greater holiness. The verse explains repentance plainly: forgiveness is connected not only to confession but also to forsaking sin in real life.",
    },
    "Doctrine and Covenants 19:16-19": {
      quote: "\"which suffering caused myself, even God, the greatest of all, to tremble\"",
      note: "Here the Lord Jesus Christ personally describes His suffering in Gethsemane and on the cross. It gives repentance depth because it ties sin to the Savior's agony while also showing the measure of His love and willingness to redeem.",
    },
    "Mosiah 4:30": {
      quote: "\"watch yourselves, and your thoughts, and your words, and your deeds\"",
      note: "King Benjamin is teaching a covenant people who have just experienced mighty spiritual change. He warns that enduring discipleship requires alertness in the inner life and daily conduct, making this verse a practical guardrail against relapse and temptation.",
    },
    "Alma 39:9": {
      quote: "\"go no more after the lusts of your eyes\"",
      note: "Alma speaks directly and painfully to his son Corianton after serious sexual sin. The application is sober but merciful: Alma calls for repentance, self-mastery, and turning back to ministry, showing that purity matters and restoration is still possible.",
    },
    "Alma 41:10": {
      quote: "\"wickedness never was happiness\"",
      note: "Alma is correcting Corianton's distorted thinking about justice, judgment, and desire. This short line is doctrinally sharp because it teaches that sin cannot finally produce joy, no matter how persuasive it may seem in the moment.",
    },
    "Genesis 39:9": {
      quote: "\"how then can I do this great wickedness, and sin against God?\"",
      note: "Joseph says this in Egypt when he is pressured repeatedly by Potiphar's wife. The verse gives a pattern for resisting temptation: Joseph sees sin first as offense against God, and that God-centered loyalty strengthens him to flee.",
    },
    "Psalm 24:3-4": {
      quote: "\"He that hath clean hands, and a pure heart\"",
      note: "This psalm asks who is fit to stand in the Lord's holy place and answers with covenant integrity. The application is both inward and outward, reminding readers that holiness includes motives, worship, honesty, and everyday conduct.",
    },
    "1 Corinthians 6:19-20": {
      quote: "\"your body is the temple of the Holy Ghost\"",
      note: "Paul is correcting sexual immorality among Saints in Corinth and grounding his instruction in redemption. He teaches that the body belongs to God because it has been bought with a price, which gives chastity and self-control a sacred doctrinal foundation.",
    },
    "2 Nephi 32:3": {
      quote: "\"feast upon the words of Christ\"",
      note: "Nephi speaks after teaching the doctrine of Christ and urges his people not to stop at the gate. His point is that revelation for the path ahead comes through sustained engagement with Christ's words, not occasional exposure.",
    },
    "2 Nephi 32:8-9": {
      quote: "\"ye must pray always\"",
      note: "Nephi is still pressing disciples to continue faithfully after baptism and covenant entry. He teaches that prayer keeps a person from spiritual drift and turns action itself into something offered and sanctified before the Lord.",
    },
    "Psalm 119:105": {
      quote: "\"Thy word is a lamp unto my feet\"",
      note: "The psalmist is celebrating the sustaining power of God's law in a life that still knows trouble and opposition. The image matters because scripture often gives enough light for the next faithful step, not the entire road at once.",
    },
    "Proverbs 3:5-6": {
      quote: "\"Trust in the Lord with all thine heart\"",
      note: "This wisdom text teaches covenant trust in daily decision-making rather than self-sufficiency. Its application is especially strong when clarity is incomplete, because it promises direction to those who acknowledge the Lord rather than lean entirely on private judgment.",
    },
    "James 1:5-6": {
      quote: "\"If any of you lack wisdom, let him ask of God\"",
      note: "James writes to believers experiencing trial and instability and points them toward God as the giver of wisdom. In Latter-day Saint understanding this verse also stands at the opening of the Restoration, since it moved Joseph Smith to pray.",
    },
    "Moroni 10:4-5": {
      quote: "\"ask God, the Eternal Father, in the name of Christ\"",
      note: "Moroni closes the Book of Mormon with an invitation to seek divine confirmation of its truth. The verse applies broadly to revelation by teaching prayer, sincerity, real intent, and trust in the witness of the Holy Ghost.",
    },
    "Doctrine and Covenants 8:2-3": {
      quote: "\"I will tell you in your mind and in your heart\"",
      note: "The Lord teaches Oliver Cowdery how revelation works as he prepares to assist in the Restoration. This verse is foundational because it describes spiritual communication in both thought and feeling, helping disciples recognize the Holy Ghost more accurately.",
    },
    "Amos 3:7": {
      quote: "\"the Lord God will do nothing, but he revealeth his secret unto his servants the prophets\"",
      note: "Amos is warning covenant people who have ignored prophetic voices and are nearing judgment. The verse teaches that God acts transparently through prophets, making prophetic counsel a major part of receiving guidance rather than an optional supplement.",
    },
    "Doctrine and Covenants 1:37-38": {
      quote: "\"what I the Lord have spoken, I have spoken\"",
      note: "This is part of the Lord's preface to the Doctrine and Covenants, establishing the authority of His revelations in the latter days. It applies as a call to trust the Lord's words and the servants through whom He speaks.",
    },
    "2 Timothy 3:15-17": {
      quote: "\"All scripture is given by inspiration of God\"",
      note: "Paul writes to Timothy as a mentor to a younger leader facing difficult times in the Church. He reminds Timothy that scripture teaches salvation in Christ and equips disciples for doctrine, correction, and righteous living.",
    },
    "Alma 32:21": {
      quote: "\"faith is not to have a perfect knowledge\"",
      note: "Alma is teaching poor Zoramites who are willing to hear because affliction has humbled them. He reframes faith as trust in true things not yet fully seen, which is especially helpful for honest seekers who want certainty before commitment.",
    },
    "Ether 12:6": {
      quote: "\"ye receive no witness until after the trial of your faith\"",
      note: "Moroni is reflecting on faith across dispensations and the way God tutors His people. This verse helps readers accept delay and testing, showing that divine confirmation often follows faithful action rather than preceding it.",
    },
    "Doctrine and Covenants 76:22-24": {
      quote: "\"this is the testimony, last of all, which we give of him: That he lives!\"",
      note: "Joseph Smith and Sidney Rigdon are recording the great vision after pondering scripture together. Their testimony centers everything on the living Christ and gives doctrinal weight and devotional power to the Restoration witness of Jesus.",
    },
    "Joseph Smith-History 1:15-20": {
      quote: "\"I saw two Personages, whose brightness and glory defy all description\"",
      note: "Joseph is recounting the First Vision and the answer to his prayer about which church he should join. The passage matters because it shows revelation to a seeking soul and introduces the Restoration through a direct divine encounter.",
    },
    "John 14:6": {
      quote: "\"I am the way, the truth, and the life\"",
      note: "Jesus says this to His apostles on the night before His crucifixion as He prepares them for His departure. The application is exclusivity and comfort together: access to the Father is through Christ, and that makes Him central to every question of salvation.",
    },
    "John 17:3": {
      quote: "\"this is life eternal, that they might know thee\"",
      note: "This comes from the Savior's great intercessory prayer shortly before Gethsemane. Eternal life is described relationally, not merely legally, so the verse invites disciples to seek deeper knowledge of the Father and the Son now.",
    },
    "Doctrine and Covenants 76:40-41": {
      quote: "\"glad tidings of great joy\"",
      note: "In the same vision of the degrees of glory, Joseph and Sidney summarize the gospel in Christ-centered terms. The emphasis is that redemption comes through the Son of God, making the good news personal, joyful, and universal in reach.",
    },
    "John 14:15": {
      quote: "\"If ye love me, keep my commandments\"",
      note: "Jesus gives this to His apostles in the upper room while teaching about love, the Comforter, and enduring discipleship. The application is simple and searching: love for Christ is not sentimental only, but covenantal and obedient.",
    },
    "2 Nephi 25:23, 26": {
      quote: "\"it is by grace that we are saved, after all we can do\"",
      note: "Nephi is helping his people understand the law of Moses in light of Christ and insisting that salvation points forward to Him. The verse is best read as Christ-centered dependence, not scorekeeping, because Nephi says his whole message is to persuade people to believe in Christ.",
    },
    "Helaman 5:12": {
      quote: "\"it is upon the rock of our Redeemer\"",
      note: "Helaman gives this counsel to his sons Nephi and Lehi as he urges them to remember Christ. The foundation image makes application immediate: when storms, temptation, and opposition come, spiritual survival depends on where life has been built.",
    },
    "1 Nephi 3:7": {
      quote: "\"I will go and do the things which the Lord hath commanded\"",
      note: "Nephi says this after a difficult command to return to Jerusalem for the brass plates. His response models covenant confidence: the Lord's commands come with a prepared way, even when the details are not yet visible.",
    },
    "2 Nephi 2:27": {
      quote: "\"men are free according to the flesh\"",
      note: "Lehi teaches Jacob about the Fall, redemption, and the moral structure of agency near the end of his life. The verse explains that choice is central to mortal life and that discipleship means deliberately choosing liberty and eternal life through the Mediator.",
    },
    "Joshua 24:15": {
      quote: "\"choose you this day whom ye will serve\"",
      note: "Joshua addresses Israel at the close of his ministry and calls the people to covenant renewal. The force of the verse is that loyalty to God must be chosen intentionally, not inherited passively from prior generations.",
    },
    "Exodus 20:3-17": {
      quote: "\"Thou shalt have no other gods before me\"",
      note: "The Lord gives the Ten Commandments to Israel at Sinai as the framework of covenant life. These commands are not random restrictions; they order worship, relationships, speech, rest, sexuality, and desire under the authority of God.",
    },
    "Exodus 19:5-6": {
      quote: "\"ye shall be a peculiar treasure unto me\"",
      note: "Before the law is given, the Lord tells Israel what covenant identity means. He frames obedience not as mere rule-keeping but as belonging to Him as a holy people with priestly purpose in the world.",
    },
    "2 Nephi 31:19-20": {
      quote: "\"press forward with a steadfastness in Christ\"",
      note: "Nephi describes what life after entering the gate of baptism should look like. He teaches endurance as active discipleship marked by hope, feasting on Christ's word, and continuing faithfully all the way to the end.",
    },
    "Doctrine and Covenants 82:10": {
      quote: "\"I, the Lord, am bound when ye do what I say\"",
      note: "The Lord gives this revelation while organizing and correcting early Church leaders. It emphasizes the reality of covenant relationship: obedience does not control God, but it does place disciples in the path of promised divine faithfulness.",
    },
    "Doctrine and Covenants 25:13": {
      quote: "\"cleave unto the covenants\"",
      note: "This counsel is given to Emma Smith in a revelation about her place, gifts, and discipleship. The phrase is brief but weighty, urging steadfast covenant loyalty when life includes uncertainty, sacrifice, and spiritual responsibility.",
    },
    "Doctrine and Covenants 58:27": {
      quote: "\"anxiously engaged in a good cause\"",
      note: "The Saints are being taught not to wait passively for direction in every detail. The Lord calls them to righteous initiative, showing that faithful people are expected to act wisely, serve freely, and bring about much good on their own agency.",
    },
    "Doctrine and Covenants 88:124": {
      quote: "\"cease to be idle\"",
      note: "This revelation prepares the Saints for holiness, learning, and ordered communal life. The command applies broadly by tying spiritual preparation to disciplined habits, reverence, work, and the refusal to waste stewardship.",
    },
    "Moses 1:39": {
      quote: "\"this is my work and my glory\"",
      note: "The Lord speaks directly to Moses and reveals the divine purpose behind creation and redemption. For questions of worth and identity, the verse is foundational because it declares that God's work is to bring His children toward immortality and eternal life.",
    },
    "Abraham 3:22-23": {
      quote: "\"these I will make my rulers\"",
      note: "Abraham is shown a premortal vision of noble and great ones and of divine foreordination. The passage expands identity beyond mortality and invites disciples to view calling, responsibility, and potential in eternal terms.",
    },
    "Genesis 1:26-27": {
      quote: "\"God created man in his own image\"",
      note: "This comes from the creation account and grounds human dignity in divine origin. Its application is powerful in a culture of comparison because it teaches that worth begins with God-given identity, not achievement or appearance.",
    },
    "Jeremiah 1:4-5": {
      quote: "\"Before I formed thee in the belly I knew thee\"",
      note: "The Lord calls Jeremiah into prophetic ministry and reassures him that his life is known to God. Readers often turn to this verse for assurance that their lives are neither accidental nor unnoticed in the Lord's purposes.",
    },
    "Hebrews 12:9": {
      quote: "\"the Father of spirits\"",
      note: "The writer of Hebrews is teaching about divine chastening, sonship, and reverence toward God. The phrase matters because it reminds readers that identity is spiritual before it is social, linking discipline and belonging back to Heavenly Father.",
    },
    "Doctrine and Covenants 18:10-11": {
      quote: "\"the worth of souls is great in the sight of God\"",
      note: "The Lord teaches this as part of calling future leaders and laying foundations for His Church. The worth of souls is immediately connected to Christ's suffering and death, which means human value is measured against the price of redemption.",
    },
    "1 Samuel 16:7": {
      quote: "\"man looketh on the outward appearance, but the Lord looketh on the heart\"",
      note: "Samuel is learning whom the Lord has chosen when Jesse's sons are presented before him. The verse corrects shallow judgment and teaches that God's evaluation begins with the heart, not merely visible strength or status.",
    },
    "3 Nephi 12:48": {
      quote: "\"I would that ye should be perfect\"",
      note: "The resurrected Christ teaches the Nephites and raises their understanding of discipleship to a celestial pattern. The verse is best read as an invitation to become complete in Him, not as a crushing demand for instant flawlessness.",
    },
    "Mosiah 3:19": {
      quote: "\"the natural man is an enemy to God\"",
      note: "King Benjamin is explaining the Atonement and the inner transformation required of covenant people. He teaches that yielding to the Holy Spirit changes the soul's disposition, making becoming as important as merely avoiding wrong acts.",
    },
    "2 Nephi 2:25": {
      quote: "\"men are, that they might have joy\"",
      note: "Lehi is teaching Jacob about opposition, redemption, and the meaning of the Fall. The verse gives purpose to mortal life by teaching that God's plan aims at joy, not mere survival, and that joy is fulfilled through the Redeemer.",
    },
    "Mosiah 2:17": {
      quote: "\"when ye are in the service of your fellow beings ye are only in the service of your God\"",
      note: "King Benjamin is addressing his people with humility at the end of his reign and reframing power as service. The application is immediate: ministry to people is not a side task but one of the primary ways disciples actually serve the Lord.",
    },
    "Moroni 7:45, 47-48": {
      quote: "\"charity is the pure love of Christ\"",
      note: "Mormon is teaching believers what true Christlike love looks like and how it is received. Charity here is not mere kindness or temperament; it is a divine gift to be sought in prayer and expressed in long-suffering, humility, and faithful love.",
    },
    "Isaiah 58:6-7": {
      quote: "\"deal thy bread to the hungry\"",
      note: "Isaiah rebukes hollow religious performance by showing what the Lord actually wants from fasting. The application is clear: worship that pleases God moves outward into mercy, liberation, generosity, and attention to the afflicted.",
    },
    "Matthew 22:36-39": {
      quote: "\"Thou shalt love the Lord thy God\"",
      note: "Jesus answers a lawyer's question about the great commandment during a tense public exchange in Jerusalem. He places love of God and neighbor at the center of covenant life, making charity the organizing principle of discipleship.",
    },
    "Matthew 5:14-16": {
      quote: "\"Let your light so shine before men\"",
      note: "This is part of the Sermon on the Mount, where Jesus describes the character and influence of His disciples. The passage teaches that holy living should bless others visibly and lead them to glorify the Father.",
    },
    "Galatians 5:22-23": {
      quote: "\"the fruit of the Spirit is love, joy, peace\"",
      note: "Paul is contrasting the works of the flesh with life governed by the Spirit among the Galatian Saints. The application is diagnostic and aspirational: Christlike character is evidence of spiritual life and should be cultivated intentionally.",
    },
    "Doctrine and Covenants 18:15-16": {
      quote: "\"how great shall be your joy\"",
      note: "The Lord is speaking about the worth of souls and the labor of bringing people unto repentance. The promise ties missionary and ministering effort to joy, showing that helping save souls shapes the servant as well as the one served.",
    },
    "Doctrine and Covenants 78:19": {
      quote: "\"he who receiveth all things with thankfulness\"",
      note: "The Saints are being taught stewardship, consecration, and dependence on the Lord. Gratitude here is not superficial positivity; it is a covenant disposition that enlarges capacity to receive more from God's hand.",
    },
    "Moses 7:18": {
      quote: "\"the Lord called his people Zion, because they were of one heart and one mind\"",
      note: "Enoch's record describes a holy society shaped by righteousness, unity, and care for the poor. The verse offers a vision of collective discipleship in which spiritual unity and social holiness belong together.",
    },
    "James 2:17-18": {
      quote: "\"faith, if it hath not works, is dead\"",
      note: "James is correcting an empty profession of belief that never becomes action. His application is practical: living faith reveals itself through deeds of mercy, obedience, and embodied trust rather than claims alone.",
    },
    "Genesis 2:24": {
      quote: "\"they shall be one flesh\"",
      note: "This creation text explains marriage as a God-ordered union that reorders loyalty and covenant belonging. Its continuing application is that marriage is not casual arrangement but sacred joining meant to create faithful oneness.",
    },
    "Psalm 127:3": {
      quote: "\"children are an heritage of the Lord\"",
      note: "The psalm teaches dependence on the Lord in building home, city, and future. Children are framed as gift and stewardship, which encourages reverence, gratitude, and faithful parental responsibility.",
    },
    "Alma 37:35": {
      quote: "\"learn in thy youth to keep the commandments of God\"",
      note: "Alma is counseling his son Helaman as he passes on sacred records and spiritual responsibility. The verse teaches that discipleship habits begun early shape a lifetime, making youth a season for deliberate spiritual formation.",
    },
    "3 Nephi 18:15, 20-21": {
      quote: "\"watch and pray always\"",
      note: "The resurrected Christ teaches the Nephites after instituting the sacrament and ministering among them. He links prayer with spiritual protection and family discipleship, showing that vigilance and prayer preserve people against temptation.",
    },
    "Doctrine and Covenants 64:9-11": {
      quote: "\"of you it is required to forgive all men\"",
      note: "The Lord gives this command while early Saints are managing offenses, disappointments, and conflict. Forgiveness is presented as covenant obedience, not emotional convenience, and is essential for people who want to remain aligned with divine mercy.",
    },
    "Doctrine and Covenants 89:18-21": {
      quote: "\"shall find wisdom and great treasures of knowledge\"",
      note: "These promised blessings conclude the Word of Wisdom revelation. The application is broader than health alone: obedient daily habits open the way for stamina, discernment, protection, and clearer spiritual living.",
    },
    "Isaiah 58:13-14": {
      quote: "\"call the sabbath a delight\"",
      note: "Isaiah teaches true covenant worship and ties Sabbath observance to joy, honor, and communion with the Lord. The passage encourages a view of Sabbath living as holy delight rather than burdensome restriction.",
    },
    "Malachi 4:5-6": {
      quote: "\"he shall turn the heart of the fathers to the children\"",
      note: "Malachi closes the Old Testament with a prophecy of Elijah and covenant turning across generations. In Latter-day Saint thought this verse is crucial for temple work, family history, and the sealing nature of God's redemptive plan.",
    },
    "Doctrine and Covenants 131:1-4": {
      quote: "\"in order to obtain the highest, a man must enter into this order of the priesthood\"",
      note: "Joseph Smith teaches here about celestial glory and eternal marriage. The passage places marriage inside the framework of exaltation and covenant order, emphasizing that eternal family blessings are inseparable from sacred ordinances.",
    },
    "Doctrine and Covenants 10:5": {
      quote: "\"pray always, that you may come off conqueror\"",
      note: "The Lord gives this counsel to Joseph Smith during a painful recovery from the loss of the 116 manuscript pages. The application is practical and urgent: constant prayer is protective, especially when opposition and weakness are real.",
    },
    "Isaiah 29:13-14": {
      quote: "\"I will proceed to do a marvellous work\"",
      note: "Isaiah rebukes superficial worship and then prophesies a surprising divine intervention. Latter-day Saints often read this in Restoration light because the Lord promises a work that overturns human wisdom and exposes spiritual blindness.",
    },
    "Ezekiel 37:15-17": {
      quote: "\"join them one to another into one stick\"",
      note: "Ezekiel acts out a prophecy of gathering and reunification for Israel. In Restoration interpretation the joined sticks also illuminate the coming together of scriptural witnesses, especially the Bible and Book of Mormon.",
    },
    "Matthew 16:15-19": {
      quote: "\"I will give unto thee the keys of the kingdom of heaven\"",
      note: "Jesus responds to Peter's confession of Him as the Christ and then speaks of revelation, Church foundation, and keys. The passage is central for understanding priesthood authority, authorized governance, and binding power from heaven.",
    },
    "Acts 3:19-21": {
      quote: "\"the times of restitution of all things\"",
      note: "Peter is preaching in Jerusalem after healing a lame man and calling listeners to repent. He places conversion inside a larger prophetic vision in which God restores what was foretold by holy prophets.",
    },
    "Ephesians 4:11-14": {
      quote: "\"for the perfecting of the saints\"",
      note: "Paul teaches that Christ gives apostles, prophets, and other leaders to build and stabilize the Church. The application is that divine leadership is meant to protect believers from confusion and bring them toward maturity in Christ.",
    },
    "2 Thessalonians 2:1-3": {
      quote: "\"that day shall not come, except there come a falling away first\"",
      note: "Paul is calming confusion about the timing of the Second Coming and warns of prior apostasy. For Restoration study, the passage helps explain why a latter-day restoration of truth and authority was necessary.",
    },
    "Doctrine and Covenants 13:1": {
      quote: "\"upon you my fellow servants\"",
      note: "John the Baptist confers the Aaronic Priesthood on Joseph Smith and Oliver Cowdery by heavenly ministration. The verse matters because it anchors Restoration claims in a concrete event of authorized priesthood transmission.",
    },
    "Doctrine and Covenants 107:8": {
      quote: "\"the Melchizedek Priesthood holds the right of presidency\"",
      note: "This revelation organizes priesthood offices and clarifies how the Lord governs His Church. It applies whenever disciples need to understand the structure, order, and delegated authority of the Lord's kingdom.",
    },
    "Doctrine and Covenants 121:36, 41-42": {
      quote: "\"the powers of heaven cannot be controlled nor handled\"",
      note: "Joseph Smith writes from Liberty Jail while suffering injustice and grief. His teaching gives priesthood leadership moral depth by insisting that divine power flows through persuasion, meekness, love unfeigned, and righteousness rather than force.",
    },
    "Doctrine and Covenants 130:22-23": {
      quote: "\"The Father has a body of flesh and bones\"",
      note: "Joseph Smith teaches plainly about the embodied nature of the Father and the Son and the personhood of the Holy Ghost. The verse matters in Restoration doctrine because it clarifies the Godhead and rejects vague or purely immaterial conceptions of Deity.",
    },
    "2 Nephi 9:28-29": {
      quote: "\"to be learned is good if they hearken unto the counsels of God\"",
      note: "Jacob is preaching about the Atonement and warning against pride before God. The application is not anti-learning; it is a warning that knowledge without humility can become a spiritual hazard instead of a gift.",
    },
    "2 Nephi 28:7-9": {
      quote: "\"eat, drink, and be merry\"",
      note: "Nephi is foretelling latter-day attitudes that trivialize sin and spiritual danger. The warning is against moral drift, rationalized indulgence, and the false assumption that small compromise carries no serious consequence.",
    },
    "Isaiah 5:20": {
      quote: "\"Woe unto them that call evil good, and good evil\"",
      note: "Isaiah denounces a society that has lost moral clarity and reversed divine standards. The verse applies whenever language, culture, or power normalizes sin and mocks righteousness as if truth were endlessly flexible.",
    },
    "Malachi 3:8-10": {
      quote: "\"bring ye all the tithes into the storehouse\"",
      note: "Malachi confronts covenant unfaithfulness and links tithing to trust in God. The application is both devotional and practical: consecrated giving becomes a test of faith, gratitude, and confidence in the Lord's provision.",
    },
    "Matthew 28:19-20": {
      quote: "\"Go ye therefore, and teach all nations\"",
      note: "The resurrected Christ commissions His apostles before His ascension. The passage frames disciple-making as global, covenantal, and enduring, with baptism, teaching, and the Lord's continuing presence at the center.",
    },
    "John 3:5": {
      quote: "\"Except a man be born of water and of the Spirit\"",
      note: "Jesus says this to Nicodemus, a sincere but puzzled ruler trying to understand spiritual rebirth. The verse teaches that entering God's kingdom is tied to real transformation and saving ordinances, not admiration of Jesus alone.",
    },
    "1 Peter 4:6": {
      quote: "\"the gospel [was] preached also to them that are dead\"",
      note: "Peter is teaching a scattered and suffering Church about judgment, hope, and Christ's redeeming work. Latter-day Saints read this as an important witness that God's saving outreach extends beyond mortality.",
    },
    "Revelation 20:12": {
      quote: "\"the dead were judged out of those things which were written in the books\"",
      note: "John describes the final judgment in apocalyptic vision, placing all humanity before God. The scene gives eternal seriousness to mortal choices while also showing that judgment is ordered, known, and fully in God's hands.",
    },
    "1 Corinthians 15:40-42": {
      quote: "\"there is one glory of the sun, and another glory of the moon\"",
      note: "Paul is still teaching about resurrection and the differing conditions of glorified bodies. The imagery becomes especially meaningful in Restoration doctrine because it opens space for understanding degrees of eternal glory.",
    },
    "Doctrine and Covenants 46:33": {
      quote: "\"ye must practise virtue and holiness before me continually\"",
      note: "The Lord is instructing the Saints about spiritual gifts and order in worship. He ends with a call to sustained holiness, showing that virtue is not occasional intensity but a continual pattern before God.",
    },
  };

  const passages = Object.entries(rawPassageGroups).flatMap(([topicId, items]) =>
    items.map(([title, ref], index) => ({
      id: `${topicId}-${index + 1}`,
      topic: topicId,
      book: inferBook(ref),
      testament: inferCollection(ref),
      ref,
      title,
      excerpt: passageDetails[ref]?.quote ?? `"${title}"`,
      note: passageDetails[ref]?.note ?? "Included from the scripture cheat sheet as part of this topic's full passage group.",
      tags: [title.toLowerCase().replace(/[^\w]+/g, "-"), topicId.replace(/[^\w]+/g, "-")],
    }))
  );

  const topNeeds = [
    { id: "anxiety", label: "Anxiety", topic: "hope-healing", refs: ["Matthew 11:28-30", "Doctrine and Covenants 6:36", "Proverbs 3:5-6"] },
    { id: "guilt", label: "Guilt", topic: "repentance", refs: ["Isaiah 1:18", "Doctrine and Covenants 58:42-43", "Doctrine and Covenants 19:16-19"] },
    { id: "revelation", label: "Revelation", topic: "guidance", refs: ["James 1:5-6", "Doctrine and Covenants 8:2-3", "Moroni 10:4-5"] },
    { id: "worth", label: "Worth", topic: "identity", refs: ["Doctrine and Covenants 18:10-11", "Genesis 1:26-27", "Jeremiah 1:4-5"] },
    { id: "family", label: "Marriage and Family", topic: "home", refs: ["Doctrine and Covenants 64:9-11", "Genesis 2:24", "Malachi 4:5-6"] },
    { id: "service", label: "Ministering", topic: "service", refs: ["Mosiah 2:17", "Moroni 7:45, 47-48", "Matthew 5:14-16"] },
  ];

  const guideSteps = [
    {
      id: "truths",
      label: "Eternal truths",
      title: "Begin with what God has revealed",
      summary: "Start by naming the doctrine clearly: who God is, who you are, what Christ has done, and why the need in front of you matters spiritually.",
      refs: ["Alma 22:13", "Moses 1:39", "John 8:32"],
    },
    {
      id: "invitations",
      label: "Invitations",
      title: "Turn doctrine into the next faithful step",
      summary: "Move from understanding to action with prayer, repentance, covenant keeping, scripture study, and simple obedience that can happen today.",
      refs: ["Doctrine and Covenants 8:2-3", "Galatians 5:25", "Matthew 22:37-40"],
    },
    {
      id: "blessings",
      label: "Promised blessings",
      title: "Keep Christ's promised help in view",
      summary: "End by remembering what the Lord offers: healing, guidance, access to His power, and lasting joy through steadfast discipleship.",
      refs: ["Psalm 147:3", "Doctrine and Covenants 84:20", "Doctrine and Covenants 101:36"],
    },
  ];

  const guideChapters = [
    { id: "g1", number: 1, title: "God’s plan is for you", ref: "Alma 22:13", summary: "Use this chapter when the need is identity, purpose, hope, or understanding life's hard things in God's plan.", searchText: "For the Strength of Youth God's plan is for you Alma 22:13" },
    { id: "g2", number: 2, title: "God wants to communicate with you", ref: "Doctrine and Covenants 8:2-3", summary: "A strong chapter for prayer, revelation, scripture study, and recognizing the Holy Ghost.", searchText: "For the Strength of Youth God wants to communicate with you Doctrine and Covenants 8:2-3" },
    { id: "g3", number: 3, title: "You can help with God’s work", ref: "Moses 1:39", summary: "Best for service, worth, and seeing your life as part of the Lord's work.", searchText: "For the Strength of Youth You can help with God's work Moses 1:39" },
    { id: "g4", number: 4, title: "Jesus Christ will help you", ref: "Psalm 147:3", summary: "Use this chapter for repentance, healing, encouragement, and the Savior's enabling power.", searchText: "For the Strength of Youth Jesus Christ will help you Psalm 147:3" },
    { id: "g5", number: 5, title: "Walk in God’s light", ref: "Galatians 5:25", summary: "Helpful for choices, standards, and walking by the Spirit in a confusing world.", searchText: "For the Strength of Youth Walk in God's light Galatians 5:25" },
    { id: "g6", number: 6, title: "Love God, love your neighbor", ref: "Matthew 22:37-40", summary: "A practical chapter for charity, relationships, and ministering like the Savior.", searchText: "For the Strength of Youth Love God love your neighbor Matthew 22:37-40" },
    { id: "g7", number: 7, title: "Ordinances and covenants give you access to God’s blessings", ref: "Doctrine and Covenants 84:20", summary: "A good fit for baptism, sacrament, covenant living, and spiritual power.", searchText: "For the Strength of Youth Ordinances and covenants give you access to God's blessings Doctrine and Covenants 84:20" },
    { id: "g8", number: 8, title: "Temple ordinances and covenants give you greater access to God’s blessings", ref: "Doctrine and Covenants 95:8", summary: "Use this chapter for temple worship, eternal families, and covenant perspective.", searchText: "For the Strength of Youth Temple ordinances and covenants give you greater access to God's blessings Doctrine and Covenants 95:8" },
    { id: "g9", number: 9, title: "You are blessed by priesthood keys and authority", ref: "Matthew 16:18-19", summary: "Supports study about restored authority, keys, and how the Lord governs His Church.", searchText: "For the Strength of Youth You are blessed by priesthood keys and authority Matthew 16:18-19" },
    { id: "g10", number: 10, title: "Your body is sacred", ref: "1 Corinthians 6:18-20", summary: "Best for purity, self-mastery, and seeing the body as a sacred gift from God.", searchText: "For the Strength of Youth Your body is sacred 1 Corinthians 6:18-20" },
    { id: "g11", number: 11, title: "Truth will make you free", ref: "John 8:32", summary: "Helpful for discernment, honesty, and rejecting confusion that opposes divine truth.", searchText: "For the Strength of Youth Truth will make you free John 8:32" },
    { id: "g12", number: 12, title: "Jesus Christ brings joy", ref: "Doctrine and Covenants 101:36", summary: "A closing chapter for hope, endurance, and remembering the joy Christ gives now and eternally.", searchText: "For the Strength of Youth Jesus Christ brings joy Doctrine and Covenants 101:36" },
  ];

  function safeGetCurrentTopicId() {
    try {
      const value = window.localStorage.getItem(storageKey);
      return topics.some((topic) => topic.id === value) ? value : defaultTopicId;
    } catch {
      return defaultTopicId;
    }
  }

  function safeSetCurrentTopicId(id) {
    try {
      if (topics.some((topic) => topic.id === id)) {
        window.localStorage.setItem(storageKey, id);
      }
    } catch {
      // Ignore storage failures and keep the UI working.
    }
  }

  function getTopicById(id) {
    return topics.find((topic) => topic.id === id) ?? topics[0];
  }

  function getCurrentTopic() {
    return getTopicById(safeGetCurrentTopicId());
  }

  return {
    storageKey,
    topics,
    passages,
    topNeeds,
    guideSteps,
    guideChapters,
    defaultTopicId,
    getTopicById,
    getCurrentTopic,
    getCurrentTopicId: safeGetCurrentTopicId,
    setCurrentTopicId: safeSetCurrentTopicId,
  };
})();
