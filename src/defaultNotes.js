const defaultNotes = {
  '/': {
    type: 'filter',
    aliases: ['/'],

    filter: {
    },
  },

  '/nav': {
    type: 'nav',
    aliases: ['/nav'],

    links: [
      {name: 'Home', href: '/'},
    ],
  },
};

export default defaultNotes;
