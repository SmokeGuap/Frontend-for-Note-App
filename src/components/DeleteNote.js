import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import withRouter from './withRouter';

const DeleteNote = (props) => {
  const navigate = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: (data) => {
      navigate('/mynotes');
    },
  });
  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};
export default withRouter(DeleteNote);
