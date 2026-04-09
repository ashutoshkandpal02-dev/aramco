export type Lang = 'en' | 'ar';

const en = {
  // Common
  appTitle: 'PathMind Pro',
  journeyCompleted: (pct: number) => `${pct}% Journey Completed`,
  copyright: (year: number) => `© ${year} PathMind Pro. Enterprise Edition.`,

  // AssessmentStart
  finalAssessment: 'Final Assessment',
  assessmentDescription:
    'Evaluate your learning and apply it in real-world professional scenarios to earn your certification.',
  levels3: '3 Levels',
  interactive: 'Interactive',
  minutes15: '15 Minutes',
  startAssessment: 'Start Assessment',

  // AssessmentQuestions
  questionOf: (current: number, total: number) => `Question ${current} of ${total}`,
  donePercent: (pct: number) => `${pct}% Done`,
  previous: 'Previous',
  next: 'Next',
  finishSection: 'Finish Section',

  // ScenarioBranching
  immersiveScenario: 'Immersive Scenario',
  decisionLogged: 'Decision Logged',
  continueToResults: 'Continue to Results',
  confirmDecision: 'Confirm Decision',

  // AssessmentResult
  points: 'Points',
  excellent: 'Excellent',
  good: 'Good',
  needsImprovement: 'Needs Improvement',
  assessmentCompleted:
    'You have successfully completed the PathMind assessment. Your commitment to learning is impressive.',
  timeSpent: 'Time Spent',
  accuracy: 'Accuracy',
  continueToActionPlan: 'Continue to Action Plan',
  retakeAssessment: 'Retake Assessment',

  // ActionPlanForm
  postAssessmentWorkshop: 'Post-Assessment Workshop',
  yourActionPlan: 'Your Action Plan',
  actionPlanDescription:
    'Define exactly how you will apply these new skills in your daily workflow. Specific actions lead to better results.',
  commitment: 'Commitment',
  commitmentPlaceholder:
    'e.g., I will conduct a bi-weekly standup with my team to improve alignment...',
  addCommitment: 'Add Another Commitment',
  implementationTimeline: 'Implementation Timeline',
  priorityLevel: 'Plan Priority Level',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  next7Days: 'Next 7 Days',
  next14Days: 'Next 14 Days',
  next30Days: 'Next 30 Days',
  submitActionPlan: 'Submit Action Plan',
  selectTimeframe: 'Select timeframe',

  // SubmissionSuccess
  planSecured: 'Plan Secured',
  planSavedMessage:
    'Your professional development roadmap has been saved and shared with your mentors.',
  smartNudgesEnabled: 'Smart Nudges Enabled',
  nudgesMessage:
    "We'll send you personalized check-ins to help you stick to your commitments. Ready to see what's coming?",
  previewSmartReminders: 'Preview Smart Reminders',

  // NudgesPreview
  yourSmartJourney: 'Your Smart Journey',
  nudgesSubtitle:
    'Stay on track with these AI-crafted notifications arriving on your schedule.',
  day1: 'Day 1',
  day3: 'Day 3',
  day7: 'Day 7',
  reminder: 'Reminder',
  quickKickoff: 'Quick Kick-off',
  progressCheck: 'Progress Check',
  momentumBoost: 'Momentum Boost',
  justNow: 'Just now',
  generatingNudges: 'Generating Personalized Nudges',
  nudgesGeneratingMessage:
    'Our AI is crafting custom reminders based on your specific goals...',
  allSet: 'All Set!',
  allSetDescription:
    "Your assessment and action plan are complete. You're ready to make a real impact.",
  finishSession: 'Finish Session',
};

