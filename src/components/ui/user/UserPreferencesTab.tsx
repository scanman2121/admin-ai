"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { cn } from "@/lib/utils"
import {
    Cake,
    Car,
    Coffee,
    Edit2,
    Heart,
    MessageSquare,
    Plus,
    Trash2,
    UtensilsCrossed,
    Wine,
    X
} from "lucide-react"
import { useState } from "react"

// Preference categories with icons
const preferenceCategories = [
    { id: "beverage", label: "Beverage", icon: Coffee, color: "text-amber-600" },
    { id: "dietary", label: "Dietary", icon: UtensilsCrossed, color: "text-green-600" },
    { id: "parking", label: "Parking", icon: Car, color: "text-blue-600" },
    { id: "communication", label: "Communication", icon: MessageSquare, color: "text-purple-600" },
    { id: "interests", label: "Interests", icon: Heart, color: "text-pink-600" },
    { id: "celebrations", label: "Celebrations", icon: Cake, color: "text-orange-600" },
    { id: "hospitality", label: "Hospitality", icon: Wine, color: "text-red-600" },
] as const

type PreferenceCategory = typeof preferenceCategories[number]["id"]

interface Preference {
    id: string
    category: PreferenceCategory
    label: string
    value: string
    notes?: string
}

// Mock preferences data for leads/VIPs
const leadPreferences: Preference[] = [
    {
        id: "1",
        category: "beverage",
        label: "Coffee",
        value: "Oat milk latte, extra hot",
        notes: "Prefers Starbucks if available"
    },
    {
        id: "2",
        category: "beverage",
        label: "Water",
        value: "Sparkling, room temperature",
    },
    {
        id: "3",
        category: "dietary",
        label: "Dietary restrictions",
        value: "Gluten-free",
        notes: "Celiac - strict avoidance needed"
    },
    {
        id: "4",
        category: "parking",
        label: "Parking preference",
        value: "Valet preferred",
        notes: "Drives a black Tesla Model S"
    },
    {
        id: "5",
        category: "communication",
        label: "Best contact time",
        value: "Mornings before 10am",
        notes: "In meetings most afternoons"
    },
    {
        id: "6",
        category: "communication",
        label: "Assistant",
        value: "Patricia Williams",
        notes: "patricia.w@helfer.com - CC on all meeting invites"
    },
    {
        id: "7",
        category: "interests",
        label: "Golf",
        value: "Member at Medinah Country Club",
        notes: "Handicap 12, plays weekends"
    },
    {
        id: "8",
        category: "interests",
        label: "Sports",
        value: "Chicago Bulls season tickets",
    },
    {
        id: "9",
        category: "celebrations",
        label: "Birthday",
        value: "March 15",
    },
    {
        id: "10",
        category: "hospitality",
        label: "Wine preference",
        value: "Napa Valley Cabernet",
        notes: "Opus One is a favorite"
    },
]

// Empty preferences for regular users
const tenantPreferences: Preference[] = []

interface UserPreferencesTabProps {
    userId?: string
    userType?: "tenant" | "lead"
    containerClassName?: string
}

