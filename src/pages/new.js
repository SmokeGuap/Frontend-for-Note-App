import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
import NoteForm from '../components/NoteForm';
import { NEW_NOTE } from '../gql/mutation';

const NewNote = () => {
  const navigate = useNavigate();

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      navigate(`/note/${data.newNote.id}`);
    },
  });
  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </React.Fragment>
  );
};
export default NewNote;
