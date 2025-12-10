import { Box } from '@mui/material';
import { SkillCategory as SkillCategoryType } from '@/constants/resume';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SkillCard } from './SkillCard';

type SkillCategoryProps = {
  category: SkillCategoryType;
  showTitle?: boolean;
};

export const SkillCategory = ({ category, showTitle = true }: SkillCategoryProps) => (
  <Box>
    {showTitle && (
      <SectionTitle
        sx={{
          mb: 3,
          minWidth: { xs: '100%', md: 270 },
          display: { xs: 'inline-block', lg: 'none', xxl: 'inline-block' },
        }}
      >
        {category.title}
      </SectionTitle>
    )}

    <Box
      sx={(theme) => ({
        display: 'flex',
        gap: 2,
        mb: 5,
        [theme.breakpoints.down('xxl')]: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          mb: 2,
          gap: 1,
        },
        [theme.breakpoints.down('md')]: {
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: 3,
        },
      })}
    >
      {category.skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </Box>
  </Box>
);