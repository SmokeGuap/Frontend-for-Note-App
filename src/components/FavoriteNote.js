import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = styled.div`
  margin-bottom: 5px;
  border: 1px solid #87ceeb;
  border-radius: 10px;
  padding: 0px 10px;
  background: none;
  color: #0077cc;
  width: 100%;

  :hover,
  :active {
    background: #87ceeb;
    color: #004499;
  }
  ${({ favoritedd }) =>
    favoritedd &&
    `
    background: #87CEFA;
  `}
`;

const FavoriteNote = (props) => {
  const [count, setCount] = useState(props.favoriteCount);
  const [favorited, setFavorited] = useState(
    props.me.favorites.filter((note) => note.id === props.noteId).length > 0
  );

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }],
  });

  return (
    <Favorites favoritedd={favorited}>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          Add Favorite
        </ButtonAsLink>
      )}
      : {count}
    </Favorites>
  );
};
export default FavoriteNote;
