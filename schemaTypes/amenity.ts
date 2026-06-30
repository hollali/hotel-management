import { defineField } from "sanity";

const amenity = {
  name: "amenity",
  title: "Amenity",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon name or class (e.g., from react-icons)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Room Amenity", value: "room" },
          { title: "Hotel Facility", value: "facility" },
          { title: "Service", value: "service" },
        ],
      },
    }),
  ],
};

export default amenity;
