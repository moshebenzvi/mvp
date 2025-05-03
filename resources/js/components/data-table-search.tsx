'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DataTableSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function DataTableSearch({ value, onChange, placeholder = 'Search...' }: DataTableSearchProps) {
    const [searchValue, setSearchValue] = useState(value);

    // Debounce search to avoid too many re-renders
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(searchValue);
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchValue, onChange]);

    return (
        <div className="relative max-w-sm">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input placeholder={placeholder} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="pl-8" />
        </div>
    );
}
