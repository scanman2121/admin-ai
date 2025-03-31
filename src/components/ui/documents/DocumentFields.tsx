import { DocumentType, documentTypeLabels } from '@/types/documents'
import React from 'react'
import { Input } from '../input'
import { Label } from '../label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'

interface DocumentFieldsProps {
    documentType: DocumentType
    onFieldChange: (field: string, value: string) => void
    values: Record<string, string>
}

const DocumentFields: React.FC<DocumentFieldsProps> = ({
    documentType,
    onFieldChange,
    values,
}) => {
    const renderFields = () => {
        switch (documentType) {
            case DocumentType.Lease:
                return (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tenant">Tenant name</Label>
                            <Input
                                id="tenant"
                                value={values.tenant || ''}
                                onChange={(e) => onFieldChange('tenant', e.target.value)}
                                placeholder="Enter tenant name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={values.startDate || ''}
                                onChange={(e) => onFieldChange('startDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End date</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={values.endDate || ''}
                                onChange={(e) => onFieldChange('endDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rentAmount">Monthly rent</Label>
                            <Input
                                id="rentAmount"
                                type="number"
                                value={values.rentAmount || ''}
                                onChange={(e) => onFieldChange('rentAmount', e.target.value)}
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>
                )

            case DocumentType.COI:
                return (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="insuranceProvider">Insurance provider</Label>
                            <Input
                                id="insuranceProvider"
                                value={values.insuranceProvider || ''}
                                onChange={(e) => onFieldChange('insuranceProvider', e.target.value)}
                                placeholder="Enter provider name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="policyNumber">Policy number</Label>
                            <Input
                                id="policyNumber"
                                value={values.policyNumber || ''}
                                onChange={(e) => onFieldChange('policyNumber', e.target.value)}
                                placeholder="Enter policy number"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expirationDate">Expiration date</Label>
                            <Input
                                id="expirationDate"
                                type="date"
                                value={values.expirationDate || ''}
                                onChange={(e) => onFieldChange('expirationDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="coverageAmount">Coverage amount</Label>
                            <Input
                                id="coverageAmount"
                                type="number"
                                value={values.coverageAmount || ''}
                                onChange={(e) => onFieldChange('coverageAmount', e.target.value)}
                                placeholder="Enter amount"
                            />
                        </div>
                    </div>
                )

            case DocumentType.AssetValuation:
                return (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="appraiser">Appraiser name</Label>
                            <Input
                                id="appraiser"
                                value={values.appraiser || ''}
                                onChange={(e) => onFieldChange('appraiser', e.target.value)}
                                placeholder="Enter appraiser name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="valuationDate">Valuation date</Label>
                            <Input
                                id="valuationDate"
                                type="date"
                                value={values.valuationDate || ''}
                                onChange={(e) => onFieldChange('valuationDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="propertyValue">Property value</Label>
                            <Input
                                id="propertyValue"
                                type="number"
                                value={values.propertyValue || ''}
                                onChange={(e) => onFieldChange('propertyValue', e.target.value)}
                                placeholder="Enter value"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="methodology">Valuation methodology</Label>
                            <Select
                                value={values.methodology || ''}
                                onValueChange={(value) => onFieldChange('methodology', value)}
                            >
                                <SelectTrigger id="methodology">
                                    <SelectValue placeholder="Select methodology" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income approach</SelectItem>
                                    <SelectItem value="market">Market approach</SelectItem>
                                    <SelectItem value="cost">Cost approach</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Document title</Label>
                            <Input
                                id="title"
                                value={values.title || ''}
                                onChange={(e) => onFieldChange('title', e.target.value)}
                                placeholder="Enter document title"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={values.description || ''}
                                onChange={(e) => onFieldChange('description', e.target.value)}
                                placeholder="Enter description"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="effectiveDate">Effective date</Label>
                            <Input
                                id="effectiveDate"
                                type="date"
                                value={values.effectiveDate || ''}
                                onChange={(e) => onFieldChange('effectiveDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                value={values.tags || ''}
                                onChange={(e) => onFieldChange('tags', e.target.value)}
                                placeholder="Enter tags (comma separated)"
                            />
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="documentType">Document type</Label>
                <Select
                    value={documentType}
                    onValueChange={(value) => onFieldChange('documentType', value)}
                >
                    <SelectTrigger id="documentType">
                        <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(documentTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {renderFields()}
        </div>
    )
}

export default DocumentFields 