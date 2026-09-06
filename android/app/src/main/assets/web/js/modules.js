// SafetyLens AR - Training Modules (unified multi-object find-answer steps)
// Every step: find & select the correct object among several, then answer to progress.

const TRAINING_MODULES = {
  "mod1": {
    "id": "mod1",
    "titleKey": "mod1_title",
    "alarmTextKey": "alarm_gas",
    "calloutLabelKey": "gas_conc",
    "calloutValKey": "conc_rising",
    "skills": [
      "gas_detect",
      "explosive_limits",
      "scba_use",
      "confined_entry"
    ],
    "briefing": {
      "en": "You are a new entrant reporting to Shaft 3. The supervisor hands you a gas detector: a strong smell is coming from the confined-space entry. The reading is rising fast and one spark could ignite it. Inspect the area, find the right items in the scene, and respond correctly before time runs out.",
      "hi": "आप शाफ्ट 3 पर नया श्रमिक हैं। पर्यवेक्षक आपको गैस डिटेक्टर देता है: सीमित-स्थान प्रवेश से तेज़ गंध आ रही है। रीडिंग तेज़ी से बढ़ रही है। क्षेत्र का निरीक्षण करें, सही वस्तुएँ खोजें और समय से पहले सही उत्तर दें।",
      "sat": "ᱟᱫ ᱥᱟᱯᱷ ᱓ᱨ ᱱᱟᱣᱟ ᱥᱨᱢᱤᱠ। ᱥᱩᱯᱨᱵᱥᱤᱠᱨᱠ ᱜᱮᱥ ᱰᱴᱤᱠᱴᱨ ᱮᱢ: ᱥᱞᱱᱠᱨ ᱴᱷᱵᱻ ᱯᱨᱵᱥ ᱛᱷᱵ।ᱨᱰᱝᱜ ᱛᱳᱛ.। "
    },
    "steps": [
      {
        "id": "s1",
        "prompt": {
          "en": "Find the leaking gas cylinder.",
          "hi": "रिसता हुआ गैस सिलेंडर खोजें।",
          "sat": "ᱞᱤᱠ ᱜᱮᱥ ᱥᱤᱲᱤᱱᱰᱟᱨ ᱠᱷᱩᱡ"
        },
        "objects": [
          {
            "key": "cylinder",
            "name": {
              "en": "Gas cylinder",
              "hi": "गैस सिलेंडर",
              "sat": "ᱜᱮᱥ ᱥᱤᱲᱤᱱᱰᱟᱨ"
            },
            "correct": true,
            "offset": 210,
            "far": false
          },
          {
            "key": "torch",
            "name": {
              "en": "Electric torch",
              "hi": "बिजली की टॉर्च",
              "sat": "ᱴᱚᱨᱪ"
            },
            "correct": false,
            "offset": 90,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱞᱴᱤ"
            },
            "correct": false,
            "offset": 320,
            "far": false
          },
          {
            "key": "towel_dry",
            "name": {
              "en": "Dry towel",
              "hi": "सूखा तौलिया",
              "sat": "ᱡᱚᱜ ᱛᱩᱣᱟᱞ"
            },
            "correct": false,
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 11,
        "question": {
          "en": "You spot a leaking gas cylinder beside the shaft. What is the correct FIRST action?",
          "hi": "à¤¶à¤¾à¤«à¥à¤Ÿ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤—à¥ˆà¤¸ à¤°à¤¿à¤¸à¤¤à¤¾ à¤¹à¥à¤† à¤¸à¤¿à¤²à¥‡à¤‚à¤¡à¤° à¤¦à¤¿à¤–à¤¾à¥¤ à¤¸à¤¹à¥€ à¤ªà¤¹à¤²à¤¾ à¤•à¤¦à¤® à¤•à¥à¤¯à¤¾ à¤¹à¥ˆ?",
          "sat": "á±¥á±šá±á± á±šá±¨ á±´á±·á±Ÿá±¶ á±¥á±©á±¨ á±¨á±® á±œá±®á±¥ á±žá±¤á±  á±žá±®á± á±Ÿá±± á±¥á±¤á±²á±¤á±±á±°á±Ÿá±¨ á±§á±®á±ž á±®á±±á±Ÿá±¾ á±´á±·á±¤á±  á±¯á±©á±­á±žá±© á± á±Ÿá±¢ á±«á±š."
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": false,
            "text": {
              "en": "Switch on your electric torch to see inside the dark shaft",
              "hi": "à¤…à¤‚à¤§à¥‡à¤°à¥‡ à¤¶à¤¾à¤«à¥à¤Ÿ à¤•à¥‡ à¤…à¤‚à¤¦à¤° à¤¦à¥‡à¤–à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¿à¤œà¤²à¥€ à¤•à¥€ à¤Ÿà¥‰à¤°à¥à¤š à¤œà¤²à¤¾à¤à¤‚",
              "sat": "á±µá±·á±¤á±›á±¨á±¤ á±§á±®á±ž á±žá±Ÿá±¹á±œá±¤á±« á±µá±¤á±¡á±½á±žá±¤ á±´á±šá±¨á±ª á±¡á±©á±ž á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "IGNITION / EXPLOSION",
                "hi": "à¤ªà¥à¤°à¤œà¥à¤µà¤²à¤¨ / à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿ",
                "sat": "á±¥á±®á±¸á±œá±®á±ž á±¡á±©á±ž / á±µá±¤á±¥á±¯á±·á±šá±´"
              },
              "explanation": {
                "en": "A non-intrinsic torch sparks near flammable gas concentration. This causes an immediate flash fire in the confined shaft.",
                "hi": "à¤œà¥à¤µà¤²à¤¨à¤¶à¥€à¤² à¤—à¥ˆà¤¸ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤¨à¥‰à¤¨-à¤‡à¤¨à¥à¤Ÿà¥à¤°à¤¿à¤¨à¥à¤¸à¤¿à¤• à¤Ÿà¥‰à¤°à¥à¤š à¤šà¤¿à¤‚à¤—à¤¾à¤°à¥€ à¤¦à¥‡à¤¤à¥€ à¤¹à¥ˆà¥¤ à¤‡à¤¸à¤¸à¥‡ à¤¸à¥€à¤®à¤¿à¤¤ à¤¶à¤¾à¤«à¥à¤Ÿ à¤®à¥‡à¤‚ à¤¤à¤¤à¥à¤•à¤¾à¤² à¤†à¤— à¤²à¤— à¤œà¤¾à¤¤à¥€ à¤¹à¥ˆà¥¤",
                "sat": "á±œá±®á±¥ á±´á±·á±®á±± á±´á±šá±¨á±ª á±ªá±¤á±±á±œá±Ÿá±¹á±¨á±¤ á±šá±¸á±°á±šá± á±Ÿá±¾ á±±á±šá±£á±Ÿ á±›á±® á±«á±·á±Ÿá±¹á±›á±© á±¨á±® á±¥á±®á±¸á±œá±®á±ž á±¡á±©á±žá±šá±œ-á±Ÿá±¾"
              }
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Rush to the valve and shut it off without any breathing apparatus",
              "hi": "à¤¬à¤¿à¤¨à¤¾ à¤¶à¥à¤µà¤¾à¤¸ à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥‡ à¤µà¤¾à¤²à¥à¤µ à¤¤à¤• à¤­à¤¾à¤—à¤•à¤° à¤‰à¤¸à¥‡ à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚",
              "sat": "á±µá±Ÿá± á±¥á±Ÿá±¸á±¦á±®á±« á±¥á±Ÿá±¯á±Ÿá±µ á±›á±® á±µá±·á±Ÿá±žá±µá±½ á±µá±šá±±á±«á±š á±žá±Ÿá±¹á±œá±¤á±« á±«á±Ÿá±¹á±² á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "TOXIC ASPHYXIATION",
                "hi": "à¤µà¤¿à¤·à¥ˆà¤²à¤¾ à¤¦à¤® à¤˜à¥à¤Ÿà¤¨à¤¾",
                "sat": "á±µá±¤á±¥á±Ÿá±¹á± á±›á±š á±¥á±Ÿá±¸á±¦á±®á±« á±µá±šá±±á±«á±š"
              },
              "explanation": {
                "en": "Entering a toxic gas zone without SCBA causes oxygen displacement and rapid asphyxiation within 30 seconds.",
                "hi": "SCBA à¤•à¥‡ à¤¬à¤¿à¤¨à¤¾ à¤œà¤¹à¤°à¥€à¤²à¥€ à¤—à¥ˆà¤¸ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤œà¤¾à¤¨à¥‡ à¤¸à¥‡ 30 à¤¸à¥‡à¤•à¤‚à¤¡ à¤•à¥‡ à¤­à¥€à¤¤à¤° à¤‘à¤•à¥à¤¸à¥€à¤œà¤¨ à¤•à¥€ à¤•à¤®à¥€ à¤¸à¥‡ à¤¦à¤® à¤˜à¥à¤Ÿà¤¤à¤¾ à¤¹à¥ˆà¥¤",
                "sat": "SCBA á±µá±Ÿá±¹á±±á±©á±œ á±›á±® á±“á± á±¥á±®á± á±®á±±á±° á±¨á±® á±¥á±Ÿá±¸á±¦á±®á±« á±µá±šá±±á±«á±šá±œ-á±Ÿá±¾"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": true,
            "text": {
              "en": "Evacuate the area, alert your team, then approach with SCBA and forced ventilation",
              "hi": "à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤–à¤¾à¤²à¥€ à¤•à¤°à¥‡à¤‚, à¤Ÿà¥€à¤® à¤•à¥‹ à¤¸à¤šà¥‡à¤¤ à¤•à¤°à¥‡à¤‚, à¤«à¤¿à¤° SCBA à¤”à¤° à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤¶à¤¨ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤ªà¤¹à¥à¤‚à¤šà¥‡à¤‚",
              "sat": "á±´á±·á±Ÿá±¶ á±µá±Ÿá±¹á±œá±¤ á±¢á±®, á±´á±¤á±¢ á±žá±Ÿá±¹á±­ á±¢á±®, SCBA á±¥á±Ÿá±¶ á±µá±šá±žá±šá±± á±¢á±®"
            }
          }
        ]
      },
      {
        "id": "s2",
        "prompt": {
          "en": "Find the supply valve.",
          "hi": "आपूर्ति वाल्व खोजें।",
          "sat": "ᱵᱷᱟᱞᱵᱽ ᱠᱷᱩᱡ"
        },
        "objects": [
          {
            "key": "valve",
            "name": {
              "en": "Gas valve",
              "hi": "गैस वाल्व",
              "sat": "ᱜᱮᱥ ᱵᱷᱟᱞᱵᱽ"
            },
            "correct": true,
            "offset": 300,
            "far": true
          },
          {
            "key": "wrench",
            "name": {
              "en": "Steel wrench",
              "hi": "स्टील रिंच",
              "sat": "ᱨᱤᱸᱪ"
            },
            "correct": false,
            "offset": 120,
            "far": false
          },
          {
            "key": "towel_damp",
            "name": {
              "en": "Damp towel",
              "hi": "गीला तौलिया",
              "sat": "ᱫᱟᱜ ᱛᱩᱣᱟᱞ"
            },
            "correct": false,
            "offset": 200,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱞᱴᱤ"
            },
            "correct": false,
            "offset": 40,
            "far": false
          }
        ],
        "timerSeconds": 13,
        "question": {
          "en": "You must isolate the supply. Before entering the gas zone, what must you put on first?",
          "hi": "à¤†à¤ªà¥‚à¤°à¥à¤¤à¤¿ à¤…à¤²à¤— à¤•à¤°à¤¨à¥€ à¤¹à¥ˆà¥¤ à¤—à¥ˆà¤¸ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤œà¤¾à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¸à¤¬à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤•à¥à¤¯à¤¾ à¤ªà¤¹à¤¨à¤¨à¤¾ à¤¹à¥ˆ?",
          "sat": "á±µá±·á±Ÿá±žá±µá±½ á±µá±šá±±á±«á±š á±žá±Ÿá±¹á±œá±¤á±«, á±œá±®á±¥ á±´á±·á±Ÿá±¶ á±¨á±® á±µá±šá±žá±šá±± á±žá±Ÿá±¦á±Ÿá±¨á±® á±ªá±®á±« á±¦á±šá±›á±®á±›á±® á±¦á±©á±­ á±žá±Ÿá±¹á± á±›á±¤."
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": false,
            "text": {
              "en": "An ordinary cloth dust mask â€” it is quickest to grab",
              "hi": "à¤¸à¤¾à¤§à¤¾à¤°à¤£ à¤•à¤ªà¤¡à¤¼à¥‡ à¤•à¤¾ à¤§à¥‚à¤² à¤®à¤¾à¤¸à¥à¤• â€” à¤œà¤²à¥à¤¦à¥€ à¤®à¤¿à¤² à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆ",
              "sat": "á±¥á±Ÿá±«á±·á±Ÿá±¨á±šá±± á±«á±·á±©á±ž á±¢á±Ÿá±¥á± "
            },
            "consequence": {
              "title": {
                "en": "FILTRATION FAILURE",
                "hi": "à¤¨à¤¿à¤¸à¥à¤ªà¤‚à¤¦à¤¨ à¤µà¤¿à¤«à¤²à¤¤à¤¾",
                "sat": "á±¢á±Ÿá±¥á±  á±µá±Ÿá± á±œá±®"
              },
              "explanation": {
                "en": "A dust mask filters particles but blocks no gases. Cyanide and CO pass straight through and still asphyxiate you.",
                "hi": "à¤§à¥‚à¤² à¤®à¤¾à¤¸à¥à¤• à¤•à¤£à¥‹à¤‚ à¤•à¥‹ à¤°à¥‹à¤•à¤¤à¤¾ à¤¹à¥ˆ à¤²à¥‡à¤•à¤¿à¤¨ à¤—à¥ˆà¤¸à¥‹à¤‚ à¤•à¥‹ à¤¨à¤¹à¥€à¤‚à¥¤ CO à¤”à¤° à¤¸à¤¾à¤‡à¤¨à¤¾à¤‡à¤¡ à¤ªà¤¾à¤° à¤•à¤° à¤œà¤¾à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤",
                "sat": "á±«á±·á±©á±ž á±¢á±Ÿá±¥á±  á±œá±®á±¥ á±µá±·á±Ÿá±œá±½ á±µá±Ÿá± á±«á±Ÿá±²á±®á±­á±Ÿá±œ-á±Ÿá±¾"
              }
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": true,
            "text": {
              "en": "Self-Contained Breathing Apparatus (SCBA) with a full air check",
              "hi": "à¤ªà¥‚à¤°à¥à¤£ à¤µà¤¾à¤¯à¥ à¤ªà¤°à¥€à¤•à¥à¤·à¤£ à¤•à¥‡ à¤¸à¤¾à¤¥ SCBA (à¤¸à¥à¤µ-à¤¨à¤¿à¤¹à¤¿à¤¤ à¤¶à¥à¤µà¤¾à¤¸ à¤‰à¤ªà¤•à¤°à¤£)",
              "sat": "SCBA á±¥á±Ÿá±¸á±¦á±®á±« á±¥á±Ÿá±¯á±Ÿá±µ"
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Nothing at all â€” hold your breath and finish it under a minute",
              "hi": "à¤•à¥à¤› à¤¨à¤¹à¥€à¤‚ â€” à¤¸à¤¾à¤‚à¤¸ à¤°à¥‹à¤•à¤•à¤° à¤à¤• à¤®à¤¿à¤¨à¤Ÿ à¤®à¥‡à¤‚ à¤•à¤¾à¤® à¤–à¤¤à¥à¤® à¤•à¤°à¥‡à¤‚",
              "sat": "á±ªá±®á±« á±¦á±šá±¸ á±µá±Ÿá± â€” á±¥á±Ÿá±¸á±¦á±®á±« á±Ÿá±´á± á±Ÿá±¨á±¤á±­á±Ÿá±¹"
            },
            "consequence": {
              "title": {
                "en": "RAPID INCAPACITATION",
                "hi": "à¤¤à¥€à¤µà¥à¤° à¤…à¤•à¥à¤·à¤®à¤¤à¤¾",
                "sat": "á±¡á±Ÿá±¹á±°á±¤ á±µá±šá±±á±«á±š"
              },
              "explanation": {
                "en": "Toxic gas can incapacitate you before you notice danger. There is no safe way to hold your breath and fiddle with a valve.",
                "hi": "à¤œà¤¹à¤°à¥€à¤²à¥€ à¤—à¥ˆà¤¸ à¤–à¤¤à¤°à¤¾ à¤®à¤¹à¤¸à¥‚à¤¸ à¤¹à¥‹à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¹à¥€ à¤†à¤ªà¤•à¥‹ à¤…à¤•à¥à¤·à¤® à¤•à¤° à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆà¥¤ à¤¸à¤¾à¤‚à¤¸ à¤°à¥‹à¤•à¤•à¤° à¤µà¤¾à¤²à¥à¤µ à¤¸à¥‡ à¤›à¥‡à¤¡à¤¼à¤›à¤¾à¤¡à¤¼ à¤•à¤°à¤¨à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
                "sat": "á±µá±¤á±¥á±Ÿá±¹á± á±›á±š á±œá±®á±¥ á± á±Ÿá±›á±·á±Ÿá±­ á±œá±šá±¡ á±žá±Ÿá±¦á±Ÿá±¨á±®á±œá±® á±µá±šá±±á±«á±š á±«á±Ÿá±²á±®á±­á±Ÿá±œ-á±Ÿá±¾"
              }
            }
          }
        ]
      },
      {
        "id": "s3",
        "prompt": {
          "en": "Find the gas monitor.",
          "hi": "गैस मॉनिटर खोजें।",
          "sat": "ᱢᱚᱱᱤᱴᱚᱨ ᱠᱷᱩᱡ"
        },
        "objects": [
          {
            "key": "monitor",
            "name": {
              "en": "Gas monitor",
              "hi": "गैस मॉनिटर",
              "sat": "ᱜᱮᱥ ᱢᱚᱱᱤᱴᱚᱨ"
            },
            "correct": true,
            "offset": 40,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱞᱴᱤ"
            },
            "correct": false,
            "offset": 180,
            "far": false
          },
          {
            "key": "hands",
            "name": {
              "en": "Bare hands",
              "hi": "खाली हाथ",
              "sat": "ᱦᱟᱛᱤ"
            },
            "correct": false,
            "offset": 300,
            "far": false
          },
          {
            "key": "wrench",
            "name": {
              "en": "Steel wrench",
              "hi": "स्टील रिंच",
              "sat": "ᱨᱤᱸᱪ"
            },
            "correct": false,
            "offset": 250,
            "far": false
          }
        ],
        "timerSeconds": 14,
        "question": {
          "en": "The monitor reads above the Lower Explosive Limit (LEL). Which protocol applies now?",
          "hi": "à¤®à¥‰à¤¨à¤¿à¤Ÿà¤° à¤¨à¤¿à¤šà¤²à¥€ à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿà¤• à¤¸à¥€à¤®à¤¾ (LEL) à¤¸à¥‡ à¤Šà¤ªà¤° à¤¦à¤¿à¤–à¤¾ à¤°à¤¹à¤¾ à¤¹à¥ˆà¥¤ à¤…à¤¬ à¤•à¥Œà¤¨ à¤¸à¤¾ à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤•à¥‰à¤² à¤²à¤¾à¤—à¥‚ à¤¹à¥ˆ?",
          "sat": "á±¢á±šá±±á±¤á±´á±šá±¨ LEL á± á±·á±šá±± á±ªá±®á±›á±Ÿá±± á±§á±®á±ž á± á±Ÿá±±á±Ÿá±¾ á±±á±¤á±¡á±Ÿá±¹á±± á± á±šá±±á±°á±¤á±¥á±šá±±?"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "No entry â€” ventilate and tag the area locked out until it drops below LEL",
              "hi": "à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤¨à¤¹à¥€à¤‚ â€” LEL à¤¸à¥‡ à¤¨à¥€à¤šà¥‡ à¤†à¤¨à¥‡ à¤¤à¤• à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤•à¥‹ à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤Ÿ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤²à¥‰à¤•-à¤†à¤‰à¤Ÿ à¤Ÿà¥ˆà¤— à¤•à¤°à¥‡à¤‚",
              "sat": "á±µá±šá±žá±šá±± á±µá±Ÿá± â€” LEL á±žá±Ÿá±›á±Ÿá±¨ á±µá±Ÿá±¹á±œá±¤ á±¢á±®"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Let one rescuer enter quickly with a fresh-air line to check the level",
              "hi": "à¤¸à¥à¤¤à¤° à¤œà¤¾à¤‚à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤à¤• à¤¬à¤šà¤¾à¤µà¤•à¤°à¥à¤®à¥€ à¤•à¥‹ à¤¤à¤¾à¤œà¥€ à¤¹à¤µà¤¾ à¤•à¥€ à¤²à¤¾à¤‡à¤¨ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¤à¥‡à¤œà¤¼à¥€ à¤¸à¥‡ à¤…à¤‚à¤¦à¤° à¤œà¤¾à¤¨à¥‡ à¤¦à¥‡à¤‚",
              "sat": "á±¡á±©á±£á± á±¤á±­á±Ÿá±¹ á±¢á±¤á±«á±´á±Ÿá± á± á±·á±Ÿá±±á±®á±« á±µá±šá±žá±šá±± á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "PREMISES ENTRY VIOLATION",
                "hi": "à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤‰à¤²à¥à¤²à¤‚à¤˜à¤¨",
                "sat": "á±µá±šá±žá±šá±± á±µá±šá±›á±šá±¨"
              },
              "explanation": {
                "en": "A fresh-air line is a rescue tool only for an established rescue team. Above LEL even a solo rescuer is exposed to an explosive atmosphere.",
                "hi": "à¤¤à¤¾à¤œà¥€ à¤¹à¤µà¤¾ à¤•à¥€ à¤²à¤¾à¤‡à¤¨ à¤•à¥‡à¤µà¤² à¤ªà¥à¤°à¤¶à¤¿à¤•à¥à¤·à¤¿à¤¤ à¤¬à¤šà¤¾à¤µ à¤¦à¤² à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆà¥¤ LEL à¤¸à¥‡ à¤Šà¤ªà¤° à¤…à¤•à¥‡à¤²à¤¾ à¤¬à¤šà¤¾à¤µà¤•à¤°à¥à¤®à¥€ à¤­à¥€ à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿà¤• à¤µà¤¾à¤¤à¤¾à¤µà¤°à¤£ à¤®à¥‡à¤‚ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤",
                "sat": "LEL á±ªá±®á±›á±Ÿá±± á±¨á±® á±¢á±¤á±«á±´á±Ÿá± á±Ÿá±¥á±©á± á±·á±šá±­ á±¨á±®á±¦á±šá±¸ á±µá±¤á±¥á±¯á±·á±šá±´ á±¡á±šá± á±·á±Ÿ.á±¾"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Max the exhaust blower and continue your shift inside the zone",
              "hi": "à¤à¤•à¥à¤œà¥‰à¤¸à¥à¤Ÿ à¤¬à¥à¤²à¥‹à¤…à¤° à¤…à¤§à¤¿à¤•à¤¤à¤® à¤•à¤°à¤•à¥‡ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¥€ à¤¶à¤¿à¤«à¥à¤Ÿ à¤œà¤¾à¤°à¥€ à¤°à¤–à¥‡à¤‚",
              "sat": "á±µá±žá±šá±£á±Ÿá±¨ á±ªá±®á±›á±Ÿá±± á± á±Ÿá±›á±® á± á±Ÿá±¢ á±¯á±©á±¨á±Ÿá±¹á±£ á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "PROLONGED EXPOSURE",
                "hi": "à¤²à¤‚à¤¬à¥‡ à¤¸à¤®à¤¯ à¤¤à¤• à¤¸à¤‚à¤ªà¤°à¥à¤•",
                "sat": "á±¡á±©á±¨á±¤á±­á±Ÿá±¹ á±¨á±®á±¦á±®á±«"
              },
              "explanation": {
                "en": "Above LEL the atmosphere is only one ignition spark away from a flash fire. Continuing the shift keeps your whole team in that zone.",
                "hi": "LEL à¤¸à¥‡ à¤Šà¤ªà¤° à¤µà¤¾à¤¤à¤¾à¤µà¤°à¤£ à¤à¤• à¤šà¤¿à¤‚à¤—à¤¾à¤°à¥€ à¤¦à¥‚à¤° à¤¹à¥ˆà¥¤ à¤¶à¤¿à¤«à¥à¤Ÿ à¤œà¤¾à¤°à¥€ à¤°à¤–à¤¨à¥‡ à¤¸à¥‡ à¤ªà¥‚à¤°à¥€ à¤Ÿà¥€à¤® à¤œà¥‹à¤–à¤¿à¤® à¤®à¥‡à¤‚ à¤°à¤¹à¤¤à¥€ à¤¹à¥ˆà¥¤",
                "sat": "LEL á±ªá±®á±›á±Ÿá±± á±¢á±¤á±«á±´á±Ÿá± á±ªá±¤á±±á±œá±Ÿá±¹á±¨á±¤ á±¨á±® á±µá±¤á±¥á±¯á±·á±šá±´á±¾"
              }
            }
          }
        ]
      }
    ]
  },
  "mod2": {
    "id": "mod2",
    "titleKey": "mod2_title",
    "alarmTextKey": "alarm_fire",
    "calloutLabelKey": "smoke_conc",
    "calloutValKey": "temp_rising",
    "skills": [
      "electrical_fire",
      "extinguisher_class",
      "vent_control",
      "conveyor_ops"
    ],
    "briefing": {
      "en": "You are on the main conveyor line. Belt 3 is running hot — dense toxic smoke rises from the drive. Act fast: find the right tool in the scene, cut the power, and stop the smoke reaching the working faces.",
      "hi": "आप मुख्य कन्वेयर लाइन पर हैं। बेल्ट 3 गर्म हो रही है — घना जहरीला धुआं उठ रहा है। तेजी से काम करें: सही उपकरण खोजें, बिजली काटें और धुएं को कार्यस्थल तक पहुँचने से रोकें।",
      "sat": "ᱟᱫ ᱢᱠᱷᱭ ᱠᱱᱵᱷᱭᱨ।ᱵᱩᱞᱴ ᱓ ᱜᱢ-᱾"
    },
    "steps": [
      {
        "id": "f1",
        "prompt": {
          "en": "Find the conveyor drive motor.",
          "hi": "कन्वेयर ड्राइव मोटर खोजें।",
          "sat": "ᱢᱚᱴᱚᱨ ᱠᱷᱩᱡ"
        },
        "objects": [
          {
            "key": "motor",
            "name": {
              "en": "Drive motor",
              "hi": "ड्राइव मोटर",
              "sat": "ᱢᱚᱴᱚᱨ"
            },
            "correct": true,
            "offset": 210,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱞᱴᱤ"
            },
            "correct": false,
            "offset": 90,
            "far": false
          },
          {
            "key": "towel_dry",
            "name": {
              "en": "Dry towel",
              "hi": "सूखा तौलिया",
              "sat": "ᱡᱚᱜ ᱛᱩᱣᱟᱞ"
            },
            "correct": false,
            "offset": 320,
            "far": false
          },
          {
            "key": "torch",
            "name": {
              "en": "Electric torch",
              "hi": "बिजली की टॉर्च",
              "sat": "ᱴᱚᱨᱪ"
            },
            "correct": false,
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 15,
        "question": {
          "en": "The main conveyor drive motor is sparking and smoking. What is the correct FIRST action?",
          "hi": "à¤®à¥à¤–à¥à¤¯ à¤•à¤¨à¥à¤µà¥‡à¤¯à¤° à¤¡à¥à¤°à¤¾à¤‡à¤µ à¤®à¥‹à¤Ÿà¤° à¤šà¤¿à¤‚à¤—à¤¾à¤°à¥€ à¤”à¤° à¤§à¥à¤†à¤‚ à¤¦à¥‡ à¤°à¤¹à¥€ à¤¹à¥ˆà¥¤ à¤¸à¤¹à¥€ à¤ªà¤¹à¤²à¤¾ à¤•à¤¦à¤® à¤•à¥à¤¯à¤¾ à¤¹à¥ˆ?",
          "sat": "á± á±šá±±á±µá±·á±®á±­á±šá±¨ á±¢á±šá±´á±šá±¨ á±ªá±¤á±±á±œá±Ÿá±¹á±¨á±¤ á±«á±·á±©á±¶á±Ÿá±¹ á±šá±¸á±°á±šá± á±šá±œ á± á±Ÿá±±á±Ÿá±¾ á±¯á±©á±­á±žá±© á± á±Ÿá±¢ á±«á±š?"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": false,
            "text": {
              "en": "Throw water directly onto the running high-voltage motor",
              "hi": "à¤šà¤² à¤°à¤¹à¥€ à¤‰à¤šà¥à¤š à¤µà¥‹à¤²à¥à¤Ÿà¥‡à¤œ à¤®à¥‹à¤Ÿà¤° à¤ªà¤° à¤¸à¥€à¤§à¥‡ à¤ªà¤¾à¤¨à¥€ à¤«à¥‡à¤‚à¤•à¥‡à¤‚",
              "sat": "á±ªá±Ÿá±žá±Ÿá±œ á± á±Ÿá±± á±µá±¤á±¡á±½á±žá±¤ á±¢á±šá±´á±šá±¨ á±¨á±® á±«á±Ÿá±œ á±«á±©á±ž á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "ELECTROCUTION & DUST EXPLOSION",
                "hi": "à¤¬à¤¿à¤œà¤²à¥€ à¤•à¤¾ à¤à¤Ÿà¤•à¤¾ à¤à¤µà¤‚ à¤§à¥‚à¤² à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿ",
                "sat": "á±µá±¤á±¡á±½á±žá±¤ á±¥á±šá±  á±Ÿá±¨ á±µá±¤á±¥á±¯á±·á±šá±´"
              },
              "explanation": {
                "en": "Water on an energized 3.3kV motor causes fatal electrocution and steam-induced coal dust suspension explosion.",
                "hi": "3.3kV à¤®à¥‹à¤Ÿà¤° à¤ªà¤° à¤ªà¤¾à¤¨à¥€ à¤¸à¥‡ à¤˜à¤¾à¤¤à¤• à¤¬à¤¿à¤œà¤²à¥€ à¤•à¤¾ à¤à¤Ÿà¤•à¤¾ à¤”à¤° à¤•à¥‹à¤¯à¤²à¥‡ à¤•à¥€ à¤§à¥‚à¤² à¤•à¤¾ à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤",
                "sat": "á±µá±¤á±¡á±½á±žá±¤ á±¢á±šá±´á±šá±¨ á±¨á±® á±«á±Ÿá±œ á±«á±©á±ž á±žá±®á±¨á±® á±µá±¤á±¡á±½á±žá±¤ á±¥á±šá±  á±Ÿá±¨ á±µá±¤á±¥á±¯á±·á±šá±´á±¾"
              }
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": true,
            "text": {
              "en": "Hit the emergency belt trip, isolate the breaker, then use a CO2/dry-powder extinguisher",
              "hi": "à¤‡à¤®à¤°à¤œà¥‡à¤‚à¤¸à¥€ à¤¬à¥‡à¤²à¥à¤Ÿ à¤Ÿà¥à¤°à¤¿à¤ª à¤¦à¤¬à¤¾à¤à¤‚, à¤¬à¥à¤°à¥‡à¤•à¤° à¤…à¤²à¤— à¤•à¤°à¥‡à¤‚, à¤«à¤¿à¤° CO2/à¤¡à¥à¤°à¤¾à¤ˆ à¤ªà¤¾à¤‰à¤¡à¤° à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚",
              "sat": "á±¤á±¢á±šá±¨á±¡á±®á±±á±¥á±¤ á±¥á±©á±­á±¤á±ª, á±µá±¤á±¡á±½á±žá±¤ á±µá±šá±±á±«á±š, CO2 á±¤á±¬á±¤á±¡ á±¥á±Ÿá±¯á±Ÿá±µ"
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Open the main ventilation doors wide to clear the smoke quickly",
              "hi": "à¤§à¥à¤à¤ à¤•à¥‹ à¤œà¤²à¥à¤¦à¥€ à¤¨à¤¿à¤•à¤¾à¤²à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤®à¥à¤–à¥à¤¯ à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤¶à¤¨ à¤¦à¤°à¤µà¤¾à¤œà¤¼à¥‡ à¤ªà¥‚à¤°à¥‡ à¤–à¥‹à¤² à¤¦à¥‡à¤‚",
              "sat": "á±«á±·á±©á±¶á±Ÿá±¹ á±šá±¸á±°á±šá±  á±žá±Ÿá±¹á±œá±¤á±« á±¦á±šá±­ á±«á±©á±£á±Ÿá±¹á±¨ á±¡á±·á±¤á±¡ á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "MINE-WIDE SMOKE TOXICITY",
                "hi": "à¤–à¤¾à¤¨ à¤®à¥‡à¤‚ à¤µà¥à¤¯à¤¾à¤ªà¤• à¤§à¥à¤†à¤‚ à¤µà¤¿à¤·à¤¾à¤•à¥à¤¤à¤¤à¤¾",
                "sat": "á± á±·á±Ÿá±«á±Ÿá±± á±¥á±Ÿá±¨á±Ÿ á±«á±·á±©á±¶á±Ÿá±¹"
              },
              "explanation": {
                "en": "Opening intake doors feeds oxygen into the fire and forces deadly CO straight into downstream working faces.",
                "hi": "à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤¶à¤¨ à¤¦à¤°à¤µà¤¾à¤œà¥‡ à¤–à¥‹à¤²à¤¨à¥‡ à¤¸à¥‡ à¤†à¤— à¤•à¥‹ à¤‘à¤•à¥à¤¸à¥€à¤œà¤¨ à¤®à¤¿à¤²à¤¤à¥€ à¤¹à¥ˆ à¤”à¤° à¤˜à¤¾à¤¤à¤• CO à¤¸à¤­à¥€ à¤¶à¥à¤°à¤®à¤¿à¤•à¥‹à¤‚ à¤•à¥€ à¤“à¤° à¤«à¥ˆà¤² à¤œà¤¾à¤¤à¥€ à¤¹à¥ˆà¥¤",
                "sat": "á±¦á±šá±­ á±«á±©á±£á±Ÿá±¹á±¨ á±¡á±·á±¤á±¡ á±žá±®á±¨á±® CO á±¥á±Ÿá±±á±Ÿá±¢ á±´á±·á±Ÿá±¶ á±¯á±Ÿá±¥á±±á±Ÿá±£á±šá±œ-á±Ÿá±¾"
              }
            }
          }
        ]
      },
      {
        "id": "f2",
        "prompt": {
          "en": "Find the fire extinguisher.",
          "hi": "अग्निशामक खोजें।",
          "sat": "ᱤᱬᱤᱡ ᱠᱷᱩᱡ"
        },
        "objects": [
          {
            "key": "extinguisher",
            "name": {
              "en": "Extinguisher",
              "hi": "अग्निशामक",
              "sat": "ᱤᱬᱤᱡ"
            },
            "correct": true,
            "offset": 95,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱞᱴᱤ"
            },
            "correct": false,
            "offset": 300,
            "far": false
          },
          {
            "key": "torch",
            "name": {
              "en": "Electric torch",
              "hi": "बिजली की टॉर्च",
              "sat": "ᱴᱚᱨᱪ"
            },
            "correct": false,
            "offset": 180,
            "far": false
          },
          {
            "key": "towel_damp",
            "name": {
              "en": "Damp towel",
              "hi": "गीला तौलिया",
              "sat": "ᱫᱟᱜ ᱛᱩᱣᱟᱞ"
            },
            "correct": false,
            "offset": 40,
            "far": false
          }
        ],
        "timerSeconds": 14,
        "question": {
          "en": "A colleague is isolating the breaker. Which extinguisher should you pick for the electrical fire?",
          "hi": "à¤¸à¤¾à¤¥à¥€ à¤¬à¥à¤°à¥‡à¤•à¤° à¤…à¤²à¤— à¤•à¤° à¤°à¤¹à¤¾ à¤¹à¥ˆà¥¤ à¤¬à¤¿à¤œà¤²à¥€ à¤•à¥€ à¤†à¤— à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥Œà¤¨ à¤¸à¤¾ à¤…à¤—à¥à¤¨à¤¿à¤¶à¤¾à¤®à¤• à¤šà¥à¤¨à¤¨à¤¾ à¤¹à¥ˆ?",
          "sat": "á±µá±¤á±¡á±½á±žá±¤ á±¥á±®á±¸á±œá±®á±ž á±žá±Ÿá±¹á±œá±¤á±« á±ªá±®á±« á±¤á±¬á±¤á±¡ á±¥á±Ÿá±¯á±Ÿá±µ?"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "CO2 or Dry-Powder (Class C) â€” non-conductive for energized equipment",
              "hi": "CO2 à¤¯à¤¾ à¤¡à¥à¤°à¤¾à¤ˆ à¤ªà¤¾à¤‰à¤¡à¤° (à¤•à¥à¤²à¤¾à¤¸ C) â€” à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥‡ à¤²à¤¿à¤ à¤—à¥ˆà¤°-à¤šà¤¾à¤²à¤•",
              "sat": "CO2 / á±«á±¨á±¤á±¯á±Ÿá±£á±«á±Ÿá±¨ â€” á±µá±Ÿá± á±ªá±Ÿá±žá±ªá±Ÿá±ž"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Water or foam extinguisher for the heat",
              "hi": "à¤—à¤°à¥à¤®à¥€ à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¤¾à¤¨à¥€ à¤¯à¤¾ à¤«à¥‹à¤® à¤…à¤—à¥à¤¨à¤¿à¤¶à¤¾à¤®à¤•",
              "sat": "á±«á±Ÿá±œ / á±¯á±·á±šá±­á±šá±¢ á±¤á±¬á±¤á±¡"
            },
            "consequence": {
              "title": {
                "en": "ELECTROCUTION & DUST EXPLOSION",
                "hi": "à¤¬à¤¿à¤œà¤²à¥€ à¤•à¤¾ à¤à¤Ÿà¤•à¤¾ à¤à¤µà¤‚ à¤§à¥‚à¤² à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿ",
                "sat": "á±µá±¤á±¡á±½á±žá±¤ á±¥á±šá± "
              },
              "explanation": {
                "en": "Conductive water on energized equipment allows current through the jet, electrocuting you and igniting coal dust.",
                "hi": "à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤‰à¤ªà¤•à¤°à¤£ à¤ªà¤° à¤šà¤¾à¤²à¤• à¤ªà¤¾à¤¨à¥€ à¤œà¥‡à¤Ÿ à¤•à¥‡ à¤œà¤°à¤¿à¤ à¤•à¤°à¤‚à¤Ÿ à¤ªà¤¹à¥à¤‚à¤šà¤¾à¤•à¤° à¤†à¤ªà¤•à¥‹ à¤¬à¤¿à¤œà¤²à¥€ à¤•à¤¾ à¤à¤Ÿà¤•à¤¾ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆ à¤”à¤° à¤•à¥‹à¤¯à¤²à¤¾ à¤§à¥‚à¤² à¤œà¤²à¤¾ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆà¥¤",
                "sat": "á±«á±Ÿá±œ á±«á±©á±ž á±žá±®á±¨á±® á±µá±¤á±¡á±½á±žá±¤ á±¥á±šá± á±¾"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Let the fire burn out with the fans at maximum",
              "hi": "à¤ªà¤‚à¤–à¥‡ à¤…à¤§à¤¿à¤•à¤¤à¤® à¤ªà¤° à¤šà¤²à¤¾à¤•à¤° à¤†à¤— à¤•à¥‹ à¤–à¥à¤¦ à¤¬à¥à¤à¤¨à¥‡ à¤¦à¥‡à¤‚",
              "sat": "á±¯á±·á±Ÿá±± á±ªá±®á±›á±Ÿá±± á±¨á±® á±µá±©á±¡á±·á±Ÿá±¹á±£"
            },
            "consequence": {
              "title": {
                "en": "FIRE SPREAD & CO EXPOSURE",
                "hi": "à¤†à¤— à¤«à¥ˆà¤²à¤¨à¤¾ à¤à¤µà¤‚ CO à¤¸à¤‚à¤ªà¤°à¥à¤•",
                "sat": "á±¥á±®á±¸á±œá±®á±ž á±¯á±Ÿá±¥á±±á±Ÿá±£"
              },
              "explanation": {
                "en": "A friction belt fire grows; maximum fans blow toxic CO across the whole mine while the fire keeps burning.",
                "hi": "à¤˜à¤°à¥à¤·à¤£ à¤¬à¥‡à¤²à¥à¤Ÿ à¤†à¤— à¤¬à¤¢à¤¼à¤¤à¥€ à¤¹à¥ˆ; à¤…à¤§à¤¿à¤•à¤¤à¤® à¤ªà¤‚à¤–à¥‡ à¤ªà¥‚à¤°à¥€ à¤–à¤¦à¤¾à¤¨ à¤®à¥‡à¤‚ à¤œà¤¹à¤°à¥€à¤²à¥€ CO à¤«à¥ˆà¤²à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
                "sat": "á±¯á±·á±Ÿá±± CO á±¥á±Ÿá±±á±Ÿá±¢ á±´á±·á±Ÿá±¶ á±¯á±Ÿá±¥á±±á±Ÿá±£ á±®á±«-á±Ÿá±¾"
              }
            }
          }
        ]
      },
      {
        "id": "f3",
        "prompt": {
          "en": "Find the ventilation door.",
          "hi": "वेंटिलेशन दरवाज़ा खोजें।",
          "sat": "ᱦᱚᱭ ᱫᱩᱣᱟᱹᱨ ᱠᱷᱩᱡ"
        },
        "objects": [
          {
            "key": "door",
            "name": {
              "en": "Ventilation door",
              "hi": "वेंटिलेशन दरवाज़ा",
              "sat": "ᱦᱚᱭ ᱫᱩᱣᱟᱹᱨ"
            },
            "correct": true,
            "offset": 340,
            "far": true
          },
          {
            "key": "wrench",
            "name": {
              "en": "Steel wrench",
              "hi": "स्टील रिंच",
              "sat": "ᱨᱤᱸᱪ"
            },
            "correct": false,
            "offset": 100,
            "far": false
          },
          {
            "key": "towel_damp",
            "name": {
              "en": "Damp towel",
              "hi": "गीला तौलिया",
              "sat": "ᱫᱟᱜ ᱛᱩᱣᱟᱞ"
            },
            "correct": false,
            "offset": 220,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱞᱴᱤ"
            },
            "correct": false,
            "offset": 250,
            "far": false
          }
        ],
        "timerSeconds": 13,
        "question": {
          "en": "The belt fire is now producing thick toxic CO. How should you handle the ventilation circuit?",
          "hi": "à¤¬à¥‡à¤²à¥à¤Ÿ à¤†à¤— à¤…à¤¬ à¤˜à¤¨à¤¾ à¤œà¤¹à¤°à¥€à¤²à¤¾ CO à¤§à¥à¤†à¤‚ à¤¬à¤¨à¤¾ à¤°à¤¹à¥€ à¤¹à¥ˆà¥¤ à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤¶à¤¨ à¤¸à¤°à¥à¤•à¤¿à¤Ÿ à¤•à¥ˆà¤¸à¥‡ à¤¸à¤‚à¤­à¤¾à¤²à¥‡à¤‚?",
          "sat": "á±«á±·á±©á±¶á±Ÿá±¹ á±¯á±Ÿá±¥á±±á±Ÿá±£ á± á±Ÿá±±á±Ÿá±¾ á±¦á±šá±­ á±¥á±šá±¨á±´á±¤á± á±©á±´ á±ªá±®á±«á±žá±®á± á±Ÿ?"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "Close the air-lock doors to starve the fire of oxygen and keep CO off the working faces",
              "hi": "à¤†à¤— à¤•à¥‹ à¤‘à¤•à¥à¤¸à¥€à¤œà¤¨ à¤¸à¥‡ à¤µà¤‚à¤šà¤¿à¤¤ à¤•à¤°à¤¨à¥‡ à¤”à¤° CO à¤•à¥‹ à¤•à¤¾à¤°à¥à¤¯à¤¸à¥à¤¥à¤² à¤¸à¥‡ à¤¦à¥‚à¤° à¤°à¤–à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤à¤¯à¤°-à¤²à¥‰à¤• à¤¦à¤°à¤µà¤¾à¤œà¤¼à¥‡ à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚",
              "sat": "á±¥á±®á±¸á±œá±®á±ž á±µá±šá±±á±«á±š á±žá±Ÿá±¹á±œá±¤á±« á±«á±©á±£á±Ÿá±¹á±¨ á±µá±šá±±á±«á±š á±¢á±®"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Open all intake doors wide to blow the smoke out fast",
              "hi": "à¤§à¥à¤à¤ à¤•à¥‹ à¤œà¤²à¥à¤¦à¥€ à¤¬à¤¾à¤¹à¤° à¤¨à¤¿à¤•à¤¾à¤²à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤­à¥€ à¤‡à¤¨à¤Ÿà¥‡à¤• à¤¦à¤°à¤µà¤¾à¤œà¤¼à¥‡ à¤ªà¥‚à¤°à¥‡ à¤–à¥‹à¤²à¥‡à¤‚",
              "sat": "á±¥á±Ÿá±±á±Ÿá±¢ á±«á±©á±£á±Ÿá±¹á±¨ á±¡á±·á±¤á±¡ á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "CO INGESTION AT WORKING FACES",
                "hi": "à¤•à¤¾à¤°à¥à¤¯à¤¸à¥à¤¥à¤² à¤ªà¤° CO à¤…à¤‚à¤¤à¤°à¥à¤—à¥à¤°à¤¹à¤£",
                "sat": "CO á±¥á±Ÿá±¸á±¦á±®á±«"
              },
              "explanation": {
                "en": "Opening intake doors feeds oxygen to the fire and forces deadly CO directly into the faces where miners are stationed.",
                "hi": "à¤‡à¤¨à¤Ÿà¥‡à¤• à¤¦à¤°à¤µà¤¾à¤œà¥‡ à¤–à¥‹à¤²à¤¨à¥‡ à¤¸à¥‡ à¤†à¤— à¤•à¥‹ à¤‘à¤•à¥à¤¸à¥€à¤œà¤¨ à¤®à¤¿à¤²à¤¤à¥€ à¤¹à¥ˆ à¤”à¤° à¤˜à¤¾à¤¤à¤• CO à¤¸à¥€à¤§à¥‡ à¤¶à¥à¤°à¤®à¤¿à¤•à¥‹à¤‚ à¤¤à¤• à¤ªà¤¹à¥à¤‚à¤šà¤¤à¥€ à¤¹à¥ˆà¥¤",
                "sat": "á±«á±©á±£á±Ÿá±¹á±¨ á±¡á±·á±¤á±¡ á±žá±®á±¨á±® CO á±¥á±Ÿá±±á±Ÿá±¢ á±´á±·á±Ÿá±¶á±¾"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Reverse the fans at max to pull the smoke up through the shaft",
              "hi": "à¤§à¥à¤à¤‚ à¤•à¥‹ à¤¶à¤¾à¤«à¥à¤Ÿ à¤¸à¥‡ à¤Šà¤ªà¤° à¤¨à¤¿à¤•à¤¾à¤²à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¤‚à¤–à¥‡ à¤…à¤§à¤¿à¤•à¤¤à¤® à¤ªà¤° à¤‰à¤²à¥à¤Ÿà¤¾ à¤šà¤²à¤¾à¤à¤‚",
              "sat": "á±¯á±·á±Ÿá±± á±©á±žá±´á±Ÿá±¹á±£ á±¢á±®"
            },
            "consequence": {
              "title": {
                "en": "VENTILATION CRISIS",
                "hi": "à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤¶à¤¨ à¤¸à¤‚à¤•à¤Ÿ",
                "sat": "á±¦á±šá±­ á±¥á±šá± "
              },
              "explanation": {
                "en": "Reversing mine fans mid-incident destabilizes the whole circuit and can suffocate the escape routes your team needs.",
                "hi": "à¤˜à¤Ÿà¤¨à¤¾ à¤•à¥‡ à¤¬à¥€à¤š à¤–à¤¾à¤¨ à¤•à¥‡ à¤ªà¤‚à¤–à¥‡ à¤‰à¤²à¥à¤Ÿà¤¾ à¤šà¤²à¤¾à¤¨à¥‡ à¤¸à¥‡ à¤ªà¥‚à¤°à¤¾ à¤¸à¤°à¥à¤•à¤¿à¤Ÿ à¤…à¤¸à¥à¤¥à¤¿à¤° à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆ à¤”à¤° à¤­à¤¾à¤—à¤¨à¥‡ à¤•à¥‡ à¤°à¤¾à¤¸à¥à¤¤à¥‡ à¤¬à¤‚à¤¦ à¤¹à¥‹ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
                "sat": "á±¯á±·á±Ÿá±± á±©á±žá±´á±Ÿá±¹á±£ á±žá±®á±¨á±® á±šá±¸á±°á±šá±  á±¥á±®á±›á±Ÿá±œ-á±Ÿá±¾"
              }
            }
          }
        ]
      }
    ]
  }
};

