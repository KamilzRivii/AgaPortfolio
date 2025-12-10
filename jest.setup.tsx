import '@testing-library/jest-dom';

// Mock dla Next/Image
jest.mock('next/image', () => {
  return function MockedImage(props: any) {
    const { fill, ...rest } = props;
    return <img {...rest} />;
  };
});




