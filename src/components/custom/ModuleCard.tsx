import { useEffect, useState } from "react";

import { SubmoduleQuestions } from "@/lib/data";
import { Card, RingProgress, Text } from "@mantine/core";
import SubmoduleModalMobile from "./SubmoduleModalMobile";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";

type CurrentProgress = {
  totalA: number;
  totalQ: number;
};

type ModuleCardProps = {
  moduleTitle: string;
  submodule: {
    [submodule: string]: SubmoduleQuestions;
  };
};

const ModuleCard = ({ moduleTitle, submodule }: ModuleCardProps) => {
  const [moduleProgress, setModuleProgress] = useState<CurrentProgress>({
    totalA: 0,
    totalQ: 0,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const isMobileScreen = useMediaQuery("(max-width: 1023px)");

  const getModuleProgress = () => {
    let totalA = 0;
    let totalQ = 0;
    Object.values(submodule).forEach((subModuleQuestions) => {
      Object.values(subModuleQuestions).forEach((answer) => {
        totalQ++;
        if (answer) totalA++;
      });
    });
    setModuleProgress({ totalA: totalA, totalQ: totalQ });
  };

  useEffect(() => {
    getModuleProgress();
  }, []);

  if (isMobileScreen) {
    return (
      <motion.div whileHover={{ scale: 1.01 }} className="h-full">
        <SubmoduleModalMobile
          opened={opened}
          onClose={close}
          submodule={submodule}
          moduleTitle={moduleTitle}
        />
        <Card
          h="100%"
          style={{ backgroundColor: "#a487e6" }}
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
          onClick={open}
        >
          <div className="flex flex-col items-center h-full">
            <div className="text-center h-1/3 ">
              <h1 className="text-lg font-bold">{moduleTitle.split(":")[0]}</h1>
              <p className="font-semibold">{moduleTitle.split(":")[1]}</p>
            </div>
            <RingProgress
              size={150}
              sections={[
                {
                  value: (moduleProgress.totalA / moduleProgress.totalQ) * 100,
                  color: "lime",
                },
              ]}
              rootColor="lightgrey"
              label={
                <Text c="white" fw={700} ta="center" size="xl">
                  {moduleProgress.totalA} / {moduleProgress.totalQ}
                </Text>
              }
            />
          </div>
        </Card>
      </motion.div>
    );
  } else {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-3/4  border-red-">
        <Card
          h="6.5rem"
          style={{ backgroundColor: "#a487e6" }}
          shadow="md"
          padding="lg"
          radius="lg"
          withBorder
          onClick={open}
          className="!hover:bg-purple-600"
        >
          <div className="flex h-full gap-4 items-center">
          <RingProgress
              size={85}
              sections={[
                {
                  value: (moduleProgress.totalA / moduleProgress.totalQ) * 100,
                  color: "lime",
                },
              ]}
              rootColor="lightgrey"
              label={
                <Text c="white" fw={700} ta="center" size="sm">
                  {Math.round(moduleProgress.totalA / moduleProgress.totalQ * 100)}%
                </Text>
              }
            />
            <div className="text-left w-2/3  h-full">
              <h1 className="text-2xl font-bold">{moduleTitle.split(":")[0]}</h1>
              <p className="font-semibold ">{moduleTitle.split(":")[1]}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
};

export default ModuleCard;
