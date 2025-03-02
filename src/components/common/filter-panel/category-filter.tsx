import { capitalizeFirstLetter } from "../../../lib/utils"
import { Checkbox } from "../../ui/checkbox"
import { Label } from "../../ui/label"

interface Category {
  id: string
  label: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategories: string[]
  onCategoryChange: (categoryId: string, checked: boolean) => void
}

export const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }: CategoryFilterProps)=> {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={(checked) => onCategoryChange(category.id, checked as boolean)}
          />
          <Label htmlFor={`category-${category.id}`}>{capitalizeFirstLetter(category.label)}</Label>
        </div>
      ))}
    </div>
  )
}

