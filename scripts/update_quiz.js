const path = require('path');
const fs = require('fs');

const quizStr = `{
    cold: {
        intro: "Doctor: Let’s check if your symptoms may be related to a cold or flu.",
        questions: [
            { q: "Do you have a runny or blocked nose?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have a sore throat?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have a fever?", o: ["No", "Slight", "Yes", "High"], type: "chips" },
            { q: "Do you feel body aches?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you feel tired or weak?", o: ["No", "Slight", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have a cough?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have your symptoms lasted more than 3 days?", o: ["No", "Not sure", "Yes", "More than a week"], type: "chips" },
            { q: "Have you been exposed to cold weather or sick people?", o: ["No", "Not sure", "Yes", "Frequently"], type: "chips" },
            { q: "Are you willing to rest and recover properly?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    headache: {
        intro: "Doctor: I’d like to understand your headache patterns.",
        questions: [
            { q: "How often do you experience headaches?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Is the pain severe or throbbing?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you feel sensitivity to light or sound?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel nausea during headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel stress before headaches occur?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you skip meals often?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you spend long hours on screens?", o: ["No", "Sometimes", "Often", "Daily"], type: "chips" },
            { q: "Do you sleep poorly?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you use painkillers frequently?", o: ["No", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Are you willing to manage triggers and lifestyle?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    muscle: {
        intro: "Doctor: Let’s assess your muscle strength and body condition.",
        questions: [
            { q: "Do you experience muscle pain?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel weak during daily activities?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you stretch before physical activity?", o: ["Always", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you feel pain after minor activity?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume enough protein?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you stay hydrated?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you feel stiffness in your body?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you get enough rest?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your physical health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    appetite: {
        intro: "Doctor: Let’s understand your eating habits and appetite.",
        questions: [
            { q: "Do you experience loss of appetite?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you overeat frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you skip meals?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel guilty after eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you eat due to stress or emotions?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a regular eating schedule?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you crave unhealthy foods?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel tired after eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have you experienced sudden weight changes?", o: ["No", "Slight", "Yes", "Significant"], type: "chips" },
            { q: "Are you willing to improve your eating habits?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    dental: {
        intro: "Doctor: Let me assess your oral and dental health.",
        questions: [
            { q: "Do you experience tooth pain?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do your gums bleed when brushing?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have bad breath frequently?", o: ["No", "Occasionally", "Often", "Always"], type: "chips" },
            { q: "How often do you brush your teeth?", o: ["Twice daily", "Once daily", "Occasionally", "Rarely"], type: "chips" },
            { q: "Do you consume sugary foods or drinks often?", o: ["No", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Do you visit a dentist regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience sensitivity to hot or cold foods?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you smoke?", o: ["No", "Occasionally", "Frequently", "Daily"], type: "chips" },
            { q: "Do you notice swelling or redness in your gums?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Are you willing to improve your oral hygiene?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    thyroid: {
        intro: "Doctor: I’d like to evaluate your thyroid function.",
        questions: [
            { q: "Do you experience unexplained weight changes?", o: ["No", "Slight", "Yes", "Significant"], type: "chips" },
            { q: "Do you feel tired most of the time?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you feel unusually cold or hot?", o: ["No", "Slight", "Yes", "Extreme"], type: "chips" },
            { q: "Do you experience hair thinning or loss?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have mood changes?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have difficulty sleeping?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have swelling in the neck area?", o: ["No", "Slight", "Yes", "Noticeable"], type: "chips" },
            { q: "Do you feel your heart rate is irregular?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a healthy diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to check your thyroid health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    fitness: {
        intro: "Doctor: Let’s assess your physical activity level.",
        questions: [
            { q: "How often do you exercise?", o: ["Daily", "Few times a week", "Rarely", "Never"], type: "chips" },
            { q: "Do you sit for long hours daily?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you feel tired after light activity?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you engage in strength or cardio exercises?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you stretch or warm up before activity?", o: ["Always", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience muscle pain frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a healthy weight?", o: ["Yes", "Slightly off", "No", "Significantly off"], type: "chips" },
            { q: "Do you stay hydrated during the day?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have a fitness goal?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" },
            { q: "Are you willing to improve your fitness level?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    emotional: {
        intro: "Doctor: Let’s understand your emotional and anxiety levels.",
        questions: [
            { q: "Do you feel nervous or anxious often?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you overthink situations?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience rapid heartbeat without activity?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have difficulty relaxing?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel restless or on edge?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have trouble sleeping due to worry?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you avoid situations due to fear?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel overwhelmed easily?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you engage in relaxation activities?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your mental well-being?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    infection: {
        intro: "Doctor: I’d like to check if your body may be fighting an infection.",
        questions: [
            { q: "Do you have a fever?", o: ["No", "Slight", "Yes", "High fever"], type: "chips" },
            { q: "Do you feel body aches or weakness?", o: ["No", "Slight", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have a sore throat or cough?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience chills or sweating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel tired without doing much?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have you been exposed to someone sick recently?", o: ["No", "Not sure", "Yes", "Multiple exposures"], type: "chips" },
            { q: "Do you have loss of appetite?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you have headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have digestive issues along with these symptoms?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Are you willing to rest and support your recovery?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    renal: {
        intro: "Doctor: Let’s evaluate how well your kidneys may be functioning.",
        questions: [
            { q: "Do you experience swelling in your legs or face?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you urinate more or less than usual?", o: ["Normal", "Slight change", "Noticeable change", "Extreme change"], type: "chips" },
            { q: "Do you feel persistent fatigue?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience lower back pain?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you drink enough water daily?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have high blood pressure?", o: ["No", "Not sure", "Yes", "Severe"], type: "chips" },
            { q: "Do you notice foamy or dark urine?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you take medications frequently?", o: ["No", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do you have a history of kidney issues?", o: ["No", "Not sure", "Yes", "Chronic"], type: "chips" },
            { q: "Are you willing to protect your kidney health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    sugar: {
        intro: "Doctor: Let’s understand your sugar cravings and metabolism.",
        questions: [
            { q: "Do you crave sugary foods often?", o: ["Never", "Occasionally", "Frequently", "Very often"], type: "chips" },
            { q: "Do you feel energy crashes during the day?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you eat sweets daily?", o: ["No", "Occasionally", "Often", "Multiple times daily"], type: "chips" },
            { q: "Do you feel hungry shortly after eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you skip meals?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you gain weight easily?", o: ["No", "Slightly", "Yes", "Very easily"], type: "chips" },
            { q: "Do you feel tired after eating sugar?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you drink sugary beverages?", o: ["Never", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Are you willing to reduce sugar intake?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    women: {
        intro: "Doctor: I’d like to assess your general reproductive and hormonal health.",
        questions: [
            { q: "Are your menstrual cycles regular?", o: ["Yes", "Slightly irregular", "Irregular", "Very irregular"], type: "chips" },
            { q: "Do you experience severe cramps?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you experience unusual discharge or discomfort?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel fatigued during your cycle?", o: ["No", "Slight", "Moderate", "Severe"], type: "chips" },
            { q: "Do you have mood swings related to your cycle?", o: ["No", "Mild", "Moderate", "Severe"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience hormonal acne?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a history of reproductive issues?", o: ["No", "Not sure", "Yes", "Multiple issues"], type: "chips" },
            { q: "Are you willing to improve your health naturally?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    sleep: {
        intro: "Doctor: I’d like to understand your sleep pattern and quality.",
        questions: [
            { q: "How many hours do you sleep daily?", o: ["7–9 hours", "5–6 hours", "3–4 hours", "Less than 3 hours"], type: "chips" },
            { q: "Do you have difficulty falling asleep?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you wake up frequently at night?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel refreshed after sleeping?", o: ["Always", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you use your phone or screen before bed?", o: ["Never", "Occasionally", "Often", "Always"], type: "chips" },
            { q: "Do you consume caffeine late in the day?", o: ["Never", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Do you feel tired during the day?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a consistent sleep schedule?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you snore heavily or have breathing issues during sleep?", o: ["No", "Not sure", "Yes", "Often"], type: "chips" },
            { q: "Are you willing to improve your sleep habits?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    anemia: {
        intro: "Doctor: Let’s check for signs related to low blood levels.",
        questions: [
            { q: "Do you feel weak or fatigued often?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience dizziness?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you look pale (skin, lips, nails)?", o: ["No", "Slightly", "Yes", "Very pale"], type: "chips" },
            { q: "Do you experience shortness of breath?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume iron-rich foods?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have frequent headaches?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have cold hands or feet?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Have you experienced heavy blood loss (if applicable)?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you feel your heart racing sometimes?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Are you willing to improve your nutrition?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    prostate: {
        intro: "Doctor: Let’s assess your prostate health.",
        questions: [
            { q: "Do you urinate frequently, especially at night?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have difficulty starting urination?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel incomplete bladder emptying?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you experience weak urine flow?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you feel discomfort in the pelvic area?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a family history of prostate issues?", o: ["No", "Not sure", "Yes", "Multiple cases"], type: "chips" },
            { q: "Do you consume a healthy diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you above 40 years?", o: ["No", "Close", "Yes", "Over 60"], type: "chips" },
            { q: "Are you willing to monitor your prostate health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    liver: {
        intro: "Doctor: Let’s evaluate your liver function and lifestyle.",
        questions: [
            { q: "Do you feel tired frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume alcohol?", o: ["No", "Occasionally", "Frequently", "Daily"], type: "chips" },
            { q: "Do you experience abdominal discomfort?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have yellowing of eyes or skin?", o: ["No", "Slight", "Yes", "Severe"], type: "chips" },
            { q: "Do you eat fatty or processed foods often?", o: ["No", "Sometimes", "Often", "Daily"], type: "chips" },
            { q: "Do you take medications frequently?", o: ["No", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do you feel nausea?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your liver health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    digestive: {
        intro: "Doctor: Let’s assess your digestive system and gut health.",
        questions: [
            { q: "Do you experience frequent bloating?", o: ["Never", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do you have constipation or irregular bowel movements?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you feel discomfort after eating?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume processed or junk food regularly?", o: ["No", "Occasionally", "Often", "Daily"], type: "chips" },
            { q: "Do you drink enough water daily?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you experience acid reflux or heartburn?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you eat late at night?", o: ["Never", "Occasionally", "Often", "Always"], type: "chips" },
            { q: "Do you feel full quickly when eating?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you include fiber in your diet (fruits, vegetables)?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Are you willing to improve your digestive health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    bone: {
        intro: "Doctor: I’d like to evaluate your bone strength and risk factors.",
        questions: [
            { q: "Do you experience bone or back pain?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you consume calcium-rich foods?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you get enough sunlight (Vitamin D)?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Have you had fractures before?", o: ["No", "Minor", "Yes", "Multiple"], type: "chips" },
            { q: "Do you consume alcohol or smoke?", o: ["No", "Occasionally", "Frequently", "Daily"], type: "chips" },
            { q: "Do you feel weak or fatigued often?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have a family history of bone issues?", o: ["No", "Not sure", "Yes", "Multiple cases"], type: "chips" },
            { q: "Are you willing to improve your bone health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    vision: {
        intro: "Doctor: Let’s check your vision and eye health.",
        questions: [
            { q: "Do you experience blurred vision?", o: ["Never", "Occasionally", "Often", "Very often"], type: "chips" },
            { q: "Do your eyes feel dry or irritated?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you spend long hours on screens?", o: ["No", "Sometimes", "Often", "Daily"], type: "chips" },
            { q: "Do you experience headaches after screen use?", o: ["Never", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have difficulty seeing at night?", o: ["No", "Slightly", "Yes", "Severe difficulty"], type: "chips" },
            { q: "Do you wear protective eyewear in sunlight?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you eat foods rich in vitamins (like carrots, greens)?", o: ["Regularly", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you rub your eyes frequently?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have a family history of eye problems?", o: ["No", "Not sure", "Yes", "Multiple cases"], type: "chips" },
            { q: "Are you willing to improve your eye care habits?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    },
    hormonal: {
        intro: "Doctor: Let’s evaluate your hormonal balance.",
        questions: [
            { q: "Do you experience unexplained weight changes?", o: ["No", "Slightly", "Yes", "Significant"], type: "chips" },
            { q: "Do you feel fatigued most of the time?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you have mood swings?", o: ["No", "Rarely", "Sometimes", "Often"], type: "chips" },
            { q: "Do you have sleep problems?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you experience skin issues (acne, dryness)?", o: ["No", "Slightly", "Yes", "Severe"], type: "chips" },
            { q: "Do you feel stressed frequently?", o: ["No", "Sometimes", "Often", "Always"], type: "chips" },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"], type: "chips" },
            { q: "Do you have irregular body patterns (cycle, energy)?", o: ["No", "Slightly", "Yes", "Very irregular"], type: "chips" },
            { q: "Are you willing to improve your hormonal health?", o: ["Yes", "Maybe", "No", "Not interested"], type: "chips" }
        ]
    }
};`;

let content = fs.readFileSync('./assets/js/data.js', 'utf8');

// Replace everything between 'const QUIZ_DATA = {' and 'window.QUIZ_DATA = QUIZ_DATA;'
const startIndex = content.indexOf('const QUIZ_DATA = {');
const endIndex = content.indexOf('window.QUIZ_DATA = QUIZ_DATA;');

if (startIndex !== -1 && endIndex !== -1) {
    const updatedContent = content.substring(0, startIndex) + "const QUIZ_DATA = " + quizStr + "\n\n" + content.substring(endIndex);
    fs.writeFileSync('./assets/js/data.js', updatedContent, 'utf8');
    console.log("QUIZ_DATA successfully updated with 20 categories!");
} else {
    console.log("Could not find QUIZ_DATA bounds in data.js");
}
