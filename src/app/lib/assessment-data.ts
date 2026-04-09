import { Lang } from '@/lib/translations';

export interface BilingualString {
  en: string;
  ar: string;
}

export interface AssessmentQuestion {
  id: number;
  text: BilingualString;
  options: BilingualString[];
  correctAnswer: number;
}

export interface ScenarioOption {
  id: string;
  title: BilingualString;
  description: BilingualString;
  feedback: BilingualString;
}

export interface ScenarioDataType {
  title: BilingualString;
  description: BilingualString;
  options: ScenarioOption[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: {
      en: 'Which of the following is the most effective way to provide constructive feedback?',
      ar: 'أيٌّ مما يلي هو الأسلوب الأكثر فعالية لتقديم تغذية راجعة بنّاءة؟',
    },
    options: [
      {
        en: 'Focus on personality traits rather than specific behaviors.',
        ar: 'التركيز على السمات الشخصية بدلاً من السلوكيات المحددة.',
      },
      {
        en: 'Be specific, timely, and focus on observable actions.',
        ar: 'كن محدداً وفي الوقت المناسب، وركّز على الأفعال القابلة للملاحظة.',
      },
      {
        en: 'Wait until the annual review to discuss all issues at once.',
        ar: 'الانتظار حتى المراجعة السنوية لمناقشة جميع المسائل دفعةً واحدة.',
      },
      {
        en: 'Avoid direct feedback to maintain a positive atmosphere.',
        ar: 'تجنّب التغذية الراجعة المباشرة للحفاظ على أجواء إيجابية.',
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    text: {
      en: 'When managing a high-priority project with a tight deadline, what is the best approach to ensure team alignment?',
      ar: 'عند إدارة مشروع ذي أولوية عالية مع موعد نهائي ضيّق، ما هو أفضل نهج لضمان توافق الفريق؟',
    },
    options: [
      {
        en: 'Set individual goals and let team members work independently.',
        ar: 'تحديد أهداف فردية والسماح لأعضاء الفريق بالعمل باستقلالية.',
      },
      {
        en: 'Conduct daily 15-minute stand-up meetings to address blockers.',
        ar: 'عقد اجتماعات يومية قصيرة مدة ١٥ دقيقة لمعالجة العوائق.',
      },
      {
        en: 'Email the project plan once and assume everyone understands it.',
        ar: 'إرسال خطة المشروع عبر البريد مرة واحدة والافتراض بأن الجميع يفهمها.',
      },
      {
        en: 'Micro-manage every task to guarantee quality control.',
        ar: 'الإشراف الدقيق على كل مهمة لضمان ضبط الجودة.',
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: {
      en: 'Which approach best defines effective self-directed learning in a professional environment?',
      ar: 'أيٌّ من المقاربات التالية يصف بشكل أفضل التعلّم الذاتي الموجَّه في بيئة مهنية؟',
    },
    options: [
      {
        en: 'Attend formal training only when mandated by your manager.',
        ar: 'حضور التدريب الرسمي فقط عند إلزامك به من قِبل مديرك.',
      },
      {
        en: 'Set personal learning goals, seek resources proactively, and apply new skills immediately.',
        ar: 'وضع أهداف تعلّمية شخصية والبحث عن الموارد باستباقية وتطبيق المهارات الجديدة فوراً.',
      },
      {
        en: 'Focus solely on skills directly related to your current tasks.',
        ar: 'التركيز فقط على المهارات المرتبطة مباشرة بمهامك الحالية.',
      },
      {
        en: 'Wait for your annual appraisal to identify development areas.',
        ar: 'انتظار تقييمك السنوي لتحديد مجالات التطوير.',
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    text: {
      en: 'A new team member is struggling and falling behind. As a team lead, what is the most effective first step?',
      ar: 'يعاني عضو جديد في الفريق ويتأخر في إنجاز مهامه. بوصفك قائداً، ما هي الخطوة الأولى الأكثر فعالية؟',
    },
    options: [
      {
        en: 'Reassign their tasks to more experienced members immediately.',
        ar: 'إعادة توزيع مهامه على أعضاء أكثر خبرة فوراً.',
      },
      {
        en: 'Schedule a private one-on-one to understand their challenges and co-create a support plan.',
        ar: 'جدولة لقاء فردي خاص لفهم تحدياته والتعاون في وضع خطة دعم مناسبة.',
      },
      {
        en: 'Wait and observe for another week before considering any intervention.',
        ar: 'الانتظار والمراقبة لأسبوع آخر قبل التفكير في التدخل.',
      },
      {
        en: 'Report the performance gap directly to HR.',
        ar: 'الإبلاغ عن فجوة الأداء مباشرةً إلى الموارد البشرية.',
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    text: {
      en: 'Which time management strategy consistently produces the highest productivity ROI?',
      ar: 'أيٌّ من استراتيجيات إدارة الوقت يُنتج باستمرار أعلى عائد على الإنتاجية المهنية؟',
    },
    options: [
      {
        en: 'Multitask across several projects to maximise daily output.',
        ar: 'تعدد المهام عبر عدة مشاريع لزيادة الإنتاج اليومي.',
      },
      {
        en: 'Time-block deep-work sessions around your peak energy hours and batch low-value tasks.',
        ar: 'تخصيص مقاطع زمنية للعمل العميق في أوقات طاقتك الذروة وتجميع المهام ذات القيمة المنخفضة.',
      },
      {
        en: 'Handle emails and messages first thing every morning before starting work.',
        ar: 'معالجة الرسائل الإلكترونية أولاً في كل صباح قبل بدء العمل.',
      },
      {
        en: 'Keep a running to-do list and complete items in the order they arrive.',
        ar: 'الاحتفاظ بقائمة مهام جارية وإنجاز العناصر بالترتيب الذي تصل به.',
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    text: {
      en: 'When building cross-functional collaboration, which practice delivers the most sustainable results?',
      ar: 'عند بناء تعاون بين الأقسام الوظيفية المختلفة، أيٌّ الممارسات التالية يحقق أكثر النتائج استدامةً؟',
    },
    options: [
      {
        en: 'Rely exclusively on project management tools to coordinate all communication.',
        ar: 'الاعتماد حصرياً على أدوات إدارة المشاريع لتنسيق كل التواصل.',
      },
      {
        en: 'Establish shared goals, clear ownership, and regular cross-team rituals for alignment.',
        ar: 'وضع أهداف مشتركة وتوضيح المسؤوليات وإقامة طقوس منتظمة بين الفرق لضمان التوافق.',
      },
      {
        en: 'Assign a single liaison to relay all information between teams.',
        ar: 'تعيين منسق واحد لنقل المعلومات بين جميع الفرق.',
      },
      {
        en: 'Schedule quarterly all-hands meetings to address cross-team issues.',
        ar: 'جدولة اجتماعات ربع سنوية لمعالجة قضايا التعاون بين الفرق.',
      },
    ],
    correctAnswer: 1,
  },
];

export const SCENARIO_DATA: ScenarioDataType = {
  title: {
    en: 'Scenario: The Conflict Resolution',
    ar: 'سيناريو: حل النزاعات',
  },
  description: {
    en: 'Your team has two members who are disagreeing on the technical architecture of a new feature. This is delaying the project. How do you intervene?',
    ar: 'يختلف عضوان في فريقك حول البنية التقنية لميزة جديدة، مما يتسبب في تأخير المشروع. كيف تتدخل؟',
  },
  options: [
    {
      id: 'a',
      title: { en: 'Facilitate a Workshop', ar: 'تيسير ورشة عمل' },
      description: {
        en: 'Host a technical brainstorming session where both sides present their pros and cons objectively.',
        ar: 'استضافة جلسة عصف ذهني تقني يعرض فيها كلا الطرفين إيجابياتهم وسلبياتهم بشكل موضوعي.',
      },
      feedback: {
        en: 'Great choice! This fosters collaboration and data-driven decision making.',
        ar: 'خيار ممتاز! هذا يعزز التعاون وصنع القرار المستند إلى البيانات.',
      },
    },
    {
      id: 'b',
      title: { en: 'Make the Executive Decision', ar: 'اتخاذ القرار التنفيذي' },
      description: {
        en: 'Review both proposals privately and dictate which one to follow to save time.',
        ar: 'مراجعة كلا المقترحين بشكل منفرد وإملاء أيهما يجب اتباعه لتوفير الوقت.',
      },
      feedback: {
        en: 'While fast, this might lead to resentment and lower team buy-in for the chosen path.',
        ar: 'رغم سرعته، قد يؤدي ذلك إلى استياء وضعف في تبنّي الفريق للمسار المختار.',
      },
    },
    {
      id: 'c',
      title: { en: 'Assign a Third-Party Lead', ar: 'تعيين قائد محايد' },
      description: {
        en: 'Ask a senior engineer from another team to mediate and make the final choice.',
        ar: 'طلب مهندس أول من فريق آخر للوساطة واتخاذ القرار النهائي.',
      },
      feedback: {
        en: 'Neutral mediation is helpful, but might undermine your authority as a team leader.',
        ar: 'الوساطة المحايدة مفيدة، لكنها قد تضعف سلطتك بوصفك قائداً للفريق.',
      },
    },
  ],
};

/** Helper: pull the right language string from a BilingualString */
export function tl(field: BilingualString, lang: Lang): string {
  return field[lang];
}