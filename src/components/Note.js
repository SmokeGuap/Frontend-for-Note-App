import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import NoteUser from './NoteUser';
import { IS_LOGGED_IN } from '../gql/query';

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;
const MetaInfo = styled.div`
  padding-right: 1em;
`;
const UserActions = styled.div`
  margin-left: auto;
`;
const NoteText = styled.pre`
  border: 1px solid #87ceeb;
  border-radius: 10px;
  padding: 0 10px;
`;

const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            style={{ borderRadius: '50%' }}
            src={note.author.avatar}
            alt='{note.author.username} avatar'
            height='50px'
          />
        </MetaInfo>
        <MetaInfo>
          <span>Author: </span> {note.author.username} <br />
          {note.createdAt.slice(0, 10)}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <NoteText>
        <ReactMarkdown children={note.content} />
      </NoteText>
    </StyledNote>
  );
};
export default Note;
