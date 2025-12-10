import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Projects from '@/app/projects/page';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Project } from '@/types/project';

const mockPathname = '/projects';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

jest.mock('@/components/SideNavigation', () => ({
  __esModule: true,
  default: ({ aboutPhoto }: { aboutPhoto: string }) => (
    <div data-testid="side-navigation">Side Navigation</div>
  ),
}));

jest.mock('@/components/Line', () => ({
  __esModule: true,
  default: () => <div data-testid="line">Line</div>,
}));

jest.mock('@/components/shared/SectionTitle', () => ({
  SectionTitle: ({ children, sx }: any) => (
    <div data-testid="section-title">{children}</div>
  ),
}));

jest.mock('@/components/ProjectModal', () => ({
  __esModule: true,
  default: ({ open, onClose, project }: any) => (
    <div data-testid="project-modal" data-open={open}>
      {project && <div>Project: {project.title}</div>}
      <button onClick={onClose}>Close Modal</button>
    </div>
  ),
}));

jest.mock('@/components/projects/ProjectsSlider', () => ({
  ProjectsSlider: ({ projects, onProjectClick }: any) => (
    <div data-testid="projects-slider">
      {projects.map((project: Project) => (
        <button
          key={project.id}
          data-testid={`project-${project.id}`}
          onClick={() => onProjectClick(project)}
        >
          {project.title}
        </button>
      ))}
    </div>
  ),
}));

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Sales Dashboard',
    descriptionMain: 'Interactive sales analytics',
    img: '/images/project1.png',
  },
  {
    id: '2',
    title: 'Marketing Analytics',
    descriptionMain: 'Campaign performance tracking',
    img: '/images/project2.png',
  },
];

jest.mock('@/hooks/useProjects', () => ({
  useProjects: jest.fn(),
}));

