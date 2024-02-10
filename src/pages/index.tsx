import { GetStaticProps, NextPage } from 'next';
import PageLoading from '@/components/UI/loading/page-loading/PageLoading';
import Compare from '@/components/screens/compare/Compare';
import { Category } from '@/interfaces/category.interface';
import { Univer } from '@/interfaces/univer.interface';
import { CategoryService } from '@/services/categories.service';
import { UniverService } from '@/services/universities.service';

interface ComparePageProps {
  categories: Category[];
  universities: Univer[];
  showPreloader: boolean;
}

const ComparePage: NextPage<ComparePageProps> = ({ categories, universities, showPreloader }) => {
  return (
    <>
      {showPreloader && <PageLoading />}
      {!showPreloader && (
        <Compare categories={categories} universities={universities}/>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<ComparePageProps> = async () => {
  let showPreloader = true;
  const categories = await CategoryService.getAll();
  const universities = await UniverService.getAll();
  showPreloader = false;
  return {
    props: {
      categories,
      universities,
      showPreloader
    },
    revalidate: 60
  }
}

export default ComparePage;