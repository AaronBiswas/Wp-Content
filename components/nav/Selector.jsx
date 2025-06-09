import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterPosts } from "@/components/posts/filter";
import { getAllAuthors, getAllTags, getAllCategories } from "@/lib/wordpress";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Menu } from "lucide-react";
import { SearchInput } from "../posts/search-input";

export default async function Selector({ search }) {
  const [authors, tags, categories] = await Promise.all([
    getAllAuthors(),
    getAllTags(),
    getAllCategories(),
  ]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="hidden sm:flex items-center gap-4 flex-1">
        <SearchInput 
          defaultValue={search} 
          className="w-64 md:w-80" 
        />
        <FilterPosts authors={authors} tags={tags} categories={categories} />
      </div>
      
      <div className="hidden sm:flex items-center gap-3">
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
          aria-label="Twitter"
        >
          <FaXTwitter className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
      </div>

      <div className="sm:hidden flex items-center justify-between w-full">
        <div className="flex items-center gap-3 flex-1 justify-end mr-4">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="Twitter"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Search & Filter</SheetTitle>
              <SheetDescription>
                Search posts and apply filters
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Posts</label>
                <SearchInput 
                  defaultValue={search} 
                  className="w-full" 
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Filter Options</h3>
                <FilterPosts authors={authors} tags={tags} categories={categories} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}