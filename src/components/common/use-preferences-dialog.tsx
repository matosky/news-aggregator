interface UserPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



import { useState, useEffect } from "react";
import { useUserPreferences } from "../../context/user-preferences-context";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AuthorService } from "../../services/AuthorService"; // Import the AuthorService
import { useNewsContext } from "../../context/news-context";


const sources = [
  { id: "newsapi", label: "NewsAPI" },
  { id: "guardian", label: "The Guardian" },
  { id: "nytimes", label: "New York Times" },
];

export function UserPreferencesDialog({
  open,
  onOpenChange,
}: UserPreferencesDialogProps) {
  const { preferences, updatePreferences } = useUserPreferences();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [authors, setAuthors] = useState<{ id: string; label: string }[]>([]);
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(false);
  const { newsCategories } = useNewsContext()

  const authorService = new AuthorService(); // Instantiate AuthorService

  useEffect(() => {
    if (open) {
      setLocalPreferences(preferences);
    }
  }, [open, preferences]);

  useEffect(() => {
    const fetchAuthors = async () => {
      if (
        localPreferences.preferredSources.length > 0 &&
        localPreferences.preferredCategories.length > 0
      ) {
        setIsLoadingAuthors(true);
        try {
          // Use AuthorService to fetch authors
          const fetchedAuthors = await authorService.fetchAuthors(
            localPreferences.preferredSources,
            localPreferences.preferredCategories
          );
          setAuthors(fetchedAuthors);
        } catch (error) {
          console.error("Error fetching authors:", error);
        } finally {
          setIsLoadingAuthors(false);
        }
      } else {
        setAuthors([]);
      }
    };

    fetchAuthors();
  }, [localPreferences.preferredSources, localPreferences.preferredCategories]);

  const handleSave = () => {
    updatePreferences(localPreferences);
    onOpenChange(false);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setLocalPreferences((prev) => ({
      ...prev,
      preferredCategories: checked
        ? [...prev.preferredCategories, categoryId]
        : prev.preferredCategories.filter((id) => id !== categoryId),
    }));
  };

  const handleSourceChange = (sourceId: string, checked: boolean) => {
    setLocalPreferences((prev) => ({
      ...prev,
      preferredSources: checked
        ? [...prev.preferredSources, sourceId]
        : prev.preferredSources.filter((id) => id !== sourceId),
    }));
  };

  const handleAuthorChange = (authorId: string, checked: boolean) => {
    setLocalPreferences((prev) => ({
      ...prev,
      preferredAuthors: checked
        ? [...prev.preferredAuthors, authorId]
        : prev.preferredAuthors.filter((id) => id !== authorId),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalize Your News Feed</DialogTitle>
          <DialogDescription>
            Customize your news preferences to see content that matters to you.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="sources" className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sources.map((source) => (
                <div key={source.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pref-source-${source.id}`}
                    checked={localPreferences.preferredSources.includes(
                      source.id
                    )}
                    onCheckedChange={(checked) =>
                      handleSourceChange(source.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`pref-source-${source.id}`}>
                    {source.label}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {newsCategories?.categories?.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pref-category-${category.id}`}
                    checked={localPreferences.preferredCategories.includes(
                      category.id
                    )}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`pref-category-${category.id}`}>
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authors" className="space-y-4 mt-4">
            {isLoadingAuthors ? (
              <div>Loading authors...</div>
            ) : authors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {authors.map((author) => (
                  <div key={author.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pref-author-${author.id}`}
                      checked={localPreferences.preferredAuthors.includes(
                        author.id
                      )}
                      onCheckedChange={(checked) =>
                        handleAuthorChange(author.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`pref-author-${author.id}`}>
                      {author.label}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                Please select sources and categories to see available authors.
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
