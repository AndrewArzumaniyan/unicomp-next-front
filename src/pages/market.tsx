import UniverMarket from "@/components/screens/univer-market/UniverMarket"
import { UniverData } from "@/interfaces/univer.interface";
import { UniverService } from "@/services/universities.service";
import { GetStaticProps, NextPage } from "next";

const UniverMarketPage: NextPage<UniverData> = ({ universities }) => {
  return <UniverMarket universities={universities} />
}

export const getStaticProps: GetStaticProps<UniverData> = async () => {
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

export default UniverMarketPage;