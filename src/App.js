import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import React, { useState, useEffect } from "react";
import NotesGrid from "./NotesGrid";
import EditNoteModal from "./EditNoteModal";
import Pagination from "./Pagination";
import AddNoteButton from "./AddNoteButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const notesPerPage = 6;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(
          collection(db, "notes"),
          orderBy("pinned", "desc"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(fetchedNotes);
        setTotalPages(Math.ceil(fetchedNotes.length / notesPerPage));
      } catch (error) {
        if (
          error.code === "failed-precondition" ||
          error.code === "permission-denied"
        ) {
          console.error(
            "You need to set up Firestore indexes. Please follow the provided URL in the error message."
          );
        }
        toast.error("Failed to fetch notes");
        console.error("Error fetching notes: ", error);
      }
    };

    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setCurrentNote(note);
  };

  const handleSave = async (note) => {
    try {
      console.log("Saving note:", note);
      if (note.id) {
        const noteRef = doc(db, "notes", note.id);
        await updateDoc(noteRef, { ...note, timestamp: new Date() });
      } else {
        const { id, ...noteData } = note;
        const docRef = await addDoc(collection(db, "notes"), {
          ...noteData,
          timestamp: new Date(),
        });
        note.id = docRef.id;
        setNotes((prevNotes) => [...prevNotes, note]);
        setTotalPages(Math.ceil((notes.length + 1) / notesPerPage));
      }
      setCurrentNote(null);
      setIsAdding(false);
      toast.success("Note saved successfully");
    } catch (error) {
      toast.error("Failed to save note");
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      setTotalPages(Math.ceil((notes.length - 1) / notesPerPage));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
    }
  };

  const handleClose = () => {
    setCurrentNote(null);
    setIsAdding(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <div>
      <NotesGrid
        notes={paginatedNotes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {(currentNote || isAdding) && (
        <EditNoteModal
          note={currentNote}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddNoteButton onClick={() => setIsAdding(true)} />
      <ToastContainer />
    </div>
  );
};

export default App;
