import Head from "next/head";
import ImagePreview from "../components/ImagePreview";
import styles from "../styles/Home.module.css";

export default function Home({ items }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nasa Image Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Nasa Image Search</h1>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search for an image"
        ></input>
        <div className={styles.gridContainer}>
          {items &&
            items.map((preview) => (
              <ImagePreview
                key={preview.data[0].nasa_id}
                thumbnailUrl={preview.links[0].href}
                nasaId={preview.data[0].nasa_id}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const results = await fetch(
    "https://images-api.nasa.gov/search?media_type=image"
  );
  const previews = await results.json();
  const items = await previews.collection.items;
  console.log(items);
  return {
    props: { items },
  };
}
