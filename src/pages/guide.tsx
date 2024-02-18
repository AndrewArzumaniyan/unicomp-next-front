import Guide from "@/components/screens/guide/Guide";
import { City } from "@/interfaces/city.interface";
import { CityService } from "@/services/cities.service";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

interface NextPageProps {
  cities: City
}

const GuidePage: NextPage<NextPageProps> = ({ cities }) => {
  return (
    <>
      <Head>
        <title>Гайд по городам</title>
        <meta name="description" content="Гайд по городам для абитуриентов, предоставляющий подробную информацию о жилье, приложениях, ресторанах и развлечениях в различных городах. Незаменимый ресурс для иногородних абитуриентов, ищущих ознакомительную информацию о будущем месте учебы. Узнайте больше о каждом городе, чтобы сделать информированный выбор о своем будущем образовании и жизни." />
      </Head>
      <Guide cities={cities}/>
    </>
  )
}

export const getStaticProps: GetStaticProps<NextPageProps> = async () => {
  const cities = await CityService.getAll();

  return {
    props: {
      cities
    },
    revalidate: 60
  }
}

export default GuidePage;