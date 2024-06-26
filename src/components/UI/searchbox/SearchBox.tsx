import React, { FC, ChangeEvent } from "react";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="uni-modal__search-box search__box">
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.15889 12.5829C4.84167 15.2657 9.07796 15.4481 11.972 13.1302L17.6019 18.7601C17.9217 19.08 18.4403 19.08 18.7601 18.7601C19.08 18.4403 19.08 17.9217 18.7601 17.6019L13.1302 11.972C15.4481 9.07795 15.2657 4.84167 12.5829 2.15889C9.70441 -0.71963 5.03741 -0.719631 2.15889 2.15889C-0.71963 5.03741 -0.71963 9.70442 2.15889 12.5829ZM3.31712 3.31712C1.07827 5.55597 1.07827 9.18586 3.31712 11.4247C5.55432 13.6619 9.18054 13.6636 11.4198 11.4296L11.4247 11.4247L11.4296 11.4198C13.6636 9.18053 13.6619 5.55433 11.4247 3.31712C9.18586 1.07827 5.55596 1.07827 3.31712 3.31712Z" fill="white"/>
      </svg>
      <input 
        type="text" 
        placeholder="поиск"
        className="uni-modal__search-input search__input"
        value={searchQuery}
        onInput={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value.toLowerCase())}
      />
    </div>
  );
}

export default SearchBox;
