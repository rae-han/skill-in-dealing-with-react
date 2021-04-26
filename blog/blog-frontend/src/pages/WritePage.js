import React from 'react';
// import Editor from '../components/write/Editor';
import EditorContainer from '../containers/write/EditorContainer'
// import TagBox from '../components/write/TagBox'
import TagBoxContainer from '../containers/write/TagBoxContainer'
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer'
import Responsive from '../components/common/Responsive'

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;