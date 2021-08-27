import type { NextPage } from "next";
import Head from "next/head";

import {
  BasePage,
  PageContainer,
  ContentContainer,
  BackgroundImageWrapper,
  DwarfImage,
} from "./style";

const Home: NextPage = () => {
  return (
    <BasePage>
      <Head>
        <title>GmanIO</title>
      </Head>
      <PageContainer>
        <ContentContainer>
          <BackgroundImageWrapper>
            <DwarfImage src="/bg_dwarf.png" alt="me" />
          </BackgroundImageWrapper>
        </ContentContainer>
      </PageContainer>
    </BasePage>
  );
};

export default Home;
