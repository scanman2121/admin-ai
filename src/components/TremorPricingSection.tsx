"use client";

import { Badge, Button, Card, Flex, List, ListItem, Text, Title } from "@tremor/react";

const plans = [
    {
        name: "Starter",
        price: "$90",
        description: "Perfect for startups and small teams",
        features: [
            "5 GB storage",
            "10 users included",
            "Email support",
            "Basic analytics",
            "Access to community forums"
        ],
        badge: "Popular",
        buttonText: "Get started",
        buttonColor: "indigo",
        highlighted: false
    },
    {
        name: "Pro",
        price: "$290",
        description: "For growing teams and businesses",
        features: [
            "50 GB storage",
            "50 users included",
            "Priority email support",
            "Advanced analytics",
            "Access to premium features",
            "Custom integrations"
        ],
        badge: "Recommended",
        buttonText: "Upgrade now",
        buttonColor: "indigo",
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with specific needs",
        features: [
            "Unlimited storage",
            "Unlimited users",
            "24/7 phone and email support",
            "Advanced security features",
            "Custom reporting",
            "Dedicated account manager",
            "SLA agreement"
        ],
        badge: "",
        buttonText: "Contact sales",
        buttonColor: "gray",
        highlighted: false
    }
];

export default function TremorPricingSection() {
    return (
        <div className="mt-8">
            <Flex className="mb-8">
                <div>
                    <Title>Choose the right plan for your team</Title>
                    <Text className="mt-2 text-gray-500">
                        All plans include a 14-day free trial. No credit card required.
                    </Text>
                </div>
            </Flex>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative ${plan.highlighted ? 'border-2 border-indigo-500 ring-1 ring-indigo-500' : ''}`}
                    >
                        {plan.badge && (
                            <Badge color="indigo" className="absolute right-4 top-4">
                                {plan.badge}
                            </Badge>
                        )}
                        <Title className="text-tremor-content-strong">{plan.name}</Title>
                        <Flex className="mt-2">
                            <Text className="text-2xl font-semibold text-tremor-content-strong">{plan.price}</Text>
                            {plan.name !== "Enterprise" && <Text className="text-tremor-default text-tremor-content">/month</Text>}
                        </Flex>
                        <Text className="mt-2 text-tremor-content">{plan.description}</Text>

                        <List className="mt-4">
                            {plan.features.map((feature) => (
                                <ListItem key={feature}>
                                    <Text className="text-tremor-content">{feature}</Text>
                                </ListItem>
                            ))}
                        </List>

                        <Button
                            className={`mt-6 w-full ${plan.highlighted ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                            color={plan.buttonColor as any}
                            variant={plan.highlighted ? "primary" : "secondary"}
                        >
                            {plan.buttonText}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
} 