import Geography from "@/components/screens/geography/Geography";
import PageLoading from "../components/UI/loading/page-loading/PageLoading"
import { Univer } from "@/interfaces/univer.interface";
import { UniverService } from "@/services/universities.service";
import { GetStaticProps, NextPage } from "next";

interface GeographyPageProps {
  universities: Univer[];
  showPreloader: boolean;
}

const GeographyPage: NextPage<GeographyPageProps> = ({ universities, showPreloader }) => {
  return (
    <>
      {showPreloader && <PageLoading />} 
      {!showPreloader && (
        <Geography universities={universities} />
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<GeographyPageProps> = async () => {
  let showPreloader = true;
  const universities = await UniverService.getAll();
  showPreloader = false;

  return {
    props: {
      universities,
      showPreloader
    },
    revalidate: 60
  }
}

export default GeographyPage;