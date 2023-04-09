import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
  height: 50%;
  max-width: 800px;
  margin: 0 auto;
`;
const Form = styled.form`
  height: 100%;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
  resize: none;
  outline: none;
  border: 1px solid #87ceeb;
  border-radius: 10px;
  padding: 5px 10px;
  :focus {
    border: 2px solid #87ceeb;
  }
`;

const NoteForm = (props) => {
  const [value, setValue] = useState({ content: props.content || '' });
  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.action({
            variables: {
              ...value,
            },
          });
        }}
      >
        <TextArea
          required
          type='text'
          name='content'
          placeholder='Note content'
          value={value.content}
          onChange={onChange}
        />
        <Button style={{ width: '100%' }} type='submit'>
          Save
        </Button>
      </Form>
    </Wrapper>
  );
};
export default NoteForm;
