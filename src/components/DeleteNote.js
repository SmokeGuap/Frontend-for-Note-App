import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { DELETE_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import withRouter from './withRouter';

const DeleteButton = styled.button`
  color: #0077cc;
  border: none;
  padding: 0;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: 1px solid #87ceeb;
  border-radius: 10px;
  width: 100%;

  :hover,
  :active {
    background: #87ceeb;
    color: #004499;
  }
`;

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
  return <DeleteButton onClick={deleteNote}>Delete Note</DeleteButton>;
};
export default withRouter(DeleteNote);
