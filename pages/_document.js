import { Html, Head, Main, NextScript } from "next/document";

export default Document;
// structure de l'application 1 ere partie du layout
function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="description"
          content="Découvrez notre salle de sport moderne avec des équipements de pointe, incluant une large gamme de machines cardio, des zones de musculation, et des studios pour des cours variés. Rejoignez-nous dès maintenant pour profiter d'une expérience fitness exceptionnelle."
        />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
