const db = {
  testimonials: [
    {
      id: 1,
      author: 'John Doe',
      text: 'This company is worth every coin!'
    },
    {
      id: 2,
      author: 'Amanda Doe',
      text: 'They really know how to make you happy.',
    },
    {
      id: 3,
      author: 'Katarzyna Michaluk',
      text: 'Nasza firm pomoże Ci się osiągnąć cele na wiele sposobów, zapraszamy do współpracy !',
    },
    {
      id: 4,
      author: 'Sussan Sarander',
      text: 'We have what you need !'
    },
    {
      id: 5,
      author: 'Tom Cruise',
      text: 'Impossible is nothing for me !',
    },
    {
      id: 6,
      author: 'Marco Polo',
      text: 'Searching a purpose in life, can help you find everything you want !',
    },
  ],

  concerts: [
    { id: 1, performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' },
    { id: 2, performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' },
    { id: 3, performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/hdfh42sd213.jpg' },
  ],

  seats: [
    { id: 1, day: 1, seat: 3, client: 'Amanda Doe', email: 'amandadoe@example.com' },
    { id: 2, day: 1, seat: 9, client: 'Curtis Johnson', email: 'curtisj@example.com' },
    { id: 3, day: 1, seat: 10, client: 'Felix McManara', email: 'felxim98@example.com' },
    { id: 4, day: 1, seat: 26, client: 'Fauna Keithrins', email: 'mefauna312@example.com' },
    { id: 5, day: 2, seat: 1, client: 'Felix McManara', email: 'felxim98@example.com' },
    { id: 6, day: 2, seat: 2, client: 'Molier Lo Celso', email: 'moiler.lo.celso@example.com' },
  ],
};

module.exports = db;
