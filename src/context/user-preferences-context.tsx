import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface UserPreferences {
  preferredSources: string[]
  preferredCategories: string[]
  preferredAuthors: string[]
}

interface UserPreferencesContextType {
  preferences: UserPreferences
  updatePreferences: (preferences: UserPreferences) => void
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined)

const defaultPreferences: UserPreferences = {
  preferredSources: [],
  preferredCategories: [],
  preferredAuthors: [],
}

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("newsHubPreferences")
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences))
      } catch (error) {
        console.error("Failed to parse saved preferences", error)
      }
    }
  }, [])

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences)
    // Save to localStorage
    localStorage.setItem("newsHubPreferences", JSON.stringify(newPreferences))
  }

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext)
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider")
  }
  return context
}

