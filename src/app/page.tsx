import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/40278dd5-236f-4a09-8d2a-89efc8857458-8x3hkn.jpg",
  "https://utfs.io/f/121687ed-ef86-4540-b362-b80c632cd949-17x8q8.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const images = await db.query.images.findMany();

  console.log({ images });

  return (
    <main className="container mx-auto min-h-screen">
      <div className="flex flex-wrap gap-3">
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div
            key={image.id + "-" + index}
            className="w-[150px] overflow-hidden rounded-md"
          >
            <Image
              src={image.url}
              alt={`image ${image.id}`}
              width={330}
              height={250}
              className="aspect-[4/3] h-auto w-auto object-cover transition-all hover:scale-105"
            />
            {/* <img src={image.url} alt="image" /> */}
          </div>
        ))}
      </div>
    </main>
  );
}
