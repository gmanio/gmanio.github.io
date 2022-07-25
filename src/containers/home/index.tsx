import Home from './Home';
import { HomeProvider } from '../../providers/HomeProvider';

const HomeWrapper = (props: any) => {
  return (
    <HomeProvider>
      <Home {...props} />
    </HomeProvider>
  );
};

export default HomeWrapper;
