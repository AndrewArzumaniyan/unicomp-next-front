import UniverMarket from "@/components/screens/univer-market/UniverMarket"
import { UniverData } from "@/interfaces/univer.interface";
import { UniverService } from "@/services/universities.service";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

const UniverMarketPage: NextPage<UniverData> = ({ universities }) => {
  return (
    <>
      <Head>
        <title>Каталог университетов</title>
        <meta name="description" content="Каталог университетов Казахстана представляет полный список университетов в виде карточек с возможностью фильтрации по категориям и использования поиска. Просматривайте университеты, находите интересующие вас по направлению обучения или местоположению. Подробная информация о каждом университете доступна при клике на соответствующую карточку в модальном окне. Найдите подходящий университет для вашего образования в Казахстане." />
      </Head>
      <UniverMarket universities={universities} />
    </>
  )
  
}

export const getStaticProps: GetStaticProps<UniverData> = async () => {
  const universities = await UniverService.getAll();

  return {
    props: {
      universities
    },
    revalidate: 60
  }
}

export default UniverMarketPage;