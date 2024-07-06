import "react-quill/dist/quill.snow.css"
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type PropTypes = {
  onChange: (htmlOutput: string) => void;
  value: string;
}

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link"],
    ["clean"],
  ],
};

export function RichtextEditor({ onChange, value }: PropTypes) {
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      placeholder="Masukan deskripsi..."
      value={value}
      onChange={onChange}
    />
  )
}