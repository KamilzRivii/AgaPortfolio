import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectsSlider } from '@/components/projects/ProjectsSlider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Project } from '@/types/project';

// Mock Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: any) => (
    <div data-testid="swiper" {...props}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: 'Navigation',
  Pagination: 'Pagination',
  Autoplay: 'Autoplay',
}));

jest.mock('@/components/projects/ProjectCard', () => ({
  ProjectCard: ({ project, onClick }: any) => (
    <button
      data-testid={`project-card-${project.id}`}
      onClick={() => onClick(project)}
    >
      {project.title}
    </button>
  ),
}));

jest.mock('@/constants/layout', () => ({
  LAYOUT_CONSTANTS: {
    PROJECTS: {
      SLIDER_HEIGHT: 460,
    },
  },
}));

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project 1',
    descriptionMain: 'Description 1',
    img: '/image1.png',
  },
  {
    id: '2',
    title: 'Project 2',
    descriptionMain: 'Description 2',
    img: '/image2.png',
  },
  {
    id: '3',
    title: 'Project 3',
    descriptionMain: 'Description 3',
    img: '/image3.png',
  },
];

const theme = createTheme();

describe('ProjectsSlider', () => {
  const mockOnProjectClick = jest.fn();

  beforeEach(() => {
    mockOnProjectClick.mockClear();
  });

  describe('Renderowanie', () => {
    it('renderuje komponent Swiper', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('swiper')).toBeInTheDocument();
    });

    it('renderuje wszystkie projekty jako SwiperSlide', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      const slides = screen.getAllByTestId('swiper-slide');
      expect(slides).toHaveLength(3);
    });

    it('renderuje ProjectCard dla każdego projektu', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-3')).toBeInTheDocument();
    });

    it('wyświetla tytuły wszystkich projektów', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
      expect(screen.getByText('Project 3')).toBeInTheDocument();
    });
  });

  describe('Kliknięcie w projekt', () => {
    it('wywołuje onProjectClick po kliknięciu w ProjectCard', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      const projectCard = screen.getByTestId('project-card-1');
      fireEvent.click(projectCard);

      expect(mockOnProjectClick).toHaveBeenCalledWith(mockProjects[0]);
    });

    it('przekazuje poprawny projekt do onProjectClick', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      const projectCard2 = screen.getByTestId('project-card-2');
      fireEvent.click(projectCard2);

      expect(mockOnProjectClick).toHaveBeenCalledWith(mockProjects[1]);
      expect(mockOnProjectClick).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '2',
          title: 'Project 2',
        })
      );
    });

    it('obsługuje kliknięcie dla każdego projektu', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      mockProjects.forEach((project, index) => {
        const card = screen.getByTestId(`project-card-${project.id}`);
        fireEvent.click(card);
        expect(mockOnProjectClick).toHaveBeenNthCalledWith(index + 1, project);
      });
    });
  });

  describe('Edge cases', () => {
    it('renderuje się z pustą tablicą projektów', () => {
      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={[]} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('swiper')).toBeInTheDocument();
      const slides = screen.queryAllByTestId('swiper-slide');
      expect(slides).toHaveLength(0);
    });

    it('renderuje się z jednym projektem', () => {
      const singleProject = [mockProjects[0]];

      render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={singleProject} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      const slides = screen.getAllByTestId('swiper-slide');
      expect(slides).toHaveLength(1);
    });
  });

  describe('Styling i layout', () => {
    it('renderuje Box jako kontener główny', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ProjectsSlider projects={mockProjects} onProjectClick={mockOnProjectClick} />
        </ThemeProvider>
      );

      const box = container.querySelector('[class*="MuiBox"]');
      expect(box).toBeInTheDocument();
    });
  });
});
