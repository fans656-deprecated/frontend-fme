import helpNote from './helpNote';

const defaultNotes = {
  '/': {
    type: 'filter',
    url: '/',

    filter: {
    },
  },

  '/nav': {
    type: 'nav',
    url: '/nav',

    links: [
      {name: 'Home', href: '/'},
    ],
  },

  predefined: {
    '/help': helpNote,
  },
};

export default defaultNotes;
