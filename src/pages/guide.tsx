import Guide from "@/components/screens/guide/Guide";
import { CityService } from "@/services/cities.service";
import { GetStaticProps, NextPage } from "next";

const GuidePage: NextPage<any> = ({ cities }) => {
  return <Guide cities={cities}/>
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const cities = await CityService.getAll();

  return {
    props: {
      cities
    },
    revalidate: 60
  }
}

export default GuidePage;