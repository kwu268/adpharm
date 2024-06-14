import { Carousel } from "@mantine/carousel";
import { ModuleProgress } from "@/lib/data";
import ModuleCard from "./ModuleCard";

type UserCarouselProps = {
  progress: ModuleProgress;
};

const UserCarousel = ({ progress }: UserCarouselProps) => {
  return (
    <Carousel
      orientation="vertical"
      withControls={false}
      height={350}
      slideSize={{ base: "50%", tablet: "33%", md: "33.333333%" }}
      slideGap="md"
      loop
      align="start"
    >
      {Object.entries(progress).map(([module, submodule]) => {
        return (
          <Carousel.Slide className=" self-center w-3/4 ">
            <ModuleCard moduleTitle={module} submodule={submodule} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default UserCarousel;
