import React from 'react';
// import Editor from '../components/write/Editor';
import EditorContainer from '../containers/write/EditorContainer'
// import TagBox from '../components/write/TagBox'
import TagBoxContainer from '../containers/write/TagBoxContainer'
import Responsive from '../components/common/Responsive'

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
    </Responsive>
  );
};

export default WritePage;