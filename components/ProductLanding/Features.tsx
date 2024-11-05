import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { features } from "@/config/landingPage";
const featureGradients = [
  " from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-cyan-500 to-teal-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-yellow-500",
];

function Features() {
  return (
    <section className="mt-32" aria-labelledby="features-heading">
      <h2
        id="features-heading"
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Powerful Features
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, featureIndex) => (
          <motion.div
            key={`${feature.title}-${featureIndex}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div
                  className={`rounded-xl bg-gradient-to-r ${featureGradients[featureIndex]} p-3 w-12 h-12 mb-4`}
                >
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
