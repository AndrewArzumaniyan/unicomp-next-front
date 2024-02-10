import '@/styles/normalize.scss';
import '@/styles/globals.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import PageLoading from '@/components/UI/loading/page-loading/PageLoading';


export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    // Если переход на другую страницу отменяется, уберите прелоадер
    router.events.on('routeChangeError', handleComplete);

    // Уберите прослушивание событий при размонтировании компонента
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <div>
      {loading ? <PageLoading /> : <Component {...pageProps} />}
    </div>
  )
}
