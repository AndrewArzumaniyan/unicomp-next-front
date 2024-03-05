import '@/styles/normalize.scss';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeContextProvider } from '@/providers/theme.context.provider';
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
      <ThemeContextProvider>
        {loading ? <PageLoading /> : <Component {...pageProps} />}
      </ThemeContextProvider>
    </div>
  )
}
