import Geography from "@/components/screens/geography/Geography";
import PageLoading from "../components/UI/loading/page-loading/PageLoading"
import { Univer } from "@/interfaces/univer.interface";
import { UniverService } from "@/services/universities.service";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

interface GeographyPageProps {
  universities: Univer[];
}

const GeographyPage: NextPage<GeographyPageProps> = ({ universities }) => {
  return (
    <>
      <Head>
        <title>География университетов</title>
        <meta name="description" content="Карта университетов Казахстана с отображением расположения каждого университета. При клике на метку появляется карточка с информацией о выбранном университете, включая его название, адрес и другие детали. Исследуйте университеты Казахстана на карте и найдите подробную информацию о каждом из них." />
      </Head>
      <Geography universities={universities} />
    </>
  )
}

export const getStaticProps: GetStaticProps<GeographyPageProps> = async () => {
  const universities = await UniverService.getAll();

  return {
    props: {
      universities
    },
    revalidate: 60
  }
}

export default GeographyPage;