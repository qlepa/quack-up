import { WorkMode } from './types';

export const workModes: WorkMode[] = [
  {
    id: 'echo',
    name: 'Echo',
    description: 'Repeat and rephrase the user\'s statements to reveal inconsistencies.',
    instructions: 'Repeat and rephrase the user\'s statements to reveal inconsistencies.',
    temperature: 0.7,
  },
  {
    id: 'questioner',
    name: 'Questioner',
    description: 'Ask short, open-ended questions to clarify thinking.',
    instructions: 'Ask short, open-ended questions to clarify thinking.',
    temperature: 0.6,
  },
  {
    id: 'stepByStep',
    name: 'Step by Step',
    description: 'Break down the problem into smaller steps and guide through them.',
    instructions: 'Break down the problem into smaller steps and guide through them.',
    temperature: 0.4,
    maxTokens: 2000,
  },
  {
    id: 'brainstorm',
    name: 'Brainstorm',
    description: 'Suggest creative alternative perspectives.',
    instructions: 'Suggest creative alternative perspectives.',
    temperature: 0.8,
  }
];

export function getWorkModeById(id: string): WorkMode | undefined {
  return workModes.find(mode => mode.id === id);
}
