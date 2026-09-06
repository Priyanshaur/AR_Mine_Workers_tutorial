// SafetyLens AR - Training Modules (unified multi-object find-answer steps)
// Every step: find & select the correct object among several, then answer to progress.

const TRAINING_MODULES = {

  "mod0": {
    "id": "mod0",
    "titleKey": "mod0_title",
    "alarmTextKey": "alarm_gas",
    "calloutLabelKey": "gas_conc",
    "calloutValKey": "conc_rising",
    "skills": [
      "gas_detect"
    ],
    "briefing": {
      "en": "This is practice. There is no score pressure. First you will MOVE your phone to look around. Then TAP the glowing object. Then choose an answer. Let's try!",
      "hi": "यह अभ्यास है। कोई दबाव नहीं है। पहले फ़ोन घुमाकर देखें। फिर चमकती वस्तु दबाएँ। फिर उत्तर चुनें। चलिए!",
      "sat": "ᱱᱚᱣᱟ ᱪᱮᱫᱚᱜ ᱠᱟᱱᱟ᱾ ᱯᱩᱭᱞᱩ ᱠᱮᱢᱮᱨᱟ ᱟᱹᱪᱩᱨ ᱠᱟᱛᱮ ᱧᱮᱞ ᱢᱮ᱾ ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱢᱟᱨᱥᱟᱞ ᱡᱤᱱᱤᱥ ᱴᱤᱯᱟᱹᱣ ᱢᱮ᱾"
    },
    "steps": [
      {
        "id": "p1",
        "prompt": {
          "en": "Find the BIG GREEN gas cylinder.",
          "hi": "बड़ा हरा गैस सिलेंडर खोजें।",
          "sat": "ᱢᱟᱨᱟᱝ ᱦᱟᱹᱨᱤᱭᱟᱹᱹ ᱥᱤᱲᱤᱱᱰᱟᱨ ᱥᱮᱸᱫᱽᱨᱟ᱾"
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
            "offset": 0,
            "far": false
          },
          {
            "key": "bucket",
            "name": {
              "en": "Water bucket",
              "hi": "पानी की बाल्टी",
              "sat": "ᱫᱟᱜ ᱵᱟᱹᱞᱴᱤ"
            },
            "correct": false,
            "offset": 120,
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
            "offset": 240,
            "far": false
          }
        ],
        "timerSeconds": 30,
        "question": {
          "en": "You found it! A gas cylinder can be dangerous. What should you do first?",
          "hi": "मिल गया! गैस सिलेंडर खतरनाक हो सकता है। सबसे पहले क्या करें?",
          "sat": "ᱧᱟᱢ ᱮᱱᱟ! ᱜᱮᱥ ᱥᱤᱲᱤᱱᱰᱟᱨ ᱵᱚᱛᱚᱨ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ᱾ ᱯᱩᱭᱞᱩ ᱪᱮᱫ ᱪᱤᱠᱟᱹᱭ ᱢᱮ?"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "Stay back and call the supervisor",
              "hi": "पीछे हटें और सुपरवाइजर को बुलाएँ",
              "sat": "ᱛᱤᱸᱜᱩᱱ ᱢᱮ ᱟᱨ ᱥᱩᱯᱚᱨᱵᱷᱟᱭᱡᱚᱨ ᱦᱚᱦᱚ ᱟᱭ ᱢᱮ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Touch it with your bare hands",
              "hi": "इसे खाली हाथों से छुएँ",
              "sat": "ᱛᱤ ᱛᱮ ᱥᱟᱵ ᱢᱮ"
            },
            "consequence": {
              "title": {
                "en": "TOO CLOSE",
                "hi": "बहुत पास",
                "sat": "ᱥᱩᱨ"
              },
              "explanation": {
                "en": "Never touch an unknown cylinder. Gas can harm you without any warning. Always stay back and call for help.",
                "hi": "अनजान सिलेंडर को कभी न छुएँ। गैस बिना चेतावनी नुकसान पहुँचा सकती है।",
                "sat": "ᱵᱟᱝ ᱵᱟᱰᱟᱭ ᱥᱤᱲᱤᱱᱰᱟᱨ ᱟᱞᱚᱢ ᱥᱟᱵᱟ᱾"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Light a match to see it better",
              "hi": "बेहतर देखने के लिए माचिस जलाएँ",
              "sat": "ᱥᱮᱸᱜᱮᱞ ᱡᱩᱞ ᱢᱮ"
            },
            "consequence": {
              "title": {
                "en": "FIRE RISK",
                "hi": "आग का खतरा",
                "sat": "ᱥᱮᱸᱜᱮᱞ"
              },
              "explanation": {
                "en": "A flame near gas can cause a fire. Never bring fire anywhere near gas.",
                "hi": "गैस के पास आग से आग लग सकती है।",
                "sat": "ᱜᱮᱥ ᱥᱩᱨ ᱥᱮᱸᱜᱮᱞ ᱟᱞᱚᱢ᱾"
              }
            }
          }
        ]
      }
    ]
  }
