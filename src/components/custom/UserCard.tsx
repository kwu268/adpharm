import { useEffect, useCallback, useState } from "react";
import { UserProgress } from "../../lib/data";
import { Card, Avatar, Progress } from "@mantine/core";
import UserModal from "./UserModal";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";

type UserCardProps = {
  userInfo: UserProgress;
};
const avatarColours = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

const UserCard = ({ userInfo }: UserCardProps) => {
  const { user_id, name, course, progress } = userInfo;
  const [opened, { open, close }] = useDisclosure(false);
  const [avatarColour, setAvatarColour] = useState<string>();

  const getAvatarColour = () => {
    setAvatarColour(avatarColours[Math.floor(Math.random() * 10)]);
  };

  useEffect(() => {
    getAvatarColour();
  }, []);

  const calculateProgress = useCallback(() => {
    const { totalA, totalQ } = Object.values(progress).reduce(
      (acc, submodules) => {
        Object.values(submodules).forEach((submoduleQuestion) => {
          Object.values(submoduleQuestion).forEach((answer) => {
            if (answer) acc.totalA++;
            acc.totalQ++;
          });
        });
        return acc;
      },
      { totalA: 0, totalQ: 0 }
    );

    const userProgress = {
      totalA: totalA,
      totalQ: totalQ,
      totalProgress: (totalA / totalQ) * 100,
    };
    return userProgress;
  }, [progress]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-[2.8rem] shadow-lg cursor-pointer"
    >
      <UserModal
        opened={opened}
        onClose={close}
        userProgress={calculateProgress()}
        userInfo={userInfo}
        avatarColour={avatarColour}
      />
      <Card
        onClick={open}
        className="border-2 shadow-xl rounded-3xl pointer"
        radius={"xl"}
      >
        <Card.Section>
          <div className="flex flex-col gap-3 p-6 item">
            <Avatar
              className="self-center"
              color={avatarColour}
              alt="User avatar"
              size="xl"
              radius="xl"
            >
              {name[0]}
            </Avatar>
            <div className="self-center">
              <h1 className="text-lg font-bold">{name}</h1>
              <h2 className="text-center">{user_id}</h2>
            </div>
            <div className="grid grid-rows-2 pt-4">
              <div className="text-sm flex pb-2">
                <p className="w-3/4 font-semibold">{course}</p>
                <p className="w-1/4 text-right">
                  {Math.round(calculateProgress().totalProgress)}%
                </p>
              </div>
              <Progress
                aria-label="User progress bar"
                color="#6b30f2"
                value={calculateProgress().totalProgress}
              />
            </div>
          </div>
        </Card.Section>
      </Card>
    </motion.div>
  );
};

export default UserCard;