export function UserPreferencesTab({ userType, containerClassName }: UserPreferencesTabProps) {
    const [preferences, setPreferences] = useState<Preference[]>(
        userType === "lead" ? leadPreferences : tenantPreferences
    )
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [newPreference, setNewPreference] = useState<Partial<Preference>>({
        category: "beverage",
        label: "",
        value: "",
        notes: ""
    })
    const [, setEditingId] = useState<string | null>(null)

    const handleAddPreference = () => {
        if (!newPreference.label || !newPreference.value) return

        const preference: Preference = {
            id: Date.now().toString(),
            category: newPreference.category as PreferenceCategory,
            label: newPreference.label,
            value: newPreference.value,
            notes: newPreference.notes || undefined
        }

        setPreferences([...preferences, preference])
        setNewPreference({ category: "beverage", label: "", value: "", notes: "" })
        setIsAddingNew(false)
    }

    const handleDeletePreference = (id: string) => {
        setPreferences(preferences.filter(p => p.id !== id))
    }

    const groupedPreferences = preferenceCategories.map(category => ({
        ...category,
        preferences: preferences.filter(p => p.category === category.id)
    })).filter(group => group.preferences.length > 0)

    return (
        <div className={cn("space-y-6", containerClassName)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        Preferences
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {userType === "lead"
                            ? "Capture important details to deliver personalized experiences"
                            : "Track user preferences for better service"}
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setIsAddingNew(true)}
                >
                    <Plus className="h-4 w-4" />
                    Add preference
                </Button>
            </div>

            {/* Add new preference form */}
            {isAddingNew && (
                <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50 dark:bg-blue-950/20">
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Add new preference
                            </h3>
                            <button
                                onClick={() => setIsAddingNew(false)}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newPreference.category}
                                    onChange={(e) => setNewPreference({ ...newPreference, category: e.target.value as PreferenceCategory })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                                >
                                    {preferenceCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Label
                                </label>
                                <Input
                                    type="text"
                                    placeholder="e.g., Coffee preference"
                                    value={newPreference.label}
                                    onChange={(e) => setNewPreference({ ...newPreference, label: e.target.value })}
                                    className="h-9"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Value
                            </label>
                            <Input
                                type="text"
                                placeholder="e.g., Oat milk latte, extra hot"
                                value={newPreference.value}
                                onChange={(e) => setNewPreference({ ...newPreference, value: e.target.value })}
                                className="h-9"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Notes (optional)
                            </label>
                            <Input
                                type="text"
                                placeholder="Any additional details..."
                                value={newPreference.notes}
                                onChange={(e) => setNewPreference({ ...newPreference, notes: e.target.value })}
                                className="h-9"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="secondary" size="sm" onClick={() => setIsAddingNew(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleAddPreference}
                                disabled={!newPreference.label || !newPreference.value}
                            >
                                Add preference
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Preferences by category */}
            {groupedPreferences.length > 0 ? (
                <div className="space-y-6">
                    {groupedPreferences.map(group => {
                        const Icon = group.icon
                        return (
                            <div key={group.id}>
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon className={cn("h-5 w-5", group.color)} />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {group.label}
                                    </h3>
                                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                        {group.preferences.length}
                                    </span>
                                </div>
                                <div className="grid gap-3">
                                    {group.preferences.map(pref => (
                                        <Card key={pref.id} className="group">
                                            <div className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {pref.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                                            {pref.value}
                                                        </p>
                                                        {pref.notes && (
                                                            <p className="text-xs text-gray-500 mt-2 italic">
                                                                {pref.notes}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                                            onClick={() => setEditingId(pref.id)}
                                                        >
                                                            <Edit2 className="h-3.5 w-3.5 text-gray-500" />
                                                        </button>
                                                        <button
                                                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950 rounded"
                                                            onClick={() => handleDeletePreference(pref.id)}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <Card>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <Heart className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            No preferences yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-4">
                            {userType === "lead"
                                ? "Add preferences to deliver a personalized VIP experience. Track beverages, dietary needs, interests, and more."
                                : "Track user preferences to provide better service and personalized experiences."}
                        </p>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => setIsAddingNew(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Add first preference
                        </Button>
                    </div>
                </Card>
            )}

            {/* Quick add suggestions for leads */}
            {userType === "lead" && preferences.length > 0 && (
                <Card className="bg-gray-50 dark:bg-gray-900/50">
                    <div className="p-4">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Quick add suggestions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Meeting style preference",
                                "Preferred conference room",
                                "Travel schedule",
                                "Favorite restaurants",
                                "Gift preferences",
                                "Family details",
                            ].map(suggestion => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setNewPreference({ ...newPreference, label: suggestion })
                                        setIsAddingNew(true)
                                    }}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
                                >
                                    + {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}
