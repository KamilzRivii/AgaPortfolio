export interface Project {
  id?: string; 
  img: string;
  title: string;
  descriptionMain: string;
  descriptionModal?: string;
  tech?: string;
  images?: string[];
  features?: string[];
  results?: string;
  target?: string;
  date?: string;
}

export interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}