import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to capitalize only the first letter of the string
export function capitalizeFirstLetter (str: string): string  {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// utils.ts

export function getUniqueCategories(categories: { id: string, label: string }[]): { id: string, label: string }[] {
  // Remove duplicate categories using Set and filter out any undefined values
  return Array.from(new Set(categories.map((category) => category.id)))
    .map((id) => categories.find((category) => category.id === id))
    .filter((category) => category !== undefined) as { id: string, label: string }[]; // Type assertion here
}

