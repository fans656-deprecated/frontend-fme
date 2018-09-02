import api from './api';
import defaultNotes from './defaultNotes';

async function byPath(path) {
  const res = await api.post('/noter/query', {
    'aliases': {'$eq': path},
  });
  if (res.status === 200) {
    const pagedNotes = await res.json();
    if (pagedNotes.total === 0) {
      const note = defaultNotes[path];
      if (note) {
        console.info('create default note', note);
        const res = await api.post('/noter/note', note);
        if (res.status === 200) {
          return await res.json();
        } else {
          console.info('create default note failed', note);
          return null;
        }
      } else {
        return null;
      }
    } else {
      return pagedNotes.notes[0];
    }
  } else {
    console.error(res.status_code, await res.text());
    return null;
  }
}

const noter = {
  byPath: byPath,
};

export default noter;
