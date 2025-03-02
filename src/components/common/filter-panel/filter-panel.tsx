import { NewsFilters, useNewsContext } from "../../../context/news-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { CategoryFilter } from "./category-filter";
import { DateFilter } from "./date-filter";
import { SourceFilter } from "./source-filter";

const sources = [
  { id: "newsapi", label: "NewsAPI" },
  { id: "guardian", label: "The Guardian" },
  { id: "nytimes", label: "New York Times" },
];

export default function FilterPanel() {
  const { filters, setFilters, newsCategories } = useNewsContext();
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters((prev: NewsFilters) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter((id) => id !== categoryId),
    }));
  };
  

  const handleSourceChange = (sourceId: string, checked: boolean) => {
    setFilters((prev: NewsFilters) => ({
      ...prev,
      sources: checked
        ? [...prev.sources, sourceId]
        : prev.sources.filter((id) => id !== sourceId),
    }));
  };
  
  
  const handleDateChange = (date: Date | undefined) => {
    setFilters((prev: NewsFilters) => ({
      ...prev,
      date: date,
    }));
  };
  

  const clearFilters = () => {
    setFilters({
      categories: [],
      sources: [],
      date: undefined,
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Filters</span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="date">
            <AccordionTrigger>Date</AccordionTrigger>
            <AccordionContent>
              <DateFilter date={filters.date} onDateChange={handleDateChange} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <CategoryFilter
                categories={newsCategories?.categories}
                selectedCategories={filters.categories}
                onCategoryChange={handleCategoryChange}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sources">
            <AccordionTrigger>Sources</AccordionTrigger>
            <AccordionContent>
              <SourceFilter
                sources={sources}
                selectedSources={filters.sources}
                onSourceChange={handleSourceChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
