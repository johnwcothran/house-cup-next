import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../utils/createEmotionCache";

type DocumentProps = {
  emotionStyleTags: any
}

export default class MyDocument extends Document<DocumentProps> {
 render() {
   return (
     <Html lang="en">
       <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap" rel="stylesheet" />
         {this.props.emotionStyleTags}
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </Html>
   );
 }
}

MyDocument.getInitialProps = async (ctx) => {
 const originalRenderPage = ctx.renderPage;

 const cache = createEmotionCache();
 const { extractCriticalToChunks } = createEmotionServer(cache);

 ctx.renderPage = () =>
   originalRenderPage({
     enhanceApp: (App: any) =>
       function EnhanceApp(props) {
         return <App emotionCache={cache} {...props} />;
       },
   });

 const initialProps = await Document.getInitialProps(ctx);

 const emotionStyles = extractCriticalToChunks(initialProps.html);
 const emotionStyleTags = emotionStyles.styles.map((style) => (
   <style
     data-emotion={`${style.key} ${style.ids.join(" ")}`}
     key={style.key}
     dangerouslySetInnerHTML={{ __html: style.css }}
   />
 ));

 return {
   ...initialProps,
   emotionStyleTags,
 };
};