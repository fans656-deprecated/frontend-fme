const defaultNotes = {
  '/': {
    aliases: ['/'],
    type: 'filter',
    filter: {
    },
  },

  '/nav': {
    aliases: ['/nav'],
    links: [
      {name: 'Home', href: '/'},
    ],
  },
};

export default defaultNotes;
