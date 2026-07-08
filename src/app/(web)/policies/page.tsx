import { getAllPolicies } from "@/app/libs/sanityFetch";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  cancellation: "Cancellation Policy",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  house_rules: "House Rules",
};

const categoryOrder = ["privacy", "terms", "cancellation", "house_rules"];

const PoliciesPage = async () => {
  const policies = await getAllPolicies();

  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      const items = policies.filter((p) => p.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {} as Record<string, typeof policies>
  );

  return (
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="section-title mb-4">Policies</h1>
        <p className="section-subtitle mx-auto">
          Please review our policies for a comfortable stay.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <h2 className="font-heading text-2xl font-medium text-stellar-blue mb-6 pb-2 border-b border-stellar-light-grey">
              {categoryLabels[cat] || cat}
            </h2>
            <div className="space-y-6">
              {items.map((policy) => (
                <div key={policy._id}>
                  <h3 className="font-heading text-lg font-medium text-stellar-blue mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-stellar-grey text-sm leading-relaxed whitespace-pre-line">
                    {policy.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {policies.length === 0 && (
        <p className="text-center text-stellar-grey">No policies available.</p>
      )}
    </section>
  );
};

export default PoliciesPage;
