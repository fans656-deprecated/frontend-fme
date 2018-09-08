import qs from 'query-string';
import api from './api';
import defaultNotes from './defaultNotes';

async function byId(idStr) {
  const id = parseInt(idStr, 10);
  const res = await api.post('/noter/query', {
    'id': id,
  });
  if (res.status === 200) {
    const pagedNotes = await res.json();
    if (pagedNotes.total) {
      return pagedNotes.notes[0];
    } else {
      return null;
    }
  } else {
    console.error(res.status_code, await res.text());
    return null;
  }
}

async function byPath(path) {
  const predefinedNote = defaultNotes.predefined[path];
  if (predefinedNote) {
    return predefinedNote;
  }
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

async function byQuery(query, args) {
  let url = '/noter/query';
  if (args) {
    url += '?' + qs.stringify(args);
  }
  const res = await api.post(url, query);
  if (res.status === 200) {
    return await res.json();
  } else {
    console.log(res.status, await res.text());
    return null;
  }
}

const noter = {
  byId: byId,
  byPath: byPath,
  byQuery: byQuery,
};

export default noter;
