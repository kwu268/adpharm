import { useEffect, useState } from "react";
import { SubmoduleQuestions } from "@/lib/data";
import { useDisclosure } from "@mantine/hooks";
import SubmoduleModal from "./SubmoduleModal";
import { Progress } from "@mantine/core";
import { motion } from "framer-motion";


type CurrentProgress = {
  totalA: number;
  totalQ: number;
};

type SubmoduleCardProps = {
  submoduleTitle: string;
  submoduleQuestion: SubmoduleQuestions;
};

const SubmoduleCard = ({
  submoduleTitle,
  submoduleQuestion,
}: SubmoduleCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [moduleProgress, setModuleProgress] = useState<CurrentProgress>({
    totalA: 0,
    totalQ: 0,
  });

  const getModuleProgress = () => {
    let totalA = 0;
    let totalQ = 0;

    Object.values(submoduleQuestion).forEach((answer) => {
      totalQ++;
      if (answer) totalA++;
    });

    setModuleProgress({ totalA: totalA, totalQ: totalQ });
  };

  useEffect(() => {
    getModuleProgress();
  }, []);
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <SubmoduleModal
        opened={opened}
        onClose={close}
        submoduleTitle={submoduleTitle}
        submoduleQuestion={submoduleQuestion}
      />
      <div
        onClick={open}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`border-2 rounded-xl h-36 flex flex-col justify-center ${
          isHover ? "bg-[#4e2f63]" : "bg-[#b2acec]"
        }`}
      >
        <h3 className="font-semibold text-md text-center">
          {submoduleTitle.split(":")[0]}
        </h3>
        <h3 className=" text-md text-center">{submoduleTitle.split(":")[1]}</h3>
        <div className="flex flex-col px-4 pt-2">
          <p className="text-sm text-end">
            {moduleProgress.totalA} / {moduleProgress.totalQ}
          </p>
          <Progress value={(moduleProgress.totalA / moduleProgress.totalQ) * 100}/>
        </div>
      </div>
    </motion.div>
  );
};

export default SubmoduleCard;
