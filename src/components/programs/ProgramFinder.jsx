import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Users, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const sports = [
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'yoga', name: 'Yoga & Fitness', icon: '🧘' },
  { id: 'baseball', name: 'Baseball', icon: '⚾' },
];

const ageGroups = [
  { id: 'youth', name: 'Youth (6-12 years)', range: '6-12' },
  { id: 'junior', name: 'Junior (13-17 years)', range: '13-17' },
  { id: 'adult', name: 'Adult (18-35 years)', range: '18-35' },
  { id: 'senior', name: 'Senior (35+ years)', range: '35+' },
];

const skillLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to the sport' },
  { id: 'intermediate', name: 'Intermediate', description: '1-3 years experience' },
  { id: 'advanced', name: 'Advanced', description: '3+ years experience' },
  { id: 'elite', name: 'Elite', description: 'Competitive player' },
];

const programDatabase = {
  cricket: {
    youth: {
      beginner: {
        name: 'Junior Cricket Foundation',
        price: '$149/month',
        duration: '46 weeks/year',
        schedule: 'Tue & Thu 4-6 PM, Sat 10 AM-12 PM',
        focus: ['Basic batting & bowling', 'Fun drills & games', 'Fundamentals & rules'],
        groupSize: '10-12 kids',
        coach: 'Amanda Roberts',
      },
      intermediate: {
        name: 'Youth Cricket Development',
        price: '$179/month',
        duration: '46 weeks/year',
        schedule: 'Mon, Wed & Sat 4-6 PM',
        focus: ['Advanced techniques', 'Match strategies', 'Fitness training'],
        groupSize: '8-10 kids',
        coach: 'David Williams',
      },
      advanced: {
        name: 'Junior Elite Program',
        price: '$229/month',
        duration: '46 weeks/year',
        schedule: '5 days/week + Weekend matches',
        focus: ['Professional techniques', 'Tournament preparation', 'Mental conditioning'],
        groupSize: '6-8 kids',
        coach: 'Rajesh Kumar',
      },
    },
    junior: {
      beginner: {
        name: 'Teen Cricket Starter',
        price: '$169/month',
        duration: '46 weeks/year',
        schedule: 'Tue, Thu & Sat 5-7 PM',
        focus: ['Core skills development', 'Team play', 'Fitness basics'],
        groupSize: '10-12 teens',
        coach: 'David Williams',
      },
      intermediate: {
        name: 'Junior Competitive Cricket',
        price: '$199/month',
        duration: '46 weeks/year',
        schedule: 'Mon-Thu 5-7 PM, Sat matches',
        focus: ['Advanced batting & bowling', 'Match tactics', 'Performance analysis'],
        groupSize: '8-10 teens',
        coach: 'Rajesh Kumar',
      },
      advanced: {
        name: 'Provincial Prep Program',
        price: '$279/month',
        duration: '46 weeks/year',
        schedule: '5 days/week + matches',
        focus: ['Elite training', 'Provincial trials prep', 'Video analysis'],
        groupSize: '6-8 teens',
        coach: 'Rajesh Kumar',
      },
      elite: {
        name: 'Representative Cricket Academy',
        price: '$349/month',
        duration: 'Year-round',
        schedule: 'Daily training + tournaments',
        focus: ['Professional preparation', 'Tournament circuit', 'Sponsorship guidance'],
        groupSize: '4-6 teens',
        coach: 'Rajesh Kumar',
      },
    },
    adult: {
      beginner: {
        name: 'Adult Cricket Basics',
        price: '$159/month',
        duration: '40 weeks/year',
        schedule: 'Wed & Fri 7-9 PM, Sun 9-11 AM',
        focus: ['Fundamentals', 'Recreational play', 'Fitness & fun'],
        groupSize: '12-15 adults',
        coach: 'David Williams',
      },
      intermediate: {
        name: 'Adult Competitive Cricket',
        price: '$189/month',
        duration: '40 weeks/year',
        schedule: 'Tue, Thu & Sun 7-9 PM',
        focus: ['Advanced techniques', 'League preparation', 'Match play'],
        groupSize: '10-12 adults',
        coach: 'Rajesh Kumar',
      },
      advanced: {
        name: 'Premier League Training',
        price: '$249/month',
        duration: 'Year-round',
        schedule: 'Mon-Thu 7-9 PM + weekend matches',
        focus: ['Elite skills', 'League cricket', 'Performance optimization'],
        groupSize: '8-10 adults',
        coach: 'Rajesh Kumar',
      },
    },
    senior: {
      beginner: {
        name: 'Senior Cricket Social',
        price: '$139/month',
        duration: '35 weeks/year',
        schedule: 'Wed & Sat 10 AM-12 PM',
        focus: ['Gentle introduction', 'Social cricket', 'Fitness & wellness'],
        groupSize: '12-15 seniors',
        coach: 'David Williams',
      },
      intermediate: {
        name: 'Masters Cricket Program',
        price: '$169/month',
        duration: '40 weeks/year',
        schedule: 'Tue, Thu & Sun 10 AM-12 PM',
        focus: ['Technique refinement', 'Veterans leagues', 'Fitness maintenance'],
        groupSize: '10-12 seniors',
        coach: 'Rajesh Kumar',
      },
    },
  },
  yoga: {
    youth: {
      beginner: {
        name: 'Kids Yoga & Movement',
        price: '$99/month',
        duration: '40 weeks/year',
        schedule: 'Mon & Wed 4-5 PM',
        focus: ['Basic poses', 'Flexibility games', 'Mindfulness for kids'],
        groupSize: '12-15 kids',
        coach: 'Sarah Thompson',
      },
    },
    junior: {
      beginner: {
        name: 'Teen Athletic Yoga',
        price: '$119/month',
        duration: '40 weeks/year',
        schedule: 'Tue & Thu 5-6:30 PM',
        focus: ['Sports-specific stretches', 'Stress management', 'Performance yoga'],
        groupSize: '10-12 teens',
        coach: 'Sarah Thompson',
      },
      intermediate: {
        name: 'Teen Performance Yoga',
        price: '$139/month',
        duration: '46 weeks/year',
        schedule: 'Mon, Wed & Fri 5-6:30 PM',
        focus: ['Advanced poses', 'Injury prevention', 'Mental training'],
        groupSize: '8-10 teens',
        coach: 'Sarah Thompson',
      },
    },
    adult: {
      beginner: {
        name: 'Adult Yoga Foundation',
        price: '$129/month',
        duration: '46 weeks/year',
        schedule: 'Mon, Wed & Fri 6:30-8 AM or 7-8:30 PM',
        focus: ['Basic asanas', 'Breathing techniques', 'Stress relief'],
        groupSize: '15-20 adults',
        coach: 'Sarah Thompson',
      },
      intermediate: {
        name: 'Sports Performance Yoga',
        price: '$149/month',
        duration: '46 weeks/year',
        schedule: 'Mon-Fri 6:30-8 AM or 7-8:30 PM',
        focus: ['Athletic flexibility', 'Core strength', 'Recovery techniques'],
        groupSize: '12-15 adults',
        coach: 'Sarah Thompson',
      },
      advanced: {
        name: 'Advanced Yoga & Meditation',
        price: '$169/month',
        duration: 'Year-round',
        schedule: 'Daily classes available',
        focus: ['Advanced asanas', 'Deep meditation', 'Teaching preparation'],
        groupSize: '8-10 adults',
        coach: 'Sarah Thompson',
      },
    },
    senior: {
      beginner: {
        name: 'Senior Gentle Yoga',
        price: '$109/month',
        duration: '46 weeks/year',
        schedule: 'Mon, Wed & Fri 10-11 AM',
        focus: ['Gentle stretches', 'Balance & stability', 'Pain management'],
        groupSize: '12-15 seniors',
        coach: 'Sarah Thompson',
      },
      intermediate: {
        name: 'Senior Wellness Yoga',
        price: '$129/month',
        duration: '46 weeks/year',
        schedule: 'Mon-Fri 10-11 AM',
        focus: ['Flexibility', 'Strength building', 'Mind-body wellness'],
        groupSize: '10-12 seniors',
        coach: 'Sarah Thompson',
      },
    },
  },
  baseball: {
    youth: {
      beginner: {
        name: 'T-Ball & Baseball Basics',
        price: '$139/month',
        duration: '36 weeks/year',
        schedule: 'Wed & Sat 4-6 PM',
        focus: ['Throwing & catching', 'Hitting basics', 'Game fundamentals'],
        groupSize: '10-12 kids',
        coach: 'Michael Chen',
      },
      intermediate: {
        name: 'Youth Baseball Development',
        price: '$169/month',
        duration: '40 weeks/year',
        schedule: 'Mon, Wed & Sat 4-6 PM',
        focus: ['Pitching basics', 'Batting technique', 'Position play'],
        groupSize: '8-10 kids',
        coach: 'Michael Chen',
      },
    },
    junior: {
      beginner: {
        name: 'Teen Baseball Fundamentals',
        price: '$159/month',
        duration: '40 weeks/year',
        schedule: 'Tue, Thu & Sat 5-7 PM',
        focus: ['Core skills', 'Team strategies', 'Physical conditioning'],
        groupSize: '10-12 teens',
        coach: 'Michael Chen',
      },
      intermediate: {
        name: 'Junior Competitive Baseball',
        price: '$189/month',
        duration: '44 weeks/year',
        schedule: 'Mon-Thu 5-7 PM + weekend games',
        focus: ['Advanced pitching', 'Power hitting', 'Game situations'],
        groupSize: '8-10 teens',
        coach: 'Michael Chen',
      },
      advanced: {
        name: 'High School Prep Program',
        price: '$239/month',
        duration: 'Year-round',
        schedule: '5 days/week + games',
        focus: ['College prep', 'Showcase training', 'Recruitment guidance'],
        groupSize: '6-8 teens',
        coach: 'Michael Chen',
      },
    },
    adult: {
      beginner: {
        name: 'Adult Baseball Recreation',
        price: '$149/month',
        duration: '32 weeks/year',
        schedule: 'Wed & Sun 7-9 PM',
        focus: ['Recreational play', 'League basics', 'Fun & fitness'],
        groupSize: '12-15 adults',
        coach: 'Michael Chen',
      },
      intermediate: {
        name: 'Adult League Baseball',
        price: '$179/month',
        duration: '36 weeks/year',
        schedule: 'Tue, Thu & Sun 7-9 PM',
        focus: ['League preparation', 'Skill refinement', 'Team tactics'],
        groupSize: '10-12 adults',
        coach: 'Michael Chen',
      },
    },
  },
};

