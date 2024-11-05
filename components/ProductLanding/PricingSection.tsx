import { Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { pricingTiers } from "@/config/landingPage";
import { Button } from "../ui/button";
function PricingSection() {
  return (
    <section className="mt-32" aria-labelledby="pricing-heading">
      <h2
        id="pricing-heading"
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Simple, Transparent Pricing
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`relative ${
              tier.highlighted
                ? "border-2 border-violet-500 shadow-lg"
                : "border border-gray-200"
            }`}
          >
            <CardContent className="p-6">
              {tier.highlighted && (
                <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-violet-500 text-white px-3 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && (
                  <span className="text-gray-600">/month</span>
                )}
              </div>
              <p className="text-gray-600 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check
                      className="h-5 w-5 text-violet-500 mr-2"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  tier.highlighted
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
