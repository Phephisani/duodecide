export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Couple {
  coupleId: string;
  partner1Id: string;
  partner2Id: string;
  createdAt: Date;
  coupleCode: string;
  status: 'pending' | 'active';
}

export interface DateSession {
  sessionId: string;
  coupleId: string;
  initiatedBy: string;
  status: 'pending' | 'active' | 'completed';
  currentStep: 'mood' | 'constraints' | 'activity' | 'cuisine' | 'results';
  mood: {
    partner1: string | null;
    partner2: string | null;
    agreed: boolean;
  };
  constraints: {
    timeAvailable: number;
    budget: '$' | '' | '$';
    maxDistance: number;
    timeOfDay: string;
  };
  results: DateIdea[];
}

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  venueId: string;
  matchScore: number;
  estimatedCost: number;
  duration: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  category: 'travel' | 'food' | 'lifestyle' | 'romance' | 'dealbreakers' | 'bucketlist';
  questionText: string;
  emoji: string;
  weight: number;
}

export interface GameSession {
  gameId: string;
  coupleId: string;
  gameType: 'duel' | 'hotseat';
  status: 'waiting' | 'active' | 'completed';
  options?: {
    optionA: string;
    optionB: string;
    suggestedBy: string;
  };
  votes?: {
    partner1: 'A' | 'B' | null;
    partner2: 'A' | 'B' | null;
  };
  winner?: 'A' | 'B' | 'tie';
}

export type Mood = 'adventurous' | 'relaxed' | 'romantic' | 'funny' | 'active';
