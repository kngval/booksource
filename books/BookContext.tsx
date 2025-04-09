import { TBookMetaData } from "@/types/book.types"
import { createContext, useContext, useState } from "react";

// type TLibraryContext = {
//   library : TBookMetaData[];
// }

const LibraryContext = createContext<TBookMetaData[] | null>(null)

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);

  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");

  return ctx;
}

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 

  const [library,setLibrary] = useState<TBookMetaData[]>([]);
    
  return(
    <LibraryContext.Provider value={{ library,setLibrary }}>
      { children }
    </LibraryContext.Provider>
  )

}
