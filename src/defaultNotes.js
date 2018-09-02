import helpNote from './helpNote';

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

  predefined: {
    '/help': helpNote,
  },
};

export default defaultNotes;
