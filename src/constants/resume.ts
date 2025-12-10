export type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
};

export type Skill = {
  id: string;
  title: string;
  description: string;
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'powerbi',
    title: 'Power BI & Business Intelligence',
    skills: [
      {
        id: 'powerbi-expertise',
        title: 'Power BI Expertise',
        description:
          'Advanced dashboard development, interactive reports, and data storytelling. Workspace management, app distribution, scheduled refreshes, deployment pipelines.',
      },
      {
        id: 'dax',
        title: 'DAX',
        description: 'Building complex calculations, measures, and analytical metrics.',
      },
      {
        id: 'data-modeling',
        title: 'Data Modeling & Dataflows',
        description:
          'Designing dimensional models (star schema, snowflake schema). Managing data flows and query optimization.',
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Integration',
    skills: [
      {
        id: 'sql',
        title: 'Strong SQL Proficiency',
        description: 'Advanced queries, data transformations, and optimization.',
      },
      {
        id: 'integration',
        title: 'Data Source Integration',
        description:
          'Connecting Power BI with SQL databases, Excel, cloud services, and a wide range of other data sources.',
      },
      {
        id: 'sas',
        title: 'Statistical Analysis System',
        description:
          'Data analysis and processing of complex datasets to uncover patterns, trends, and actionable insights.',
      },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Tools',
    skills: [
      {
        id: 'python-java',
        title: 'Basic Python & Java',
        description:
          'Experience with Python for automation and data analysis. Familiarity with Java fundamentals and understanding ETL processes.',
      },
      {
        id: 'tableau',
        title: 'Strong Tableau Expertise',
        description:
          'Skilled in building interactive dashboards and visualizations in Tableau, providing flexible business intelligence solutions as a complement or alternative to Power BI.',
      },
      {
        id: 'azure',
        title: 'Azure Boards Experience',
        description:
          'Hands-on experience with Azure Boards for tracking tasks, managing sprints, and facilitating collaboration across teams, ensuring transparency and efficiency in project delivery.',
      },
    ],
  },
];