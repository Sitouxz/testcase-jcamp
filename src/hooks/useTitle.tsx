import { useEffect } from 'react';
import { useNavigationTitle } from '../context/NavigationContext';

const useTitle = (
  desktopTitle: string,
  tabletTitle: string,
  mobileTitle: string
) => {
  const { setNavigationTitle } = useNavigationTitle() as any;
  useEffect(() => {
    // Function to update the title based on screen size
    const updateTitle = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const isTablet = window.matchMedia(
        '(min-width: 768px) and (max-width: 1023px)'
      ).matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      if (isDesktop) {
        setNavigationTitle(desktopTitle);
      } else if (isTablet) {
        setNavigationTitle(tabletTitle);
      } else if (isMobile) {
        setNavigationTitle(mobileTitle);
      }
    };

    // Set the title on initial render
    updateTitle();

    // Add event listener to handle screen size changes
    window.addEventListener('resize', updateTitle);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateTitle);
      setNavigationTitle('Default Title'); // Optionally reset title on unmount
    };
  }, [desktopTitle, tabletTitle, mobileTitle, setNavigationTitle]);
};

export default useTitle;
