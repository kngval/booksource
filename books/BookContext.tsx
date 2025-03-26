import { createContext, ReactNode, useContext, useState } from "react";

interface FileContextType {
  selectedFile: string | null;
  setSelectedFile : (file:string | null) => void;
}

const FileContext = createContext<FileContextType | undefined >(undefined);

export const useFile = ():FileContextType => {
  const context = useContext(FileContext);

  if(!context){
    throw new Error("useFile must be used within a File Provider");
  }
  return context;
}

export const FileProvider:React.FC<{children:ReactNode}> = ({children}) => {
  const [selectedFile,setSelectedFile] = useState<string|null>(null);

  return(
    <FileContext.Provider value={{selectedFile,setSelectedFile}}>
      {children}
    </FileContext.Provider>
  )

}