// Adaptive coaching hints, keyed by moduleId.stepIndex. Shown on retry only.
const STEP_HINTS = {
  "mod1.0": {
    en: "Gas needs a spark to ignite. When in doubt, clear the area first, then return with breathing apparatus.",
    hi: "à¤—à¥ˆà¤¸ à¤•à¥‹ à¤†à¤— à¤ªà¤•à¤¡à¤¼à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤šà¤¿à¤‚à¤—à¤¾à¤°à¥€ à¤šà¤¾à¤¹à¤¿à¤à¥¤ à¤¸à¤‚à¤¦à¥‡à¤¹ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤ªà¤¹à¤²à¥‡ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤–à¤¾à¤²à¥€ à¤•à¤°à¥‡à¤‚, à¤«à¤¿à¤° à¤¶à¥à¤µà¤¾à¤¸ à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤²à¥Œà¤Ÿà¥‡à¤‚à¥¤",
    sat: "á±œá±®á±¥ á±¥á±®á±¸á±œá±®á±ž á±žá±Ÿá±¹á±œá±¤á±« á±ªá±¤á±±á±œá±Ÿá±¹á±¨á±¤ á±žá±Ÿá±¹á± á±›á±¤á±¾ á±¯á±©á±­á±žá±© á±´á±·á±Ÿá±¶ á±µá±Ÿá±¹á±œá±¤, á±›á±Ÿá±­á±šá±¢ SCBA á±¥á±Ÿá±¶ á±¦á±©á±­á±©á±œ-á±Ÿá±¾"
  },
  "mod1.1": {
    en: "A dust mask blocks particles, not gas. You need self-contained air (SCBA) to breathe safely.",
    hi: "à¤§à¥‚à¤² à¤®à¤¾à¤¸à¥à¤• à¤•à¤£ à¤°à¥‹à¤•à¤¤à¤¾ à¤¹à¥ˆ, à¤—à¥ˆà¤¸ à¤¨à¤¹à¥€à¤‚à¥¤ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¸à¤¾à¤‚à¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥à¤µ-à¤¨à¤¿à¤¹à¤¿à¤¤ à¤¹à¤µà¤¾ (SCBA) à¤šà¤¾à¤¹à¤¿à¤à¥¤",
    sat: "á±«á±·á±©á±ž á±¢á±Ÿá±¥á±  á±œá±®á±¥ á±µá±·á±Ÿá±œá±½ á±µá±Ÿá± á±«á±Ÿá±²á±®á±­á±Ÿá±œ-á±Ÿá±¾ SCBA á±žá±Ÿá±¹á± á±›á±¤á±¾"
  },
  "mod1.2": {
    en: "Above the explosive limit there is no safe entry â€” ventilate and lock the area out until it clears.",
    hi: "à¤µà¤¿à¤¸à¥à¤«à¥‹à¤Ÿà¤• à¤¸à¥€à¤®à¤¾ à¤¸à¥‡ à¤Šà¤ªà¤° à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ â€” à¤¹à¤µà¤¾ à¤¦à¥‡à¤‚ à¤”à¤° à¤¸à¤¾à¤« à¤¹à¥‹à¤¨à¥‡ à¤¤à¤• à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤²à¥‰à¤•-à¤†à¤‰à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤",
    sat: "LEL á±ªá±®á±›á±Ÿá±± á±µá±šá±žá±šá±± á±µá±Ÿá± â€” á±¦á±šá±­ á±®á±¢ á±¢á±®, á±µá±šá±±á±«á±š á±¢á±®á±¾"
  },
  "mod2.0": {
    en: "Never throw water on live electrics. Trip the belt and isolate the breaker before anything else.",
    hi: "à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤¬à¤¿à¤œà¤²à¥€ à¤ªà¤° à¤•à¤­à¥€ à¤ªà¤¾à¤¨à¥€ à¤¨à¤¹à¥€à¤‚à¥¤ à¤¸à¤¬à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¬à¥‡à¤²à¥à¤Ÿ à¤Ÿà¥à¤°à¤¿à¤ª à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¬à¥à¤°à¥‡à¤•à¤° à¤…à¤²à¤— à¤•à¤°à¥‡à¤‚à¥¤",
    sat: "á±µá±¤á±¡á±½á±žá±¤ á±¨á±® á±«á±Ÿá±œ á±«á±©á±ž á±µá±Ÿá± â€” á±¯á±©á±­á±žá±© á±µá±®á±žá±´ á±šá±¯á±·, á±µá±¨á±¤á± á±Ÿá±¨ á±¤á±¥á±šá±žá±®á±´á±¾"
  },
  "mod2.1": {
    en: "For an electrical fire use a non-conductive CO2 or dry-powder extinguisher, never water.",
    hi: "à¤¬à¤¿à¤œà¤²à¥€ à¤•à¥€ à¤†à¤— à¤•à¥‡ à¤²à¤¿à¤ à¤—à¥ˆà¤°-à¤šà¤¾à¤²à¤• CO2 à¤¯à¤¾ à¤¡à¥à¤°à¤¾à¤ˆ à¤ªà¤¾à¤‰à¤¡à¤° à¤…à¤—à¥à¤¨à¤¿à¤¶à¤¾à¤®à¤• à¤šà¥à¤¨à¥‡à¤‚, à¤•à¤­à¥€ à¤ªà¤¾à¤¨à¥€ à¤¨à¤¹à¥€à¤‚à¥¤",
    sat: "á±µá±¤á±¡á±½á±žá±¤ á±¥á±®á±¸á±œá±®á±ž á±žá±Ÿá±¹á±œá±¤á±« CO2/á±«á±¨á±¤á±¯á±Ÿá±£á±«á±Ÿá±¨, á±«á±Ÿá±œ á±µá±Ÿá±á±¾"
  },
  "mod2.2": {
    en: "Fire feeds on oxygen â€” close the ventilation air locks to starve it and keep CO off the working faces.",
    hi: "à¤†à¤— à¤‘à¤•à¥à¤¸à¥€à¤œà¤¨ à¤¸à¥‡ à¤¬à¤¢à¤¼à¤¤à¥€ à¤¹à¥ˆ â€” à¤‰à¤¸à¥‡ à¤‘à¤•à¥à¤¸à¥€à¤œà¤¨ à¤¸à¥‡ à¤µà¤‚à¤šà¤¿à¤¤ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤µà¥‡à¤‚à¤Ÿà¤¿à¤²à¥‡à¤¶à¤¨ à¤à¤¯à¤°-à¤²à¥‰à¤• à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚à¥¤",
    sat: "á±¥á±®á±¸á±œá±®á±ž á±¦á±šá±­-á±Ÿ â€” á±¦á±šá±­ á±«á±©á±£á±Ÿá±¹á±¨ á±µá±šá±±á±«á±š á±›á±® á±µá±šá±›á±šá±¨ á±µá±·á±Ÿá±œá±½á±¾"
  }
};


