'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef, ElementRef, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useOnClickOutside } from 'usehooks-ts';
import { Loader2Icon, SearchIcon } from 'lucide-react';
import { User } from '@prisma/client';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const fetchUsers = async (query: string): Promise<User[]> => {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  const useUserSearch = (query: string) => {
    return useQuery({
      queryKey: ['userSearch', query],
      queryFn: () => fetchUsers(query),
      enabled: query.length !== 0,
      
    });
  };

export default function Search() {
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const searchInputRef = useRef<ElementRef<'input'>>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery] = useDebounce(searchTerm, 1000);

  const { data, isLoading, isFetching, error } = useUserSearch(debouncedQuery);

  useOnClickOutside(searchInputRef, () => {
    setSearchBoxVisible(false);
  });

  useOnClickOutside(searchBoxRef, () => {
    setSearchBoxVisible(false);
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log(`Searching... ${term}`);

  
  };

  useEffect(() => {
    setSearchBoxVisible(true);
  }, [searchTerm]);



  return (
    <div className="relative">
      <Input
        placeholder="Search People"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
        onFocus={() => setSearchBoxVisible(true)}
        ref={searchInputRef}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      
      {searchBoxVisible &&  !!debouncedQuery.length && (
        <div
          className="absolute z-50 mt-4 w-full gap-4 rounded-lg border border-violet-600 bg-white p-2"
          ref={searchBoxRef}
        >
          {isFetching || isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : error ? (
            <span className="flex justify-center p-4 text-sm text-red-500">
              Error: {(error as Error).message}
            </span>
          ) : data && data.length > 0 ? (
            data.map((item: User) => (
              <div key={item.id} className="relative mb-5 mt-3 rounded-md bg-white p-4 shadow-sm hover:bg-slate-100">
            <div className='relative flex h-10'>
                 <Image 
                 src={item.imageUrl!}
                     alt='User Image'
                   width={40}
                    height={40}
                      className='rounded-full'
                            />
                   <div className="ml-2 flex flex-col justify-center">
                 <span>{item.username}</span>
              <p className='mt-1'>{item.name}</p>
               </div>
             </div>
            </div>
            ))
          ) : (
            <span className="flex justify-center p-4 text-sm">
              No result found
            </span>
          )}
        </div>
      )}
    </div>
  );
}