import BarChartIcon from '@mui/icons-material/BarChart';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import { Skill, ValueProposition } from '@/types/about';

export const SKILLS: Skill[] = [
  {
    id: 'dashboards',
    icon: <BarChartIcon sx={{ fontSize: 64 }} />,
    title: 'Interactive Dashboards',
    description: 'I create clear, user‑friendly dashboards in Power BI that turn complex data into actionable insights.',
  },
  {
    id: 'modeling',
    icon: <DataObjectIcon sx={{ fontSize: 64 }} />,
    title: 'Data Modeling & Transformation',
    description: 'I design robust data models, clean raw datasets, and build relationships that make reporting efficient and scalable.',
  },
  {
    id: 'sql-dax',
    icon: <StorageIcon sx={{ fontSize: 64 }} />,
    title: 'SQL & DAX Expertise',
    description: 'I write optimized SQL queries and advanced DAX measures to deliver accurate, dynamic analytics.',
  },
];

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  { id: 'dashboards', label: 'Dashboards', value: 'Better decisions' },
  { id: 'models', label: 'Data Models', value: 'Data clarity' },
  { id: 'insights', label: 'Insights', value: 'Smarter reporting' },
  { id: 'sql-dax', label: 'SQL & DAX', value: 'Accurate analytics' },
];