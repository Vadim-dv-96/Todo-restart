import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export type EditableSpanPropsType = {
  value: string;
  onChange: (title: string) => void;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
  console.log('EditableSpan render');

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField color="secondary" variant="standard" size="small" value={title} onChange={onChangeHandler} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}> {props.value} </span>
  );
};
