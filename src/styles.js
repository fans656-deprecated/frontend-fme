import conf from './conf';

const styles = {
  headerFooter: {
    backgroundColor: conf.darkBackground,
    color: conf.darkForeground,
    height: conf.headerFooterHeight,
    lineHeight: conf.headerFooterHeight,
    boxShadow: '0 0 5px #333',
  },

  combined: (...styles) => {
    return Object.assign({}, ...styles);
  },
};

export default styles;
