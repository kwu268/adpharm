import { Modal, Avatar, Progress } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { UserProgress } from "@/lib/data";
import UserCarousel from "./UserCarousel";
import ModuleCard from "./ModuleCard";
import SubmoduleCard from "./SubmoduleCard";

type UserModalProps = {
  opened: boolean;
  onClose: () => void;
  userProgress: {
    totalA: number;
    totalQ: number;
    totalProgress: number;
  };
  userInfo: UserProgress;
  avatarColour: string | undefined;
};

const UserModal = ({
  opened,
  onClose,
  userProgress,
  userInfo,
  avatarColour,
}: UserModalProps) => {
  const { name, user_id, course, progress } = userInfo;

  const isMobileScreen = useMediaQuery("(max-width: 1023px)");
  return (
    <Modal fullScreen={true} opened={opened} onClose={onClose}>
      {isMobileScreen ? (
        <div className="flex flex-col pb-3">
          <div className="flex flex-col items-center gap-2 pt-4">
            <Avatar
              className="shadow-xl"
              color={avatarColour}
              alt="User avatar"
              size="xl"
              radius="xl"
            >
              {name[0]}
            </Avatar>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold">{name}</h2>
              <h3>{user_id}</h3>
            </div>
            <div className="w-full mt-10 px-2">
              <div className="flex pb-2">
                <p className="w-3/4 font-semibold">{course}</p>
                <p className="w-1/4 text-right">
                  {userProgress.totalA} / {userProgress.totalQ}{" "}
                </p>
              </div>
              <Progress
                aria-label="User progress bar"
                size="lg"
                color="#6b30f2"
                value={userProgress.totalProgress}
              />
            </div>
          </div>
          <div className="px-2 pt-10 flex flex-col gap-6">
            <h1 className="text-2xl font-bold border-t-2 pt-2">Modules </h1>
            <UserCarousel progress={progress} />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-2/3 h-full pt-4  px-2">
            <h1 className="font-bold text-3xl">
              User Module Progress Dashboard
            </h1>
            <div className="mx-3 flex flex-col gap-14 mt-4">
              {Object.entries(progress).map(([module, submodule]) => {
                return (
                  <div key={module} >
                    <div className="flex text-xl">
                      <h1 className="font-semibold ">{module.split(":")[0]}: &nbsp;</h1>
                      <h1>{module.split(":")[1]}</h1>
                    </div>

                    <div className="grid grid-cols-4 gap-3 ">
                      {Object.entries(submodule).map(
                        ([submoduleTitle, submoduleQuestion]) => {
                          return (
                            <div className="h-full" key={submoduleTitle}>
                              <SubmoduleCard
                                submoduleTitle={submoduleTitle}
                                submoduleQuestion={submoduleQuestion}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-l-2 h-full w-1/3 flex flex-col items-center ">
            <div className="flex flex-col items-center  w-full pt-10">
              <Avatar
                className="shadow-xl"
                color={avatarColour}
                alt="User avatar"
                size="xl"
                radius="xl"
              >
                {name[0]}
              </Avatar>
              <h2 className="pt-6 text-xl font-bold">{name}</h2>
              <h3>{user_id}</h3>
              <div className="w-full mt-10 px-4">
                <div className="flex pb-2">
                  <p className="w-3/4">{course}</p>
                  <p className="w-1/4 text-right">
                    {userProgress.totalA} / {userProgress.totalQ}{" "}
                  </p>
                </div>
                <Progress aria-label="User progress bar" color="#6b30f2" value={userProgress.totalProgress} />
              </div>
            </div>
            <div className="w-full flex flex-col p-4 ">
              <h1 className="font-bold text-xl  border-t-2 py-3">
                Module Progress Summary
              </h1>
              <div className="flex flex-col gap-4">
                {Object.entries(progress).map(([module, submodule]) => {
                  return (
                    <ModuleCard
                      key={module}
                      moduleTitle={module}
                      submodule={submodule}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserModal;
