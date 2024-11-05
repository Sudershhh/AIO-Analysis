import { Card, CardContent } from "../ui/card";
import { howItWorks } from "@/config/landingPage";
function HowItWorks() {
  return (
    <section className="mt-32 py-16" aria-labelledby="how-it-works-heading">
      <h2
        id="how-it-works-heading"
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {howItWorks.map((step, index) => (
          <Card key={step.title} className="relative">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                  <step.icon
                    className="w-4 h-4 text-violet-600"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm text-violet-600 font-medium">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
