import type { Lang } from './translations';

export interface NudgeSet {
  day1: string;
  day3: string;
  day7: string;
}

export interface CommitmentNudge {
  commitment: string;
  nudges: NudgeSet;
}

type NudgeBank = { day1: string[]; day3: string[]; day7: string[] };

// Keyword map
const KEYWORD_MAP: Record<string, string[]> = {
  communication: ['communicat', 'speak', 'listen', 'present', 'articul', 'verbal', 'written', 'express'],
  leadership:    ['lead', 'initiative', 'motivat', 'inspir', 'vision', 'strateg', 'empower', 'influence'],
  teamwork:      ['team', 'collaborat', 'colleague', 'cowork', 'partner', 'together', 'cooperat'],
  time:          ['time', 'schedule', 'deadline', 'priorit', 'productiv', 'organiz', 'plan', 'manag'],
  feedback:      ['feedback', 'review', 'evaluat', 'assess', 'apprais', 'critique', 'input'],
  learning:      ['learn', 'skill', 'course', 'train', 'develop', 'grow', 'knowledge', 'study'],
};

// English nudge banks
const EN_BANKS: Record<string, NudgeBank> = {
  communication: {
    day1: [
      "Today is your starting line! Try one small step: send a concise message to a colleague and notice how it lands.",
      "Great intentions need great actions. Start today by actively listening in your next conversation — no interruptions.",
    ],
    day3: [
      "How is your communication journey going? Reflect on one interaction from the past 3 days — what went well?",
      "Three days in! Ask a trusted colleague for quick feedback on how clearly you have been communicating.",
    ],
    day7: [
      "One week of conscious communication! You have built a new habit. Keep refining — small daily improvements compound fast.",
      "7 days of active practice. Share one key lesson with your team to reinforce the habit you have started.",
    ],
  },
  leadership: {
    day1: [
      "Leadership starts with one decision. Today, choose a moment to speak up, take ownership, or lift someone up.",
      "Great leaders act before they feel ready. Walk into today with the confidence that your perspective adds value.",
    ],
    day3: [
      "You are 3 days into your leadership journey. Did you seize an opportunity to lead? If not, tomorrow is your chance.",
      "Midway check-in: reflect on one decision you made this week. What would a leader you admire have done?",
    ],
    day7: [
      "One week of intentional leadership is powerful. Your team has noticed — keep showing up with clarity and purpose.",
      "Seven days of stepping up! Identify one person on your team you can mentor or empower this week.",
    ],
  },
  teamwork: {
    day1: [
      "Collaboration is a skill you can practice today. Reach out to one team member and ask how you can support their work.",
      "Teamwork begins with trust. Be the first to offer help today — it sets a powerful tone for the entire week.",
    ],
    day3: [
      "Three days of team focus! Check in with colleagues: are your collaboration efforts creating positive momentum?",
      "Midweek is a great time to realign. Celebrate small shared wins to fuel the team energy forward.",
    ],
    day7: [
      "One week of stronger collaboration! Reflect on the team moments that stood out. Document what worked.",
      "Seven days in — your team investment is paying off. Recognize a colleague publicly for their contribution this week.",
    ],
  },
  time: {
    day1: [
      "Time mastery starts now. Block your top 3 priorities for today and protect those slots fiercely.",
      "Start strong: spend the first 10 minutes of your day planning intentionally. One week from now you will be grateful.",
    ],
    day3: [
      "Three days of better habits! Did you stick to your priorities, or did reactive tasks take over? Adjust accordingly.",
      "Midweek time audit: how many hours went to high-impact vs. low-value work? Make one small shift today.",
    ],
    day7: [
      "A full week of intentional time management! Your focus muscle is growing. Keep the momentum going.",
      "Seven days of discipline! Reflect on your biggest time win and plan how to repeat it next week.",
    ],
  },
  feedback: {
    day1: [
      "Feedback is a gift — start giving it today. Offer one piece of specific, positive feedback to a colleague.",
      "Today, close the feedback loop. Follow up on something you were told and act on it visibly.",
    ],
    day3: [
      "Three days of feedback focus! Have you created moments for two-way dialogue? If not, schedule one today.",
      "Check-in: how did your recent feedback land? Great feedback is a conversation, not a monologue.",
    ],
    day7: [
      "One week of feedback culture building! You are creating an environment where people feel safe to grow.",
      "Seven days in — reflect on the feedback exchanges this week. What impact did they have on performance?",
    ],
  },
  learning: {
    day1: [
      "Learning compounds. Dedicate just 20 minutes today to your development goal and watch the momentum build.",
      "Day 1 energy is everything. Turn intention into action: open that course, read that article, practice that skill.",
    ],
    day3: [
      "Three days of learning momentum! What is the most useful thing you have discovered so far? Write it down.",
      "Midway check-in: are you applying what you are learning? Real growth happens when knowledge meets action.",
    ],
    day7: [
      "One week of consistent learning — you are building a habit that will set you apart professionally.",
      "Seven days of growth! Share one key insight with a colleague. Teaching others is the fastest path to mastery.",
    ],
  },
  generic: {
    day1: [
      "Your journey starts today. Take the smallest possible step toward your commitment — consistency beats perfection.",
      "Day 1 of your commitment! The goal is not perfection, it is consistency. Start small and build from there.",
    ],
    day3: [
      "Three days in — how are you tracking? Pause 5 minutes to reflect on progress and recalibrate if needed.",
      "Midway check-in! Celebrate any progress, no matter how small. Momentum is built one step at a time.",
    ],
    day7: [
      "Seven days of commitment! You showed up when it mattered. Reflect on your growth and set your next milestone.",
      "One week complete! You have proven to yourself that you can do this. Use that confidence to go even further.",
    ],
  },
};

