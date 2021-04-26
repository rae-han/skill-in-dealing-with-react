import React from 'react';
// import Editor from '../components/write/Editor';
import EditorContainer from '../containers/write/EditorContainer'
import TagBox from '../components/write/TagBox'
import Responsive from '../components/common/Responsive'

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBox />
    </Responsive>
  );
};

export default WritePage;