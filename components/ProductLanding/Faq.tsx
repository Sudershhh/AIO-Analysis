import { faq } from "@/config/landingPage";
import { Card, CardContent } from "../ui/card";
function Faq() {
  return (
    <section className="mt-32" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        {faq.map((faq, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Faq;
