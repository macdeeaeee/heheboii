import { Exercise, Program, ExerciseType, Category, Difficulty, Persona, Look } from './types';

// Comprehensive exercise database based on NIH/Healthline/Harvard Health guidance
export const EXERCISES: Record<string, Exercise> = {
  // WARM UP
  'neck-circles': {
    id: 'neck-circles',
    title: 'Neck Rotations',
    description: 'Slow, controlled circles to warm up the cervical spine.',
    instructions: [
      'Relax your shoulders down.',
      'Slowly drop your chin to your chest.',
      'Rotate your head to the right, back, left, and down.',
      'Keep movements smooth, do not force ranges.'
    ],
    durationSeconds: 45,
    type: ExerciseType.TIMER,
    category: Category.WARMUP,
    animationType: 'neck-tilt',
    safetyNote: 'Stop immediately if you feel pinching or dizziness.'
  },
  'shoulder-rolls': {
    id: 'shoulder-rolls',
    title: 'Shoulder Rolls',
    description: 'Releases tension in the trapezius muscles before posture work.',
    instructions: [
      'Lift shoulders up towards ears.',
      'Roll them back and down, squeezing shoulder blades.',
      'Focus on the downward movement.'
    ],
    targetReps: 15,
    type: ExerciseType.REPS,
    category: Category.WARMUP,
    animationType: 'chin-tuck', // Using similar vertical alignment motion
  },

  // JAWLINE & MEWING
  'mew-basic': {
    id: 'mew-basic',
    title: 'Suction Hold',
    description: 'The core mewing technique. Creates a vacuum to hold the tongue against the palate.',
    instructions: [
      'Say the word "SING" and hold the "NG" position.',
      'Ensure the back third of the tongue is engaged against the roof.',
      'Close lips, breathe through nose.',
      'Create a suction seal.'
    ],
    durationSeconds: 60,
    type: ExerciseType.TIMER,
    category: Category.MEWING,
    animationType: 'tongue-press',
    safetyNote: 'Do not clench your teeth. Teeth should lightly touch or hover.'
  },
  'jaw-jut': {
    id: 'jaw-jut',
    title: 'Jaw Jut Hold',
    description: 'Strengthens the jawline and stretches the submental area.',
    instructions: [
      'Keep your head level.',
      'Push your lower jaw forward comfortably.',
      'Lift your lower lip over your upper lip.',
      'Hold the tension.'
    ],
    durationSeconds: 30,
    type: ExerciseType.TIMER,
    category: Category.JAWLINE,
    animationType: 'jaw-release',
    safetyNote: 'Avoid if you have TMJ clicking/pain.'
  },
  'tongue-chew': {
    id: 'tongue-chew',
    title: 'Tongue Chewing',
    description: 'Strengthens the tongue for better resting posture.',
    instructions: [
      'Roll a piece of sugar-free gum into a ball.',
      'Use only your tongue to flatten it against the roof of your mouth.',
      'Spread it out, then gather it back.',
      'Repeat rhythmically.'
    ],
    targetReps: 20,
    type: ExerciseType.REPS,
    category: Category.JAWLINE,
    animationType: 'tongue-press'
  },

  // POSTURE
  'chin-tuck': {
    id: 'chin-tuck',
    title: 'Chin Tucks',
    description: 'The gold standard for correcting Forward Head Posture.',
    instructions: [
      'Stand with back against a wall or sit straight.',
      'Draw your head straight back horizontally.',
      'Imagine a string pulling the crown of your head up.',
      'Hold for 3 seconds, relax.'
    ],
    targetReps: 12,
    type: ExerciseType.REPS,
    category: Category.POSTURE,
    animationType: 'chin-tuck',
    safetyNote: 'Don\'t tilt your chin up or down. Straight back.'
  },
  'neck-flexion': {
    id: 'neck-flexion',
    title: 'Scalene Stretch',
    description: 'Stretches the front neck muscles to reduce forward pull.',
    instructions: [
      'Place hands on your collarbones to anchor skin.',
      'Gently look up and tilt head back.',
      'Feel the stretch in the front of your neck.',
      'Hold and breathe.'
    ],
    durationSeconds: 45,
    type: ExerciseType.TIMER,
    category: Category.POSTURE,
    animationType: 'chin-lift'
  },

  // COOLDOWN / RELAXATION
  'jaw-massage': {
    id: 'jaw-massage',
    title: 'Masseter Massage',
    description: 'Manual release of the large chewing muscles.',
    instructions: [
      'Locate the muscle knot just below your cheekbones.',
      'Use knuckles to gently massage in circular motion.',
      'Open mouth slightly to stretch the muscle.'
    ],
    durationSeconds: 60,
    type: ExerciseType.TIMER,
    category: Category.COOLDOWN,
    animationType: 'jaw-release'
  },
  'neck-side-stretch': {
    id: 'neck-side-stretch',
    title: 'Lateral Neck Release',
    description: 'Final relaxation for neck stiffness.',
    instructions: [
      'Drop right ear to right shoulder.',
      'Extend left arm down towards the floor.',
      'Breathe deeply into the side of the neck.'
    ],
    durationSeconds: 30,
    type: ExerciseType.TIMER,
    category: Category.COOLDOWN,
    animationType: 'neck-tilt'
  }
};

