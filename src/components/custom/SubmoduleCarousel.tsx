import { SubmoduleQuestions } from "@/lib/data";
import { Carousel } from "@mantine/carousel";
import { Card } from "@mantine/core";

type SubmoduleCarouselProps = {
  submodule: {
    [submodule: string]: SubmoduleQuestions;
  };
};

const SubmoduleCarousel = ({ submodule }: SubmoduleCarouselProps) => {
  return (
    <Carousel
      withIndicators
      height={500}
      slideSize="100%"
      slideGap="md"
      loop
      align="start"
    >
      {Object.entries(submodule).map(([submoduleTitle, submoduleQuestions]) => {
        return (
          <Carousel.Slide key={submoduleTitle}>
            <Card
              h="100%"
              style={{ backgroundColor: "#a487e6" }}
              shadow="sm"
              padding="lg"
              radius="lg"
              withBorder
            >
              <h3 className="font-bold text-lg">{submoduleTitle}</h3>
              <div className="flex flex-col gap-4 mt-4">
                {Object.entries(submoduleQuestions).map(
                  ([question, answer]) => {
                    return (
                      <div key={question} className={`px-5 ${!answer && "text-red-800"}`}>
                        <p className="font-bold">{question}</p>
                        <p className="italic">{answer ? answer : "NA"}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </Card>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default SubmoduleCarousel;
