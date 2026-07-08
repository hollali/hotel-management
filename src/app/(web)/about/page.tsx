import Image from "next/image";
import { getPageContent } from "@/app/libs/sanityFetch";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const AboutPage = async () => {
  const page = await getPageContent("about");

  return (
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="section-title mb-4">{page?.title || "About Us"}</h1>
        {page?.subtitle && (
          <p className="section-subtitle mx-auto">{page.subtitle}</p>
        )}
      </div>

      {page?.images && page.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {page.images.slice(0, 2).map((img, i) => (
            <div key={i} className="relative h-64 md:h-80 overflow-hidden">
              {img.asset?.url ? (
                <Image
                  src={img.asset.url}
                  alt={`About ${i + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-beige" />
              )}
            </div>
          ))}
        </div>
      )}

      {page?.content ? (
        <div className="max-w-3xl mx-auto prose prose-stellar-blue">
          <PortableText value={page.content as any} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-stellar-grey text-lg">
            Welcome to Sky Inn Hotel. We are dedicated to providing exceptional hospitality
            and comfortable accommodations in the heart of Ghana. Our team is committed to
            making your stay memorable.
          </p>
        </div>
      )}
    </section>
  );
};

export default AboutPage;