// Arabic nudge banks
const AR_BANKS: Record<string, NudgeBank> = {
  communication: {
    day1: [
      "اليوم نقطة انطلاقك! ابدأ بخطوة صغيرة: أرسل رسالة واضحة لزميلك ولاحظ تأثيرها.",
      "النوايا الجيدة تحتاج أفعالاً عملية. ابدأ اليوم بالاستماع الفعّال في محادثتك القادمة دون مقاطعة.",
    ],
    day3: [
      "كيف تسير رحلة تواصلك؟ تأمّل في تفاعل واحد خلال الأيام الثلاثة الماضية — ماذا أحسنت فيه؟",
      "ثلاثة أيام مضت! اطلب من زميل تثق به ملاحظات سريعة حول وضوح تواصلك.",
    ],
    day7: [
      "أسبوع كامل من التواصل الواعي! لقد بنيتَ عادة جديدة. استمر في الصقل — التحسينات الصغيرة تتراكم بسرعة.",
      "٧ أيام من التدريب الفعّال. شارك أهم ما تعلّمته مع فريقك لترسيخ العادة التي بدأتها.",
    ],
  },
  leadership: {
    day1: [
      "القيادة تبدأ بقرار واحد. اليوم اختر لحظة تبادر فيها، أو تتحمّل المسؤولية، أو ترفع من حولك.",
      "القادة العظماء يتصرفون قبل أن يشعروا بالاستعداد. أقبل على اليوم بثقة أن منظورك يُضيف قيمة.",
    ],
    day3: [
      "أنت في اليوم الثالث من رحلة قيادتك. هل اقتنصت فرصة للقيادة؟ إن لم يكن، فالغد فرصتك.",
      "نقطة تفتيش: تأمّل قراراً اتخذته هذا الأسبوع. ما الذي كان يفعله قائد تحترمه في موقفك؟",
    ],
    day7: [
      "أسبوع من القيادة الواعية قوة حقيقية. فريقك لاحظ ذلك — استمر في الحضور بوضوح وهدف.",
      "سبعة أيام من الإقدام! حدّد شخصاً في فريقك يمكنك إرشاده أو تمكينه هذا الأسبوع.",
    ],
  },
  teamwork: {
    day1: [
      "التعاون مهارة يمكنك تطويرها اليوم. تواصل مع أحد زملائك واسأله كيف يمكنك دعم عمله.",
      "العمل الجماعي يبدأ بالثقة. كن أول من يقدّم المساعدة اليوم — هذا يضع نغمة قوية لبقية الأسبوع.",
    ],
    day3: [
      "ثلاثة أيام من التركيز على الفريق! هل تسهم جهودك في التعاون في بناء زخم إيجابي؟",
      "منتصف الأسبوع وقت مثالي لإعادة المحاذاة. احتفل بالانتصارات المشتركة الصغيرة لتعزيز طاقة الفريق.",
    ],
    day7: [
      "أسبوع واحد من التعاون الأقوى! تأمّل اللحظات الجماعية البارزة. وثّق ما نجح منها.",
      "سبعة أيام — استثمارك في الفريق يؤتي ثماره. أشِد بزميل علناً على مساهمته هذا الأسبوع.",
    ],
  },
  time: {
    day1: [
      "إتقان الوقت يبدأ الآن. حدّد أولوياتك الثلاث لهذا اليوم واحمِ تلك الأوقات بشدة.",
      "ابدأ بقوة: أمضِ أول ١٠ دقائق من يومك في التخطيط المتعمّد. بعد أسبوع ستشكر نفسك.",
    ],
    day3: [
      "ثلاثة أيام من عادات الوقت الأفضل! هل التزمت بأولوياتك أم سيطرت عليك المهام التفاعلية؟",
      "مراجعة وسط الأسبوع: كم ساعة أمضيت في عمل عالي التأثير مقابل المهام ذات القيمة المنخفضة؟",
    ],
    day7: [
      "أسبوع كامل من إدارة الوقت المتعمّدة! عضلة تركيزك تنمو. حافظ على هذا الزخم.",
      "سبعة أيام من الانضباط! تأمّل أكبر انتصار لك في الوقت هذا الأسبوع وكيف يمكنك تكراره.",
    ],
  },
  feedback: {
    day1: [
      "التغذية الراجعة هدية — ابدأ في تقديمها اليوم. اختر زميلاً وقدّم له ملاحظة إيجابية ومحددة.",
      "اليوم، أغلق حلقة التغذية الراجعة. تابع شيئاً قيل لك وتصرّف بناءً عليه بشكل مرئي.",
    ],
    day3: [
      "ثلاثة أيام من التركيز على التغذية الراجعة! هل أنشأت لحظات للحوار الثنائي؟ إن لم يكن، جدولها.",
      "نقطة تفتيش: كيف استُقبلت ملاحظاتك الأخيرة؟ التغذية الراجعة الجيدة محادثة، وليست مونولوجاً.",
    ],
    day7: [
      "أسبوع من بناء ثقافة التغذية الراجعة! أنت تخلق بيئة يشعر فيها الناس بالأمان للنمو.",
      "سبعة أيام — تأمّل تبادلات التغذية الراجعة هذا الأسبوع وتأثيرها على أداء الفريق.",
    ],
  },
  learning: {
    day1: [
      "التعلّم يتراكم. خصّص ٢٠ دقيقة فقط اليوم لهدف تطويرك وشاهد الزخم ينمو.",
      "طاقة اليوم الأول هي كل شيء. حوّل نيّتك إلى فعل: افتح ذلك الكورس أو مارس تلك المهارة.",
    ],
    day3: [
      "ثلاثة أيام من زخم التعلّم! ما أكثر شيء مفيد اكتشفته حتى الآن؟ اكتبه.",
      "نقطة تفتيش: هل تطبّق ما تتعلّمه؟ النمو الحقيقي يحدث عندما تلتقي المعرفة بالعمل.",
    ],
    day7: [
      "أسبوع من التعلّم المتواصل! أنت تبني عادة ستميّزك مهنياً. استمر في ذلك.",
      "سبعة أيام من النمو! شارك رؤية أساسية مع زميل — تعليم الآخرين هو أسرع طريق لإتقان المهارة.",
    ],
  },
  generic: {
    day1: [
      "رحلتك تبدأ اليوم. اتخذ أصغر خطوة ممكنة نحو التزامك — الاتساق يتفوق على الكمال.",
      "اليوم الأول من التزامك! الهدف ليس الكمال، بل الاتساق. ابدأ صغيراً وابنِ عليه.",
    ],
    day3: [
      "ثلاثة أيام مضت — كيف تتابع؟ توقف ٥ دقائق لتأمّل تقدمك وإعادة المعايرة إذا لزم.",
      "نقطة تفتيش! احتفل بأي تقدم مهما كان صغيراً. الزخم يُبنى خطوة خطوة.",
    ],
    day7: [
      "سبعة أيام من الالتزام! ظهرت حين كان الأمر مهماً. تأمّل نموّك وضع معلمك التالي.",
      "أسبوع كامل! أثبتّ لنفسك أنك تستطيع. استخدم تلك الثقة للذهاب أبعد.",
    ],
  },
};

function detectCategory(commitment: string): string {
  const lower = commitment.toLowerCase();
  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some(kw => lower.includes(kw))) return category;
  }
  return 'generic';
}

/**
 * Generate structured nudges for each commitment.
 * @param commitments - array of user commitment strings
 * @param lang - 'en' | 'ar'
 * @param variant - increment to get alternate wording (0 or 1)
 */
export function generateNudges(
  commitments: string[],
  lang: Lang,
  variant = 0,
): CommitmentNudge[] {
  const banks = lang === 'ar' ? AR_BANKS : EN_BANKS;
  const v = variant % 2;

  return commitments.filter(c => c.trim()).map(commitment => {
    const category = detectCategory(commitment);
    const bank = banks[category] ?? banks.generic;
    return {
      commitment,
      nudges: {
        day1: bank.day1[v],
        day3: bank.day3[v],
        day7: bank.day7[v],
      },
    };
  });
}
