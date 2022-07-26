import Head from 'next/head';
import moment from 'moment';
import {
  BasePage,
  PageContainer,
  ContentContainer,
  // BackgroundImageWrapper,
  // DwarfImage,
  ImageDescription,
} from './style';
import { getCurrentYear } from '../../utils/date';
import TypedIntro from '../../components/TypedIntro';
import { useContext } from 'react';
import { HomeContext } from '../../providers/HomeProvider';
import Typed from 'typed.js';

type SEASON = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
type SEASON_PERIOD = { [key in SEASON]: [string, string] };

const HomePage = () => {
  const [homeContext, setHomeContext] = useContext(HomeContext);
  const season: SEASON_PERIOD = {
    Spring: ['12-23', '03-21'],
    Summer: ['03-22', '06-21'],
    Autumn: ['06-22', '09-22'],
    Winter: ['09-23', '12-22'],
  };

  const year = getCurrentYear();
  const currentDate = moment().format('YYYY-MM-DD');

  const preSeason = Object.entries(season).map(([key, value]) => {
    const prevDate = moment(`${year}-${value[0]}`);
    const nextDate = moment(`${year}-${value[1]}`);

    if (moment(currentDate).isBetween(prevDate, nextDate)) {
      return key;
    }
  });

  const handleCompletePhase1 = (self: any) => {
    setHomeContext({
      isPhase1TypeCompleted: true,
    });
    if (self && self.cursor) {
      self.cursor.remove();
    }
  };

  const handleCompletePhase2 = (self: any) => {
    setHomeContext({
      isPhase2TypeCompleted: true,
    });
    if (self && self.cursor) {
      self.cursor.remove();
    }
  };

  return (
    <BasePage>
      <Head>
        <title>GmanIO</title>
      </Head>
      <PageContainer>
        <ContentContainer>
          <ImageDescription>
            <TypedIntro text={['Time flies like an arrow.', 'What will happen to me.']} onComplete={handleCompletePhase1} />
          </ImageDescription>
          {homeContext.isPhase1TypeCompleted && (
            <ImageDescription className={`text-5xl ${homeContext.isPhase1TypeCompleted ? 'opacity-1' : 'opacity-0'}`}>
              <TypedIntro text={['There is a Flamingo.', 'Flamingo says']} onComplete={handleCompletePhase2} />
            </ImageDescription>
          )}
          <ImageDescription className={`text-5xl ${homeContext.isPhase2TypeCompleted ? 'opacity-1' : 'opacity-0'}`}>
            {preSeason} is comming.
          </ImageDescription>
          {/* <BackgroundImageWrapper>
            <DwarfImage src="/bg_dwarf.png" alt="me" />
          </BackgroundImageWrapper> */}
        </ContentContainer>
      </PageContainer>
    </BasePage>
  );
};

export default HomePage;
