export interface Message {
  role: 'user' | 'ai';
  content: string;
  context?: Context[];
}

interface Context {
  pageContent: string;
}
