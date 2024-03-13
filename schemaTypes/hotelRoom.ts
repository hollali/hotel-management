import { defineField } from "sanity";

const hotelRoom ={
    name: 'hotelRoom',
    title: 'Hotel Room',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().max(50).error('Maximum 50 characters'),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source:'name',
            },
            validation: Rule => Rule.required(),
        }),
    ],
};

export default hotelRoom;