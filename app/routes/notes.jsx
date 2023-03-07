import { redirect } from '@remix-run/node';
import NewNote, {links as newNoteLinks} from '../components/NewNote';
import NoteList, {links as noteListLinks} from '../components/NoteList';

import { getStoredNotes, storeNotes } from '../data/note';

export default function NotesPage() {
  return (
    <main >
    <NewNote></NewNote>
    <NoteList></NoteList>
    </main>
  );
}

export async function loader(){
  const notes = await getStoredNotes()
  return notes;
}

export async function action({request}){
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData)
    const existingNotes = await getStoredNotes()
    noteData.id = new Date().toISOString()
    const updatedNoted = existingNotes.concat(noteData)
    await storeNotes(updatedNoted);
    return redirect('/notes')
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
  }