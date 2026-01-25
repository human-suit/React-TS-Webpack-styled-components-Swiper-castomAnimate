export interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface TimelinePeriod {
  id: number;
  label: string;
  events: TimelineEvent[];
}