,
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
  },
  "mod3": {
    "id": "mod3",
    "titleKey": "mod3_title",
    "alarmTextKey": "alarm_mach",
    "skills": [
      "conveyor_ops",
      "loto",
      "machine_guard"
    ],
    "briefing": {
      "en": "You are on the crusher line. Belt 4 has jammed. The drive is stopped, but nobody has locked it out — in machinery a \"stopped\" machine can restart at any moment. Find the right tool and follow the safe procedure before you touch anything.",
      "hi": "आप क्रशर लाइन पर हैं। बेल्ट 4 जाम हो गई है। ड्राइव बंद है, लेकिन कोई लॉकआउट नहीं किया गया — और मशीनरी में \"बंद\" मशीन कभी भी फिर चालू हो सकती है। कुछ छूने से पहले सही उपकरण खोजें और सुरक्षित प्रक्रिया अपनाएँ।",
      "sat": "ᱠᱨᱥᱚᱨ ᱞᱟᱭᱤᱱ - ᱵᱮᱞᱴ ᱔ ᱡᱟᱢ᱾"
    },
    "steps": [
      {
        "id": "m1",
        "prompt": {
          "en": "Find the jammed conveyor drive motor.",
          "hi": "जाम ड्राइव मोटर खोजें।",
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
            "offset": 90,
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
            "offset": 320,
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
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 16,
        "question": {
          "en": "The belt is stopped but NOT locked out. What do you do first?",
          "hi": "बेल्ट बंद है पर लॉकआउट नहीं। पहले क्या करेंगे?",
          "sat": "ᱛᱷᱹᱭ?"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": false,
            "text": {
              "en": "Reach in quickly to clear the jam — the line is only stopped, not locked out",
              "hi": "जाम जल्दी निकालें — लाइन केवल रुकी है, लॉकआउट नहीं",
              "sat": "ᱵᱷᱤᱛᱨᱤ ᱫᱟᱲᱟᱭ"
            },
            "consequence": {
              "title": {
                "en": "MACHINE RESTART HAZARD",
                "hi": "मशीन पुनः-चालू जोखिम",
                "sat": "ᱨᱤ-ᱥᱴᱟᱨᱴ"
              },
              "explanation": {
                "en": "A stopped machine can restart at any moment (start-up surge, mis-set control). Reaching in while it can re-energise is how limbs get crushed.",
                "hi": "रुकी मशीन कभी भी फिर चालू हो सकती है। जब तक ऊर्जा स्रोत बंद न हो, अंदर जाना खतरनाक है।",
                "sat": "ᱢᱚᱴᱚᱨ ᱨᱩ-ᱥᱴᱟᱨᱴ"
              }
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Ask a coworker to hold the switch off manually while you clear it",
              "hi": "साथी से स्विच अकेला पकड़ने को कहें",
              "sat": "ᱥᱩᱭᱤᱪ ᱦᱩᱞᱫ"
            },
            "consequence": {
              "title": {
                "en": "INFORMAL LOCKOUT",
                "hi": "अनौपचारिक लॉकआउट",
                "sat": "ᱞᱳᱠ"
              },
              "explanation": {
                "en": "A manual hold is not a lockout. One slip or a miscommunication re-energises the machine while your hand is inside the nip point.",
                "hi": "मैनुअल होल्ड लॉकआउट नहीं है। एक चूक से मशीन फिर चालू हो सकती है।",
                "sat": "ᱢᱟᱱᱩᱭᱮᱞ ᱦᱩᱞᱫ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": true,
            "text": {
              "en": "Physically lock out and tag the energy source, then verify zero energy, before any contact",
              "hi": "ऊर्जा स्रोत को भौतिक रूप से लॉक व टैग करें, फिर संपर्क से पहले शून्य ऊर्जा सत्यापित करें",
              "sat": "ᱞᱳᱠ+ᱴᱮᱜᱚ"
            }
          }
        ]
      },
      {
        "id": "m2",
        "prompt": {
          "en": "Find the main isolation switch.",
          "hi": "मुख्य आइसोलेशन स्विच खोजें।",
          "sat": "ᱥᱩᱭᱤᱪ"
        },
        "objects": [
          {
            "key": "switch",
            "name": {
              "en": "Isolation switch",
              "hi": "आइसोलेशन स्विच",
              "sat": "ᱥᱩᱭᱤᱪ"
            },
            "correct": true,
            "offset": 95,
            "far": true
          },
          {
            "key": "valve",
            "name": {
              "en": "Gas valve",
              "hi": "गैस वाल्व",
              "sat": "ᱜᱮᱥ ᱵᱷᱟᱞᱵᱽ"
            },
            "correct": false,
            "offset": 300,
            "far": false
          },
          {
            "key": "door",
            "name": {
              "en": "Ventilation door",
              "hi": "वेंटिलेशन दरवाज़ा",
              "sat": "ᱦᱚᱭ ᱫᱩᱣᱟᱹᱨ"
            },
            "correct": false,
            "offset": 180,
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
            "offset": 240,
            "far": false
          }
        ],
        "timerSeconds": 15,
        "question": {
          "en": "You have isolated the drive. What is the correct order now?",
          "hi": "ड्राइव अलग कर ली। अब सही क्रम क्या है?",
          "sat": "ᱥᱩᱭᱤᱪ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "Lock the isolator with your personal lock, apply a tag, then verify zero energy",
              "hi": "अपने लॉक से आइसोलेटर बंद करें, टैग लगाएं, फिर शून्य ऊर्जा सत्यापित करें",
              "sat": "ᱞᱳᱠ+ᱴᱮᱜᱚ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Tag it but leave it unlocked — quicker to get back to work",
              "hi": "बस टैग करें, बंद न करें — जल्दी काम",
              "sat": "ᱴᱮᱜᱚ"
            },
            "consequence": {
              "title": {
                "en": "TAG WITHOUT LOCK",
                "hi": "लॉक के बिना टैग",
                "sat": "ᱴᱮᱜᱚ"
              },
              "explanation": {
                "en": "A tag is a warning, not a device. Without a personal lock the isolator can be operated by anyone, defeating the isolation.",
                "hi": "टैग चेतावनी है, साधन नहीं। व्यक्तिगत लॉक के बिना कोई भी स्विच चला सकता है।",
                "sat": "ᱴᱮᱜᱚ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Keep the switch off and ask a mate to stand guard and resist flipping it",
              "hi": "स्विच बंद रखें और साथी को पहरा देने को कहें",
              "sat": "ᱯᱷᱚᱨ ᱢᱮ"
            },
            "consequence": {
              "title": {
                "en": "PEOPLE ARE NOT A LOCK",
                "hi": "लोग लॉक नहीं हैं",
                "sat": "ᱞᱳᱠ"
              },
              "explanation": {
                "en": "Guarding is not a control. A reliable lockout uses physical locks so the energy source cannot be re-energised even by accident.",
                "hi": "पहरा नियंत्रण नहीं है। भौतिक लॉक ही सुरक्षित है।",
                "sat": "ᱞᱳᱠ"
              }
            }
          }
        ]
      },
      {
        "id": "m3",
        "prompt": {
          "en": "Find the machine guard on the conveyor head.",
          "hi": "कन्वेयर हेड पर मशीन गार्ड खोजें।",
          "sat": "ᱜᱟᱨᱰ"
        },
        "objects": [
          {
            "key": "guard",
            "name": {
              "en": "Machine guard",
              "hi": "मशीन गार्ड",
              "sat": "ᱜᱟᱨᱰ"
            },
            "correct": true,
            "offset": 300,
            "far": true
          },
          {
            "key": "hands",
            "name": {
              "en": "Bare hands",
              "hi": "खाली हाथ",
              "sat": "ᱦᱟᱛᱤ"
            },
            "correct": false,
            "offset": 90,
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
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 16,
        "question": {
          "en": "Before running the line again, what about the guard?",
          "hi": "लाइन फिर चलाने से पहले गार्ड का क्या?",
          "sat": "ᱜᱟᱨᱰ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "Re-fit and secure the guard, then start — guards protect from moving parts",
              "hi": "गार्ड लगाकर सुरक्षित करें, फिर चलाएं",
              "sat": "ᱜᱟᱨᱰ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Run it without the guard so you can see the belt",
              "hi": "गार्ड हटाकर चलाएं ताकि बेल्ट दिखे",
              "sat": "ᱜᱟᱨᱰ"
            },
            "consequence": {
              "title": {
                "en": "EXPOSED NIP HAZARD",
                "hi": "खुला निप जोखिम",
                "sat": "ᱱᱤᱯ"
              },
              "explanation": {
                "en": "Running without the guard exposes the nip point where a belt meets a pulley — a classic crushing point.",
                "hi": "बिना गार्ड चलाने से बेल्ट-पुली जोड़ खुला रहता है, कुचलने का खतरा।",
                "sat": "ᱱᱤᱯ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Guard only the top; the bottom is low and no one touches it",
              "hi": "केवल ऊपर गार्ड; नीचे कोई नहीं छूता",
              "sat": "ᱴᱚ"
            },
            "consequence": {
              "title": {
                "en": "PARTIAL GUARDING",
                "hi": "आंशिक गार्ड",
                "sat": "ᱜᱟᱨᱰ"
              },
              "explanation": {
                "en": "Guards must cover the reachable hazard. A partial guard still leaves the crush point exposed.",
                "hi": "गार्ड पूरे खतरे को ढके। आंशिक गार्ड से कुचलने का बिंदु खुला रहता है।",
                "sat": "ᱜᱟᱨᱰ"
              }
            }
          }
        ]
      }
    ]
  },
  "mod4": {
    "id": "mod4",
    "titleKey": "mod4_title",
    "alarmTextKey": "alarm_elec",
    "skills": [
      "electrical_fire",
      "arc_flash",
      "hv_loto"
    ],
    "briefing": {
      "en": "After overnight rain, water has pooled beside the switchgear board and a cable is wet. Electricity is invisible — treat every panel as live until proven dead. Find and handle the right items.",
      "hi": "रात भर बारिश के बाद स्विचगियर बोर्ड के पास पानी जमा है और तार गीला है। बिजली अदृश्य है — हर पैनल को तब तक सक्रिय मानें जब तक निर्जीव सिद्ध न हो। सही वस्तुएँ खोजें।",
      "sat": "ᱡᱟᱹᱲᱤ ᱛᱟᱭᱚᱢ ᱯᱮᱱᱮᱞ ᱥᱩᱨ ᱫᱟᱜ᱾"
    },
    "steps": [
      {
        "id": "e1",
        "prompt": {
          "en": "Find the switchgear panel.",
          "hi": "स्विचगियर पैनल खोजें।",
          "sat": "ᱯᱮᱱᱮᱞ"
        },
        "objects": [
          {
            "key": "panel",
            "name": {
              "en": "Switchgear panel",
              "hi": "स्विचगियर पैनल",
              "sat": "ᱯᱮᱱᱮᱞ"
            },
            "correct": true,
            "offset": 210,
            "far": true
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
            "key": "towel_damp",
            "name": {
              "en": "Damp towel",
              "hi": "गीला तौलिया",
              "sat": "ᱫᱟᱜ ᱛᱩᱣᱟᱞ"
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
        "timerSeconds": 16,
        "question": {
          "en": "Water is pooled near the panel and it looks intact. What do you do?",
          "hi": "पैनल के पास पानी है और यह सही दिखता है। क्या करेंगे?",
          "sat": "ᱫᱟᱜ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": false,
            "text": {
              "en": "Continue routine operation — the panel looks intact",
              "hi": "नियमित कार्य जारी रखें — पैनल सही दिखता है",
              "sat": "ᱯᱮᱱᱮᱞ"
            },
            "consequence": {
              "title": {
                "en": "NORMALCY BIAS",
                "hi": "सामान्यता पूर्वाग्रह",
                "sat": "ᱥᱟᱢᱱ"
              },
              "explanation": {
                "en": "An intact-looking panel is not proof of safety. Moisture can create a live leakage path even with the cover closed and dry on the outside.",
                "hi": "सही दिखने वाला पैनल सुरक्षा प्रमाण नहीं है। नमी से जीवित रिसाव पथ बन सकता है।",
                "sat": "ᱫᱟᱜ"
              }
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Use a dry wooden plank to reach the switch \"safely\"",
              "hi": "सूखी लकड़ी से स्विच \"सुरक्षित\" तक पहुँचें",
              "sat": "ᱞᱠᱨ"
            },
            "consequence": {
              "title": {
                "en": "INSULATION WORKAROUND",
                "hi": "इन्सुलेशन समाधान",
                "sat": "ᱞᱠᱨ"
              },
              "explanation": {
                "en": "A plank does not remove the hazard path from the wet floor to your body, and it fails completely if the equipment is energised at higher voltage.",
                "hi": "लकड़ी से गीले फर्श से आपके शरीर तक का खतरा पथ नहीं हटता।",
                "sat": "ᱞᱠᱨ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": true,
            "text": {
              "en": "De-energise and report, then verify dead before any contact",
              "hi": "निर्जीव करें और रिपोर्ट करें, फिर संपर्क से पहले मृत सत्यापित करें",
              "sat": "ᱰᱤ-ᱮᱱᱨᱡ"
            }
          }
        ]
      },
      {
        "id": "e2",
        "prompt": {
          "en": "Find the main breaker to de-energise.",
          "hi": "मुख्य ब्रेकर खोजें।",
          "sat": "ᱵᱨᱤᱠᱨ"
        },
        "objects": [
          {
            "key": "switch",
            "name": {
              "en": "Isolation switch",
              "hi": "आइसोलेशन स्विच",
              "sat": "ᱥᱩᱭᱤᱪ"
            },
            "correct": true,
            "offset": 95,
            "far": true
          },
          {
            "key": "valve",
            "name": {
              "en": "Gas valve",
              "hi": "गैस वाल्व",
              "sat": "ᱜᱮᱥ ᱵᱷᱟᱞᱵᱽ"
            },
            "correct": false,
            "offset": 300,
            "far": false
          },
          {
            "key": "door",
            "name": {
              "en": "Ventilation door",
              "hi": "वेंटिलेशन दरवाज़ा",
              "sat": "ᱦᱚᱭ ᱫᱩᱣᱟᱹᱨ"
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
            "offset": 240,
            "far": false
          }
        ],
        "timerSeconds": 15,
        "question": {
          "en": "You need to make the panel dead. What is the correct approach?",
          "hi": "पैनल मृत करना है। सही तरीका?",
          "sat": "ᱵᱨᱤᱠᱨ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "Open the breaker, lock it out, and verify with a tester that there is no voltage",
              "hi": "ब्रेकर खोलें, लॉक करें और परीक्षक से शून्य वोल्टता सत्यापित करें",
              "sat": "ᱞᱳᱠ+ᱴᱮᱥᱴ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Open the breaker and trust that it is dead",
              "hi": "ब्रेकर खोलें और भरोसा करें कि मृत है",
              "sat": "ᱴᱨᱟᱥᱴ"
            },
            "consequence": {
              "title": {
                "en": "ASSUMED DEAD",
                "hi": "मृत समझा",
                "sat": "ᱢᱩᱴ"
              },
              "explanation": {
                "en": "A breaker can be faulty, back-fed, or the circuit re-energised. \"Assume dead\" is the most common cause of electrical fatality — always test.",
                "hi": "ब्रेकर खराब हो सकता है। \"मृत समझना\" सबसे आम बिजली दुर्घटना कारण है — हमेशा परीक्षण करें।",
                "sat": "ᱴᱮᱥᱴ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Leave it live and work around it carefully",
              "hi": "सक्रिय छोड़ें और सावधानी से काम करें",
              "sat": "ᱞᱚᱠ"
            },
            "consequence": {
              "title": {
                "en": "LIVE-WORK HAZARD",
                "hi": "सक्रिय कार्य जोखिम",
                "sat": "ᱞᱟᱭive"
              },
              "explanation": {
                "en": "Working around a live panel near water is exactly the arc-flash and shock scenario that kills.",
                "hi": "गीले स्थान पर सक्रिय पैनल के पास काम आर्क-फ्लैश और झटके का कारण है।",
                "sat": "ᱥᱚᱠ"
              }
            }
          }
        ]
      },
      {
        "id": "e3",
        "prompt": {
          "en": "Find the arc-flash warning sign.",
          "hi": "आर्क-फ्लैश चेतावनी संकेत खोजें।",
          "sat": "ᱥᱟᱭᱱ"
        },
        "objects": [
          {
            "key": "sign",
            "name": {
              "en": "Warning sign",
              "hi": "चेतावनी संकेत",
              "sat": "ᱥᱟᱭᱱ"
            },
            "correct": true,
            "offset": 300,
            "far": true
          },
          {
            "key": "towel_dry",
            "name": {
              "en": "Dry towel",
              "hi": "सूखा तौलिया",
              "sat": "ᱡᱚᱜ ᱛᱩᱣᱟᱞ"
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
            "offset": 200,
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
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 16,
        "question": {
          "en": "What does the arc-flash boundary mean to you?",
          "hi": "आर्क-फ्लैश सीमा का आपके लिए क्या मतलब?",
          "sat": "ᱥᱟᱭᱱ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "Stay outside the boundary unless the panel is de-energised or you are properly rated",
              "hi": "बिना निर्जीव किए या रेटेड उपकरण के बिना सीमा से बाहर रहें",
              "sat": "ᱵᱷᱷᱥ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "It is just a sticker — work as usual",
              "hi": "केवल स्टिकर है — हमेशा की तरह काम करें",
              "sat": "ᱥᱴᱠ"
            },
            "consequence": {
              "title": {
                "en": "IGNORED WARNING",
                "hi": "चेतावनी की अनदेखी",
                "sat": "ᱥᱴᱠ"
              },
              "explanation": {
                "en": "Arc flash can melt clothing and cause fatal burns instantly. The boundary is set from real incident data, not decoration.",
                "hi": "आर्क फ्लैश पलक झपकते घातक जला सकता है। सीमा वास्तविक दुर्घटना आंकड़ों से है।",
                "sat": "ᱥᱴᱠ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Move one step closer to look around the corner",
              "hi": "कोने देखने एक कदम और पास जाएँ",
              "sat": "ᱰᱩ"
            },
            "consequence": {
              "title": {
                "en": "CLOSE-APPROACH",
                "hi": "निकट सम्पर्क",
                "sat": "ᱪᱩ"
              },
              "explanation": {
                "en": "There is no \"a step closer is fine\" — the boundary is a hard line for unqualified exposure.",
                "hi": "\"एक कदम और ठीक\" जैसा नहीं है — सीमा कठोर रेखा है।",
                "sat": "ᱪᱩ"
              }
            }
          }
        ]
      }
    ]
  },
  "mod5": {
    "id": "mod5",
    "titleKey": "mod5_title",
    "alarmTextKey": "alarm_trans",
    "skills": [
      "dumper",
      "blind_spot",
      "pedestrian"
    ],
    "briefing": {
      "en": "You need to cross the haul road to reach the workshop. A loaded dumper is approaching. Vehicles on site have large blind spots, and vehicle movement is a leading cause of mining fatalities. Decide how to cross safely.",
      "hi": "आपको कार्यशाला तक हॉल रोड पार करनी है। एक लदा डंपर आ रहा है। साइट के वाहनों में बड़े ब्लाइंड स्पॉट होते हैं। सुरक्षित पार करने का निर्णय करें।",
      "sat": "ᱦᱟᱞ ᱨᱳᱰ ᱯᱟᱨ᱾"
    },
    "steps": [
      {
        "id": "t1",
        "prompt": {
          "en": "Find the approaching dumper.",
          "hi": "आ रहे डंपर को खोजें।",
          "sat": "ᱰᱟᱢᱯᱨ"
        },
        "objects": [
          {
            "key": "truck",
            "name": {
              "en": "Haul truck",
              "hi": "डंपर",
              "sat": "ᱰᱟᱢᱯᱨ"
            },
            "correct": true,
            "offset": 210,
            "far": true
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
            "key": "hands",
            "name": {
              "en": "Bare hands",
              "hi": "खाली हाथ",
              "sat": "ᱦᱟᱛᱤ"
            },
            "correct": false,
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 16,
        "question": {
          "en": "A loaded dumper is approaching. What do you do before crossing?",
          "hi": "लदा डंपर आ रहा है। पार करने से पहले क्या करेंगे?",
          "sat": "ᱰᱟᱢᱯᱨ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": false,
            "text": {
              "en": "The driver has surely seen me — cross quickly",
              "hi": "ड्राइवर ने देखा ही होगा — जल्दी पार करें",
              "sat": "ᱯᱟᱨ"
            },
            "consequence": {
              "title": {
                "en": "BLIND SPOT ASSUMPTION",
                "hi": "ब्लाइंड स्पॉट धारणा",
                "sat": "ᱵᱞᱭ"
              },
              "explanation": {
                "en": "Large vehicles have massive blind spots. If the driver cannot see you, \"surely seen me\" is a fatal gamble.",
                "hi": "बड़े वाहनों में बड़े ब्लाइंड स्पॉट होते हैं। \"जरूर देखा होगा\" घातक जुआ है।",
                "sat": "ᱵᱞᱭ"
              }
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Run across to beat the truck",
              "hi": "डंपर को हराकर भागकर पार करें",
              "sat": "ᱫᱟᱲᱟᱭ"
            },
            "consequence": {
              "title": {
                "en": "RACE THE VEHICLE",
                "hi": "वाहन से दौड़",
                "sat": "ᱫᱟᱲᱟᱭ"
              },
              "explanation": {
                "en": "Running increases your time in the danger zone and removes your ability to react. It is worse, not faster and safer.",
                "hi": "दौड़ने से खतरा क्षेत्र में समय बढ़ता है और प्रतिक्रिया घटती है।",
                "sat": "ᱫᱟᱲᱟᱭ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": true,
            "text": {
              "en": "Stop, make eye contact / signal the driver, and wait for clear acknowledgment",
              "hi": "रुकें, ड्राइवर से आँख मिलाएँ / संकेत दें और स्पष्ट स्वीकृति की प्रतीक्षा करें",
              "sat": "ᱥᱤᱜᱱᱟᱞ"
            }
          }
        ]
      },
      {
        "id": "t2",
        "prompt": {
          "en": "Find the high-visibility vest.",
          "hi": "हाई-विज़ बनियान खोजें।",
          "sat": "ᱵᱮᱥᱴ"
        },
        "objects": [
          {
            "key": "vest",
            "name": {
              "en": "High-vis vest",
              "hi": "हाई-विज़ बनियान",
              "sat": "ᱵᱮᱥᱴ"
            },
            "correct": true,
            "offset": 95,
            "far": true
          },
          {
            "key": "towel_damp",
            "name": {
              "en": "Damp towel",
              "hi": "गीला तौलिया",
              "sat": "ᱫᱟᱜ ᱛᱩᱣᱟᱞ"
            },
            "correct": false,
            "offset": 300,
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
            "key": "torch",
            "name": {
              "en": "Electric torch",
              "hi": "बिजली की टॉर्च",
              "sat": "ᱴᱚᱨᱪ"
            },
            "correct": false,
            "offset": 240,
            "far": false
          }
        ],
        "timerSeconds": 15,
        "question": {
          "en": "Why wear high-visibility at a haul road?",
          "hi": "हॉल रोड पर हाई-विज़ क्यों?",
          "sat": "ᱵᱮᱥᱴ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "So operators can spot you in mirrors and blind spots from a distance",
              "hi": "ताकि ऑपरेटर आपको दूर से दर्पण और ब्लाइंड स्पॉट में देख सकें",
              "sat": "ᱵᱮᱥᱴ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "It keeps you warm at night",
              "hi": "रात में गर्म रहता है",
              "sat": "ᱜᱨᱢ"
            },
            "consequence": {
              "title": {
                "en": "WRONG PURPOSE",
                "hi": "गलत उद्देश्य",
                "sat": "ᱵᱷᱩ"
              },
              "explanation": {
                "en": "High-visibility is for being seen, not warmth. Wearing it does nothing for you if you forget the crossing procedure.",
                "hi": "हाई-विज़ दिखने के लिए है, गर्माहट के लिए नहीं।",
                "sat": "ᱵᱮᱥᱴ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "It is a uniform rule that has no safety value",
              "hi": "केवल वर्दी नियम है, कोई सुरक्षा मूल्य नहीं",
              "sat": "ᱱᱤᱭᱚᱢ"
            },
            "consequence": {
              "title": {
                "en": "SAFETY IGNORED",
                "hi": "सुरक्षा की अनदेखी",
                "sat": "ᱥᱮ"
              },
              "explanation": {
                "en": "It is precisely the real value — being seen — that prevents vehicle-pedestrian incidents.",
                "hi": "दिखना ही वास्तविक मूल्य है जो वाहन-पैदल दुर्घटना रोकता है।",
                "sat": "ᱥᱮ"
              }
            }
          }
        ]
      },
      {
        "id": "t3",
        "prompt": {
          "en": "Find the designated crossing point.",
          "hi": "निर्धारित क्रॉसिंग बिंदु खोजें।",
          "sat": "ᱠᱨᱥ"
        },
        "objects": [
          {
            "key": "sign",
            "name": {
              "en": "Warning sign",
              "hi": "चेतावनी संकेत",
              "sat": "ᱥᱟᱭᱱ"
            },
            "correct": true,
            "offset": 300,
            "far": true
          },
          {
            "key": "door",
            "name": {
              "en": "Ventilation door",
              "hi": "वेंटिलेशन दरवाज़ा",
              "sat": "ᱦᱚᱭ ᱫᱩᱣᱟᱹᱨ"
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
            "offset": 200,
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
            "offset": 150,
            "far": false
          }
        ],
        "timerSeconds": 16,
        "question": {
          "en": "Where should you cross the haul road?",
          "hi": "हॉल रोड कहाँ पार करनी चाहिए?",
          "sat": "ᱠᱨᱥ"
        },
        "choices": [
          {
            "id": "A",
            "letter": "A",
            "correct": true,
            "text": {
              "en": "At the marked crossing point, when the road is clear and the driver has acknowledged you",
              "hi": "चिन्हित क्रॉसिंग बिंदु पर, जब रोड साफ हो और ड्राइवर ने स्वीकार किया हो",
              "sat": "ᱠᱨᱥ"
            }
          },
          {
            "id": "B",
            "letter": "B",
            "correct": false,
            "text": {
              "en": "Anywhere — at the shortest distance to my work",
              "hi": "कहीं भी — काम के सबसे निकट",
              "sat": "ᱠᱨᱥ"
            },
            "consequence": {
              "title": {
                "en": "UNCONTROLLED CROSSING",
                "hi": "अनियंत्रित क्रॉसिंग",
                "sat": "ᱠᱨᱥ"
              },
              "explanation": {
                "en": "Crossing outside the marked point puts you in an unexpected location with unpredictable vehicle flow.",
                "hi": "चिन्हित बिंदु से बाहर पार करना अप्रत्याशित स्थिति पैदा करता है।",
                "sat": "ᱠᱨᱥ"
              }
            }
          },
          {
            "id": "C",
            "letter": "C",
            "correct": false,
            "text": {
              "en": "Right behind the loaded truck — it has just passed",
              "hi": "लदे डंपर के ठीक पीछे — अभी निकला है",
              "sat": "ᱴᱨᱠ"
            },
            "consequence": {
              "title": {
                "en": "TRAILING BLIND SPOT",
                "hi": "पीछे का ब्लाइंड स्पॉट",
                "sat": "ᱴᱨᱠ"
              },
              "explanation": {
                "en": "The space directly behind a haul truck is a blind spot the driver is actively reversing away from — the worst place to enter.",
                "hi": "हॉल ट्रक के ठीक पीछे ब्लाइंड स्पॉट है — सबसे खतरनाक स्थान।",
                "sat": "ᱴᱨᱠ"
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

  "mod0.0": {
    "en": "Look for the tall green bottle with the red top.",
    "hi": "लाल ऊपर वाले लंबे हरे सिलेंडर को देखें।",
    "sat": "ᱩᱥᱩᱞ ᱦᱟᱹᱨᱤᱭᱟᱹᱹ ᱥᱤᱲᱤᱱᱰᱟᱨ ᱧᱮᱞ ᱢᱮ᱾"
  }
,
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



