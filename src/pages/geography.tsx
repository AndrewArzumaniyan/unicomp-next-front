import Geography from "@/components/screens/geography/Geography";
import PageLoading from "../components/UI/loading/page-loading/PageLoading"
import { Univer } from "@/interfaces/univer.interface";
import { UniverService } from "@/services/universities.service";
import { GetStaticProps, NextPage } from "next";

interface GeographyPageProps {
  universities: Univer[];
}

const GeographyPage: NextPage<GeographyPageProps> = ({ universities }) => {
  return (
    <Geography universities={universities} />
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