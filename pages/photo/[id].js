import { useRouter } from "next/router";
import Image from "next/image";
export default function photo({ photo }) {
  console.log(photo);
  const router = useRouter();
  if (!router.isFallback && !photo) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="Imagecontainer">
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <Image width="960" height="540" src={photo} />
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const nasa_id = params.id;
  const results = await fetch(`https://images-api.nasa.gov/asset/${nasa_id}`);
  const previews = await results.json();
  const photo = await previews.collection.items[0].href;
  return {
    props: { photo },
  };
}

export async function getStaticPaths() {
  const results = await fetch(
    "https://images-api.nasa.gov/search?media_type=image"
  );
  const previews = await results.json();
  const items = await previews.collection.items;

  return {
    paths:
      items?.map((nasa) => ({
        params: {
          id: nasa.data[0].nasa_id,
        },
      })) || [],
    fallback: true,
  };
}
