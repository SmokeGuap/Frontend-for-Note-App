import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

const EditMenu = styled.div`
  border: 1px solid #87ceeb;
  border-radius: 10px;
  text-align: center;
  padding: 0px;
  background: none;
  color: #0077cc;
  width: 100%;
  margin-bottom: 5px;

  :hover,
  :active {
    background: #87ceeb;
    color: #004499;
  }
`;

const NoteUser = (props) => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      />
      {data?.me.id === props.note.author.id && (
        <>
          <EditMenu>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/edit/${props.note.id}`}
            >
              Edit
            </Link>
          </EditMenu>
          <DeleteNote noteId={props.note.id} />
        </>
      )}
    </>
  );
};
export default NoteUser;
