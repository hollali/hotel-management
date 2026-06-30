import { defineField } from "sanity";

const policy = {
  name: "policy",
  title: "Policy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cancellation", value: "cancellation" },
          { title: "Privacy", value: "privacy" },
          { title: "Terms", value: "terms" },
          { title: "House Rules", value: "house_rules" },
        ],
      },
    }),
  ],
};

export default policy;
