// SafetyLens AR - Multilingual Internationalization (i18n) Engine
// Supports English (en), Hindi (hi), and Santali (sat)

const I18N_DATA = {
  en: {
    app_title: "SafetyLens AR",
    subtitle: "Mining & Industrial AR Safety System",
    stat_num: "48",
    stat_caption: "workers died in Jharkhand mines in 2022–23 alone.",
    tap_to_continue: "TAP TO CONTINUE",
    
    // Module Selection
    select_module: "Select Training Module",
    mod1_title: "Module 1: Gas Leak & Confined Space",
    mod1_desc: "Hazardous gas detection, explosive limits & entry protocols",
    mod2_title: "Module 2: Fire & Explosion Response",
    mod2_desc: "Belt conveyor friction smoke, extinguisher selection & ventilation locks",
    chain_title: "Module 3: Multi-Object Search Chain",
    chain_desc: "Find the correct item among several, answer what to do, then walk to the next",
    chain: "CHAIN",
    select_worker: "SELECTED WORKER",
    completed: "completed",
    begin_btn: "Begin Training",
    briefing_label: "SCENARIO BRIEFING",
    mistakes: "mistakes",
    no_results: "No training yet",
    now_what: "now decide what to do",
    found: "Found",
    worker_list_title: "WORKERS",
    selected_worker_title: "SELECTED WORKER",
    module_results_title: "MODULE RESULTS",
    workers: "Workers",
    runs: "Runs",
    avg_ready: "Avg readiness",
    at_risk: "At risk",
    
    // AR HUD View
    gas_conc: "GAS CONCENTRATION",
    conc_rising: "RISING DANGEROUSLY",
    smoke_conc: "SMOKE / CO LEVEL",
    temp_rising: "HIGH / RISING",
    alarm_gas: "GAS LEAK DETECTED",
    alarm_fire: "CONVEYOR FIRE DETECTED",
    ar_hint_scan: "Pan camera to locate the hazard source",
    ar_hint_locked: "Hazard found — select a response below",
    found_prefix: "OBJECT FOUND:",
    step: "STEP",
    
    // Consequence
    consequence_title: "CONSEQUENCE: IGNITION / HAZARD",
    retry_btn: "Return to decision point",
    
    // Certificate
    cert_title: "Protocol Followed Correctly",
    cert_sub: "Generate a signed completion certificate for this worker.",
    worker_name_label: "WORKER NAME",
    worker_name_placeholder: "Enter worker full name",
    cert_verified: "VERIFIED",
    cert_worker: "Worker Name",
    cert_module: "Module Completed",
    cert_date: "Date Issued",
    cert_path: "Decision Path",
    cert_score: "Readiness Score",
    cert_time: "Response",
    cert_signature: "Cryptographic Payload Signature",
    path_perfect: "Correct on first attempt, standard protocol",
    scan_qr_btn: "Open QR Scanner & Verifier",

    // Skill tags
    skill_gas_detect: "Gas detection",
    skill_explosive_limits: "Explosive limits",
    skill_scba_use: "SCBA use",
    skill_confined_entry: "Confined-space entry",
    skill_electrical_fire: "Electrical fire",
    skill_extinguisher_class: "Extinguisher class",
    skill_vent_control: "Ventilation control",
    skill_conveyor_ops: "Conveyor emergencies",
    
    // QR Verifier
    verifier_title: "Certificate QR Verifier",
    verifier_desc: "Point camera at certificate QR code to recompute signature hash.",
    verifier_scanning: "Scanning QR Code via Camera...",
    verifier_valid: "VALID CERTIFICATE — AUTHENTICATED",
    verifier_invalid: "INVALID OR TAMPERED CERTIFICATE",
    back_to_app: "Back to Training App",
    
    // Dashboard
    dash_title: "Readiness Dashboard",
    dash_sub: "Mine Safety Officer Operations",
    time_sim: "Time Simulation",
    days_passed: "days passed",
    sim_90_btn: "Simulate +90 Days Decay",
    reset_sim_btn: "Reset Simulation",
    decay_chart_title: "READINESS DECAY CURVE — SELECTED WORKER",
    skill_panel_title: "SKILL-LEVEL READINESS — SELECTED WORKER",
    refresher_list_title: "REFRESHER-DUE WORKER ROSTER",
    last_trained: "last trained",
    days_ago: "days ago",
    status_good: "Active",
    status_due: "Refresher Due",
    status_critical: "Critical Risk"
  },
  
  hi: {
    app_title: "सेफ़्टीलेंस AR",
    subtitle: "खनन एवं औद्योगिक AR सुरक्षा प्रणाली",
    stat_num: "48",
    stat_caption: "अकेले 2022-23 में झारखंड की खानों में 48 श्रमिकों की मृत्यु हुई।",
    tap_to_continue: "आगे बढ़ने के लिए टैप करें",
    
    // Module Selection
    select_module: "प्रशिक्षण मॉड्यूल चुनें",
    mod1_title: "मॉड्यूल 1: गैस रिसाव एवं सीमित स्थान",
    mod1_desc: "खतरनाक गैस पहचान, विस्फोटक सीमाएं और प्रवेश प्रोटोकॉल",
    mod2_title: "मॉड्यूल 2: आग और विस्फोट प्रतिक्रिया",
    mod2_desc: "बेल्ट कन्वेयर धुआं, अग्निशामक चयन और वेंटिलेशन लॉक",
    chain_title: "मॉड्यूल 3: मल्टी-ऑब्जेक्ट सर्च चेन",
    chain_desc: "कई वस्तुओं में सही वस्तु खोजें, बताएं क्या करना है, फिर अगली तक चलें",
    chain: "श्रृंखला",
    select_worker: "चयनित श्रमिक",
    completed: "पूर्ण",
    begin_btn: "प्रशिक्षण शुरू करें",
    briefing_label: "परिदृश्य ब्रीफिंग",
    mistakes: "गलतियाँ",
    no_results: "अभी कोई प्रशिक्षण नहीं",
    now_what: "अब तय करें क्या करना है",
    found: "मिला",
    worker_list_title: "श्रमिक",
    selected_worker_title: "चयनित श्रमिक",
    module_results_title: "मॉड्यूल परिणाम",
    workers: "श्रमिक",
    runs: "रन",
    avg_ready: "औसत तत्परता",
    at_risk: "जोखिम में",
    
    // AR HUD View
    gas_conc: "गैस सांद्रता",
    conc_rising: "खतरनाक रूप से बढ़ रही है",
    smoke_conc: "धुआं / CO का स्तर",
    temp_rising: "उच्च / बढ़ रहा है",
    alarm_gas: "गैस रिसाव का पता चला",
    alarm_fire: "कन्वेयर बेल्ट आग का पता चला",
    ar_hint: "खतरे का स्रोत खोजने के लिए कैमरा घुमाएं",
    ar_hint_scan: "खतरे का स्रोत खोजने के लिए कैमरा घुमाएं",
    ar_hint_locked: "खतरा मिला — नीचे प्रतिक्रिया चुनें",
    found_prefix: "वस्तु मिली:",
    step: "चरण",
    
    // Consequence
    consequence_title: "परिणाम: प्रज्वलन / खतरा",
    retry_btn: "निर्णय बिंदु पर वापस लौटें",
    
    // Certificate
    cert_title: "प्रोटोकॉल का सही पालन किया गया",
    cert_sub: "इस श्रमिक के लिए हस्ताक्षरित समापन प्रमाण पत्र उत्पन्न करें।",
    worker_name_label: "श्रमिक का नाम",
    worker_name_placeholder: "श्रमिक का पूरा नाम दर्ज करें",
    cert_verified: "सत्यापित (VERIFIED)",
    cert_worker: "श्रमिक का नाम",
    cert_module: "पूरा किया गया मॉड्यूल",
    cert_date: "जारी करने की तिथि",
    cert_path: "निर्णय पथ",
    cert_score: "तत्परता स्कोर",
    cert_time: "प्रतिक्रिया",
    cert_signature: "क्रिप्टोग्राफिक पेलोड हस्ताक्षर",
    path_perfect: "प्रथम प्रयास में सही, मानक प्रोटोकॉल",
    scan_qr_btn: "QR स्कैन और सत्यापन खोलें",

    // Skill tags
    skill_gas_detect: "गैस पहचान",
    skill_explosive_limits: "विस्फोटक सीमाएं",
    skill_scba_use: "SCBA उपयोग",
    skill_confined_entry: "सीमित-स्थान प्रवेश",
    skill_electrical_fire: "बिजली की आग",
    skill_extinguisher_class: "अग्निशामक वर्ग",
    skill_vent_control: "वेंटिलेशन नियंत्रण",
    skill_conveyor_ops: "कन्वेयर आपातकाल",
    
    // QR Verifier
    verifier_title: "प्रमाणपत्र QR सत्यापक",
    verifier_desc: "हस्ताक्षर हैश को पुनर्गणित करने के लिए कैमरा QR कोड पर केंद्रित करें।",
    verifier_scanning: "कैमरे के माध्यम से QR कोड स्कैन किया जा रहा है...",
    verifier_valid: "वैध प्रमाणपत्र — प्रामाणिक",
    verifier_invalid: "अवैध या छेड़छाड़ किया गया प्रमाणपत्र",
    back_to_app: "प्रशिक्षण ऐप पर वापस जाएं",
    
    // Dashboard
    dash_title: "तत्परता डैशबोर्ड",
    dash_sub: "खान सुरक्षा अधिकारी संचालन",
    time_sim: "समय सिमुलेशन",
    days_passed: "दिन बीत चुके हैं",
    sim_90_btn: "+90 दिन क्षय का सिमुलेशन करें",
    reset_sim_btn: "सिमुलेशन रीसेट करें",
    decay_chart_title: "तत्परता क्षय वक्र — चयनित श्रमिक",
    skill_panel_title: "कौशल-स्तरीय तत्परता — चयनित श्रमिक",
    refresher_list_title: "पुनश्चर्या-देय श्रमिक सूची",
    last_trained: "अंतिम प्रशिक्षण",
    days_ago: "दिन पहले",
    status_good: "सक्रिय",
    status_due: "पुनश्चर्या देय",
    status_critical: "गंभीर जोखिम"
  },
  
  sat: {
    app_title: "ᱥᱮᱯᱷᱴᱤᱞᱮᱱᱥ AR",
    subtitle: "ᱠᱷᱟᱫᱟᱱ ᱟᱨ ᱠᱟᱹᱨᱜᱟᱹᱲ AR ᱨᱩᱠᱷᱤᱭᱟᱹ ᱵᱭᱚᱵᱚᱥᱛᱷᱟ",
    stat_num: "48",
    stat_caption: "᱒᱐᱒᱒-᱒᱓ ᱨᱮ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱠᱷᱟᱫᱟᱱ ᱨᱮ ᱔᱘ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱠᱚ ᱜᱚᱡ ᱮᱱᱟ᱾",
    tap_to_continue: "ᱞᱟᱦᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱴᱤᱯᱟᱹᱣ ᱢᱮ",
    
    // Module Selection
    select_module: "ᱴᱨᱮᱱᱤᱝ ᱢᱚᱰᱭᱩᱞ ᱪᱚᱭᱚᱱ ᱢᱮ",
    mod1_title: "ᱢᱚᱰᱭᱩᱞ ᱑: ᱜᱮᱥ ᱞᱤᱠ ᱟᱨ ᱥᱚᱝᱠᱚᱨ ᱴᱷᱟᱶ",
    mod1_desc: "ᱵᱚᱛᱚᱨᱟᱱ ᱜᱮᱥ ᱧᱟᱢ, ᱵᱚᱢ ᱵᱤᱥᱯᱷᱚᱴ ᱥᱤᱢᱟᱹ ᱟᱨ ᱵᱚᱞᱚᱱ ᱱᱤᱭᱚᱢ",
    mod2_title: "ᱢᱚᱰᱭᱩᱞ ᱒: ᱥᱮᱸᱜᱮᱞ ᱟᱨ ᱵᱤᱥᱯᱷᱚᱴ ᱨᱩᱣᱟᱹᱲ",
    mod2_desc: "ᱵᱮᱞᱴ ᱠᱚᱱᱵᱷᱮᱭᱚᱨ ᱫᱷᱩᱶᱟᱹ, ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱪᱚᱭᱚᱱ",
    chain_title: "ᱢᱚᱰᱭᱩᱞ ᱓: ᱢᱮᱥᱟᱱ ᱥᱮᱸᱫᱽᱨᱟ",
    chain_desc: "ᱥᱟᱱᱟᱢ ᱡᱤᱱᱤᱥ ᱛᱟᱞᱟᱨᱮ ᱴᱷᱤᱠ ᱡᱤᱱᱤᱥ ᱠᱷᱩᱡ, ᱪᱮᱫ ᱦᱩᱭᱩᱜ-ᱟ ᱞᱟᱹᱭ, ᱛᱟᱭᱚᱢ ᱪᱟᱞᱟᱜ",
    chain: "ᱥᱮᱸᱫᱽᱨᱟ",
    select_worker: "ᱠᱟᱹᱢᱤᱭᱟᱹ",
    completed: "ᱯᱩᱨᱟᱹᱣ",
    begin_btn: "ᱴᱨᱮᱱᱤᱝ ᱮᱦᱚᱵ",
    briefing_label: "ᱠᱟᱛᱷᱟ",
    mistakes: "ᱥᱩᱠ",
    no_results: "ᱱᱤᱛᱚᱜ ᱵᱟᱹᱱᱩᱜ-ᱟ",
    now_what: "ᱱᱤᱛ ᱪᱮᱫ ᱦᱩᱭᱩᱜ-ᱟ",
    found: "ᱧᱟᱢ",
    worker_list_title: "ᱠᱟᱹᱢᱤᱭᱟᱹ",
    selected_worker_title: "ᱠᱟᱹᱢᱤᱭᱟᱹ",
    module_results_title: "ᱢᱚᱰᱭᱩᱞ",
    workers: "ᱠᱟᱹᱢᱤᱭᱟᱹ",
    runs: "ᱨᱚᱱ",
    avg_ready: "ᱛᱟᱭᱟᱨᱤ",
    at_risk: "ᱡᱚᱠᱷᱟ",
    
    // AR HUD View
    gas_conc: "ᱜᱮᱥ ᱜᱟ touch ᱟᱨ",
    conc_rising: "ᱵᱚᱛᱚᱨᱟᱱ ᱞᱮᱠᱟ ᱨᱟᱠᱟᱵ ᱠᱟᱱᱟ",
    smoke_conc: "ᱫᱷᱩᱶᱟᱹ / CO ᱞᱮᱵᱮᱞ",
    temp_rising: "ᱪᱮᱛᱟᱱ / ᱨᱟᱠᱟᱵ ᱠᱟᱱᱟ",
    alarm_gas: "ᱜᱮᱥ ᱞᱤᱠ ᱧᱟᱢ ᱮᱱᱟ",
    alarm_fire: "ᱠᱚᱱᱵᱷᱮᱭᱚᱨ ᱥᱮᱸᱜᱮᱞ ᱧᱟᱢ ᱮᱱᱟ",
    alarm_gas_text: "GAS LEAK DETECTED",
    alarm_fire_text: "CONVEYOR FIRE DETECTED",
    ar_hint: "ᱵᱚᱛᱚᱨ ᱡᱟᱭᱜᱟ ᱞᱟᱹᱜᱤᱫ ᱠᱮᱢᱮᱨᱟ ᱥᱚᱨᱟᱣ ᱢᱮ",
    ar_hint_scan: "ᱵᱚᱛᱚᱨ ᱡᱟᱭᱜᱟ ᱞᱟᱹᱜᱤᱫ ᱠᱮᱢᱮᱨᱟ ᱥᱚᱨᱟᱣ ᱢᱮ",
    ar_hint_locked: "ᱵᱚᱛᱚᱨ ᱧᱟᱢ ᱮᱱᱟ — ᱛᱟᱞᱮ ᱡᱟᱵᱟᱵ ᱪᱩᱱᱟᱹᱣ ᱢᱮ",
    found_prefix: "ᱡᱤᱱᱤᱥ ᱧᱟᱢ:",
    step: "ᱥᱴᱮᱯ",
    
    // Consequence
    consequence_title: "ᱯᱚᱨᱤᱱᱟᱢ: ᱥᱮᱸᱜᱮᱞ ᱡᱩᱞ / ᱵᱚᱛᱚᱨ",
    retry_btn: "ᱯᱷᱮᱥᱞᱟ ᱴᱷᱟᱶ ᱛᱮ ᱨᱩᱣᱟᱹᱲᱚᱜ ᱢᱮ",
    
    // Certificate
    cert_title: "ᱱᱤᱭᱚᱢ ᱴᱷᱤᱠ ᱯᱟᱸᱡᱟ ᱦᱩᱭ ᱮᱱᱟ",
    cert_sub: "ᱱᱩᱭ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱥᱟ certificate ᱵᱮᱱᱟᱣ ᱢᱮ᱾",
    worker_name_label: "ᱠᱟᱹᱢᱤᱭᱟᱹ ᱧᱩᱛᱩᱢ",
    worker_name_placeholder: "ᱠᱟᱹᱢᱤᱭᱟᱹ ᱯᱩᱨᱟᱹ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ",
    cert_verified: "ᱥᱟᱹᱛ ᱮᱱᱟ (VERIFIED)",
    cert_worker: "ᱠᱟᱹᱢᱤᱭᱟᱹ ᱧᱩᱛᱩᱢ",
    cert_module: "ᱯᱩᱨᱟᱹᱣ ᱠᱟᱱ ᱢᱚᱰᱭᱩᱞ",
    cert_date: "ᱮᱢᱟᱠᱟᱱ ᱢᱟᱹᱦᱤᱛ",
    cert_path: "ᱯᱷᱮᱥᱞᱟ ᱰᱟᱦᱟᱨ",
    cert_score: "ᱛᱟᱭᱟᱨᱤ ᱥᱠᱚᱨ",
    cert_time: "ᱡᱟᱵᱟᱵ",
    cert_signature: "ᱠᱨᱤᱯᱴᱚ ᱥᱤᱜᱽᱱᱮᱪᱚᱨ",
    path_perfect: "ᱯᱩᱭᱞᱩ ᱠᱩᱨᱩᱢᱩᱴᱩ ᱨᱮ ᱴᱷᱤᱠ ᱱᱤᱭᱚᱢ",
    scan_qr_btn: "QR ᱥᱠᱮᱱ ᱟᱨ ᱥᱟᱹᱛ ᱡᱷᱤᱡ ᱢᱮ",

    // Skill tags
    skill_gas_detect: "ᱜᱮᱥ ᱧᱟᱢ",
    skill_explosive_limits: "ᱵᱤᱥᱯᱷᱚᱴ ᱥᱤᱢᱟᱹ",
    skill_scba_use: "SCBA ᱵᱮᱵᱦᱟᱨ",
    skill_confined_entry: "ᱥᱚᱝᱠᱚᱨ ᱴᱷᱟᱶ ᱵᱚᱞᱚᱱ",
    skill_electrical_fire: "ᱵᱤᱡᱽᱞᱤ ᱥᱮᱸᱜᱮᱞ",
    skill_extinguisher_class: "ᱤᱬᱤᱡ ᱥᱟᱯᱟᱵ",
    skill_vent_control: "ᱦᱚᱭ ᱱᱤᱭᱚᱱ",
    skill_conveyor_ops: "ᱠᱚᱱᱵᱷᱮᱭᱚᱨ ᱵᱚᱛᱚᱨ",
    
    // QR Verifier
    verifier_title: "ᱥᱟ cert ᱤᱯᱷᱤᱠᱮᱴ QR ᱥᱟᱹᱛᱤᱡ",
    verifier_desc: "ᱠᱮᱢᱨᱟ QR ᱠᱚᱰ ᱥᱮᱫ ᱚᱸᱰᱚᱠ ᱢᱮ᱾",
    verifier_scanning: "ᱠᱮᱢᱨᱟ ᱛᱮ QR ᱠᱚᱰ ᱥᱠᱮᱱᱚᱜ ᱠᱟᱱᱟ...",
    verifier_valid: "ᱥᱟᱹᱨᱤ ᱥᱟ certificate — ᱴᱷᱤᱠ ᱜᱮᱭᱟ",
    verifier_invalid: "ᱵᱟᱝ ᱴᱷᱤᱠ ᱥᱟ certificate",
    back_to_app: "ᱴᱨᱮᱱᱤᱝ ᱮᱯ ᱛᱮ ᱨᱩᱣᱟᱹᱲᱚᱜ ᱢᱮ",
    
    // Dashboard
    dash_title: "ᱛᱟᱭᱟᱨᱤ ᱰᱮᱥᱵᱚᱨᱰ",
    dash_sub: "ᱠᱷᱟᱫᱟᱱ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱟᱯᱷᱤᱥᱚᱨ",
    time_sim: "ᱥᱮᱨᱢᱟ/ᱢᱟᱦᱟᱸ ᱥᱤᱢᱩᱞᱮᱥᱚᱱ",
    days_passed: "ᱢᱟᱦᱟᱸ ᱯᱟᱨᱚᱢ ᱮᱱᱟ",
    sim_90_btn: "+᱙᱐ ᱢᱟᱦᱟᱸ ᱥᱤᱢᱩᱞᱮᱴ ᱢᱮ",
    reset_sim_btn: "ᱥᱤᱢᱩᱞᱮᱥᱚᱱ ᱨᱩᱣᱟᱹᱲ ᱢᱮ",
    decay_chart_title: "ᱛᱟᱭᱟᱨᱤ ᱠᱚᱢᱚᱜ ᱠᱟᱨᱵᱷ — ᱠᱟᱹᱢᱤᱭᱟᱹ",
    skill_panel_title: "ᱠᱩᱥᱞ-ᱞᱟᱜᱮᱞ ᱛᱟᱭᱟᱨᱤ — ᱠᱟᱹᱢᱤᱭᱟᱹ",
    refresher_list_title: "ᱫᱚᱦᱲᱟ ᱴᱨᱮᱱᱤᱝ ᱞᱟᱹᱠᱛᱤ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱞᱤᱥᱴ",
    last_trained: "ᱢᱩᱪᱟᱹᱫ ᱴᱨᱮᱱᱤᱝ",
    days_ago: "ᱢᱟᱦᱟᱸ ᱞᱟᱦᱟᱨᱮ",
    status_good: "ᱮᱠᱴᱤᱵᱽ",
    status_due: "ᱫᱚᱦᱲᱟ ᱞᱟᱹᱠᱛᱤ",
    status_critical: "ᱵᱚᱛᱚᱨᱟᱱ"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  if (I18N_DATA[lang]) {
    currentLang = lang;
    updateDOMTranslations();
  }
}

function t(key) {
  return (I18N_DATA[currentLang] && I18N_DATA[currentLang][key]) || I18N_DATA['en'][key] || key;
}

function updateDOMTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
      el.setAttribute('placeholder', translation);
    } else {
      el.textContent = translation;
    }
  });
}