export const PROGRAMS: Program[] = [
  {
    id: 'jawline-starter',
    title: '7-Day Jawline Starter',
    description: 'Activate dormant facial muscles. Focuses on form over intensity.',
    difficulty: Difficulty.BEGINNER,
    durationDays: 7,
    exercises: ['neck-circles', 'mew-basic', 'jaw-jut', 'jaw-massage'],
    colorFrom: 'from-blue-600',
    colorTo: 'to-indigo-500'
  },
  {
    id: 'mewing-habit',
    title: '14-Day Mewing Habit',
    description: 'Train your tongue to rest on the palate automatically. Consistency is key.',
    difficulty: Difficulty.INTERMEDIATE,
    durationDays: 14,
    exercises: ['shoulder-rolls', 'mew-basic', 'tongue-chew', 'chin-tuck', 'jaw-massage'],
    colorFrom: 'from-emerald-600',
    colorTo: 'to-teal-500'
  },
  {
    id: 'posture-reset',
    title: '21-Day Posture Reset',
    description: 'Correct "Tech Neck" and forward head posture for a stronger profile.',
    difficulty: Difficulty.ADVANCED,
    durationDays: 21,
    exercises: ['neck-circles', 'chin-tuck', 'neck-flexion', 'shoulder-rolls', 'neck-side-stretch'],
    colorFrom: 'from-orange-500',
    colorTo: 'to-red-500'
  },
  {
    id: 'desk-daily',
    title: 'Desk Worker Routine',
    description: 'A quick 5-minute break to undo the damage of sitting.',
    difficulty: Difficulty.BEGINNER,
    durationDays: 1, // Infinite loop basically
    exercises: ['shoulder-rolls', 'chin-tuck', 'neck-flexion', 'neck-side-stretch'],
    colorFrom: 'from-slate-600',
    colorTo: 'to-slate-500'
  }
];

export const PERSONAS: Persona[] = [
  {
    id: 'sharp-professional',
    name: 'Sharp & Professional',
    description: 'Clean, polished, and ready for business. Focuses on a strong jawline and perfect posture.',
    habits: ['Maintain mewing posture during meetings', 'Keep shoulders back and down', 'Stay hydrated for skin clarity'],
    tips: ['Keep facial hair neatly trimmed', 'Opt for a classic, structured haircut', 'Invest in well-fitting basics']
  },
  {
    id: 'charismatic',
    name: 'Charismatic',
    description: 'Approachable, confident, and engaging. Focuses on relaxed facial muscles and open body language.',
    habits: ['Practice a relaxed, genuine smile', 'Maintain eye contact', 'Keep neck tension low'],
    tips: ['Use a lightweight styling product for hair', 'Keep lips moisturized', 'Wear colors that complement your skin tone']
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Effortless, simple, and highly groomed. Focuses on clear skin and a defined facial structure.',
    habits: ['Strict daily skincare routine', 'Consistent mewing', 'Frequent water intake'],
    tips: ['Keep hair short or neatly styled back', 'No visible logos on clothing', 'Focus on hygiene above all']
  },
  {
    id: 'street-style',
    name: 'Street Style',
    description: 'Edgy, relaxed, and trend-aware. Focuses on a strong neck and relaxed jaw.',
    habits: ['Neck mobility exercises', 'Relaxed but straight posture', 'Confident gait'],
    tips: ['Experiment with textured hairstyles', 'Layer clothing thoughtfully', 'Keep grooming sharp but not overly perfect']
  },
  {
    id: 'masculine-defined',
    name: 'Masculine Defined',
    description: 'Rugged, strong, and imposing. Focuses heavily on jawline definition and broad shoulders.',
    habits: ['Daily jawline exercises', 'Heavy resistance training for posture', 'High protein intake'],
    tips: ['Allow for some stubble or a well-kept beard', 'Slightly messy but controlled hair', 'Wear fitted, structured clothing']
  },
  {
    id: 'soft-aesthetic',
    name: 'Soft Aesthetic',
    description: 'Gentle, approachable, and well-cared-for. Focuses on facial symmetry and soft features.',
    habits: ['Gentle facial massage', 'Focus on sleep quality for skin', 'Light posture correction'],
    tips: ['Longer, flowing hairstyles', 'Soft, breathable fabrics', 'Focus on a glowing complexion']
  }
];

export const LOOKS: Look[] = [
  {
    id: 'date-ready',
    name: 'Date Ready',
    postureCues: ['Shoulders back and relaxed', 'Chin parallel to the floor', 'Open chest'],
    groomingActions: ['Check breath and teeth', 'Apply light fragrance', 'Tame flyaway hairs'],
    outfitIdea: 'Well-fitted dark jeans, clean minimal sneakers, and a tailored shirt or knitwear.'
  },
  {
    id: 'interview-mode',
    name: 'Interview Mode',
    postureCues: ['Sit up straight, no slouching', 'Keep hands visible and relaxed', 'Maintain steady eye contact'],
    groomingActions: ['Ensure nails are clean and trimmed', 'Hair neatly styled away from face', 'No overpowering cologne'],
    outfitIdea: 'Crisp button-down shirt, tailored trousers, and polished shoes. Add a blazer if appropriate.'
  },
  {
    id: 'casual-confidence',
    name: 'Casual Confidence',
    postureCues: ['Relaxed but upright stance', 'Weight evenly distributed on both feet', 'Head held high'],
    groomingActions: ['Quick face wash', 'Apply moisturizer', 'Run hands through hair for natural texture'],
    outfitIdea: 'High-quality plain t-shirt, comfortable chinos or shorts, and clean everyday sneakers.'
  },
  {
    id: 'gym-clean',
    name: 'Gym Clean Look',
    postureCues: ['Engage core while walking', 'Keep neck aligned with spine', 'Avoid looking down at phone constantly'],
    groomingActions: ['Apply deodorant', 'Tie hair back if long', 'Splash cold water on face'],
    outfitIdea: 'Matching athletic set or clean, unbranded workout gear. Proper athletic shoes.'
  }
];