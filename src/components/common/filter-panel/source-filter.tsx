import { Checkbox } from "../../ui/checkbox"
import { Label } from "../../ui/label"

interface Source {
  id: string
  label: string
}

interface SourceFilterProps {
  sources: Source[]
  selectedSources: string[]
  onSourceChange: (sourceId: string, checked: boolean) => void
}

export function SourceFilter({ sources, selectedSources, onSourceChange }: SourceFilterProps) {
  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <div key={source.id} className="flex items-center space-x-2">
          <Checkbox
            id={`source-${source.id}`}
            checked={selectedSources.includes(source.id)}
            onCheckedChange={(checked) => onSourceChange(source.id, checked as boolean)}
          />
          <Label htmlFor={`source-${source.id}`}>{source.label}</Label>
        </div>
      ))}
    </div>
  )
}

