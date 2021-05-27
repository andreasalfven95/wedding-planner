import React, { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import { buttonList } from 'suneditor-react'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

const TextEditor = ({ about, setAbout }) => {
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef()

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor
  }

  const buttonList = [
    [
      'undo',
      'redo',
      'bold',
      'underline',
      'italic',
      'strike',
      'removeFormat',
      'outdent',
      'indent',
      'align',
      'list',
    ],
  ]

  /* const handlePaste = (e, cleanData, maxCharCount){
    console.log(e, cleanData, maxCharCount)
  } */

  const handlePaste = (e, cleanData) => {
    console.log(e, cleanData)
  }

  const handleChange = (e) => {
    setAbout(about)
  }

  return (
    <div>
      <SunEditor
        /* setContents="My contents"
        appendContents="My contents"
        defaultValue="<p>The editor's default value</p>"*/
        defaultValue={about}
        lang='se'
        name='about'
        placeholder='Ge all information här...'
        getSunEditorInstance={getSunEditorInstance}
        onChange={handleChange}
        getImagesInfo={handlePaste}
        onDrop={handlePaste}
        value={about}
        setOptions={{
          buttonList: buttonList,
          pasteTagsWhitelist: 'p, span, strong, b, em, u, del, ul, ol, li',
          attributesWhitelist: 'p, span, strong, b, em,  u, del, ul, ol, li',
          tagsBlacklist: 'h1, h2, h3, h4, h5, h6, img, p>img',
          pasteTagsBlacklist: 'h1, h2, h3, h4, h5, h6, img, p>img',
          imageFileInput: false,
          imageUploadUrl: false,
          imageUrlInput: false,
          videoFileInput: false,
          videoUploadUrl: false,
          videoUrlInput: false,
          audioFileInput: false,
          audioUploadUrl: false,
          audioUrlInput: false,
          imageUploadSizeLimit: 0,
          videoUploadSizeLimit: 0,
          audioUploadSizeLimit: 0,
          linkProtocol: false,
          linkRel: 'nofollow, noopener',
          linkRelDefault: 'nofollow',
          videoAccept: '',
          imageAccept: '',
          audioAccept: '',
          toolbar: {
            bold: 'Bold',

            underline: 'Underline',

            italic: 'Italic',

            strike: 'Strike',

            removeFormat: 'Remove Format',

            indent: 'Indent',

            outdent: 'Outdent',

            align: 'Align',

            alignLeft: 'Align left',

            alignRight: 'Align right',

            alignCenter: 'Align center',

            alignJustify: 'Align justify',

            list: 'list',

            orderList: 'Ordered list',

            unorderList: 'Unordered list',
          },

          controller: {},
        }}
        setDefaultStyle=' font-size: 1em;'
      />
    </div>
  )
}
export default TextEditor
