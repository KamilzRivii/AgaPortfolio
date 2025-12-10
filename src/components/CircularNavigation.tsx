import { NavigationIcon } from './NavigationIcon';
import { NavItem } from '@/types/navigation';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

type CircularNavigationProps = {
  items: NavItem[];
  currentPath: string;
};

export const CircularNavigation = ({ items, currentPath }: CircularNavigationProps) => {
  const { RADIUS, CENTER_X, CENTER_Y, START_ANGLE, END_ANGLE } = LAYOUT_CONSTANTS.ICON_ORBIT;

  return (
    <>
      {items.map((item, index) => {
        const angle = START_ANGLE + index * ((END_ANGLE - START_ANGLE) / (items.length - 1));
        const x = Math.cos((angle * Math.PI) / 180) * RADIUS;
        const y = Math.sin((angle * Math.PI) / 180) * RADIUS;

        return (
          <NavigationIcon
            key={item.id}
            item={item}
            isActive={currentPath === item.to}
            sx={{
              position: 'absolute',
              left: CENTER_X + x,
              top: CENTER_Y + y,
              transform: 'translate(-50%, -50%)',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.2)',
                backgroundColor: 'black',
              },
            }}
          />
        );
      })}
    </>
  );
};