const ar: typeof en = {
  // Common
  appTitle: 'باث مايند برو',
  journeyCompleted: (pct: number) => `${pct}% اكتملت الرحلة`,
  copyright: (year: number) => `© ${year} باث مايند برو. الإصدار المؤسسي.`,

  // AssessmentStart
  finalAssessment: 'التقييم النهائي',
  assessmentDescription:
    'قيّم تعلّمك وطبّقه في سيناريوهات مهنية واقعية للحصول على شهادتك.',
  levels3: '٣ مستويات',
  interactive: 'تفاعلي',
  minutes15: '١٥ دقيقة',
  startAssessment: 'بدء التقييم',

  // AssessmentQuestions
  questionOf: (current: number, total: number) => `السؤال ${current} من ${total}`,
  donePercent: (pct: number) => `${pct}% مكتمل`,
  previous: 'السابق',
  next: 'التالي',
  finishSection: 'إنهاء القسم',

  // ScenarioBranching
  immersiveScenario: 'سيناريو تفاعلي',
  decisionLogged: 'تم تسجيل القرار',
  continueToResults: 'المتابعة إلى النتائج',
  confirmDecision: 'تأكيد القرار',

  // AssessmentResult
  points: 'نقاط',
  excellent: 'ممتاز',
  good: 'جيد',
  needsImprovement: 'يحتاج إلى تحسين',
  assessmentCompleted:
    'لقد أكملت تقييم باث مايند بنجاح. التزامك بالتعلم أمر رائع.',
  timeSpent: 'الوقت المستغرق',
  accuracy: 'الدقة',
  continueToActionPlan: 'المتابعة إلى خطة العمل',
  retakeAssessment: 'إعادة التقييم',

  // ActionPlanForm
  postAssessmentWorkshop: 'ورشة ما بعد التقييم',
  yourActionPlan: 'خطة عملك',
  actionPlanDescription:
    'حدّد بدقة كيف ستطبّق هذه المهارات الجديدة في سير عملك اليومي. الإجراءات المحددة تؤدي إلى نتائج أفضل.',
  commitment: 'التزام',
  commitmentPlaceholder:
    'مثال: سأعقد اجتماعات دورية مع فريقي كل أسبوعين لتحسين التوافق...',
  addCommitment: 'إضافة التزام آخر',
  implementationTimeline: 'الجدول الزمني للتنفيذ',
  priorityLevel: 'مستوى أولوية الخطة',
  low: 'منخفض',
  medium: 'متوسط',
  high: 'عالٍ',
  next7Days: 'الأيام السبعة القادمة',
  next14Days: 'الأيام الأربعة عشر القادمة',
  next30Days: 'الثلاثون يوماً القادمة',
  submitActionPlan: 'إرسال خطة العمل',
  selectTimeframe: 'اختر الإطار الزمني',

  // SubmissionSuccess
  planSecured: 'تم حفظ الخطة',
  planSavedMessage:
    'تم حفظ خارطة طريق تطويرك المهني ومشاركتها مع مرشديك.',
  smartNudgesEnabled: 'التذكيرات الذكية مفعّلة',
  nudgesMessage:
    'سنرسل لك متابعات مخصصة لمساعدتك على الالتزام بتعهداتك. هل أنت مستعد لرؤية ما ينتظرك؟',
  previewSmartReminders: 'معاينة التذكيرات الذكية',

  // NudgesPreview
  yourSmartJourney: 'رحلتك الذكية',
  nudgesSubtitle:
    'ابقَ على المسار الصحيح مع هذه الإشعارات المصنوعة بالذكاء الاصطناعي وفق جدولك.',
  day1: 'اليوم ١',
  day3: 'اليوم ٣',
  day7: 'اليوم ٧',
  reminder: 'تذكير',
  quickKickoff: 'انطلاقة سريعة',
  progressCheck: 'متابعة التقدم',
  momentumBoost: 'تعزيز الزخم',
  justNow: 'الآن',
  generatingNudges: 'جارٍ إنشاء التذكيرات المخصصة',
  nudgesGeneratingMessage:
    'يقوم الذكاء الاصطناعي بصياغة تذكيرات مخصصة بناءً على أهدافك المحددة...',
  allSet: 'أحسنت!',
  allSetDescription:
    'لقد اكتملت تقييمك وخطة عملك. أنت مستعد للتأثير الحقيقي.',
  finishSession: 'إنهاء الجلسة',
};

export const translations: Record<Lang, typeof en> = { en, ar };
export type Translations = typeof en;
