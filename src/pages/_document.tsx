import { ThemeContext } from '@/contexts/theme.context'
import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react';


export default function Document() {
  const { theme } = useContext(ThemeContext);

  return (
    <Html lang="ru">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NSL3R74SYR"></script>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-NSL3R74SYR');
              `  
            }}
          />

          {/* Яндекс Метрика */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
              ym(96568720, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });`,
            }}
          />
          <noscript>
            <div>
              <img 
                src="https://mc.yandex.ru/watch/96568720" 
                style={{
                  position: 'absolute', 
                  left: '-9999px'
                }}
                alt="" 
              />
            </div>
          </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
