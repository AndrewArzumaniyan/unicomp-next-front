import Guide from "@/components/screens/guide/Guide";
import { CityService } from "@/services/cities.service";
import { GetStaticProps, NextPage } from "next";

const GuidePage: NextPage<any> = ({ cities, showPreloader }) => {
  return <Guide cities={cities}/>
}

export const getStaticProps: GetStaticProps<any> = async () => {
  let showPreloader = true;
  const cities = await CityService.getAll();
  showPreloader = false;

  return {
    props: {
      cities,
      showPreloader
    },
    revalidate: 60
  }
}

export default GuidePage;