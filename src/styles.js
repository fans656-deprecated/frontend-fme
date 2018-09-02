const styles = {
  darkBackground: '#333',
  darkForeground: '#eee',
  headerFooterHeight: '3em',
};

Object.assign(styles, {
  headerFooter: {
    backgroundColor: styles.darkBackground,
    color: styles.darkForeground,
    height: styles.headerFooterHeight,
    lineHeight: styles.headerFooterHeight,
    boxShadow: '0 0 5px #333',
  },

  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  combined: (...styles) => {
    return Object.assign({}, ...styles);
  },
});

export default styles;
