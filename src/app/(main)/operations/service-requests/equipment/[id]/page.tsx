"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { serviceRequests } from "@/data/data"
import { equipment, type Equipment } from "@/data/equipment"
import { getRelativeTime } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import {
    AlertTriangle,
    BarChart3,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    Download,
    FileText,
    History,
    Plus,
    QrCode,
    Settings,
    Upload,
    Wrench
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const getHealthStatusBadge = (status: Equipment["healthStatus"]) => {
    switch (status) {
        case "excellent":
            return <Badge variant="success">• Excellent</Badge>
        case "good":
            return <Badge variant="default">• Good</Badge>
        case "fair":
            return <Badge variant="warning">• Fair</Badge>
        case "poor":
            return <Badge variant="warning">• Poor</Badge>
        case "critical":
            return <Badge variant="error">• Critical</Badge>
        default:
            return <Badge variant="default">• Unknown</Badge>
    }
}

const getStatusBadge = (status: Equipment["status"]) => {
    switch (status) {
        case "active":
            return <Badge variant="success">• Active</Badge>
        case "inactive":
            return <Badge variant="default">• Inactive</Badge>
        case "maintenance":
            return <Badge variant="warning">• Maintenance</Badge>
        case "retired":
            return <Badge variant="error">• Retired</Badge>
        default:
            return <Badge variant="default">• Unknown</Badge>
    }
}

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
    const equipmentItem = equipment.find(eq => eq.id === params.id)
    
    if (!equipmentItem) {
        notFound()
    }

    // Get service requests related to this equipment
    const relatedServiceRequests = serviceRequests.filter(sr => 
        sr.description?.toLowerCase().includes(equipmentItem.name.toLowerCase()) ||
        sr.building === equipmentItem.building
    ).slice(0, 10) // Limit to 10 most recent

    // Mock service history
    const serviceHistory = [
        {
            id: "sh-001",
            date: "2024-01-15",
            type: "Preventive Maintenance",
            technician: "John Smith",
            description: "Quarterly maintenance check. Replaced filters, checked refrigerant levels, tested all systems.",
            cost: 450,
            status: "completed"
        },
        {
            id: "sh-002",
            date: "2023-10-15",
            type: "Preventive Maintenance",
            technician: "Sarah Johnson",
            description: "Quarterly maintenance check. All systems operating normally.",
            cost: 450,
            status: "completed"
        },
        {
            id: "sh-003",
            date: "2023-07-15",
            type: "Repair",
            technician: "Mike Thompson",
            description: "Fixed compressor issue. Replaced faulty component.",
            cost: 1200,
            status: "completed"
        },
        {
            id: "sh-004",
            date: "2023-04-15",
            type: "Preventive Maintenance",
            technician: "John Smith",
            description: "Quarterly maintenance check.",
            cost: 450,
            status: "completed"
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link 
                        href="/operations/service-requests/equipment"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50">
                            {equipmentItem.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            {getHealthStatusBadge(equipmentItem.healthStatus)}
                            {getStatusBadge(equipmentItem.status)}
                            {equipmentItem.qrCode && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <QrCode className="h-3 w-3" />
                                    {equipmentItem.qrCode}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <Link href="/operations/service-requests/equipment/schedule">
                        <Button variant="secondary">
                            <Settings className="h-4 w-4 mr-2" />
                            Schedule maintenance
                        </Button>
                    </Link>
                    <Button variant="primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Create service request
                    </Button>
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Equipment Details */}
                    <Card>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Equipment Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Type</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{equipmentItem.type}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{equipmentItem.category}</p>
                                </div>
                                {equipmentItem.manufacturer && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Manufacturer</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{equipmentItem.manufacturer}</p>
                                    </div>
                                )}
                                {equipmentItem.model && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Model</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{equipmentItem.model}</p>
                                    </div>
                                )}
                                {equipmentItem.serialNumber && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Serial Number</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{equipmentItem.serialNumber}</p>
                                    </div>
                                )}
                                {equipmentItem.installationDate && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Installation Date</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            {format(parseISO(equipmentItem.installationDate), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                )}
                                {equipmentItem.warrantyExpiration && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Warranty Expiration</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            {format(parseISO(equipmentItem.warrantyExpiration), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        {equipmentItem.building}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Floor {equipmentItem.floor} • {equipmentItem.room}
                                    </p>
                                </div>
                                {equipmentItem.assignedTeam && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Assigned Team</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{equipmentItem.assignedTeam}</p>
                                    </div>
                                )}
                            </div>

                            {equipmentItem.tags && equipmentItem.tags.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {equipmentItem.tags.map(tag => (
                                            <Badge key={tag} variant="default">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Tabs for Service History, Documents, Readings */}
                    <Tabs defaultValue="history" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="history" className="flex items-center gap-2">
                                <History className="h-4 w-4" />
                                Service History
                            </TabsTrigger>
                            <TabsTrigger value="documents" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Documents
                            </TabsTrigger>
                            <TabsTrigger value="readings" className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Readings
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="history" className="mt-4">
                            <Card>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                            Service History ({serviceHistory.length})
                                        </h3>
                                        <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Export
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {serviceHistory.map((service) => (
                                            <div 
                                                key={service.id}
                                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Wrench className="h-4 w-4 text-gray-400" />
                                                            <span className="font-medium text-gray-900 dark:text-gray-50">
                                                                {service.type}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {format(parseISO(service.date), "MMM d, yyyy")} • {service.technician}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <Badge variant="success">• Completed</Badge>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mt-1">
                                                            ${service.cost.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                                    {service.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="documents" className="mt-4">
                            <Card>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                            Documents ({equipmentItem.documents?.length || 0})
                                        </h3>
                                        <Button variant="ghost" size="sm">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload document
                                        </Button>
                                    </div>

                                    {equipmentItem.documents && equipmentItem.documents.length > 0 ? (
                                        <div className="space-y-3">
                                            {equipmentItem.documents.map((doc) => (
                                                <div 
                                                    key={doc.id}
                                                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                                {doc.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {doc.type} • Uploaded {format(parseISO(doc.uploadedDate), "MMM d, yyyy")} by {doc.uploadedBy}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                No documents uploaded yet
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="readings" className="mt-4">
                            <Card>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                            Equipment Readings ({equipmentItem.readings?.length || 0})
                                        </h3>
                                        <Button variant="ghost" size="sm">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add reading
                                        </Button>
                                    </div>

                                    {equipmentItem.readings && equipmentItem.readings.length > 0 ? (
                                        <div className="space-y-3">
                                            {equipmentItem.readings.map((reading) => (
                                                <div 
                                                    key={reading.id}
                                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 capitalize">
                                                                {reading.type}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {format(parseISO(reading.recordedDate), "MMM d, yyyy 'at' h:mm a")} • {reading.recordedBy}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                                                {reading.value} {reading.unit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {reading.notes && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                            {reading.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                No readings recorded yet
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Health Status */}
                    <Card>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Health Status</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Health Score</span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                            {equipmentItem.healthScore}/100
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                equipmentItem.healthScore >= 80 ? "bg-green-500" :
                                                equipmentItem.healthScore >= 60 ? "bg-yellow-500" :
                                                equipmentItem.healthScore >= 40 ? "bg-orange-500" :
                                                "bg-red-500"
                                            }`}
                                            style={{ width: `${equipmentItem.healthScore}%` }}
                                        />
                                    </div>
                                </div>
                                
                                {getHealthStatusBadge(equipmentItem.healthStatus)}
                            </div>
                        </div>
                    </Card>

                    {/* Maintenance Schedule */}
                    <Card>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Maintenance Schedule</h3>
                            
                            <div className="space-y-4">
                                {equipmentItem.lastMaintenanceDate && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Maintenance</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            {format(parseISO(equipmentItem.lastMaintenanceDate), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                )}
                                
                                {equipmentItem.nextMaintenanceDate && (
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Maintenance</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {format(parseISO(equipmentItem.nextMaintenanceDate), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                        {equipmentItem.maintenanceFrequency && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Frequency: {equipmentItem.maintenanceFrequency}
                                            </p>
                                        )}
                                    </div>
                                )}
                                
                                <Link href="/operations/service-requests/equipment/schedule">
                                    <Button variant="outline" className="w-full">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        View full schedule
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    {/* Certifications */}
                    {equipmentItem.certifications && equipmentItem.certifications.length > 0 && (
                        <Card>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Certifications</h3>
                                
                                <div className="space-y-3">
                                    {equipmentItem.certifications.map((cert) => {
                                        const expirationDate = parseISO(cert.expirationDate)
                                        const daysUntilExpiration = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                                        
                                        return (
                                            <div 
                                                key={cert.id}
                                                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                            {cert.type}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {cert.issuer}
                                                        </p>
                                                    </div>
                                                    {cert.status === "active" ? (
                                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Expires: {format(expirationDate, "MMM d, yyyy")}
                                                    </p>
                                                    {daysUntilExpiration <= 30 && daysUntilExpiration > 0 && (
                                                        <Badge variant="warning">
                                                            Expires in {daysUntilExpiration} days
                                                        </Badge>
                                                    )}
                                                    {daysUntilExpiration <= 0 && (
                                                        <Badge variant="error">Expired</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Related Service Requests */}
                    {relatedServiceRequests.length > 0 && (
                        <Card>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                                    Related Service Requests ({relatedServiceRequests.length})
                                </h3>
                                
                                <div className="space-y-2">
                                    {relatedServiceRequests.slice(0, 5).map((sr) => (
                                        <Link
                                            key={sr.id}
                                            href={`/operations/service-requests/${sr.id}`}
                                            className="block p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 line-clamp-1">
                                                {sr.request}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {sr.status} • {getRelativeTime(sr.lastUpdated)}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