jest.mock('@/constants/layout', () => ({
  LAYOUT_CONSTANTS: {
    PROJECTS: {
      MAX_WIDTH: 700,
      MAX_WIDTH_TABLET: 610,
      MAX_WIDTH_MOBILE: '100%',
      SLIDER_HEIGHT: 460,
      CARD_HEIGHT: 430,
      IMAGE_HEIGHT: 300,
      CONTENT_HEIGHT: 90,
    },
  },
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Projects page', () => {
  beforeEach(() => {
    const { useProjects } = require('@/hooks/useProjects');
    useProjects.mockReturnValue({
      projects: mockProjects,
      loading: false,
      error: null,
    });
  });

  describe('Renderowanie podstawowych komponentów', () => {
    it('renderuje SideNavigation', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByTestId('side-navigation')).toBeInTheDocument();
    });

    it('renderuje Line separator', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByTestId('line')).toBeInTheDocument();
    });

    it('renderuje główny nagłówek "PROJECTS"', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByText('PROJECTS')).toBeInTheDocument();
    });

    it('renderuje nagłówek jako h1', () => {
      const { container } = renderWithTheme(<Projects />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('PROJECTS');
    });

    it('renderuje SectionTitle z tekstem o storytelling', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByText(/Data isn't just numbers — it tells stories/i)).toBeInTheDocument();
    });
  });

  describe('Teksty opisowe', () => {
    it('renderuje opis o transformowaniu danych', () => {
      renderWithTheme(<Projects />);
      const description = screen.getByText(/My projects aim to transform raw information/i);
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('interactive dashboards');
      expect(description).toHaveTextContent('actionable');
    });

    it('renderuje tekst o przykładach projektów', () => {
      renderWithTheme(<Projects />);
      expect(
        screen.getByText(/Here are some examples of my personal projects/i)
      ).toBeInTheDocument();
    });

    it('opis ma border po lewej stronie', () => {
      const { container } = renderWithTheme(<Projects />);
      const description = screen.getByText(/My projects aim to transform/i);
      expect(description).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('wyświetla "Loading projects..." gdy loading = true', () => {
      const { useProjects } = require('@/hooks/useProjects');
      useProjects.mockReturnValue({
        projects: [],
        loading: true,
        error: null,
      });

      renderWithTheme(<Projects />);
      expect(screen.getByText('Loading projects...')).toBeInTheDocument();
    });

    it('nie renderuje ProjectsSlider gdy loading = true', () => {
      const { useProjects } = require('@/hooks/useProjects');
      useProjects.mockReturnValue({
        projects: [],
        loading: true,
        error: null,
      });

      renderWithTheme(<Projects />);
      expect(screen.queryByTestId('projects-slider')).not.toBeInTheDocument();
    });
  });

  describe('Projects data', () => {
    it('renderuje ProjectsSlider z projektami', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByTestId('projects-slider')).toBeInTheDocument();
    });

    it('przekazuje wszystkie projekty do ProjectsSlider', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByTestId('project-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-2')).toBeInTheDocument();
    });

    it('wyświetla tytuły projektów', () => {
      renderWithTheme(<Projects />);
      expect(screen.getByText('Sales Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Marketing Analytics')).toBeInTheDocument();
    });
  });

  describe('Modal functionality', () => {
    it('modal jest domyślnie zamknięty', () => {
      renderWithTheme(<Projects />);
      const modal = screen.getByTestId('project-modal');
      expect(modal).toHaveAttribute('data-open', 'false');
    });

    it('otwiera modal po kliknięciu w projekt', async () => {
      renderWithTheme(<Projects />);

      const projectButton = screen.getByTestId('project-1');
      fireEvent.click(projectButton);

      await waitFor(() => {
        const modal = screen.getByTestId('project-modal');
        expect(modal).toHaveAttribute('data-open', 'true');
      });
    });

    it('wyświetla wybrany projekt w modalu', async () => {
      renderWithTheme(<Projects />);

      const projectButton = screen.getByTestId('project-1');
      fireEvent.click(projectButton);

      await waitFor(() => {
        expect(screen.getByText('Project: Sales Dashboard')).toBeInTheDocument();
      });
    });

    it('zamyka modal po kliknięciu w przycisk zamknięcia', async () => {
      renderWithTheme(<Projects />);

      // Otwórz modal
      const projectButton = screen.getByTestId('project-1');
      fireEvent.click(projectButton);

      await waitFor(() => {
        const modal = screen.getByTestId('project-modal');
        expect(modal).toHaveAttribute('data-open', 'true');
      });

      // Zamknij modal
      const closeButton = screen.getByText('Close Modal');
      fireEvent.click(closeButton);

      await waitFor(() => {
        const modal = screen.getByTestId('project-modal');
        expect(modal).toHaveAttribute('data-open', 'false');
      });
    });
  });

  describe('Layout i struktura', () => {
    it('renderuje główny kontener Box', () => {
      const { container } = renderWithTheme(<Projects />);
      const mainBox = container.querySelector('[class*="MuiBox"]');
      expect(mainBox).toBeInTheDocument();
    });

    it('renderuje wszystkie sekcje w odpowiedniej kolejności', () => {
      renderWithTheme(<Projects />);

      expect(screen.getByTestId('side-navigation')).toBeInTheDocument();
      expect(screen.getByTestId('line')).toBeInTheDocument();
      expect(screen.getByText('PROJECTS')).toBeInTheDocument();
      expect(screen.getByTestId('section-title')).toBeInTheDocument();
      expect(screen.getByTestId('projects-slider')).toBeInTheDocument();
      expect(screen.getByTestId('project-modal')).toBeInTheDocument();
    });
  });

  describe('useProjects hook integration', () => {
    it('wywołuje useProjects hook', () => {
      const { useProjects } = require('@/hooks/useProjects');
      renderWithTheme(<Projects />);
      expect(useProjects).toHaveBeenCalled();
    });

    it('wyświetla puste projekty gdy brak danych', () => {
      const { useProjects } = require('@/hooks/useProjects');
      useProjects.mockReturnValue({
        projects: [],
        loading: false,
        error: null,
      });

      renderWithTheme(<Projects />);
      expect(screen.getByTestId('projects-slider')).toBeInTheDocument();
    });
  });
});