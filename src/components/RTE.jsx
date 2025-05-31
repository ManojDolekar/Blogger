import React from 'react';
import { Controller } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function RTE({ control, label, name, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name || 'content'}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange } }) => {
                    const editor = useEditor({
                        extensions: [StarterKit],
                        content: defaultValue,
                        onUpdate: ({ editor }) => {
                            onChange(editor.getHTML()); // Updates the form value
                        },
                    });

                    return (
                        <div className="border p-2 rounded shadow-lg">
                            <EditorContent editor={editor} />
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default RTE;




// import React, { useState, useRef, forwardRef, useEffect } from "react";
// import { Controller } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Quill styles

// // ✅ Fixing findDOMNode issue by wrapping ReactQuill in forwardRef
// const CustomQuill = forwardRef((props, ref) => (
//     <ReactQuill {...props} forwardedRef={ref} />
// ));

// const RTE = ({ control, label, name, defaultValue = "" }) => {
//     const [value, setValue] = useState(defaultValue);
//     const quillRef = useRef(null);

//     useEffect(() => {
//         if (quillRef.current) {
//             console.log("Quill Editor Loaded:", quillRef.current);
//         }
//     }, []);

//     return (
//         <div className="w-full">
//             {/* Label */}
//             {label && <label className="block mb-1 text-gray-700 font-semibold">{label}</label>}

//             <Controller
//                 name={name || "content"}
//                 control={control}
//                 render={({ field: { onChange } }) => (
//                     <div className="border border-gray-300 rounded-lg bg-white shadow-md">
//                         <CustomQuill
//                             ref={quillRef}
//                             theme="snow"
//                             value={value}
//                             onChange={(content) => {
//                                 setValue(content);
//                                 onChange(content);
//                             }}
//                             modules={{
//                                 toolbar: [
//                                     [{ header: [1, 2, 3, false] }],
//                                     ["bold", "italic", "underline", "strike"],
//                                     [{ list: "ordered" }, { list: "bullet" }],
//                                     ["link","blockquote", "code-block"],
//                                     [{ align: [] }],
//                                     ["clean"],
//                                 ],
//                             }}
//                             className="min-h-[300px] text-black p-4"
//                         />
//                     </div>
//                 )}
//             />
//         </div>
//     );
// };

// export default RTE;