export default function ProgramFinder() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    sport: '',
    ageGroup: '',
    skillLevel: '',
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleSelection = (field, value) => {
    setSelections(prev => ({ ...prev, [field]: value }));
  };

  const findProgram = () => {
    const { sport, ageGroup, skillLevel } = selections;
    
    // Get the recommended program
    const program = programDatabase[sport]?.[ageGroup]?.[skillLevel];
    
    if (program) {
      setRecommendation({
        ...program,
        sport: sports.find(s => s.id === sport)?.name,
        ageGroup: ageGroups.find(a => a.id === ageGroup)?.name,
        skillLevel: skillLevels.find(s => s.id === skillLevel)?.name,
      });
      setStep(4);
    }
  };

  const reset = () => {
    setStep(1);
    setSelections({ sport: '', ageGroup: '', skillLevel: '' });
    setRecommendation(null);
  };

  return (
    <div className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl p-8 md:p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-2xl mb-4">
          <Search className="w-8 h-8 text-[#0A1F0A]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Program Finder</h2>
        <p className="text-gray-400">Answer a few questions to find your perfect training program</p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-16 rounded-full transition-all ${
                step >= s ? 'bg-[#D4AF37]' : 'bg-[#2D6A4F]/30'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Sport Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#D4AF37]" />
              Which sport are you interested in?
            </h3>
            <RadioGroup value={selections.sport} onValueChange={(value) => handleSelection('sport', value)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sports.map((sport) => (
                  <div
                    key={sport.id}
                    onClick={() => handleSelection('sport', sport.id)}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                      selections.sport === sport.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#2D6A4F]/50 hover:border-[#40916C]'
                    }`}
                  >
                    <RadioGroupItem value={sport.id} className="sr-only" />
                    <div className="text-center">
                      <div className="text-4xl mb-3">{sport.icon}</div>
                      <p className="text-white font-semibold">{sport.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <Button
              onClick={() => setStep(2)}
              disabled={!selections.sport}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full py-6 disabled:opacity-50"
            >
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Age Group */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              What's your age group?
            </h3>
            <RadioGroup value={selections.ageGroup} onValueChange={(value) => handleSelection('ageGroup', value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ageGroups.map((age) => (
                  <div
                    key={age.id}
                    onClick={() => handleSelection('ageGroup', age.id)}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                      selections.ageGroup === age.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#2D6A4F]/50 hover:border-[#40916C]'
                    }`}
                  >
                    <RadioGroupItem value={age.id} className="sr-only" />
                    <p className="text-white font-semibold">{age.name}</p>
                    <p className="text-[#40916C] text-sm mt-1">{age.range} years old</p>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 border-[#40916C] text-[#40916C] rounded-full py-6"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selections.ageGroup}
                className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full py-6 disabled:opacity-50"
              >
                Continue <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Skill Level */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              What's your skill level?
            </h3>
            <RadioGroup value={selections.skillLevel} onValueChange={(value) => handleSelection('skillLevel', value)}>
              <div className="grid grid-cols-1 gap-4">
                {skillLevels.map((level) => (
                  <div
                    key={level.id}
                    onClick={() => handleSelection('skillLevel', level.id)}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                      selections.skillLevel === level.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#2D6A4F]/50 hover:border-[#40916C]'
                    }`}
                  >
                    <RadioGroupItem value={level.id} className="sr-only" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{level.name}</p>
                        <p className="text-gray-400 text-sm mt-1">{level.description}</p>
                      </div>
                      {selections.skillLevel === level.id && (
                        <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 border-[#40916C] text-[#40916C] rounded-full py-6"
              >
                Back
              </Button>
              <Button
                onClick={findProgram}
                disabled={!selections.skillLevel}
                className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full py-6 disabled:opacity-50"
              >
                Find My Program <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Recommendation */}
        {step === 4 && recommendation && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-2xl mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Perfect Match Found!</h3>
              <p className="text-gray-400">Based on your selections, we recommend:</p>
            </div>

            <div className="bg-[#0A1F0A] rounded-2xl p-6 border border-[#D4AF37]/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-white">{recommendation.name}</h4>
                  <p className="text-[#40916C] mt-1">
                    {recommendation.sport} • {recommendation.ageGroup} • {recommendation.skillLevel}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#D4AF37]">{recommendation.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-[#1A4D2E]/30 rounded-lg">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-white text-sm font-medium">Schedule</p>
                    <p className="text-gray-400 text-xs">{recommendation.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#1A4D2E]/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-white text-sm font-medium">Duration</p>
                    <p className="text-gray-400 text-xs">{recommendation.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#1A4D2E]/30 rounded-lg">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-white text-sm font-medium">Group Size</p>
                    <p className="text-gray-400 text-xs">{recommendation.groupSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#1A4D2E]/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-white text-sm font-medium">Lead Coach</p>
                    <p className="text-gray-400 text-xs">{recommendation.coach}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white font-semibold mb-3">Training Focus:</p>
                <div className="grid grid-cols-1 gap-2">
                  {recommendation.focus.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#40916C]" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={reset}
                  variant="outline"
                  className="flex-1 border-[#40916C] text-[#40916C] rounded-full py-6"
                >
                  Start Over
                </Button>
                <Link to={createPageUrl('Registration')} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full py-6">
                    Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}