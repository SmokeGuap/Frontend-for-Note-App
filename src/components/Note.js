import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

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

const Note = ({ note }) => {
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt='{note.author.username} avatar'
            height='50px'
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {note.createdAt.slice(0, 10)}
        </MetaInfo>
        <UserActions>
          <em>Favorites:</em> {note.favoriteCount}
        </UserActions>
      </MetaData>
      <ReactMarkdown children={note.content} />
    </StyledNote>
  );
};
export default Note;