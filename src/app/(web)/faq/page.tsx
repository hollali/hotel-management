import { getFAQs } from "@/app/libs/sanityFetch";
import { FaChevronDown } from "react-icons/fa";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  booking: "Booking",
  checkin: "Check-In / Check-Out",
  amenities: "Amenities",
  payments: "Payments",
  general: "General",
};

const categoryOrder = ["booking", "checkin", "payments", "amenities", "general"];

const FAQPage = async () => {
  const faqs = await getFAQs();

  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      const items = faqs.filter((f) => f.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {} as Record<string, typeof faqs>
  );

  return (
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="section-title mb-4">Frequently Asked Questions</h1>
        <p className="section-subtitle mx-auto">
          Find answers to common questions about your stay.
        </p>
      </div>

      {faqs.length === 0 ? (
        <p className="text-center text-stellar-grey">No FAQs available at the moment.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-10">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="font-heading text-xl font-medium text-stellar-blue mb-4 pb-2 border-b border-stellar-light-grey">
                {categoryLabels[cat] || cat}
              </h2>
              <div className="space-y-3">
                {items.map((faq) => (
                  <details
                    key={faq._id}
                    className="group border border-stellar-light-grey open:border-brand transition-colors"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-stellar-blue font-medium text-sm hover:bg-beige transition-colors list-none">
                      {faq.question}
                      <FaChevronDown className="text-brand shrink-0 ml-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-4 text-stellar-grey text-sm leading-relaxed border-t border-stellar-light-grey pt-3 mt-0">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FAQPage;
