import "./Home.css";
import { PokemonTable } from "@/components/custom/PokemonTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef } from "react";
import { useSearchParams } from "react-router";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get("query") || "";

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = inputRef.current?.value;
      if (!query || query.trim() === "") {
        searchParams.delete("query");
        setSearchParams(searchParams);
        return;
      }
      searchParams.set("query", query);
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <section className="py-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-row items-center justify-center space-x-2 mb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Buscar pokemon..."
                className="pl-9 w-64 h-9 bg-white"
                onKeyDown={handleSearch}
                defaultValue={query}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center mb-8">
            <PokemonTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
