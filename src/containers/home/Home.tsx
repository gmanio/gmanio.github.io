import type { NextPage } from 'next';
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

type SEASON = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
type SEASON_PERIOD = { [key in SEASON]: [string, string] };

const Home: NextPage = () => {
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

  return (
    <BasePage>
      <Head>
        <title>GmanIO</title>
      </Head>
      <PageContainer>
        <ContentContainer>
          <ImageDescription>
            <TypedIntro text={['Time flies', 'like an arrow', 'Gman says']} />
          </ImageDescription
          <ImageDescription className='text-5xl'>{preSeason} is comming.</ImageDescription>
          {/* <BackgroundImageWrapper>
            <DwarfImage src="/bg_dwarf.png" alt="me" />
          </BackgroundImageWrapper> */}
        </ContentContainer>
      </PageContainer>
    </BasePage>
  );
};

export default Home;
