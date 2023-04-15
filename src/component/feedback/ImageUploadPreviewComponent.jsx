// import React, { useState } from "react";

// const ImageUploadPreviewComponent = ({ handleFiles }) => {
//   const [files, setFiles] = useState([]);

//   const handleFile = (e) => {
//     let file = e.target.files;
//     for (let i = 0; i < file.length; i++) {
//       setFiles(prevFiles => [...prevFiles, file[i]]);
//     }
//     handleFiles(files)
//   };

//   const removeImage = (i) => {
//     setFiles(files.filter(x => x.name !== i));
//   }

//   return (
//     <>
//       <div className="h-screen flex justify-center items-center bg-gray-900 px-2">
//         <div className="p-3 md:w-1/2 w-[360px] rounded-md">
//           <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
//             <input type="file" onChange={handleFile} className="h-full w-full opacity-0 z-10 absolute" multiple="multiple" name="files[]" />
//             <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
//               <div className="flex flex-col">
//                 <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
//                 <span className="text-[12px]">{`Drag and Drop a file`}</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {files && Array.isArray(files) && files.map((file, key) => {
//               return (
//                 <div key={key} className='w-full h-16 flex items-center justify-between rounded p-3 bg-white'>
//                   <div className="flex flex-row items-center gap-2">
//                     <div className="h-12 w-12 ">
//                       <img className="w-full h-full rounded" src={URL.createObjectURL(file)} alt={file.name} />
//                     </div>
//                     <span className="truncate w-44">{file.name}</span>
//                   </div>
//                   <div className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm ml-auto" onClick={() => removeImage(file.name)}>
//                     <i className="mdi mdi-trash-can text-white text-[14px]">Delete</i>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .truncate {
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//       `}</style>
//     </>
//   );
// }

// export default ImageUploadPreviewComponent;


import React, { useState } from "react";

const ImageUploadPreviewComponent = ({ handleFiles }) => {
  const [files, setFiles] = useState([]);

  const handleFile = (e) => {
    let file = e.target.files;
    setFiles(prevFiles => {
      const newFiles = [];
      for (let i = 0; i < file.length; i++) {
        newFiles.push(file[i]);
      }
      handleFiles(newFiles);
      return [...prevFiles, ...newFiles];
    });
  };

  const removeImage = (i) => {
    setFiles(files.filter(x => x.name !== i));
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-900 px-2">
        <div className="p-3 md:w-1/2 w-[360px] rounded-md">
          <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
            <input type="file" onChange={handleFile} className="h-full w-full opacity-0 z-10 absolute" multiple="multiple" name="files[]" />
            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                <span className="text-[12px]">{`Drag and Drop a file`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {files && Array.isArray(files) && files.map((file, key) => {
              return (
                <div key={key} className='w-full h-16 flex items-center justify-between rounded p-3 bg-white'>
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-12 w-12 ">
                      <img className="w-full h-full rounded" src={URL.createObjectURL(file)} alt={file.name} />
                    </div>
                    <span className="truncate w-44">{file.name}</span>
                  </div>
                  <div className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm ml-auto" onClick={() => removeImage(file.name)}>
                    <i className="mdi mdi-trash-can text-white text-[14px]">Delete</i>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
}

export default ImageUploadPreviewComponent;
