import { Univer as UniverInterface } from "@/interfaces/univer.interface";
import { UniverService } from "@/services/universities.service";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import PageLoading from "@/components/UI/loading/page-loading/PageLoading";
import Univer from "@/components/screens/univer/Univer";
import Head from "next/head";

interface UniverPageProps {
  university: UniverInterface | null;
}

const UniverPage: NextPage<UniverPageProps> = ({ university }) => {
  const router = useRouter();

  // Показываем индикатор загрузки, пока данные не загрузятся
  if (router.isFallback || university === null) {
    return <PageLoading />;
  }

  // Проверяем, что данные университета загружены и доступны
  if (!university) {
    return <div>По данному университету у нас нет информации</div>;
  }

  return (
    <>
      <Head>
        <title>UNICOMP | {university.visibleName ? university.visibleName : university.name}</title>
        <meta name="description" content={`Изучите подробную информацию об университете ${university.name}: категории, цены, контакты, местоположение на карте и другие важные детали. Узнайте все о предлагаемых программах обучения, услугах и возможностях для студентов. Планируйте свое образование вместе с нами!`} />
      </Head>
      <Univer university={university}></Univer>
    </>
  )
};

export async function getStaticPaths() {
  const data = await UniverService.getAll();
  const univerIds = data.map(el => el._id); // Заменено на map

  const paths = univerIds.map(id => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: true, // Изменено на true, чтобы обрабатывать случаи, когда данные университета еще не загружены
  };
}

export const getStaticProps: GetStaticProps<any> = async context => {
  const id = context.params?.id;
  const univerData = await UniverService.getUniverById(id);

  return {
    props: {
      university: univerData || null, // Если данные не найдены, передаем null
    },
    revalidate: 60,
  };
};

export default UniverPage;
