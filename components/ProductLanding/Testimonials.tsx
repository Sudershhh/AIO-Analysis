import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { testimonials } from "@/config/landingPage";

function Testimonials() {
  return (
    <section className="mt-32" aria-labelledby="testimonials-heading">
      <h2
        id="testimonials-heading"
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        What Our Users Say
      </h2>
      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="mx-4">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full mr-4"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default Testimonials;
