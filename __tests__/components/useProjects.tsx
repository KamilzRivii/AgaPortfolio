import { renderHook, waitFor } from '@testing-library/react';
import { useProjects } from '@/hooks/useProjects';
import { collection, onSnapshot } from 'firebase/firestore';

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  onSnapshot: jest.fn(),
}));

const mockProjects = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Description 1',
    imageUrl: '/image1.png',
    technologies: ['Power BI'],
    category: 'BI',
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'Description 2',
    imageUrl: '/image2.png',
    technologies: ['SQL'],
    category: 'Analytics',
  },
];

describe('useProjects hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial state', () => {
    it('zwraca loading: true na początku', () => {
      (onSnapshot as jest.Mock).mockReturnValue(() => {});

      const { result } = renderHook(() => useProjects());

      expect(result.current.loading).toBe(true);
      expect(result.current.projects).toEqual([]);
      expect(result.current.error).toBe(null);
    });

    it('wywołuje collection z "projects"', () => {
      (onSnapshot as jest.Mock).mockReturnValue(() => {});

      renderHook(() => useProjects());

      expect(collection).toHaveBeenCalledWith({}, 'projects');
    });

    it('wywołuje onSnapshot', () => {
      (onSnapshot as jest.Mock).mockReturnValue(() => {});

      renderHook(() => useProjects());

      expect(onSnapshot).toHaveBeenCalled();
    });
  });

  describe('Success state', () => {
    it('ustawia projects po udanym pobraniu danych', async () => {
      const mockUnsubscribe = jest.fn();
      (onSnapshot as jest.Mock).mockImplementation((collectionRef, onSuccess) => {
        const mockSnapshot = {
          docs: mockProjects.map((project) => ({
            id: project.id,
            data: () => ({ ...project, id: undefined }),
          })),
        };
        onSuccess(mockSnapshot);
        return mockUnsubscribe;
      });

      const { result } = renderHook(() => useProjects());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.projects).toHaveLength(2);
      expect(result.current.error).toBe(null);
    });

    it('mapuje dane Firestore do Project[]', async () => {
      const mockUnsubscribe = jest.fn();
      (onSnapshot as jest.Mock).mockImplementation((collectionRef, onSuccess) => {
        const mockSnapshot = {
          docs: [
            {
              id: 'doc1',
              data: () => ({
                title: 'Test Project',
                description: 'Test Description',
                imageUrl: '/test.png',
                technologies: ['Power BI'],
                category: 'BI',
              }),
            },
          ],
        };
        onSuccess(mockSnapshot);
        return mockUnsubscribe;
      });

      const { result } = renderHook(() => useProjects());

      await waitFor(() => {
        expect(result.current.projects[0]).toEqual({
          id: 'doc1',
          title: 'Test Project',
          description: 'Test Description',
          imageUrl: '/test.png',
          technologies: ['Power BI'],
          category: 'BI',
        });
      });
    });
  });

  describe('Error state', () => {
    it('ustawia error gdy onSnapshot zwróci błąd', async () => {
      const mockError = new Error('Firebase error');
      const mockUnsubscribe = jest.fn();

      (onSnapshot as jest.Mock).mockImplementation(
        (collectionRef, onSuccess, onError) => {
          onError(mockError);
          return mockUnsubscribe;
        }
      );

      const { result } = renderHook(() => useProjects());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(mockError);
      expect(result.current.projects).toEqual([]);
    });

    it('loading jest false po błędzie', async () => {
      const mockUnsubscribe = jest.fn();
      (onSnapshot as jest.Mock).mockImplementation(
        (collectionRef, onSuccess, onError) => {
          onError(new Error('Test error'));
          return mockUnsubscribe;
        }
      );

      const { result } = renderHook(() => useProjects());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('Cleanup', () => {
    it('wywołuje unsubscribe przy unmount', () => {
      const mockUnsubscribe = jest.fn();
      (onSnapshot as jest.Mock).mockReturnValue(mockUnsubscribe);

      const { unmount } = renderHook(() => useProjects());

      unmount();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });

    it('unsubscribe jest wywoływane tylko raz', () => {
      const mockUnsubscribe = jest.fn();
      (onSnapshot as jest.Mock).mockReturnValue(mockUnsubscribe);

      const { unmount, rerender } = renderHook(() => useProjects());

      rerender();
      unmount();

      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('Real-time updates', () => {
    it('aktualizuje projects przy zmianach w Firestore', async () => {
      let snapshotCallback: any;
      const mockUnsubscribe = jest.fn();

      (onSnapshot as jest.Mock).mockImplementation((collectionRef, onSuccess) => {
        snapshotCallback = onSuccess;
        return mockUnsubscribe;
      });

      const { result } = renderHook(() => useProjects());

      snapshotCallback({
        docs: [
          {
            id: '1',
            data: () => ({ title: 'Project 1' }),
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.projects).toHaveLength(1);
      });

      snapshotCallback({
        docs: [
          {
            id: '1',
            data: () => ({ title: 'Project 1' }),
          },
          {
            id: '2',
            data: () => ({ title: 'Project 2' }),
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.projects).toHaveLength(2);
      });
    });
  });
});